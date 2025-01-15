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
    name?: string;
    avatar_template: string;
    title?: string;
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
    <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-0 rounded-3xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-green-500 via-green-400 to-emerald-400 dark:from-green-600 dark:to-emerald-500 text-white p-8">
        <CardTitle className="text-2xl flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-2xl">
            <UsersIcon className="w-6 h-6" />
          </div>
          活跃用户
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <div className="grid grid-cols-2 gap-6">
          {users.slice(0, 10).map((user) => (
            <TooltipProvider key={user.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={`https://linux.do/u/${user.username}/`}
                    target="_blank"
                    className="block"
                  >
                    <div className="group relative bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1">
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <div className="relative mb-4">
                          <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur-lg opacity-20 group-hover:opacity-30 transition-opacity" />
                          <Avatar className="w-20 h-20 ring-4 ring-white dark:ring-gray-800 ring-offset-2 ring-offset-gray-50 dark:ring-offset-gray-900">
                            <AvatarImage
                              src={getAvatarUrl(user.avatar_template)}
                            />
                            <AvatarFallback className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xl">
                              {(user.name || user.username).charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-medium text-lg truncate max-w-[180px]">
                            {user.name || user.username}
                          </h3>
                          <p className="text-sm text-muted-foreground truncate max-w-[180px]">
                            {user.title}
                          </p>
                          <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1">
                            <Clock className="w-3 h-3" />
                            <span>{formatDate(user.last_seen_at)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="top" className="rounded-xl">
                  <div className="space-y-1.5 p-1">
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
