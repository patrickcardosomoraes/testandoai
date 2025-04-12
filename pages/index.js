import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen p-8 flex flex-col items-center gap-6 bg-[#FAFAFA] text-[#2F6BB0]">
      <Image
        src="/logo_testandoai.png"
        alt="Logo TestandoAI"
        width={320}
        height={320}
        priority
      />

      <p className="text-gray-700 text-lg text-center max-w-lg -mt-0">
        Descubra quem você é de um jeito divertido e profundo.
      </p>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mt-2">
        <Link href="/teste/mbti" className="hover:scale-105 transition-transform duration-200">
          <div className="w-[300px] h-[400px] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col items-center justify-between">
            <Image
              src="/cards/mbti.png"
              alt="MBTI"
              width={300}
              height={240}
              className="object-cover"
            />
            <div className="p-4 text-center">
              <h2 className="text-xl font-bold mb-2 text-[#2F6BB0]">MBTI</h2>
              <p className="text-sm text-gray-600">Descubra sua personalidade</p>
            </div>
          </div>
        </Link>

        <div className="w-[300px] h-[400px] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col items-center justify-between">
          <Image
            src="/cards/temperamentos.png"
            alt="Temperamentos"
            width={300}
            height={240}
            className="object-cover"
          />
          <div className="p-4 text-center">
            <h2 className="text-xl font-bold mb-2 text-gray-800">Temperamentos</h2>
            <p className="text-sm text-gray-500">em breve</p>
          </div>
        </div>

        <div className="w-[300px] h-[400px] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col items-center justify-between">
          <Image
            src="/cards/linguagens.png"
            alt="Linguagens do Amor"
            width={300}
            height={240}
            className="object-cover"
          />
          <div className="p-4 text-center">
            <h2 className="text-xl font-bold mb-2 text-gray-800">Linguagens do Amor</h2>
            <p className="text-sm text-gray-500">em breve</p>
          </div>
        </div>

        <div className="w-[300px] h-[400px] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col items-center justify-between">
          <Image
            src="/cards/darkside.png"
            alt="Dark Side"
            width={300}
            height={240}
            className="object-cover"
          />
          <div className="p-4 text-center">
            <h2 className="text-xl font-bold mb-2 text-gray-800">Dark Side</h2>
            <p className="text-sm text-gray-500">em breve</p>
          </div>
        </div>
      </div>
    </main>
  );
}