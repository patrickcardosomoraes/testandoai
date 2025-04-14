'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AvisoCookies() {
  const [showCookies, setShowCookies] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookiesAccepted');
    if (!accepted) setShowCookies(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setShowCookies(false);
  };

  if (!showCookies) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-6 z-50 bg-white border border-gray-300 shadow-lg p-4 rounded-lg max-w-md mx-auto text-sm text-gray-800">
      <p className="mb-3">
        Utilizamos cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa{' '}
        <Link href="/politica-de-cookies" className="underline text-[#2F6BB0] hover:text-[#1e4fa3]">Política de Cookies</Link>.
      </p>
      <button
        onClick={acceptCookies}
        className="bg-[#2F6BB0] text-white text-sm px-4 py-2 rounded-full hover:bg-[#1d4c8c] transition"
      >
        Aceitar e continuar
      </button>
    </div>
  );
}