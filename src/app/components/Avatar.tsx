interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export default function Avatar({ name, size = 'md', className = '' }: AvatarProps) {
  // Generate a consistent realistic photo based on name
  const getAvatarUrl = (name: string) => {
    // Create a deterministic seed from the name
    const seed = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

    // Use Unsplash API for realistic portrait photos
    // The seed ensures the same person always gets the same photo
    return `https://i.pravatar.cc/300?img=${(seed % 70) + 1}`;
  };

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
    xl: 'w-32 h-32'
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden bg-gray-200 ${className}`}>
      <img
        src={getAvatarUrl(name)}
        alt={name}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
