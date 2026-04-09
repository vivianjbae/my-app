'use client'

import { getSkylineKey } from './skylines'

interface WeatherData {
  temp: number
  uv: number
  precipitation: number
  city: string
  country: string
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

function formatDate(date: Date) {
  return date.toLocaleDateString([], { weekday: 'long' })
}

// ─── Stars ──────────────────────────────────────────────────────────────────
function Stars() {
  const pts = [
    [18,10],[42,6],[70,18],[95,4],[130,14],[158,8],[185,20],[210,5],
    [235,16],[258,9],[285,22],[300,6],[312,18],[28,28],[55,32],[88,26],
    [115,38],[148,30],[175,35],[222,28],[268,40],[294,30],
  ]
  return (
    <>
      {pts.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 1 : 0.7}
          fill="white" opacity={0.25 + (i % 4) * 0.15} />
      ))}
    </>
  )
}

// ─── Window helper ───────────────────────────────────────────────────────────
type Win = [number, number]
function Windows({ wins, color = '#f5c84a', dim = false }: { wins: Win[]; color?: string; dim?: boolean }) {
  return (
    <>
      {wins.map(([x, y], i) => (
        <rect key={i} x={x} y={y} width={3} height={4}
          fill={color} opacity={dim ? 0.25 : 0.55 + (i % 3) * 0.15}
          rx={0.5} />
      ))}
    </>
  )
}

// ─── CITY SCENES ─────────────────────────────────────────────────────────────

