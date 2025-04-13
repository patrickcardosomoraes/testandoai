import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import questions from '@/data/mbti-questions';
import results from '@/data/mbti-results';

export default function TesteMBTI() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });

  const current = questions[step];

  const handleAnswer = (value) => {
    if (!current || !current.dim) return;

    const dim = current.dim;
    const trait = value > 0 ? dim[0] : dim[1];

    setScores((prev) => ({
      ...prev,
      [trait]: prev[trait] + Math.abs(value),
    }));

    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (step === 0) return;
    setStep((prev) => prev - 1);
  };

  const getResult = () => {
    const type = `${scores.E >= scores.I ? 'E' : 'I'}${scores.S >= scores.N ? 'S' : 'N'}${scores.T >= scores.F ? 'T' : 'F'}${scores.J >= scores.P ? 'J' : 'P'}`;
    return results[type];
  };

  if (step === questions.length) {
    const result = getResult();

    return (
      <main className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center text-center px-4 py-12 text-[#2F6BB0]">
        <h1 className="text-3xl font-bold mb-4">Você é {result.title}</h1>
        <p className="text-gray-700 max-w-lg mb-6">{result.description}</p>
        <Image src={result.image} alt={result.title} width={240} height={240} />
        <Link href="/" className="mt-6 text-[#2F6BB0] underline hover:text-[#1e4fa3] transition-colors">
          Voltar para o início
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center text-center px-4 py-10 text-[#2F6BB0] relative">
      {/* Barra de Progresso */}
      <div className="w-full max-w-xl h-2 bg-gray-300 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-[#2F6BB0] transition-all duration-300"
          style={{ width: `${(step / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Número da pergunta */}
      <p className="text-sm text-gray-500 mb-2">
        Pergunta {step + 1} de {questions.length}
      </p>

      {/* Animação da pergunta */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-xl"
        >
          <h2 className="text-2xl font-bold mb-6">{current.question}</h2>

          <div className="flex gap-2 justify-center flex-wrap">
            {[-3, -2, -1, 0, 1, 2, 3].map((val) => (
              <button
                key={val}
                onClick={() => handleAnswer(val)}
                className={`w-10 h-10 rounded-full font-semibold transition-all duration-200 ${
                  val === 0
                    ? 'bg-gray-300 text-gray-800'
                    : 'bg-[#2F6BB0] hover:bg-[#1e4fa3] text-white'
                }`}
              >
                {val > 0 ? `+${val}` : val}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Botão de Voltar */}
      {step > 0 && (
        <button
          onClick={handleBack}
          className="mt-8 text-sm text-[#2F6BB0] underline hover:text-[#1e4fa3] transition-colors"
        >
          ← Voltar para a pergunta anterior
        </button>
      )}
    </main>
  );
}