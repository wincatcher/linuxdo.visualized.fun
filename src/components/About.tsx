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
import { DataComparison } from "./DataComparison";
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

  const formatNumber = (num: number) =>
    new Intl.NumberFormat("zh-CN").format(num);

  const renderStatsForPeriod = (period: string) => {
    const statGroups = {
      内容数据: ["topics", "posts"],
      用户数据: ["users", "active_users", "participating_users"],
      互动数据: ["likes", "chat_messages", "chat_users", "chat_channels"],
    };

    return (
      <div className="space-y-6">
        {Object.entries(statGroups).map(([groupName, keys]) => (
          <div key={groupName}>
            <h3 className="text-lg font-semibold mb-4">{groupName}</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {keys.map((key) => {
                const value = stats[`${key}_${period}`];
                if (typeof value === "undefined") return null;
                return (
                  <Card key={key}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {key
                          .split("_")
                          .map(
                            (word) =>
                              ({
                                topics: "主题",
                                posts: "帖子",
                                users: "用户",
                                active: "活跃",
                                participating: "参与",
                                likes: "点赞",
                                chat: "聊天",
                                messages: "消息",
                                channels: "频道",
                              }[word] || word)
                          )
                          .join("")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {formatNumber(value)}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  };

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

          <Separator className="my-8" />

          <div className="space-y-8">
            <DataComparison
              stats={stats}
              period="last_day"
              title="24小时数据"
            />
            <DataComparison stats={stats} period="7_days" title="7天数据" />
            <DataComparison stats={stats} period="30_days" title="30天数据" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
