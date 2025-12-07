'use client'

import PokemonCard from './PokemonCard'

interface PokemonListProps {
  pokemon: any[]
  favorites: number[]
  onFavorite: (id: number) => void
  onSelectPokemon: (pokemon: any) => void
}

export default function PokemonList({
  pokemon,
  favorites,
  onFavorite,
  onSelectPokemon,
}: PokemonListProps) {
  
  // Check if pokemon is an array
  if (!pokemon || !Array.isArray(pokemon) || pokemon.length === 0) {
    return (
      <div className="row mt-5">
        <div className="col-12 text-center">
          <p className="text-white fs-5 fw-bold">No Pokémon found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="row g-3 mb-5">
      {pokemon.map((poke: any) => {
        // Safety check for each pokemon object
        if (!poke || !poke.id) {
          return null
        }
        
        return (
          <PokemonCard
            key={poke.id}
            pokemon={poke}
            isFavorited={favorites.includes(poke.id)}
            onFavorite={() => onFavorite(poke.id)}
            onSelectPokemon={() => onSelectPokemon(poke)}
          />
        )
      })}
    </div>
  )
}