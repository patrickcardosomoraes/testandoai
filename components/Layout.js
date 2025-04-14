// components/Layout.js
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AvisoCookies from '@/components/AvisoCookies';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAFAFA] text-[#2F6BB0]">
        {children}
      </main>
      <Footer />
      <AvisoCookies />
    </>
  );
}