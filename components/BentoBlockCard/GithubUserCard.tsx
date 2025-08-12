'use client';

import { useEffect, useState } from "react";

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  followers: number;
  public_repos: number;
}

export default function GitHubUserCard() {
  const [data, setData] = useState<GitHubUser | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/users/kittenwarrior-qb", {
      headers: {
        Authorization: `token TOKEN_HERE`,
      },
    })
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <div className="w-full block-custom col-span-1 row-span-2 flex text-xl relative group">
      <div className="flex w-full flex-col p-3 rounded-lg border z-10">
        <div className="avatar_img_container relative py-4" style={{ height: 130 }}>
          {data?.avatar_url && (
            <img
              src={data.avatar_url}
              className="rounded-full w-24 h-24 absolute transition-opacity"
              alt="avatar"
            />
          )}
        </div>

        <div className="w-full p-2 leading-[1.5]">
          <p className="text-[16px]">{data?.name ?? "Loading..."}</p>
          <p className="text-[12px] font-light">@{data?.login ?? "..."}</p>
        </div>

        <div className="w-full p-2 mt-3 leading-[1.5] text-[12px] font-light space-y-1">
          <p><strong>Followers:</strong> {data?.followers ?? "0"}</p>
          <p><strong>Repositories:</strong> {data?.public_repos ?? "0"}</p>
        </div>
      </div>
    </div>
  );
}
