import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClient,
} from "@mysten/dapp-kit";
import InitTableButton from "../../UX/InitTableButton";
import { Transaction } from "@mysten/sui/transactions";
import { useNetworkVariable } from "../../UX/networkConfig";
import {getOwnedObjects} from "../../UX/suiQueryUtil";
import {
  ADMIN_CAP_TYPE,
  ADMIN_STATE_TYPE,
  EXAM_NFT_TYPE,
  FEEDBACK_TYPE,
  PUBLISHER_OBJECT,
} from "../../UX/constants";
import MoveCallButton from "../../UX/MoveCallButton";

export default function AdminDashboard() {
  const account = useCurrentAccount();
  const packageId = useNetworkVariable("counterPackageId");
  const suiClient = useSuiClient();
  const {
    mutate: signAndExecute,
    isSuccess,
    isPending,
  } = useSignAndExecuteTransaction();

  const adminCapQuery = getOwnedObjects([{ StructType: ADMIN_CAP_TYPE }]);
  const adminCap =
    adminCapQuery && adminCapQuery.length > 0 ? adminCapQuery[0] : "";
  const publisherObjQuery = getOwnedObjects([{ StructType: PUBLISHER_OBJECT }]);
  const publisherObj =
    publisherObjQuery && publisherObjQuery.length > 0
      ? publisherObjQuery[0]
      : "";
  const examsQuery = getOwnedObjects([{ StructType: EXAM_NFT_TYPE }]);
  const exams = examsQuery && examsQuery.length > 0 ? examsQuery : [];
  const adminStateQuery = getOwnedObjects([{ StructType: ADMIN_STATE_TYPE }]);
  const adminState =
    adminStateQuery && adminStateQuery.length > 0 ? adminStateQuery[0] : "";
  const feedbackQuery = getOwnedObjects([{StructType: FEEDBACK_TYPE}])
  const feedback = feedbackQuery && feedbackQuery.length > 0 ? feedbackQuery[0] : ""

  const handleSendToCorrectors = async () => {
    const tx = new Transaction();

    tx.moveCall({
      target: `${packageId}::ChainExam::send_to_correctors`,
      arguments: [
        tx.object(String(publisherObj)),
        tx.object(String(adminCap)),
        tx.makeMoveVec({
          type: EXAM_NFT_TYPE,
          elements: exams.map((exam) => tx.object(String(exam))),
        }),
        tx.object(String(adminState)),
      ],
    });

    signAndExecute({ transaction: tx });
  };

  const handleSendToStudents = async () => {
    const tx = new Transaction();

    tx.moveCall({
      target: `${packageId}::ChainExam::send_to_student`,
      arguments: [
        tx.object(String(publisherObj)),
        tx.object(String(adminCap)),
        tx.object(String(adminState)),
        tx.object(String(feedback))
      ],
    });

    signAndExecute({ transaction: tx });
  };

  const handleInitTable = async (
    studentAddresses: string[],
    correctorAddresses: string[],
  ) => {
    const tx = new Transaction();
    console.log(publisherObj);
    console.log(adminCap);
    console.log(studentAddresses);
    console.log(correctorAddresses);

    tx.moveCall({
      target: `${packageId}::ChainExam::init_table`,
      arguments: [
        tx.object(String(publisherObj)),
        tx.object(String(adminCap)),
        tx.pure.vector("address", studentAddresses),
        tx.pure.vector("address", correctorAddresses),
      ],
    });

    tx.moveCall({
      target: `${packageId}::ChainExam::init_students`,
      arguments: [
        tx.object(String(publisherObj)),
        tx.object(String(adminCap)),
        tx.pure.vector("address", studentAddresses),
      ],
    });

    tx.moveCall({
      target: `${packageId}::ChainExam::init_correctors`,
      arguments: [
        tx.object(String(publisherObj)),
        tx.object(String(adminCap)),
        tx.pure.vector("address", correctorAddresses),
      ],
    });

    signAndExecute({
      transaction: tx,
    });
  };
  return (
    
      <div className="flex flex-col justify-center items-center gap-2 max-w-50">
          <InitTableButton onSubmit={handleInitTable} />
          <MoveCallButton
            label={"Send to exams to correctors"}
            callback={handleSendToCorrectors}
          ></MoveCallButton>
          <MoveCallButton
            label={"Send grades to students"}
            callback={handleSendToStudents}
          ></MoveCallButton>
      </div>
  );
}