function NewYorkScene() {
  return (
    <svg viewBox="0 0 320 220" width="100%" height="100%" preserveAspectRatio="xMidYMax slice">
      <defs>
        <linearGradient id="sk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#050814" />
          <stop offset="55%" stopColor="#0b1020" />
          <stop offset="100%" stopColor="#141d38" />
        </linearGradient>
        <radialGradient id="gl" cx="50%" cy="100%" r="65%">
          <stop offset="0%" stopColor="#1a3090" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sky */}
      <rect width="320" height="220" fill="url(#sk)" />
      <rect width="320" height="220" fill="url(#gl)" />
      <Stars />

      {/* Moon */}
      <circle cx="272" cy="28" r="9" fill="#d8dff0" opacity="0.7" />
      <circle cx="276" cy="25" r="9" fill="#0b1020" opacity="0.9" />

      {/* ── Layer 1: Far background buildings (lightest) ── */}
      <rect x="0"   y="145" width="28" height="75" fill="#1d2a44" />
      <rect x="24"  y="130" width="22" height="90" fill="#1d2a44" />
      <rect x="42"  y="150" width="18" height="70" fill="#1d2a44" />
      <rect x="270" y="140" width="25" height="80" fill="#1d2a44" />
      <rect x="290" y="130" width="30" height="90" fill="#1d2a44" />
      <rect x="300" y="148" width="20" height="72" fill="#1d2a44" />

      {/* ── Layer 2: Mid buildings ── */}
      <rect x="0"   y="110" width="20" height="110" fill="#162038" />
      <rect x="18"  y="100" width="26" height="120" fill="#162038" />
      <rect x="40"  y="118" width="22" height="102" fill="#162038" />
      <rect x="58"  y="90"  width="18" height="130" fill="#162038" />
      <rect x="72"  y="105" width="24" height="115" fill="#162038" />
      <rect x="74"  y="88"  width="20" height="20"  fill="#162038" />
      <rect x="76"  y="75"  width="16" height="16"  fill="#162038" />
      <rect x="238" y="108" width="22" height="112" fill="#162038" />
      <rect x="256" y="95"  width="26" height="125" fill="#162038" />
      <rect x="276" y="112" width="20" height="108" fill="#162038" />
      <rect x="292" y="100" width="28" height="120" fill="#162038" />

      {/* ── Layer 3: Foreground buildings (darkest) ── */}
      <rect x="0"   y="130" width="16" height="90"  fill="#0d1626" />
      <rect x="14"  y="115" width="20" height="105" fill="#0d1626" />
      <rect x="30"  y="125" width="18" height="95"  fill="#0d1626" />
      <rect x="48"  y="80"  width="22" height="140" fill="#0d1626" />
      <rect x="68"  y="95"  width="18" height="125" fill="#0d1626" />
      <rect x="84"  y="70"  width="20" height="150" fill="#0d1626" />
      <rect x="86"  y="55"  width="16" height="18"  fill="#0d1626" />
      <rect x="88"  y="42"  width="12" height="16"  fill="#0d1626" />
      <rect x="93"  y="22"  width="2"  height="22"  fill="#1a2540" />
      <rect x="102" y="85"  width="24" height="135" fill="#0d1626" />
      <rect x="124" y="72"  width="22" height="148" fill="#0d1626" />
      <rect x="144" y="88"  width="18" height="132" fill="#0d1626" />

      {/* ── EMPIRE STATE (stepped tower) ── */}
      <rect x="100" y="95"  width="30" height="125" fill="#0c1524" />
      <rect x="104" y="72"  width="22" height="26"  fill="#0c1524" />
      <rect x="107" y="55"  width="16" height="20"  fill="#0c1524" />
      <rect x="110" y="40"  width="10" height="18"  fill="#0c1524" />
      <rect x="113" y="22"  width="4"  height="20"  fill="#1e2d48" />
      <rect x="114" y="10"  width="2"  height="14"  fill="#263860" />

      {/* ── CHRYSLER BUILDING ── */}
      <rect x="162" y="85"  width="20" height="135" fill="#0c1524" />
      <rect x="164" y="70"  width="16" height="18"  fill="#0c1524" />
      <rect x="166" y="58"  width="12" height="14"  fill="#0c1524" />
      {/* Art-deco crown */}
      <path d="M164,60 L172,38 L180,60 Q177,52 172,48 Q167,52 164,60 Z" fill="#131e33" />
      <path d="M166,62 L172,42 L178,62 Q175,54 172,50 Q169,54 166,62 Z" fill="#0e1828" />
      {/* Spire */}
      <rect x="171" y="22"  width="2"  height="20"  fill="#1e2d48" />
      <rect x="171" y="10"  width="1.5" height="14" fill="#2a3d60" />

      {/* Right cluster */}
      <rect x="186" y="90"  width="22" height="130" fill="#0d1626" />
      <rect x="205" y="78"  width="20" height="142" fill="#0d1626" />
      <rect x="222" y="92"  width="18" height="128" fill="#0d1626" />
      <rect x="238" y="82"  width="22" height="138" fill="#0d1626" />
      <rect x="258" y="96"  width="20" height="124" fill="#0d1626" />
      <rect x="275" y="85"  width="18" height="135" fill="#0d1626" />
      <rect x="290" y="98"  width="16" height="122" fill="#0d1626" />
      <rect x="303" y="110" width="17" height="110" fill="#0d1626" />

      {/* ── Window lights ── */}
      <Windows wins={[[50,90],[50,102],[50,114],[56,96],[56,108],[68,100],[68,112],[84,78],[84,90],[84,102],[90,84],[90,96]]} />
      <Windows wins={[[103,100],[103,112],[103,124],[108,100],[108,112],[108,124],[113,108],[113,120]]} />
      <Windows wins={[[164,90],[164,102],[164,114],[164,126],[170,96],[170,108],[170,120],[175,90],[175,102]]} />
      <Windows wins={[[125,80],[125,92],[125,104],[130,86],[130,98],[144,95],[144,107],[190,95],[190,107],[207,85],[207,97],[207,109],[225,100],[240,90],[240,102],[260,100],[277,92],[277,104]]} />
      <Windows color="#8ab0e8" dim wins={[[52,126],[86,118],[126,118],[146,112],[192,118],[208,122],[242,114]]} />

      {/* ── Trees ── */}
      <ellipse cx="10"  cy="206" rx="14" ry="10" fill="#071210" />
      <ellipse cx="28"  cy="210" rx="18" ry="9"  fill="#060f0a" />
      <ellipse cx="45"  cy="208" rx="12" ry="8"  fill="#071210" />
      <ellipse cx="275" cy="208" rx="12" ry="8"  fill="#071210" />
      <ellipse cx="293" cy="206" rx="16" ry="9"  fill="#060f0a" />
      <ellipse cx="310" cy="210" rx="14" ry="8"  fill="#071210" />

      {/* ── Water ── */}
      <rect x="0" y="210" width="320" height="10" fill="#07090f" />
      <rect x="60"  y="212" width="40" height="1.5" fill="#1a2845" opacity="0.5" />
      <rect x="130" y="214" width="30" height="1"   fill="#1a2845" opacity="0.4" />
      <rect x="180" y="213" width="50" height="1.5" fill="#1a2845" opacity="0.45" />
      <rect x="240" y="215" width="35" height="1"   fill="#1a2845" opacity="0.35" />
    </svg>
  )
}

