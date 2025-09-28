import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="relative min-h-screen py-8 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">

      {/* Dynamic animated background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Exemple d’une seule shape responsive, répéter pour les autres */}
        <motion.div
          className="absolute -top-40 -left-40 w-[50vw] max-w-[800px] h-[40vh] max-h-[600px] bg-gradient-to-br from-blue-500/25 to-purple-600/30 rounded-full blur-3xl"
          animate={{
            x: [0, 120, -80, 0],
            y: [0, -100, 150, 0],
            scale: [1, 1.4, 0.6, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Répéter les autres shapes avec mêmes max-w/max-h */}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl px-4 sm:px-8 md:px-12 flex flex-col gap-12 items-center justify-center h-full">

        {/* Cards container responsive */}
        <div className="flex flex-col sm:flex-row pb-8 pt-6 justify-between items-stretch gap-6 sm:gap-10 mb-8 w-full">
          {/* Left Card */}
          <div className="flex-1 backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center justify-center">
                <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 sm:mr-3"></span>
                PLATEFORME DÉCENTRALISÉE
              </h2>
              <p className="text-gray-300 pt-4 sm:pt-6 leading-relaxed text-sm sm:text-base max-w-md mx-auto">
                Chain Exam est une plateforme décentralisée construite sur la
                blockchain Sui pour des soumissions et corrections d'examens
                <span className="text-cyan-400 font-semibold"> sécurisées, anonymes et impartiales</span>.
              </p>
            </div>
          </div>

          {/* Center Card */}
          <div className="flex-1 backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center justify-center">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 sm:mr-3"></span>
                TECHNOLOGIE BLOCKCHAIN SUI
              </h2>
              <p className="text-gray-300 pt-4 sm:pt-6 leading-relaxed text-sm sm:text-base max-w-md mx-auto">
                En exploitant la blockchain haute performance de Sui, toutes les
                soumissions d'examens sont
                <span className="text-purple-400 font-semibold"> cryptées et enregistrées on-chain</span>.
              </p>
            </div>
          </div>

          {/* Right Card */}
          <div className="flex-1 backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center justify-center">
                <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 sm:mr-3"></span>
                INFRASTRUCTURE SCALABLE
              </h2>
              <p className="text-gray-300 pt-4 sm:pt-6 leading-relaxed text-sm sm:text-base max-w-md mx-auto">
                Notre plateforme offre également des intégrations faciles, des
                rapports en temps réel et une
                <span className="text-emerald-400 font-semibold"> infrastructure évolutive</span>.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="relative group cursor-pointer w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
          <span className="absolute -inset-1 bg-blue-900 rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500"></span>

          <a
            href="https://sui.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 flex items-center justify-center w-full px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 font-bold text-white text-sm sm:text-base md:text-lg border border-transparent rounded-xl transition-all duration-300 hover:border-cyan-400"
          >
            <span className="mr-2 sm:mr-3">🚀</span>
            DÉCOUVRIR SUI BLOCKCHAIN
            <span className="ml-2 sm:ml-3">✨</span>
          </a>
        </div>
      </div>

      {/* Floating particles responsive */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 bg-cyan-400 rounded-full opacity-20 animate-ping"
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
