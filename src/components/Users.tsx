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

  const getAvatarUrl = (template: string) => {
    if (template.startsWith("http")) {
      return template.replace("{size}", "144");
    }
    return `https://linux.do${template.replace("{size}", "144")}`;
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
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {users.slice(0, 10).map((user) => (
            <TooltipProvider key={user.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={`https://linux.do/u/${user.username}/`}
                    target="_blank"
                    className="block"
                  >
                    <div className="group relative bg-white dark:bg-gray-800 rounded-xl p-4 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <Avatar className="w-16 h-16 mb-3 ring-2 ring-offset-2 ring-green-500/20">
                          <AvatarImage
                            src={getAvatarUrl(user.avatar_template)}
                          />
                          <AvatarFallback>
                            {user.name.charAt(0) || user.username.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <h3 className="font-medium truncate max-w-[150px]">
                            {user.name || user.username}
                          </h3>
                          <p className="text-sm text-muted-foreground truncate max-w-[150px]">
                            {user.title}
                          </p>
                          <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>{formatDate(user.last_seen_at)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="top">
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
