'use client'

interface PokemonModalProps {
  pokemon: any
  isFavorited: boolean
  onFavorite: () => void
  onClose: () => void
}

export default function PokemonModal({
  pokemon,
  isFavorited,
  onFavorite,
  onClose,
}: PokemonModalProps) {
  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0" style={{ borderRadius: '15px' }}>
          
          {/* Header */}
          <div className="modal-header border-bottom-0" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #667eea 100%)', borderRadius: '15px 15px 0 0' }}>
            <h5 className="modal-title text-white fw-bold" style={{ textTransform: 'capitalize' }}>
              {pokemon.name}
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>

          {/* Body */}
          <div className="modal-body p-4 text-center">
            {/* Image */}
            <img
              src={pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default}
              alt={pokemon.name}
              style={{ width: '150px', height: '150px', objectFit: 'contain', marginBottom: '20px' }}
            />

            {/* Stats Grid */}
            <div className="row g-2 mb-3">
              <div className="col-6">
                <div className="p-2" style={{ backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
                  <small className="text-muted">Height</small>
                  <p className="fw-bold mb-0">{(pokemon.height / 10).toFixed(1)}m</p>
                </div>
              </div>
              <div className="col-6">
                <div className="p-2" style={{ backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
                  <small className="text-muted">Weight</small>
                  <p className="fw-bold mb-0">{(pokemon.weight / 10).toFixed(1)}kg</p>
                </div>
              </div>
            </div>

            {/* Abilities */}
            <div className="mb-3">
              <small className="text-muted d-block mb-2">Abilities</small>
              <div className="d-flex gap-2 flex-wrap justify-content-center">
                {pokemon.abilities?.map((ability: any, index: number) => (
                  <span key={index} className="badge bg-info" style={{ textTransform: 'capitalize' }}>
                    {ability.ability.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Base Stats */}
            <div className="mb-3">
              <small className="text-muted d-block mb-2">Base Stats</small>
              {pokemon.stats?.map((stat: any, index: number) => (
                <div key={index} className="mb-2">
                  <div className="d-flex justify-content-between mb-1" style={{ fontSize: '0.85rem' }}>
                    <span className="text-capitalize">{stat.stat.name}</span>
                    <strong>{stat.base_stat}</strong>
                  </div>
                  <div className="progress" style={{ height: '6px', borderRadius: '4px' }}>
                    <div
                      className="progress-bar"
                      style={{
                        width: `${(stat.base_stat / 150) * 100}%`,
                        background: 'linear-gradient(135deg, #3b82f6 0%, #667eea 100%)'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer border-top-0 p-3 gap-2">
            <button
              onClick={onFavorite}
              className="btn btn-sm flex-grow-1"
              style={{
                backgroundColor: isFavorited ? '#ef4444' : '#e5e7eb',
                color: isFavorited ? '#fff' : '#374151',
                border: 'none',
                fontWeight: '600'
              }}
            >
              {isFavorited ? '❤️ Liked' : '🤍 Like'}
            </button>
            <button
              onClick={onClose}
              className="btn btn-secondary btn-sm flex-grow-1"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}