// pages/blog/index.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '@/components/Layout';
import FormularioEmail from '@/components/FormularioEmail';

const POSTS_PER_PAGE = 6;

export default function Blog({ posts, currentPage, totalPages }) {
  return (
    <>
      <Head>
        <title>Blog | TestandoAI</title>
        <meta name="description" content="Artigos sobre mentalidade, saúde mental, física e dicas para uma vida melhor." />
      </Head>

      <Layout>
        <div className="px-4 pb-12">
          <header className="text-center py-10">
            <h1 className="text-3xl font-bold">Nosso Blog</h1>
            <p className="text-gray-600 mt-2">Descubra conteúdos valiosos sobre mente, corpo e bem-estar.</p>
          </header>
          {/* FILTRO DE CATEGORIAS */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {['Todos', ...new Set(posts.flatMap(p => p.frontmatter.tags || []))].map((tag) => (
              <Link
                key={tag}
                href={tag === 'Todos' ? '/blog' : `/blog/tag/${tag.toLowerCase()}`}
                className="px-4 py-2 rounded-full border text-sm transition font-medium bg-white border-[#2CB49D] text-[#2CB49D] hover:bg-[#2CB49D]/10 hover:text-[#2CB49D]"
              >
                {tag}
              </Link>
            ))}
          </div>
 
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
                  <p className="text-xs font-semibold text-[#2CB49D] mb-1 uppercase">{frontmatter.tags?.[0]}</p>
                  <h2 className="text-xl font-semibold mb-2 text-[#2F6BB0]">{frontmatter.title}</h2>
                  <p className="text-gray-600 text-sm line-clamp-3">{frontmatter.excerpt}</p>
                  <p className="text-sm text-gray-400 mt-2">Publicado em {frontmatter.date}</p>
                </article>
              </Link>
            ))}
          </main>

          {/* PAGINAÇÃO */}
          <div className="flex justify-center items-center gap-4 mt-10">
            {currentPage > 1 && (
              <Link href={`/blog/page/${currentPage - 1}`} className="text-[#2F6BB0]">&larr; Anterior</Link>
            )}
            <span className="text-gray-600">Página {currentPage} de {totalPages}</span>
            {currentPage < totalPages && (
              <Link href={`/blog/page/${currentPage + 1}`} className="text-[#2F6BB0]">Próxima &rarr;</Link>
            )}
          </div>

          {/* COMPARTILHAMENTO */}
          <div className="mt-16 max-w-3xl mx-auto px-4 text-center">
            <h3 className="text-lg font-semibold mb-4 text-[#2F6BB0]">Compartilhe nosso blog</h3>
            <div className="flex justify-center gap-4 flex-wrap">
              <a
                href="https://wa.me/?text=https://testandoai.com.br/blog"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition"
                aria-label="Compartilhar no WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M16.002 2.7c-7.3 0-13.3 6-13.3 13.3 0 2.3.6 4.5 1.7 6.4L2 30l7.8-2c1.9 1 4.1 1.5 6.2 1.5 7.3 0 13.3-6 13.3-13.3S23.3 2.7 16 2.7zm0 23.9c-1.9 0-3.8-.5-5.5-1.4l-.4-.2-4.6 1.2 1.2-4.5-.2-.5c-1-1.7-1.5-3.5-1.5-5.4 0-5.9 4.8-10.7 10.7-10.7S26.7 9.3 26.7 15.2 21.9 26.6 16 26.6zm6.2-8c-.3-.2-1.9-1-2.2-1.1-.3-.1-.5-.2-.7.2s-.8 1.1-1 1.3c-.2.2-.3.3-.6.1s-1.1-.4-2-1.1c-.7-.6-1.1-1.3-1.3-1.5s0-.3.1-.4c.1-.1.3-.3.4-.5s.2-.3.3-.5c.1-.2.1-.3 0-.5s-.7-1.7-1-2.3c-.3-.5-.5-.5-.7-.5h-.5c-.2 0-.5.1-.7.3s-1 1-1 2.3 1 2.6 1.1 2.8c.2.2 2.1 3.2 5.1 4.4.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.3.2-1.4-.1-.1-.2-.2-.4-.3z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/sharer/sharer.php?u=https://testandoai.com.br/blog"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition"
                aria-label="Compartilhar no Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.676 0H1.325C.593 0 0 .593 0 1.325v21.352C0 23.407.593 24 1.325 24h11.483v-9.294H9.692V11.14h3.116V8.412c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.796.143v3.24l-1.918.001c-1.504 0-1.796.716-1.796 1.765v2.313h3.587l-.467 3.566h-3.12V24h6.116C23.407 24 24 23.407 24 22.676V1.325C24 .593 23.407 0 22.676 0z" />
                </svg>
              </a>
              <a
                href="https://twitter.com/intent/tweet?text=Confira%20os%20posts%20do%20blog%20TestandoAI&url=https://testandoai.com.br/blog"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-400 hover:bg-blue-500 text-white p-3 rounded-full shadow-lg transition"
                aria-label="Compartilhar no X (Twitter)"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775a4.932 4.932 0 002.165-2.723 9.85 9.85 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482c-4.09-.195-7.719-2.165-10.148-5.144A4.822 4.822 0 001.64 6.44c0 1.708.87 3.216 2.188 4.099a4.902 4.902 0 01-2.229-.616v.06a4.924 4.924 0 003.946 4.827 4.996 4.996 0 01-2.224.084 4.937 4.937 0 004.604 3.417A9.867 9.867 0 010 21.543 13.94 13.94 0 007.548 24c9.057 0 14.009-7.514 14.009-14.009 0-.213-.004-.426-.014-.637A9.936 9.936 0 0024 4.557z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/sharing/share-offsite/?url=https://testandoai.com.br/blog"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0077B5] hover:bg-[#005983] text-white p-3 rounded-full shadow-lg transition"
                aria-label="Compartilhar no LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.452 20.452H17.26v-5.569c0-1.328-.025-3.037-1.853-3.037-1.855 0-2.14 1.447-2.14 2.942v5.664H9.072V9h3.06v1.561h.043c.426-.806 1.465-1.653 3.017-1.653 3.226 0 3.819 2.122 3.819 4.881v6.663zM5.337 7.433c-.985 0-1.782-.797-1.782-1.782 0-.983.797-1.781 1.782-1.781.982 0 1.78.798 1.78 1.781 0 .985-.798 1.782-1.78 1.782zm1.603 13.019H3.733V9h3.207v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
              </a>
            </div>
          </div>

          {/* FORMULÁRIO DE CAPTURA */}
          <FormularioEmail tag="blog-list" />
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join('content', 'posts'));
  const posts = files.map(filename => {
    const slug = filename.replace('.md', '');
    const markdownWithMeta = fs.readFileSync(path.join('content', 'posts', filename), 'utf-8');
    const { data: frontmatter } = matter(markdownWithMeta);
    return { slug, frontmatter };
  }).sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));

  const currentPage = 1;
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const paginatedPosts = posts.slice(0, POSTS_PER_PAGE);

  return {
    props: {
      posts: paginatedPosts,
      currentPage,
      totalPages,
    },
  };
}
