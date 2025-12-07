'use client'

interface FilterTypeProps {
  types: string[]
  selectedType: string
  setSelectedType: (type: string) => void
}

export default function FilterType({
  types,
  selectedType,
  setSelectedType,
}: FilterTypeProps) {
  return (
    <div className="mb-4">
      <label className="form-label text-white fw-bold mb-2" style={{ fontSize: '0.95rem' }}>
        Filter by Type:
      </label>
      <select
        className="form-select"
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        style={{
          borderRadius: '12px',
          border: '2px solid rgba(255,255,255,0.3)',
          backgroundColor: 'rgba(255,255,255,0.95)',
          fontSize: '0.95rem',
          padding: '10px 12px'
        }}
      >
        <option value="">All Types</option>
        {types.map((type) => (
          <option key={type} value={type} style={{ textTransform: 'capitalize' }}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>
    </div>
  )
}