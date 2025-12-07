'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Header({ userInfo, onLogout }: { userInfo: any; onLogout: () => void }) {
  const router = useRouter()
  const [showDropdown, setShowDropdown] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('userInfo')
    onLogout()
    setShowDropdown(false)
    router.push('/')
    window.location.reload()
  }

  return (
    <nav className="navbar navbar-dark gradient-blue sticky-top shadow">
      <div className="container-fluid px-4">
        
        {/* Logo */}
        <a className="navbar-brand fw-bold" href="#">
          🔴 Pokédex Lite
        </a>

        {/* User Menu */}
        {userInfo && (
          <div className="dropdown">
            <button
              className="btn btn-light btn-sm d-flex align-items-center gap-2"
              onClick={() => setShowDropdown(!showDropdown)}
              style={{ borderRadius: '20px' }}
            >
              <img
                src={userInfo.picture}
                alt={userInfo.name}
                style={{ width: '32px', height: '32px', borderRadius: '50%' }}
              />
              <span className="d-none d-sm-inline">{userInfo.name}</span>
            </button>

            {showDropdown && (
              <div className="dropdown-menu dropdown-menu-end show shadow" style={{ minWidth: '200px' }}>
                <h6 className="dropdown-header fw-bold">{userInfo.name}</h6>
                <small className="dropdown-header text-muted">{userInfo.email}</small>
                <hr className="dropdown-divider" />
                <a href="#" className="dropdown-item">❤️ My Favorites</a>
                <a href="#" className="dropdown-item">⚙️ Settings</a>
                <a href="#" className="dropdown-item">ℹ️ Help</a>
                <hr className="dropdown-divider" />
                <button
                  onClick={handleLogout}
                  className="dropdown-item text-danger fw-bold"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}