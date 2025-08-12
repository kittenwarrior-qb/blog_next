'use client'

import { useEffect, useState } from 'react'

interface GitHubUser {
  login: string
  name: string
  avatar_url: string
  followers: number
  public_repos: number
}

export default function GitHubUserCard() {
  const [data, setData] = useState<GitHubUser | null>(null)

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_GITHUB_API_TOKEN

    fetch('https://api.github.com/users/kittenwarrior-qb', {
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  return (
    <div className="block-custom group relative col-span-1 row-span-2 flex w-full items-center justify-center text-xl">
      <div className="z-10 flex h-full w-full flex-col items-center rounded-lg border border-zinc-200 dark:border-zinc-800">
        <div
          className="avatar_img_container relative flex justify-center py-4"
          style={{ height: 130 }}
        >
          {data?.avatar_url && (
            <img
              src={data.avatar_url}
              className="h-24 w-24 rounded-full transition-opacity"
              alt="avatar"
            />
          )}
        </div>

        <div className="w-full p-2 text-center leading-[1.5]">
          <p className="text-[16px]">{data?.name ?? 'Loading...'}</p>
          <p className="text-[12px] font-light">@{data?.login ?? '...'}</p>
        </div>

        <div className="mt-3 w-full space-y-1 p-2 text-center text-[12px] leading-[1.5] font-light">
          <p>
            <strong>Followers:</strong> {data?.followers ?? '0'}
          </p>
          <p>
            <strong>Repositories:</strong> {data?.public_repos ?? '0'}
          </p>
        </div>
      </div>
    </div>
  )
}
