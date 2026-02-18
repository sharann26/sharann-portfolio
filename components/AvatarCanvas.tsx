import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";

interface AvatarCanvasProps {
  theme: "dark" | "light";
}

const AvatarCanvas: React.FC<AvatarCanvasProps> = ({ theme }) => {
  const ref = useRef<HTMLDivElement>(null);

  // Mouse position state
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring animation for the tilt
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate values from -0.5 to 0.5
    const xPct = (e.clientX - rect.left) / width - 0.5;
    const yPct = (e.clientY - rect.top) / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Transforms for 3D effect
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]); // Inverted for natural feel
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  // Parallax layers
  const backgroundX = useTransform(mouseX, [-0.5, 0.5], [20, -20]);
  const backgroundY = useTransform(mouseY, [-0.5, 0.5], [20, -20]);

  // Dynamic gloss/reflection
  const glossX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
  const glossY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);

  // Use a professional placeholder image
  const PROFILE_IMAGE = `images/profile-${theme}.png`;

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full max-w-[400px] aspect-[3/4] rounded-[32px] cursor-none" // hidden cursor for immersion
      >
        {/* 1. Backdrop Glow / Shadow (Furthest back) */}
        <motion.div
          style={{
            x: backgroundX,
            y: backgroundY,
            z: -50,
            opacity: 0.6,
          }}
          className={`absolute -inset-10 rounded-full blur-[80px] transition-colors duration-1000 ${theme === "dark" ? "bg-violet-600/40" : "bg-blue-400/40"}`}
        />

        {/* 2. Main Card Container */}
        <div
          className={`relative w-full h-full rounded-[32px] overflow-hidden border transition-colors duration-1000 ${theme === "dark" ? "bg-slate-900 border-white/10" : "bg-white border-slate-200"} shadow-2xl`}
        >
          {/* Image Layer */}
          <div className="absolute inset-1 rounded-[28px] overflow-hidden">
            <img
              src={PROFILE_IMAGE}
              alt="Sharann Nagarajan"
              className="w-full h-full object-cover scale-110"
            />

            {/* Tech Overlay Gradient */}
            <div
              className={`absolute inset-0 mix-blend-overlay opacity-30 bg-gradient-to-t ${theme === "dark" ? "from-violet-900 via-transparent to-teal-500" : "from-blue-900 via-transparent to-orange-400"}`}
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>

          {/* 3. Gloss Reflection Overlay */}
          <motion.div
            style={{
              background: useTransform(
                [glossX, glossY],
                ([latestX, latestY]) =>
                  `radial-gradient(circle at ${latestX}% ${latestY}%, rgba(255,255,255,0.3) 0%, transparent 60%)`,
              ),
              zIndex: 70,
            }}
            className="absolute inset-0 pointer-events-none mix-blend-soft-light"
          />
        </div>
      </motion.div>

      {/* Optional: Mobile Interaction Hint */}
      <div className="absolute bottom-0 text-slate-400 text-xs font-mono animate-pulse md:hidden">
        Tap & Hold
      </div>
    </div>
  );
};

export default AvatarCanvas;
