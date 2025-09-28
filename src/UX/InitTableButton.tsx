import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Wallet, UserCheck, Users } from 'lucide-react';

interface WalletModalProps {
  onSubmit: (studentAddresses: string[], correctorAddresses: string[]) => void;
  buttonText?: string;
  buttonClassName?: string;
}

export default function InitTableButton({ 
  onSubmit, 
  buttonText = "Create Exam",
  buttonClassName = ""
}: WalletModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [studentInput, setStudentInput] = useState('');
  const [correctorInput, setCorrectorInput] = useState('');
  const [studentAddresses, setStudentAddresses] = useState<string[]>([]);
  const [correctorAddresses, setCorrectorAddresses] = useState<string[]>([]);

  const handleAddStudent = () => {
    if (studentInput.trim() && !studentAddresses.includes(studentInput.trim())) {
      setStudentAddresses([...studentAddresses, studentInput.trim()]);
      setStudentInput('');
    }
  };

  const handleAddCorrector = () => {
    if (correctorInput.trim() && !correctorAddresses.includes(correctorInput.trim())) {
      setCorrectorAddresses([...correctorAddresses, correctorInput.trim()]);
      setCorrectorInput('');
    }
  };

  const handleRemoveStudent = (index: number) => {
    setStudentAddresses(studentAddresses.filter((_, i) => i !== index));
  };

  const handleRemoveCorrector = (index: number) => {
    setCorrectorAddresses(correctorAddresses.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    onSubmit(studentAddresses, correctorAddresses);
    setIsOpen(false);
    setStudentAddresses([]);
    setCorrectorAddresses([]);
    setStudentInput('');
    setCorrectorInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      action();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={buttonClassName || "px-6 py-3 w-64 bg-blue-500 hover:bg-blue-900 font-semibold rounded-lg shadow-lg transition-all justify-center items-center duration-200 flex items-center gap-2 cursor-pointer text-white"}
      >
        <Wallet className="w-7 h-5 " />
        {buttonText}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex justify-center items-center p-4"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-2xl shadow-2xl z-50 max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="bg-blue-900 p-6 text-white">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Wallet className="w-6 h-6" />
                    Create Exam
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto flex-1">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Student Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-700 font-semibold">
                      <Users className="w-5 h-5 text-blue-900" />
                      <h3 className="text-lg">Student Wallets</h3>
                    </div>
                    
                    <div className="flex pt-2 pb-3 gap-2">
                      <input
                        type="text"
                        value={studentInput}
                        onChange={(e) => setStudentInput(e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e, handleAddStudent)}
                        placeholder="Enter wallet address"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={handleAddStudent}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-900 transition-colors flex items-center gap-1"
                      >
                        <Plus className="w-4 h-4" />
                        Add
                      </button>
                    </div>

                    <div className="space-y-2 min-h-[150px] max-h-[250px] overflow-y-auto bg-gray-50 rounded-lg p-3">
                      {studentAddresses.length === 0 ? (
                        <p className="text-gray-400 text-sm text-center py-4">No addresses added yet</p>
                      ) : (
                        studentAddresses.map((address, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex items-center justify-between bg-white p-2 rounded-lg shadow-sm group"
                          >
                            <span className="text-sm font-mono text-gray-700 truncate flex-1 pr-2">
                              {address}
                            </span>
                            <button
                              onClick={() => handleRemoveStudent(index)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded text-red-600"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </motion.div>
                        ))
                      )}
                    </div>
                    <p className="text-xs text-gray-500">Total: {studentAddresses.length} addresses</p>
                  </div>

                  {/* Corrector Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-700 font-semibold">
                      <UserCheck className="w-5 h-5 text-blue-900" />
                      <h3 className="text-lg">Corrector Wallets</h3>
                    </div>
                    
                    <div className="flex pt-2 pb-3 gap-2">
                      <input
                        type="text"
                        value={correctorInput}
                        onChange={(e) => setCorrectorInput(e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e, handleAddCorrector)}
                        placeholder="Enter wallet address"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={handleAddCorrector}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-900 transition-colors flex items-center gap-1"
                      >
                        <Plus className="w-4 h-4" />
                        Add
                      </button>
                    </div>

                    <div className="space-y-2 mt-4 mb-4 min-h-[150px] max-h-[250px] overflow-y-auto bg-gray-50 rounded-lg p-3">
                      {correctorAddresses.length === 0 ? (
                        <p className="text-gray-400 text-sm text-center py-4">No addresses added yet</p>
                      ) : (
                        correctorAddresses.map((address, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex items-center justify-between bg-white p-2 rounded-lg shadow-sm group"
                          >
                            <span className="text-sm font-mono text-gray-700 truncate flex-1 pr-2">
                              {address}
                            </span>
                            <button
                              onClick={() => handleRemoveCorrector(index)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded text-red-600"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </motion.div>
                        ))
                      )}
                    </div>
                    <p className="text-xs text-gray-500">Total: {correctorAddresses.length} addresses</p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t p-6 bg-gray-50">
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={studentAddresses.length === 0 && correctorAddresses.length === 0}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit ({studentAddresses.length + correctorAddresses.length} addresses)
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
