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
        body: JSON.stringify({ email, origem: tag }), // <--- importante!
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
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2 w-full">
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
  );
}