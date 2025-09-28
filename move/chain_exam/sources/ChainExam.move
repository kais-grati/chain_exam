module chain_exam::ChainExam;

use std::string::{Self, String};
use sui::package::{Self, Publisher};



const EWrongPublisher: u64 = 1;

// The address of the admin/publisher
const ADMIN: address = @0x73ad4cc938ae2752331f5b9c4bacfc3d92be0ba5a1cd0f739322af1505c3ea04;   // TODO: Change the Admin address


// One time witness for the Admin
public struct CHAINEXAM has drop {}


public struct AdminCap has key {
    id: UID,
}

// This cap is one time use during an exam, when you submit your exam it is destroyed
public struct StudentCap has key {
    id: UID,
}

// This cap is one time use after an exam, when you submit your feedback of the exam, it is destroyed
public struct CorrectorCap has key {
    id: UID,
}

// TODO: Encoding the pdf in base64 makes it readable by other users in the blockchain, we should encrypt it (TODO later)
public struct ExamNFT has key, store { 
    id: UID,
    student: address, // USELESS : The student sends to the admin the exam : stud addr = sender addr TODO (remove it)
    content: String,
}

// TODO: Apply the ML algorithm on the content and replace the content by the plain text in the pdf
public struct AnonymizeExam has key, store{
    id: UID,
    exam_id: u64,
    content: String,
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
public struct AdminState has key { // TODO : Removable
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
     _admin: &AdminCap,
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
}

// The admin sends a StudentCap to each student wallet address present in the list
public fun init_students(
    _publisher: &Publisher,
    _admin: &AdminCap, 
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
}

// The admin sends a CorrectorCap to each corrector wallet address present in the list
public fun init_correctors(
    _publisher: &Publisher,
    _admin: &AdminCap, 
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
}


// The student sends his exam to the admin
// The URL is a link to his exam's PDF in a decentralized storage service (like DropBox) // A REFAIRE
public fun send_exam(
    _student: StudentCap,
    content: String,
    ctx: &mut TxContext,
) {
    let nft = ExamNFT {
        id: object::new(ctx),
        student: ctx.sender(),
        content: content, // to encrypt
    };
    transfer::public_transfer(nft, ADMIN);
    let StudentCap { id } = _student;
    object::delete(id);
}

// To call this function ,the React frontend has to call a Mystern library function to get all the ExamNFT own
// by the admin to then call this function, pass this exam list in the argument "exams"
// Also pass in argument the AdminState

// For now, only send exams we received (don't take into account the case were a student didn't send his exam: TODO later)
public fun send_to_correctors(
    _publisher: &Publisher,
    _admin: &AdminCap,
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
        let content = exam_ref.content;

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
                    content: content,
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
    let CorrectorCap { id } = _corrector;
    object::delete(id);
}


public fun delete_admin_state(admin_state: AdminState, ctx: &mut TxContext) {
    // Vérifie que seul l'admin peut supprimer
    assert!(ADMIN == ctx.sender(), 0);

    // Déstructure l'objet pour récupérer son id
    let AdminState { id, linkers: _, list_size: _} = admin_state;
    object::delete(id);
}

public fun send_to_student( 
    _publisher: &Publisher,
    _admin: &AdminCap,
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
}

