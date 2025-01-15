"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  MessageSquare,
  ThumbsUp,
  FileText,
  MessagesSquare,
  Activity,
  Hash,
  Radio,
} from "lucide-react";

type MetricCardProps = {
  stats: {
    [key: string]: number;
  };
  metricKey: string;
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

export function MetricCard({ stats, metricKey, title }: MetricCardProps) {
  const Icon = ICONS[metricKey as keyof typeof ICONS];
  const formatNumber = (num: number) =>
    new Intl.NumberFormat("zh-CN").format(num);

  const periods = [
    { key: "last_day", label: "24小时" },
    { key: "7_days", label: "7天" },
    { key: "30_days", label: "30天" },
  ];

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
            <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {periods.map((period) => {
            const value = stats[`${metricKey}_${period.key}`] || 0;
            return (
              <div key={period.key} className="text-center">
                <div className="text-sm text-muted-foreground mb-1">
                  {period.label}
                </div>
                <div className="text-xl font-bold">{formatNumber(value)}</div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
