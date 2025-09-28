import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { Instagram, Github, Send } from "lucide-react";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-900 text-gray-200 py-7 px-4 text-center"
    >
        <h2 
        className="text-2xl font-bold font-lexer   mb-2 cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Chain Exam
        </h2>

      <p className="text-gray-400 py-6 pt-4">
        Decentralized platform for secure, anonymous, and unbiased exam corrections.
      </p>

      {/* Container adaptatif : flex-col sur mobile, flex-row sur desktop */}
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4 md:gap-7 mb-7 w-full py-3 px-4">
        
        <motion.div 
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-800 p-6 rounded-lg w-full md:flex-1 hover:bg-gray-750 hover:shadow-lg cursor-pointer min-w-0 min-h-24 md:min-h-48"
        >
          {/* Container adaptatif : flex-row sur mobile, flex-col sur desktop */}
          <div className="flex flex-row md:flex-col items-center justify-center md:space-y-4 space-x-4 md:space-x-0 pt-2 md:pt-6 h-full">
            <Mail className="w-7 h-7 text-blue-400 mb-0 md:mb-2" />
            <div className="text-left md:text-center">
              <h3 className="text-lg font-semibold text-white">Email</h3>
              <p className="text-gray-300">support@chainexam.com</p>
            </div>
          </div>
        </motion.div>

        
        <motion.div 
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-800 p-6 rounded-lg w-full md:flex-1 hover:bg-gray-750 hover:shadow-lg cursor-pointer min-w-0 min-h-24 md:min-h-48"
        >
          <div className="flex flex-row md:flex-col items-center justify-center md:space-y-4 space-x-4 md:space-x-0 pt-2 md:pt-6 h-full">
            <Phone className="w-7 h-7 text-purple-400 mb-0 md:mb-6" />
            <div className="text-left md:text-center">
              <h3 className="text-lg font-semibold text-white">Phone</h3>
              <p className="text-gray-300">+41 11 22 33 44</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-800 p-6 rounded-lg w-full md:flex-1 hover:bg-gray-750 hover:shadow-lg cursor-pointer min-w-0 min-h-24 md:min-h-48"
        >
          <div className="flex flex-row md:flex-col items-center justify-center md:space-y-4 space-x-4 md:space-x-0 pt-2 md:pt-6 h-full">
            <MapPin className="w-7 h-7 text-indigo-400 mb-0 md:mb-2" />
            <div className="text-left md:text-center">
              <h3 className="text-lg font-semibold text-white">Location</h3>
              <p className="text-gray-300">Votre texte ici</p>
            </div>
          </div>
        </motion.div>

      </div>
<div className="flex justify-center items-center py-4 gap-10 mb-6">

    <motion.a
      href="https://instagram.com/chainexam"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.2, rotate: 5 }}
      transition={{ duration: 0.3 }}
      className="text-gray-400 hover:text-pink-400 cursor-pointer"
    >
      <Instagram className="w-7 h-7" />
    </motion.a>

    
    <motion.a
      href="https://github.com/chainexam"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.2, rotate: -5 }}
      transition={{ duration: 0.3 }}
      className="text-gray-400 hover:text-white cursor-pointer"
    >
      <Github className="w-7 h-7" />
    </motion.a>

    
    <motion.a
      href="https://t.me/chainexam"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.2, rotate: 5 }}
      transition={{ duration: 0.3 }}
      className="text-gray-400 hover:text-blue-400 cursor-pointer"
    >
      <Send className="w-7 h-7" />
    </motion.a>

</div>

      <p className="text-gray-500 text-sm pt-4">&copy; {new Date().getFullYear()} Chain Exam. All rights reserved.</p>
    </motion.footer>
  );
}