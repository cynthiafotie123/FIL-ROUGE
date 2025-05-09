<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Pharmacie;
    

    
class PharmacieController extends Controller
{
   
    
    public function search(Request $request)
    {

        \Log::info('Received search request', [
            'query' => $request->query('query'),
        ]); 


        $query = $request->query('query');
    

        if (!$query) {
            return response()->json(['message' => 'Aucun terme de recherche fourni.'], 400);
        }
    
        $pharmacies = Pharmacie::whereRaw('LOWER(nom) LIKE ?', ['%' . strtolower($query) . '%'])->get();
    
        if ($pharmacies->isEmpty()) {
            return response()->json([
                'message' => "Aucune pharmacie trouvée avec le nom : $query"
            ], 404);
        }
    
        return response()->json($pharmacies);
    }
    
    
}
