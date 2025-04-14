// components/Header.js
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="w-full px-6 py-4 bg-white border-b shadow-sm flex justify-between items-center">
      <Link href="/" className="flex items-center">
        <Image
          src="/logo_testandoai.png"
          alt="Logo TestandoAI"
          width={180}
          height={70}
          className="h-[80px] w-auto max-w-[240px] cursor-pointer"
          priority
        />
      </Link>
      <nav className="hidden md:flex gap-6 text-sm text-[#2F6BB0] font-medium">
        <Link href="/">Início</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/teste/mbti">MBTI</Link>
        <Link href="/politica-de-privacidade">Privacidade</Link>
      </nav>
    </header>
  );
}