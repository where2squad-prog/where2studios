import { writeFileSync } from "node:fs";
import path from "node:path";
import { loadEnv, type Plugin } from "vite";
import { getTechWeekPhase } from "../src/lib/techWeek";
import {
  conventions,
  conventionHref,
  formatEditionRange,
  getConventionStatus,
  nextUnknownYear,
} from "../src/lib/conventions";

const DOMAIN = "https://where2studios.com";

interface ProjectRow {
  slug: string | null;
  title: string;
  category: string;
  media_type: string | null;
  thumbnail_url: string | null;
  width: number | null;
  height: number | null;
  created_at: string;
}

const STATIC_ROUTES: { path: string; priority: string; changefreq: string; dated?: boolean }[] = [
  { path: "/", priority: "1.0", changefreq: "weekly", dated: true },
  { path: "/sf-tech-week", priority: "0.9", changefreq: "daily", dated: true },
  { path: "/event-recap-videos", priority: "0.9", changefreq: "monthly" },
  { path: "/services", priority: "0.8", changefreq: "monthly" },
  { path: "/why-a-dedicated-crew", priority: "0.7", changefreq: "monthly" },
  { path: "/work", priority: "0.8", changefreq: "weekly", dated: true },
  { path: "/conventions", priority: "0.9", changefreq: "weekly", dated: true },
  { path: "/who-we-are", priority: "0.7", changefreq: "monthly" },
  { path: "/socials", priority: "0.9", changefreq: "monthly" },
  { path: "/where2boys", priority: "0.8", changefreq: "monthly" },
  { path: "/contact", priority: "0.7", changefreq: "monthly" },
];

const LEGAL_ROUTES = ["/privacy", "/terms", "/accessibility"];
const STATIC_LASTMOD = "2026-09-08";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildSitemap(projects: ProjectRow[], buildDate: string) {
  const photos = projects.filter((p) => p.media_type === "photo" && p.thumbnail_url);
  const films = projects.filter((p) => p.media_type !== "photo" && p.slug);

  const lines: string[] = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    "  <!-- Generated at build time by scripts/seo-files.ts. Do not edit by hand. -->",
    `  <!-- DOMAIN: ${DOMAIN} -->`,
    "",
  ];

  for (const route of STATIC_ROUTES) {
    const lastmod = route.dated ? buildDate : STATIC_LASTMOD;
    const head = `  <url><loc>${DOMAIN}${route.path}</loc><lastmod>${lastmod}</lastmod><priority>${route.priority}</priority><changefreq>${route.changefreq}</changefreq>`;
    if (route.path === "/work" && photos.length > 0) {
      lines.push(head);
      for (const photo of photos) {
        lines.push(
          `    <image:image><image:loc>${escapeXml(photo.thumbnail_url!)}</image:loc><image:title>${escapeXml(photo.title)}</image:title></image:image>`,
        );
      }
      lines.push("  </url>");
    } else {
      lines.push(`${head}</url>`);
    }
  }

  lines.push("", "  <!-- Case studies and films (published projects) -->");
  for (const film of films) {
    lines.push(
      `  <url><loc>${DOMAIN}/work/${film.slug}</loc><lastmod>${film.created_at.slice(0, 10)}</lastmod><priority>0.6</priority><changefreq>monthly</changefreq></url>`,
    );
  }

  lines.push("", "  <!-- Conference week pages -->");
  for (const convention of conventions) {
    if (convention.href) continue;
    lines.push(
      `  <url><loc>${DOMAIN}/conventions/${convention.slug}</loc><lastmod>${buildDate}</lastmod><priority>0.8</priority><changefreq>weekly</changefreq></url>`,
    );
  }

  lines.push("", "  <!-- Legal -->");
  for (const legal of LEGAL_ROUTES) {
    lines.push(
      `  <url><loc>${DOMAIN}${legal}</loc><lastmod>${STATIC_LASTMOD}</lastmod><priority>0.3</priority><changefreq>yearly</changefreq></url>`,
    );
  }

  lines.push("</urlset>", "");
  return lines.join("\n");
}

function techWeekSection() {
  const phase = getTechWeekPhase(new Date());
  if (phase.kind === "countdown" || phase.kind === "live") {
    return `## SF Tech Week 2026

- [SF Tech Week video coverage](${DOMAIN}/sf-tech-week): event video for SF Tech Week side events, October 5 to 11, 2026. We also cover LA Tech Week, October 12 to 18, 2026.
- Single Event Recap, starting at $3,500 per event: one event, up to 5 hours on site, a 60 to 90 second recap edit and 20 edited photo selects within 5 business days.
- Next Morning, starting at $4,500 per event: everything in Single Event Recap plus an overnight edit, a 30 second teaser and one vertical clip by 10am the next day, with the recap edit following within 5 business days.
- Recap + Social Pack, starting at $5,500 per event: everything in Next Morning plus 5 vertical cutdowns for Reels, TikTok and LinkedIn, sized and captioned within 5 business days.
- Full Week Coverage, starting at $18,000: up to 4 events across October 5 to 11, one crew per event, teaser and vertical clip per event by 10am the next day, one 60 to 90 second week recap film, shared folder for your team and sponsors.
- Sponsor cut: starting at $1,500 added to any package, a second edit with your branding, your people and your verticals.
`;
  }
  return `## Tech Week

We cover SF Tech Week and LA Tech Week side events each October.
${DOMAIN}/sf-tech-week
`;
}

