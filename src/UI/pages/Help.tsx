import { motion } from "framer-motion";

const helpContacts = [
  { category: "Technical Support", email: "tech@chainexam.com" },
  { category: "Billing & Payments", email: "billing@chainexam.com" },
  { category: "Integrations & API", email: "integrations@chainexam.com" },
  { category: "Feedback & Suggestions", email: "feedback@chainexam.com" },
  { category: "General Inquiries", email: "info@chainexam.com" },
];

export default function HelpPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden px-4">
      {/* Blurred Radial Gradient Circle in the center */}
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-30 blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl w-full text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Need Help?</h1>
        <p className="text-gray-600 mb-10">
          Our team is here to assist you. Choose the category that fits your
          question and reach out via email.
        </p>

        <div className="grid sm:grid-cols-2 p-10 gap-8">
          {helpContacts.map(({ category, email }) => (
            <motion.div
              key={email}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-100 rounded-xl p-6 shadow-md cursor-pointer transition-transform"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {category}
              </h3>
              <a
                href={`mailto:${email}`}
                className="text-blue-500 hover:text-blue-700 transition-colors"
              >
                {email}
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
