'use client'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function GitHubMascot() {
  return (
    <div className="block-custom group relative col-start-4 row-start-2 flex items-center justify-center rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
      <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={10} />
    </div>
  )
}
