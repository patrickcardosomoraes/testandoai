// /pages/teste/mbti.js
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import questions from '@/data/mbti-questions';
import results from '@/data/mbti-results';

export default function TesteMBTI() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });
  const [answers, setAnswers] = useState([]);

  const current = questions[step];

  const handleAnswer = (value) => {
    const dim = current.dim;
    const trait = value > 0 ? dim[0] : dim[1];

    setScores((prev) => ({
      ...prev,
      [trait]: prev[trait] + Math.abs(value),
    }));

    setAnswers((prev) => [...prev, value]);
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (step === 0) return;
    const prevValue = answers[answers.length - 1];
    const prevDim = questions[step - 1].dim;
    const trait = prevValue > 0 ? prevDim[0] : prevDim[1];

    setScores((prev) => ({
      ...prev,
      [trait]: prev[trait] - Math.abs(prevValue),
    }));

    setAnswers((prev) => prev.slice(0, -1));
    setStep((prev) => prev - 1);
  };

  const getResult = () => {
    const type = `${scores.E >= scores.I ? 'E' : 'I'}${scores.S >= scores.N ? 'S' : 'N'}${scores.T >= scores.F ? 'T' : 'F'}${scores.J >= scores.P ? 'J' : 'P'}`;
    return results[type];
  };

  if (step === questions.length) {
    const result = getResult();
    const url = `https://wa.me/?text=Descobri%20que%20sou%20${result.title}%20no%20teste%20MBTI%20do%20site%20TestandoAI!%20Acesse:%20https://testandoai.com.br/teste/mbti`;

    return (
      <main className="min-h-screen bg-gradient-to-b from-[#f8fbff] to-[#f0f4ff] flex flex-col items-center justify-center text-center px-4 py-12 text-[#2F6BB0]">
        <h1 className="text-3xl font-bold mb-4">Você é {result.title}</h1>
        <p className="text-gray-700 max-w-lg mb-6">{result.description}</p>
        <Image src={result.image} alt={result.title} width={240} height={240} />
        <div className="flex gap-4 mt-6">
          <Link href="/">
            <span className="text-[#2F6BB0] underline hover:text-[#1e4fa3] transition-colors">
              Voltar para o início
            </span>
          </Link>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 underline hover:text-green-800"
          >
            Compartilhar no WhatsApp
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center text-center px-4 py-10 text-[#2F6BB0] relative">
      {/* Barra de Progresso */}
      <div className="w-full max-w-xl h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-[#2F6BB0] transition-all duration-300"
          style={{ width: `${(step / questions.length) * 100}%` }}
        ></div>
      </div>

      <p className="text-sm text-gray-500 mb-2">Pergunta {step + 1} de {questions.length}</p>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-xl"
        >
          <h2 className="text-2xl font-bold mb-8 text-[#2F6BB0]">{current.question}</h2>

          <div className="flex items-center justify-center gap-2 flex-wrap">
            {[-3, -2, -1, 0, 1, 2, 3].map((val) => (
              <button
                key={val}
                onClick={() => handleAnswer(val)}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm sm:text-base font-bold shadow-sm
                  transition-all duration-200 border-2
                  ${val === 0
                    ? 'bg-gray-300 text-gray-800 border-gray-300'
                    : 'bg-white border-[#2F6BB0] text-[#2F6BB0] hover:bg-[#2F6BB0] hover:text-white'}`}
              >
                {val > 0 ? `+${val}` : val}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

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
