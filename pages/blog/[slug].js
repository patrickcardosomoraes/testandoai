// pages/blog/[slug].js

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Head from 'next/head';
import Link from 'next/link';

export default function BlogPost({ frontmatter, content }) {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#2F6BB0] flex flex-col">
      {/* SEO */}
      <Head>
        <title>{frontmatter.title} | TestandoAI</title>
        <meta name="description" content={frontmatter.excerpt || 'Conteúdo do blog TestandoAI'} />
      </Head>

      {/* Cabeçalho */}
      <header className="w-full px-6 py-4 bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link href="/">
            <img src="/logo_testandoai.png" alt="Logo TestandoAI" className="h-10" />
          </Link>
          <nav className="space-x-4 text-sm">
            <Link href="/" className="hover:underline">Início</Link>
            <Link href="/blog" className="hover:underline">Blog</Link>
            <Link href="/politica-de-privacidade" className="hover:underline">Privacidade</Link>
          </nav>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="flex-1 max-w-3xl mx-auto px-6 py-12 text-[#2F6BB0]">
      <article className="prose lg:prose-lg prose-blue max-w-none">
  {frontmatter.image && (
    <img
      src={frontmatter.image}
      alt={frontmatter.title}
      className="w-full rounded-xl mb-6"
    />
  )}

  <h1 className="text-3xl font-bold">{frontmatter.title}</h1>

  <p className="text-gray-500 text-sm mb-6">{frontmatter.date}</p>

  <div dangerouslySetInnerHTML={{ __html: content }} />
</article>

        <div className="mt-12">
          <Link href="/blog" className="text-sm underline text-[#2F6BB0] hover:text-[#1d4c8c]">
            ← Voltar para o blog
          </Link>
        </div>
      </main>

      {/* Rodapé */}
      <footer className="w-full border-t mt-8 pt-4 pb-6 px-4 bg-white text-center text-sm text-gray-600">
        <p className="mb-2">© {new Date().getFullYear()} TestandoAI. Todos os direitos reservados.</p>
        <p className="mb-1">
          <Link href="/politica-de-privacidade" className="underline hover:text-[#2F6BB0]">Política de Privacidade</Link> ·{' '}
          <Link href="/termos-de-uso" className="underline hover:text-[#2F6BB0]">Termos de Uso</Link> ·{' '}
          <Link href="/politica-de-cookies" className="underline hover:text-[#2F6BB0]">Política de Cookies</Link> ·{' '}
          <Link href="mailto:contato@testandoai.com.br" className="underline hover:text-[#2F6BB0]">contato@testandoai.com.br</Link>
        </p>
      </footer>
    </div>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'));

  const paths = files.map(filename => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(path.join('posts', slug + '.md'), 'utf-8');
  const { data: frontmatter, content: markdownContent } = matter(markdownWithMeta);
  const processedContent = await remark().use(html).process(markdownContent);
  const content = processedContent.toString();

  return {
    props: {
      frontmatter,
      content,
    },
  };
}