function LondonScene() {
  return (
    <svg viewBox="0 0 320 220" width="100%" height="100%" preserveAspectRatio="xMidYMax slice">
      <defs>
        <linearGradient id="sk-l" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#060912" /><stop offset="100%" stopColor="#131c35" />
        </linearGradient>
        <radialGradient id="gl-l" cx="40%" cy="100%" r="60%">
          <stop offset="0%" stopColor="#1a2870" stopOpacity="0.25" /><stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="320" height="220" fill="url(#sk-l)" />
      <rect width="320" height="220" fill="url(#gl-l)" />
      <Stars />
      <rect x="0"   y="140" width="40" height="80"  fill="#1c2842" />
      <rect x="270" y="135" width="50" height="85"  fill="#1c2842" />
      <rect x="0"   y="112" width="30" height="108" fill="#152035" />
      <rect x="26"  y="125" width="25" height="95"  fill="#152035" />
      <rect x="230" y="110" width="28" height="110" fill="#152035" />
      <rect x="255" y="120" width="30" height="100" fill="#152035" />
      <rect x="280" y="108" width="40" height="112" fill="#152035" />
      {/* Big Ben */}
      <rect x="52"  y="100" width="22" height="120" fill="#0c1522" />
      <rect x="54"  y="80"  width="18" height="22"  fill="#0e1a2e" />
      <circle cx="63" cy="90" r="8" fill="#0f1e35" stroke="#1d2e50" strokeWidth="1.5" />
      <polygon points="63,55 58,80 68,80" fill="#0c1522" />
      <rect x="62"  y="40"  width="2"  height="17"  fill="#162238" />
      {/* The Shard */}
      <polygon points="185,30 178,220 192,220" fill="#0d1625" />
      <polygon points="185,30 192,220 198,220 188,50"  fill="#111f38" />
      <rect x="75"  y="95"  width="25" height="125" fill="#0c1522" />
      <rect x="98"  y="108" width="20" height="112" fill="#0c1522" />
      <rect x="115" y="88"  width="22" height="132" fill="#0c1522" />
      <rect x="135" y="100" width="18" height="120" fill="#0c1522" />
      <rect x="150" y="92"  width="24" height="128" fill="#0c1522" />
      <rect x="198" y="95"  width="22" height="125" fill="#0c1522" />
      <rect x="218" y="85"  width="20" height="135" fill="#0c1522" />
      <rect x="240" y="75"  width="18" height="145" fill="#0c1522" />
      <ellipse cx="249" cy="78" rx="9" ry="6" fill="#0c1522" />
      <Windows wins={[[76,100],[76,112],[76,124],[98,112],[115,95],[115,107],[135,106],[150,98],[150,110],[198,102],[218,92],[218,104],[242,80],[242,92],[242,104]]} />
      <Windows color="#8ab0e8" dim wins={[[78,136],[116,118],[152,122],[200,114]]} />
      <rect x="0" y="210" width="320" height="10" fill="#070910" />
      <rect x="40"  y="212" width="60" height="1.5" fill="#162040" opacity="0.5" />
      <rect x="160" y="213" width="80" height="1"   fill="#162040" opacity="0.4" />
    </svg>
  )
}

