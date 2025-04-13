import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import questions from '@/data/mbti-questions';
import results from '@/data/mbti-results';

export default function TesteMBTI() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });
  const [answers, setAnswers] = useState([]);

  const router = useRouter();
  const tabParam = router.query.tab || 'fortes';
  const [activeTab, setActiveTab] = useState(tabParam);

  useEffect(() => {
    setActiveTab(tabParam);
  }, [tabParam]);

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
    if (!result) {
      return (
        <main className="min-h-screen flex items-center justify-center text-center px-4 py-20 text-red-600">
          <h1 className="text-2xl font-bold">Tipo de personalidade não encontrado.</h1>
        </main>
      );
    }

    const url = `https://wa.me/?text=Descobri%20que%20sou%20${result.title}%20no%20teste%20MBTI%20do%20site%20TestandoAI!%20Acesse:%20https://testandoai.com.br/teste/mbti`;

    const tabs = {
      fortes: result.strengths,
      desafios: result.challenges,
      recomendacoes: result.recommendations,
    };

    const tabTitles = {
      fortes: 'Pontos Fortes',
      desafios: 'Desafios',
      recomendacoes: 'Recomendações',
    };

    return (
      <main className="min-h-screen bg-gradient-to-b from-[#f8fbff] to-[#f0f4ff] flex flex-col items-center justify-center text-center px-4 py-12 text-[#2F6BB0]">
        <h1 className="text-3xl font-bold mb-2">Você é {result.title}</h1>
        <p className="text-gray-700 max-w-xl mb-6">{result.description}</p>
        <Image src={result.image} alt={result.title} width={240} height={240} />

        {/* Abas */}
        <div className="mt-10 w-full max-w-xl">
          <div className="flex justify-center gap-4 mb-4">
            {Object.keys(tabs).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setActiveTab(key);
                  router.push(`/teste/mbti?tab=${key}`, undefined, { shallow: true });
                }}
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  activeTab === key
                    ? 'bg-[#2F6BB0] text-white'
                    : 'bg-gray-200 text-[#2F6BB0] hover:bg-gray-300'
                }`}
              >
                {tabTitles[key]}
              </button>
            ))}
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 text-gray-700 text-left">
            <ul className="list-disc pl-5 space-y-2">
              {tabs[activeTab]?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-6 mt-8">
          <Link href="/" className="text-[#2F6BB0] underline hover:text-[#1e4fa3]">
            Voltar para o início
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
    <main className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-start text-center px-4 py-10 text-[#2F6BB0]">
      <Image
        src="/logo_testandoai.png"
        alt="Logo TestandoAI"
        width={340}
        height={340}
        className="mb-4"
      />
      <p className="text-sm text-gray-500 mb-6 italic">
        Seja você mesmo. Cada resposta é um passo rumo ao autoconhecimento.
      </p>

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

          <div className="flex gap-2 justify-center flex-wrap">
            {[-3, -2, -1, 0, 1, 2, 3].map((val) => {
              const colorMap = {
                '-3': 'bg-red-400 hover:bg-red-500',
                '-2': 'bg-red-300 hover:bg-red-400',
                '-1': 'bg-red-200 hover:bg-red-300',
                '0': 'bg-gray-300 hover:bg-gray-400 text-gray-800',
                '1': 'bg-emerald-200 hover:bg-emerald-300',
                '2': 'bg-emerald-300 hover:bg-emerald-400',
                '3': 'bg-emerald-400 hover:bg-emerald-500',
              };

              return (
                <button
                  key={val}
                  onClick={() => handleAnswer(val)}
                  className={`w-10 h-10 rounded-full font-semibold transition-all duration-200 ${colorMap[val]}`}
                >
                  {val === 0 ? '•' : ''}
                </button>
              );
            })}
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