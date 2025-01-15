import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-200/50 dark:border-gray-700/50 py-6 mt-auto backdrop-blur-md bg-white/30 dark:bg-gray-900/30">
      <div className="container mx-auto flex flex-col items-center gap-6 px-4">
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <p>本站非 Linux.do 官方网站，仅为展示数据之用。访问官网请至 <a href="https://linux.do" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">linux.do</a></p>
        </div>
        <div className="text-center">
          <p className="text-sm flex flex-wrap items-center justify-center gap-1 text-gray-500 dark:text-gray-400">
            <span>
              Copyright © {new Date().getFullYear()} - All right reserved by
            </span>
            <a
              href="https://bento.me/wincatcher/"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              风巢森淼
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
