/**
 * Endereço próprio de cada artigo: "/artigos/32-clausula-de-exclusao-nao-vale".
 *
 * O número na frente é o que identifica o artigo; o texto depois existe para
 * o Google e para quem lê o link. Se o título mudar, o número continua
 * achando o artigo e a página corrige o endereço para o novo.
 */

export const gerarSlug = (titulo: string) =>
  titulo
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")  // tira acentos
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "");

export const caminhoDoArtigo = (artigo: { id?: number; title: string }) =>
  `/artigos/${artigo.id}-${gerarSlug(artigo.title)}`;

/** "32-clausula-de-exclusao" → 32 */
export const idDoEndereco = (parametro?: string) => {
  const id = Number.parseInt(parametro ?? "", 10);
  return Number.isFinite(id) && id > 0 ? id : null;
};
