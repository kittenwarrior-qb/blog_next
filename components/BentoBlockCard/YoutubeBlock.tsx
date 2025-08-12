'use client';
import SocialIcon from '@/components/social-icons'
import siteMetadata from '@/data/siteMetadata'

export default function YouTubeBlock() {
  return (
    <div className="block-custom col-start-3 row-start-2 p-4 flex items-center justify-center relative group border border-zinc-200 dark:border-zinc-800 rounded-lg">
      <SocialIcon kind="youtube" href={siteMetadata.youtube} size={10} />
    </div>
  );
}
