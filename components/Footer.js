// components/Footer.js
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t mt-12 pt-4 pb-6 px-4 bg-white text-center text-sm text-gray-600">
      <p className="mb-2">© {new Date().getFullYear()} TestandoAI. Todos os direitos reservados.</p>
      <p className="mb-1">
        <Link href="/politica-de-privacidade" className="underline hover:text-[#2F6BB0]">Política de Privacidade</Link> ·{' '}
        <Link href="/termos-de-uso" className="underline hover:text-[#2F6BB0]">Termos de Uso</Link> ·{' '}
        <Link href="/politica-de-cookies" className="underline hover:text-[#2F6BB0]">Política de Cookies</Link> ·{' '}
        <Link href="mailto:contato@testandoai.com.br" className="underline hover:text-[#2F6BB0]">contato@testandoai.com.br</Link>
      </p>
    </footer>
  );
}