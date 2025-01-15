import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Linux.do 社区数据统计分析 | 技术社区开源实时数据可视化平台 | 社区运营数据监控",
  description:
    "Linux.do 社区数据实时可视化分析平台，提供主题、帖子、用户活跃度、互动数据等多维度统计分析。支持24小时、7天、30天等多个时间维度的数据追踪，实时展示社区活跃度、用户参与度、内容增长等关键指标，助力社区运营决策。",
  keywords:
    "Linux.do,社区数据分析,用户活跃度,社区运营,数据可视化,开源社区,社区监控,实时统计,社区增长,用户行为分析,社区互动,数据报告,开源项目,技术社区",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://linuxdo.visualized.fun/" />
        <script
          defer
          src="https://analytics.freeurl.top/script.js"
          data-website-id="95d34e05-0d9c-478b-ba65-5d865e23a9cb"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <GoogleAnalytics gaId="G-KQFZ0PZ2H4" />
      </body>
    </html>
  );
}
