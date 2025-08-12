'use client';
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function GitHubMascot() {
  return (
    <div className="block-custom col-start-4 row-start-2 p-4 flex items-center justify-center relative group border rounded-lg border-zinc-200 dark:border-zinc-800">
      <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={10} />
    </div>
  );
}
