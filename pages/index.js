'use client';
import Layout from '@/components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import FormularioEmail from '@/components/FormularioEmail';
import Head from 'next/head';

export default function Home() {
  return (
    <Layout>
      <Head>
        <meta name="google-site-verification" content="G2248zuyTrDIKZlW2DUMIKSU_QNlL_5Gqu6Vis_wwUk" />
        <link rel="icon" href="/favicon-testandoai.png" type="image/x-icon" />
      </Head>
      <div className="pt-6 pb-8 px-4 flex flex-col items-center gap-6">
        <h1 className="text-lg md:text-xl font-bold text-center text-[#2F6BB0] leading-snug">
          Testes de Personalidade com Embasamento Psicológico
        </h1>

        <p className="text-gray-700 text-center max-w-xl text-sm md:text-base leading-normal">
          Descubra quem você é de forma divertida, profunda e validada. Nossos testes são baseados em teorias reconhecidas como o MBTI, os quatro temperamentos, as linguagens do amor e mais.
        </p>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 mt-2">
          <Link href="/teste/mbti" className="hover:scale-105 transition-transform duration-200">
            <div className="w-[260px] h-[370px] bg-white rounded-2xl shadow-md overflow-hidden flex flex-col items-center justify-between">
              <Image src="/cards/mbti.webp" alt="MBTI" width={260} height={180} className="object-cover" />
              <div className="p-3 text-center">
                <h2 className="text-base font-bold mb-1 text-[#2F6BB0]">MBTI</h2>
                <p className="text-sm text-gray-600">Descubra sua personalidade com base em 16 perfis</p>
              </div>
            </div>
          </Link>

          <Link href="/teste/temperamentos" className="hover:scale-105 transition-transform duration-200">
            <div className="w-[260px] h-[370px] bg-white rounded-2xl shadow-md overflow-hidden flex flex-col items-center justify-between">
              <Image src="/cards/temperamentos.webp" alt="Temperamentos" width={260} height={180} className="object-cover" />
              <div className="p-3 text-center">
                <h2 className="text-base font-bold mb-1 text-[#2F6BB0]">Temperamentos</h2>
                <p className="text-sm text-gray-600">Descubra seu temperamento dominante entre os 4 tipos clássicos</p>
              </div>
            </div>
          </Link>

          <div className="w-[260px] h-[370px] bg-white rounded-2xl shadow-md overflow-hidden flex flex-col items-center justify-between">
            <Image src="/cards/linguagens.webp" alt="Linguagens do Amor" width={260} height={180} className="object-cover" />
            <div className="p-3 text-center">
              <h2 className="text-base font-bold mb-1 text-gray-800">Linguagens do Amor</h2>
              <p className="text-sm text-gray-500">Em breve – Baseado na teoria de Gary Chapman</p>
            </div>
          </div>

          <div className="w-[260px] h-[370px] bg-white rounded-2xl shadow-md overflow-hidden flex flex-col items-center justify-between">
            <Image src="/cards/darkside.jpeg" alt="Dark Side" width={260} height={180} className="object-cover" />
            <div className="p-3 text-center">
              <h2 className="text-base font-bold mb-1 text-gray-800">Dark Side</h2>
              <p className="text-sm text-gray-500">Em breve – Descubra seus traços sombrios com base na Psicologia</p>
            </div>
          </div>
        </div>

        {/* Formulário com tag "homepage" ao final */}
        <div className="mt-10 w-full max-w-md">
          <FormularioEmail tag="homepage" />
        </div>
      </div>
    </Layout>
  );
}