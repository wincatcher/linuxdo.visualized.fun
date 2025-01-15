import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MetricCard } from "./MetricCard";
import { ChartPie, Users, MessageSquare, ThumbsUp } from "lucide-react";

type AboutProps = {
  about: {
    description: string;
    extended_site_description: string;
    stats: {
      [key: string]: number;
    };
    contact_email: string;
    version: string;
    site_creation_date: string;
    title: string;
  };
};

export function About({ about }: AboutProps) {
  const { description, extended_site_description, stats } = about;

  const metricGroups = {
    内容数据: {
      icon: <ChartPie className="w-5 h-5 text-blue-500" />,
      metrics: [
        { key: "topics", title: "主题数据" },
        { key: "posts", title: "帖子数据" },
      ],
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
    },
    用户数据: {
      icon: <Users className="w-5 h-5 text-green-500" />,
      metrics: [
        { key: "users", title: "用户数据" },
        { key: "active_users", title: "活跃用户" },
        { key: "participating_users", title: "参与用户" },
      ],
      bgColor: "bg-green-50 dark:bg-green-950/30",
    },
    互动数据: {
      icon: <MessageSquare className="w-5 h-5 text-purple-500" />,
      metrics: [
        { key: "likes", title: "点赞数据" },
        { key: "chat_messages", title: "消息数据" },
        { key: "chat_users", title: "聊天用户" },
        { key: "chat_channels", title: "聊天频道" },
      ],
      bgColor: "bg-purple-50 dark:bg-purple-950/30",
    },
  };

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 text-white p-8">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-4xl font-bold">
                {about.title} 社区数据实时报告
              </CardTitle>
              <p className="mt-2 text-blue-50">{description}</p>
            </div>
            <div className="text-right text-sm text-blue-100">
              <div>
                当前时间:{" "}
                {new Date().toLocaleString("zh-CN")}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <div
            className="prose dark:prose-invert max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: extended_site_description }}
          />

          <div className="grid gap-8">
            {Object.entries(metricGroups).map(
              ([groupName, { icon, metrics, bgColor }]) => (
                <div key={groupName} className={`rounded-xl p-6 ${bgColor}`}>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    {icon}
                    {groupName}
                  </h3>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                    {metrics.map((metric) => (
                      <MetricCard
                        key={metric.key}
                        stats={stats}
                        metricKey={metric.key}
                        title={metric.title}
                      />
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
