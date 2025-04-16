<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
  <a
    href={`https://wa.me/?text=${encodeURIComponent(`${frontmatter.title} - ${currentUrl}`)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center gap-2 px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded-xl shadow transition"
  >
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.09 1.61 5.84L0 24l6.37-1.66A11.95 11.95 0 0012 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.86 0-3.65-.5-5.22-1.44l-.37-.22-3.78.99 1.01-3.67-.24-.38A9.97 9.97 0 012 12C2 6.49 6.49 2 12 2s10 4.49 10 10-4.49 10-10 10zm5.14-7.46c-.28-.14-1.64-.8-1.89-.89-.25-.09-.44-.14-.63.14-.18.28-.72.89-.89 1.07-.16.18-.33.2-.61.07-.28-.14-1.2-.44-2.28-1.42-.84-.75-1.41-1.67-1.57-1.95-.16-.28-.02-.43.12-.57.12-.12.28-.33.42-.5.14-.17.18-.28.28-.47.09-.18.05-.35-.02-.5-.07-.14-.63-1.52-.86-2.08-.23-.56-.46-.48-.63-.49h-.54c-.18 0-.46.07-.7.35-.23.28-.89.86-.89 2.1s.91 2.43 1.03 2.6c.12.17 1.8 2.75 4.36 3.86.61.27 1.09.43 1.46.55.61.19 1.17.16 1.61.1.49-.07 1.64-.67 1.87-1.31.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.54-.32z"/>
    </svg>
    WhatsApp
  </a>

  <a
    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center gap-2 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow transition"
  >
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.408.593 24 1.325 24H12.82v-9.294H9.692V11.01h3.128V8.413c0-3.1 1.894-4.788 4.66-4.788 1.325 0 2.466.099 2.798.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.31h3.587l-.467 3.696h-3.12V24h6.116c.73 0 1.324-.593 1.324-1.326V1.326C24 .593 23.408 0 22.675 0z"/>
    </svg>
    Facebook
  </a>

  <a
    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${frontmatter.title} - ${currentUrl}`)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center gap-2 px-4 py-2 text-white bg-blue-400 hover:bg-blue-500 rounded-xl shadow transition"
  >
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23 2.999a9.5 9.5 0 01-2.828.828A4.93 4.93 0 0022.338.368a9.75 9.75 0 01-3.127 1.202A4.85 4.85 0 0016.105 0C13.673 0 11.6 2.144 11.6 4.785c0 .378.043.747.127 1.103C7.728 5.676 4.1 3.763 1.671.915a4.792 4.792 0 00-.659 2.404c0 1.655.83 3.118 2.092 3.976a4.865 4.865 0 01-2.213-.598v.06c0 2.312 1.714 4.24 3.982 4.68a4.93 4.93 0 01-2.204.083 4.905 4.905 0 004.576 3.437 9.776 9.776 0 01-6.056 2.08c-.393 0-.781-.022-1.165-.067A13.897 13.897 0 007.548 22c9.142 0 14.307-7.705 14.307-14.402 0-.22-.004-.439-.013-.658A10.32 10.32 0 0023 2.999z"/>
    </svg>
    X (Twitter)
  </a>

  <a
    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center gap-2 px-4 py-2 text-white bg-[#0077B5] hover:bg-[#005983] rounded-xl shadow transition"
  >
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M4.98 3.5C3.33 3.5 2 4.83 2 6.48s1.33 2.98 2.98 2.98 2.98-1.33 2.98-2.98S6.63 3.5 4.98 3.5zM2 21h6V9H2v12zm7.99 0H16V14c0-1.11.89-2 2-2s2 .89 2 2v7h6v-7.5C26 11.01 24 9 21.5 9c-1.54 0-2.89.84-3.5 2.09C17.89 9.84 16.54 9 15 9c-2.5 0-4.5 2.01-4.5 4.5V21z"/>
    </svg>
    LinkedIn
  </a>
</div>