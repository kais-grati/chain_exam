import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";

export function getOwnedObjects(obj: { StructType: string }[]) {
  const account = useCurrentAccount();

  const { data, isLoading, error } = useSuiClientQuery(
    "getOwnedObjects",
    {
      owner: account?.address ?? "",
      filter: {
        MatchAny: obj,
      },
      options: { showType: true, showContent: true },
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

export function getObjectContent(structTypes: { StructType: string }[]) {
  const account = useCurrentAccount();

  const { data, isLoading, error } = useSuiClientQuery(
    "getOwnedObjects",
    {
      owner: account?.address ?? "",
      filter: { MatchAny: structTypes },
      options: { showContent: true },
    },
    { enabled: !!account }
  );

  const contents =
    data?.data?.map((obj) => (obj.data?.content as any)?.fields) || [];

  return { contents, isLoading, error };
}

