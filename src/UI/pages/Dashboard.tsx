import { useUserRole } from "../../UX/useUserRole";

export default function Dashboard() {
  const userRoleData = useUserRole();

  if (userRoleData) {
    const { role, isLoading, error } = userRoleData;

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
      <div>
        {role === "admin" && <p>Welcome, Admin!</p>}
        {role === "student" && <p>Welcome, Student!</p>}
        {!role && <p>No role assigned</p>}
      </div>
    );
  }

  return <p>No account connected</p>;
}
