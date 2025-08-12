// components/SpotifyCard.tsx
'use client'

import { useEffect, useState } from 'react'

interface SpotifyData {
  name: string
  artist: string
  url: string
  image: string
  type: string
  progress_ms: number
  duration_ms: number
}

export default function SpotifyCard() {
  const [data, setData] = useState<SpotifyData | null>(null)

  useEffect(() => {
    const fetchSpotify = async () => {
      try {
        const res = await fetch('https://sportify-wallpaper-server.onrender.com/get')
        const json = await res.json()
        setData(json)
      } catch {
        setData(null)
      }
    }

    fetchSpotify()
    const interval = setInterval(fetchSpotify, 5000)
    return () => clearInterval(interval)
  }, [])

  const progressPercent =
    data?.progress_ms && data?.duration_ms ? (data.progress_ms / data.duration_ms) * 100 : 0

  return (
    <div
      className="block-custom group relative col-span-1 row-span-1 flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-md border border-zinc-200 px-5 py-6 dark:border-zinc-800"
      onClick={() => data?.url && window.open(data.url, '_blank')}
    >
      <div className="flex w-full flex-col items-center justify-center">
        <div className="relative">
          <img
            src={data?.image || 'https://via.placeholder.com/150?text=No+Image'}
            alt="Album cover"
            className="aspect-square w-32 rounded-md border border-gray-300 object-cover shadow dark:border-gray-700"
          />
          <div className="absolute inset-0 rounded-md bg-[#e9d3b6] opacity-40" />
        </div>

        <div className="mt-3 w-full text-center text-xs">
          <p className="mb-1 text-gray-500 italic dark:text-gray-400">
            {data?.type === 'playing' ? 'Now Playing' : 'Last Played'}
          </p>
          <p className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">
            {data?.name || 'Loading...'}
          </p>
          <p className="truncate text-xs text-gray-600 dark:text-gray-300">
            {data?.artist || '...'}
          </p>
        </div>

        {data?.type === 'playing' && (
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
            <div
              className="h-1.5 rounded-full bg-[#e9d3b6]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
