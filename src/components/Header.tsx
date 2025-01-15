'use client'

import { MoonIcon, SunIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'

export function Header({ title }: { title: string }) {
  const { theme, setTheme } = useTheme()

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title} 社区</h1>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">切换主题</span>
        </Button>
      </div>
    </header>
  )
}

