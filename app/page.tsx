'use client'

import { useState, useEffect } from 'react'
import Header from './components/Header'
import AuthLogin from './components/AuthLogin'
import AuthSignup from './components/AuthSignup'
import SearchBar from './components/SearchBar'
import FilterType from './components/FilterType'
import PokemonList from './components/PokemonList'
import Pagination from './components/Pagination'
import PokemonModal from './components/PokemonModal'

export default function Home() {
  const [userInfo, setUserInfo] = useState<any>(null)
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  
  const [pokemon, setPokemon] = useState<any[]>([])
  const [filteredPokemon, setFilteredPokemon] = useState<any[]>([])
  const [favorites, setFavorites] = useState<number[]>([])
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [types, setTypes] = useState<string[]>([])
  
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(12)
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Load user info and favorites
  useEffect(() => {
    const savedUser = localStorage.getItem('userInfo')
    if (savedUser) {
      setUserInfo(JSON.parse(savedUser))
    }

    const savedFavorites = localStorage.getItem('favorites')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  // Fetch Pokemon data
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
        const data = await response.json()

        const pokemonDetails = await Promise.all(
          data.results.map(async (poke: any) => {
            const res = await fetch(poke.url)
            return res.json()
          })
        )

        setPokemon(pokemonDetails || [])
        setFilteredPokemon(pokemonDetails || [])

        // Extract all unique types
        const allTypes = new Set<string>()
        pokemonDetails.forEach((poke: any) => {
          poke.types?.forEach((type: any) => {
            allTypes.add(type.type.name)
          })
        })
        setTypes(Array.from(allTypes).sort())
      } catch (error) {
        console.error('Error fetching Pokemon:', error)
        setPokemon([])
        setFilteredPokemon([])
      } finally {
        setLoading(false)
      }
    }

    fetchPokemon()
  }, [])

  // Filter Pokemon
  useEffect(() => {
    let filtered = [...pokemon]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter((poke) =>
        poke.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Type filter
    if (selectedType) {
      filtered = filtered.filter((poke) =>
        poke.types?.some((type: any) => type.type.name === selectedType)
      )
    }

    setFilteredPokemon(filtered)
    setCurrentPage(1)
  }, [searchTerm, selectedType, pokemon])

  // Handle favorite toggle
  const handleFavorite = (id: number) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter((fav) => fav !== id)
      : [...favorites, id]
    setFavorites(newFavorites)
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
  }

  // Handle logout
  const handleLogout = () => {
    setUserInfo(null)
    setShowAuth(false)
  }

  // Handle auth switch
  const handleSwitchToSignup = () => setAuthMode('signup')
  const handleSwitchToLogin = () => setAuthMode('login')

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedPokemon = Array.isArray(filteredPokemon)
    ? filteredPokemon.slice(startIndex, endIndex)
    : []
  const totalPages = Math.ceil((filteredPokemon?.length || 0) / itemsPerPage)

  // If not logged in, show auth
  if (!userInfo) {
    return (
      <>
        {authMode === 'login' ? (
          <AuthLogin onSwitchToSignup={handleSwitchToSignup} />
        ) : (
          <AuthSignup onSwitchToLogin={handleSwitchToLogin} />
        )}
      </>
    )
  }

  // Main app view
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <Header userInfo={userInfo} onLogout={handleLogout} />

      <div className="container-fluid py-5 px-4">
        {/* Title */}
        <div className="mb-5">
          <h1 className="text-white fw-bold mb-2">
            🔴 Pokédex - Catch them All!
          </h1>
          <p className="text-white-50">Welcome, {userInfo.name}! Explore and collect your favorite Pokémon</p>
        </div>

        {/* Search & Filter */}
        <div className="row mb-4">
          <div className="col-12 col-md-6 mb-3 mb-md-0">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          <div className="col-12 col-md-6">
            <FilterType
              types={types}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-white" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-white mt-3">Loading Pokémon...</p>
          </div>
        ) : (
          <>
            {/* Pokemon List */}
            <PokemonList
              pokemon={paginatedPokemon}
              favorites={favorites}
              onFavorite={handleFavorite}
              onSelectPokemon={setSelectedPokemon}
            />

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}

            {/* Results Count */}
            <div className="text-center mt-5">
              <p className="text-white-50 small">
                Showing {paginatedPokemon.length} of {filteredPokemon?.length || 0} Pokémon
              </p>
            </div>
          </>
        )}
      </div>

      {/* Pokemon Detail Modal */}
      {selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon}
          isFavorited={favorites.includes(selectedPokemon.id)}
          onFavorite={() => handleFavorite(selectedPokemon.id)}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </div>
  )
}
