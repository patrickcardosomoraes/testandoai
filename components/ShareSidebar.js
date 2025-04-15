// components/ShareSidebar.js
'use client';
import { useRouter } from 'next/router';

export default function ShareSidebar({ title }) {
  const router = useRouter();
  const url = `https://testandoai.com.br${router.asPath}`;

  return (
    <div className="fixed left-0 top-[40%] z-50 flex flex-col gap-2 pl-2">
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-r-md shadow-md text-sm"
      >
        Whats
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-r-md shadow-md text-sm"
      >
        Face
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${title} - ${url}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-400 hover:bg-blue-500 text-white px-3 py-2 rounded-r-md shadow-md text-sm"
      >
        X
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#0077B5] hover:bg-[#005983] text-white px-3 py-2 rounded-r-md shadow-md text-sm"
      >
        In
      </a>
    </div>
  );
}