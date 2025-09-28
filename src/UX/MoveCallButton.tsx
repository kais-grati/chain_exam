import { useState } from "react";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";


interface MoveButtonProps {
  label: string;
  callback: () => void;
}


export default function MoveCallButton({
  label,
  callback,
}: MoveButtonProps) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleClick = async () => {
    try {
      setStatus("loading");

      const result = await callback();

      console.log("Transaction success:", result);
      setStatus("success");
    } catch (err) {
      console.error("Transaction failed:", err);
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 3000); 
    }
  };

  return (
  
      <button
        onClick={handleClick}
        disabled={status === "loading"}
        className={`w-64 h-12 px-4 py-8  rounded-lg flex justify-center items-center gap-2 font-medium transition-colors
          ${status === "idle" ? "bg-blue-500 hover:bg-blue-900 text-white" : ""}
          ${status === "loading" ? "bg-gray-400 cursor-not-allowed text-white" : ""}
          ${status === "success" ? "bg-green-500 text-white" : ""}
          ${status === "error" ? "bg-red-500 text-white" : ""}
        `}
      >
        <Send className="w-4 h-4" />
        {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
        {status === "success" && <CheckCircle className="h-4 w-4" />}
        {status === "error" && <XCircle className="h-4 w-4" />}
        <span>
          {status === "idle" && label}
          {status === "loading" && "Processing..."}
          {status === "success" && "Success!"}
          {status === "error" && "Failed"}
        </span>
      </button>
    
    
  );
}
