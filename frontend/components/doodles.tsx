'use client';

import type { CSSProperties } from 'react';

// Handmade scrapbook doodles, all drawn inline as SVG / CSS (no external images).

interface DoodleProps {
  className?: string;
  style?: CSSProperties;
}

export function Sparkle({ className, style }: DoodleProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 40 40" width="40" height="40" fill="none" aria-hidden>
      <path
        d="M20 3 C21.5 13, 27 18.5, 37 20 C27 21.5, 21.5 27, 20 37 C18.5 27, 13 21.5, 3 20 C13 18.5, 18.5 13, 20 3 Z"
        fill="#F9C74F"
        stroke="#E9A83B"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="25" cy="12" r="2.2" fill="#FFF3C4" />
    </svg>
  );
}

export function Heart({ className, style }: DoodleProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 40 40" width="40" height="40" fill="none" aria-hidden>
      <path
        d="M20 34 C8 25, 3 17, 3 11.5 C3 6.5, 7 3.5, 11.5 3.5 C15 3.5, 18.5 6, 20 9.5 C21.5 6, 25 3.5, 28.5 3.5 C33 3.5, 37 6.5, 37 11.5 C37 17, 32 25, 20 34 Z"
        fill="#F8A8C8"
        stroke="#E87CA8"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="2.4" fill="#FFE3EF" />
      <circle cx="28" cy="11" r="2" fill="#FFE3EF" />
    </svg>
  );
}

export function Star({ className, style }: DoodleProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 40 40" width="40" height="40" fill="none" aria-hidden>
      <path
        d="M20 3 L24.2 14.6 L36.5 15.4 L27 23 L29.8 35 L20 28.6 L10.2 35 L13 23 L3.5 15.4 L15.8 14.6 Z"
        fill="#F7E08B"
        stroke="#E9C25B"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="17" r="2.4" fill="#FFF8D6" />
    </svg>
  );
}

export function Flower({ className, style, petal = '#F8A8C8' }: DoodleProps & { petal?: string }) {
  const petals = [0, 72, 144, 216, 288];
  return (
    <svg className={className} style={style} viewBox="0 0 40 40" width="40" height="40" fill="none" aria-hidden>
      {petals.map((a) => (
        <circle
          key={a}
          cx={20 + 9 * Math.cos((a * Math.PI) / 180)}
          cy={20 + 9 * Math.sin((a * Math.PI) / 180)}
          r="8.4"
          fill={petal}
          stroke="#E87CA8"
          strokeWidth="1.4"
          opacity="0.95"
        />
      ))}
      <circle cx="20" cy="20" r="6.2" fill="#FFE9A8" stroke="#E9C25B" strokeWidth="1.5" />
    </svg>
  );
}

export function Cloud({ className, style }: DoodleProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 64 40" width="64" height="40" fill="none" aria-hidden>
      <path
        d="M18 33 C9 33 4 27.5 4 21.5 C4 15.5 9.5 11.5 15 11.5 C16.5 6 21.5 3 27 3 C34 3 38.5 7.5 39.5 12.5 C44 11.5 58 13.5 59 21.5 C60 29 53 33 47 33 Z"
        fill="#E3F2FD"
        stroke="#A9CFEB"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M12 26 C14 21.5 20 21.5 22 26" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Rainbow({ className, style }: DoodleProps) {
  const colors = ['#F8A8C8', '#F7E08B', '#B5E0C4', '#A9CFEB', '#C9B8F0'];
  return (
    <svg className={className} style={style} viewBox="0 0 80 44" width="80" height="44" fill="none" aria-hidden>
      {colors.map((c, i) => (
        <path
          key={c}
          d={`M6 ${34} A ${34 - i * 5.6} ${34 - i * 5.6} 0 0 1 ${74 - i * 0} ${34}`}
          stroke={c}
          strokeWidth="4.6"
          strokeLinecap="round"
          fill="none"
        />
      ))}
      <ellipse cx="8" cy="34" rx="5" ry="3.4" fill="#FFF9E8" stroke="#F0D9A8" strokeWidth="1" />
      <ellipse cx="72" cy="34" rx="5" ry="3.4" fill="#FFF9E8" stroke="#F0D9A8" strokeWidth="1" />
    </svg>
  );
}

export function Bow({ className, style, color = '#C9B8F0' }: DoodleProps & { color?: string }) {
  return (
    <svg className={className} style={style} viewBox="0 0 44 40" width="44" height="40" fill="none" aria-hidden>
      <path
        d="M22 18 C10 4, 2 6, 4 14 C5.5 20, 14 22, 22 20 Z"
        fill={color}
        stroke="#A890D8"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M22 18 C34 4, 42 6, 40 14 C38.5 20, 30 22, 22 20 Z"
        fill={color}
        stroke="#A890D8"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="22" cy="18.5" r="5" fill="#E8DDFB" stroke="#A890D8" strokeWidth="1.6" />
    </svg>
  );
}

export function Squiggle({ className, style }: DoodleProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 70 18" width="70" height="18" fill="none" aria-hidden>
      <path
        d="M2 10 C10 2, 18 2, 26 10 C34 18, 42 18, 50 10 C56 4, 62 4, 68 8"
        stroke="#C9B8F0"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function DoodleLine({ className, style }: DoodleProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 80 16" width="80" height="16" fill="none" aria-hidden>
      <path
        d="M2 10 C12 4, 20 13, 30 9 C40 5, 48 13, 58 9 C64 7, 72 8, 78 6"
        stroke="#E0C7EE"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function PaperClip({ className, style }: DoodleProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 40 56" width="40" height="56" fill="none" aria-hidden>
      <path
        d="M14 14 V38 C14 46, 26 46, 26 38 V12 C26 7, 14 7, 14 12 V40 C14 47, 26 47, 26 40"
        stroke="#B8A5C9"
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

// Washi tape: a pure CSS rectangle with slightly torn ends.
export function Tape({
  className,
  style,
  color = 'rgba(248, 187, 208, 0.55)',
  rotation = -4,
  width = 110,
}: DoodleProps & { color?: string; rotation?: number; width?: number }) {
  const tapeStyle = {
    ...style,
    '--tape-color': color,
    '--tape-rot': `${rotation}deg`,
    width: `${width}px`,
  } as CSSProperties;
  return (
    <span
      className={`tape ${className || ''}`}
      aria-hidden
      style={tapeStyle}
    />
  );
}
