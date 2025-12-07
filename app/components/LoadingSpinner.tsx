'use client'

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="inline-block">
          <span className="text-8xl inline-block animate-bounce" style={{ animationDelay: '0s' }}>
            🔴
          </span>
        </div>
        <div className="space-y-2">
          <p className="text-white text-3xl font-black">Loading Pokémon...</p>
          <div className="flex gap-2 justify-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}