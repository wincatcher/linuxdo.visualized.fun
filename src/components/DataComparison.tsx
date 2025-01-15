"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  Users,
  MessageSquare,
  ThumbsUp,
  FileText,
  MessagesSquare,
  Activity,
  Hash,
  Radio,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

type DataComparisonProps = {
  stats: {
    [key: string]: number;
  };
  period: "last_day" | "7_days" | "30_days";
  title: string;
};

const ICONS = {
  topics: Hash,
  posts: FileText,
  users: Users,
  active_users: Activity,
  participating_users: Users,
  likes: ThumbsUp,
  chat_messages: MessageSquare,
  chat_users: MessagesSquare,
  chat_channels: Radio,
};

export function DataComparison({ stats, period, title }: DataComparisonProps) {
  const statGroups = {
    内容数据: [
      { key: "topics", label: "主题" },
      { key: "posts", label: "帖子" },
    ],
    用户数据: [
      { key: "users", label: "用户" },
      { key: "active_users", label: "活跃用户" },
      { key: "participating_users", label: "参与用户" },
    ],
    互动数据: [
      { key: "likes", label: "点赞" },
      { key: "chat_messages", label: "消息" },
      { key: "chat_users", label: "聊天用户" },
      { key: "chat_channels", label: "聊天频道" },
    ],
  };

  const formatNumber = (num: number) =>
    new Intl.NumberFormat("zh-CN").format(num);

  const getChangeRate = (current: number, previous: number) => {
    if (!previous) return { rate: 0, trend: "neutral" };
    const rate = ((current - previous) / previous) * 100;
    return {
      rate: Math.abs(rate).toFixed(1),
      trend: rate > 0 ? "up" : rate < 0 ? "down" : "neutral",
      percentage: Math.min(Math.abs(rate), 100), // 用于进度条
    };
  };

  const periodTexts = {
    last_day: "24小时",
    "7_days": "7天",
    "30_days": "30天",
  };

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <span>{periodTexts[period]}数据概览</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {Object.entries(statGroups).map(([groupName, items]) => (
            <div key={groupName} className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">
                {groupName}
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {items.map(({ key, label }) => {
                  const current = stats[`${key}_${period}`] || 0;
                  const previous = stats[`${key}_previous_${period}`] || 0;
                  const { rate, trend, percentage } = getChangeRate(
                    current,
                    previous
                  );
                  const Icon = ICONS[key as keyof typeof ICONS];

                  return (
                    <div
                      key={key}
                      className={`
                        p-4 rounded-xl border border-gray-100 dark:border-gray-700
                        ${
                          trend === "up"
                            ? "bg-green-50/50 dark:bg-green-900/20"
                            : trend === "down"
                            ? "bg-red-50/50 dark:bg-red-900/20"
                            : "bg-gray-50/50 dark:bg-gray-800/50"
                        }
                      `}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div
                            className={`
                            p-2 rounded-lg
                            ${
                              trend === "up"
                                ? "bg-green-100 dark:bg-green-900/40"
                                : trend === "down"
                                ? "bg-red-100 dark:bg-red-900/40"
                                : "bg-gray-100 dark:bg-gray-800"
                            }
                          `}
                          >
                            <Icon
                              className={`
                              w-5 h-5
                              ${
                                trend === "up"
                                  ? "text-green-600 dark:text-green-400"
                                  : trend === "down"
                                  ? "text-red-600 dark:text-red-400"
                                  : "text-gray-600 dark:text-gray-400"
                              }
                            `}
                            />
                          </div>
                          <span className="font-medium">{label}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {trend === "up" ? (
                            <TrendingUp className="w-4 h-4 text-green-500" />
                          ) : trend === "down" ? (
                            <TrendingDown className="w-4 h-4 text-red-500" />
                          ) : null}
                          <span
                            className={`text-sm font-medium
                            ${
                              trend === "up"
                                ? "text-green-600 dark:text-green-400"
                                : trend === "down"
                                ? "text-red-600 dark:text-red-400"
                                : "text-gray-600 dark:text-gray-400"
                            }
                          `}
                          >
                            {rate}%
                          </span>
                        </div>
                      </div>
                      <div className="text-2xl font-bold mb-2">
                        {formatNumber(current)}
                      </div>
                      <div className="space-y-2">
                        <Progress
                          value={percentage}
                          className={`
                            ${
                              trend === "up"
                                ? "bg-green-100 dark:bg-green-900"
                                : trend === "down"
                                ? "bg-red-100 dark:bg-red-900"
                                : "bg-gray-100 dark:bg-gray-800"
                            }
                          `}
                          indicatorColor={`
                            ${
                              trend === "up"
                                ? "bg-green-500"
                                : trend === "down"
                                ? "bg-red-500"
                                : "bg-gray-500"
                            }
                          `}
                        />
                        <div className="text-sm text-muted-foreground">
                          环比: {formatNumber(previous)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
