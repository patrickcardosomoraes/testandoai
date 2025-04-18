'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from '@/components/Layout';
import perguntas from '@/data/temperamentos-questions';
import resultados from '@/data/temperamentos-results';

export default function TesteTemperamentos() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [respostas, setRespostas] = useState([]);
  const [activeTab, setActiveTab] = useState('fortes');
  const [scores, setScores] = useState({ colerico: 0, sanguineo: 0, melancolico: 0, fleumatico: 0 });
  const [resultadoDominante, setResultadoDominante] = useState(null);

  useEffect(() => {
    if (router.isReady) {
      const newTab = router.query.tab || 'fortes';
      setActiveTab(newTab);
    }
  }, [router.isReady, router.query.tab]);

  useEffect(() => {
    if (step === perguntas.length) {
      const newScores = { colerico: 0, sanguineo: 0, melancolico: 0, fleumatico: 0 };
      perguntas.forEach((pergunta, index) => {
        const resposta = respostas[index] || 0;
        if (pergunta.temperamento && newScores.hasOwnProperty(pergunta.temperamento)) {
          newScores[pergunta.temperamento] += resposta;
        }
      });
      const resultadoOrdenado = Object.entries(newScores).sort(([, a], [, b]) => b - a);
      setScores(newScores);
      setResultadoDominante(resultadoOrdenado[0]?.[0]);
    }
  }, [step]);

  const handleAnswer = (value) => {
    setRespostas((prev) => {
      const novas = [...prev];
      novas[step] = value;
      return novas;
    });

    setStep((prev) => Math.min(prev + 1, perguntas.length));
  };

  const calcularResultado = () => {
    const newScores = { colerico: 0, sanguineo: 0, melancolico: 0, fleumatico: 0 };
    perguntas.forEach((pergunta, index) => {
      const resposta = respostas[index] || 0;
      if (pergunta.temperamento && newScores.hasOwnProperty(pergunta.temperamento)) {
        newScores[pergunta.temperamento] += resposta;
      }
    });
    setScores(newScores);
    const resultadoOrdenado = Object.entries(newScores).sort(([, a], [, b]) => b - a);
    setResultadoDominante(resultadoOrdenado[0]?.[0]);
    return resultadoOrdenado[0]?.[0];
  };

  if (step === perguntas.length) {
    if (!resultadoDominante) {
      return (
        <Layout>
          <div className="min-h-screen flex items-center justify-center text-center px-4 py-20 text-[#2F6BB0]">
            <p className="text-xl font-semibold">Calculando resultado...</p>
          </div>
        </Layout>
      );
    }
    const tipo = resultadoDominante;
    const resultado = resultados[tipo];

    if (!resultado) {
      return (
        <Layout>
          <div className="min-h-screen flex items-center justify-center text-center px-4 py-20 text-red-600">
            <h1 className="text-2xl font-bold">Resultado não encontrado.</h1>
          </div>
        </Layout>
      );
    }

    const url = `https://wa.me/?text=Descobri%20que%20meu%20temperamento%20dominante%20é%20${resultado.title.split(' – ')[0]}%20no%20teste%20de%20Temperamentos%20do%20site%20TestandoAI!%20Acesse:%20https://testandoai.com.br/teste/temperamentos`;

    const tabs = {
      fortes: resultado.strengths,
      desafios: resultado.challenges,
      recomendacoes: resultado.recommendations,
    };

    const tabTitles = {
      fortes: 'Fortes',
      desafios: 'Desafios',
      recomendacoes: 'Recomendações',
    };

    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-b from-[#f8fbff] to-[#f0f4ff] flex flex-col items-center justify-center text-center px-4 py-8 text-[#2F6BB0]">
          <h1 className="text-2xl md:text-3xl font-bold mb-1">Seu Perfil de Temperamentos</h1>
          <p className="text-sm text-gray-600 mb-4 max-w-md">
            Seu temperamento dominante é: <span className="font-semibold">{resultado.title}</span>.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-4xl">
            <div className="w-full max-w-sm space-y-3">
              {Object.entries(scores).map(([key, val]) => {
                const max = perguntas.filter(p => p.temperamento === key).length * 3;
                const percent = Math.round((val / max) * 100);
                return (
                  <div key={key} className="text-left">
                    <div className="flex justify-between items-center mb-1">
                      <span className="capitalize font-medium">{key}:</span>
                      <span className="text-sm font-semibold">{percent}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#2F6BB0] transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center">
              <Image
                src={resultado.image}
                alt={resultado.title}
                width={240}
                height={360}
                className="rounded-lg shadow-md"
              />
            </div>
          </div>

          <div className="mt-6 w-full max-w-2xl">
            <div className="flex justify-center gap-2 mb-2 flex-wrap">
              {Object.keys(tabs).map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveTab(key);
                    router.push(`/teste/temperamentos?tab=${key}`, undefined, { shallow: true });
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

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
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
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 text-[#2F6BB0] space-y-4">
        <p className="text-xs text-gray-500 italic">Seja você mesmo. Cada resposta é um passo rumo ao autoconhecimento.</p>

        <div className="w-full max-w-xl h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#2F6BB0] transition-all duration-300"
            style={{ width: `${(step / perguntas.length) * 100}%` }}
          ></div>
        </div>

        <p className="text-sm text-gray-500">
          Pergunta {step + 1} de {perguntas.length}
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-xl"
          >
            <h2 className="text-base md:text-lg font-semibold text-[#2F6BB0]">
              {perguntas[step]?.texto || 'Carregando...'}
            </h2>

            <div className="text-xs text-gray-500 flex justify-between w-full max-w-xs mx-auto">
              <span>Discordo totalmente</span>
              <span>Concordo totalmente</span>
            </div>

            <div className="flex gap-2 justify-center flex-wrap">
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
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full transition-all duration-200 ${colorMap[val]}`}
                    aria-label={
                      val < 0
                        ? `Discordo nível ${Math.abs(val)}`
                        : val > 0
                        ? `Concordo nível ${val}`
                        : 'Neutro'
                    }
                  />
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Layout>
  );
}