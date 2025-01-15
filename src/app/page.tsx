import { About } from "@/components/About";
import { Header } from "@/components/Header";
import { Users } from "@/components/Users";
import { fetchAboutData } from "@/lib/api";
import { Moderators } from "@/components/Moderators";

export default async function Home() {
  const data = await fetchAboutData();

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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Header title={data.about.title} />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid gap-8">
          <About about={data.about} />
          <div className="grid gap-8 lg:grid-cols-2">
            <Users users={data.users} />
            <Moderators moderators={moderators} />
          </div>
        </div>
      </main>
    </div>
  );
}
