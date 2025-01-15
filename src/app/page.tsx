import { About } from '@/components/About'
import { Categories } from '@/components/Categories'
import { Header } from '@/components/Header'
import { Users } from '@/components/Users'
import { fetchAboutData } from '@/lib/api'

export default async function Home() {
  const data = await fetchAboutData();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header title={data.about.title} />
      <main className="container mx-auto px-4 py-8">
        <About about={data.about} />
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <Users users={data.users} />
          <Categories categories={data.categories} />
        </div>
      </main>
    </div>
  )
}

