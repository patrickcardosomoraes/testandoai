// pages/blog/index.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';

export default function Blog({ posts }) {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#2F6BB0] px-4 pb-12">
      <Head>
        <title>Blog | TestandoAI</title>
        <meta name="description" content="Artigos sobre mentalidade, saúde mental, física e dicas para uma vida melhor." />
      </Head>

      {/* MENU */}
      <nav className="w-full bg-white shadow-sm px-4 py-3 flex justify-between items-center sticky top-0 z-50">
        <Link href="/">
          <Image src="/logo_testandoai.png" alt="Logo TestandoAI" width={160} height={50} />
        </Link>
        <div className="flex items-center gap-4 text-sm text-[#2F6BB0] font-medium">
          <Link href="/">Início</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/teste/mbti">Teste MBTI</Link>
        </div>
      </nav>

      {/* CABEÇALHO */}
      <header className="text-center py-10">
        <h1 className="text-3xl font-bold">Nosso Blog</h1>
        <p className="text-gray-600 mt-2">Descubra conteúdos valiosos sobre mente, corpo e bem-estar.</p>
      </header>

      {/* POSTS */}
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {posts.map(({ slug, frontmatter }) => (
          <Link key={slug} href={`/blog/${slug}`} className="bg-white rounded-xl shadow hover:shadow-lg transition p-5">
            <article>
              {frontmatter.image && (
                <div className="mb-4 rounded overflow-hidden">
                  <Image
                    src={frontmatter.image}
                    alt={frontmatter.title}
                    width={400}
                    height={250}
                    className="rounded-xl object-cover"
                  />
                </div>
              )}
              <h2 className="text-xl font-semibold mb-2 text-[#2F6BB0]">{frontmatter.title}</h2>
              <p className="text-gray-600 text-sm line-clamp-3">{frontmatter.excerpt}</p>
              <p className="text-sm text-gray-400 mt-2">Publicado em {frontmatter.date}</p>
            </article>
          </Link>
        ))}
      </main>

      {/* RODAPÉ */}
      <footer className="mt-12 pt-8 text-center border-t text-sm text-gray-600">
        <p>
          © {new Date().getFullYear()} TestandoAI. Todos os direitos reservados.<br />
          <Link href="/politica-de-privacidade" className="underline hover:text-[#2F6BB0]">Política de Privacidade</Link> ·{' '}
          <Link href="/termos-de-uso" className="underline hover:text-[#2F6BB0]">Termos de Uso</Link> ·{' '}
          <Link href="/politica-de-cookies" className="underline hover:text-[#2F6BB0]">Política de Cookies</Link> ·{' '}
          <Link href="mailto:contato@testandoai.com.br" className="underline hover:text-[#2F6BB0]">contato@testandoai.com.br</Link>
        </p>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join('posts'));

  const posts = files.map((filename) => {
    const slug = filename.replace('.md', '');
    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8');
    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts,
    },
  };
}