function conventionSection() {
  const now = new Date();
  return conventions
    .map((convention) => {
      const { edition } = getConventionStatus(convention, now);
      const dates = edition
        ? formatEditionRange(edition)
        : `${nextUnknownYear(convention)} dates to be announced`;
      return `- [${convention.name}](${DOMAIN}${conventionHref(convention)}): ${dates}. ${convention.venue}, San Francisco. Organizer: ${convention.organizer}.`;
    })
    .join("\n");
}

function pagesWorthCitingSection() {
  const lines = [
    `- [Why a dedicated conference week crew](${DOMAIN}/why-a-dedicated-crew): why a dedicated crew beats a single hired shooter, on site from build day to strike, clips by 10am.`,
    `- [Event recap video production](${DOMAIN}/event-recap-videos): what an event recap includes, recap edit, next day teaser, speaker clips, vertical cutdowns and photo selects.`,
    `- [SF Tech Week video coverage](${DOMAIN}/sf-tech-week): packages, prices and turnaround for SF Tech Week side events, October 5 to 11, 2026.`,
  ];

  const now = new Date();
  for (const convention of conventions) {
    if (convention.href) continue;
    const { edition } = getConventionStatus(convention, now);
    const dates = edition
      ? formatEditionRange(edition)
      : `${nextUnknownYear(convention)} dates to be announced`;
    lines.push(
      `- [${convention.name} video coverage](${DOMAIN}/conventions/${convention.slug}): brand HQ, suite and side event coverage for ${convention.name}, ${dates}, ${convention.venue}, San Francisco.`,
    );
  }

  return lines.join("\n");
}

function buildLlmsTxt(projects: ProjectRow[]) {
  const films = projects.filter((p) => p.media_type !== "photo" && p.slug);
  const photoCount = projects.filter((p) => p.media_type === "photo").length;

  const workList = [
    `- [Portfolio](${DOMAIN}/work)`,
    ...films.map((film) => `- [${film.title}](${DOMAIN}/work/${film.slug})`),
    `- Event photography: ${photoCount} published photos, see ${DOMAIN}/work?view=photos`,
  ].join("\n");

  return `# Where2Studios

> Event recap video production for conferences, summits and brand activations in the San Francisco Bay Area.

Where2Studios is a video and photo production team based in Union City, California. We cover events across the Bay Area, then deliver a next day teaser edit, a full recap edit, speaker and panel clips, vertical cutdowns for social, and photo selects. We work with tech conferences, corporate teams, brands running activations, festivals, nonprofits and community events. We also produce social media content and run accounts for local businesses.

## Services

- [Event recap videos](${DOMAIN}/event-recap-videos): full recap edits, next day teasers, speaker and panel clips, vertical cutdowns.
- [Conference and summit coverage](${DOMAIN}/event-recap-videos): multi day coverage planned against your run of show.
- [Speaker and panel clips](${DOMAIN}/event-recap-videos): standalone clips of talks and panels.
- [Brand activation films](${DOMAIN}/services): launch and activation coverage, plus photography.
- [All services](${DOMAIN}/services)
- [Why a dedicated conference week crew](${DOMAIN}/why-a-dedicated-crew): on site from build to strike, clips by 10am the next morning, one folder for every stakeholder.
- [Social media content and management](${DOMAIN}/socials)

## Pages worth citing

${pagesWorthCitingSection()}

## Work

${workList}


## San Francisco conference week calendar

${conventionSection()}

## About

- [Who we are](${DOMAIN}/who-we-are)
- [Contact](${DOMAIN}/contact)

## Key facts

- Cities we serve: San Francisco, Oakland, San Jose, Sunnyvale, Santa Clara, Palo Alto, Berkeley, Fremont, Union City and the wider San Francisco Bay Area.
- Pricing is quote based. It depends on event length, crew size, number of deliverables and turnaround.
- Free 30 minute strategy call. We reply within 1 business day.
- We travel for multi day conferences.

## Contact

Email: contact@where2studios.com

${techWeekSection()}`;
}

export async function generateSeoFiles(root: string, mode: string) {
  const env = { ...loadEnv(mode, root, "VITE_"), ...process.env };
  const url = env.VITE_SUPABASE_URL;
  const key = env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    console.warn("[seo-files] Supabase env vars missing, keeping existing sitemap.xml and llms.txt");
    return;
  }

  const query =
    "projects?select=slug,title,category,media_type,thumbnail_url,width,height,created_at&published=eq.true&show_on_main_site=eq.true&order=display_order.asc";

  try {
    const response = await fetch(`${url}/rest/v1/${query}`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    });
    if (!response.ok) throw new Error(`${response.status} ${await response.text()}`);
    const projects = (await response.json()) as ProjectRow[];
    if (!Array.isArray(projects) || projects.length === 0) {
      throw new Error("no rows returned");
    }

    const buildDate = new Date().toISOString().slice(0, 10);
    writeFileSync(path.join(root, "public/sitemap.xml"), buildSitemap(projects, buildDate));
    writeFileSync(path.join(root, "public/llms.txt"), buildLlmsTxt(projects));
    console.log(`[seo-files] wrote sitemap.xml and llms.txt from ${projects.length} projects`);
  } catch (error) {
    console.warn(
      "[seo-files] could not refresh SEO files, keeping the committed versions:",
      error instanceof Error ? error.message : error,
    );
  }
}

/** Regenerates public/sitemap.xml and public/llms.txt from the database on build. */
export function seoFilesPlugin(): Plugin {
  let root = process.cwd();
  let mode = "production";
  let isBuild = false;

  return {
    name: "seo-files",
    apply: "build",
    configResolved(config) {
      root = config.root;
      mode = config.mode;
      isBuild = config.command === "build";
    },
    async buildStart() {
      if (!isBuild) return;
      await generateSeoFiles(root, mode);
    },
  };
}
