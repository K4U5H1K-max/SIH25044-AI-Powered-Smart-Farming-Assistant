import React, { useEffect, useRef } from "react";

const PlantBranchAnimated: React.FC = () => {
  const stemRef = useRef<SVGPathElement | null>(null);
  const leavesRef = useRef<(SVGEllipseElement | null)[]>([]);

  useEffect(() => {
    // Animate the stem drawing
    const stem = stemRef.current;
    if (stem) {
      const length = stem.getTotalLength();
      stem.style.strokeDasharray = `${length}`;
      stem.style.strokeDashoffset = `${length}`;
      stem.style.transition = "stroke-dashoffset 1.6s cubic-bezier(0.77,0,0.18,1)";
      setTimeout(() => {
        if (stem) stem.style.strokeDashoffset = "0";
      }, 100);
    }
    // Animate leaves sprouting one by one
    leavesRef.current.forEach((leaf, i) => {
      if (leaf) {
        leaf.style.transform = "scale(0.2)";
        leaf.style.opacity = "0";
        leaf.style.transition = "transform 0.7s cubic-bezier(0.77,0,0.18,1), opacity 0.7s";
        setTimeout(() => {
          if (leaf) {
            leaf.style.transform = "scale(1)";
            leaf.style.opacity = "1";
          }
        }, 800 + i * 350);
      }
    });
  }, []);

  return (
    <svg width="120" height="320" viewBox="0 0 120 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', left: 0, bottom: 0, zIndex: 1, pointerEvents: 'none' }}>
      {/* Main stem */}
      <path
        ref={stemRef}
        d="M60 310 Q65 250 55 200 Q45 150 60 100 Q75 50 60 10"
        stroke="#13c813"
        strokeWidth={6}
        fill="none"
        strokeLinecap="round"
      />
      {/* Leaves */}
      <ellipse ref={el => { leavesRef.current[0] = el; }} cx="65" cy="250" rx="18" ry="8" fill="#34e89e" />
      <ellipse ref={el => { leavesRef.current[1] = el; }} cx="50" cy="180" rx="14" ry="7" fill="#13c813" />
      <ellipse ref={el => { leavesRef.current[2] = el; }} cx="70" cy="120" rx="12" ry="6" fill="#34e89e" />
      <ellipse ref={el => { leavesRef.current[3] = el; }} cx="55" cy="60" rx="10" ry="5" fill="#13c813" />
      {/* Leaf highlights for flat vector look */}
      <ellipse cx="70" cy="250" rx="6" ry="2" fill="#b2ffd6" opacity="0.7" />
      <ellipse cx="55" cy="180" rx="4" ry="1.5" fill="#b2ffd6" opacity="0.7" />
      <ellipse cx="75" cy="120" rx="3" ry="1" fill="#b2ffd6" opacity="0.7" />
      <ellipse cx="60" cy="60" rx="2" ry="0.7" fill="#b2ffd6" opacity="0.7" />
    </svg>
  );
};

export default PlantBranchAnimated;
