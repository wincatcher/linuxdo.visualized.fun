import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatsChart } from "./StatsChart";
import { UserActivityPie } from "./UserActivityPie";
import { Separator } from "@/components/ui/separator";
import { MetricTrend } from "./MetricTrend";
import { MetricCard } from "./MetricCard";

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

  const metrics = [
    { key: "topics", title: "主题数据" },
    { key: "posts", title: "帖子数据" },
    { key: "users", title: "用户数据" },
    { key: "active_users", title: "活跃用户" },
    { key: "participating_users", title: "参与用户" },
    { key: "likes", title: "点赞数据" },
    { key: "chat_messages", title: "消息数据" },
    { key: "chat_users", title: "聊天用户" },
    { key: "chat_channels", title: "聊天频道" },
  ];

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl">
                {about.title} 社区数据报告
              </CardTitle>
              <CardDescription className="mt-2">{description}</CardDescription>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <div>
                社区创建于:{" "}
                {new Date(about.site_creation_date).toLocaleDateString("zh-CN")}
              </div>
              <div>当前版本: {about.version}</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div
            className="prose dark:prose-invert max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: extended_site_description }}
          />
          <Separator className="my-8" />

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">用户活跃度分布</h3>
            <UserActivityPie stats={stats} />
          </div>

          <Separator className="my-8" />

          <div className="grid gap-6 md:grid-cols-2">
            {metrics.map((metric) => (
              <MetricCard
                key={metric.key}
                stats={stats}
                metricKey={metric.key}
                title={metric.title}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
