import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Shield, ExternalLink } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

type ModeratorInfo = {
  id: number;
  username: string;
  name: string;
  avatar_template: string;
  title: string;
  role: string;
  categories?: string[];
};

type ModeratorsProps = {
  moderators: ModeratorInfo[];
};

export function Moderators({ moderators }: ModeratorsProps) {
  return (
    <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-0">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-400 dark:from-purple-500 dark:to-purple-300 text-white p-6">
        <CardTitle className="text-xl flex items-center gap-2">
          <Shield className="w-5 h-5" />
          管理团队
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-4">
          {moderators.map((mod) => (
            <TooltipProvider key={mod.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={`https://linux.do/u/${mod.username}/`}
                    target="_blank"
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
                  >
                    <Avatar className="h-12 w-12 ring-2 ring-white/10">
                      <AvatarImage
                        src={mod.avatar_template.replace("{size}", "90")}
                      />
                      <AvatarFallback>
                        {mod.name.charAt(0) || mod.username.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium truncate">
                          {mod.name || mod.username}
                        </p>
                        <Badge
                          variant={
                            mod.role === "管理员" ? "destructive" : "secondary"
                          }
                          className="shrink-0"
                        >
                          {mod.role}
                        </Badge>
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {mod.title}
                      </p>
                      {mod.categories && (
                        <div className="flex gap-1 mt-2 flex-wrap">
                          {mod.categories.map((cat) => (
                            <Badge
                              key={cat}
                              variant="outline"
                              className="text-xs bg-white/50 dark:bg-black/50"
                            >
                              {cat}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <div className="space-y-1">
                    <p className="font-medium">{mod.role}信息</p>
                    <p className="text-xs">ID: {mod.id}</p>
                    <p className="text-xs">用户名: {mod.username}</p>
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
