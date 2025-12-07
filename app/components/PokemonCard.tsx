'use client'

interface PokemonCardProps {
  pokemon: any
  isFavorited: boolean
  onFavorite: () => void
  onSelectPokemon: () => void
}

export default function PokemonCard({
  pokemon,
  isFavorited,
  onFavorite,
  onSelectPokemon,
}: PokemonCardProps) {
  
  // Safety check
  if (!pokemon) {
    return null
  }

  const imageUrl = pokemon.sprites?.other?.['official-artwork']?.front_default || 
                   pokemon.sprites?.front_default || 
                   'https://via.placeholder.com/100'

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
      <div 
        className="card border-0 shadow-sm h-100"
        style={{
          borderRadius: '12px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          backgroundColor: '#fff'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px)'
          e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)'
        }}
      >
        {/* Image Container */}
        <div 
          style={{
            backgroundColor: '#f3f4f6',
            padding: '20px 10px',
            textAlign: 'center',
            borderRadius: '12px 12px 0 0',
            minHeight: '150px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src={imageUrl}
            alt={pokemon.name || 'Pokemon'}
            style={{
              width: '100px',
              height: '100px',
              objectFit: 'contain'
            }}
            onError={(e) => {
              (e.target as any).src = 'https://via.placeholder.com/100'
            }}
          />
        </div>

        {/* Card Body */}
        <div className="card-body p-3">
          {/* Name */}
          <h5 className="card-title fw-bold mb-2" style={{ fontSize: '1rem', textTransform: 'capitalize' }}>
            {pokemon.name || 'Unknown'}
          </h5>

          {/* Types */}
          <div className="mb-3 d-flex gap-1 flex-wrap">
            {pokemon.types && pokemon.types.length > 0 ? (
              pokemon.types.map((type: any, index: number) => (
                <span
                  key={index}
                  className="badge fw-semibold"
                  style={{
                    fontSize: '0.75rem',
                    backgroundColor: getTypeColor(type.type.name),
                    color: '#fff'
                  }}
                >
                  {type.type.name}
                </span>
              ))
            ) : (
              <span className="badge bg-secondary">Unknown</span>
            )}
          </div>

          {/* Stats Mini */}
          <div className="mb-3" style={{ fontSize: '0.85rem' }}>
            <div className="d-flex justify-content-between mb-1">
              <span>HP</span>
              <span className="fw-bold">{pokemon.stats?.[0]?.base_stat || 0}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>ATK</span>
              <span className="fw-bold">{pokemon.stats?.[1]?.base_stat || 0}</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="d-flex gap-2">
            {/* Favorite Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                onFavorite()
              }}
              className="btn btn-sm flex-grow-1"
              style={{
                backgroundColor: isFavorited ? '#ef4444' : '#e5e7eb',
                color: isFavorited ? '#fff' : '#374151',
                border: 'none',
                fontSize: '0.85rem',
                fontWeight: '600'
              }}
            >
              {isFavorited ? '❤️ Liked' : '🤍 Like'}
            </button>

            {/* Details Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                onSelectPokemon()
              }}
              className="btn btn-sm flex-grow-1"
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #667eea 100%)',
                color: '#fff',
                border: 'none',
                fontSize: '0.85rem',
                fontWeight: '600'
              }}
            >
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function getTypeColor(type: string): string {
  const colors: { [key: string]: string } = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
  }
  return colors[type] || '#999'
}