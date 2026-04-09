'use client'

import { skylines, getSkylineKey } from './skylines'

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

export default function WeatherWidget({ data }: { data: WeatherData }) {
  const now = new Date()
  const key = getSkylineKey(data.city)
  const path = skylines[key]

  return (
    <div
      style={{
        width: 320,
        height: 320,
        borderRadius: 24,
        background: 'linear-gradient(160deg, #1a1f2e 0%, #0d1117 60%, #0a0e18 100%)',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
        color: '#fff',
      }}
    >
      {/* Sky gradient layer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 70% 30%, rgba(30,45,80,0.5) 0%, transparent 60%)',
        }}
      />

      {/* Skyline SVG */}
      <svg
        viewBox="0 0 400 220"
        preserveAspectRatio="xMidYMax slice"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          width: '100%',
          height: '75%',
          opacity: 0.85,
        }}
      >
        {/* Subtle sky glow behind skyline */}
        <ellipse cx="200" cy="160" rx="200" ry="60" fill="rgba(40,60,120,0.15)" />
        {/* Skyline silhouette */}
        <path d={path} fill="#1c2235" />
        {/* Ground reflection */}
        <rect x="0" y="210" width="400" height="10" fill="rgba(30,40,70,0.4)" />
      </svg>

      {/* Top row: date/time + temperature */}
      <div
        style={{
          position: 'absolute',
          top: 20,
          left: 22,
          right: 22,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <div>
          <div style={{ fontSize: 13, opacity: 0.7, fontWeight: 400, letterSpacing: 0.2 }}>
            {formatDate(now)}
          </div>
          <div style={{ fontSize: 13, opacity: 0.55, fontWeight: 400 }}>
            {formatTime(now)}
          </div>
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 200,
            lineHeight: 1,
            letterSpacing: -2,
            marginTop: -6,
          }}
        >
          {Math.round(data.temp)}°
        </div>
      </div>

      {/* Bottom row: location + conditions */}
      <div
        style={{
          position: 'absolute',
          bottom: 20,
          left: 22,
          right: 22,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, letterSpacing: 0.1 }}>{data.city}</div>
          <div style={{ fontSize: 12, opacity: 0.55, fontWeight: 400 }}>{data.country}</div>
        </div>

        {/* UV + Precipitation */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 10, opacity: 0.5, letterSpacing: 0.5, textTransform: 'uppercase' }}>UV</div>
            <div style={{ fontSize: 15, fontWeight: 500 }}>{data.uv.toFixed(1)}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 10, opacity: 0.5, letterSpacing: 0.5, textTransform: 'uppercase' }}>Rain</div>
            <div style={{ fontSize: 15, fontWeight: 500 }}>{data.precipitation}<span style={{ fontSize: 10, opacity: 0.7 }}>mm</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
