// import { Link } from "react-router-dom"; // Uncomment when using in your project
import { motion } from "framer-motion";

function HookBody() {
  return (
    <div className="relative flex flex-col items-center text-center justify-center py-40 overflow-hidden">
      {/* Background gradient shapes - extensive coverage with dramatic framer-motion */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large primary shapes covering major areas */}
        <motion.div 
          className="absolute -top-40 -left-40 w-[800px] h-[600px] bg-gradient-to-br from-blue-500/25 to-purple-600/30 rounded-full blur-3xl"
          animate={{
            x: [0, 120, -80, 0],
            y: [0, -100, 150, 0],
            scale: [1, 1.4, 0.6, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute -top-60 -right-60 w-[700px] h-[700px] bg-gradient-to-bl from-cyan-400/30 to-blue-700/25 rounded-full blur-3xl"
          animate={{
            x: [0, -150, 100, 0],
            y: [0, 120, -60, 0],
            rotate: [0, 360, 720, 1080],
            scale: [1, 0.5, 1.6, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div 
          className="absolute -bottom-60 left-1/2 transform -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-t from-indigo-500/28 to-blue-400/22 rounded-full blur-3xl"
          animate={{
            x: [0, -200, 150, 0],
            y: [0, 80, -120, 0],
            scale: [1, 0.4, 1.8, 1],
            rotate: [0, -90, -180, -270, -360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Large side coverage */}
        <motion.div 
          className="absolute top-1/2 -right-40 transform -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-l from-violet-500/25 to-blue-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, -120, 180, 0],
            y: [0, 100, -140, 0],
            rotate: [0, -180, -360, -540, -720],
            scale: [1, 1.7, 0.3, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute top-1/4 -left-32 w-[500px] h-[350px] bg-gradient-to-r from-sky-500/30 to-blue-500/25 rounded-full blur-3xl"
          animate={{
            x: [0, 160, -100, 0],
            y: [0, -120, 200, 0],
            scale: [1, 2.0, 0.2, 1],
            rotate: [0, 270, 540, 810],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Additional large coverage shapes */}
        <motion.div 
          className="absolute top-0 left-1/3 w-[650px] h-[400px] bg-gradient-to-b from-purple-400/20 to-blue-300/15 rounded-full blur-3xl"
          animate={{
            x: [0, -140, 80, 0],
            y: [0, 180, -100, 0],
            rotate: [0, 480, 960, 1440],
            scale: [1, 0.3, 1.9, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div 
          className="absolute bottom-0 right-1/3 w-[550px] h-[450px] bg-gradient-to-t from-cyan-500/25 to-indigo-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, -160, 0],
            y: [0, -160, 120, 0],
            scale: [1, 0.4, 2.2, 1],
            rotate: [0, -300, -600, -900],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Medium overlay shapes */}
        <motion.div 
          className="absolute top-1/5 left-1/2 transform -translate-x-1/2 w-[400px] h-[300px] bg-gradient-to-br from-blue-400/35 to-purple-500/25 rounded-full blur-2xl"
          animate={{
            x: [0, -80, 140, 0],
            y: [0, 120, -80, 0],
            rotate: [0, -225, -450, -675, -900],
            scale: [1, 1.8, 0.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute top-3/4 left-1/4 w-[450px] h-[320px] bg-gradient-to-tr from-violet-400/30 to-cyan-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 200, -120, 0],
            y: [0, -100, 160, 0],
            scale: [1, 2.5, 0.2, 1],
            rotate: [0, 360, 720],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute top-2/3 right-1/5 w-[380px] h-[280px] bg-gradient-to-bl from-sky-400/35 to-blue-600/25 rounded-full blur-2xl"
          animate={{
            x: [0, -180, 100, 0],
            y: [0, 140, -180, 0],
            rotate: [0, 540, 1080, 1620],
            scale: [1, 0.2, 2.1, 1],
          }}
          transition={{
            duration: 17,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Smaller floating accent shapes for depth */}
        <motion.div 
          className="absolute top-1/6 left-1/5 w-[200px] h-[200px] bg-gradient-to-br from-blue-300/40 to-transparent rounded-full blur-xl"
          animate={{
            x: [0, 60, -100, 0],
            y: [0, -80, 140, 0],
            scale: [1, 3.0, 0.1, 1],
            rotate: [0, 720, 1440],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/6 right-1/6 w-[180px] h-[180px] bg-gradient-to-tl from-cyan-400/35 to-transparent rounded-full blur-xl"
          animate={{
            x: [0, -120, 160, 0],
            y: [0, 100, -60, 0],
            rotate: [0, -540, -1080],
            scale: [1, 0.1, 2.8, 1],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute top-1/2 left-1/6 w-[160px] h-[160px] bg-gradient-to-r from-purple-400/40 to-transparent rounded-full blur-xl"
          animate={{
            x: [0, 140, -60, 0],
            y: [0, -160, 120, 0],
            scale: [1, 0.1, 4.0, 1],
            rotate: [0, 900, 1800],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute top-1/3 right-1/3 w-[220px] h-[220px] bg-gradient-to-l from-indigo-400/35 to-transparent rounded-full blur-xl"
          animate={{
            x: [0, -100, 180, 0],
            y: [0, 160, -100, 0],
            rotate: [0, 300, 600, 900, 1200, 1500, 1800],
            scale: [1, 2.7, 0.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Additional background fill shapes */}
        <motion.div 
          className="absolute top-1/8 right-1/8 w-[350px] h-[250px] bg-gradient-to-bl from-blue-600/20 to-violet-500/15 rounded-full blur-3xl"
          animate={{
            x: [0, 80, -140, 0],
            y: [0, -120, 100, 0],
            scale: [1, 1.9, 0.2, 1],
            rotate: [0, -450, -900],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/8 left-1/8 w-[320px] h-[240px] bg-gradient-to-tr from-cyan-500/25 to-purple-400/18 rounded-full blur-3xl"
          animate={{
            x: [0, -160, 120, 0],
            y: [0, 80, -160, 0],
            rotate: [0, -600, -1200, -1800],
            scale: [1, 0.2, 2.3, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Edge coverage shapes */}
        <motion.div 
          className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-sky-400/25 to-blue-500/15 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 180, 0],
            y: [0, 140, -80, 0],
            scale: [1, 0.3, 2.4, 1],
            rotate: [0, 270, 540, 810],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute -bottom-20 right-0 w-[400px] h-[350px] bg-gradient-to-t from-indigo-500/30 to-cyan-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, -140, 0],
            y: [0, -100, 200, 0],
            rotate: [0, 225, 450, 675, 900],
            scale: [1, 2.6, 0.1, 1],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute top-0 -left-20 w-[350px] h-[400px] bg-gradient-to-r from-violet-500/28 to-blue-400/18 rounded-full blur-3xl"
          animate={{
            x: [0, 160, -80, 0],
            y: [0, -140, 180, 0],
            scale: [1, 3.2, 0.1, 1],
            rotate: [0, 810, 1620],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content - now with relative positioning to appear above background */}
      <div className="relative z-10">
        <h1 className="text-7xl font-semibold font-lexend">
          <span className="text-blue-600">Decentralized</span> platform <br></br>
          for <span className="text-blue-600">efficient</span> exam correction
        </h1>
        <h2 className="text-xl font-light py-10 font-lexend">
          Ensure fair results with fully anonymous submissions, unbiased grading,<br></br>and a seamless correction process.
          Well suited for Universities and schools. <br></br>
        </h2>
        <a href="/" className="inline-block px-4 py-3 text-3xl font-lexend rounded-full bg-black text-white hover:bg-blue-950 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20">
          Get Started now
        </a>
      </div>
    </div>
  );
}

export default HookBody;