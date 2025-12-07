'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthSignup({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match')
        setLoading(false)
        return
      }

      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters')
        setLoading(false)
        return
      }

      const userInfo = {
        email: formData.email,
        name: formData.name,
        picture: 'https://ui-avatars.com/api/?name=' + formData.name,
        loginTime: new Date().toISOString(),
      }
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
      setSuccess('Account created! Redirecting...')

      setTimeout(() => {
        router.push('/')
        window.location.reload()
      }, 2000)
    } catch (err) {
      setError('Signup failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center gradient-bg py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-5">
            <div className="card border-0 shadow-lg" style={{ borderRadius: '15px' }}>
              
              {/* Header */}
              <div className="card-header gradient-green text-white text-center py-4 border-0" style={{ borderRadius: '15px 15px 0 0' }}>
                <h1 className="mb-2 fw-bold">🔴 Pokédex Lite</h1>
                <p className="mb-0 small">Create Account</p>
              </div>

              {/* Body */}
              <div className="card-body p-4">
                
                {/* Error Alert */}
                {error && (
                  <div className="alert alert-danger mb-3 small">{error}</div>
                )}

                {/* Success Alert */}
                {success && (
                  <div className="alert alert-success mb-3 small">{success}</div>
                )}

                {/* Form */}
                <form onSubmit={handleSignup}>
                  
                  {/* Name */}
                  <div className="mb-3">
                    <label className="form-label fw-bold">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ash Ketchum"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-3">
                    <label className="form-label fw-bold">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
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
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Min. 6 characters"
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

                  {/* Confirm Password */}
                  <div className="mb-3">
                    <label className="form-label fw-bold">Confirm Password</label>
                    <div className="input-group">
                      <input
                        type={showConfirm ? 'text' : 'password'}
                        className="form-control"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Re-enter password"
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowConfirm(!showConfirm)}
                      >
                        {showConfirm ? '👁️' : '👁️‍🗨️'}
                      </button>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="form-check mb-3">
                    <input className="form-check-input" type="checkbox" id="terms" required />
                    <label className="form-check-label small" htmlFor="terms">
                      I agree to the Terms & Conditions
                    </label>
                  </div>

                  {/* Sign Up Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-success w-100 fw-bold"
                    style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', border: 'none' }}
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </button>
                </form>

                {/* Divider */}
                <div className="d-flex align-items-center my-3">
                  <hr className="flex-grow-1" />
                  <span className="px-2 small text-muted">OR</span>
                  <hr className="flex-grow-1" />
                </div>

                {/* Google Button */}
                <button className="btn btn-outline-secondary w-100 fw-bold mb-3">
                  🔵 Sign up with Google
                </button>

              </div>

              {/* Footer */}
              <div className="card-footer bg-light text-center py-3 border-top">
                <small>
                  Already have an account?{' '}
                  <button
                    onClick={onSwitchToLogin}
                    className="btn btn-link p-0 text-success fw-bold text-decoration-none"
                  >
                    Sign In
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