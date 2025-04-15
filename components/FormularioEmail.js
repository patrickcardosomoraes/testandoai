'use client';
import { useState } from 'react';

export default function FormularioEmail({ tag = '' }) {
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
        body: JSON.stringify({ email, origem: tag }),
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
    <div className="mt-12 w-full bg-[#F0F4FA] rounded-xl p-6 shadow-md">
      <h3 className="text-xl font-bold text-[#2F6BB0] mb-2 text-center">Receba novidades por e-mail</h3>
      <p className="text-sm text-gray-600 text-center mb-4">Cadastre-se para não perder os próximos posts inspiradores.</p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center items-center gap-3 w-full max-w-xl mx-auto">
        <input
          type="email"
          placeholder="Seu melhor e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full sm:w-auto flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2F6BB0]"
        />
        <button
          type="submit"
          className={`bg-[#2F6BB0] text-white px-6 py-2 rounded-full text-sm font-semibold transition whitespace-nowrap ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#1d4c8c]'
          }`}
          disabled={loading}
        >
          {loading ? 'Enviando...' : 'Quero receber novidades'}
        </button>
      </form>
      {message && (
        <p className={`text-sm mt-3 text-center ${submitted ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
}