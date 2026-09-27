// Stable identifiers for the sitewide JSON-LD graph (LocalBusinessSchema.astro), so every page
// can reference the same organization and people instead of redefining them.
export const SITE = "https://albarizadigital.com";
export const ORG_ID = `${SITE}/#organization`;
export const WEBSITE_ID = `${SITE}/#website`;
export const PERSON_IDS = {
  pablo: `${SITE}/nosotros/#pablo-cumbrera`,
  miguel: `${SITE}/nosotros/#miguel-lopez`,
};

/** BreadcrumbList from [name, path] pairs; paths are site-relative with a trailing slash. */
export function breadcrumbs(items: [string, string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${SITE}${path}`,
    })),
  };
}
