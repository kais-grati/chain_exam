import ImageUpload from "../../UX/ImageUpload";
import { getObjectContent, getOwnedObjects } from "../../UX/suiQueryUtil";
import { FEEDBACK_TYPE } from "../../UX/constants";

interface StudentDashboardProps {
  canUpload: boolean;
}

export default function StudentDashboard({ canUpload }: StudentDashboardProps) {
  const feedback = getObjectContent([{ StructType: FEEDBACK_TYPE }]);
  console.log(feedback);
  return (
    <div className="flex flex-col items-center space-y-6">
      {canUpload && <ImageUpload />}

      <div className="w-full max-w-xl">
        <h2 className="text-2xl font-semibold mb-4">Feedback Received</h2>
        {feedback.contents && feedback.contents.length > 0 ? (
          <ul className="space-y-4">
            {feedback.contents.map((item: any) => (
              <li
                key={item.id?.id || Math.random()}
                className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Exam ID: {item.exam_id}</span>
                  <span className="font-bold text-indigo-600">
                    Grade: {item.grade}
                  </span>
                </div>
                <p className="text-gray-700">{item.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No feedback available yet.</p>
        )}
      </div>
    </div>
  );
}
