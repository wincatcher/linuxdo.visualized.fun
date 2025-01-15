import { About } from "@/components/About";
import { Categories } from "@/components/Categories";
import { Header } from "@/components/Header";
import { Users } from "@/components/Users";
import { fetchAboutData } from "@/lib/api";
import { Moderators } from "@/components/Moderators";

export default async function Home() {
  const data = await fetchAboutData();

  // 处理管理员和版主数据
  const moderators = [
    ...data.about.admin_ids.map((id) => {
      const user = data.users.find((u) => u.id === id);
      return { ...user, role: "管理员" };
    }),
    ...data.about.moderator_ids.map((id) => {
      const user = data.users.find((u) => u.id === id);
      return { ...user, role: "版主" };
    }),
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header title={data.about.title} />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <About about={data.about} />
        <div className="grid gap-8 md:grid-cols-2">
          <Users users={data.users} />
          <Categories categories={data.categories} />
        </div>
        <Moderators moderators={moderators} />
      </main>
    </div>
  );
}
