'use client';
import Link from 'next/link';
import Layout from '@/components/Layout';

export default function TermosUso() {
  return (
    <Layout>
      <section className="px-6 py-10 bg-white text-[#2F6BB0]">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Termos de Uso</h1>

          <p className="mb-4">
            Estes Termos de Uso regulam o acesso e uso do site TestandoAI (<strong>https://testandoai.com.br</strong>) por parte dos usuários.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">1. Aceitação dos Termos</h2>
          <p className="mb-4">
            Ao acessar ou utilizar nosso site, você concorda com estes Termos. Se não concordar, não utilize nossos serviços.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">2. Uso dos Testes</h2>
          <p className="mb-4">
            Os testes oferecidos possuem base em teorias psicológicas populares, com propósito educativo e de autoconhecimento. Eles não substituem avaliação profissional.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">3. Responsabilidades</h2>
          <p className="mb-4">
            O TestandoAI não se responsabiliza por interpretações incorretas dos resultados nem por decisões tomadas com base nos testes.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">4. Propriedade Intelectual</h2>
          <p className="mb-4">
            Todo o conteúdo do site, incluindo textos, imagens e marca, é protegido por direitos autorais e não pode ser copiado ou reproduzido sem permissão.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">5. Modificações</h2>
          <p className="mb-4">
            Podemos atualizar estes termos a qualquer momento. Recomendamos revisão periódica.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">6. Contato</h2>
          <p className="mb-4">
            Em caso de dúvidas, entre em contato pelo e-mail: <a href="mailto:contato@testandoai.com.br" className="underline">contato@testandoai.com.br</a>
          </p>

          <p className="text-sm text-gray-500">Última atualização: Abril de 2025</p>

          <div className="mt-10">
            <Link href="/" className="text-[#2F6BB0] underline hover:text-blue-800">← Voltar para a página inicial</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}