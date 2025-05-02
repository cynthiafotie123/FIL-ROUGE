import { Outlet } from 'react-router-dom';
import Logo from '../assets/logo_quickmed-removebg-preview.png';
import Menu from '../assets/bars-solid.svg';
import { Link } from 'react-router-dom';
import SidebarMenu from '../components/SidebarMenu';
import { useState } from 'react';
//import { useAuthNavigation } from '../hooks/AuthNavigationContext';

//const { goToAuthPage } = useAuthNavigation();


function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <header 
        className="fixed z-10 top-0 left-0 right-0 h-16 bg-white border border-[#9095A0] flex items-center justify-between px-6"
        style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
      >
        {/* Logo + Burger */}
        <div className="flex items-center space-x-4">
          {/* Burger menu - visible sur mobile */}
          <button onClick={toggleSidebar}>
            <img src={Menu} alt="Menu" className="w-9 h-7" />
          </button>

          {/* Logo */}
          <img src={Logo} alt="Logo" className="h-15 w-auto" />
          <span className='font-bold text-[#002341]'>QuickMed</span>
        </div>

        {/* Menu - visible à partir du md breakpoint */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="rounded-md px-4 py-2 hover:text-[#00CFC1] text-sky-950">Home</Link>
          <Link to="/articles" className="rounded-md px-4 py-2 hover:text-[#00CFC1] text-sky-950">Articles</Link>
          <Link to="/pharmacies" className="rounded-md px-4 py-2 hover:text-[#00CFC1] text-sky-950">Pharmacies</Link>
          <Link to="/contact" className="rounded-md px-4 py-2 hover:text-[#00CFC1] text-sky-950">Contact</Link>
        </nav>

        {/* Bouton Se connecter */}
        <div>
          <button   className="hidden md:block bg-[#00CFC1] text-white px-6 py-2 rounded-full">
             <Link to="/auth" >Se connecter</Link>
          </button>
        </div>
      </header>

      {/* Sidebar Menu */}
      <SidebarMenu isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Le contenu des pages va ici */}
      <main className='pt-20'>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="mt-61 relative w-full h-[480px] bg-[#002341]">
        {/* Section "Devenir partenaire" */}

        <div className="container mx-auto px-4 -translate-y-[-20%]">
          <div className="relative w-full max-w-4xl h-[220px] mx-auto mt-100 bg-[#00CFC1] rounded-lg p-6 flex flex-col md:flex-row justify-between">
            <div className="md:w-1/2 mb-4 md:mb-0">
              <h3 className="text-white font-bold text-2xl mb-4">
                Vous êtes pharmacien ?
              </h3>
              <p className="text-white text-base">
                Rejoignez notre réseau de pharmacies partenaires et bénéficiez de nombreux avantages.
              </p>
            </div>
            
            <div className="flex items-center justify-center md:justify-end md:w-1/2">
              <button className="bg-white text-[#00CFC1] font-medium py-3 px-6 rounded-lg flex items-center hover:bg-gray-100 transition-colors">
                Devenir partenaire
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Contenu principal du footer */}
        <div className="container flex mx-auto my-5 px-4 pt-16 pb-8 text-white items-center justify-evenly">
            <div className="flex items-center space-x-4">
            
              {/* Logo */}
              <img src={Logo} alt="Logo" className="h-15 w-auto" />
              <span className='font-bold text-[#00cfc1]'>QuickMed</span>
            </div>

            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="rounded-md px-4 py-2 hover:text-[#00CFC1] ">Home</Link>
              <Link to="/articles" className="rounded-md px-4 py-2 hover:text-[#00CFC1]">Articles</Link>
              <Link to="/pharmacies" className="rounded-md px-4 py-2 hover:text-[#00CFC1]">Pharmacies</Link>
              <Link to="/contact" className="rounded-md px-4 py-2 hover:text-[#00CFC1]">Contact</Link>
              <Link to="/contact" className="rounded-md px-4 py-2 hover:text-[#00CFC1]">Blog</Link>
           </nav>
           <button className="flex items-center justify-between bg-white text-[#002341] rounded-full px-6 py-3 shadow-md w-50 max-w-xs">
               <span className="text-base font-medium"><Link to="/auth">Inscription</Link></span>
            <span className="flex items-center justify-center bg-[#00CFC1] text-white rounded-full w-8 h-8 ml-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
               </svg>
            </span>
          </button>


         
        </div>
        <div className='flex mx-auto text-white justify-center text-center'>© 2025  QuickMed Douala</div>
      </footer>
    </>
  );
}

export default Layout;