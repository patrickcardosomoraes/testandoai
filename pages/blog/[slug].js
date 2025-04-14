import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';

export default function BlogPost({ frontmatter, content }) {
  return (
    <>
      <Head>
        <title>{frontmatter.title} | TestandoAI</title>
        <meta name="description" content={frontmatter.excerpt || 'Conteúdo do blog TestandoAI'} />
      </Head>

      <Layout>
        <div className="flex-1 max-w-3xl mx-auto px-6 py-12 text-[#2F6BB0]">
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
        </div>
      </Layout>
    </>
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