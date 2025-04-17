import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/Layout';
import FormularioEmail from '@/components/FormularioEmail';

export default function TagPage({ tag, posts }) {
  return (
    <>
      <Head>
        <title>Categoria: {tag} | TestandoAI</title>
        <meta name="description" content={`Posts da categoria ${tag}`} />
      </Head>

      <Layout>
        <div className="px-4 pb-12">
          <header className="text-center py-10">
            <h1 className="text-3xl font-bold text-[#2F6BB0]">Categoria: {tag}</h1>
            <p className="text-gray-600 mt-2">Veja todos os posts relacionados à categoria <strong>{tag}</strong>.</p>
          </header>

          <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {posts.map(({ slug, frontmatter }) => (
              <Link key={slug} href={`/blog/${slug}`} className="bg-white rounded-xl shadow hover:shadow-lg transition p-5">
                <article>
                  {frontmatter.image && (
                    <div className="mb-4 rounded-xl overflow-hidden">
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

          <FormularioEmail tag={`categoria-${tag}`} />
        </div>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('content', 'posts'));
  const tags = new Set();

  files.forEach(filename => {
    const markdownWithMeta = fs.readFileSync(path.join('content', 'posts', filename), 'utf-8');
    const { data: frontmatter } = matter(markdownWithMeta);
    (frontmatter.tags || []).forEach(tag => tags.add(tag.toLowerCase()));
  });

  const paths = Array.from(tags).map(tag => ({
    params: { tag },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const files = fs.readdirSync(path.join('content', 'posts'));
  const tag = params.tag;

  const posts = files.map(filename => {
    const slug = filename.replace('.md', '');
    const markdownWithMeta = fs.readFileSync(path.join('content', 'posts', filename), 'utf-8');
    const { data: frontmatter } = matter(markdownWithMeta);
    return { slug, frontmatter };
  }).filter(post => (post.frontmatter.tags || []).map(t => t.toLowerCase()).includes(tag));

  return {
    props: {
      tag,
      posts,
    },
  };
}