// Tells Bing (and every engine in IndexNow: Yandex, Seznam, Naver…) which pages changed, so they
// recrawl them in hours instead of weeks. Bing feeds Copilot, ChatGPT search and other AI engines.
//
//   node scripts/indexnow.mjs                 → every URL in the live sitemap
//   node scripts/indexnow.mjs /blog/slug/ /   → only those paths
//
// Run it after a deploy that adds or changes pages (e.g. a new blog post).
// The key file lives at public/<KEY>.txt and must stay published.

const SITE = "https://albarizadigital.com";
const KEY = "92de8ebb72c9d2d6aa7760e843c89108";

async function urlsFromSitemap() {
  const locs = async (url) => [...(await (await fetch(url)).text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const index = await locs(`${SITE}/sitemap-index.xml`);
  return (await Promise.all(index.map(locs))).flat();
}

const args = process.argv.slice(2);
const urlList = args.length ? args.map((p) => new URL(p, SITE).href) : await urlsFromSitemap();
if (!urlList.length) throw new Error("No URLs to send.");

const keyCheck = await fetch(`${SITE}/${KEY}.txt`);
if (!keyCheck.ok || (await keyCheck.text()).trim() !== KEY) throw new Error(`Key file not live at ${SITE}/${KEY}.txt — deploy first.`);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} — ${urlList.length} URL(s)`);
if (![200, 202].includes(res.status)) {
  console.log(await res.text());
  process.exit(1);
}
