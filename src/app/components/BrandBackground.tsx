export default function BrandBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 0, 139, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 0, 139, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: 'center center'
        }}
      />

      {/* Large Pink-Magenta Gradient Blob (top right) */}
      <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full blur-[120px] opacity-80"
        style={{
          background: 'radial-gradient(circle, #ec4899 0%, #a8008a 30%, #8B008B 50%, transparent 70%)'
        }}
      />

      {/* Magenta Blob (bottom left) */}
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full blur-[100px] opacity-70"
        style={{
          background: 'radial-gradient(circle, #8B008B 0%, #6B0069 40%, transparent 70%)'
        }}
      />

      {/* Cyan-Blue Accent (middle) */}
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full blur-[90px] opacity-50"
        style={{
          background: 'radial-gradient(circle, #06b6d4 0%, #3b82f6 50%, transparent 70%)'
        }}
      />

      {/* Yellow accents */}
      <div className="absolute bottom-20 left-8 w-48 h-48 opacity-40"
        style={{
          background: 'linear-gradient(135deg, #FFFF00 0%, #fbbf24 40%, transparent 70%)',
          clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)'
        }}
      />

      <div className="absolute top-1/4 right-12 w-40 h-40 opacity-35"
        style={{
          background: 'linear-gradient(225deg, #FFFF00 0%, transparent 70%)',
          clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 80%)'
        }}
      />

      {/* Additional magenta glow for depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[150px] opacity-30"
        style={{
          background: 'radial-gradient(circle, #9B009B 0%, transparent 60%)'
        }}
      />
    </div>
  );
}
