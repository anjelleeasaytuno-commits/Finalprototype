import { useState } from 'react';
import { Search, User, Home, Calendar, MoreHorizontal, Bookmark, Check, ChevronLeft, Plus, Settings, Power, ChevronRight, Users, Edit2 } from 'lucide-react';
import BrandBackground from './components/BrandBackground';
import Avatar from './components/Avatar';
import CommunityIcon from './components/CommunityIcon';

type Screen = 'create-account' | 'personalize' | 'discover' | 'community' | 'community-discover' | 'full-discover-users' | 'user-profile' | 'schedule-view' | 'my-profile' | 'edit-profile' | 'personal-schedule' | 'qr-code';
type BookingState = 'none' | 'booking' | 'success' | 'cancel-confirm';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('create-account');
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState<number | null>(null);
  const [showMoreUsers, setShowMoreUsers] = useState(false);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [bookingState, setBookingState] = useState<BookingState>('none');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedPurpose, setSelectedPurpose] = useState<string[]>([]);
  const [purposeText, setPurposeText] = useState('');
  const [myProfileName, setMyProfileName] = useState('Alex');
  const [myProfileSchool, setMyProfileSchool] = useState('ICT STUDENT @ FONTYS UNIVERSITY');
  const [myAvailability, setMyAvailability] = useState<'busy' | 'available'>('available');
  const [myInterestTags, setMyInterestTags] = useState<string[]>(['anime', 'gaming']);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const creativeFields = [
    { id: 'animation', label: 'Animation' },
    { id: 'game-design', label: 'Game Design' },
    { id: '3d-art', label: '3D Art' },
    { id: 'motion-design', label: 'Motion Design' },
    { id: 'illustration', label: 'Illustration' },
    { id: 'vfx', label: 'VFX' }
  ];

  const topics = [
    { id: 'storytelling', label: 'Storytelling' },
    { id: 'sound-design', label: 'Sound Design' },
    { id: 'typography', label: 'Typography' },
    { id: 'new-media', label: 'New Media' },
    { id: 'world-building', label: 'World Building' },
    { id: 'animation-topic', label: 'Animation' }
  ];

  const goals = [
    { id: 'networking', label: 'Networking' },
    { id: 'portfolio-feedback', label: 'Portfolio Feedback' },
    { id: 'collaboration', label: 'Collaboration' },
    { id: 'job-opportunities', label: 'Job Opportunities' },
    { id: 'learning', label: 'Learning' }
  ];

  const communities = [
    { id: 1, name: 'Horror', members: '2.5k', color: 'from-orange-500 to-red-600' },
    { id: 2, name: 'Sci-Fi', members: '3.1k', color: 'from-blue-500 to-cyan-400' },
    { id: 3, name: 'Fantasy', members: '1.8k', color: 'from-[#8B008B] to-pink-500' },
    { id: 4, name: 'Animation', members: '920', color: 'from-yellow-400 to-orange-500' },
    { id: 5, name: 'Game Design', members: '1.2k', color: 'from-green-500 to-teal-500' },
    { id: 6, name: 'Music', members: '650', color: 'from-pink-500 to-[#8B008B]' }
  ];

  const allUsers = [
    {
      id: 1,
      name: 'Alex v. damme',
      title: 'Game Designer',
      school: 'Gobelins School',
      tags: ['Game Design', 'Storytelling'],
      communityId: 1
    },
    {
      id: 2,
      name: 'Maria Gomes',
      title: 'UI student',
      school: 'Fonys Hogeschool',
      tags: ['Animation', 'Networking'],
      communityId: 1
    },
    {
      id: 3,
      name: 'Lexi Lemmings',
      title: 'VFX animator',
      school: 'Escape studios',
      tags: ['Storytelling', 'Game Design'],
      communityId: 1
    },
    {
      id: 4,
      name: 'Sarah Chen',
      title: '3D Artist',
      school: 'SCAD',
      tags: ['3D Art', 'VFX'],
      communityId: 1
    },
    {
      id: 5,
      name: 'Tom Anderson',
      title: 'Sound Designer',
      school: 'Berklee',
      tags: ['Sound Design', 'Music'],
      communityId: 1
    }
  ];

  const meetups = [
    {
      id: 1,
      author: 'Eric Peters',
      title: 'Students that want feedback',
      description: 'Students that want feedback for their portfolio, I will be in the cafeteria area in 10 mins',
      time: '10 mins',
      attendees: 12,
      tags: ['Feedback', '12 people']
    },
    {
      id: 2,
      author: 'Maria Gonzales',
      title: 'Hey! Anyone want to talk',
      description: 'Hey! Anyone want to talk about the new one piece season in 15 minutes in the break area?',
      time: '15 mins',
      attendees: 8,
      tags: ['Social', '8 people']
    }
  ];

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleCreateAccount = () => {
    if (email && password && agreedToTerms) {
      setCurrentScreen('personalize');
    }
  };

  const handleContinue = () => {
    if (selectedInterests.length >= 3) {
      setCurrentScreen('discover');
    }
  };

  const navigateToTab = (screen: Screen) => {
    setCurrentScreen(screen);
    setShowMoreMenu(false);
  };

  const selectCommunity = (communityId: number) => {
    setSelectedCommunity(communityId);
    setShowMoreUsers(false);
    setCurrentScreen('community-discover');
  };

  const currentCommunity = communities.find(c => c.id === selectedCommunity);
  const communityUsers = showMoreUsers ? allUsers : allUsers.slice(0, 2);
  const currentUserProfile = allUsers.find(u => u.id === selectedUser);

  const timeSlots = [
    { time: '09:00', available: false },
    { time: '10:00', available: false },
    { time: '11:00', available: false },
    { time: '12:00', available: true },
    { time: '13:00', available: true },
    { time: '14:00', available: true },
    { time: '15:00', available: true },
    { time: '16:00', available: false },
    { time: '17:00', available: false }
  ];

  const locations = ['HALL A', 'HALL DI', 'HALL A (FREE ENTERACNE)', 'HALL B', 'HALL D2', 'PIFF @NETLABB'];
  const purposes = ['PORTFOLIO', 'PROJECT', 'MEETUP', 'INTEREST TALK'];

  const personalEvents = [
    { time: '09:00', title: 'Doors Open', duration: '9:30-10:00' },
    { time: '11:00', title: 'Matt Nava', subtitle: '(Gaint Squid Studios)', duration: '11:15-12:00' },
    { time: '16:00', title: 'Wrap up', duration: '15:50-15:55' }
  ];

  const togglePurpose = (purpose: string) => {
    setSelectedPurpose(prev =>
      prev.includes(purpose) ? prev.filter(p => p !== purpose) : [...prev, purpose]
    );
  };

  const openUserProfile = (userId: number) => {
    setSelectedUser(userId);
    setCurrentScreen('user-profile');
  };

  const openSchedule = () => {
    setCurrentScreen('schedule-view');
  };

  const selectTimeSlot = (time: string) => {
    setSelectedTimeSlot(time);
    setBookingState('booking');
  };

  const applyBooking = () => {
    if (selectedLocation && selectedTimeSlot && (selectedPurpose.length > 0 || purposeText)) {
      setBookingState('success');
    }
  };

  const resetBooking = () => {
    setBookingState('none');
    setSelectedTimeSlot('');
    setSelectedLocation('');
    setSelectedPurpose([]);
    setPurposeText('');
  };

  const confirmCancelBooking = () => {
    setBookingState('cancel-confirm');
  };

  const handleCancelYes = () => {
    setBookingState('booking');
  };

  const handleCancelNo = () => {
    resetBooking();
    setCurrentScreen('user-profile');
  };

  const updateProfile = () => {
    setCurrentScreen('my-profile');
  };

  const cancelEditProfile = () => {
    setCurrentScreen('my-profile');
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#000000' }}>
      {/* Decorative Background */}
      <BrandBackground />

      {/* Main Content */}
      <div className="relative max-w-md mx-auto min-h-screen shadow-2xl z-10" style={{ background: 'transparent' }}>

        {/* CREATE ACCOUNT SCREEN */}
        {currentScreen === 'create-account' && (
          <div className="px-6 pt-12 pb-8 flex flex-col min-h-screen">
            <h1 className="lowercase tracking-tight text-center mb-8"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                fontWeight: '700',
                letterSpacing: '-0.02em',
                color: '#ffffff'
              }}>
              create account.
            </h1>

            <div className="relative mb-12 mx-auto">
              <div className="w-48 h-48 rounded-3xl bg-[#1a1a1a] border-[3px] border-[#8B008B]/50 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#8B008B] to-pink-500 opacity-60" />
                <div className="relative z-10 text-center">
                  <div className="bg-pink-500 rounded-full w-12 h-12 flex items-center justify-center text-white text-sm mb-2 mx-auto"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: '700' }}>
                    are
                  </div>
                  <div className="text-white text-4xl mb-1"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: '700' }}>
                    APL
                  </div>
                  <div className="bg-blue-600 px-3 py-1 rounded text-white text-xs"
                    style={{ fontFamily: 'var(--font-body)', fontWeight: '500' }}>
                    Department
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-white text-sm mb-2 uppercase tracking-wide"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: '500' }}>
                  EMAIL
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FFFF00] border-2 border-[#FFFF00] rounded-2xl px-5 py-4 text-black placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FFFF00]"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: '500' }}
                />
              </div>

              <div>
                <label className="block text-white text-sm mb-2 uppercase tracking-wide"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: '500' }}>
                  PASSWORD
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#FFFF00] border-2 border-[#FFFF00] rounded-2xl px-5 py-4 text-black placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FFFF00]"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: '500' }}
                />
              </div>

              <div className="flex items-start gap-3 pt-2">
                <button
                  onClick={() => setAgreedToTerms(!agreedToTerms)}
                  className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    agreedToTerms ? 'bg-[#FFFF00] border-[#FFFF00]' : 'bg-[#1a1a1a] border-[#8B008B]/40'
                  }`}
                >
                  {agreedToTerms && <Check className="w-4 h-4 text-black" />}
                </button>
                <p className="text-white text-sm"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: '400' }}>
                  I agree to{' '}
                  <span className="underline cursor-pointer">Terms & Conditions</span>
                </p>
              </div>
            </div>

            <button
              onClick={handleCreateAccount}
              disabled={!email || !password || !agreedToTerms}
              className="w-full py-4 rounded-full bg-[#1a1a1a] border-[3px] border-[#8B008B] text-white transition-all hover:bg-[#8B008B]/20 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'var(--font-body)', fontWeight: '600' }}
            >
              create account
            </button>
          </div>
        )}

        {/* PERSONALIZE SCREEN */}
        {currentScreen === 'personalize' && (
          <div className="px-6 pt-8 pb-32 min-h-screen">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setCurrentScreen('create-account')}
                className="w-10 h-10 rounded-full bg-[#1a1a1a] border-2 border-[#8B008B]/40 flex items-center justify-center hover:border-[#8B008B] transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <h1 className="lowercase tracking-tight"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.75rem',
                  fontWeight: '700',
                  letterSpacing: '-0.02em',
                  color: '#ffffff'
                }}>
                personalize.
              </h1>
              <div className="w-10" />
            </div>

            <p className="text-[#c080c0]/80 text-sm mb-6"
              style={{ fontFamily: 'var(--font-body)', fontWeight: '400' }}>
              Select a few interests to help you discover people at Playgrounds
            </p>

            <div className="relative mb-6">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="SEARCH FOR INTEREST..."
                className="w-full bg-[#1a1a1a] border-2 border-[#8B008B]/50 rounded-full px-14 py-3.5 text-white placeholder:text-gray-500 text-sm tracking-wide focus:outline-none focus:border-[#FFFF00] transition-all"
                style={{ fontFamily: 'var(--font-body)', fontWeight: '500' }}
              />
            </div>

            <div className="mb-6">
              <h3 className="text-white uppercase text-xs tracking-wider mb-3"
                style={{ fontFamily: 'var(--font-body)', fontWeight: '600' }}>
                CREATIVE FIELDS
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {creativeFields.map(field => (
                  <button
                    key={field.id}
                    onClick={() => toggleInterest(field.id)}
                    className={`px-5 py-2.5 rounded-full transition-all duration-300 text-sm ${
                      selectedInterests.includes(field.id)
                        ? 'bg-[#FFFF00] text-black border-2 border-[#FFFF00] shadow-lg shadow-[#FFFF00]/20'
                        : 'bg-[#1a1a1a] text-white border-2 border-[#8B008B]/40 hover:border-[#8B008B] hover:bg-[#8B008B]/10'
                    }`}
                    style={{ fontFamily: 'var(--font-body)', fontWeight: '500' }}
                  >
                    {field.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-white uppercase text-xs tracking-wider mb-3"
                style={{ fontFamily: 'var(--font-body)', fontWeight: '600' }}>
                TOPICS
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {topics.map(topic => (
                  <button
                    key={topic.id}
                    onClick={() => toggleInterest(topic.id)}
                    className={`px-5 py-2.5 rounded-full transition-all duration-300 text-sm ${
                      selectedInterests.includes(topic.id)
                        ? 'bg-[#FFFF00] text-black border-2 border-[#FFFF00] shadow-lg shadow-[#FFFF00]/20'
                        : 'bg-[#1a1a1a] text-white border-2 border-[#8B008B]/40 hover:border-[#8B008B] hover:bg-[#8B008B]/10'
                    }`}
                    style={{ fontFamily: 'var(--font-body)', fontWeight: '500' }}
                  >
                    {topic.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-white uppercase text-xs tracking-wider mb-3"
                style={{ fontFamily: 'var(--font-body)', fontWeight: '600' }}>
                GOALS
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {goals.map(goal => (
                  <button
                    key={goal.id}
                    onClick={() => toggleInterest(goal.id)}
                    className={`px-5 py-2.5 rounded-full transition-all duration-300 text-sm ${
                      selectedInterests.includes(goal.id)
                        ? 'bg-[#FFFF00] text-black border-2 border-[#FFFF00] shadow-lg shadow-[#FFFF00]/20'
                        : 'bg-[#1a1a1a] text-white border-2 border-[#8B008B]/40 hover:border-[#8B008B] hover:bg-[#8B008B]/10'
                    }`}
                    style={{ fontFamily: 'var(--font-body)', fontWeight: '500' }}
                  >
                    {goal.label}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-center text-[#c080c0]/60 text-sm mb-4"
              style={{ fontFamily: 'var(--font-body)', fontWeight: '400' }}>
              Select 3-5 interest
            </p>

            <button
              onClick={handleContinue}
              disabled={selectedInterests.length < 3}
              className="w-full py-4 rounded-full bg-[#FFFF00] text-black transition-all hover:shadow-lg shadow-[#FFFF00]/25 disabled:opacity-50 disabled:cursor-not-allowed mb-3"
              style={{ fontFamily: 'var(--font-body)', fontWeight: '600' }}
            >
              Continue
            </button>

            <button
              onClick={() => setCurrentScreen('discover')}
              className="w-full text-[#c080c0]/80 text-sm"
              style={{ fontFamily: 'var(--font-body)', fontWeight: '500' }}
            >
              Skip for now
            </button>
          </div>
        )}

        {/* DISCOVER SCREEN (HOME) */}
        {currentScreen === 'discover' && (
          <div className="min-h-screen pb-24">
            <header className="px-5 pt-6 pb-4">
              <div className="flex items-center justify-between mb-5">
                <button className="w-11 h-11 rounded-full bg-[#1a1a1a] border-2 border-[#8B008B]/40 flex items-center justify-center hover:border-[#8B008B] transition-colors">
                  <User className="w-5 h-5 text-white" />
                </button>
                <h1 className="lowercase tracking-tight"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.75rem',
                    fontWeight: '700',
                    letterSpacing: '-0.02em',
                    color: '#ffffff'
                  }}>
                  discover.
                </h1>
                <button className="w-11 h-11 rounded-full bg-[#1a1a1a] border-2 border-[#8B008B]/40 flex items-center justify-center hover:border-[#8B008B] transition-colors">
                  <Search className="w-5 h-5 text-white" />
                </button>
              </div>
            </header>

            <section className="px-5 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white lowercase"
                  style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: '700' }}>
                  explore users
                </h2>
              </div>

              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {allUsers.slice(0, 2).map((user) => (
                  <div
                    key={user.id}
                    className="relative rounded-3xl overflow-hidden border-[3px] border-[#8B008B] transition-all duration-300 hover:scale-105 cursor-pointer flex-shrink-0 w-40"
                    style={{ background: '#1a1a1a' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#8B008B] to-pink-500 opacity-20" />

                    <div className="relative p-4 text-center">
                      <div className="mx-auto mb-3 w-16 h-16 border-[3px] border-[#8B008B] rounded-full overflow-hidden shadow-lg"
                        style={{ boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)' }}>
                        <Avatar name={user.name} size="md" />
                      </div>

                      <h3 className="text-white text-sm mb-1"
                        style={{ fontFamily: 'var(--font-display)', fontWeight: '700' }}>
                        {user.name.split(' ')[0]}
                      </h3>
                      <p className="text-gray-400 text-xs" style={{ fontFamily: 'var(--font-body)' }}>
                        {user.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="px-5 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white lowercase"
                  style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: '700' }}>
                  favorite communities
                </h2>
                <button className="w-8 h-8 rounded-full bg-[#FFFF00] flex items-center justify-center">
                  <Plus className="w-5 h-5 text-black" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {communities.map((community) => (
                  <button
                    key={community.id}
                    onClick={() => selectCommunity(community.id)}
                    className="aspect-square rounded-2xl cursor-pointer hover:scale-105 transition-transform border-2 border-[#8B008B]/50 overflow-hidden relative group"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${community.color} opacity-30 group-hover:opacity-40 transition-opacity z-0`} />
                    <div className="absolute inset-0 z-10">
                      <img
                        src={
                          community.name === 'Horror' ? '/src/imports/image.png' :
                          community.name === 'Sci-Fi' ? 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=400&fit=crop' :
                          community.name === 'Fantasy' ? 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=400&fit=crop' :
                          community.name === 'Animation' ? 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?w=400&h=400&fit=crop' :
                          community.name === 'Game Design' ? 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=400&fit=crop' :
                          'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop'
                        }
                        alt={community.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* COMMUNITY SCREEN */}
        {currentScreen === 'community' && (
          <div className="min-h-screen pb-24">
            <header className="px-5 pt-6 pb-4">
              <div className="flex items-center justify-between mb-5">
                <button className="w-11 h-11 rounded-full bg-[#1a1a1a] border-2 border-[#8B008B]/40 flex items-center justify-center hover:border-[#8B008B] transition-colors">
                  <User className="w-5 h-5 text-white" />
                </button>
                <h1 className="lowercase tracking-tight"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.75rem',
                    fontWeight: '700',
                    letterSpacing: '-0.02em',
                    color: '#ffffff'
                  }}>
                  community.
                </h1>
                <button className="w-11 h-11 rounded-full bg-[#1a1a1a] border-2 border-[#8B008B]/40 flex items-center justify-center hover:border-[#8B008B] transition-colors">
                  <Plus className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="relative mb-4">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="SEARCH COMMUNITIES..."
                  className="w-full bg-[#1a1a1a] border-2 border-[#8B008B]/50 rounded-full px-14 py-3.5 text-white placeholder:text-gray-500 text-sm tracking-wide focus:outline-none focus:border-[#FFFF00] transition-all"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: '500' }}
                />
              </div>
            </header>

            <section className="px-5 mb-6">
              <h2 className="text-white lowercase mb-4"
                style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: '700' }}>
                browse communities
              </h2>

              <div className="space-y-4">
                {communities.map((community, index) => (
                  <button
                    key={community.id}
                    onClick={() => selectCommunity(community.id)}
                    className="w-full relative rounded-[2rem] overflow-hidden border-[3px] transition-all duration-300 hover:scale-[1.01] cursor-pointer group"
                    style={{
                      borderColor: index === 0 ? '#FFFF00' : index === 1 ? '#ec4899' : '#8B008B',
                      background: '#1a1a1a'
                    }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${community.color} opacity-20 group-hover:opacity-25 transition-opacity`} />

                    <div className="relative p-5 flex items-center gap-4">
                      <div
                        className="w-16 h-16 rounded-2xl border-[3px] flex-shrink-0 shadow-lg overflow-hidden relative"
                        style={{
                          borderColor: index === 0 ? '#FFFF00' : index === 1 ? '#ec4899' : '#8B008B'
                        }}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${community.color} opacity-20 z-0`} />
                        <CommunityIcon communityName={community.name} size="md" className="relative z-10" />
                      </div>

                      <div className="flex-1 min-w-0 text-left">
                        <h3 className="text-white mb-1"
                          style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: '700' }}>
                          {community.name}
                        </h3>
                        <p className="text-gray-400 text-sm" style={{ fontFamily: 'var(--font-body)', fontWeight: '500' }}>
                          {community.members} members
                        </p>
                      </div>

                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* COMMUNITY DISCOVER USERS SCREEN */}
        {currentScreen === 'community-discover' && currentCommunity && (
          <div className="min-h-screen pb-24">
            <header className="px-5 pt-6 pb-4">
              <div className="flex items-center justify-between mb-5">
                <button
                  onClick={() => setCurrentScreen('community')}
                  className="w-11 h-11 rounded-full bg-[#1a1a1a] border-2 border-[#8B008B]/40 flex items-center justify-center hover:border-[#8B008B] transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <h1 className="lowercase tracking-tight"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.75rem',
                    fontWeight: '700',
                    letterSpacing: '-0.02em',
                    color: '#ffffff'
                  }}>
                  discover users
                </h1>
                <button className="w-11 h-11 rounded-full bg-[#1a1a1a] border-2 border-[#8B008B]/40 flex items-center justify-center hover:border-[#8B008B] transition-colors">
                  <Search className="w-5 h-5 text-white" />
                </button>
              </div>
            </header>

            {/* Discover Users Section - Scrollable */}
            <section className="px-5 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white lowercase"
                  style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: '700' }}>
                  Discover users
                </h2>
                <button
                  onClick={() => setCurrentScreen('full-discover-users')}
                  className="text-[#c080c0] text-sm hover:text-[#d8a0d8] transition-colors"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: '500' }}
                >
                  more
                </button>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide">
                {allUsers.map((user, index) => (
                  <div
                    key={user.id}
                    onClick={() => openUserProfile(user.id)}
                    className="relative rounded-3xl overflow-hidden border-[3px] transition-all duration-300 hover:scale-105 cursor-pointer flex-shrink-0 w-44"
                    style={{
                      borderColor: index % 3 === 0 ? '#06b6d4' : index % 3 === 1 ? '#ec4899' : '#8B008B',
                      background: '#1a1a1a'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#8B008B] to-pink-500 opacity-20" />

                    <div className="relative p-4">
                      <div
                        className="w-16 h-16 mx-auto rounded-full border-[3px] flex-shrink-0 shadow-lg mb-3 overflow-hidden"
                        style={{
                          borderColor: index % 3 === 0 ? '#06b6d4' : index % 3 === 1 ? '#ec4899' : '#8B008B',
                          boxShadow: `0 0 20px ${
                            index % 3 === 0
                              ? 'rgba(6, 182, 212, 0.3)'
                              : index % 3 === 1
                              ? 'rgba(236, 72, 153, 0.3)'
                              : 'rgba(139, 92, 246, 0.3)'
                          }`
                        }}
                      >
                        <Avatar name={user.name} size="md" />
                      </div>

                      <h3 className="text-white text-sm mb-1 text-center truncate"
                        style={{ fontFamily: 'var(--font-display)', fontWeight: '700' }}>
                        {user.name}
                      </h3>
                      <p className="text-gray-400 text-xs text-center mb-1 truncate" style={{ fontFamily: 'var(--font-body)' }}>
                        {user.title}
                      </p>
                      <p className="text-gray-500 text-xs text-center mb-3 truncate" style={{ fontFamily: 'var(--font-body)' }}>
                        {user.school}
                      </p>

                      <button
                        className="w-full py-2 rounded-full text-xs transition-all"
                        style={{
                          background: index % 3 === 0 ? '#06b6d4' : index % 3 === 1 ? '#ec4899' : '#8B008B',
                          color: '#ffffff',
                          fontFamily: 'var(--font-body)',
                          fontWeight: '600'
                        }}
                      >
                        more→
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Meetups Section */}
            <section className="px-5 mb-6">
              <h2 className="text-white lowercase mb-4"
                style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: '700' }}>
                Meetups
              </h2>

              <div className="space-y-4">
                {meetups.map((meetup, index) => (
                  <div
                    key={meetup.id}
                    className="relative rounded-[2rem] overflow-hidden border-[3px] transition-all duration-300 hover:scale-[1.01] cursor-pointer"
                    style={{
                      borderColor: index === 0 ? '#8B008B' : '#ec4899',
                      background: '#1a1a1a'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#8B008B] to-pink-500 opacity-20" />

                    <div className="relative p-5">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#8B008B] flex-shrink-0">
                          <Avatar name={meetup.author} size="sm" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white text-sm"
                            style={{ fontFamily: 'var(--font-body)', fontWeight: '600' }}>
                            {meetup.author}
                          </h4>
                        </div>
                      </div>

                      <h3 className="text-white mb-2"
                        style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: '700' }}>
                        {meetup.title}
                      </h3>

                      <p className="text-gray-300 mb-4 text-sm leading-relaxed"
                        style={{ fontFamily: 'var(--font-body)', fontWeight: '400' }}>
                        {meetup.description}
                      </p>

                      <div className="flex items-center gap-2 flex-wrap">
                        {meetup.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 rounded-full text-xs border-2"
                            style={{
                              background: i === 0 ? '#8B008B' : '#ec4899',
                              borderColor: i === 0 ? '#8B008B' : '#ec4899',
                              color: '#ffffff',
                              fontFamily: 'var(--font-body)',
                              fontWeight: '500'
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                        <span
                          className="px-4 py-1.5 rounded-full text-xs ml-auto"
                          style={{
                            background: '#FFFF00',
                            color: '#0a0a0a',
                            fontFamily: 'var(--font-body)',
                            fontWeight: '600'
                          }}
                        >
                          {meetup.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

        {/* FULL DISCOVER USERS PAGE */}
        {currentScreen === 'full-discover-users' && (
          <div className="min-h-screen pb-24">
            <header className="px-5 pt-6 pb-4">
              <div className="flex items-center justify-between mb-5">
                <button
                  onClick={() => setCurrentScreen('community-discover')}
                  className="w-11 h-11 rounded-full bg-[#1a1a1a] border-2 border-[#8B008B]/40 flex items-center justify-center hover:border-[#8B008B] transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <h1 className="lowercase tracking-tight"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.75rem',
                    fontWeight: '700',
                    letterSpacing: '-0.02em',
                    color: '#ffffff'
                  }}>
                  discover.
                </h1>
                <button className="w-11 h-11 rounded-full bg-[#1a1a1a] border-2 border-[#8B008B]/40 flex items-center justify-center hover:border-[#8B008B] transition-colors">
                  <Search className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="relative mb-4">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="SEARCH USERS"
                  className="w-full bg-[#1a1a1a] border-2 border-[#8B008B]/50 rounded-full px-14 py-3.5 text-white placeholder:text-gray-500 text-sm tracking-wide focus:outline-none focus:border-[#FFFF00] transition-all"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: '500' }}
                />
              </div>
            </header>

            <section className="px-5 mb-6">
              <div className="space-y-4">
                {allUsers.map((user, index) => (
                  <div
                    key={user.id}
                    className="relative rounded-[2rem] overflow-hidden border-[3px] transition-all duration-300 hover:scale-[1.01] cursor-pointer group w-full"
                    style={{
                      borderColor: index === 0 ? '#06b6d4' : index === 1 ? '#ec4899' : index === 2 ? '#FFFF00' : '#8B008B',
                      background: '#1a1a1a'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#8B008B] to-pink-500 opacity-20 group-hover:opacity-25 transition-opacity" />

                    <div className="relative p-5 flex items-center gap-4">
                      <div
                        className="w-20 h-20 rounded-full border-[3px] flex-shrink-0 shadow-lg overflow-hidden"
                        style={{
                          borderColor: index === 0 ? '#06b6d4' : index === 1 ? '#ec4899' : index === 2 ? '#FFFF00' : '#8B008B',
                          boxShadow: `0 0 20px ${
                            index === 0
                              ? 'rgba(6, 182, 212, 0.3)'
                              : index === 1
                              ? 'rgba(236, 72, 153, 0.3)'
                              : index === 2
                              ? 'rgba(212, 255, 0, 0.3)'
                              : 'rgba(139, 92, 246, 0.3)'
                          }`
                        }}
                      >
                        <Avatar name={user.name} size="lg" />
                      </div>

                      <div className="flex-1 min-w-0 text-left">
                        <h3 className="text-white mb-1"
                          style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: '700' }}>
                          {user.name}
                        </h3>
                        <p className="text-gray-300 text-sm mb-0.5" style={{ fontFamily: 'var(--font-body)', fontWeight: '500' }}>
                          {user.title}
                        </p>
                        <p className="text-gray-500 text-sm mb-3" style={{ fontFamily: 'var(--font-body)', fontWeight: '400' }}>
                          {user.school}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {user.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 rounded-full bg-[#2a2a2a] text-white text-xs border-2 border-gray-700/50"
                              style={{ fontFamily: 'var(--font-body)', fontWeight: '500' }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={() => openUserProfile(user.id)}
                          className="w-full py-2.5 rounded-full text-sm transition-all flex items-center justify-center gap-2"
                          style={{
                            background: index === 0 ? '#06b6d4' : index === 1 ? '#ec4899' : index === 2 ? '#FFFF00' : '#8B008B',
                            color: index === 2 ? '#0a0a0a' : '#ffffff',
                            fontFamily: 'var(--font-body)',
                            fontWeight: '600'
                          }}
                        >
                          View Profile →
                        </button>
                      </div>

                      <button className="w-10 h-10 rounded-full bg-[#0a0a0a] border-2 border-[#8B008B]/40 flex items-center justify-center flex-shrink-0 hover:bg-[#8B008B]/20 hover:border-[#8B008B] transition-all absolute top-4 right-4">
                        <Bookmark className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* USER PROFILE SCREEN */}
        {currentScreen === 'user-profile' && currentUserProfile && (
          <div className="min-h-screen pb-24 relative">
            {/* Header */}
            <header className="px-5 pt-6 pb-4">
              <div className="flex items-center justify-between mb-5">
                <button
                  onClick={() => setCurrentScreen('full-discover-users')}
                  className="w-11 h-11 rounded-full bg-[#1a1a1a] border-2 border-[#8B008B]/40 flex items-center justify-center hover:border-[#8B008B] transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <h1 className="lowercase tracking-tight"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.75rem',
                    fontWeight: '700',
                    letterSpacing: '-0.02em',
                    color: '#ffffff'
                  }}>
                  User {currentUserProfile.name.split(' ')[0]}
                </h1>
                <button className="w-11 h-11 rounded-full bg-[#1a1a1a] border-2 border-[#8B008B]/40 flex items-center justify-center hover:border-[#8B008B] transition-colors">
                  <User className="w-5 h-5 text-white" />
                </button>
              </div>
            </header>

            {/* Profile Card */}
            <div className="px-5 mb-6">
              <div className="relative rounded-[2.5rem] overflow-hidden border-[3px] border-blue-500 p-6"
                style={{ background: '#1a1a1a' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#8B008B] to-pink-500 opacity-20" />

                <div className="relative">
                  {/* Avatar */}
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <div className="w-full h-full rounded-full overflow-hidden border-4 border-blue-500 shadow-lg"
                      style={{ boxShadow: '0 0 25px rgba(59, 130, 246, 0.4)' }}>
                      <Avatar name={currentUserProfile.name} size="xl" />
                    </div>
                    <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-[#1a1a1a]" />
                  </div>

                  <h2 className="text-white text-center mb-6"
                    style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: '700' }}>
                    {currentUserProfile.name.split(' ')[0]}
                  </h2>

                  {/* Interests */}
                  <div className="mb-6">
                    <h3 className="text-white mb-3"
                      style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: '600' }}>
                      interest
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {currentUserProfile.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 rounded-full bg-[#FFFF00] text-black text-sm"
                          style={{ fontFamily: 'var(--font-body)', fontWeight: '600' }}
                        >
                          {tag}
                        </span>
                      ))}
                      <span
                        className="px-4 py-2 rounded-full bg-[#FFFF00] text-black text-sm"
                        style={{ fontFamily: 'var(--font-body)', fontWeight: '600' }}
                      >
                        Animation
                      </span>
                    </div>
                  </div>

                  {/* Availability */}
                  <div>
                    <h3 className="text-white mb-3"
                      style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: '600' }}>
                      Availability
                    </h3>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-700">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <span className="text-white text-sm"
                        style={{ fontFamily: 'var(--font-body)', fontWeight: '500' }}>
                        Open to talk
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Connect Button */}
            <div className="px-5">
              <button
                onClick={openSchedule}
                className="w-full py-5 rounded-[2rem] bg-red-600 text-white transition-all hover:bg-red-700 shadow-lg shadow-red-600/30"
                style={{ fontFamily: 'var(--font-body)', fontSize: '1.25rem', fontWeight: '700' }}
              >
                Connect
              </button>
            </div>
          </div>
        )}

        {/* SCHEDULE VIEW SCREEN */}
        {currentScreen === 'schedule-view' && (
          <div className="min-h-screen pb-24">
            {/* Schedule Header */}
            <div className="px-5 pt-8 pb-4">
              <div className="flex gap-2 mb-6">
                <button className="flex-1 px-6 py-3 rounded-full bg-[#2a2a2a] border-2 border-gray-700 text-white text-sm"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: '600' }}>
                  D1
                  <div className="text-xs text-gray-400">15 April 2026</div>
                </button>
                <button className="flex-1 px-6 py-3 rounded-full bg-red-900 border-2 border-red-600 text-white text-sm"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: '600' }}>
                  D2
                  <div className="text-xs text-gray-300">16 April 2026</div>
                </button>
                <button className="flex-1 px-6 py-3 rounded-full bg-[#2a2a2a] border-2 border-gray-700 text-white text-sm"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: '600' }}>
                  D3
                  <div className="text-xs text-gray-400">17 April 2026</div>
                </button>
              </div>
            </div>

            {/* Time Slots */}
            <div className="px-5 pb-6">
              <div className="space-y-1">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.time}
                    onClick={() => slot.available && selectTimeSlot(slot.time)}
                    disabled={!slot.available}
                    className={`w-full py-5 rounded-2xl border-2 transition-all ${
                      slot.available
                        ? 'bg-[#2a2a2a] border-gray-700 hover:bg-[#3a3a3a] cursor-pointer'
                        : 'bg-red-900 border-red-600 cursor-not-allowed'
                    }`}
                  >
                    <span className="text-white"
                      style={{ fontFamily: 'var(--font-body)', fontSize: '1.125rem', fontWeight: '600' }}>
                      {slot.time}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Exit Button */}
            <div className="px-5 pb-6">
              <button
                onClick={() => setCurrentScreen('user-profile')}
                className="w-full py-5 rounded-[2rem] bg-red-600 text-white transition-all hover:bg-red-700"
                style={{ fontFamily: 'var(--font-body)', fontSize: '1.125rem', fontWeight: '700' }}
              >
                EXIT
              </button>
            </div>
          </div>
        )}

        {/* BOOKING POPUP */}
        {bookingState === 'booking' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="relative w-full max-w-md bg-gradient-to-b from-[#1a1a1a]/95 to-[#8B008B]/90 rounded-[2.5rem] border-[3px] border-[#8B008B]/50 overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between mb-6">
                  <button className="px-6 py-2 rounded-full bg-blue-700 text-white text-sm"
                    style={{ fontFamily: 'var(--font-body)', fontWeight: '600' }}>
                    FILTER
                  </button>
                  <button
                    onClick={resetBooking}
                    className="px-6 py-2 rounded-full bg-white text-black text-sm"
                    style={{ fontFamily: 'var(--font-body)', fontWeight: '600' }}>
                    RESET
                  </button>
                </div>

                {/* Location */}
                <div className="mb-6">
                  <h3 className="text-white flex items-center gap-2 mb-3"
                    style={{ fontFamily: 'var(--font-body)', fontSize: '1.25rem', fontWeight: '600' }}>
                    📍 Location
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {locations.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => setSelectedLocation(loc)}
                        className={`px-4 py-3 rounded-2xl text-sm transition-all ${
                          selectedLocation === loc
                            ? 'bg-blue-700 text-white border-2 border-blue-500'
                            : 'bg-[#1a1a1a] text-white border-2 border-gray-700 hover:border-gray-600'
                        }`}
                        style={{ fontFamily: 'var(--font-body)', fontWeight: '500' }}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time */}
                <div className="mb-6">
                  <h3 className="text-white flex items-center gap-2 mb-3"
                    style={{ fontFamily: 'var(--font-body)', fontSize: '1.25rem', fontWeight: '600' }}>
                    🕐 Time
                  </h3>
                  <div className="px-6 py-4 rounded-2xl bg-[#1a1a1a] text-white text-center border-2 border-gray-700"
                    style={{ fontFamily: 'var(--font-body)', fontSize: '1.125rem', fontWeight: '600' }}>
                    {selectedTimeSlot}
                  </div>
                </div>

                {/* Purpose */}
                <div className="mb-6">
                  <h3 className="text-white flex items-center gap-2 mb-3"
                    style={{ fontFamily: 'var(--font-body)', fontSize: '1.25rem', fontWeight: '600' }}>
                    👥 Purpose
                  </h3>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    {purposes.map((purpose) => (
                      <button
                        key={purpose}
                        onClick={() => togglePurpose(purpose)}
                        className={`px-4 py-3 rounded-2xl text-sm transition-all ${
                          selectedPurpose.includes(purpose)
                            ? 'bg-blue-700 text-white border-2 border-blue-500'
                            : 'bg-blue-900/50 text-white border-2 border-blue-700/50 hover:border-blue-600'
                        }`}
                        style={{ fontFamily: 'var(--font-body)', fontWeight: '500' }}
                      >
                        {purpose}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="OTHER:"
                    value={purposeText}
                    onChange={(e) => setPurposeText(e.target.value.slice(0, 100))}
                    maxLength={100}
                    className="w-full px-6 py-4 rounded-2xl bg-blue-800 text-white placeholder-blue-300 border-2 border-blue-600 focus:outline-none focus:border-blue-400 transition-all"
                    style={{ fontFamily: 'var(--font-body)', fontWeight: '500' }}
                  />
                  <p className="text-xs text-blue-300 mt-1 text-right">
                    {purposeText.length}/100 words
                  </p>
                </div>

                {/* Buttons */}
                <button
                  onClick={applyBooking}
                  className="w-full py-4 rounded-full bg-blue-700 text-white mb-3 transition-all hover:bg-blue-600"
                  style={{ fontFamily: 'var(--font-body)', fontSize: '1.125rem', fontWeight: '700' }}
                >
                  APPLY
                </button>
                <button
                  onClick={confirmCancelBooking}
                  className="w-full py-4 rounded-full bg-red-700 text-white transition-all hover:bg-red-600"
                  style={{ fontFamily: 'var(--font-body)', fontSize: '1.125rem', fontWeight: '700' }}
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SUCCESS CONFIRMATION */}
        {bookingState === 'success' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="relative w-full max-w-sm bg-gradient-to-b from-green-900/90 to-green-700/90 rounded-[2.5rem] border-[3px] border-green-500 overflow-hidden shadow-2xl p-8 text-center">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-white mb-4"
                style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: '700' }}>
                Meeting Booked!
              </h2>
              <p className="text-white mb-6"
                style={{ fontFamily: 'var(--font-body)', fontWeight: '400' }}>
                Your meeting with {currentUserProfile?.name} has been successfully scheduled for {selectedTimeSlot}.
              </p>
              <button
                onClick={() => {
                  resetBooking();
                  setCurrentScreen('user-profile');
                }}
                className="w-full py-4 rounded-full bg-white text-green-900 transition-all hover:bg-gray-100"
                style={{ fontFamily: 'var(--font-body)', fontSize: '1.125rem', fontWeight: '700' }}
              >
                Done
              </button>
            </div>
          </div>
        )}

        {/* CANCEL CONFIRMATION */}
        {bookingState === 'cancel-confirm' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="relative w-full max-w-sm bg-gradient-to-b from-red-900/90 to-red-700/90 rounded-[2.5rem] border-[3px] border-red-500 overflow-hidden shadow-2xl p-8 text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h2 className="text-white mb-4"
                style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: '700' }}>
                Are you sure?
              </h2>
              <p className="text-white mb-6"
                style={{ fontFamily: 'var(--font-body)', fontWeight: '400' }}>
                Do you want to cancel this booking?
              </p>
              <button
                onClick={handleCancelYes}
                className="w-full py-4 rounded-full bg-white text-red-900 mb-3 transition-all hover:bg-gray-100"
                style={{ fontFamily: 'var(--font-body)', fontSize: '1.125rem', fontWeight: '700' }}
              >
                Yes, go back to booking
              </button>
              <button
                onClick={handleCancelNo}
                className="w-full py-4 rounded-full bg-red-800 text-white transition-all hover:bg-red-700"
                style={{ fontFamily: 'var(--font-body)', fontSize: '1.125rem', fontWeight: '700' }}
              >
                No, return to profile
              </button>
            </div>
          </div>
        )}

        {/* MY PROFILE SCREEN */}
        {currentScreen === 'my-profile' && (
          <div className="min-h-screen pb-24 relative">
            <header className="px-5 pt-6 pb-4">
              <div className="flex items-center justify-between mb-5">
                <button
                  onClick={() => setCurrentScreen('discover')}
                  className="w-11 h-11 rounded-full bg-[#1a1a1a] border-2 border-[#8B008B]/40 flex items-center justify-center hover:border-[#8B008B] transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <h1 className="lowercase tracking-tight"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.75rem',
                    fontWeight: '700',
                    letterSpacing: '-0.02em',
                    color: '#ffffff'
                  }}>
                  my profile.
                </h1>
                <button
                  onClick={() => setCurrentScreen('edit-profile')}
                  className="w-11 h-11 rounded-full bg-[#1a1a1a] border-2 border-[#8B008B]/40 flex items-center justify-center hover:border-[#8B008B] transition-colors"
                >
                  <Edit2 className="w-5 h-5 text-white" />
                </button>
              </div>
            </header>

            <div className="px-5 mb-6">
              <div className="relative rounded-[2.5rem] overflow-hidden border-[3px] border-green-500 p-6"
                style={{ background: '#1a1a1a' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#8B008B] to-pink-500 opacity-20" />

                <div className="relative">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <div className="w-full h-full rounded-full overflow-hidden border-4 border-green-500 shadow-lg"
                      style={{ boxShadow: '0 0 25px rgba(34, 197, 94, 0.4)' }}>
                      <Avatar name={myProfileName} size="xl" />
                    </div>
                    <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-[#1a1a1a]" />
                  </div>

                  <h2 className="text-white text-center mb-2"
                    style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: '700' }}>
                    {myProfileName}
                  </h2>

                  <p className="text-gray-300 text-center mb-6 text-sm uppercase tracking-wide"
                    style={{ fontFamily: 'var(--font-body)', fontWeight: '500' }}>
                    {myProfileSchool}
                  </p>

                  <div className="mb-6">
                    <h3 className="text-white mb-3 uppercase text-xs tracking-wider"
                      style={{ fontFamily: 'var(--font-body)', fontWeight: '600' }}>
                      INTERESTS:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {myInterestTags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 rounded-full bg-[#FFFF00] text-black text-sm"
                          style={{ fontFamily: 'var(--font-body)', fontWeight: '600' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white mb-3 uppercase text-xs tracking-wider"
                      style={{ fontFamily: 'var(--font-body)', fontWeight: '600' }}>
                      STATUS:
                    </h3>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-700">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <span className="text-white text-sm uppercase"
                        style={{ fontFamily: 'var(--font-body)', fontWeight: '500' }}>
                        {myAvailability === 'available' ? 'OPEN TO TALK' : 'BUSY'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* EDIT PROFILE SCREEN */}
        {currentScreen === 'edit-profile' && (
          <div className="min-h-screen pb-24 relative">
            <header className="px-5 pt-6 pb-4">
              <div className="flex items-center justify-between mb-5">
                <button
                  onClick={() => setCurrentScreen('my-profile')}
                  className="w-11 h-11 rounded-full bg-[#1a1a1a] border-2 border-[#8B008B]/40 flex items-center justify-center hover:border-[#8B008B] transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <h1 className="lowercase tracking-tight"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.75rem',
                    fontWeight: '700',
                    letterSpacing: '-0.02em',
                    color: '#ffffff'
                  }}>
                  edit profile.
                </h1>
                <div className="w-11" />
              </div>
            </header>

            <div className="px-5 mb-6">
              <div className="relative rounded-[2.5rem] overflow-hidden border-[3px] border-green-500 p-6"
                style={{ background: '#1a1a1a' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#8B008B] to-pink-500 opacity-20" />

                <div className="relative">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="w-full h-full rounded-full overflow-hidden border-4 border-green-500 shadow-lg"
                      style={{ boxShadow: '0 0 25px rgba(34, 197, 94, 0.4)' }}>
                      <Avatar name={myProfileName} size="xl" />
                    </div>
                    <button className="absolute bottom-0 right-0 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center border-2 border-green-500 hover:bg-gray-700 transition-colors">
                      <Edit2 className="w-5 h-5 text-white" />
                    </button>
                  </div>

                  <div className="mb-4">
                    <label className="text-white text-sm mb-2 block"
                      style={{ fontFamily: 'var(--font-body)', fontWeight: '600' }}>
                      Display Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={myProfileName}
                        onChange={(e) => setMyProfileName(e.target.value)}
                        placeholder="Your Name"
                        className="w-full bg-gray-200 rounded-full px-5 py-3 text-black placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#8B008B]"
                        style={{ fontFamily: 'var(--font-body)', fontWeight: '500' }}
                      />
                      <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="text-white text-sm mb-2 block"
                      style={{ fontFamily: 'var(--font-body)', fontWeight: '600' }}>
                      Occupation
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={myProfileSchool}
                        onChange={(e) => setMyProfileSchool(e.target.value)}
                        placeholder="Enter School Or Profession"
                        className="w-full bg-gray-200 rounded-full px-5 py-3 text-black placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#8B008B]"
                        style={{ fontFamily: 'var(--font-body)', fontWeight: '500' }}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="text-white text-sm mb-2 block"
                      style={{ fontFamily: 'var(--font-body)', fontWeight: '600' }}>
                      Your current availability
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setMyAvailability('busy')}
                        className={`px-4 py-3 rounded-full flex items-center justify-center gap-2 transition-all ${
                          myAvailability === 'busy'
                            ? 'bg-white text-black'
                            : 'bg-gray-700 text-white'
                        }`}
                        style={{ fontFamily: 'var(--font-body)', fontWeight: '600' }}
                      >
                        <div className="w-4 h-4 bg-red-500 rounded-full" />
                        Busy
                      </button>
                      <button
                        onClick={() => setMyAvailability('available')}
                        className={`px-4 py-3 rounded-full flex items-center justify-center gap-2 transition-all ${
                          myAvailability === 'available'
                            ? 'bg-white text-black'
                            : 'bg-gray-700 text-white'
                        }`}
                        style={{ fontFamily: 'var(--font-body)', fontWeight: '600' }}
                      >
                        <div className="w-4 h-4 bg-green-500 rounded-full" />
                        Available
                      </button>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="grid grid-cols-2 gap-3">
                      {myInterestTags.map((tag, i) => (
                        <input
                          key={i}
                          type="text"
                          value={tag}
                          onChange={(e) => {
                            const newTags = [...myInterestTags];
                            newTags[i] = e.target.value;
                            setMyInterestTags(newTags);
                          }}
                          placeholder="type here"
                          className="bg-[#FFFF00] rounded-full px-5 py-3 text-black placeholder:text-black/50 focus:outline-none focus:ring-2 focus:ring-green-500 text-center"
                          style={{ fontFamily: 'var(--font-body)', fontWeight: '600' }}
                        />
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={updateProfile}
                    className="w-full py-4 rounded-full bg-white text-black mb-3 transition-all hover:bg-gray-100"
                    style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: '700' }}
                  >
                    update Profile
                  </button>
                  <button
                    onClick={cancelEditProfile}
                    className="w-full py-4 rounded-full bg-gray-700 text-white transition-all hover:bg-gray-600"
                    style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: '700' }}
                  >
                    cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PERSONAL SCHEDULE SCREEN */}
        {currentScreen === 'personal-schedule' && (
          <div className="min-h-screen pb-24">
            <header className="px-5 pt-8 pb-4">
              <h1 className="text-white text-center mb-6"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.75rem',
                  fontWeight: '700',
                  letterSpacing: '-0.02em'
                }}>
                Personal Schedule
              </h1>

              <div className="flex gap-2 mb-6">
                <button className="flex-1 px-6 py-3 rounded-full bg-[#2a2a2a] border-2 border-gray-700 text-white text-sm"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: '600' }}>
                  D1
                  <div className="text-xs text-gray-400">15 April 2026</div>
                </button>
                <button className="flex-1 px-6 py-3 rounded-full bg-gradient-to-r from-pink-600 to-[#8B008B] border-2 border-pink-500 text-white text-sm"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: '600' }}>
                  D2
                  <div className="text-xs text-gray-200">16 April 2026</div>
                </button>
                <button className="flex-1 px-6 py-3 rounded-full bg-[#2a2a2a] border-2 border-gray-700 text-white text-sm"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: '600' }}>
                  D3
                  <div className="text-xs text-gray-400">17 April 2026</div>
                </button>
              </div>
            </header>

            <div className="px-5 pb-6">
              <div className="space-y-1">
                {timeSlots.map((slot) => {
                  const event = personalEvents.find(e => e.time === slot.time);
                  return (
                    <div
                      key={slot.time}
                      className="relative py-5 border-b border-gray-700"
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-white min-w-[60px]"
                          style={{ fontFamily: 'var(--font-body)', fontSize: '1.125rem', fontWeight: '600' }}>
                          {slot.time}
                        </span>
                        {event && (
                          <div className="flex-1">
                            <h3 className="text-white mb-1"
                              style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: '700' }}>
                              {event.title}
                            </h3>
                            {event.subtitle && (
                              <p className="text-gray-400 text-sm mb-1"
                                style={{ fontFamily: 'var(--font-body)', fontWeight: '500' }}>
                                {event.subtitle}
                              </p>
                            )}
                            <p className="text-gray-500 text-sm"
                              style={{ fontFamily: 'var(--font-body)', fontWeight: '400' }}>
                              {event.duration}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="px-5 pb-6">
              <button
                onClick={() => setCurrentScreen('discover')}
                className="w-full py-5 rounded-[2rem] bg-red-600 text-white transition-all hover:bg-red-700"
                style={{ fontFamily: 'var(--font-body)', fontSize: '1.125rem', fontWeight: '700' }}
              >
                EXIT
              </button>
            </div>
          </div>
        )}

        {/* QR CODE SCREEN */}
        {currentScreen === 'qr-code' && (
          <div className="min-h-screen pb-24 relative">
            <header className="px-5 pt-6 pb-4">
              <div className="flex items-center justify-between mb-5">
                <button
                  onClick={() => setCurrentScreen('discover')}
                  className="w-11 h-11 rounded-full bg-[#1a1a1a] border-2 border-[#8B008B]/40 flex items-center justify-center hover:border-[#8B008B] transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <h1 className="lowercase tracking-tight"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.75rem',
                    fontWeight: '700',
                    letterSpacing: '-0.02em',
                    color: '#ffffff'
                  }}>
                  QR-code.
                </h1>
                <button className="w-11 h-11 rounded-full bg-[#1a1a1a] border-2 border-[#8B008B]/40 flex items-center justify-center hover:border-[#8B008B] transition-colors">
                  <User className="w-5 h-5 text-white" />
                </button>
              </div>
            </header>

            <div className="px-5">
              <p className="text-pink-500 mb-6"
                style={{ fontFamily: 'var(--font-body)', fontSize: '1.125rem', fontWeight: '700' }}>
                Uniquely yours!
              </p>

              <div className="relative rounded-[2.5rem] overflow-hidden border-[3px] border-blue-500 p-8"
                style={{ background: '#2a2a2a' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#8B008B] to-pink-500 opacity-20" />

                <div className="relative">
                  {/* Avatar */}
                  <div className="w-24 h-24 mx-auto mb-6">
                    <div className="w-full h-full rounded-full overflow-hidden border-4 border-blue-500 shadow-lg"
                      style={{ boxShadow: '0 0 25px rgba(59, 130, 246, 0.4)' }}>
                      <Avatar name={myProfileName} size="lg" />
                    </div>
                  </div>

                  {/* QR Code */}
                  <div className="bg-white rounded-3xl p-8 mx-auto max-w-[280px]">
                    <div className="aspect-square bg-white flex items-center justify-center">
                      {/* QR Code Placeholder - Using a pattern to simulate QR code */}
                      <svg viewBox="0 0 200 200" className="w-full h-full">
                        {/* QR Code Pattern */}
                        <rect x="0" y="0" width="200" height="200" fill="white"/>

                        {/* Top-left corner */}
                        <rect x="10" y="10" width="50" height="50" fill="black"/>
                        <rect x="20" y="20" width="30" height="30" fill="white"/>
                        <rect x="30" y="30" width="10" height="10" fill="black"/>

                        {/* Top-right corner */}
                        <rect x="140" y="10" width="50" height="50" fill="black"/>
                        <rect x="150" y="20" width="30" height="30" fill="white"/>
                        <rect x="160" y="30" width="10" height="10" fill="black"/>

                        {/* Bottom-left corner */}
                        <rect x="10" y="140" width="50" height="50" fill="black"/>
                        <rect x="20" y="150" width="30" height="30" fill="white"/>
                        <rect x="30" y="160" width="10" height="10" fill="black"/>

                        {/* Data pattern - simplified */}
                        {Array.from({ length: 12 }).map((_, row) =>
                          Array.from({ length: 12 }).map((_, col) => {
                            const shouldFill = (row + col) % 2 === 0 || (row * col) % 3 === 0;
                            return shouldFill ? (
                              <rect
                                key={`${row}-${col}`}
                                x={70 + col * 10}
                                y={10 + row * 10}
                                width="8"
                                height="8"
                                fill="black"
                              />
                            ) : null;
                          })
                        )}

                        {Array.from({ length: 12 }).map((_, row) =>
                          Array.from({ length: 5 }).map((_, col) => {
                            const shouldFill = (row + col) % 2 === 1;
                            return shouldFill ? (
                              <rect
                                key={`bottom-${row}-${col}`}
                                x={10 + col * 10}
                                y={70 + row * 10}
                                width="8"
                                height="8"
                                fill="black"
                              />
                            ) : null;
                          })
                        )}

                        {Array.from({ length: 6 }).map((_, row) =>
                          Array.from({ length: 12 }).map((_, col) => {
                            const shouldFill = (row * col) % 2 === 0;
                            return shouldFill ? (
                              <rect
                                key={`right-${row}-${col}`}
                                x={70 + col * 10}
                                y={130 + row * 10}
                                width="8"
                                height="8"
                                fill="black"
                              />
                            ) : null;
                          })
                        )}
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        {(currentScreen === 'discover' || currentScreen === 'community' || currentScreen === 'community-discover' || currentScreen === 'full-discover-users' || currentScreen === 'user-profile' || currentScreen === 'my-profile' || currentScreen === 'edit-profile' || currentScreen === 'personal-schedule' || currentScreen === 'qr-code') && (
          <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-black/80 backdrop-blur-xl border-t-2 border-[#8B008B]/40 px-8 py-5 z-40">
            <div className="flex items-center justify-around">
              <button
                onClick={() => navigateToTab('discover')}
                className={`flex flex-col items-center gap-1.5 transition-all active:scale-90 ${
                  currentScreen === 'discover' ? 'text-[#FFFF00] scale-110' : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Home className="w-7 h-7" />
              </button>
              <button
                onClick={() => setCurrentScreen('my-profile')}
                className={`flex flex-col items-center gap-1.5 transition-all active:scale-90 ${
                  currentScreen === 'my-profile' || currentScreen === 'edit-profile' ? 'text-[#FFFF00] scale-110' : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <User className="w-7 h-7" />
              </button>
              <button
                onClick={() => setCurrentScreen('personal-schedule')}
                className={`flex flex-col items-center gap-1.5 transition-all active:scale-90 ${
                  currentScreen === 'personal-schedule' ? 'text-[#FFFF00] scale-110' : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Calendar className="w-7 h-7" />
              </button>
              <button
                onClick={() => setShowMoreMenu(true)}
                className="flex flex-col items-center gap-1.5 transition-all active:scale-90 text-gray-400 hover:text-gray-300"
              >
                <MoreHorizontal className="w-7 h-7" />
              </button>
            </div>
          </nav>
        )}

        {/* More Menu Modal */}
        {showMoreMenu && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setShowMoreMenu(false)}
            />

            <div className="relative w-full max-w-sm bg-[#1a1a1a] rounded-[2.5rem] border-[3px] border-[#8B008B]/50 overflow-hidden shadow-2xl"
              style={{ animation: 'slideUp 0.3s ease-out' }}
            >
              <div className="p-6 border-b-2 border-gray-800">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-[#2a2a2a] border-[3px] border-[#8B008B] flex items-center justify-center">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-[#1a1a1a]" />
                  </div>
                  <div>
                    <h3 className="text-white"
                      style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: '700' }}>
                      Alex v. Damme
                    </h3>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <button className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-[#8B008B]/10 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-[#2a2a2a] flex items-center justify-center">
                    <Settings className="w-7 h-7 text-[#FFFF00]" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="text-white"
                      style={{ fontFamily: 'var(--font-body)', fontSize: '1.125rem', fontWeight: '600' }}>
                      Settings
                    </h4>
                    <p className="text-gray-400 text-sm"
                      style={{ fontFamily: 'var(--font-body)', fontWeight: '400' }}>
                      Manage your account and preferences
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </button>

                <button
                  onClick={() => {
                    setShowMoreMenu(false);
                    setCurrentScreen('qr-code');
                  }}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-[#8B008B]/10 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-[#2a2a2a] flex items-center justify-center">
                    <div className="w-8 h-8 bg-[#FFFF00] rounded-lg flex items-center justify-center text-black text-xl">
                      #
                    </div>
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="text-white"
                      style={{ fontFamily: 'var(--font-body)', fontSize: '1.125rem', fontWeight: '600' }}>
                      QR-Code
                    </h4>
                    <p className="text-gray-400 text-sm"
                      style={{ fontFamily: 'var(--font-body)', fontWeight: '400' }}>
                      Show your code to connect in real life
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </button>

                <button className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-[#8B008B]/10 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-[#2a2a2a] flex items-center justify-center">
                    <Bookmark className="w-7 h-7 text-[#FFFF00]" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="text-white"
                      style={{ fontFamily: 'var(--font-body)', fontSize: '1.125rem', fontWeight: '600' }}>
                      Saved
                    </h4>
                    <p className="text-gray-400 text-sm"
                      style={{ fontFamily: 'var(--font-body)', fontWeight: '400' }}>
                      People, meetups, and communities you saved
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </button>

                <button className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-[#8B008B]/10 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-[#2a2a2a] flex items-center justify-center">
                    <Power className="w-7 h-7 text-[#FFFF00]" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="text-white"
                      style={{ fontFamily: 'var(--font-body)', fontSize: '1.125rem', fontWeight: '600' }}>
                      Log out
                    </h4>
                    <p className="text-gray-400 text-sm"
                      style={{ fontFamily: 'var(--font-body)', fontWeight: '400' }}>
                      See you next time!
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </button>
              </div>

              <div className="p-4">
                <button
                  onClick={() => setShowMoreMenu(false)}
                  className="w-full py-4 rounded-full bg-[#FFFF00] text-black transition-all hover:shadow-lg shadow-[#FFFF00]/25"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: '600' }}
                >
                  ← Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(100px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
