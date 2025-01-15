export async function fetchAboutData() {
    const res = await fetch('https://linux.do/about.json', { next: { revalidate: 3600 } });
    if (!res.ok) {
      throw new Error('获取数据失败');
    }
    return res.json();
  }
  
  