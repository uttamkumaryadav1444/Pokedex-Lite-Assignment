'use client'

import { useEffect, useState } from 'react'

declare global {
  var google: any
}

export default function LoginPage({ onLoginSuccess }: { onLoginSuccess: (userInfo: any) => void }) {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.google) {
      google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '1234567890-abcdefghijklmnop.apps.googleusercontent.com',
        callback: handleCredentialResponse,
      })

      google.accounts.id.renderButton(
        document.getElementById('google-signin-button'),
        {
          theme: 'dark',
          size: 'large',
          type: 'standard',
          text: 'signin_with',
        }
      )
    }
  }, [])

  const handleCredentialResponse = (response: any) => {
    setIsLoading(true)
    try {
      // Decode JWT token
      const base64Url = response.credential.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )

      const userInfo = JSON.parse(jsonPayload)

      // Save to localStorage
      localStorage.setItem('userInfo', JSON.stringify({
        name: userInfo.name,
        email: userInfo.email,
        picture: userInfo.picture,
        loginTime: new Date().toISOString(),
      }))

      onLoginSuccess(userInfo)
    } catch (error) {
      console.error('Login failed:', error)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-20 blur-3xl -z-10"></div>

        {/* Card */}
        <div className="bg-white bg-opacity-95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 space-y-8">
          {/* Logo */}
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-red-400 rounded-full blur-xl opacity-75 animate-pulse"></div>
                <span className="relative text-7xl inline-block">🔴</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Pokédex
            </h1>
            <p className="text-gray-600 text-lg font-semibold tracking-widest">LITE</p>
          </div>

          {/* Description */}
          <div className="text-center space-y-2">
            <p className="text-gray-700 text-lg font-medium">
              Welcome, Trainer! 👋
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Sign in with Google to explore and collect your favorite Pokémon. Build your dream team and track your favorites!
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎯</span>
              <p className="text-gray-700 font-semibold">Browse 150+ Pokémon</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">❤️</span>
              <p className="text-gray-700 font-semibold">Mark Favorites</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚡</span>
              <p className="text-gray-700 font-semibold">Filter by Type</p>
            </div>
          </div>

          {/* Google Sign In Button */}
          <div className="space-y-4">
            <div id="google-signin-button" className="flex justify-center"></div>

            {isLoading && (
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="font-semibold">Signing you in...</span>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-500">
            We'll only use your name and email for your account
          </p>
        </div>
      </div>
    </div>
  )
}