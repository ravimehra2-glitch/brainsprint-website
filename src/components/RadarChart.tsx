import { motion } from "framer-motion";

interface RadarChartProps {
  values: number[]; // 0-100, five values matching labels order
  labels: string[];
  size?: number;
  animate?: boolean;
}

export default function RadarChart({
  values,
  labels,
  size = 220,
  animate = true,
}: RadarChartProps) {
  const center = size / 2;
  const radius = size / 2 - 28;
  const angleStep = (Math.PI * 2) / values.length;

  function point(value: number, i: number) {
    const angle = -Math.PI / 2 + i * angleStep;
    const r = (value / 100) * radius;
    return [center + Math.cos(angle) * r, center + Math.sin(angle) * r];
  }

  const dataPoints = values.map((v, i) => point(v, i));
  const dataPath =
    dataPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ") + " Z";

  const rings = [0.33, 0.66, 1];

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full">
      {rings.map((r) => {
        const ringPoints = values.map((_, i) => point(100 * r, i));
        const ringPath =
          ringPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ") + " Z";
        return (
          <path
            key={r}
            d={ringPath}
            fill="none"
            stroke="var(--color-gray-100)"
            strokeWidth="1"
          />
        );
      })}

      {values.map((_, i) => {
        const [x, y] = point(100, i);
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={x}
            y2={y}
            stroke="var(--color-gray-100)"
            strokeWidth="1"
          />
        );
      })}

      <motion.path
        d={dataPath}
        fill="var(--color-growth)"
        fillOpacity={0.16}
        stroke="var(--color-growth)"
        strokeWidth="2"
        strokeLinejoin="round"
        initial={animate ? { opacity: 0, scale: 0.8 } : {}}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: `${center}px ${center}px` }}
      />

      {dataPoints.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={3} fill="var(--color-growth)" />
      ))}

      {labels.map((label, i) => {
        const [x, y] = point(122, i);
        return (
          <text
            key={label}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-[var(--color-gray-500)]"
            fontSize="9"
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
}
