import Link from 'next/link';
import Image from 'next/image';

export default function PoliticaCookies() {
  return (
    <>
      <main className="min-h-screen px-6 py-10 bg-white text-[#2F6BB0]">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <Image src="/logo_testandoai.png" alt="Logo TestandoAI" width={180} height={60} />
          </div>

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
      </main>

      {/* Rodapé */}
      <footer className="w-full border-t mt-8 pt-4 pb-6 px-4 bg-white text-center text-sm text-gray-600">
        <p className="mb-2">
          © {new Date().getFullYear()} TestandoAI. Todos os direitos reservados.
        </p>
        <p className="mb-1">
          <Link href="/politica-de-privacidade" className="underline hover:text-[#2F6BB0]">Política de Privacidade</Link> ·{' '}
          <Link href="/termos-de-uso" className="underline hover:text-[#2F6BB0]">Termos de Uso</Link> ·{' '}
          <Link href="/politica-de-cookies" className="underline hover:text-[#2F6BB0]">Política de Cookies</Link> ·{' '}
          <Link href="mailto:contato@testandoai.com.br" className="underline hover:text-[#2F6BB0]">contato@testandoai.com.br</Link>
        </p>
      </footer>
    </>
  );
}