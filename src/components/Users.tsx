import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

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
  return (
    <Card>
      <CardHeader>
        <CardTitle>活跃用户</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.slice(0, 5).map((user) => (
            <div key={user.id} className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={user.animated_avatar || user.avatar_template.replace('{size}', '90')} />
                <AvatarFallback>{user.name.charAt(0) || user.username.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">{user.name || user.username}</p>
                <p className="text-sm text-muted-foreground">{user.title}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

