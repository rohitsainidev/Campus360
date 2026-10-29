import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ScrollToTop from '../components/common/ScrollToTop';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBFC] text-[#0F172A] w-full max-w-full overflow-x-hidden">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
