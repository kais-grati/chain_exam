import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClient,
} from "@mysten/dapp-kit";
import InitTableButton from "../../UX/InitTableButton";
import { Transaction } from "@mysten/sui/transactions";
import { useNetworkVariable } from "../../UX/networkConfig";
import { motion } from "framer-motion";
import getOwnedObjects from "../../UX/suiQueryUtil";
import {
  ADMIN_CAP_TYPE,
  ADMIN_STATE_TYPE,
  EXAM_NFT_TYPE,
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
  const adminState = adminStateQuery && adminStateQuery.length > 0 ? adminStateQuery[0] : "";

  const handleSendToCorrectors = async () => {
    const tx = new Transaction();
    console.log("object")
    console.log(adminState);

    tx.moveCall({
      target: `${packageId}::ChainExam::send_to_correctors`,
      arguments: [
        tx.object(String(publisherObj)),
        tx.object(String(adminCap)),
        tx.makeMoveVec({
          type: EXAM_NFT_TYPE,
          elements: exams.map((exam) => tx.object(String(exam))),
        }),
        tx.object(adminState),
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
    <div className=" flex items-center text-center justify-center py-40 overflow-hidden">
      {/* Multiple Blurred Gradient Circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-25 blur-2xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[300px] rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 opacity-15 blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: "2s" }}></div>

      {/* Main Content Container - Flex Column */}
      <div className="items-center z-10 gap-5 text-center pt-13 flex flex-col w-full max-w-5xl space-y-20">
      <>
        <InitTableButton onSubmit={handleInitTable} />
        <MoveCallButton
          label={"Send to exams to correctors"}
          callback={handleSendToCorrectors}
        ></MoveCallButton>
      </>
    </div>
    </div>
  );
}
