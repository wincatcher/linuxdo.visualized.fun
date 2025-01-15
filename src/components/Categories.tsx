import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Category = {
  id: number;
  name: string;
  slug: string;
  color: string;
  text_color: string;
  read_restricted: boolean;
  parent_category_id: number | null;
};

type CategoriesProps = {
  categories: Category[];
};

export function Categories({ categories }: CategoriesProps) {
  const mainCategories = categories.filter(
    (category) => !category.parent_category_id
  );

  const getSubCategories = (parentId: number) => {
    return categories.filter(
      (category) => category.parent_category_id === parentId
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>分类</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mainCategories.map((category) => (
            <div key={category.id} className="space-y-2">
              <Badge
                variant="outline"
                style={{
                  backgroundColor: `#${category.color}`,
                  color: `#${category.text_color}`,
                }}
                className="justify-center py-2 text-sm font-medium"
              >
                {category.name}
              </Badge>
              <div className="ml-4 grid grid-cols-2 gap-2">
                {getSubCategories(category.id).map((subCategory) => (
                  <Badge
                    key={subCategory.id}
                    variant="outline"
                    style={{
                      backgroundColor: `#${subCategory.color}`,
                      color: `#${subCategory.text_color}`,
                    }}
                    className="justify-center py-1 text-xs font-medium"
                  >
                    {subCategory.name}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
