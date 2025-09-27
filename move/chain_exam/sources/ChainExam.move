module chain_exam::ChainExam;

use std::string::{Self, String};
use sui::package::{Self, Publisher};



const EWrongPublisher: u64 = 1;

// The address of the admin/publisher
const ADMIN: address = @0x123abc;   // TODO: Change the Admin address


// One time witness for the Admin
public struct CHAINEXAM has drop {}


// The different objects needed for the ChainExam system on chain
public struct AdminCap has key {
    id: UID,
}

public struct StudentCap has key {
    id: UID,
}

public struct CorrectorCap has key {
    id: UID,
}

// TODO: Encoding the pdf in base64 makes it readable by other users in the blockchain, we should encrypt it (TODO later)
public struct ExamNFT has key, store { 
    id: UID,
    student: address, // USELESS : The student sends to the admin the exam : stud addr = sender addr TODO (remove it)
    pdf_base64: String,
}

// TODO: Apply the ML algorithm on the pdf_base64 and replace the pdf_base64 by the plain text in the pdf
public struct AnonymizeExam has key, store{
    id: UID,
    exam_id: u64,
    pdf_base64: String,
}

public struct Feedback has key, store {
    id: UID,
    grade: u64,
    exam_id: u64,
    comment: String, 
}

public struct Linker has copy, drop, store{
    student: address,
    corrector: address,
    exam_id: u64,
}


// TODO: Having this sensitive data in the blockchain is not ideal, maybe put it an encrypted form (TODO later)
// Doing a new version
public struct AdminState has key {
    id: UID,
    linkers: vector<Linker>,
    list_size: u64,
}


// Smart contract published by the Admin and he gets a AdminCap to be able to use Admin functions 
// WARNING : This system is with a unique Admin which is also the publisher
fun init(otw: CHAINEXAM, ctx: &mut TxContext) {
    // Keep the one time witness for the Admin
    package::claim_and_keep(otw, ctx);
    let admin_cap = AdminCap{
        id: object::new(ctx)
    };
    // transfer the AdminCap to the publisher wallet
    transfer::transfer(admin_cap, ctx.sender()); 
}

// Create a table that maps students and a index to a corrector (a corrector can have multiple students to correct)
public fun init_table(
    _publisher: &Publisher,
     _admin: AdminCap,
     student_addresses: vector<address>,
     corrector_addresses: vector<address>,
     ctx: &mut TxContext,
){
    assert!(_publisher.from_module<CHAINEXAM>(), EWrongPublisher); 

    let lenStudent = vector::length(&student_addresses);
    let lenCorrector = vector::length(&corrector_addresses);
    let mut linkers = vector::empty<Linker>();

    let mut i = 0;
    while (i < lenStudent){
        let addrStudent = *vector::borrow(&student_addresses, i);
        let addrCorrector = *vector::borrow(&corrector_addresses, i % lenCorrector);
        let linker = Linker{student: addrStudent, corrector: addrCorrector, exam_id: i};
        vector::push_back(&mut linkers, linker);
        i = i + 1;
    };
    let admin_state = AdminState {
        id: object::new(ctx),
        linkers: linkers,
        list_size: i,
    };
    transfer::transfer(admin_state, ctx.sender());
    transfer::transfer(_admin, ctx.sender());
}

// The admin sends a StudentCap to each student wallet address present in the list
public fun init_students(
    _publisher: &Publisher,
    _admin: AdminCap, 
    student_addresses: vector<address>,
    ctx: &mut TxContext,
) {
    assert!(_publisher.from_module<CHAINEXAM>(), EWrongPublisher); 

    let len: u64 = vector::length(&student_addresses);
    let mut i = 0;
    while (i < len) {
        let addr = *vector::borrow(&student_addresses, i);
        transfer::transfer(
            StudentCap { id: object::new(ctx) },
            addr,
        );
        i = i + 1;
    };
    transfer::transfer(_admin, ctx.sender());
}

// The admin sends a CorrectorCap to each corrector wallet address present in the list
public fun init_correctors(
    _publisher: &Publisher,
    _admin: AdminCap, 
    corrector_addresses: vector<address>,
    ctx: &mut TxContext,
) {
    // Check to be sure that the publisher/admin called this function
    assert!(_publisher.from_module<CHAINEXAM>(), EWrongPublisher); 

    let len = vector::length(&corrector_addresses);
    let mut i: u64 = 0;
    while (i < len) {
        let addr = *vector::borrow(&corrector_addresses, i);
        transfer::transfer(
            CorrectorCap { id: object::new(ctx) },
            addr,
        );
        i = i + 1;
    };
    transfer::transfer(_admin, ctx.sender());
}


