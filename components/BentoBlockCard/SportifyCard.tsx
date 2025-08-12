// components/SpotifyCard.tsx
'use client';

import { useEffect, useState } from "react";

interface SpotifyData {
  name: string;
  artist: string;
  url: string;
  image: string;
  type: string;
  progress_ms: number;
  duration_ms: number;
}

export default function SpotifyCard() {
  const [data, setData] = useState<SpotifyData | null>(null);

  useEffect(() => {
    const fetchSpotify = async () => {
      try {
        const res = await fetch("https://sportify-wallpaper-server.onrender.com/get");
        const json = await res.json();
        setData(json);
      } catch {
        setData(null);
      }
    };

    fetchSpotify();
    const interval = setInterval(fetchSpotify, 5000);
    return () => clearInterval(interval);
  }, []);

  const progressPercent = data?.progress_ms && data?.duration_ms
    ? (data.progress_ms / data.duration_ms) * 100
    : 0;

  return (
    <div
      className="block-custom col-span-1 row-span-1 flex items-center py-10 px-5 relative group cursor-pointer overflow-hidden border rounded-md"
      onClick={() => data?.url && window.open(data.url, "_blank")}
    >
      <div className="img-container">
      </div>
      <div className="z-10 flex flex-col items-start justify-between h-full w-[50%] rounded-md text-white m-4">
        <div className="relative">
          <img
            src={data?.image || "https://via.placeholder.com/150?text=No+Image"}
            alt="Album cover"
            className="rounded-md w-full aspect-square object-cover shadow border border-gray-700"
          />
          <div className="absolute inset-0 bg-[#e9d3b6] opacity-40" />
        </div>
        <div className="w-full text-left text-xs mt-2">
          <p className="text-gray-400 italic mb-1">{data?.type === "playing" ? "Now Playing" : "Last Played"}</p>
          <p className="text-sm font-semibold truncate">{data?.name || "Loading..."}</p>
          <p className="text-gray-300 text-xs truncate">{data?.artist || "..."}</p>
        </div>
        {data?.type === "playing" && (
          <div className="w-full bg-[#23211e] rounded-full h-1.5 overflow-hidden mt-2">
            <div
              className="bg-[#e9d3b6] h-1.5 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
