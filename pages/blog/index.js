import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '@/components/Layout';
import FormularioEmail from '@/components/FormularioEmail';

export default function Blog({ posts }) {
  return (
    <>
      <Head>
        <title>Blog | TestandoAI</title>
        <meta name="description" content="Artigos sobre mentalidade, saúde mental, física e dicas para uma vida melhor." />
      </Head>

      <Layout>
        <div className="px-4 pb-12">
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

          {/* FORMULÁRIO DE CAPTURA */}
          <section className="mt-20 max-w-2xl mx-auto text-center px-4">
            <h2 className="text-2xl font-bold text-[#2F6BB0] mb-4">Receba novidades no seu e-mail</h2>
            <p className="text-sm text-gray-600 mb-6">Cadastre-se para receber atualizações com novos posts e dicas exclusivas.</p>
            <FormularioEmail tag="blog-list" />
          </section>
        </div>
      </Layout>
    </>
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