import { motion } from "framer-motion";

const helpContacts = [
  { 
    category: "Technical Support", 
    email: "tech@chainexam.com",
    description: "Issues with platform functionality, bugs, or technical difficulties",
    icon: "🔧"
  },
  { 
    category: "Billing & Payments", 
    email: "billing@chainexam.com",
    description: "Questions about pricing, invoices, and payment methods",
    icon: "💳"
  },
  { 
    category: "Integrations & API", 
    email: "integrations@chainexam.com",
    description: "Help with API implementation and third-party integrations",
    icon: "🔗"
  },
  { 
    category: "Feedback & Suggestions", 
    email: "feedback@chainexam.com",
    description: "Share your ideas to help us improve Chain Exam",
    icon: "💡"
  },
  { 
    category: "General Inquiries", 
    email: "info@chainexam.com",
    description: "Questions about our platform, features, and services",
    icon: "❓"
  },
];

const faqs = [
  {
    question: "How secure is Chain Exam?",
    answer: "All data is encrypted and stored on the Sui blockchain, ensuring maximum security and immutability."
  },
  {
    question: "Can I integrate with my existing LMS?",
    answer: "Yes, we provide comprehensive APIs and integrations for popular learning management systems."
  },
  {
    question: "What's the pricing structure?",
    answer: "We offer flexible pricing based on usage. Contact our billing team for a customized quote."
  }
];

export default function HelpPage() {
  return (
    <div className="relative pt-20 min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden px-4 py-12">
      {/* Multiple Blurred Gradient Circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-25 blur-2xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[300px] rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 opacity-15 blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: "2s" }}></div>

      {/* Main Content Container - Flex Column */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl space-y-20">
        
        {/* Header Section - Flex Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 }}
          className="flex flex-col gap-5 items-center text-center"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Need Help?</h1>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mb-4"></div>
          <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
            Our dedicated team is here to assist you with any questions or challenges. 
            Choose the category that best fits your needs and get in touch.
          </p>
        </motion.div>

        {/* Contact Categories Section - Flex Column */}
        <div className="flex gap-8 pt-10 flex-col items-center w-full">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Get in Touch</h2>
          
          {/* Contact Cards Container - Flex Row Wrap */}
          <div className="flex flex-row flex-wrap justify-center gap-9 max-w-5xl">
            {helpContacts.map(({ category, email, description, icon }, index) => (
              <motion.div
                key={email}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex flex-col items-center text-center bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg cursor-pointer transition-all duration-300 border border-gray-100 flex-1 min-w-[240px] max-w-[280px]"
              >
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {category}
                </h3>
                <p className="text-gray-600 text-xs mb-3 leading-relaxed flex-1">
                  {description}
                </p>
                <a
                  href={`mailto:${email}`}
                  className="text-blue-500 hover:text-blue-700 transition-colors font-medium flex items-center text-sm"
                >
                  {email}
                  <span className="ml-2">→</span>
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ Section - Flex Column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex gap-8 flex-col pt-30 items-center w-full max-w-2xl"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          
          {/* FAQ Items Container - Flex Column */}
          <div className="flex flex-col gap-4 w-full">
            {faqs.map(({ question, answer }, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="flex flex-col bg-gray-50 rounded-lg p-5 border border-gray-100"
              >
                <h3 className="text-base font-semibold text-gray-900 mb-2">{question}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action Section - Flex Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex gap-6 pt-8 flex-col items-center text-center"
        >
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for?
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex"
          >
            <a
              href="mailto:info@chainexam.com"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Contact Us Directly
            </a>
          </motion.div>
        </motion.div>

      </div>

      {/* Subtle floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-10 animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}