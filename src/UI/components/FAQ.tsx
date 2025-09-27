import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  HelpCircle,
  MessageCircle,
  Mail,
  Check,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: "1",
    question: "How does Chain Exam work?",
    answer:
      "Chain Exam uses blockchain technology to handle exam submissions and corrections. Students submit their answers securely, and teachers or evaluators grade them anonymously. The system ensures transparency, immutability, and fairness in every step.",
    category: "getting-started",
  },
  {
    id: "2",
    question: "Do I need special software to use Chain Exam?",
    answer:
      "No, Chain Exam is fully web-based. You just need an internet connection and a modern browser. For additional security, students and institutions may connect with crypto wallets for authentication.",
    category: "getting-started",
  },
  {
    id: "3",
    question: "How secure are exam submissions?",
    answer:
      "Every submission is encrypted and stored on the SUI decentralized network. This prevents tampering, guarantees data integrity, and protects against unauthorized access. Neither students nor evaluators can manipulate results once submitted.",
    category: "security",
  },
  {
    id: "4",
    question: "How does anonymous correction work?",
    answer:
      "Chain Exam removes extracts handwritten text from submissions before sending them to evaluators. Correctors have absolutely no information on the students. This ensures corrections are 100% anonymous and unbiased, improving fairness in the grading process.",
    category: "correction",
  },
  {
    id: "5",
    question: "Can institutions integrate Chain Exam with their systems?",
    answer: "Yes! Contact our expert team for specialized assistance",
    category: "integrations",
  },
  {
    id: "6",
    question: "What support do you provide?",
    answer:
      "We provide onboarding support, detailed documentation, and 24/7 technical assistance. Institutions also get dedicated account managers for smooth adoption and issue resolution.",
    category: "support",
  },
  {
    id: "7",
    question: "Is Chain Exam scalable for large institutions?",
    answer:
      "Absolutely. Chain Exam is built to handle thousands of concurrent exam submissions and corrections without downtime thanks to the powerful SUI blockchain. The decentralized design ensures high availability and reliability.",
    category: "features",
  },
  {
    id: "8",
    question: "Can students track their results?",
    answer:
      "Yes, students can view their results transparently on the platform. Since all corrections are logged on-chain, students and institutions can verify that grading was completed fairly and without bias.",
    category: "features",
  },
];

const categories = [
  { id: "all", name: "All Questions", icon: HelpCircle },
  { id: "getting-started", name: "Getting Started", icon: MessageCircle },
  { id: "security", name: "Security & Privacy", icon: Mail },
  { id: "correction", name: "Anonymous Correction", icon: Check },
  { id: "integrations", name: "Integrations", icon: HelpCircle },
  { id: "support", name: "Support", icon: Phone },
  { id: "features", name: "Features & Scalability", icon: MessageCircle },
];

const ChainExamFAQ = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openItems, setOpenItems] = useState<string[]>([]);

  const filteredFAQ =
    selectedCategory === "all"
      ? faqData
      : faqData.filter((item) => item.category === selectedCategory);

  const toggleItem = (itemId: string) => {
    setOpenItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-gray-50">
      {/* Softer Background */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-100/40 via-violet-50/30 to-indigo-50/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.08),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_70%,rgba(168,85,247,0.06),transparent_60%)]"></div>
      </div>

      {/* FAQ Content */}
      <motion.div
        className="max-w-4xl w-full relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header - Improved alignment and spacing */}
        <div className="flex flex-col gap-10 items-center justify-center mb-20">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            className="text-gray-700 text-lg md:text-xl max-w-2xl text-center leading-relaxed px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Everything you need to know about Chain Exam's blockchain-powered
            examination platform
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap p-10 justify-center gap-4 mb-16 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2.5 border ${
                  selectedCategory === category.id
                    ? "bg-purple-700 text-white shadow-lg border-purple-700 hover:bg-purple-800"
                    : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300 shadow-sm hover:shadow-md"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <IconComponent size={18} />
                {category.name}
              </motion.button>
            );
          })}
        </motion.div>

        {/* FAQ Accordion - Better spacing between items */}
        <motion.div
          className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {filteredFAQ.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div className="border-b border-gray-200 last:border-b-0">
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-8 py-7 text-left hover:bg-gray-50 transition-colors duration-200 group flex items-center justify-between"
                >
                  <span className="text-gray-900 font-semibold text-lg pr-8 leading-relaxed">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`text-purple-600 transition-transform duration-300 flex-shrink-0 ${
                      openItems.includes(item.id) ? "rotate-180" : ""
                    }`}
                    size={22}
                  />
                </button>

                {openItems.includes(item.id) && (
                  <motion.div
                    className="px-8 pb-7 text-gray-700 leading-relaxed"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="pt-6 text-base border-t border-gray-100">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Section */}
        <motion.div
          className="flex flex-col items-center p-10 justify-center mt-20 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-gray-600 mb-8 pb-4 text-lg md:text-xl text-center">
            Still have questions?
          </p>
          <Link to="/Help">
            <motion.button
              className="bg-gradient-to-r from-purple-700 to-violet-800 text-white px-12 py-4.5 rounded-full font-semibold hover:from-purple-800 hover:to-violet-900 transition-all duration-200 shadow-lg border-2 border-purple-700 hover:border-purple-800 text-base md:text-lg"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(139, 92, 246, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Support
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ChainExamFAQ;