function ParisScene() {
  return (
    <svg viewBox="0 0 320 220" width="100%" height="100%" preserveAspectRatio="xMidYMax slice">
      <defs>
        <linearGradient id="sk-p" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#07091a" /><stop offset="100%" stopColor="#14193a" />
        </linearGradient>
        <radialGradient id="gl-p" cx="50%" cy="100%" r="65%">
          <stop offset="0%" stopColor="#20286a" stopOpacity="0.3" /><stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="320" height="220" fill="url(#sk-p)" />
      <rect width="320" height="220" fill="url(#gl-p)" />
      <Stars />
      <circle cx="52" cy="22" r="8" fill="#d5dcee" opacity="0.65" />
      <circle cx="55" cy="20" r="8" fill="#07091a" opacity="0.9" />
      <rect x="0"   y="148" width="55"  height="72" fill="#1b2640" />
      <rect x="265" y="142" width="55"  height="78" fill="#1b2640" />
      <rect x="0"   y="122" width="40"  height="98" fill="#142038" />
      <rect x="36"  y="130" width="30"  height="90" fill="#142038" />
      <rect x="245" y="118" width="35"  height="102" fill="#142038" />
      <rect x="278" y="128" width="42"  height="92" fill="#142038" />
      {/* Eiffel Tower */}
      <polygon points="130,220 138,155 150,155 142,220" fill="#0d1625" />
      <polygon points="178,220 170,155 182,155 190,220" fill="#0d1625" />
      <rect x="138" y="150" width="44" height="7" fill="#0d1625" />
      <polygon points="140,150 148,105 172,105 180,150" fill="#0d1625" />
      <rect x="148" y="100" width="24" height="6" fill="#0d1625" />
      <polygon points="150,100 155,65 165,65 170,100" fill="#0d1625" />
      <polygon points="158,65 160,10 162,65" fill="#0e1828" />
      <circle cx="160" cy="10" r="1.5" fill="#3050a0" opacity="0.8" />
      <Windows wins={[[143,160],[148,160],[153,160],[158,160],[163,160],[168,160],[152,120],[155,120],[158,120],[154,135],[158,135]]} color="#f0cc60" />
      <rect x="60"  y="115" width="26" height="105" fill="#0d1625" />
      <rect x="84"  y="105" width="22" height="115" fill="#0d1625" />
      <rect x="104" y="118" width="20" height="102" fill="#0d1625" />
      <rect x="200" y="110" width="22" height="110" fill="#0d1625" />
      <rect x="220" y="102" width="24" height="118" fill="#0d1625" />
      <rect x="242" y="115" width="20" height="105" fill="#0d1625" />
      <Windows wins={[[62,120],[62,132],[85,110],[85,122],[105,124],[201,118],[222,108],[222,120],[244,120]]} />
      <rect x="0" y="212" width="320" height="8" fill="#07090e" />
      <rect x="50"  y="214" width="80" height="1.5" fill="#152040" opacity="0.5" />
      <rect x="190" y="215" width="70" height="1"   fill="#152040" opacity="0.4" />
    </svg>
  )
}

