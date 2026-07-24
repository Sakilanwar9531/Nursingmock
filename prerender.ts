import fs from "fs";
import path from "path";
import { getAllAppRoutes, getSeoMetadata, getPreRenderedContent } from "./src/seoData";

function prerender() {
  const distPath = path.join(process.cwd(), "dist");
  const templatePath = path.join(distPath, "index.html");

  if (!fs.existsSync(templatePath)) {
    console.error(`Error: Base template ${templatePath} does not exist. Please run 'vite build' first.`);
    process.exit(1);
  }

  const rawTemplate = fs.readFileSync(templatePath, "utf8");
  const routes = getAllAppRoutes();
  console.log(`🚀 NCBT Pre-Rendering Engine started for ${routes.length} dynamic routes using base template...`);

  // FIX 3: Clean stale output subdirectories in dist/ before writing current routes
  const validFolderPaths = new Set<string>();
  validFolderPaths.add("assets");
  for (const route of routes) {
    if (route !== "/") {
      const rel = route.startsWith("/") ? route.slice(1) : route;
      validFolderPaths.add(rel);
      const parts = rel.split("/");
      for (let i = 1; i < parts.length; i++) {
        validFolderPaths.add(parts.slice(0, i).join("/"));
      }
    }
  }

  function cleanStaleDirs(currentDir: string, relPath = "") {
    if (!fs.existsSync(currentDir)) return;
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const itemRelPath = relPath ? `${relPath}/${entry.name}` : entry.name;
        if (itemRelPath === "assets" || itemRelPath.startsWith("assets/")) {
          continue;
        }
        const itemFullPath = path.join(currentDir, entry.name);
        if (!validFolderPaths.has(itemRelPath)) {
          console.log(`🧹 Removing stale output folder: dist/${itemRelPath}`);
          fs.rmSync(itemFullPath, { recursive: true, force: true });
        } else {
          cleanStaleDirs(itemFullPath, itemRelPath);
        }
      }
    }
  }

  cleanStaleDirs(distPath);

  // Strip initial template meta tags so each route receives crisp, un-duplicated meta tags
  let cleanBaseTemplate = rawTemplate;
  cleanBaseTemplate = cleanBaseTemplate.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, "");
  cleanBaseTemplate = cleanBaseTemplate.replace(/<meta name="description"[\s\S]*?\/>/gi, "");
  cleanBaseTemplate = cleanBaseTemplate.replace(/<link rel="canonical"[\s\S]*?\/>/gi, "");
  cleanBaseTemplate = cleanBaseTemplate.replace(/<meta property="og:.*?"[\s\S]*?\/>/gi, "");
  cleanBaseTemplate = cleanBaseTemplate.replace(/<meta name="twitter:.*?"[\s\S]*?\/>/gi, "");

  for (const route of routes) {
    const meta = getSeoMetadata(route);
    const bodyContent = getPreRenderedContent(route);

    let html = cleanBaseTemplate;

    // 1. Replace Title
    html = html.replace(
      /<title>.*?<\/title>/i,
      `<title>${meta.title}</title>`
    );

    const canonicalUrl = `https://ncbt.in${route === "/" ? "" : route}`;

    // 2. Form head tags
    const headTags = [
      meta.noIndex ? `<meta name="robots" content="noindex, nofollow" />` : `<meta name="robots" content="index, follow" />`,
      `<meta name="description" content="${meta.description}" />`,
      `<link rel="canonical" href="${canonicalUrl}" />`,
      `<meta property="og:title" content="${meta.title}" />`,
      `<meta property="og:description" content="${meta.description}" />`,
      `<meta property="og:url" content="${canonicalUrl}" />`,
      `<meta property="og:type" content="website" />`,
      `<meta property="og:site_name" content="NCBT.in" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${meta.title}" />`,
      `<meta name="twitter:description" content="${meta.description}" />`
    ];

    if (meta.jsonLd) {
      headTags.push(`<script type="application/ld+json">${meta.jsonLd}</script>`);
    }

    const tagsString = headTags.join("\n    ");
    html = html.replace("</head>", `  ${tagsString}\n  </head>`);

    // 3. Inject pre-rendered body content DIRECTLY INSIDE <div id="root"> so search engine crawlers see full static HTML content
    html = html.replace('<div id="root"></div>', `<div id="root">${bodyContent}</div>`);

    // 4. Save physical HTML file
    if (route === "/") {
      fs.writeFileSync(templatePath, html, "utf8");
      console.log(`✅ Pre-rendered landing page: '/' (index.html)`);
    } else {
      const pageDir = path.join(distPath, route.slice(1));
      fs.mkdirSync(pageDir, { recursive: true });
      fs.writeFileSync(path.join(pageDir, "index.html"), html, "utf8");
      console.log(`✅ Pre-rendered route: '${route}' -> dist${route}/index.html`);
    }
  }

  // 5. Explicitly generate pre-rendered physical dist/404.html for Vercel and static hosting
  const meta404 = getSeoMetadata("/404");
  const body404 = getPreRenderedContent("/404");
  let html404 = cleanBaseTemplate;
  html404 = html404.replace(/<title>.*?<\/title>/i, `<title>${meta404.title}</title>`);
  const head404 = [
    `<meta name="robots" content="noindex, nofollow" />`,
    `<meta name="description" content="${meta404.description}" />`,
    `<meta property="og:title" content="${meta404.title}" />`,
    `<meta property="og:description" content="${meta404.description}" />`
  ].join("\n    ");
  html404 = html404.replace("</head>", `  ${head404}\n  </head>`);
  html404 = html404.replace('<div id="root"></div>', `<div id="root">${body404}</div>`);
  fs.writeFileSync(path.join(distPath, "404.html"), html404, "utf8");
  console.log(`✅ Generated branded dist/404.html with noindex, nofollow`);

  // 5. Generate and sync sitemap.xml dynamically from single source of truth (getAllAppRoutes)
  const today = new Date().toISOString().split("T")[0];
  const urlNodes = routes.map((route) => {
    const priority = route === "/" ? "1.0" :
                     route.startsWith("/exams/") || route.startsWith("/nursing") || route === "/updates" ? "0.9" : "0.8";
    const freq = route === "/" || route.startsWith("/exams/") || route === "/updates" ? "daily" : "weekly";
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
  console.log(`📡 Automatically generated sitemap.xml in dist/, public/, and root with all ${routes.length} pages!`);

  console.log(`\n🎉 Pre-rendering complete! Static site generated with ${routes.length} physical HTML pages.`);
}

prerender();
