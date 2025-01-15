import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

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
  const mainCategories = categories.filter(category => category.parent_category_id === null)

  return (
    <Card>
      <CardHeader>
        <CardTitle>分类</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {mainCategories.map((category) => (
            <Badge
              key={category.id}
              variant="outline"
              style={{
                backgroundColor: `#${category.color}`,
                color: `#${category.text_color}`,
              }}
              className="justify-center py-2 text-sm font-medium"
            >
              {category.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

