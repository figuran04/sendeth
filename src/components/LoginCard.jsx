import React from "react";

export default function LoginCard() {
  return (
    <div className="relative z-10 p-8 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg w-full max-w-sm">
      {/* Neon border fragment - top left */}
      <span className="absolute top-0 left-0 h-1/6 w-1/6 border-t-2 border-l-2 border-purple-500 rounded-tl-lg shadow-[0_0_10px_2px_rgba(168,85,247,0.8)]" />

      {/* Neon border fragment - bottom right */}
      <span className="absolute bottom-0 right-0 h-1/6 w-1/6 border-b-2 border-r-2 border-blue-500 rounded-br-lg shadow-[0_0_10px_2px_rgba(59,130,246,0.8)]" />

      <h2 className="text-2xl font-semibold text-center mb-6">Welcome to Web3</h2>
      <form className="space-y-4">
        <div>
          <label className="text-sm block mb-1">Wallet Address</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="0x..."
          />
        </div>
        <div>
          <label className="text-sm block mb-1">Passphrase</label>
          <input
            type="password"
            className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your secret"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 mt-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
        >
          Connect Wallet
        </button>
      </form>
    </div>
  );
}
