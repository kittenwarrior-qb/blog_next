'use client'

import { useEffect, useState, useRef } from 'react'

interface ContributionDay {
  date: string
  contributionCount: number
}

export default function ContributionGraph() {
  const [data, setData] = useState<ContributionDay[][]>([])
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null)
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('https://github-contributions-api.deno.dev/kittenwarrior-qb.json')
      .then((res) => res.json())
      .then((res) => {
        const flatDays = res.contributions.flat()
        const twoThirdDays = flatDays.slice(-Math.floor(flatDays.length / 3))
        const grouped: ContributionDay[][] = []
        for (let i = 0; i < twoThirdDays.length; i += 7) {
          grouped.push(twoThirdDays.slice(i, i + 7))
        }
        setData(grouped)
      })
  }, [])

  const getColorClass = (count: number): string => {
    if (count === 0) return 'bg-[#f4f4f5] dark:bg-[#1f2937]'
    if (count < 4) return 'bg-[#80e4a8] dark:bg-[#34d399]'
    if (count < 7) return 'bg-[#40d67c] dark:bg-[#059669]'
    return 'bg-[#00c950] dark:bg-[#047857]'
  }

  const getMonthLabels = () => {
    const labels: { idx: number; month: string }[] = []
    data.forEach((week, idx) => {
      const firstDay = new Date(week[0]?.date)
      const day = firstDay.getDate()
      if (day <= 7) {
        labels.push({
          idx,
          month: firstDay.toLocaleString('en-US', { month: 'short' }),
        })
      }
    })
    return labels
  }

  const monthLabels = getMonthLabels()

  return (
    <div
      ref={containerRef}
      className="block-custom group relative col-span-2 row-span-1 flex flex-col items-center justify-center rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
    >
      {/* Month Labels */}
      <div className="relative z-10 mb-2 grid auto-cols-max grid-flow-col gap-[5px] text-sm text-gray-600 dark:text-gray-300">
        {data.map((_, idx) => {
          const label = monthLabels.find((l) => l.idx === idx)
          return (
            <div key={idx} className="h-[20px] w-[20px] text-[10px]">
              {label ? label.month : ''}
            </div>
          )
        })}
      </div>

      {/* Contribution Grid */}
      <div className="relative z-10 grid auto-cols-max grid-flow-col gap-[5px]">
        {data.map((week, idx) => (
          <div className="grid grid-rows-7 gap-[5px]" key={idx}>
            {week.map((day, i) => (
              <div
                key={i}
                className={`contribution-square h-[20px] w-[20px] rounded-sm border-neutral-300 transition-all dark:border-neutral-700 ${getColorClass(day.contributionCount)}`}
                onMouseEnter={(e) => {
                  setHoveredDay(day)
                  const rect = (e.target as HTMLDivElement).getBoundingClientRect()
                  const containerRect = containerRef.current?.getBoundingClientRect()
                  if (containerRect) {
                    setTooltipPos({
                      x: rect.left - containerRect.left + rect.width + 8,
                      y: rect.top - containerRect.top - 4,
                    })
                  }
                }}
                onMouseLeave={() => setHoveredDay(null)}
              ></div>
            ))}
          </div>
        ))}
      </div>

      {/* Tooltip */}
      {hoveredDay && (
        <div
          className="pointer-events-none absolute z-50 rounded bg-black px-2 py-1 text-xs text-white shadow transition-all"
          style={{
            top: tooltipPos.y,
            left: tooltipPos.x,
          }}
        >
          {`${hoveredDay.contributionCount} contributions on ${new Date(
            hoveredDay.date
          ).toDateString()}`}
        </div>
      )}
    </div>
  )
}
