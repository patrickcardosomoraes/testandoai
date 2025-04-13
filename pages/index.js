import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen pt-1 pb-8 px-4 flex flex-col items-center gap-2 bg-[#FAFAFA] text-[#2F6BB0]">
      <Image
        src="/logo_testandoai.png"
        alt="Logo TestandoAI"
        width={230}
        height={120}
        className="mb-3"
        priority
      />

      <h1 className="text-lg md:text-xl font-bold text-center text-[#2F6BB0] leading-snug">
        Testes de Personalidade com Embasamento Psicológico
      </h1>

      <p className="text-gray-700 text-center max-w-xl text-sm md:text-base leading-normal">
        Descubra quem você é de forma divertida, profunda e validada. Nossos testes são baseados em teorias reconhecidas como o MBTI, os quatro temperamentos, as linguagens do amor e mais.
      </p>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 mt-2">
        {/* MBTI */}
        <Link href="/teste/mbti" className="hover:scale-105 transition-transform duration-200">
          <div className="w-[260px] h-[340px] bg-white rounded-2xl shadow-md overflow-hidden flex flex-col items-center justify-between">
            <Image
              src="/cards/mbti.png"
              alt="MBTI"
              width={260}
              height={180}
              className="object-cover"
            />
            <div className="p-3 text-center">
              <h2 className="text-base font-bold mb-1 text-[#2F6BB0]">MBTI</h2>
              <p className="text-sm text-gray-600">Descubra sua personalidade com base em 16 perfis</p>
            </div>
          </div>
        </Link>

        {/* Temperamentos */}
        <div className="w-[260px] h-[340px] bg-white rounded-2xl shadow-md overflow-hidden flex flex-col items-center justify-between">
          <Image
            src="/cards/temperamentos.png"
            alt="Temperamentos"
            width={260}
            height={180}
            className="object-cover"
          />
          <div className="p-3 text-center">
            <h2 className="text-base font-bold mb-1 text-gray-800">Temperamentos</h2>
            <p className="text-sm text-gray-500">Em breve – Teoria dos quatro temperamentos aplicada</p>
          </div>
        </div>

        {/* Linguagens do Amor */}
        <div className="w-[260px] h-[340px] bg-white rounded-2xl shadow-md overflow-hidden flex flex-col items-center justify-between">
          <Image
            src="/cards/linguagens.png"
            alt="Linguagens do Amor"
            width={260}
            height={180}
            className="object-cover"
          />
          <div className="p-3 text-center">
            <h2 className="text-base font-bold mb-1 text-gray-800">Linguagens do Amor</h2>
            <p className="text-sm text-gray-500">Em breve – Baseado na teoria de Gary Chapman</p>
          </div>
        </div>

        {/* Dark Side */}
        <div className="w-[260px] h-[340px] bg-white rounded-2xl shadow-md overflow-hidden flex flex-col items-center justify-between">
          <Image
            src="/cards/darkside.png"
            alt="Dark Side"
            width={260}
            height={180}
            className="object-cover"
          />
          <div className="p-3 text-center">
            <h2 className="text-base font-bold mb-1 text-gray-800">Dark Side</h2>
            <p className="text-sm text-gray-500">Em breve – Descubra seus traços sombrios com base na Psicologia</p>
          </div>
        </div>
      </div>
    </main>
  );
}