import { useUserRole } from "../../UX/useUserRole";
import StudentDashboard from "../components/StudentDashboard";

export default function Dashboard() {
  const userRoleData = useUserRole();

  if (userRoleData) {
    const { role, isLoading, error } = userRoleData;

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
      <div>
        {role === "admin" && <p>Welcome, Admin!</p>}
        {role === "student" && <StudentDashboard />}
        {!role && <p>No role assigned</p>}
      </div>
    );
  }

  return <p>No account connected</p>;
}
