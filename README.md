# 🔴 Pokédex Lite - SSR

A modern, responsive Pokémon browsing application built with **Next.js 16** and **Bootstrap 5**. Users can authenticate via email or Google, browse 150+ Pokémon, filter by type, search, and manage their favorite Pokémon.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [Components Explanation](#components-explanation)
- [APIs Used](#apis-used)
- [Google OAuth Setup](#google-oauth-setup)
- [Styling & Design](#styling--design)
- [Performance & Optimization](#performance--optimization)
- [Future Enhancements](#future-enhancements)

---

## 🎯 Project Overview

**Pokédex Lite** is a full-stack web application that allows trainers to:

- ✅ Create accounts or login with Google
- ✅ Browse 150+ Pokémon from the official Pokémon API
- ✅ Search Pokémon by name
- ✅ Filter by Pokémon type (Fire, Water, Grass, etc.)
- ✅ View detailed Pokémon statistics and abilities
- ✅ Add/remove Pokémon to favorites
- ✅ Responsive design for mobile, tablet, and desktop

---

## ✨ Features

### Authentication

- **Email/Password Login** - Traditional authentication with localStorage
- **Google OAuth 2.0** - Sign in with Google account using NextAuth.js
- **Session Management** - User data persists across sessions
- **Protected Routes** - Only authenticated users can browse Pokémon

### Pokémon Browsing

- **Pagination** - 12 Pokémon per page with navigation controls
- **Search Functionality** - Real-time search by Pokémon name
- **Type Filtering** - Filter Pokémon by their type (Normal, Fire, Water, etc.)
- **Favorites System** - Save favorite Pokémon to localStorage

### User Experience

- **Beautiful UI** - Modern card design with smooth animations
- **Modal Details** - Click to view complete Pokémon stats
- **Responsive Layout** - Works perfectly on all devices
- **Loading States** - Spinner while data is loading
- **Error Handling** - Graceful error messages

---

## 🛠️ Tech Stack

### Frontend Framework

- **Next.js 16.0.7** - React framework with SSR (Server-Side Rendering)
- **React 19** - UI component library
- **TypeScript** - Type-safe JavaScript

### Authentication & Session

- **NextAuth.js 5** - Authentication library
- **Google OAuth 2.0** - Google authentication provider
- **localStorage** - Client-side data persistence

### UI & Styling

- **Bootstrap 5.3** - CSS framework for responsive design
- **Bootstrap Icons** - Icon library for buttons and UI elements
- **Custom CSS** - Gradient backgrounds, animations, transitions

### State Management

- **React Hooks** - useState, useEffect for state management
- **Next.js Router** - Client-side navigation with useRouter

### API & Data

- **PokéAPI** - Official Pokémon RESTful API
- **Fetch API** - Client-side HTTP requests

### Development Tools

- **Node.js & npm** - Package manager and runtime
- **Turbopack** - Fast JavaScript bundler

---

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Google OAuth credentials (for Google login)

### Step 1: Clone/Open Project

```bash
cd "e:\Assignment JOB\Uttam_Frontet\pokedex-lite-ssr"
```

### Step 2: Install Dependencies

```bash
npm install
```

Required packages:

- `next@16.0.7` - Next.js framework
- `react@19` - React library
- `bootstrap@5.3.0` - CSS framework
- `bootstrap-icons@1.11.0` - Icon library
- `next-auth@5` - Authentication
- `typescript` - TypeScript support

### Step 3: Setup Environment Variables

Create `.env.local` file:

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-this
```

### Step 4: Run Development Server

```bash
npm run dev
```

Application will be available at: **http://localhost:3000**

### Step 5: Build for Production

```bash
npm run build
npm start
```

---

## 🔐 Environment Variables

| Variable               | Description            | Example                                           |
| ---------------------- | ---------------------- | ------------------------------------------------- |
| `GOOGLE_CLIENT_ID`     | Google OAuth Client ID | `1234567890-abc...xyz.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Secret    | `GOCSPX-1234567890...`                            |
| `NEXTAUTH_URL`         | Your app URL           | `http://localhost:3000`                           |
| `NEXTAUTH_SECRET`      | Session encryption key | `random-secret-string`                            |

### How to Get Google Credentials:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project → "Pokédex Lite"
3. Enable Google+ API
4. Create OAuth 2.0 Client ID (Web application)
5. Add authorized URLs:
   - `http://localhost:3000`
   - `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID & Secret to `.env.local`

---

## 📁 Project Structure

```
pokedex-lite-ssr/
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts          # NextAuth configuration
│   ├── components/
│   │   ├── AuthLogin.tsx             # Login form with Google OAuth
│   │   ├── AuthSignup.tsx            # Signup form with Google OAuth
│   │   ├── Header.tsx                # Navigation header with user menu
│   │   ├── SearchBar.tsx             # Pokémon search input
│   │   ├── FilterType.tsx            # Type filter dropdown
│   │   ├── PokemonCard.tsx           # Individual Pokémon card component
│   │   ├── PokemonList.tsx           # Grid of Pokémon cards
│   │   ├── PokemonModal.tsx          # Detail modal popup
│   │   └── Pagination.tsx            # Page navigation
│   ├── layout.tsx                    # Root layout with SessionProvider
│   ├── page.tsx                      # Main home page (SSR)
│   ├── globals.css                   # Global styles & animations
│   └── .env.local                    # Environment variables
├── .next/                            # Build output (auto-generated)
├── node_modules/                     # Dependencies (auto-generated)
├── package.json                      # Project dependencies & scripts
├── package-lock.json                 # Locked dependency versions
├── tsconfig.json                     # TypeScript configuration
├── next.config.js                    # Next.js configuration
└── README.md                         # This file
```

---

## 🔄 How It Works

### 1️⃣ **Authentication Flow**

#### Email/Password Login:

```
User → AuthLogin Component → handleLogin()
  → Validate email & password
  → Store userInfo to localStorage
  → Redirect to home page
```

#### Google OAuth Login:

```
User → Click "Sign in with Google"
  → NextAuth.js redirects to Google
  → User authenticates with Google
  → Google redirects back to /api/auth/callback/google
  → Session created
  → User data stored in localStorage
  → Redirect to home page
```

### 2️⃣ **Data Flow**

```
Home Page (page.tsx)
  ↓
Fetch from PokéAPI (151 Pokémon)
  ↓
Store in React state: pokemon[]
  ↓
Apply Filters:
  - Search by name
  - Filter by type
  ↓
Paginate (12 per page)
  ↓
Pass to PokemonList Component
  ↓
Render PokemonCard for each Pokémon
```

### 3️⃣ **State Management**

```typescript
// In page.tsx
const [pokemon, setPokemon] = useState<any[]>([]); // All Pokémon
const [filteredPokemon, setFilteredPokemon] = useState<any[]>([]); // Filtered results
const [favorites, setFavorites] = useState<number[]>([]); // Favorite IDs
const [searchTerm, setSearchTerm] = useState(""); // Search input
const [selectedType, setSelectedType] = useState(""); // Selected type filter
const [currentPage, setCurrentPage] = useState(1); // Current page number
const [selectedPokemon, setSelectedPokemon] = useState<any>(null); // Modal Pokémon
```

### 4️⃣ **Favorites System**

```
User clicks ❤️ on card
  ↓
onFavorite(pokemonId) called
  ↓
If already favorited:
  - Remove from favorites array
Else:
  - Add to favorites array
  ↓
Save to localStorage: favorites = [1, 4, 7, ...]
  ↓
Re-render with updated isFavorited state
```

---

## 🧩 Components Explanation

### **AuthLogin.tsx**

- **Purpose**: Login form with email/password and Google OAuth
- **Features**:
  - Email & password input validation
  - Show/hide password toggle
  - Google OAuth integration
  - Error handling
- **Stores**: User info to localStorage
- **Redirects**: To home page on success

### **AuthSignup.tsx**

- **Purpose**: User registration form
- **Features**:
  - Full name, email, password input
  - Password confirmation validation
  - Google OAuth signup
  - Min 6 character password requirement
- **Validation**: Password match, length check
- **Stores**: New user info to localStorage

### **Header.tsx**

- **Purpose**: Navigation bar with user menu
- **Features**:
  - Logo and title
  - User profile dropdown
  - Logout functionality
  - Profile picture from Google/Avatar API
- **Shows**: User name, email, profile options

### **SearchBar.tsx**

- **Purpose**: Real-time Pokémon search
- **Features**:
  - Input field for search term
  - Updates state onChange
  - Styled with Bootstrap
- **Triggers**: Filter recalculation in parent component

### **FilterType.tsx**

- **Purpose**: Filter Pokémon by type
- **Features**:
  - Dropdown with all available types
  - "All Types" option
  - Dynamically populated from API data
- **Updates**: selectedType state

### **PokemonCard.tsx**

- **Purpose**: Individual Pokémon card display
- **Props**: pokemon object, isFavorited boolean, callbacks
- **Features**:
  - Pokémon image display
  - Name and type badges
  - HP and ATK stats
  - Like/Favorite button
  - View details button
  - Hover animations
- **Colors**: Type-specific badge colors (Fire=Orange, Water=Blue, etc.)

### **PokemonList.tsx**

- **Purpose**: Grid layout of Pokémon cards
- **Features**:
  - Responsive grid (4 cols desktop, 2 cols tablet, 1 col mobile)
  - Maps over pokémon array
  - Passes props to each card
  - Empty state handling
- **Layout**: Bootstrap row/col system

### **PokemonModal.tsx**

- **Purpose**: Detailed Pokémon information popup
- **Features**:
  - Large Pokémon image
  - Complete stats with progress bars
  - Abilities list
  - Height and weight
  - Like/Unlike button
  - Close button
- **Triggers**: When user clicks "View" on card

### **Pagination.tsx**

- **Purpose**: Navigate between pages
- **Features**:
  - Previous/Next buttons
  - Page number buttons (max 5 visible)
  - Disabled state at boundaries
  - Bootstrap styling
- **Updates**: currentPage state

---

## 🌐 APIs Used

### **PokéAPI (https://pokeapi.co/api/v2/)**

#### Endpoint 1: Get All Pokémon

```javascript
GET /pokemon?limit=151
// Returns: First 151 Pokémon with URLs

Response:
{
  "results": [
    { "name": "bulbasaur", "url": "https://pokeapi.co/api/v2/pokemon/1/" },
    { "name": "ivysaur", "url": "https://pokeapi.co/api/v2/pokemon/2/" },
    ...
  ]
}
```

#### Endpoint 2: Get Pokémon Details

```javascript
GET /pokemon/{id-or-name}
// Returns: Complete Pokémon data

Response:
{
  "id": 1,
  "name": "bulbasaur",
  "sprites": {
    "other": {
      "official-artwork": {
        "front_default": "https://raw.githubusercontent.com/..."
      }
    }
  },
  "types": [
    { "type": { "name": "grass" } },
    { "type": { "name": "poison" } }
  ],
  "stats": [
    { "stat": { "name": "hp" }, "base_stat": 45 },
    { "stat": { "name": "attack" }, "base_stat": 49 },
    ...
  ],
  "abilities": [
    { "ability": { "name": "overgrow" } }
  ],
  "height": 7,
  "weight": 69
}
```

---

## 🔐 Google OAuth Setup

### **Step-by-Step Guide:**

1. **Create Google Cloud Project**

   - Go to https://console.cloud.google.com/
   - Click "Select a project" → "New project"
   - Name: "Pokédex Lite"
   - Click "Create"

2. **Enable Google+ API**

   - Go to "APIs & Services" → "Library"
   - Search "Google+ API"
   - Click "Enable"

3. **Create OAuth Credentials**

   - Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
   - Choose "Web application"
   - Name: "Pokédex Lite"

4. **Configure Authorized URLs**

   - Add these Authorized JavaScript origins:

     - `http://localhost:3000`
     - `http://localhost:3000` (for production)

   - Add these Authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google`
     - `http://localhost:3000/api/auth/callback/google` (for production)

5. **Copy Credentials**
   - Copy "Client ID"
   - Copy "Client Secret"
   - Paste into `.env.local`

### **NextAuth.js Configuration (route.ts)**

```typescript
providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    allowDangerousEmailAccountLinking: true,
  }),
],
```

---

## 🎨 Styling & Design

### **Design System**

#### **Colors**

```css
Primary Gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
Blue Gradient: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)
Green Gradient: linear-gradient(135deg, #10b981 0%, #059669 100%)
```

#### **Typography**

- Font: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- Primary headings: fw-bold, fw-black
- Labels: fw-semibold

#### **Spacing**

- Card padding: p-3, p-4, p-md-5
- Gaps: g-2, g-3
- Margins: mb-3, mb-4

### **Animations**

```css
fadeIn (0.6s)       - Page load fade in
slideUp (0.8s)      - Cards slide up on load
slideDown (0.6s)    - Header slide down
float (3s infinite) - Pokemon icon floating
bounce (2s)         - Button bounces
pulse (2s)          - Loading pulse effect
glow (2s)           - Glowing shadow effect
```

### **Responsive Design**

#### **Breakpoints**

- **Mobile** (< 576px): 1 column, 100% width
- **Tablet** (576px - 767px): 2 columns, 50% width
- **Desktop** (768px - 991px): 3 columns, 33% width
- **Large Desktop** (≥ 992px): 4 columns, 25% width

#### **Bootstrap Classes Used**

```html
col-12 col-sm-6 col-md-4 col-lg-3
<!-- Responsive 1 → 2 → 3 → 4 columns -->
```

---

## ⚡ Performance & Optimization

### **Why We Use Next.js 16:**

1. **Server-Side Rendering (SSR)**

   - Pages render on server for better SEO
   - Faster first page load
   - Better performance for slower devices

2. **Image Optimization**

   - Next.js Image component (when used)
   - Automatic format conversion
   - Lazy loading

3. **Code Splitting**

   - Automatic route-based splitting
   - Smaller JavaScript bundles
   - Faster page transitions

4. **Built-in Performance**
   - CSS optimization
   - Minification
   - Tree shaking

### **Optimization Techniques Used:**

```typescript
// 1. Memoization (could be added)
const MemoCard = React.memo(PokemonCard)

// 2. Lazy Loading Images
onError={(e) => {
  (e.target as any).src = 'https://via.placeholder.com/100'
}}

// 3. Pagination (not loading all 151 at once)
const itemsPerPage = 12
const paginatedPokemon = filteredPokemon.slice(startIndex, endIndex)

// 4. Array safety checks
if (!pokemon || !Array.isArray(pokemon))
```

---

## 🚀 Deployment

### **Deploy to Vercel (Recommended)**

1. Push code to GitHub
2. Connect GitHub to Vercel
3. Add environment variables in Vercel dashboard:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `NEXTAUTH_URL` (your production URL)
   - `NEXTAUTH_SECRET` (new secret for production)
4. Deploy automatically on push

### **Other Deployment Options:**

- **Netlify** - JAMstack deployment
- **Railway** - Node.js hosting
- **Heroku** - Cloud platform
- **AWS** - Enterprise solution

---

## 🔮 Future Enhancements

### **Planned Features:**

- [ ] **Database Integration** - Store user accounts and favorites in MongoDB/PostgreSQL
- [ ] **Advanced Search** - Filter by stats, abilities, generation
- [ ] **Team Builder** - Create custom Pokémon teams
- [ ] **Comparison Tool** - Compare stats of multiple Pokémon
- [ ] **User Profiles** - Public profiles with their favorite Pokémon
- [ ] **Dark Mode** - Toggle between light and dark themes
- [ ] **Mobile App** - React Native version
- [ ] **Caching** - Redis for faster API responses
- [ ] **Notifications** - Push notifications for new Pokémon
- [ ] **Comments & Ratings** - Community features

---

## 📊 Database Schema (For Future Use)

```sql
-- Users Table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE,
  name VARCHAR(255),
  picture VARCHAR(255),
  google_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Favorites Table
CREATE TABLE favorites (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  pokemon_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Teams Table
CREATE TABLE teams (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

## 🐛 Troubleshooting

### **Error: "Module not found: Can't resolve './globals.css'"**

- **Solution**: Make sure `globals.css` is in `app/` folder, not `components/`
- **Fix**: Update import path in `layout.tsx`: `import './globals.css'`

### **Error: "pokemon.map is not a function"**

- **Solution**: Add safety check in component
- **Fix**: `if (!Array.isArray(pokemon)) return null`

### **Google Login Not Working**

- **Check**:
  - Correct Client ID and Secret in `.env.local`
  - Authorized URLs configured in Google Cloud
  - `NEXTAUTH_URL` matches your domain
  - SessionProvider wraps app in layout.tsx

### **Favorites Not Persisting**

- **Check**:
  - localStorage is enabled in browser
  - Check localStorage keys: `favorites`, `userInfo`
  - Clear browser cache if issues persist

---

## 📚 Learning Resources

- **Next.js Docs**: https://nextjs.org/docs
- **NextAuth.js**: https://next-auth.js.org/
- **Bootstrap 5**: https://getbootstrap.com/
- **PokéAPI**: https://pokeapi.co/
- **React Hooks**: https://react.dev/reference/react/hooks
- **TypeScript**: https://www.typescriptlang.org/docs/

---

## 📝 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

**Pokédex Lite** - Created as a modern web application demonstrating:

- Next.js 16 with Server-Side Rendering
- NextAuth.js for authentication
- Bootstrap 5 for responsive design
- RESTful API consumption
- State management with React Hooks
- Google OAuth 2.0 integration

**Project Date**: December 2025
**Next.js Version**: 16.0.7
**React Version**: 19.0.0

---

## 🤝 Contributing

Feel free to fork, modify, and improve this project!

**Contributing Steps:**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📞 Support

For issues or questions:

- Create an issue on GitHub
- Check existing issues first
- Provide detailed error messages
- Include your environment details

---

**Happy Pokémon Hunting! 🎮💛**

Made with ❤️ using Next.js, React, Bootstrap, and NextAuth.js
