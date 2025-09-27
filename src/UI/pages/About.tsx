import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="relative w-screen h-screen flex items-center justify-center bg-white overflow-hidden px-4">
      {/* Centered blurred radial gradient */}
      <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-30 blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-3xl text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold p-10 text-gray-900 mb-6">
          About Chain Exam
        </h1>
        <p className="text-gray-600 p-1 mb-6">
          Chain Exam is a decentralized platform built on the Sui blockchain for secure, anonymous, and unbiased exam submissions and corrections. Our mission is to bring transparency, fairness, and efficiency to academic and professional assessments.
        </p>

        <p className="text-gray-600 p-1 mb-6">
          Leveraging Sui's high-performance blockchain, all exam submissions are encrypted and recorded on-chain. Corrections are anonymous, tamper-proof, and verifiable, ensuring trust between students, evaluators, and institutions.
        </p>

        <p className="text-gray-600 p-1 mb-6">
          Our platform also offers easy integrations, real-time reporting, and scalable infrastructure to handle exams of any size. Chain Exam empowers educators and institutions to focus on learning while ensuring fair and transparent results.
        </p>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="mt-6 inline-block bg-gray-100 rounded-xl p-4 shadow-md cursor-pointer transition-transform"
        >
          <p className="text-gray-900 font-semibold">Learn More About Sui Blockchain</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
