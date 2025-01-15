import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type User = {
  id: number;
  username: string;
  name: string;
  avatar_template: string;
  title: string;
  last_seen_at: string;
  animated_avatar: string | null;
};

type UsersProps = {
  users: User[];
};

export function Users({ users }: UsersProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("zh-CN", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>活跃用户</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.slice(0, 10).map((user) => (
            <TooltipProvider key={user.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center space-x-4 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={
                          user.animated_avatar ||
                          user.avatar_template.replace("{size}", "90")
                        }
                      />
                      <AvatarFallback>
                        {user.name.charAt(0) || user.username.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.name || user.username}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {user.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        最后在线: {formatDate(user.last_seen_at)}
                      </p>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>用户ID: {user.id}</p>
                  <p>用户名: {user.username}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
