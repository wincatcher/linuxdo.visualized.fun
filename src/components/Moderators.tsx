import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

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
    <Card>
      <CardHeader>
        <CardTitle>管理团队</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {moderators.map((mod) => (
            <div key={mod.id} className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage
                  src={mod.avatar_template.replace("{size}", "90")}
                />
                <AvatarFallback>
                  {mod.name.charAt(0) || mod.username.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {mod.name || mod.username}
                </p>
                <p className="text-sm text-muted-foreground">{mod.title}</p>
              </div>
              <Badge variant="secondary">{mod.role}</Badge>
              {mod.categories && (
                <div className="flex gap-1">
                  {mod.categories.map((cat) => (
                    <Badge key={cat} variant="outline" className="text-xs">
                      {cat}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