// The student sends his exam to the admin
// The URL is a link to his exam's PDF in a decentralized storage service (like DropBox) // A REFAIRE
public fun send_exam(
    _student: StudentCap,
    pdf_base64: String,
    ctx: &mut TxContext,
) {
    let nft = ExamNFT {
        id: object::new(ctx),
        student: ctx.sender(),
        pdf_base64: pdf_base64, // to encrypt
    };
    transfer::public_transfer(nft, ADMIN);
    transfer::transfer(_student, ctx.sender());
}

// To call this function ,the React frontend has to call a Mystern library function to get all the ExamNFT own
// by the admin to then call this function, pass this exam list in the argument "exams"
// Also pass in argument the AdminState

// For now, only send exams we received (don't take into account the case were a student didn't send his exam: TODO later)
public fun send_to_correctors(
    _publisher: &Publisher,
    _admin: AdminCap,
    mut exams: vector<ExamNFT>,
    list: &AdminState,
    ctx: &mut TxContext,
) {
    // Check to be sure that the publisher/admin called this function
    assert!(_publisher.from_module<CHAINEXAM>(), EWrongPublisher);

    // Pop exams one by one and process
    while (!vector::is_empty(&exams)) {
        let exam_ref = vector::pop_back(&mut exams);
        let student = exam_ref.student;
        let pdf_base64 = exam_ref.pdf_base64;

        let mut j: u64 = 0;
        while (j < list.list_size) {
            let assignment = vector::borrow(&list.linkers, j);
            let list_student = assignment.student;
            let exam_id = assignment.exam_id;
            let corrector = assignment.corrector;

            if (student == list_student) {
                let anonymExam = AnonymizeExam {
                    id: object::new(ctx),
                    exam_id: exam_id,
                    pdf_base64: pdf_base64,
                };
                transfer::transfer(anonymExam, corrector);
                break
            };
            j = j + 1;
        };
        transfer::transfer(exam_ref, ADMIN);
    };
    // Now exams is empty, so you can destroy it
    vector::destroy_empty<ExamNFT>(exams);
    transfer::transfer(_admin, ctx.sender());
}


public fun send_feedback(
    _corrector: CorrectorCap,
    grade: u64,
    exam_id: u64,
    comment: String,
    ctx: &mut TxContext,
){
    let feedback = Feedback {
        id: object::new(ctx),
        grade: grade,
        exam_id: exam_id,
        comment: comment,
    };
    transfer::public_transfer(feedback, ADMIN);
    transfer::transfer(_corrector, ctx.sender());
}

public fun send_to_student( 
    _publisher: &Publisher,
    _admin: AdminCap,
    list: &AdminState,
    feedback: Feedback,
    ctx: &mut TxContext,
){
    // Check to be sure that the publisher/admin called this function
    assert!(_publisher.from_module<CHAINEXAM>(), EWrongPublisher);

    let mut  j: u64 = 0;
    let mut student: address = @0x0;
    while (j < list.list_size) {
        let assignment = vector::borrow(&list.linkers, j); // on prend le vecteur (studentadress, id, corrector) de tous le svecteurs
        let list_student = assignment.student; // adressstudents du vecteur
        let exam_id = assignment.exam_id; // exam id du vecteur
        
        if (exam_id == feedback.exam_id) { // si l'adresse correspnd a l etudiant 
             // on cree le tuple 
            student = list_student;
        };
        j = j + 1;
    };
    transfer::transfer(feedback, student);
    transfer::transfer(_admin, ctx.sender());
}

// ===== TEST ONLY =====

#[test_only]
use sui::{test_scenario as ts};

#[test_only]
const ADMIN_TEST: address = @0xAA;
#[test_only]
const STUDENT_TEST: address = @0xBB;
const STUDENT_TEST_1: address= @0xb1;
const STUDENT_TEST_2: address= @0xb2;
const STUDENT_TEST_3: address= @0xb3;
const STUDENT_TEST_4: address= @0xb4;
const STUDENT_TEST_5: address= @0xb5;
const STUDENT_TEST_6: address= @0xb6;