function TokyoScene() {
  return (
    <svg viewBox="0 0 320 220" width="100%" height="100%" preserveAspectRatio="xMidYMax slice">
      <defs>
        <linearGradient id="sk-t" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#060810" /><stop offset="100%" stopColor="#10152a" />
        </linearGradient>
        <radialGradient id="gl-t" cx="55%" cy="100%" r="60%">
          <stop offset="0%" stopColor="#20104a" stopOpacity="0.35" /><stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="320" height="220" fill="url(#sk-t)" />
      <rect width="320" height="220" fill="url(#gl-t)" />
      <Stars />
      <rect x="0"   y="145" width="45"  height="75" fill="#1a2240" />
      <rect x="275" y="140" width="45"  height="80" fill="#1a2240" />
      <rect x="0"   y="110" width="35"  height="110" fill="#131c35" />
      <rect x="250" y="105" width="40"  height="115" fill="#131c35" />
      <rect x="285" y="118" width="35"  height="102" fill="#131c35" />
      {/* Tokyo Tower */}
      <polygon points="78,220 84,120 90,120 96,220" fill="#0d1525" />
      <line x1="78" y1="190" x2="96" y2="190" stroke="#131e30" strokeWidth="1.5" />
      <line x1="80" y1="160" x2="94" y2="160" stroke="#131e30" strokeWidth="1.5" />
      <line x1="82" y1="135" x2="92" y2="135" stroke="#131e30" strokeWidth="1.5" />
      <rect x="84" y="110" width="6" height="12"  fill="#0d1525" />
      <rect x="85" y="85"  width="4" height="28"  fill="#0d1525" />
      <rect x="86" y="55"  width="2" height="32"  fill="#131e30" />
      <circle cx="87" cy="58" r="1.5" fill="#f04020" opacity="0.9" />
      <circle cx="87" cy="70" r="1"   fill="#f04020" opacity="0.7" />
      {/* Tokyo Skytree */}
      <polygon points="192,220 197,80 202,80 207,220" fill="#0c1422" />
      <rect x="193" y="80"  width="14" height="8"  fill="#0c1422" />
      <rect x="195" y="60"  width="10" height="22" fill="#0c1422" />
      <rect x="197" y="30"  width="6"  height="32" fill="#0f1a2c" />
      <rect x="199" y="10"  width="2"  height="22" fill="#162238" />
      <circle cx="200" cy="10" r="1.5" fill="#60a0ff" opacity="0.8" />
      <rect x="40"  y="100" width="22" height="120" fill="#0c1422" />
      <rect x="60"  y="88"  width="18" height="132" fill="#0c1422" />
      <rect x="100" y="95"  width="24" height="125" fill="#0c1422" />
      <rect x="122" y="80"  width="22" height="140" fill="#0c1422" />
      <rect x="142" y="96"  width="18" height="124" fill="#0c1422" />
      <rect x="158" y="84"  width="24" height="136" fill="#0c1422" />
      <rect x="215" y="90"  width="22" height="130" fill="#0c1422" />
      <rect x="235" y="78"  width="20" height="142" fill="#0c1422" />
      <Windows wins={[[42,105],[42,117],[61,93],[61,105],[101,100],[101,112],[123,85],[123,97],[123,109],[143,101],[160,90],[160,102],[216,96],[216,108],[236,84],[236,96]]} />
      <Windows color="#c060ff" dim wins={[[44,130],[62,118],[124,122],[161,114],[238,110]]} />
      <rect x="0" y="212" width="320" height="8" fill="#06080e" />
    </svg>
  )
}

