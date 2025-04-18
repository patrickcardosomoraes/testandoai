'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from '@/components/Layout';
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
    setScores((prev) => ({ ...prev, [trait]: prev[trait] + Math.abs(value) }));
    setAnswers((prev) => [...prev, value]);
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (step === 0) return;
    const prevValue = answers[answers.length - 1];
    const prevDim = questions[step - 1].dim;
    const trait = prevValue > 0 ? prevDim[0] : prevDim[1];
    setScores((prev) => ({ ...prev, [trait]: prev[trait] - Math.abs(prevValue) }));
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
        <Layout>
          <div className="min-h-screen bg-gradient-to-b from-[#f8fbff] to-[#f0f4ff] flex flex-col items-center justify-center text-center px-4 py-6 md:py-4 text-[#2F6BB0]">
            <h1 className="text-2xl font-bold">Tipo de personalidade não encontrado.</h1>
          </div>
        </Layout>
      );
    }

    const url = `https://wa.me/?text=Descobri%20que%20sou%20${result.title}%20no%20teste%20MBTI%20do%20site%20TestandoAI!%20Acesse:%20https://testandoai.com.br/teste/mbti`;

    const tabs = {
      fortes: result.strengths,
      desafios: result.challenges,
      recomendacoes: result.recommendations,
    };

    const tabTitles = {
      fortes: 'Fortes',
      desafios: 'Desafios',
      recomendacoes: 'Recomendações',
    };

    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-b from-[#f8fbff] to-[#f0f4ff] flex flex-col items-center justify-center text-center px-4 py-6 md:py-4 text-[#2F6BB0]">
          <h1 className="text-3xl font-bold mb-2">Você é {result.title}</h1>
          <p className="text-gray-700 max-w-xl mb-4 text-sm md:text-base">{result.description}</p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-4xl mb-6">
            <div className="flex-1 space-y-3">
              {[
                ['Extroversão (E)', 'Introversão (I)'],
                ['Sensação (S)', 'Intuição (N)'],
                ['Pensamento (T)', 'Sentimento (F)'],
                ['Julgamento (J)', 'Percepção (P)'],
              ].map(([positiveLabel, negativeLabel]) => {
                const posKey = positiveLabel.match(/\((.*?)\)/)[1];
                const negKey = negativeLabel.match(/\((.*?)\)/)[1];
                const total = scores[posKey] + scores[negKey];
                const percent = total === 0 ? 0 : Math.round((scores[posKey] / total) * 100);
                return (
                  <div key={posKey} className="mb-2">
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span>{positiveLabel}</span>
                      <span>{negativeLabel}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-[#2F6BB0] rounded-full"
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

            <Image src={result.image} alt={`Ilustração do tipo ${result.title}`} width={240} height={240} className="mt-4 md:mt-0" />
          </div>

          <div className="mt-4 w-full max-w-xl">
            <div className="flex justify-center gap-2 mb-3 flex-wrap">
              {Object.keys(tabs).map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveTab(key);
                    router.push(`/teste/mbti?tab=${key}`, undefined, { shallow: true });
                  }}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                    activeTab === key ? 'bg-[#2F6BB0] text-white' : 'bg-gray-100 text-[#2F6BB0] hover:bg-gray-200'
                  }`}
                >
                  {tabTitles[key]}
                </button>
              ))}
            </div>

            <div className="bg-white shadow rounded-lg p-4 text-gray-700 text-left text-sm">
              <ul className="list-disc pl-4 space-y-2">
                {tabs[activeTab]?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link href="/" legacyBehavior>
              <a className="px-5 py-2 text-sm font-medium border border-[#2F6BB0] text-[#2F6BB0] rounded-full hover:bg-[#2F6BB0] hover:text-white transition">
                ← para o início
              </a>
            </Link>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 text-sm font-semibold text-white bg-green-500 hover:bg-green-600 shadow-lg rounded-full flex items-center gap-2 animate-bounce"
            >
              Compartilhar no WhatsApp
            </a>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 py-4 text-[#2F6BB0]">
        <p className="text-xs text-gray-500 mb-4 italic">Seja você mesmo. Cada resposta é um passo rumo ao autoconhecimento.</p>

        <div className="w-full max-w-xl h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-[#2F6BB0] transition-all duration-300"
            style={{ width: `${(step / questions.length) * 100}%` }}
          ></div>
        </div>

        <p className="text-sm text-gray-500 mb-1">Pergunta {step + 1} de {questions.length}</p>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-xl"
          >
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-[#2F6BB0]">{current.question}</h2>

            <div className="text-xs text-gray-500 flex justify-between w-full max-w-xs mx-auto mb-2">
              <span>Discordo totalmente</span>
              <span>Concordo totalmente</span>
            </div>

            <div className="flex gap-2 justify-center flex-wrap mb-4">
              {[-3, -2, -1, 0, 1, 2, 3].map((val) => {
                const colorMap = {
                  '-3': 'bg-red-400 hover:bg-red-500',
                  '-2': 'bg-red-300 hover:bg-red-400',
                  '-1': 'bg-red-200 hover:bg-red-300',
                  '0': 'bg-gray-300 hover:bg-gray-400',
                  '1': 'bg-emerald-200 hover:bg-emerald-300',
                  '2': 'bg-emerald-300 hover:bg-emerald-400',
                  '3': 'bg-emerald-400 hover:bg-emerald-500',
                };
                return (
                  <button
                    key={val}
                    onClick={() => handleAnswer(val)}
                    className={`w-7 h-7 md:w-8 md:h-8 rounded-full transition-all duration-200 ${colorMap[val]}`}
                    aria-label={val < 0 ? `Discordo nível ${Math.abs(val)}` : val > 0 ? `Concordo nível ${val}` : 'Neutro'}
                  />
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {step > 0 && (
          <button
            onClick={handleBack}
            className="mt-6 text-sm text-[#2F6BB0] underline hover:text-[#1e4fa3] transition-colors"
          >
            ← Voltar para a pergunta anterior
          </button>
        )}
      </div>
    </Layout>
  );
}