'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full px-6 py-4 bg-white border-b shadow-sm flex items-center justify-between relative">
      {/* Botão hambúrguer à esquerda no mobile */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-[#2F6BB0] text-2xl font-bold"
        >
          {isOpen ? '×' : '☰'}
        </button>
      </div>

      {/* Logo centralizado */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo_testandoai.png"
            alt="Logo TestandoAI"
            width={180}
            height={85}
            className="h-[70px] w-auto cursor-pointer"
            priority
          />
        </Link>
      </div>

      {/* Menu normal em desktop (direita) */}
      <nav className="hidden md:flex gap-6 text-sm text-[#2F6BB0] font-medium ml-auto">
        <Link href="/">Início</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/teste/mbti">MBTI</Link>
        <Link href="/politica-de-privacidade">Privacidade</Link>
      </nav>

      {/* Menu mobile dropdown */}
      {isOpen && (
        <div className="absolute top-[70px] left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-6 text-[#2F6BB0] font-medium text-base md:hidden z-50">
          <Link href="/" onClick={() => setIsOpen(false)}>Início</Link>
          <Link href="/blog" onClick={() => setIsOpen(false)}>Blog</Link>
          <Link href="/teste/mbti" onClick={() => setIsOpen(false)}>MBTI</Link>
          <Link href="/politica-de-privacidade" onClick={() => setIsOpen(false)}>Privacidade</Link>
        </div>
      )}
    </header>
  );
}