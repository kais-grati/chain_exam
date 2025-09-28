import { useUserRole } from "../../UX/useUserRole";
import AdminDashboard from "../components/AdminDashboard";
import StudentDashboard from "../components/StudentDashboard";

export default function Dashboard() {
  const userRoleData = useUserRole();

  if (userRoleData) {
    const { role, isLoading, error } = userRoleData;

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
      <div>
        {role === "admin" && <AdminDashboard />}
        {role === "student" && <StudentDashboard />}
        {!role && <p>No role assigned</p>}
      </div>
    );
  }

  return <p>No account connected</p>;
}
