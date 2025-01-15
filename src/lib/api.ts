export async function fetchAboutData() {
  const res = await fetch("https://linux.do/about.json", {
    next: {
      revalidate: 900, // 15 minutes in seconds
    },
  });
  if (!res.ok) {
    throw new Error("获取数据失败");
  }
  return res.json();
}
