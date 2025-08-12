import React from 'react'
import GitHubUserCard from './BentoBlockCard/GithubUserCard'
import ContributionGraph from './BentoBlockCard/ContributionGraph'
import SpotifyCard from './BentoBlockCard/SportifyCard'
import YouTubeBlock from './BentoBlockCard/YoutubeBlock'
import LanguageBarChart from './BentoBlockCard/BarChart'
import GitHubMascot from './BentoBlockCard/GithubMascot'

const BentoBlock = () => {
  return (
    <>
      <GitHubUserCard />
      <ContributionGraph />
      <SpotifyCard />
      <YouTubeBlock />
      <LanguageBarChart />
      <GitHubMascot />
    </>
  )
}

export default BentoBlock
