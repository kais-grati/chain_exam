import { useCurrentAccount } from "@mysten/dapp-kit";

export default function Dashboard() {
  const currentAccount = useCurrentAccount();

  return (
    currentAccount ? <h1>Dashboard</h1> : <h1>Please log in</h1>
  );
}
