import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "./MetricCard";
import { ChartPie, Users, MessageSquare } from "lucide-react";

export type AboutProps = {
  about: {
    description: string;
    stats: {
      [key: string]: number;
    };
    title: string;
    admin_ids?: number[];
    moderator_ids?: number[];
    contact_email?: string;
    version?: string;
    site_creation_date?: string;
  };
};

export function About({ about }: AboutProps) {
  const { description, stats } = about;

  const metricGroups = {
    内容数据: {
      icon: <ChartPie className="w-5 h-5 text-blue-500" />,
      metrics: [
        { key: "topics", title: "主题数据" },
        { key: "posts", title: "帖子数据" },
      ],
      bgColor:
        "bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20",
    },
    用户数据: {
      icon: <Users className="w-5 h-5 text-green-500" />,
      metrics: [
        { key: "users", title: "新加用户" },
        { key: "active_users", title: "活跃用户" },
        { key: "participating_users", title: "参与用户" },
      ],
      bgColor:
        "bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/20",
    },
    互动数据: {
      icon: <MessageSquare className="w-5 h-5 text-purple-500" />,
      metrics: [
        { key: "likes", title: "点赞数据" },
        { key: "chat_messages", title: "消息数据" },
        { key: "chat_users", title: "聊天用户" },
        { key: "chat_channels", title: "聊天频道" },
      ],
      bgColor:
        "bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/20",
    },
  };

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
        <CardHeader className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 dark:from-blue-500/80 dark:via-blue-400/80 dark:to-blue-300/80">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="space-y-1">
                <CardTitle className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                  {about.title} 社区数据实时报告
                </CardTitle>
                <p className="text-lg text-blue-100">{description}</p>
                <div className="flex items-center gap-2 text-blue-100/70 text-sm">
                  <span>数据来源:</span>
                  <a
                    href="https://linux.do/about.json"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-200 transition-colors underline decoration-dotted underline-offset-4"
                  >
                    linux.do/about.json
                  </a>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-2xl text-sm text-blue-50">
                当前时间: {new Date().toLocaleString("zh-CN")}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid gap-6">
            {Object.entries(metricGroups).map(
              ([groupName, { icon, metrics, bgColor }]) => (
                <div
                  key={groupName}
                  className={`rounded-2xl p-6 ${bgColor} backdrop-blur-sm transition-all duration-300 hover:shadow-lg`}
                >
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                    <div className="p-2 bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-sm">
                      {icon}
                    </div>
                    {groupName}
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
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
