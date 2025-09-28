import React from "react";

export default function About() {
  return (
    <div className="relative min-h-screen py-8 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

      {/* Animated background gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 opacity-20 blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 opacity-25 blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-[600px] h-[300px] rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-15 blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10 w-full max-w-6xl px-8 flex flex-col gap-12 items-center justify-center h-full">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-black my-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          CHAIN EXAM
        </h1>

        {/* Bar */}
        <div className="h-1 w-32  bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full shadow-lg shadow-cyan-400/50"></div>

        {/* Horizontal cards container */}
        <div className="flex flex-row pb-8 pt-6 justify-between items-stretch gap-10 mb-8 w-full">
          {/* Left Card */}
          <div className="flex-1 backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center justify-center">
                <span className="w-2 h-2 bg-cyan-400 rounded-full "></span>
                 PLATEFORME DÉCENTRALISÉE
              </h2>
              <p className="text-gray-300 pt-6 leading-relaxed text-base max-w-md mx-auto">
               Chain Exam est une plateforme décentralisée construite sur la
                blockchain Sui pour des soumissions et corrections d'examens
                <span className="text-cyan-400 font-semibold">
                  {" "}
                  sécurisées, anonymes et impartiales
                </span>
                . Notre mission est d'apporter transparence, équité et
                efficacité aux évaluations académiques et professionnelles.
              </p>
            </div>
          </div>

          {/* Center Card */}
          <div className="flex-1 backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center justify-center">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                TECHNOLOGIE BLOCKCHAIN SUI
              </h2>
              <p className="text-gray-300 pt-6 leading-relaxed text-base max-w-md mx-auto">
                En exploitant la blockchain haute performance de Sui, toutes les
                soumissions d'examens sont
                <span className="text-purple-400 font-semibold">
                  {" "}
                  cryptées et enregistrées on-chain
                </span>
                . Les corrections sont anonymes, inviolables et vérifiables,
                garantissant la confiance entre étudiants, évaluateurs et
                institutions.
              </p>
            </div>
          </div>
    
          {/* Right Card */}
         <div className="flex-1 backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center justify-center">
                <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>
                INFRASTRUCTURE SCALABLE
              </h2>
              <p className="text-gray-300 pt-6 leading-relaxed text-base max-w-md mx-auto">
                Notre plateforme offre également des intégrations faciles, des
                rapports en temps réel et une
                <span className="text-emerald-400 font-semibold">
                  {" "}
                   infrastructure évolutive
                </span>
               pour gérer des examens de toute taille. Chain Exam permet aux
                éducateurs et institutions de se concentrer sur l'apprentissage.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button as last flex item */}
        <div className="relative group cursor-pointer">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative bg-black border border-cyan-400/50 rounded-xl px-8 py-4 hover:border-cyan-400 transition-all duration-300">
            <a
              href="https://sui.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-bold text-lg flex items-center"
            >
              <span className="mr-3">🚀</span>
              DÉCOUVRIR SUI BLOCKCHAIN
              <span className="ml-3">✨</span>
            </a>
          </div>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-20 animate-ping"
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