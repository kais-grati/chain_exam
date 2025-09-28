import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClient,
} from "@mysten/dapp-kit";
import InitTableButton from "../../UX/InitTableButton";
import { Transaction } from "@mysten/sui/transactions";
import { useNetworkVariable } from "../../UX/networkConfig";
import getOwnedObjects from "../../UX/suiQueryUtil";
import { ADMIN_CAP_TYPE, PUBLISHER_OBJECT } from "../../UX/constants";

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

  const handleInitTable = async (
    studentAddresses: string[],
    correctorAddresses: string[],
  ) => {
    const tx = new Transaction();
    console.log(publisherObj)
    console.log(adminCap)
    console.log(studentAddresses)
    console.log(correctorAddresses)

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
  return <InitTableButton onSubmit={handleInitTable} />;
}
