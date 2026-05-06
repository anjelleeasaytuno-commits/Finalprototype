import horrorImage from '../../imports/image.png';

interface CommunityIconProps {
  communityName: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function CommunityIcon({ communityName, size = 'md', className = '' }: CommunityIconProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  // Map community names to their image sources
  const getCommunityImage = (name: string) => {
    const imageMap: { [key: string]: string } = {
      'Horror': horrorImage,
      'Sci-Fi': 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=400&fit=crop',
      'Fantasy': 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=400&fit=crop',
      'Animation': 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?w=400&h=400&fit=crop',
      'Game Design': 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=400&fit=crop',
      'Music': 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop'
    };

    return imageMap[name] || 'https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?w=400&h=400&fit=crop';
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <img
        src={getCommunityImage(communityName)}
        alt={`${communityName} community`}
        className="w-full h-full object-cover object-center"
      />
    </div>
  );
}
