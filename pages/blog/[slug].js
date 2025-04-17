import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';
import FormularioEmail from '@/components/FormularioEmail';
import { useRouter } from 'next/router';
import React from 'react';

const BlogPost = ({ frontmatter, content }) => {
  const router = useRouter();
  const currentUrl = `https://testandoai.com.br${router.asPath}`;

  const processedContent = content.trim();

  return (
    <>
      <Head>
        <title>{frontmatter.title} | TestandoAI</title>
        <meta name="description" content={frontmatter.excerpt || 'Conteúdo do blog TestandoAI'} />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:image" content={frontmatter.image} />
        <meta property="og:url" content={currentUrl} />
      </Head>

      <Layout>
        <div className="flex-1 max-w-3xl mx-auto px-6 py-12 text-[#2F6BB0]">
          <article className="prose lg:prose-lg prose-blue max-w-none">
            {frontmatter?.image?.length > 0 && (
              <img
                src={frontmatter.image}
                alt={frontmatter.title || 'Imagem do post'}
                className="w-full rounded-xl mb-6"
              />
            )}

            {frontmatter.date && (
              <p className="text-gray-500 text-sm mb-6">{frontmatter.date}</p>
            )}

            <div dangerouslySetInnerHTML={{ __html: processedContent }} />
          </article>

          {/* Compartilhamento */}
          <div className="mt-10 border-t pt-8">
            <h3 className="text-lg font-semibold mb-2 text-[#2F6BB0]">Compartilhe este post</h3>
            <div className="flex gap-4 flex-wrap">
              {frontmatter?.title && (
                <>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`${frontmatter.title} - ${currentUrl}`)}`}
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
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition"
                    aria-label="Compartilhar no Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M19 6h3V0h-3c-3.3 0-6 2.7-6 6v4H8v6h4v12h6V16h4l1-6h-5V6c0-1.1.9-2 2-2z" />
                    </svg>
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${frontmatter.title} - ${currentUrl}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-400 hover:bg-blue-500 text-white p-3 rounded-full shadow-lg transition"
                    aria-label="Compartilhar no Twitter"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M32 6.1a13.1 13.1 0 0 1-3.8 1 6.6 6.6 0 0 0 2.9-3.6 13.2 13.2 0 0 1-4.2 1.6 6.6 6.6 0 0 0-11.3 6 18.7 18.7 0 0 1-13.6-6.9 6.6 6.6 0 0 0 2 8.8 6.6 6.6 0 0 1-3-0.8v0.1a6.6 6.6 0 0 0 5.3 6.5 6.6 6.6 0 0 1-3 0.1 6.6 6.6 0 0 0 6.1 4.6 13.2 13.2 0 0 1-8.2 2.8 13.4 13.4 0 0 1-1.6-0.1 18.7 18.7 0 0 0 10.1 3 18.7 18.7 0 0 0 18.8-18.8c0-0.3 0-0.5 0-0.8A13.4 13.4 0 0 0 32 6.1z" />
                    </svg>
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#0077B5] hover:bg-[#005983] text-white p-3 rounded-full shadow-lg transition"
                    aria-label="Compartilhar no LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M29 0H3C1.3 0 0 1.3 0 3v26c0 1.7 1.3 3 3 3h26c1.7 0 3-1.3 3-3V3c0-1.7-1.3-3-3-3zM9.5 27H5V12h4.5v15zM7.3 10.2C6 10.2 5 9.2 5 7.9c0-1.3 1-2.3 2.3-2.3 1.3 0 2.3 1 2.3 2.3 0 1.3-1 2.3-2.3 2.3zM27 27h-4.5v-7.8c0-1.9-0.7-3.2-2.3-3.2-1.3 0-2.1 0.9-2.5 1.8-0.1 0.2-0.1 0.5-0.1 0.8V27h-4.5s0.1-12.2 0-13.5h4.5v1.9c0.6-0.9 1.7-2.2 4.1-2.2 3 0 5.3 2 5.3 6.3V27z" />
                    </svg>
                  </a>
                </>
              )}
            </div>
          </div>

          <FormularioEmail />

          <div className="mt-12">
            <Link href="/blog" className="text-sm underline text-[#2F6BB0] hover:text-[#1d4c8c]">
              ← Voltar para o blog
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
};

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('content', 'posts'));

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
  const markdownWithMeta = fs.readFileSync(path.join('content', 'posts', slug + '.md'), 'utf-8');
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

export default BlogPost;