#[test_only]
const CORRECTOR_TEST: address = @0xCC;
const CORRECTOR_TEST_1: address = @0xc1;
const CORRECTOR_TEST_2: address = @0xc2;
const CORRECTOR_TEST_3: address = @0xc3;

#[test_only]
// Same as send_exam but sends to the AdminTest instead of the Admin
public fun t_send_exam(
    _student: StudentCap,
    pdf_base64: String,
    ctx: &mut TxContext,
) {
    let nft = ExamNFT {
        id: object::new(ctx),
        student: ctx.sender(),
        pdf_base64: pdf_base64, 
    };
    transfer::public_transfer(nft, ADMIN_TEST);
    transfer::transfer(_student, ctx.sender());
}

#[test]
fun test_publisher_address_gets_admin_cap() {
    let mut ts = ts::begin(ADMIN_TEST);
    // 
    std::unit_test::assert_eq!(ts::has_most_recent_for_address<Publisher>(ADMIN_TEST), false);
    std::unit_test::assert_eq!(ts::has_most_recent_for_address<AdminCap>(ADMIN_TEST), false);

    init(CHAINEXAM{}, ts.ctx());
    ts.next_tx(ADMIN_TEST);

    std::unit_test::assert_eq!(ts::has_most_recent_for_address<Publisher>(ADMIN_TEST), true);
    std::unit_test::assert_eq!(ts::has_most_recent_for_address<AdminCap>(ADMIN_TEST), true);

    // TEST IF THE ADMIN RECEIVED AND ADMIN CAP
    ts.end();
}

#[test]
fun test_admin_init_table() {
    let mut ts = ts::begin(ADMIN_TEST);

    // Step 1: Initialize the contract, which gives AdminCap to ADMIN_TEST
    init(CHAINEXAM{}, ts.ctx());
    ts.next_tx(ADMIN_TEST);

    // Step 2: Get the Publisher and AdminCap objects for ADMIN_TEST
    let publisher = ts.take_from_sender<Publisher>();
    let admin_cap = ts.take_from_sender<AdminCap>();

    // Step 3: Prepare student and corrector address lists
    let mut students = vector::empty<address>();
    vector::push_back(&mut students, STUDENT_TEST_1);
    vector::push_back(&mut students, STUDENT_TEST_2);
    vector::push_back(&mut students, STUDENT_TEST_3);
    vector::push_back(&mut students, STUDENT_TEST_4);
    vector::push_back(&mut students, STUDENT_TEST_5);
    vector::push_back(&mut students, STUDENT_TEST_6);


    let mut correctors = vector::empty<address>();
    vector::push_back(&mut correctors, CORRECTOR_TEST_1);
    vector::push_back(&mut correctors, CORRECTOR_TEST_2);
    vector::push_back(&mut correctors, CORRECTOR_TEST_3);

    // Step 4: Call init_table with the publisher, admin_cap, and address lists
    init_table(&publisher, admin_cap, students, correctors, ts.ctx());
    ts.next_tx(ADMIN_TEST);

    // Step 5: Assert that AdminState was created and transferred to ADMIN_TEST
    std::unit_test::assert_eq!(ts::has_most_recent_for_address<AdminState>(ADMIN_TEST), true);

    // Step 6: Check if the list in the admin state is correct
    let state = ts.take_from_sender<AdminState>();

    std::unit_test::assert_eq!(state.list_size, 6);
    std::unit_test::assert_eq!(vector::length(&state.linkers), 6);

    let linker1 = vector::borrow(&state.linkers, 0);
    std::unit_test::assert_eq!(linker1.student, STUDENT_TEST_1);
    std::unit_test::assert_eq!(linker1.corrector, CORRECTOR_TEST_1);
    std::unit_test::assert_eq!(linker1.exam_id, 0);

    let linker2 = vector::borrow(&state.linkers, 1);
    std::unit_test::assert_eq!(linker2.student, STUDENT_TEST_2);
    std::unit_test::assert_eq!(linker2.corrector, CORRECTOR_TEST_2);
    std::unit_test::assert_eq!(linker2.exam_id, 1);

    let linker3 = vector::borrow(&state.linkers, 2);
    std::unit_test::assert_eq!(linker3.student, STUDENT_TEST_3);
    std::unit_test::assert_eq!(linker3.corrector, CORRECTOR_TEST_3);
    std::unit_test::assert_eq!(linker3.exam_id, 2);

    let linker4 = vector::borrow(&state.linkers, 3);
    std::unit_test::assert_eq!(linker4.student, STUDENT_TEST_4);
    std::unit_test::assert_eq!(linker4.corrector, CORRECTOR_TEST_1);
    std::unit_test::assert_eq!(linker4.exam_id, 3);

    let linker5 = vector::borrow(&state.linkers, 4);
    std::unit_test::assert_eq!(linker5.student, STUDENT_TEST_5);
    std::unit_test::assert_eq!(linker5.corrector, CORRECTOR_TEST_2);
    std::unit_test::assert_eq!(linker5.exam_id, 4);

    let linker6 = vector::borrow(&state.linkers, 5);
    std::unit_test::assert_eq!(linker6.student, STUDENT_TEST_6);
    std::unit_test::assert_eq!(linker6.corrector, CORRECTOR_TEST_3);
    std::unit_test::assert_eq!(linker6.exam_id, 5);


    ts.return_to_sender(state);
    ts.return_to_sender(publisher);
    ts.end();
}

