import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Unlock } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type CategoryProps = {
  categories: {
    id: number;
    name: string;
    slug: string;
    color: string;
    text_color: string;
    read_restricted: boolean;
    parent_category_id: number | null;
  }[];
  category_moderators?: {
    category_id: number;
    moderator_ids: number[];
  }[];
  users?: {
    id: number;
    name: string;
    username: string;
    title: string;
    avatar_template: string;
  }[];
};

export function Categories({
  categories,
  category_moderators,
  users,
}: CategoryProps) {
  // 获取主分类
  const mainCategories = categories.filter((cat) => !cat.parent_category_id);

  // 获取子分类
  const getSubCategories = (parentId: number) =>
    categories.filter((cat) => cat.parent_category_id === parentId);

  // 获取分类的版主信息
  const getModerators = (categoryId: number) => {
    const moderatorInfo = category_moderators?.find(
      (cm) => cm.category_id === categoryId
    );
    if (!moderatorInfo || !users) return [];
    return moderatorInfo.moderator_ids
      .map((id) => users.find((user) => user.id === id))
      .filter((user) => user) as typeof users;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>分类导航</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {mainCategories.map((category) => (
            <div key={category.id}>
              <div
                className="flex items-center gap-2 mb-2"
                style={{
                  color: `#${category.text_color}`,
                  backgroundColor: `#${category.color}`,
                  padding: "0.5rem",
                  borderRadius: "0.375rem",
                }}
              >
                <span className="font-medium">{category.name}</span>
                {category.read_restricted ? (
                  <Lock className="w-4 h-4" />
                ) : (
                  <Unlock className="w-4 h-4" />
                )}
              </div>

              <div className="grid gap-2 pl-4">
                {getSubCategories(category.id).map((subCat) => {
                  const moderators = getModerators(subCat.id);

                  return (
                    <div
                      key={subCat.id}
                      className="flex items-center justify-between p-2 rounded-lg border"
                    >
                      <div className="flex items-center gap-2">
                        <span>{subCat.name}</span>
                        {subCat.read_restricted && (
                          <Lock className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>

                      {moderators.length > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            版主:
                          </span>
                          {moderators.map((mod) => (
                            <TooltipProvider key={mod.id}>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Badge variant="outline">
                                    {mod.name || mod.username}
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{mod.title}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
