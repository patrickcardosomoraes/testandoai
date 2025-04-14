import Link from 'next/link';
import Layout from '@/components/Layout';

export default function PoliticaCookies() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-6 py-10 bg-white text-[#2F6BB0]">
        <h1 className="text-3xl font-bold mb-6 text-center">Política de Cookies</h1>

        <p className="mb-4">
          Esta Política de Cookies explica como o site TestandoAI utiliza cookies e tecnologias similares para reconhecer você quando visita nosso site em <strong>https://testandoai.com.br</strong>.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. O que são cookies?</h2>
        <p className="mb-4">
          Cookies são pequenos arquivos de texto armazenados em seu dispositivo quando você visita um site. Eles ajudam a lembrar suas preferências, melhorar a experiência e analisar o uso do site.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. Por que usamos cookies?</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Para lembrar suas preferências de navegação</li>
          <li>Para analisar métricas de desempenho e acesso ao site</li>
          <li>Para fornecer uma experiência mais personalizada</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Tipos de cookies que utilizamos</h2>
        <ul className="list-disc list-inside mb-4">
          <li><strong>Cookies essenciais:</strong> necessários para o funcionamento do site</li>
          <li><strong>Cookies de desempenho:</strong> ajudam a entender como os visitantes interagem com o site</li>
          <li><strong>Cookies de funcionalidade:</strong> lembram suas escolhas e preferências</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Como gerenciar cookies?</h2>
        <p className="mb-4">
          Você pode configurar seu navegador para aceitar, recusar ou apagar cookies. No entanto, isso pode afetar o funcionamento de algumas funcionalidades do site.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Alterações nesta política</h2>
        <p className="mb-4">
          Podemos atualizar esta política periodicamente. A data da última atualização estará sempre indicada no final da página.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Contato</h2>
        <p className="mb-4">
          Se você tiver dúvidas sobre esta Política de Cookies, entre em contato pelo e-mail: <a href="mailto:contato@testandoai.com.br" className="underline">contato@testandoai.com.br</a>
        </p>

        <p className="text-sm text-gray-500">Última atualização: Abril de 2025</p>

        <div className="mt-10 text-center">
          <Link href="/" className="text-[#2F6BB0] underline hover:text-blue-800">← Voltar para a página inicial</Link>
        </div>
      </div>
    </Layout>
  );
}