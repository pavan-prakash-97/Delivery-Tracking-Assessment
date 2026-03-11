"use client";

import { motion,  } from "framer-motion";

// Pre-compute confetti data outside component (module level)
const CONFETTI = Array.from({ length: 20 }, (_, index) => {
  const colors = ["#2563eb", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];
  return {
    color: colors[index % colors.length],
    size: 6 + Math.random() * 8,
    startX: -20 + Math.random() * 40,
    angle: Math.random() * 360,
    driftX: (Math.random() - 0.5) * 120,
    isCircle: Math.random() > 0.5,
    isSquare: Math.random() > 0.5,
    duration: 1.4 + Math.random() * 0.8,
    delay: 0.3 + Math.random() * 0.4,
    direction: Math.random() > 0.5 ? 1 : -1,
  };
});

function ConfettiPiece({ index }: { index: number }) {
  const { color, size, startX, angle, driftX, isCircle, isSquare, duration, delay, direction } = CONFETTI[index];

  return (
    <motion.div
      initial={{ y: 0, x: startX, opacity: 1, rotate: angle, scale: 1 }}
      animate={{
        y: [0, -80, 120],
        x: [startX, startX + driftX],
        opacity: [1, 1, 0],
        rotate: angle + 360 * direction,
        scale: [1, 1.2, 0.8],
      }}
      transition={{ duration, delay, ease: "easeOut" }}
      style={{
        position: "absolute",
        width: size,
        height: isSquare ? size : size * 2.5,
        background: color,
        borderRadius: isCircle ? "50%" : 2,
        top: "30%",
        left: "50%",
        pointerEvents: "none",
      }}
    />
  );
}

function CheckmarkAnimation() {
  return (
    <motion.div
      style={{
        position: "relative",
        width: 80,
        height: 80,
        margin: "0 auto",
      }}
    >
      {/* Ripple rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.5, opacity: 0.8 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.4 + i * 0.3, repeat: Infinity, repeatDelay: 0.8 }}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "2px solid #10b981",
          }}
        />
      ))}

      {/* Circle background */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #10b981, #059669)",
          boxShadow: "0 8px 32px rgba(16,185,129,0.4)",
        }}
      />

      {/* Checkmark SVG */}
      <motion.svg
        viewBox="0 0 52 52"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", padding: 16 }}
      >
        <motion.path
          d="M14 27 L22 35 L38 19"
          fill="none"
          stroke="white"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
        />
      </motion.svg>
    </motion.div>
  );
}

export default function DeliveryModal({ onRestart }: { onRestart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(6px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 20 }}
        style={{
          background: "white",
          borderRadius: 24,
          padding: "40px 36px 36px",
          textAlign: "center",
          width: 340,
          boxShadow: "0 32px 80px rgba(0,0,0,0.25)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Confetti */}
        {Array.from({ length: 20 }).map((_, i) => (
          <ConfettiPiece key={i} index={i} />
        ))}

        {/* Top accent bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: 4,
            background: "linear-gradient(90deg, #2563eb, #10b981)",
            transformOrigin: "left",
          }}
        />

        <CheckmarkAnimation />

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          style={{
            marginTop: 20,
            fontSize: 22,
            fontWeight: 700,
            color: "#0f172a",
            letterSpacing: "-0.4px",
          }}
        >
          Delivery Successful!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          style={{ color: "#64748b", marginTop: 8, fontSize: 14, lineHeight: 1.6 }}
        >
          Your package has been delivered successfully. Thank you for using our service!
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.95 }}
          style={{
            height: 1,
            background: "#f1f5f9",
            margin: "24px 0",
          }}
        />

        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          whileHover={{ scale: 1.03, boxShadow: "0 8px 24px rgba(37,99,235,0.35)" }}
          whileTap={{ scale: 0.97 }}
          onClick={onRestart}
          style={{
            width: "100%",
            padding: "13px 18px",
            background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
            color: "white",
            border: "none",
            borderRadius: 12,
            cursor: "pointer",
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: "-0.2px",
            boxShadow: "0 4px 16px rgba(37,99,235,0.25)",
          }}
        >
          🚀 Start New Delivery
        </motion.button>
      </motion.div>
    </motion.div>
  );
}