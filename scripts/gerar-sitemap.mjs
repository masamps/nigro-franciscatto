/**
 * Gera dist/sitemap.xml no fim do build, com as páginas fixas do site e um
 * endereço por artigo, lido do Supabase.
 *
 * Roda pelo "postbuild". Se o banco não responder, gera só as páginas fixas
 * e avisa — o build nunca falha por causa do sitemap.
 *
 * Artigos publicados entre um deploy e outro entram no próximo build; até lá
 * o Google os encontra pelos links da página /artigos.
 */
import { readFileSync, writeFileSync } from "node:fs";

const SITE = "https://nigrofranciscatto.com.br";

const PAGINAS_FIXAS = [
  { caminho: "/", frequencia: "weekly", prioridade: "1.0" },
  { caminho: "/sobre", frequencia: "monthly", prioridade: "0.8" },
  { caminho: "/equipe", frequencia: "monthly", prioridade: "0.8" },
  { caminho: "/areas-atuacao", frequencia: "monthly", prioridade: "0.9" },
  { caminho: "/artigos", frequencia: "daily", prioridade: "0.9" },
  { caminho: "/depoimentos", frequencia: "monthly", prioridade: "0.7" },
  { caminho: "/contato", frequencia: "monthly", prioridade: "0.9" },
  { caminho: "/privacidade", frequencia: "yearly", prioridade: "0.3" },
];

// Mesma regra de src/lib/artigos.ts (gerarSlug). Se divergir, nada quebra:
// a página do artigo corrige o endereço para o certo.
const gerarSlug = (titulo) =>
  titulo
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "");

const lerEnv = () => {
  try {
    return Object.fromEntries(
      readFileSync(".env", "utf8")
        .split("\n")
        .map((linha) => linha.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/))
        .filter(Boolean)
        .map(([, chave, valor]) => [chave, valor.replace(/^["']|["']$/g, "")])
    );
  } catch {
    return {};
  }
};

const buscarArtigos = async () => {
  const env = { ...lerEnv(), ...process.env };
  const url = env.VITE_SUPABASE_URL;
  const chave = env.VITE_SUPABASE_ANON_KEY;
  if (!url || !chave) throw new Error("VITE_SUPABASE_URL/VITE_SUPABASE_ANON_KEY ausentes");

  const resposta = await fetch(`${url}/rest/v1/articles?select=id,title,date&order=date.desc`, {
    headers: { apikey: chave, Authorization: `Bearer ${chave}` },
  });
  if (!resposta.ok) throw new Error(`Supabase respondeu ${resposta.status}`);
  return resposta.json();
};

const entrada = (loc, extras) =>
  `  <url>\n    <loc>${loc}</loc>\n${extras.map((e) => `    ${e}`).join("\n")}\n  </url>`;

let artigos = [];
try {
  artigos = await buscarArtigos();
} catch (erro) {
  console.warn(`[sitemap] Sem artigos (${erro.message}). Gerando só as páginas fixas.`);
}

const urls = [
  ...PAGINAS_FIXAS.map((p) =>
    entrada(`${SITE}${p.caminho}`, [
      `<changefreq>${p.frequencia}</changefreq>`,
      `<priority>${p.prioridade}</priority>`,
    ])
  ),
  ...artigos.map((a) =>
    entrada(`${SITE}/artigos/${a.id}-${gerarSlug(a.title)}`, [
      `<lastmod>${String(a.date).split("T")[0]}</lastmod>`,
      `<priority>0.7</priority>`,
    ])
  ),
];

writeFileSync(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`
);

console.log(`[sitemap] ${PAGINAS_FIXAS.length} páginas + ${artigos.length} artigos → dist/sitemap.xml`);
