"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type MetricTrendProps = {
  stats: {
    [key: string]: number;
  };
  metric: string;
  title: string;
};

const periodLabels = ["24小时", "7天", "30天"];
const periodKeys = ["last_day", "7_days", "30_days"];

export function MetricTrend({ stats, metric, title }: MetricTrendProps) {
  const data = {
    labels: periodLabels,
    datasets: [
      {
        label: title,
        data: periodKeys.map((period) => stats[`${metric}_${period}`]),
        backgroundColor: "rgba(37, 99, 235, 0.8)",
        borderColor: "rgb(37, 99, 235)",
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        padding: 12,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        callbacks: {
          label: function (context: any) {
            const value = context.raw;
            const periodIndex = context.dataIndex;
            const prevValue = getPreviousPeriodValue(
              stats,
              metric,
              periodKeys[periodIndex]
            );
            const change = (((value - prevValue) / prevValue) * 100).toFixed(1);
            const trend = value >= prevValue ? "↑" : "↓";
            return [
              `数量: ${value.toLocaleString("zh-CN")}`,
              `环比: ${trend}${Math.abs(Number(change))}%`,
            ];
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: number) {
            return value.toLocaleString("zh-CN");
          },
        },
      },
    },
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">{title}趋势</h3>
      <div className="h-[200px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

function getPreviousPeriodValue(
  stats: any,
  metric: string,
  period: string
): number {
  const prevValue = stats[`${metric}_previous_${period}`] || 0;
  return prevValue;
}
