"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

type UserActivityPieProps = {
  stats: {
    [key: string]: number;
  };
};

export function UserActivityPie({ stats }: UserActivityPieProps) {
  const data = {
    labels: ["活跃用户", "参与讨论", "聊天用户"],
    datasets: [
      {
        data: [
          stats.active_users_last_day,
          stats.participating_users_last_day,
          stats.chat_users_last_day,
        ],
        backgroundColor: [
          "rgba(37, 99, 235, 0.8)",
          "rgba(22, 163, 74, 0.8)",
          "rgba(249, 115, 22, 0.8)",
        ],
        borderColor: [
          "rgb(37, 99, 235)",
          "rgb(22, 163, 74)",
          "rgb(249, 115, 22)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 20,
          font: {
            size: 13,
          },
        },
      },
      tooltip: {
        padding: 12,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 13,
        },
        callbacks: {
          label: function (context: any) {
            const label = context.label || "";
            const value = context.raw;
            const percentage = ((value / stats.users_count) * 100).toFixed(1);
            return `${label}: ${value.toLocaleString(
              "zh-CN"
            )} (${percentage}%)`;
          },
        },
      },
    },
    cutout: "30%",
    radius: "90%",
  };

  return (
    <div className="w-full h-[300px] p-4 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center">
      <Pie data={data} options={options} />
    </div>
  );
}