#[test]
fun test_init_students() {
    let mut ts = ts::begin(ADMIN_TEST);

    // Step 1: Initialize the contract, which gives AdminCap to ADMIN_TEST
    init(CHAINEXAM{}, ts.ctx());
    ts.next_tx(ADMIN_TEST);

    // Step 2: Get the Publisher and AdminCap objects for ADMIN_TEST
    let publisher = ts.take_from_sender<Publisher>();
    let admin_cap = ts.take_from_sender<AdminCap>();

    // Step 3: Prepare student address lists
    let mut students = vector::empty<address>();
    vector::push_back(&mut students, STUDENT_TEST_1);
    vector::push_back(&mut students, STUDENT_TEST_2);
    vector::push_back(&mut students, STUDENT_TEST_3);
    vector::push_back(&mut students, STUDENT_TEST_4);
    vector::push_back(&mut students, STUDENT_TEST_5);
    vector::push_back(&mut students, STUDENT_TEST_6);

    // Step 4: Call init_students
    init_students(&publisher, admin_cap, students, ts.ctx());
    ts.next_tx(ADMIN_TEST);

    // Step 5: Check if each student received a StudentCap
    std::unit_test::assert_eq!(ts::has_most_recent_for_address<StudentCap>(STUDENT_TEST_1), true);
    std::unit_test::assert_eq!(ts::has_most_recent_for_address<StudentCap>(STUDENT_TEST_2), true);
    std::unit_test::assert_eq!(ts::has_most_recent_for_address<StudentCap>(STUDENT_TEST_3), true);
    std::unit_test::assert_eq!(ts::has_most_recent_for_address<StudentCap>(STUDENT_TEST_4), true);
    std::unit_test::assert_eq!(ts::has_most_recent_for_address<StudentCap>(STUDENT_TEST_5), true);
    std::unit_test::assert_eq!(ts::has_most_recent_for_address<StudentCap>(STUDENT_TEST_6), true);

    ts.return_to_sender(publisher);
    ts.end();
}

#[test]
fun test_init_correctors() {
    let mut ts = ts::begin(ADMIN_TEST);

    // Step 1: Initialize the contract, which gives AdminCap to ADMIN_TEST
    init(CHAINEXAM{}, ts.ctx());
    ts.next_tx(ADMIN_TEST);

    // Step 2: Get the Publisher and AdminCap objects for ADMIN_TEST
    let publisher = ts.take_from_sender<Publisher>();
    let admin_cap = ts.take_from_sender<AdminCap>();

    // Step 3: Prepare student address lists
    let mut correctors = vector::empty<address>();
    vector::push_back(&mut correctors, CORRECTOR_TEST_1);
    vector::push_back(&mut correctors, CORRECTOR_TEST_2);
    vector::push_back(&mut correctors, CORRECTOR_TEST_3);
   

    // Step 4: Call init_correctors
    init_correctors(&publisher, admin_cap, correctors, ts.ctx());
    ts.next_tx(ADMIN_TEST);

    // Step 5: Check if each corrector received a CorrectorCap
    std::unit_test::assert_eq!(ts::has_most_recent_for_address<CorrectorCap>(CORRECTOR_TEST_1), true);
    std::unit_test::assert_eq!(ts::has_most_recent_for_address<CorrectorCap>(CORRECTOR_TEST_2), true);
    std::unit_test::assert_eq!(ts::has_most_recent_for_address<CorrectorCap>(CORRECTOR_TEST_3), true);

    // Return
    ts.return_to_sender(publisher);
    ts.end();
}

