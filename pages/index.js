'use client';
import { useState } from 'react';
import Layout from '@/components/Layout';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/save-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
        setMessage(data.message);
        setEmail('');
      } else {
        setMessage(data.error || 'Erro ao salvar e-mail.');
      }
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      setMessage('Erro ao enviar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="pt-6 pb-8 px-4 flex flex-col items-center gap-2">
        <h1 className="text-lg md:text-xl font-bold text-center text-[#2F6BB0] leading-snug">
          Testes de Personalidade com Embasamento Psicológico
        </h1>

        <p className="text-gray-700 text-center max-w-xl text-sm md:text-base leading-normal">
          Descubra quem você é de forma divertida, profunda e validada. Nossos testes são baseados em teorias reconhecidas como o MBTI, os quatro temperamentos, as linguagens do amor e mais.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2 mt-3 w-full max-w-sm">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2F6BB0]"
            />
            <button
              type="submit"
              className={`bg-[#2F6BB0] text-white px-6 py-2 rounded-full text-sm font-semibold transition ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#1d4c8c]'
              }`}
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'Quero receber novidades'}
            </button>
            {message && (
              <p className={`text-sm mt-1 ${submitted ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </p>
            )}
          </form>
        ) : (
          <p className="text-green-600 font-medium mt-3">{message || 'E-mail cadastrado com sucesso! 🎉'}</p>
        )}

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 mt-6">
          <Link href="/teste/mbti" className="hover:scale-105 transition-transform duration-200">
            <div className="w-[260px] h-[340px] bg-white rounded-2xl shadow-md overflow-hidden flex flex-col items-center justify-between">
              <Image src="/cards/mbti.png" alt="MBTI" width={260} height={180} className="object-cover" />
              <div className="p-3 text-center">
                <h2 className="text-base font-bold mb-1 text-[#2F6BB0]">MBTI</h2>
                <p className="text-sm text-gray-600">Descubra sua personalidade com base em 16 perfis</p>
              </div>
            </div>
          </Link>

          <div className="w-[260px] h-[340px] bg-white rounded-2xl shadow-md overflow-hidden flex flex-col items-center justify-between">
            <Image src="/cards/temperamentos.png" alt="Temperamentos" width={260} height={180} className="object-cover" />
            <div className="p-3 text-center">
              <h2 className="text-base font-bold mb-1 text-gray-800">Temperamentos</h2>
              <p className="text-sm text-gray-500">Em breve – Teoria dos quatro temperamentos aplicada</p>
            </div>
          </div>

          <div className="w-[260px] h-[340px] bg-white rounded-2xl shadow-md overflow-hidden flex flex-col items-center justify-between">
            <Image src="/cards/linguagens.png" alt="Linguagens do Amor" width={260} height={180} className="object-cover" />
            <div className="p-3 text-center">
              <h2 className="text-base font-bold mb-1 text-gray-800">Linguagens do Amor</h2>
              <p className="text-sm text-gray-500">Em breve – Baseado na teoria de Gary Chapman</p>
            </div>
          </div>

          <div className="w-[260px] h-[340px] bg-white rounded-2xl shadow-md overflow-hidden flex flex-col items-center justify-between">
            <Image src="/cards/darkside.png" alt="Dark Side" width={260} height={180} className="object-cover" />
            <div className="p-3 text-center">
              <h2 className="text-base font-bold mb-1 text-gray-800">Dark Side</h2>
              <p className="text-sm text-gray-500">Em breve – Descubra seus traços sombrios com base na Psicologia</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}