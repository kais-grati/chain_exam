import React, { useState } from "react";
import { ANONYMIZE_EXAM_TYPE, CORRECTOR_CAP_TYPE } from "../../UX/constants";
import { getObjectContent, getOwnedObjects } from "../../UX/suiQueryUtil";
import { Transaction } from "@mysten/sui/transactions";
import { useNetworkVariable } from "../../UX/networkConfig";
import { useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";

interface Exam {
  content: string;
  exam_id: string;
  id: any;
}

interface ExamData {
  contents: Exam[];
  isLoading: boolean;
  error: Error | null;
}

interface GradeSubmission {
  exam_id: string;
  grade: number;
  comment: string;
}

export default function CorrectorDashboard() {
  const exams: ExamData = getObjectContent([{ StructType: ANONYMIZE_EXAM_TYPE }]);
  const [currentExamIndex, setCurrentExamIndex] = useState(0);
  const [grade, setGrade] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [submittedExams, setSubmittedExams] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const packageId = useNetworkVariable("counterPackageId");
  const suiClient = useSuiClient();
  const {
    mutate: signAndExecute,
    isSuccess,
    isPending,
  } = useSignAndExecuteTransaction();

  const correctorCapQuery = getOwnedObjects([
    { StructType: CORRECTOR_CAP_TYPE },
  ]);
  const correctorCap =
    correctorCapQuery && correctorCapQuery.length > 0
      ? correctorCapQuery[0]
      : "";

  const handleSubmit = async () => {
    if (!grade || !comment.trim()) {
      alert("Please provide both a grade and a comment");
      return;
    }

    const gradeNum = parseFloat(grade);
    if (isNaN(gradeNum) || gradeNum < 0 || gradeNum > 100) {
      alert("Please enter a valid grade between 0 and 6");
      return;
    }

    setIsSubmitting(true);

    try {
      const currentExam = exams.contents[currentExamIndex];
      const submission: GradeSubmission = {
        exam_id: currentExam.exam_id,
        grade: gradeNum,
        comment: comment.trim(),
      };

      const tx = new Transaction();

      tx.moveCall({
        target: `${packageId}::ChainExam::send_feedback`,
        arguments: [
          tx.object(String(correctorCap)),
          tx.pure.u64(gradeNum),
          tx.pure.u64(Number(currentExam.exam_id)),
          tx.pure.string(comment.trim()),
        ],
      });

      signAndExecute({ transaction: tx });

      // Mark exam as submitted
      setSubmittedExams((prev) => new Set([...prev, currentExam.exam_id]));

      // Reset form
      setGrade("");
      setComment("");

      // Move to next exam if available
      if (currentExamIndex < exams.contents.length - 1) {
        setCurrentExamIndex(currentExamIndex + 1);
      }

      alert("Grade submitted successfully!");
    } catch (error) {
      console.error("Error submitting grade:", error);
      alert("Error submitting grade. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToNextExam = () => {
    if (currentExamIndex < exams.contents.length - 1) {
      setCurrentExamIndex(currentExamIndex + 1);
      setGrade("");
      setComment("");
    }
  };

  const goToPreviousExam = () => {
    if (currentExamIndex > 0) {
      setCurrentExamIndex(currentExamIndex - 1);
      setGrade("");
      setComment("");
    }
  };

  if (exams.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="text-gray-600">Loading exams...</span>
        </div>
      </div>
    );
  }

  if (exams.error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Error loading exams
            </h3>
            <p className="mt-1 text-sm text-red-700">{exams.error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!exams.contents || exams.contents.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <div className="text-gray-500">
          <svg
            className="mx-auto h-12 w-12 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No exams to correct
          </h3>
          <p className="text-gray-500">
            There are currently no exams available for correction.
          </p>
        </div>
      </div>
    );
  }

  const currentExam = exams.contents[currentExamIndex];
  const isCurrentExamSubmitted = submittedExams.has(currentExam.exam_id);
  const totalExams = exams.contents.length;
  const correctedExams = submittedExams.size;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Exam Correction Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Progress: {correctedExams}/{totalExams} exams corrected
            </p>
          </div>
          <div className="flex gap-5 items-center space-x-2">
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Exam {currentExamIndex + 1} of {totalExams}
            </div>
            {isCurrentExamSubmitted && (
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Corrected
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Exam Content */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Exam Content - ID: {currentExam.exam_id}
            </h2>
          </div>
          <div className="p-6">
            <div className="bg-gray-50 rounded-lg p-4 min-h-96 max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">
                {currentExam.content}
              </pre>
            </div>
          </div>
        </div>

        {/* Grading Form */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Grade Assignment
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="grade"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Grade (0-100)
                </label>
                <input
                  type="number"
                  id="grade"
                  min="0"
                  max="100"
                  step="1"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter grade (e.g., 65)"
                  disabled={isCurrentExamSubmitted}
                />
              </div>

              <div>
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Comments & Feedback
                </label>
                <textarea
                  id="comment"
                  rows={8}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  placeholder="Provide detailed feedback for the student..."
                  disabled={isCurrentExamSubmitted}
                />
                <p className="text-sm text-gray-500 mt-1">
                  {comment.length} characters
                </p>
              </div>

              {!isCurrentExamSubmitted && (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    "Submit Grade"
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <button
            onClick={goToPreviousExam}
            disabled={currentExamIndex === 0}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Previous Exam
          </button>

          <div className="text-sm text-gray-600">
            Exam {currentExamIndex + 1} of {totalExams}
          </div>

          <button
            onClick={goToNextExam}
            disabled={currentExamIndex === totalExams - 1}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next Exam
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
