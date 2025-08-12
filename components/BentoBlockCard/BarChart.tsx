
'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Languages & Learning Time',
    },
  },
};

const labels = ['JavaScript', 'TypeScript', 'Python', 'Go', 'Rust'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Hours Spent',
      data: [30, 45, 20, 10, 5],
      backgroundColor: 'rgba(255, 206, 86, 0.5)',
    },
  ],
};

export default function LanguageBarChart() {
  return (
    <div className="block-custom col-start-2 row-start-2 p-4 flex items-center justify-center relative group border  rounded-lg">
      <Bar options={options} data={data} />
    </div>
  );
}
