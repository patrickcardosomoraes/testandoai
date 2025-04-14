'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function PoliticaPrivacidade() {
  return (
    <main className="min-h-screen bg-white text-[#2F6BB0] flex flex-col justify-between">
      {/* Cabeçalho com logo */}
      <header className="w-full flex justify-center py-6 border-b border-gray-200">
        <Link href="/">
          <Image
            src="/logo_testandoai.png"
            alt="Logo TestandoAI"
            width={180}
            height={80}
            priority
          />
        </Link>
      </header>

      {/* Conteúdo principal */}
      <section className="flex-grow px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Política de Privacidade</h1>

          <p className="mb-4">
            Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações quando você utiliza o site TestandoAI (https://testandoai.com.br).
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">1. Informações que coletamos</h2>
          <ul className="list-disc list-inside mb-4">
            <li>Nome e endereço de e-mail (quando fornecidos voluntariamente pelo usuário)</li>
            <li>Informações de uso, como páginas acessadas e tempo de permanência</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-2">2. Uso das informações</h2>
          <p className="mb-4">Utilizamos os dados coletados para:</p>
          <ul className="list-disc list-inside mb-4">
            <li>Enviar conteúdos e novidades com base no seu interesse</li>
            <li>Melhorar a experiência do usuário</li>
            <li>Garantir segurança e prevenir fraudes</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-2">3. Compartilhamento</h2>
          <p className="mb-4">
            Não vendemos, alugamos ou compartilhamos suas informações com terceiros, exceto quando exigido por lei ou para proteger nossos direitos.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">4. Cookies</h2>
          <p className="mb-4">
            Podemos usar cookies para analisar o tráfego e melhorar sua navegação. Você pode desativá-los nas configurações do seu navegador.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">5. Seus direitos</h2>
          <p className="mb-4">Conforme a LGPD (Lei Geral de Proteção de Dados), você pode:</p>
          <ul className="list-disc list-inside mb-4">
            <li>Solicitar acesso ou exclusão dos seus dados</li>
            <li>Retirar o consentimento</li>
            <li>Corrigir informações</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-2">6. Contato</h2>
          <p className="mb-4">
            Em caso de dúvidas ou solicitações sobre esta Política, entre em contato pelo e-mail: <a href="mailto:contato@testandoai.com.br" className="underline">contato@testandoai.com.br</a>
          </p>

          <p className="text-sm text-gray-500">Última atualização: Abril de 2025</p>

          <div className="mt-10">
            <Link href="/" className="text-[#2F6BB0] underline hover:text-blue-800">← Voltar para a página inicial</Link>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="w-full border-t border-gray-200 py-4 text-center text-sm text-gray-500">
        <p>
          © {new Date().getFullYear()} TestandoAI ·{' '}
          <Link href="/privacidade" className="underline text-[#2F6BB0] hover:text-blue-800">
            Política de Privacidade
          </Link>
        </p>
      </footer>
    </main>
  );
}