import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import BentoBlock from '@/components/BentoBlock'
import ProjectBlock from '@/components/ProjectBlock'


export default function Home() {
  return (
    <section className="mt-20 my-6 ">
      <div className='grid gap-8 lg:grid-cols-[3fr_2fr] lg:items-start'>
      {/* LEFT */}
        <div className="space-y-4">
          <div>
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
              <span
                className="inline-block bg-clip-text text-gray-900 dark:text-gray-100/80 animate-shine text-3xl font-bold tracking-tight sm:text-4xl"
              >
                Quoc Bui
              </span>
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              20 • Developer • Linux
            </p>
          </div>
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
              I build the future, one system at a time
            </h2>
            <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              From neural networks to distributed systems. From perfect Linux setups to AI that
              actually works. I learn fast, build faster, and solve whatever needs solving.
            </p>

            <div className="flex items-center gap-6 pt-1">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
              >
                Read my thoughts
                <svg
                  className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100 transition-colors"
              >
                See the work
                <svg
                  className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        {/* RIGHT */}
        <div className="flex justify-center lg:justify-end">
        </div>
      </div>

        {/* Bento here */}
      <div className="hidden md:grid mt-10  grd-cols-3 lg:grid-cols-4 grid-rows-2 gap-4 w-full max-w-7xl h-[600px] relative">
        <BentoBlock />
      </div>

      <ProjectBlock/>
    </section>
  )
}
