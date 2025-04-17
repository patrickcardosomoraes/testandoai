// 📁 /pages/blog/page/[page].js

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '@/components/Layout';
import FormularioEmail from '@/components/FormularioEmail';

const POSTS_PER_PAGE = 6;

export default function BlogPage({ posts, currentPage, totalPages }) {
  return (
    <>
      <Head>
        <title>Página {currentPage} | Blog TestandoAI</title>
        <meta name="description" content="Blog com artigos sobre mentalidade, psicologia e produtividade." />
      </Head>

      <Layout>
        <div className="px-4 pb-12">
          <header className="text-center py-10">
            <h1 className="text-3xl font-bold">Nosso Blog</h1>
            <p className="text-gray-600 mt-2">Explore ideias sobre mente, produtividade e alta performance.</p>
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
                  <h2 className="text-xl font-semibold mb-2 text-[#2F6BB0]">{frontmatter.title}</h2>
                  <p className="text-gray-600 text-sm line-clamp-3">{frontmatter.excerpt}</p>
                  <p className="text-sm text-gray-400 mt-2">Publicado em {frontmatter.date}</p>
                </article>
              </Link>
            ))}
          </main>

          {/* PAGINAÇÃO */}
          <div className="flex justify-center items-center mt-10 gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <Link
                key={i + 1}
                href={`/blog/page/${i + 1}`}
                className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-[#2F6BB0] text-white' : 'bg-white text-[#2F6BB0]'}`}
              >
                {i + 1}
              </Link>
            ))}
          </div>

          {/* FORMULÁRIO DE CAPTURA INTEGRADO COM O SUPABASE (origem: blog-list) */}
          <FormularioEmail tag="blog-list" />
        </div>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('content', 'posts'));
  const totalPages = Math.ceil(files.length / POSTS_PER_PAGE);

  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const page = parseInt(params.page || '1', 10);
  const files = fs.readdirSync(path.join('content', 'posts'));

  const posts = files.map((filename) => {
    const slug = filename.replace('.md', '');
    const markdownWithMeta = fs.readFileSync(path.join('content', 'posts', filename), 'utf-8');
    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  const sortedPosts = posts.sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));

  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  return {
    props: {
      posts: sortedPosts.slice(start, end),
      currentPage: page,
      totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
    },
  };
}