#[test]
fun test_send_exam(){
    let mut ts = ts::begin(ADMIN_TEST);

    // Step 1: Initialize the contract, which gives AdminCap to ADMIN_TEST
    init(CHAINEXAM{}, ts.ctx());
    ts.next_tx(ADMIN_TEST);

    // Step 2: Get the Publisher and AdminCap objects for ADMIN_TEST
    let publisher = ts.take_from_sender<Publisher>();
    let admin_cap = ts.take_from_sender<AdminCap>();

    // Step 3: The Admin sends the student caps, then we pass to the context of the student
    let mut students = vector::empty<address>();
    vector::push_back(&mut students, STUDENT_TEST_1);
    init_students(&publisher, admin_cap, students, ts.ctx());
    ts.next_tx(STUDENT_TEST_1);

    // Step 4: Test if the student has a cap and take the cap, write the string to be sent
    std::unit_test::assert_eq!(ts::has_most_recent_for_address<StudentCap>(STUDENT_TEST_1), true);
    let student_cap = ts.take_from_sender<StudentCap>();
    let text: String = string::utf8(b"my beautiful pdf");


    // Step 5: Send the pdf
    t_send_exam(student_cap, text, ts.ctx());
    ts.next_tx(ADMIN_TEST);

    // Step 6: Check if the Admin received the right data 
    std::unit_test::assert_eq!(ts::has_most_recent_for_address<ExamNFT>(ADMIN_TEST), true);
    let exam = ts.take_from_sender<ExamNFT>();
    std::unit_test::assert_eq!(exam.student, STUDENT_TEST_1);
    std::unit_test::assert_eq!(exam.pdf_base64, text);

    // Return
    ts.return_to_sender(exam);
    ts.return_to_sender(publisher);
    ts.end();
}

