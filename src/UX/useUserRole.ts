import { useCurrentAccount, useSuiClientQuery } from '@mysten/dapp-kit';
import { ADMIN_CAP_TYPE, STUDENT_CAP_TYPE } from './constants';

export function useUserRole() {
  const account = useCurrentAccount();

  // always call the hook
  const { data, isLoading, error } = useSuiClientQuery(
    'getOwnedObjects',
    {
      owner: account?.address ?? '', 
      filter: {
        MatchAny: [
          { StructType: ADMIN_CAP_TYPE },
          { StructType: STUDENT_CAP_TYPE },
        ],
      },
      options: { showType: true },
    },
    {
      enabled: !!account, 
    }
  );

  let role = null;
  if (data && data.data.length > 0) {
    const types = data.data.map(obj => obj.data?.type);
    if (types.includes(ADMIN_CAP_TYPE)) role = 'admin';
    else if (types.includes(STUDENT_CAP_TYPE)) role = 'student';
  }

  return account ? { role, isLoading, error } : null;
}
