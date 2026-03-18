import React from "react";
import { motion } from "framer-motion";

export const AuroraBackground = ({ children, className = "", showRadialGradient = true }) => {
  return (
    <div
      className={`relative flex flex-col overflow-hidden ${className}`}
      style={{ backgroundColor: "#0e120f" }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="aurora-glow"
          style={{
            position: "absolute",
            inset: "-10px",
            opacity: 0.5,
            willChange: "transform",
            backgroundImage: `
              repeating-linear-gradient(100deg, #1a3a2a 0%, #0e120f 7%, transparent 10%, transparent 12%, #1a3a2a 16%),
              repeating-linear-gradient(100deg, #22c55e15 10%, #16a34a10 15%, #15803d10 20%, #14532d10 25%, #22c55e10 30%),
              repeating-linear-gradient(100deg, #22c55e15 10%, #16a34a10 15%, #15803d10 20%, #14532d10 25%, #22c55e10 30%)
            `,
            backgroundSize: "300% 200%, 200% 200%, 200% 200%",
            backgroundPosition: "50% 50%, 50% 50%, 50% 50%",
            filter: "blur(12px)",
            animation: "aurora 30s linear infinite",
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="aurora-glow-secondary"
          style={{
            position: "absolute",
            inset: "-10px",
            opacity: 0.25,
            willChange: "transform",
            backgroundImage: `
              repeating-linear-gradient(100deg, transparent 0%, #22c55e08 5%, transparent 10%, #16a34a06 15%, transparent 20%),
              repeating-linear-gradient(135deg, transparent 0%, #14532d08 8%, transparent 16%, #15803d06 24%, transparent 32%)
            `,
            backgroundSize: "250% 250%, 300% 300%",
            backgroundPosition: "50% 50%, 50% 50%",
            filter: "blur(20px)",
            animation: "aurora-secondary 40s linear infinite",
          }}
        />
        {showRadialGradient && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, #0e120f 80%)",
            }}
          />
        )}
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AuroraBackground;
