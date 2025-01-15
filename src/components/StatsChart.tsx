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

type StatsChartProps = {
  stats: {
    [key: string]: number;
  };
  period: "last_day" | "7_days" | "30_days";
};

const periodLabels = {
  last_day: "24小时",
  "7_days": "7天",
  "30_days": "30天",
};

export function StatsChart({ stats, period }: StatsChartProps) {
  const metrics = {
    topics: "主题数",
    posts: "帖子数",
    users: "用户数",
    likes: "点赞数",
  };

  const colors = {
    topics: "rgb(37, 99, 235)",
    posts: "rgb(22, 163, 74)",
    users: "rgb(249, 115, 22)",
    likes: "rgb(219, 39, 119)",
  };

  const data = {
    labels: Object.values(metrics),
    datasets: [
      {
        data: Object.keys(metrics).map((key) => stats[`${key}_${period}`]),
        backgroundColor: Object.keys(metrics).map(
          (key) => colors[key as keyof typeof colors]
        ),
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
        titleFont: { size: 14 },
        bodyFont: { size: 13 },
        callbacks: {
          label: function (context: any) {
            const value = context.raw;
            const prevPeriod = getPreviousPeriodValue(
              stats,
              context.dataIndex,
              period
            );
            const change = (((value - prevPeriod) / prevPeriod) * 100).toFixed(
              1
            );
            const trend = value >= prevPeriod ? "↑" : "↓";
            return `数量: ${value.toLocaleString("zh-CN")} ${trend}${Math.abs(
              Number(change)
            )}%`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="w-full h-[300px] p-4 bg-white dark:bg-gray-800 rounded-lg">
      <Bar data={data} options={options} />
    </div>
  );
}

function getPreviousPeriodValue(
  stats: any,
  metricIndex: number,
  period: string
): number {
  const metrics = ["topics", "posts", "users", "likes"];
  const metric = metrics[metricIndex];

  // 获取上一个周期的数据
  const prevValue =
    period === "last_day"
      ? stats[`${metric}_previous_day`]
      : period === "7_days"
      ? stats[`${metric}_previous_7_days`]
      : stats[`${metric}_previous_30_days`];

  return prevValue || 0;
}
