'use client'
import SocialIcon from '@/components/social-icons'
import siteMetadata from '@/data/siteMetadata'

export default function YouTubeBlock() {
  return (
    <div className="block-custom group relative col-start-3 row-start-2 flex items-center justify-center rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
      <SocialIcon kind="youtube" href={siteMetadata.youtube} size={10} />
    </div>
  )
}
