import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users as UsersIcon, Clock, ExternalLink } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

type UsersProps = {
  users: {
    id: number;
    username: string;
    name: string;
    avatar_template: string;
    title: string;
    last_seen_at: string;
    animated_avatar: string | null;
  }[];
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
    <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-0">
      <CardHeader className="bg-gradient-to-r from-green-600 to-green-400 dark:from-green-500 dark:to-green-300 text-white p-6">
        <CardTitle className="text-xl flex items-center gap-2">
          <UsersIcon className="w-5 h-5" />
          活跃用户
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-4">
          {users.slice(0, 10).map((user) => (
            <TooltipProvider key={user.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={`https://linux.do/u/${user.username}/`}
                    target="_blank"
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
                  >
                    <Avatar className="h-12 w-12 ring-2 ring-white/10">
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
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium truncate">
                          {user.name || user.username}
                        </p>
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {user.title}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(user.last_seen_at)}
                      </p>
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <div className="space-y-1">
                    <p className="font-medium">用户信息</p>
                    <p className="text-xs">ID: {user.id}</p>
                    <p className="text-xs">用户名: {user.username}</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
