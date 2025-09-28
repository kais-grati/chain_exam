import { useUserRole } from "../../UX/useUserRole";
import AdminDashboard from "../components/AdminDashboard";
import CorrectorDashboard from "../components/CorrectorDashboard";
import StudentDashboard from "../components/StudentDashboard";

export default function Dashboard() {
  const userRoleData = useUserRole();

  if (userRoleData) {
    const { role, isLoading, error } = userRoleData;

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
      <div className="flex flex-col items-center justify-center">
        {role === "admin" && <AdminDashboard />}
        {role === "student" && <StudentDashboard canUpload={true} />}
        {role === "corrector" && <CorrectorDashboard />}
        {role === "vo_student" && <StudentDashboard canUpload={false} />}
        {!role && <p>No role assigned</p>}
      </div>
    );
  }

  return <p>No account connected</p>;
}
