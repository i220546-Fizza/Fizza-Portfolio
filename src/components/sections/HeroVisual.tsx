import type { CSSProperties } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ProfileImage } from "@/components/ui/ProfileImage";

type OrbitVars = CSSProperties & Record<`--${string}`, string>;

interface OrbitNode {
  label?: string;
  angle: number;
}
interface Ring {
  inset: string;
  duration: string;
  reverse?: boolean;
  nodes: OrbitNode[];
}

// Labels are tools from the Skills section.
const rings: Ring[] = [
  { inset: "27%", duration: "26s", nodes: [{ angle: 40 }, { angle: 220 }] },
  {
    inset: "19%",
    duration: "42s",
    nodes: [
      { label: "PyTorch", angle: 20 },
      { label: "OpenCV", angle: 140 },
      { label: "YOLO", angle: 260 },
    ],
  },
  {
    inset: "6%",
    duration: "64s",
    reverse: true,
    nodes: [
      { label: "FastAPI", angle: 75 },
      { label: "React", angle: 195 },
      { label: "TensorFlow", angle: 315 },
    ],
  },
];

/** Orbital "model core" that tilts toward the pointer. Pure CSS orbits keep it light. */
export default function HeroVisual() {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springX = useSpring(rx, { stiffness: 110, damping: 18 });
  const springY = useSpring(ry, { stiffness: 110, damping: 18 });

  return (
    <div
      className="mx-auto w-full max-w-[500px]"
      style={{ perspective: 1100 }}
      onPointerMove={(e) => {
        if (e.pointerType === "touch") return;
        const r = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry.set(px * 16);
        rx.set(-py * 16);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      <motion.div
        role="img"
        aria-label="Portrait of Fizza Sarfraz surrounded by orbiting tools: PyTorch, OpenCV, YOLO, FastAPI, React and TensorFlow"
        className="relative aspect-square w-full"
        style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Soft disc */}
        <div className="absolute inset-[3%] rounded-full border border-taupe/60 bg-cream/70" />

        {rings.map((ring, ri) => (
          <div key={ri} aria-hidden="true">
            <div
              className="absolute rounded-full border border-dashed border-taupe"
              style={{ inset: ring.inset }}
            />
            {ring.nodes.map((node) => {
              const vars: OrbitVars = {
                inset: ring.inset,
                "--dur": ring.duration,
                "--angle": `${node.angle}deg`,
                "--dir": ring.reverse ? "reverse" : "normal",
              };
              return (
                <div key={node.angle} className="orbit" style={vars}>
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                    <div className="orbit-counter" style={vars}>
                      {node.label ? (
                        <span className="flex items-center gap-1.5 whitespace-nowrap border border-ink/20 bg-cream px-2.5 py-1 text-[11px] font-semibold text-ink shadow-sm sm:text-xs">
                          <span className="h-1.5 w-1.5 rounded-full bg-olive" />
                          {node.label}
                        </span>
                      ) : (
                        <span className="block h-3 w-3 rounded-full bg-olive" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        {/* Profile photo at the centre of the orbit */}
        <div className="absolute inset-[34%]" style={{ transform: "translateZ(40px)" }}>
          <div
            className="h-full w-full overflow-hidden rounded-full bg-taupe ring-4 ring-olive"
            style={{ boxShadow: "0 24px 44px -16px rgba(25,26,23,.55)" }}
          >
            <ProfileImage variant="avatar" />
          </div>
          <span
            aria-hidden="true"
            className="absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full bg-olive font-serif text-base italic text-cream ring-2 ring-cream"
          >
            AI
          </span>
        </div>

        {/* Floating notes */}
        <motion.div
          className="absolute left-0 top-[2%]"
          style={{ transform: "translateZ(70px)" }}
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <p className="border border-ink/15 bg-cream px-3 py-2 text-xs shadow-sm sm:text-sm">
            <span className="block font-display font-semibold">MS Artificial Intelligence</span>
            <span className="text-ink/70">NUST, Islamabad</span>
          </p>
        </motion.div>
        <motion.div
          className="absolute bottom-[3%] right-0"
          style={{ transform: "translateZ(70px)" }}
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <p className="border border-ink/15 bg-cream px-3 py-2 text-xs shadow-sm sm:text-sm">
            <span className="block font-display font-semibold">BS Artificial Intelligence</span>
            <span className="text-ink/70">FAST NUCES, 2022 to 2026</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
