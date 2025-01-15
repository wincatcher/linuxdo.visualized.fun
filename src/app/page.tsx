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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header title={data.about.title} />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <About about={data.about} />
        <Users users={data.users} />
        <Moderators moderators={moderators} />
      </main>
    </div>
  );
}
