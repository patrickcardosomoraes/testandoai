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

export default function BlogPost({ frontmatter, content }) {
  const router = useRouter();
  const currentUrl = `https://testandoai.com.br${router.asPath}`;

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

          {/* Compartilhamento */}
          <div className="mt-10 border-t pt-8">
            <h3 className="text-lg font-semibold mb-2">Compartilhe este post</h3>
            <div className="flex gap-3 flex-wrap">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${frontmatter.title} - ${currentUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition"
              >
                WhatsApp
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition"
              >
                Facebook
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${frontmatter.title} - ${currentUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-full transition"
              >
                X (Twitter)
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm bg-[#0077B5] hover:bg-[#005983] text-white px-4 py-2 rounded-full transition"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Formulário de e-mail */}
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
}

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