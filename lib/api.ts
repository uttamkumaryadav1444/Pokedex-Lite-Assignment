import axios from 'axios'

const API_BASE = 'https://pokeapi.co/api/v2'

export const getPokemonList = async (limit = 20, offset = 0) => {
  try {
    const response = await axios.get(`${API_BASE}/pokemon`, {
      params: { limit, offset }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching Pokémon list:', error)
    throw error
  }
}

export const getPokemonDetails = async (nameOrId: string) => {
  try {
    const response = await axios.get(`${API_BASE}/pokemon/${nameOrId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching Pokémon details:', error)
    throw error
  }
}

export const getAllTypes = async () => {
  try {
    const response = await axios.get(`${API_BASE}/type`)
    return response.data
  } catch (error) {
    console.error('Error fetching types:', error)
    throw error
  }
}