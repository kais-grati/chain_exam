module counter::ChainExam;

use std::string::String;
//use sui::package::{Self, Publisher};



//const EWrongPublisher: u64 = 1;

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
    student: address,
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
    //package::claim_and_keep(otw, ctx);
    let admin_cap = AdminCap{
        id: object::new(ctx)
    };
    // transfer the AdminCap to the publisher wallet
    transfer::transfer(admin_cap, ctx.sender()); 
}

// Create a table that maps students and a index to a corrector (a corrector can have multiple students to correct)
public fun init_table(
     _admin: AdminCap,
     student_addresses: vector<address>,
     corrector_addresses: vector<address>,
     ctx: &mut TxContext,
){
    //assert!(publisher.from_module<ADMIN>(), EWrongPublisher); 

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
    _admin: AdminCap, 
    student_addresses: vector<address>,
    ctx: &mut TxContext,
) {
    //assert!(publisher.from_module<ADMIN>(), EWrongPublisher); 

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
public fun init_corrector(
    _admin: AdminCap, 
    corrector_addresses: vector<address>,
    ctx: &mut TxContext,
) {
    // Check to be sure that the publisher/admin called this function
    //assert!(publisher.from_module<ADMIN>(), EWrongPublisher); 

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
    _admin: AdminCap,
    mut exams: vector<ExamNFT>,
    list: &AdminState,
    ctx: &mut TxContext,
) {
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
        transfer::transfer(exam_ref, student);
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
    _admin: AdminCap,
    list: &AdminState,
    feedback: Feedback,
    ctx: &mut TxContext,
){
    // Check to be sure that the publisher/admin called this function
    //assert!(publisher.from_module<ADMIN>(), EWrongPublisher);

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

// TESTING

// ===== TEST ONLY =====

#[test_only]
use sui::{test_scenario as ts, test_utils::{assert_eq, destroy}};

#[test_only]
const ADMIN_TEST: address = @0xAA;
#[test_only]
const STUDENT_TEST: address = @0xBB;
#[test_only]
const CORRECTOR_TEST: address = @0xCC;

#[test]
fun test_publisher_address_gets_admin_cap() {
    let mut ts = ts::begin(ADMIN_TEST);

    assert_eq(ts::has_most_recent_for_address<AdminCap>(ADMIN_TEST), false);

    init(ts.ctx());

    ts.next_tx(ADMIN_TEST);

    assert_eq(ts::has_most_recent_for_address<AdminCap>(ADMIN_TEST), true);

    ts.end();
}




