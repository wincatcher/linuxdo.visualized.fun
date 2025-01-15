"use client";

import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

type UserActivityPieProps = {
  stats: {
    active_users_last_day: number;
    participating_users_last_day: number;
    chat_users_last_day: number;
    users_count: number;
  };
};

export function UserActivityPie({ stats }: UserActivityPieProps) {
  const data: ChartData<"doughnut"> = {
    labels: ["活跃用户", "参与讨论", "聊天用户"],
    datasets: [
      {
        data: [
          stats.active_users_last_day,
          stats.participating_users_last_day,
          stats.chat_users_last_day,
        ],
        backgroundColor: [
          "rgba(96, 165, 250, 0.8)",
          "rgba(52, 211, 153, 0.8)",
          "rgba(251, 146, 60, 0.8)",
        ],
        borderColor: [
          "rgb(96, 165, 250)",
          "rgb(52, 211, 153)",
          "rgb(251, 146, 60)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          font: {
            size: 13,
            family: "'Inter', sans-serif",
          },
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleFont: {
          size: 14,
          family: "'Inter', sans-serif",
        },
        bodyFont: {
          size: 13,
          family: "'Inter', sans-serif",
        },
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw as number;
            const percentage = ((value / stats.users_count) * 100).toFixed(1);
            return `${label}: ${value.toLocaleString(
              "zh-CN"
            )} (${percentage}%)`;
          },
        },
      },
    },
    cutout: "60%",
    radius: "90%",
    animation: {
      animateScale: true,
      animateRotate: true,
      duration: 2000,
      easing: "easeInOutQuart",
    },
  };

  return (
    <div className="relative p-4 animate-fade-in">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center animate-scale">
          <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {stats.users_count.toLocaleString("zh-CN")}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            总用户数
          </div>
        </div>
      </div>
      <Doughnut data={data} options={options} />
    </div>
  );
}
