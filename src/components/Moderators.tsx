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
  const getAvatarUrl = (template: string) => {
    if (template.startsWith("http")) {
      return template.replace("{size}", "144");
    }
    return `https://linux.do${template.replace("{size}", "144")}`;
  };

  return (
    <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-0">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-400 dark:from-purple-500 dark:to-purple-300 text-white p-6">
        <CardTitle className="text-xl flex items-center gap-2">
          <Shield className="w-5 h-5" />
          管理团队
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {moderators.map((mod) => (
            <TooltipProvider key={mod.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={`https://linux.do/u/${mod.username}/`}
                    target="_blank"
                    className="block"
                  >
                    <div className="group relative bg-white dark:bg-gray-800 rounded-xl p-4 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <Avatar className="w-16 h-16 mb-3 ring-2 ring-offset-2 ring-purple-500/20">
                          <AvatarImage
                            src={getAvatarUrl(mod.avatar_template)}
                          />
                          <AvatarFallback>
                            {mod.name.charAt(0) || mod.username.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                          <h3 className="font-medium truncate max-w-[150px]">
                            {mod.name || mod.username}
                          </h3>
                          <Badge
                            variant={
                              mod.role === "管理员"
                                ? "destructive"
                                : "secondary"
                            }
                            className="font-normal"
                          >
                            {mod.role}
                          </Badge>
                          <p className="text-sm text-muted-foreground truncate max-w-[150px]">
                            {mod.title}
                          </p>
                          {mod.categories && (
                            <div className="flex flex-wrap justify-center gap-1 mt-2">
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
                      </div>
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="top">
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