function ChicagoScene() {
  return (
    <svg viewBox="0 0 320 220" width="100%" height="100%" preserveAspectRatio="xMidYMax slice">
      <defs>
        <linearGradient id="sk-c" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#050912" /><stop offset="100%" stopColor="#101828" />
        </linearGradient>
        <radialGradient id="gl-c" cx="50%" cy="100%" r="65%">
          <stop offset="0%" stopColor="#182870" stopOpacity="0.28" /><stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="320" height="220" fill="url(#sk-c)" />
      <rect width="320" height="220" fill="url(#gl-c)" />
      <Stars />
      <rect x="0"   y="148" width="42" height="72" fill="#1a2540" />
      <rect x="278" y="142" width="42" height="78" fill="#1a2540" />
      <rect x="0"   y="115" width="32" height="105" fill="#121e38" />
      <rect x="255" y="110" width="38" height="110" fill="#121e38" />
      <rect x="288" y="122" width="32" height="98"  fill="#121e38" />
      {/* Willis Tower */}
      <rect x="118" y="40"  width="30" height="180" fill="#0b1320" />
      <rect x="120" y="20"  width="26" height="22"  fill="#0b1320" />
      <rect x="118" y="55"  width="10" height="90"  fill="#0e1a2c" />
      <rect x="138" y="55"  width="10" height="70"  fill="#0e1a2c" />
      <rect x="123" y="10"  width="4"  height="12"  fill="#162235" />
      <rect x="141" y="10"  width="4"  height="12"  fill="#162235" />
      {/* John Hancock */}
      <polygon points="58,220 64,62 76,62 82,220" fill="#0c1422" />
      <rect x="65" y="50"  width="10" height="14"  fill="#0c1422" />
      <line x1="58" y1="220" x2="82" y2="62"  stroke="#0f1a2c" strokeWidth="1.5" />
      <line x1="82" y1="220" x2="58" y2="62"  stroke="#0f1a2c" strokeWidth="1.5" />
      <rect x="69" y="35"  width="2"  height="18"  fill="#182438" />
      <rect x="38"  y="105" width="22" height="115" fill="#0c1422" />
      <rect x="84"  y="95"  width="22" height="125" fill="#0c1422" />
      <rect x="104" y="82"  width="16" height="138" fill="#0c1422" />
      <rect x="150" y="78"  width="20" height="142" fill="#0c1422" />
      <rect x="168" y="90"  width="22" height="130" fill="#0c1422" />
      <rect x="188" y="80"  width="18" height="140" fill="#0c1422" />
      <rect x="204" y="95"  width="22" height="125" fill="#0c1422" />
      <rect x="224" y="85"  width="20" height="135" fill="#0c1422" />
      <rect x="242" y="98"  width="18" height="122" fill="#0c1422" />
      <Windows wins={[[120,48],[125,48],[130,48],[135,48],[120,62],[130,62],[120,76],[130,76],[120,90],[130,90],[120,104],[130,104],[120,118],[130,118],[60,70],[65,70],[60,90],[85,100],[85,112],[105,88],[105,100],[151,85],[151,97],[169,96],[189,87],[205,100],[225,90],[243,104]]} />
      <rect x="0" y="210" width="320" height="10" fill="#060810" />
      <rect x="60"  y="212" width="50" height="1.5" fill="#14224a" opacity="0.5" />
      <rect x="160" y="213" width="70" height="1"   fill="#14224a" opacity="0.4" />
    </svg>
  )
}

function DefaultScene() {
  return (
    <svg viewBox="0 0 320 220" width="100%" height="100%" preserveAspectRatio="xMidYMax slice">
      <defs>
        <linearGradient id="sk-d" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#060912" /><stop offset="100%" stopColor="#111828" />
        </linearGradient>
        <radialGradient id="gl-d" cx="50%" cy="100%" r="65%">
          <stop offset="0%" stopColor="#182060" stopOpacity="0.25" /><stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="320" height="220" fill="url(#sk-d)" />
      <rect width="320" height="220" fill="url(#gl-d)" />
      <Stars />
      <rect x="0"   y="148" width="50" height="72"  fill="#1b2640" />
      <rect x="270" y="142" width="50" height="78"  fill="#1b2640" />
      <rect x="0"   y="115" width="38" height="105" fill="#131e35" />
      <rect x="255" y="110" width="40" height="110" fill="#131e35" />
      <rect x="0"   y="128" width="24" height="92"  fill="#0d1625" />
      <rect x="22"  y="112" width="22" height="108" fill="#0d1625" />
      <rect x="42"  y="95"  width="20" height="125" fill="#0d1625" />
      <rect x="60"  y="82"  width="24" height="138" fill="#0d1625" />
      <rect x="62"  y="65"  width="20" height="19"  fill="#0d1625" />
      <rect x="64"  y="50"  width="16" height="17"  fill="#0d1625" />
      <rect x="66"  y="38"  width="12" height="14"  fill="#0d1625" />
      <rect x="70"  y="22"  width="4"  height="18"  fill="#182235" />
      <rect x="82"  y="90"  width="22" height="130" fill="#0d1625" />
      <rect x="102" y="78"  width="20" height="142" fill="#0d1625" />
      <rect x="120" y="92"  width="24" height="128" fill="#0d1625" />
      <rect x="142" y="85"  width="22" height="135" fill="#0d1625" />
      <rect x="162" y="60"  width="18" height="160" fill="#0c1422" />
      <rect x="164" y="44"  width="14" height="18"  fill="#0c1422" />
      <rect x="167" y="28"  width="8"  height="18"  fill="#0c1422" />
      <rect x="170" y="14"  width="2"  height="16"  fill="#182235" />
      <rect x="182" y="82"  width="22" height="138" fill="#0d1625" />
      <rect x="202" y="95"  width="20" height="125" fill="#0d1625" />
      <rect x="220" y="80"  width="22" height="140" fill="#0d1625" />
      <rect x="240" y="95"  width="20" height="125" fill="#0d1625" />
      <rect x="258" y="108" width="22" height="112" fill="#0d1625" />
      <rect x="278" y="120" width="20" height="100" fill="#0d1625" />
      <rect x="296" y="132" width="24" height="88"  fill="#0d1625" />
      <Windows wins={[[44,100],[44,112],[62,88],[62,100],[62,112],[83,96],[83,108],[103,84],[103,96],[121,98],[121,110],[143,92],[143,104],[163,66],[163,78],[163,90],[163,102],[183,88],[183,100],[203,100],[221,86],[221,98],[241,100],[259,114]]} />
      <Windows color="#8ab0e8" dim wins={[[45,124],[64,122],[84,120],[104,110],[144,116],[164,114],[184,112]]} />
      <ellipse cx="16"  cy="210" rx="16" ry="9"  fill="#071210" />
      <ellipse cx="35"  cy="212" rx="20" ry="8"  fill="#060f0a" />
      <ellipse cx="285" cy="212" rx="18" ry="8"  fill="#060f0a" />
      <ellipse cx="306" cy="210" rx="14" ry="9"  fill="#071210" />
      <rect x="0" y="212" width="320" height="8" fill="#06080e" />
    </svg>
  )
}

