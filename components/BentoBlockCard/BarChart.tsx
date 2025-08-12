'use client'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Skills Overview (Hours Spent)',
    },
  },
}

const labels = ['TypeScript', 'Mdx', 'JavaScript', 'Python', 'HTML']

export const data = {
  labels,
  datasets: [
    {
      label: 'Hours Spent',
      data: [120, 200, 80, 100, 60],
      backgroundColor: [
        'rgba(75, 192, 192, 0.5)',
        'rgba(255, 159, 64, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 205, 86, 0.5)',
        'rgba(54, 162, 235, 0.5)',
      ],
    },
  ],
}

export default function SkillsBarChart() {
  return (
    <div className="block-custom group relative col-start-2 row-start-2 flex items-center justify-center rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
      <Bar options={options} data={data} />
    </div>
  )
}
