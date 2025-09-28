import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";

export default function getOwnedObjects(obj: { StructType: string }[]) {
  const account = useCurrentAccount();

  const { data, isLoading, error } = useSuiClientQuery(
    "getOwnedObjects",
    {
      owner: account?.address ?? "",
      filter: {
        MatchAny: obj,
      },
      options: { showType: true },
    },
    {
      enabled: !!account,
    },
  );
  if (data && data.data.length > 0) {
    return data.data.map((obj) => obj.data?.objectId);
  }
  return null

}