function CityScene({ city }: { city: string }) {
  const key = getSkylineKey(city)
  switch (key) {
    case 'new york':  return <NewYorkScene />
    case 'london':    return <LondonScene />
    case 'paris':     return <ParisScene />
    case 'tokyo':     return <TokyoScene />
    case 'chicago':   return <ChicagoScene />
    default:          return <DefaultScene />
  }
}

// ─── Widget ──────────────────────────────────────────────────────────────────
export default function WeatherWidget({ data }: { data: WeatherData }) {
  const now = new Date()

  return (
    <div style={{
      width: 320, height: 320,
      borderRadius: 24,
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      color: '#fff',
    }}>
      {/* Full-bleed city illustration */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <CityScene city={data.city} />
      </div>

      {/* Gradient vignette so text stays readable */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 45%, rgba(0,0,0,0.5) 100%)',
      }} />

      {/* Top row: date/time + temperature */}
      <div style={{
        position: 'absolute', top: 20, left: 22, right: 22,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
      }}>
        <div>
          <div style={{ fontSize: 13, opacity: 0.8, fontWeight: 400, letterSpacing: 0.2 }}>
            {formatDate(now)}
          </div>
          <div style={{ fontSize: 13, opacity: 0.6, fontWeight: 400 }}>
            {formatTime(now)}
          </div>
        </div>
        <div style={{ fontSize: 64, fontWeight: 200, lineHeight: 1, letterSpacing: -2, marginTop: -6 }}>
          {Math.round(data.temp)}°
        </div>
      </div>

      {/* Bottom row: location + conditions */}
      <div style={{
        position: 'absolute', bottom: 20, left: 22, right: 22,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
      }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, letterSpacing: 0.1 }}>{data.city}</div>
          <div style={{ fontSize: 12, opacity: 0.6, fontWeight: 400 }}>{data.country}</div>
        </div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-end' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 10, opacity: 0.55, letterSpacing: 0.5, textTransform: 'uppercase' }}>UV</div>
            <div style={{ fontSize: 15, fontWeight: 500 }}>{data.uv.toFixed(1)}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 10, opacity: 0.55, letterSpacing: 0.5, textTransform: 'uppercase' }}>Rain</div>
            <div style={{ fontSize: 15, fontWeight: 500 }}>
              {data.precipitation}<span style={{ fontSize: 10, opacity: 0.7 }}>mm</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
