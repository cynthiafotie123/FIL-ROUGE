import { useState, useEffect } from 'react';
import axios from 'axios';

function useSearchProduit() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            setError('Veuillez entrer un terme de recherche');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            // Appel réel à l'API Laravel
            const response = await axios.get('/api/produits', {
                params: { search: searchTerm }
            });
            setSearchResults(response.data); // Assure-toi que le backend retourne un tableau de produits
            console.log('Réponse brute de l’API:', response.data);
        } catch (err) {
            setError('Une erreur est survenue lors de la recherche. Veuillez réessayer.');
            setSearchResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    const clearSearch = () => {
        setSearchTerm('');
        setSearchResults([]);
        setError('');
    };

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'Enter' && searchTerm.trim()) {
                handleSearch();
            }
        };

        document.addEventListener('keypress', handleKeyPress);
        return () => {
            document.removeEventListener('keypress', handleKeyPress);
        };
    }, [searchTerm]);

    return {
        searchTerm,
        setSearchTerm,
        searchResults,
        isLoading,
        error,
        handleSearch,
        clearSearch
    };
}

export default useSearchProduit;