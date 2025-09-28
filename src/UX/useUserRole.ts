import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";
import {
  ADMIN_CAP_TYPE,
  ALL_CAPS,
  STUDENT_CAP_TYPE,
  CORRECTOR_CAP_TYPE,
  FEEDBACK_TYPE,
} from "./constants";

export function useUserRole() {
  const account = useCurrentAccount();

  // always call the hook
  const { data, isLoading, error } = useSuiClientQuery(
    "getOwnedObjects",
    {
      owner: account?.address ?? "",
      filter: {
        MatchAny: ALL_CAPS.concat([{StructType: FEEDBACK_TYPE}]),
      },
      options: { showType: true },
    },
    {
      enabled: !!account,
    },
  );

  let role = null;
  if (data && data.data.length > 0) {
    const types = data.data.map((obj) => obj.data?.type);
    if (types.includes(ADMIN_CAP_TYPE)) role = "admin";
    else if (types.includes(STUDENT_CAP_TYPE)) role = "student";
    else if (types.includes(CORRECTOR_CAP_TYPE)) role = "corrector";
    else if (types.includes(FEEDBACK_TYPE)) role = "vo_student";
  }

  return account ? { role, isLoading, error } : null;
}
