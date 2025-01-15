import { About } from "@/components/About";
import { Header } from "@/components/Header";
import { Users } from "@/components/Users";
import { fetchAboutData } from "@/lib/api";
import { Moderators } from "@/components/Moderators";
import { Footer } from "@/components/Footer";
import { AboutData, User } from "@/types";

export default async function Home() {
  const data = (await fetchAboutData()) as AboutData;

  const moderators = [
    ...data.about.admin_ids.map((id: number) => {
      const user = data.users.find((u) => u.id === id);
      return { ...user, role: "管理员" } as User & { role: string };
    }),
    ...data.about.moderator_ids.map((id: number) => {
      const user = data.users.find((u) => u.id === id);
      return { ...user, role: "版主" } as User & { role: string };
    }),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900/90">
      <Header title={data.about.title} />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid gap-8 animate-fade-in">
          <About about={data.about} />
          <div
            className="grid gap-8 lg:grid-cols-2 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Users users={data.users} />
            <Moderators moderators={moderators} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
