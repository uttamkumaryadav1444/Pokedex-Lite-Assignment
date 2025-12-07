'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function AuthLogin({ onSwitchToSignup }: { onSwitchToSignup: () => void }) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (email && password) {
        const userInfo = {
          email,
          name: email.split('@')[0],
          picture: 'https://ui-avatars.com/api/?name=' + email.split('@')[0],
          loginTime: new Date().toISOString(),
        }
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        router.push('/')
        window.location.reload()
      }
    } catch (err) {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    // Use NextAuth redirect flow to avoid popup issues
    await signIn('google', { callbackUrl: '/' })
  }

  return (
    <div suppressHydrationWarning className="min-vh-100 d-flex align-items-center justify-content-center gradient-bg py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-5">
            <div className="card border-0 shadow-lg" style={{ borderRadius: '15px' }}>
              
              {/* Header */}
              <div className="card-header gradient-blue text-white text-center py-4 border-0" style={{ borderRadius: '15px 15px 0 0' }}>
                <h1 className="mb-2 fw-bold">🔴 Pokédex Lite</h1>
                <p className="mb-0 small">Sign In</p>
              </div>

              {/* Body */}
              <div className="card-body p-4">
                
                {/* Error Alert */}
                {error && (
                  <div className="alert alert-danger mb-3 small">{error}</div>
                )}

                {/* Form */}
                <form onSubmit={handleLogin}>
                  
                  {/* Email */}
                  <div className="mb-3">
                    <label className="form-label fw-bold">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="trainer@example.com"
                      required
                    />
                  </div>

                  {/* Password */}
                  <div className="mb-3">
                    <label className="form-label fw-bold">Password</label>
                    <div className="input-group">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••"
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me */}
                  <div className="form-check mb-3">
                    <input className="form-check-input" type="checkbox" id="remember" />
                    <label className="form-check-label small" htmlFor="remember">
                      Remember me
                    </label>
                  </div>

                  {/* Sign In Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-100 fw-bold"
                    style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #667eea 100%)', border: 'none' }}
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </button>
                </form>

                {/* Divider */}
                <div className="d-flex align-items-center my-3">
                  <hr className="flex-grow-1" />
                  <span className="px-2 small text-muted">OR</span>
                  <hr className="flex-grow-1" />
                </div>

                {/* Google Button */}
                <button
                  onClick={handleGoogleLogin}
                  className="btn btn-outline-secondary w-100 fw-bold mb-3"
                  style={{ borderRadius: '8px', padding: '10px' }}
                >
                  🔵 Sign in with Google
                </button>

              </div>

              {/* Footer */}
              <div className="card-footer bg-light text-center py-3 border-top">
                <small>
                  Don't have an account?{' '}
                  <button
                    onClick={onSwitchToSignup}
                    className="btn btn-link p-0 text-primary fw-bold text-decoration-none"
                  >
                    Sign Up
                  </button>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
