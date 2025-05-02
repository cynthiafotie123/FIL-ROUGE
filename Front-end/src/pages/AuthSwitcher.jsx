import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // très important pour redirection sans refresh
import { Facebook, Mail, User, Phone, Lock } from "lucide-react";
import { useAuthen } from '../hooks/AuthenContext';

export default function AuthForm() {
  const [isSignup, setIsSignup] = useState(true);
  const { register, login } = useAuthen();

  const navigate = useNavigate(); // Pour rediriger sans reload

  const [nom, setNom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignup) {
      await register({ nom, telephone, email, password });
      navigate('/dashboard');
    } else {
      await login({ email, password });
      navigate('/dashboard');
    }
    
  };

  return (
    <div className="flex justify-center items-center h-full w-full bg-gradient-to-b from-[#feffff] via-[#00cfc1] to-[#002341]">
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white shadow-lg rounded-xl w-96">
          {/* Onglets */}
          <div className="flex">
            <button
              onClick={() => setIsSignup(true)}
              className={`w-1/2 py-3 rounded-t-xl text-sm font-semibold ${
                isSignup ? "bg-green-500 text-white" : "bg-white text-gray-500"
              }`}
            >
              S'inscrire
            </button>
            <button
              onClick={() => setIsSignup(false)}
              className={`w-1/2 py-3 rounded-t-xl text-sm font-semibold ${
                !isSignup ? "bg-blue-500 text-white" : "bg-white text-gray-500"
              }`}
            >
              Se connecter
            </button>
          </div>

          {/* Formulaire */}
          <div className="px-6 py-8">
            {/* Boutons sociaux */}
            <button className="flex items-center justify-center w-full mb-3 border p-2 rounded hover:bg-gray-50">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 mr-2" />
              Continuer avec Google
            </button>
            <button className="flex items-center justify-center w-full mb-5 border p-2 rounded hover:bg-gray-50">
              <Facebook className="w-5 h-5 mr-2 text-blue-600" />
              Continuer avec Facebook
            </button>

            <div className="text-center text-gray-400 mb-5">OU</div>

            {/* Formulaires dynamique */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              {isSignup && (
                <>
                  <div className="flex items-center border rounded p-2">
                    <User className="w-4 h-4 mr-2 text-gray-400" />
                    <input type="text" placeholder="Nom" className="w-full outline-none" required value={nom} onChange={(e) => setNom(e.target.value)} />
                  </div>
                  <div className="flex items-center border rounded p-2">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                    <input type="text" placeholder="Telephone" className="w-full outline-none" required value={telephone} onChange={(e) => setTelephone(e.target.value)} />
                  </div>
                </>
              )}
              <div className="flex items-center border rounded p-2">
                <Mail className="w-4 h-4 mr-2 text-gray-400" />
                <input type="email" placeholder="Email" className="w-full outline-none" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="flex items-center border rounded p-2">
                <Lock className="w-4 h-4 mr-2 text-gray-400" />
                <input type="password" placeholder="Mot de passe" className="w-full outline-none" required value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>

              <button
                type="submit"
                className={`w-full py-2 rounded text-white font-semibold ${
                  isSignup ? "bg-green-500" : "bg-blue-600"
                }`}
              >
                Valider
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
