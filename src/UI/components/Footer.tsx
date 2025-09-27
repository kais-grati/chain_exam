import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-900 text-gray-200 py-8 px-4 text-center"
    >
      <h2 className="text-xl font-bold mb-2">Chain Exam</h2>
      <p className="text-gray-400 mb-6">
        Decentralized platform for secure, anonymous, and unbiased exam corrections.
      </p>

      <div className="flex flex-wrap justify-center gap-8 mb-6">
        <div>
          Email:{" "}
          <a
            href="mailto:support@chainexam.com"
            className="text-blue-400 hover:text-blue-600 transition-colors"
          >
            support@chainexam.com
          </a>
        </div>
        <div>
          Phone:{" "}
          <a
            href="tel:+1234567890"
            className="text-blue-400 hover:text-blue-600 transition-colors"
          >
            +1 234 567 890
          </a>
        </div>
        <div className="hover:text-blue-400 transition-colors">
          Location: Lausanne, EPFL
        </div>
      </div>

      <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Chain Exam. All rights reserved.</p>
    </motion.footer>
  );
}
