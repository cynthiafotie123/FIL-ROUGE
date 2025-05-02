import { useEffect, useRef } from 'react';
import { MapPin, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import Ventoline from '../assets/VENTOLINE.png';
import Tensiometre from '../assets/tensiometre.png';
import Coartem from '../assets/PALU.png'
import Glycometre from '../assets/diabetic-person-checking-their-glucose-level.jpg'
import Melformine from '../assets/MELFORMINE.png'
import Disoprone from '../assets/DISOPRONE.png'
import Lit from '../assets/lit.png'
import Amlor from '../assets/AMLOR.png'

const products = [
  {
    title: 'Glycometre',
    description: 'Enim sunt voluptate nisi et consequat sint cillum voluptate.',
    price: '25 000 Fcfa',
    image: Glycometre,
  },
  {
    title: 'Ventoline',
    description: 'Non amet quis labore sunt iure exceptur voluptate velit.',
    price: '7 500 Fcfa',
    image: Ventoline,
  },
  {
    title: 'Tensiomètre',
    description: 'Mollit dolore ipsum et cillum dolor consequat.',
    price: '15 000 Fcfa',
    image: Tensiometre,
  },
  {
    title: 'Coartem',
    description: 'Un antidouleur classique pour les fièvres et douleurs.',
    price: '1 000 Fcfa',
    image: Coartem,
  },
  {
    title: 'Melformine',
    description: 'Un antidouleur classique pour les fièvres et douleurs.',
    price: '5 000 Fcfa',
    image: Melformine,
  },
  {
    title: 'Disoprone',
    description: 'Un antidouleur classique pour les fièvres et douleurs.',
    price: '3 000 Fcfa',
    image:Disoprone,
  },
  {
    title: 'Lits Hospitaliers',
    description: 'Un antidouleur classique pour les fièvres et douleurs.',
    price: '25 000 Fcfa',
    image: Lit,
  },
  {
    title: 'Amlor',
    description: 'Un antidouleur classique pour les fièvres et douleurs.',
    price: '6 000 Fcfa',
    image: Amlor,
  },
];

function TopProducts() {
  const scrollRef = useRef(null);
  const controls = useAnimation();
  
  // Fonction de scroll (boutons)
  const scroll = (direction) => {
    const scrollAmount = direction === 'left' ? -300 : 300;
    scrollRef.current?.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };
  
  // Autoplay (scroll toutes les 4s)
  useEffect(() => {
    const interval = setInterval(() => {
      scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="bg-gradient-to-b from-[#00cfc1] via-[#002341] to-white py-10 px-4 md:px-10">
      <h2 className="text-white text-2xl md:text-3xl font-semibold text-center mb-8">
        Top medicaments et articles les plus demandés
      </h2>
      <div className="relative">
        {/* Flèche gauche */}
        <button
          onClick={() => scroll('left')}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white text-[#00cfc1] shadow items-center justify-center"
        >
          <ChevronLeft />
        </button>
        
        {/* Scroll container with custom styling to hide scrollbars */}
        <div className="overflow-hidden">
          <motion.div
            ref={scrollRef}
            className="flex space-x-6 overflow-x-auto px-2 scroll-smooth cursor-grab active:cursor-grabbing no-scrollbar"
            drag="x"
            dragConstraints={{ left: -1000, right: 0 }}
            style={{
              scrollbarWidth: 'none', /* Firefox */
              msOverflowStyle: 'none',  /* IE and Edge */
            }}
          >
            {products.map((item, idx) => (
              <motion.div
                key={idx}
                className="min-w-[280px] max-w-sm bg-white rounded-xl shadow-md p-4 flex flex-col flex-shrink-0"
                whileHover={{ scale: 1.03 }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{item.description}</p>
                <p className="text-[#00cfc1] font-bold mb-1">{item.price}</p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center text-red-500 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    Localisation
                  </div>
                  <button className="bg-[#00cfc1] text-white px-4 py-1 rounded-full text-sm hover:bg-teal-500">
                    Commander
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Flèche droite */}
        <button
          onClick={() => scroll('right')}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white text-[#00cfc1] shadow items-center justify-center"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

export default TopProducts;

