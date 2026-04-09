'use client'

import { useState } from 'react'
import WeatherWidget from './WeatherWidget'

interface WeatherData {
  temp: number
  uv: number
  precipitation: number
  city: string
  country: string
}

async function fetchWeather(city: string): Promise<WeatherData> {
  const geoRes = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
  )
  const geoData = await geoRes.json()
  if (!geoData.results?.length) throw new Error('City not found')

  const { latitude, longitude, name, country } = geoData.results[0]

  const weatherRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
      `&current=temperature_2m,precipitation,uv_index&temperature_unit=fahrenheit`
  )
  const weatherData = await weatherRes.json()
  const current = weatherData.current

  return {
    temp: current.temperature_2m,
    uv: current.uv_index,
    precipitation: current.precipitation,
    city: name,
    country,
  }
}

export default function Home() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    setError(null)
    try {
      const data = await fetchWeather(query.trim())
      setWeather(data)
    } catch {
      setError('City not found. Try another name.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#080b12',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      }}
    >
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: 10 }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a city…"
          style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 12,
            padding: '10px 16px',
            color: '#fff',
            fontSize: 15,
            outline: 'none',
            width: 220,
          }}
        />
        <button
          type="submit"
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 12,
            padding: '10px 18px',
            color: '#fff',
            fontSize: 15,
            cursor: 'pointer',
          }}
        >
          {loading ? '…' : 'Search'}
        </button>
      </form>

      {error && (
        <p style={{ color: 'rgba(255,100,100,0.8)', fontSize: 14 }}>{error}</p>
      )}

      {!weather && !error && !loading && (
        <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 14 }}>
          Search a city to see the widget
        </p>
      )}

      {loading && (
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>Loading…</p>
      )}

      {weather && !loading && <WeatherWidget data={weather} />}
    </main>
  )
}