#[test]
fun test_send_to_correctors() {
    let mut ts = ts::begin(ADMIN_TEST);

    // Step 1: Initialize the contract, which gives AdminCap to ADMIN_TEST
    init(CHAINEXAM{}, ts.ctx());
    ts.next_tx(ADMIN_TEST);

    // Step 2: Get the Publisher and AdminCap objects for ADMIN_TEST
    let publisher = ts.take_from_sender<Publisher>();
    let admin_cap = ts.take_from_sender<AdminCap>();

    // Step 3: Prepare student and corrector address lists
    let mut students = vector::empty<address>();
    vector::push_back(&mut students, STUDENT_TEST_1);
    vector::push_back(&mut students, STUDENT_TEST_2);
    vector::push_back(&mut students, STUDENT_TEST_3);
    vector::push_back(&mut students, STUDENT_TEST_4);
    vector::push_back(&mut students, STUDENT_TEST_5);
    vector::push_back(&mut students, STUDENT_TEST_6);

    let mut correctors = vector::empty<address>();
    vector::push_back(&mut correctors, CORRECTOR_TEST_1);
    vector::push_back(&mut correctors, CORRECTOR_TEST_2);
    vector::push_back(&mut correctors, CORRECTOR_TEST_3);

    // Step 4: Call init_table with the publisher, admin_cap, and address lists
    init_table(&publisher, admin_cap, students, correctors, ts.ctx());
    ts.next_tx(ADMIN_TEST);

    // Step 5: Get back the AdminState
    let state = ts.take_from_sender<AdminState>();
    let admin_cap_corr = ts.take_from_sender<AdminCap>();

    // Step 6: Test the state of the admin
    std::unit_test::assert_eq!(state.list_size, 6);
    std::unit_test::assert_eq!(vector::length(&state.linkers), 6);

    let linker1 = vector::borrow(&state.linkers, 0);
    std::unit_test::assert_eq!(linker1.student, STUDENT_TEST_1);
    std::unit_test::assert_eq!(linker1.corrector, CORRECTOR_TEST_1);
    std::unit_test::assert_eq!(linker1.exam_id, 0);

    let linker2 = vector::borrow(&state.linkers, 1);
    std::unit_test::assert_eq!(linker2.student, STUDENT_TEST_2);
    std::unit_test::assert_eq!(linker2.corrector, CORRECTOR_TEST_2);
    std::unit_test::assert_eq!(linker2.exam_id, 1);

    let linker3 = vector::borrow(&state.linkers, 2);
    std::unit_test::assert_eq!(linker3.student, STUDENT_TEST_3);
    std::unit_test::assert_eq!(linker3.corrector, CORRECTOR_TEST_3);
    std::unit_test::assert_eq!(linker3.exam_id, 2);

    let linker4 = vector::borrow(&state.linkers, 3);
    std::unit_test::assert_eq!(linker4.student, STUDENT_TEST_4);
    std::unit_test::assert_eq!(linker4.corrector, CORRECTOR_TEST_1);
    std::unit_test::assert_eq!(linker4.exam_id, 3);

    let linker5 = vector::borrow(&state.linkers, 4);
    std::unit_test::assert_eq!(linker5.student, STUDENT_TEST_5);
    std::unit_test::assert_eq!(linker5.corrector, CORRECTOR_TEST_2);
    std::unit_test::assert_eq!(linker5.exam_id, 4);

    let linker6 = vector::borrow(&state.linkers, 5);
    std::unit_test::assert_eq!(linker6.student, STUDENT_TEST_6);
    std::unit_test::assert_eq!(linker6.corrector, CORRECTOR_TEST_3);
    std::unit_test::assert_eq!(linker6.exam_id, 5);
    ts.next_tx(ADMIN_TEST);


    // Step 7: Create the exams to be distributed that the Admin already "owns"
    let mut exams = vector::empty<ExamNFT>();

    let fakeUID_1 = ts::new_object(&mut ts);
    let text1: String = string::utf8(b"pdf1");
    let exam1 = ExamNFT{id: fakeUID_1, student: STUDENT_TEST_1, pdf_base64: text1};
    vector::push_back(&mut exams, exam1);

    let fakeUID_2 = ts::new_object(&mut ts);
    let text2: String = string::utf8(b"pdf2");
    let exam2 = ExamNFT{id: fakeUID_2, student: STUDENT_TEST_2, pdf_base64: text2};
    vector::push_back(&mut exams, exam2);

    let fakeUID_3 = ts::new_object(&mut ts);
    let text3: String = string::utf8(b"pdf3");
    let exam3 = ExamNFT{id: fakeUID_3, student: STUDENT_TEST_3, pdf_base64: text3};
    vector::push_back(&mut exams, exam3);

    let fakeUID_4 = ts::new_object(&mut ts);
    let text4: String = string::utf8(b"pdf4");
    let exam4 = ExamNFT{id: fakeUID_4, student: STUDENT_TEST_4, pdf_base64: text4};
    vector::push_back(&mut exams, exam4);

    let fakeUID_5 = ts::new_object(&mut ts);
    let text5: String = string::utf8(b"pdf5");
    let exam5 = ExamNFT{id: fakeUID_5, student: STUDENT_TEST_5, pdf_base64: text5};
    vector::push_back(&mut exams, exam5);

    let fakeUID_6 = ts::new_object(&mut ts);
    let text6: String = string::utf8(b"pdf6");
    let exam6 = ExamNFT{id: fakeUID_6, student: STUDENT_TEST_6, pdf_base64: text6};
    vector::push_back(&mut exams, exam6);

    // Step 8: Call send_to_correctors
    send_to_correctors(&publisher, admin_cap_corr, exams, &state, ts.ctx());
    ts.next_tx(ADMIN_TEST);

    // Step 9: Check if the correctors received the AnonymizeExam and that the students received back their exam
    std::unit_test::assert_eq!(ts::has_most_recent_for_address<ExamNFT>(STUDENT_TEST_1), true);

    std::unit_test::assert_eq!(ts::has_most_recent_for_address<AnonymizeExam>(CORRECTOR_TEST_1), true);
    std::unit_test::assert_eq!(ts::has_most_recent_for_address<AnonymizeExam>(CORRECTOR_TEST_2), true);
    std::unit_test::assert_eq!(ts::has_most_recent_for_address<AnonymizeExam>(CORRECTOR_TEST_3), true);

    ts.return_to_sender(state);
    ts.return_to_sender(publisher);
    ts.end();
}


// public fun send_to_correctors(
//     _publisher: &Publisher,
//     _admin: AdminCap,
//     mut exams: vector<ExamNFT>,
//     list: &AdminState,
//     ctx: &mut TxContext,
// )

// public struct ExamNFT has key, store { 
//     id: UID,
//     student: address,
//     pdf_base64: String,
// }

