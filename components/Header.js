'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full px-6 py-4 bg-white border-b shadow-sm flex justify-between items-center relative">
      {/* Logo centralizado em mobile */}
      <div className="flex-1 flex justify-center md:justify-start">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo_testandoai.png"
            alt="Logo TestandoAI"
            width={180}
            height={70}
            className="h-[60px] w-auto max-w-[240px] cursor-pointer"
            priority
          />
        </Link>
      </div>

      {/* Menu para desktop */}
      <nav className="hidden md:flex gap-6 text-sm text-[#2F6BB0] font-medium">
        <Link href="/">Início</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/teste/mbti">MBTI</Link>
        <Link href="/politica-de-privacidade">Privacidade</Link>
      </nav>

      {/* Menu hamburger para mobile */}
      <button
        className="md:hidden absolute right-6 top-6 text-[#2F6BB0] focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Abrir menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {menuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Menu dropdown mobile */}
      {menuOpen && (
        <div className="md:hidden absolute top-full right-0 w-full bg-white shadow-md text-center text-[#2F6BB0] font-medium z-50 py-4 space-y-4">
          <Link href="/" onClick={() => setMenuOpen(false)}>Início</Link>
          <Link href="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
          <Link href="/teste/mbti" onClick={() => setMenuOpen(false)}>MBTI</Link>
          <Link href="/politica-de-privacidade" onClick={() => setMenuOpen(false)}>Privacidade</Link>
        </div>
      )}
    </header>
  );
}