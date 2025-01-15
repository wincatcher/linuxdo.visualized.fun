import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

type AboutProps = {
  about: {
    description: string;
    extended_site_description: string;
    stats: {
      [key: string]: number;
    };
  };
};

export function About({ about }: AboutProps) {
  const { description, extended_site_description, stats } = about;

  const formatNumber = (num: number) => new Intl.NumberFormat('zh-CN').format(num);

  return (
    <Card>
      <CardHeader>
        <CardTitle>关于我们</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4" dangerouslySetInnerHTML={{ __html: extended_site_description }} />
        <Tabs defaultValue="day" className="w-full">
          <TabsList>
            <TabsTrigger value="day">过去24小时</TabsTrigger>
            <TabsTrigger value="week">过去7天</TabsTrigger>
            <TabsTrigger value="month">过去30天</TabsTrigger>
          </TabsList>
          <TabsContent value="day" className="space-y-4">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {Object.entries(stats)
                .filter(([key]) => key.endsWith('_last_day'))
                .map(([key, value]) => (
                  <Card key={key}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {key.split('_').slice(0, -2).join(' ')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{formatNumber(value)}</div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

