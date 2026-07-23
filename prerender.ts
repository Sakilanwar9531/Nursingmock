import fs from "fs";
import path from "path";
import { getSeoMetadata, getPreRenderedContent } from "./src/seoData";

const routes = [
  "/",
  "/exam/aiims-norcet",
  "/exam/wbhrb-staff-nurse",
  "/exam/rrb-staff-nurse",
  "/exam/esic-nursing-officer",
  "/exam/dsssb-staff-nurse",
  "/exam/rrb-pharmacist",
  "/exam/ot-technician",
  "/pyq",
  "/mock-tests",
  "/subject-mocks",
  "/short-sprints",
  "/find-test",
  "/updates",
  "/analytics",
  "/about",
  "/contact",
  "/updates/update-1-norcet",
  "/updates/update-notes-abg",
  "/updates/update-2-esic",
  "/updates/update-notes-preload",
  "/updates/update-3-streak",
  "/updates/update-4-rrb",
  // High-Yield deep test routes
  "/test/anatomy/cell_tissue",
  "/test/anatomy/skeletal_muscular",
  "/test/anatomy/nervous_sensory",
  "/test/anatomy/nervous-system-1",
  "/test/anatomy/nervous-system-2",
  "/test/anatomy/nervous-system-3",
  "/test/anatomy/blood-mock-1",
  "/test/anatomy/blood-mock-2",
  "/test/anatomy/blood-mock-3",
  "/test/anatomy/blood-mock-4",
  "/test/anatomy/blood-mock-5",
  "/test/virtual/sprint-anatomy"
];

function prerender() {
  const distPath = path.join(process.cwd(), "dist");
  const templatePath = path.join(distPath, "index.html");

  if (!fs.existsSync(templatePath)) {
    console.error(`Error: Base template ${templatePath} does not exist. Please run 'vite build' first.`);
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(templatePath, "utf8");
  console.log(`🚀 NCBT Pre-Rendering Engine started using base template...`);

  for (const route of routes) {
    const meta = getSeoMetadata(route);
    const bodyContent = getPreRenderedContent(route);

    let html = baseHtml;

    // 1. Replace Title
    html = html.replace(
      /<title>.*?<\/title>/i,
      `<title>${meta.title}</title>`
    );

    // 2. Form head tags
    const headTags = [
      `<meta name="description" content="${meta.description}" />`,
      `<link rel="canonical" href="https://ncbt.in${route}" />`,
      `<meta property="og:title" content="${meta.title}" />`,
      `<meta property="og:description" content="${meta.description}" />`,
      `<meta property="og:type" content="website" />`,
      `<meta property="og:site_name" content="NCBT.in" />`,
      `<meta name="twitter:card" content="summary" />`,
      `<meta name="twitter:title" content="${meta.title}" />`,
      `<meta name="twitter:description" content="${meta.description}" />`
    ];

    if (meta.jsonLd) {
      headTags.push(`<script type="application/ld+json">${meta.jsonLd}</script>`);
    }

    const tagsString = headTags.join("\n    ");
    html = html.replace("</head>", `  ${tagsString}\n  </head>`);

    // 3. Inject pre-rendered body content into noscript tag for SEO crawlers without visually polluting #root
    html = html.replace('<div id="root"></div>', `<div id="root"></div>\n  <noscript>${bodyContent}</noscript>`);

    // 4. Save file
    if (route === "/") {
      fs.writeFileSync(templatePath, html, "utf8");
      console.log(`✅ Pre-rendered landing page: '/' (index.html)`);
    } else {
      const pageDir = path.join(distPath, route.slice(1));
      fs.mkdirSync(pageDir, { recursive: true });
      fs.writeFileSync(path.join(pageDir, "index.html"), html, "utf8");
      console.log(`✅ Pre-rendered page: '${route}' -> dist${route}/index.html`);
    }
  }

  // 5. Generate and sync sitemap.xml dynamically for all 35 routes
  const today = new Date().toISOString().split("T")[0];
  const urlNodes = routes.map((route) => {
    const priority = route === "/" ? "1.0" : route.startsWith("/exam/") || route === "/updates" || route === "/pyq" || route === "/mock-tests" ? "0.9" : "0.8";
    const freq = route === "/" || route.startsWith("/exam/") || route === "/updates" ? "daily" : "weekly";
    return `  <url>
    <loc>https://ncbt.in${route === "/" ? "" : route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join("\n");

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlNodes}
</urlset>`;

  fs.writeFileSync(path.join(distPath, "sitemap.xml"), sitemapXml, "utf8");
  fs.writeFileSync(path.join(process.cwd(), "public", "sitemap.xml"), sitemapXml, "utf8");
  fs.writeFileSync(path.join(process.cwd(), "sitemap.xml"), sitemapXml, "utf8");
  console.log(`📡 Automatically updated sitemap.xml in dist/, public/, and root with all ${routes.length} pages!`);

  console.log(`\n🎉 Pre-rendering complete! Static site generated with ${routes.length} physical HTML pages.`);
}

prerender();
