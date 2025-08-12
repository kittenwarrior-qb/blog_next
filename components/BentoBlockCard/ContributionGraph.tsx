'use client';

import { useEffect, useState, useRef } from "react";

interface ContributionDay {
  date: string;
  contributionCount: number;
}

export default function ContributionGraph() {
  const [data, setData] = useState<ContributionDay[][]>([]);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("https://github-contributions-api.deno.dev/kittenwarrior-qb.json")
      .then((res) => res.json())
      .then((res) => {
        const flatDays = res.contributions.flat();
        const twoThirdDays = flatDays.slice(-Math.floor(flatDays.length / 3));
        const grouped: ContributionDay[][] = [];
        for (let i = 0; i < twoThirdDays.length; i += 7) {
          grouped.push(twoThirdDays.slice(i, i + 7));
        }
        setData(grouped);
      });
  }, []);

  const getColorClass = (count: number): string => {
    if (count === 0) return "bg-[#f4f4f5] dark:bg-[#1f2937]"; 
    if (count < 4) return "bg-[#80e4a8] dark:bg-[#34d399]";   
    if (count < 7) return "bg-[#40d67c] dark:bg-[#059669]";   
    return "bg-[#00c950] dark:bg-[#047857]";                  
  };


  const getMonthLabels = () => {
    const labels: { idx: number; month: string }[] = [];
    data.forEach((week, idx) => {
      const firstDay = new Date(week[0]?.date);
      const day = firstDay.getDate();
      if (day <= 7) {
        labels.push({
          idx,
          month: firstDay.toLocaleString("en-US", { month: "short" }),
        });
      }
    });
    return labels;
  };

  const monthLabels = getMonthLabels();

  return (
    <div
      ref={containerRef}
      className="block-custom col-span-2 row-span-1 p-4 flex flex-col items-center justify-center relative group rounded-lg border border-zinc-200 dark:border-zinc-800"
    >
      {/* Month Labels */}
      <div className="grid grid-flow-col auto-cols-max gap-[5px] text-sm text-gray-600 dark:text-gray-300 mb-2 z-10 relative">
        {data.map((_, idx) => {
          const label = monthLabels.find((l) => l.idx === idx);
          return (
            <div key={idx} className="w-[20px] h-[20px] text-[10px]">
              {label ? label.month : ""}
            </div>
          );
        })}
      </div>

      {/* Contribution Grid */}
      <div className="grid grid-flow-col auto-cols-max gap-[5px] z-10 relative">
        {data.map((week, idx) => (
          <div className="grid grid-rows-7 gap-[5px]" key={idx}>
            {week.map((day, i) => (
              <div
                key={i}
                className={`w-[20px] h-[20px] rounded-sm border-neutral-300 dark:border-neutral-700 transition-all contribution-square ${getColorClass(day.contributionCount)}`}
                onMouseEnter={(e) => {
                  setHoveredDay(day);
                  const rect = (e.target as HTMLDivElement).getBoundingClientRect();
                  const containerRect = containerRef.current?.getBoundingClientRect();
                  if (containerRect) {
                    setTooltipPos({
                      x: rect.left - containerRect.left + rect.width + 8, 
                      y: rect.top - containerRect.top - 4,
                    });
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
          className="absolute px-2 py-1 text-xs bg-black text-white rounded shadow z-50 pointer-events-none transition-all"
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
  );
}
