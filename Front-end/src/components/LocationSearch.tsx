import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

interface LocationSearchProps {
  onSearch: (location: string) => void;
}

export const LocationSearch: React.FC<LocationSearchProps> = ({ onSearch }) => {
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      onSearch(location);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Entrez votre localisation"
          className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00CFC1] focus:border-transparent transition duration-150"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MapPin size={20} className="text-gray-400" />
        </div>
        <button
          type="submit"
          className="absolute inset-y-0 right-0 px-4 text-white bg-[#002341] hover:bg-[#00345e] rounded-r-lg transition duration-150"
        >
          Localiser
        </button>
      </div>
    </form>
  );
};