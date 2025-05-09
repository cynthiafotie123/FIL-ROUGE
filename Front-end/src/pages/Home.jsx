import CircleAnimation from '../components/CircleAnimation';
import { Search, MapPin } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import useSearchProduit from '../hooks/useSearchProduit';

import { useNavigate } from 'react-router-dom';

//importation des images
import Drug from '../assets/nosservicesDrugs-removebg-preview.png';
import PHARMAIM from '../assets/PHARMAIM.jpg';
import LOC from '../assets/map.jpg';
import Stuff from '../assets/about.jpg';
import TopProducts from '../components/TopProduits';




function Home() {
    const {
        searchTerm,
        setSearchTerm,
    } = useSearchProduit();
    const navigate = useNavigate();

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && searchTerm.trim()) {
            navigate(`/produit?search=${encodeURIComponent(searchTerm)}`);
        }
    };


    return(
        <>
            <div className='w-full h-full flex flex-col items-center justify-center'>
                        
{/* Section d'accueil */}

        <div className="mt-20 w-screen h-120 bg-gradient-to-b from-[#feffff] via-[#00cfc1] to-[#002341] text-white flex items-center justify-between">
                
                {/*Rechercher articles */}
                <div className="w-1/2 h-full flex flex-col items-center mx-2 justify-between  -mt-20">
                        <div className="w-3/4 h-2/7">
                            <p className="text-3xl text-[#002341]">Trouvez vos médicaments et <br></br> arcticles médicaux <br /> en un clic</p>
                        </div>

                        <div className="w-3/4 h-2/10 flex justify-center ">
                           
                            <input 
                                type="text" 
                                className=" w-4/5 h-full border-2 border-[#00cfc1] bg-white   focus:outline-none  focus:border-[#002341] , text-black
                                                                    focus:ring-2 ,focus:ring-[#002341] ,transition duration-150 placeholder:text-gray-500 placeholder:text-center" 
                                placeholder="Rechercher un medicament ou un article" 
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    
                                }}
                                
                         />
                          <button className='flex justify-center items-center w-1/5 h-full bg-[#002341]'
                                 onClick={() => {
                                    if (searchTerm.trim()) {
                                        navigate(`/produit?search=${encodeURIComponent(searchTerm)}`);
                                    }}}>
                           
                                <Search className="w-10 h-10 text-white"/>
                          </button>
                        </div>


                        
                </div>



                <div className="w-full h-full flex items-center justify-center -mt-10">

                    <CircleAnimation />
                </div>
        </div>

{/* Section À-Propos de Nous  */}
        <div className='flex w-full h-150 bg-gray-100 mt-0'>
            <div className="relative mx-auto max-w-[1176px] my-10 p-5 bg-white rounded-xl">
                <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                        <h2 className=" text-4xl lg:text-[48px] text-[#002834] mb-8">À-Propos de Nous </h2>
                        <p className=" text-lg text-[#171A1F] mb-12">
                        Our mission is to conserve nature and reduce the most pressing threats to the diversity of life on Earth.
                        </p>
                        <div className="w-full h-[240px] rounded-md flex flex-col  justify-center">
                           <div className="w-1/2 h-10">
                                <div className="w-full border-1 border-gray-200"></div>
                                <span className=' text-[#00CFC1] text-lg'>Qui Sommes-Nous?</span><ArrowRight className="w-4 h-4 text-gray-200" />
                                <div className="w-full border-1 border-gray-200"></div>
                           </div>

                           <div className="w-1/2 h-10">
                                
                                <span className=' text-[#00CFC1] text-lg'>Que faisons-nous?</span><ArrowRight className="w-4 h-4 text-gray-200" />
                                <div className="w-full border-1 border-gray-200"></div>
                           </div>

                           <div className="w-1/2 h-10">
                                
                                <span className=' text-[#00CFC1] text-lg'>Aide?</span><ArrowRight className="w-4 h-4 text-gray-200" />
                                <div className="w-full border-1 border-gray-200"></div>
                           </div>

                           <div className="w-1/2 h-10">
                                
                                <span className=' text-[#00CFC1] text-lg'>Où sommes-nous?</span><ArrowRight className="w-4 h-4 text-gray-200" />
                                <div className="w-full border-1 border-gray-200"></div>
                           </div>
                        </div>
                    </div>
                        <div className="hidden lg:block">
                            <img src={Drug} alt="Mission" className="w-full h-[412px] object-cover" />
                        </div>
            </div>
        </div>

      
       

        </div>
  {/**section NOS SERVICES */}

        <div className='flex flex-col  w-full h-200 bg-gray-100 mt-0'>
                <div className='mx-auto text-4xl mt-10'>Nos Services</div>
                <div className="relative flex justify-between items-center mx-auto w-[1176px] my-20 p-5 h-120 bg-white rounded-xl">
                  <div className='flex flex-col items-center justify-center space-y-15'>
                        <div className='overflow-hidden rounded-full h-65 w-65'>
                            <img className="w-full h-full object-cover" src={PHARMAIM} alt="pharmacie"/>
                        </div>
                        <span className='text-green-700'>Rechercher un medicament</span>

                  </div>

                  <div className='flex flex-col items-center justify-center space-y-15'>
                        <div className='h-65 w-65'>
                            <img className="w-full h-full object-cover" src={LOC} alt="pharmacie"/>
                        </div>
                        <span className='text-green-700'>Localiser une Pharmacie</span>

                  </div>

                  <div className='flex flex-col items-center justify-center space-y-15'>
                        <div className='h-65 w-65'>
                            <img className="w-full h-full object-cover" src={Stuff} alt="pharmacie"/>
                        </div>
                        <span className='text-green-700'>Rechercher un Article</span>

                  </div>

        </div>


    {/**section top medicament et articles */}
    
        <TopProducts />

   
    
  </div>
        
        
    </div>
      </>
      
    )
}

export default Home;