import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import VideoBackground from "@/components/VideoBackground";
import SaltDrops from "@/components/SaltDrops";
import YogaParticles from "@/components/YogaParticles";
import Carousel from "@/components/Carousel";
import SubscriptionModal from "@/components/SubscriptionModal";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { Clock, Users, Heart, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { videoUrls } from "@/data/videoUrls";

export default function Classes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [filteredClasses, setFilteredClasses] = useState<any[]>([]);
  const [showParticles, setShowParticles] = useState(false);
  const { isPopupOpen, closePopup, checkAndPlayVideo, handleSubscribe } = useSubscription();

  const openVideo = (url: string, title: string) => {
    checkAndPlayVideo({ url, title });
  };

  const classes = [
    {
      id: 1,
      name: "Hatha Basics",
      time: "35 mins",
      serves: "All levels",
      difficulty: "Beginner",
      style: "Hatha",
      image: "🧘",
      description: "Foundation postures and breathing techniques",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Vinyasa Flow",
      time: "25 mins",
      serves: "Intermediate",
      difficulty: "Medium",
      style: "Vinyasa",
      image: "🌊",
      description: "Dynamic flowing sequences",
      rating: 4.9,
    },
    {
      id: 3,
      name: "Yin Stretch",
      time: "20 mins",
      serves: "All levels",
      difficulty: "Easy",
      style: "Yin",
      image: "☯️",
      description: "Deep passive stretching",
      rating: 4.7,
    },
    {
      id: 4,
      name: "Power Yoga",
      time: "15 mins",
      serves: "Advanced",
      difficulty: "Hard",
      style: "Power",
      image: "⚡",
      description: "Intense strength building",
      rating: 4.6,
    },
    {
      id: 5,
      name: "Pranayama",
      time: "30 mins",
      serves: "All levels",
      difficulty: "Easy",
      style: "Breath",
      image: "🌬️",
      description: "Breath control techniques",
      rating: 4.8,
    },
    {
      id: 6,
      name: "Meditation",
      time: "20 mins",
      serves: "All levels",
      difficulty: "Easy",
      style: "Mindfulness",
      image: "🙏",
      description: "Guided mindfulness practice",
      rating: 4.7,
    },
    {
      id: 7,
      name: "Ashtanga Primary",
      time: "40 mins",
      serves: "Advanced",
      difficulty: "Hard",
      style: "Ashtanga",
      image: "💪",
      description: "Traditional sequence practice",
      rating: 4.9,
    },
    {
      id: 8,
      name: "Restorative",
      time: "60 mins",
      serves: "All levels",
      difficulty: "Easy",
      style: "Restorative",
      image: "🌸",
      description: "Deep relaxation and healing",
      rating: 4.8,
    },
    {
      id: 9,
      name: "Kundalini",
      time: "45 mins",
      serves: "Intermediate",
      difficulty: "Medium",
      style: "Kundalini",
      image: "✨",
      description: "Energy awakening practice",
      rating: 4.9,
    },
    {
      id: 10,
      name: "Iyengar Alignment",
      time: "50 mins",
      serves: "All levels",
      difficulty: "Medium",
      style: "Iyengar",
      image: "🎯",
      description: "Precise alignment with props",
      rating: 4.7,
    },
    {
      id: 11,
      name: "Hot Yoga",
      time: "90 mins",
      serves: "Intermediate",
      difficulty: "Hard",
      style: "Bikram",
      image: "🔥",
      description: "26 postures in heated room",
      rating: 4.8,
    },
    {
      id: 12,
      name: "Morning Flow",
      time: "40 mins",
      serves: "All levels",
      difficulty: "Easy",
      style: "Vinyasa",
      image: "🌅",
      description: "Energizing morning practice",
      rating: 4.9,
    },
    {
      id: 13,
      name: "Yoga Nidra",
      time: "55 mins",
      serves: "All levels",
      difficulty: "Easy",
      style: "Nidra",
      image: "😴",
      description: "Yogic sleep meditation",
      rating: 4.8,
    },
    {
      id: 14,
      name: "Prenatal Yoga",
      time: "120 mins",
      serves: "Expecting",
      difficulty: "Easy",
      style: "Prenatal",
      image: "🤰",
      description: "Gentle practice for mothers",
      rating: 4.7,
    },
    {
      id: 15,
      name: "Chair Yoga",
      time: "60 mins",
      serves: "Seniors",
      difficulty: "Easy",
      style: "Chair",
      image: "🪑",
      description: "Accessible seated practice",
      rating: 4.8,
    },
    {
      id: 16,
      name: "Aerial Yoga",
      time: "30 mins",
      serves: "Intermediate",
      difficulty: "Medium",
      style: "Aerial",
      image: "🎪",
      description: "Suspended hammock practice",
      rating: 4.6,
    },
    {
      id: 17,
      name: "Acro Yoga",
      time: "180 mins",
      serves: "Partners",
      difficulty: "Hard",
      style: "Acro",
      image: "🤸",
      description: "Partner acrobatic yoga",
      rating: 4.9,
    },
    {
      id: 18,
      name: "Yin Yang",
      time: "30 mins",
      serves: "All levels",
      difficulty: "Medium",
      style: "Yin Yang",
      image: "☮️",
      description: "Balance of active and passive",
      rating: 4.8,
    },
    {
      id: 19,
      name: "Jivamukti",
      time: "35 mins",
      serves: "Intermediate",
      difficulty: "Medium",
      style: "Jivamukti",
      image: "🎵",
      description: "Spiritual practice with music",
      rating: 4.7,
    },
    {
      id: 20,
      name: "Sivananda",
      time: "30 mins",
      serves: "All levels",
      difficulty: "Easy",
      style: "Sivananda",
      image: "🕉️",
      description: "Classical 12 posture sequence",
      rating: 4.6,
    },
  ];

  useEffect(() => {
    const hasSeenPreloader = localStorage.getItem("TheYogaStudio_preloader_shown");
    if (hasSeenPreloader) {
      setShowParticles(true);
    } else {
      const timer = setTimeout(() => {
        setShowParticles(true);
      }, 9000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const filtered = classes.filter((yogaClass) => {
      const matchesSearch =
        yogaClass.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        yogaClass.style.toLowerCase().includes(searchTerm.toLowerCase()) ||
        yogaClass.description.toLowerCase().includes(searchTerm.toLowerCase());

      let matchesFilter = false;
      if (activeFilter === "All") {
        matchesFilter = true;
      } else if (activeFilter === "Beginner") {
        matchesFilter = yogaClass.difficulty === "Beginner" || yogaClass.difficulty === "Easy";
      } else if (activeFilter === "Intermediate") {
        matchesFilter = yogaClass.difficulty === "Medium";
      } else if (activeFilter === "Advanced") {
        matchesFilter = yogaClass.difficulty === "Hard";
      } else if (activeFilter === "Meditation") {
        matchesFilter = yogaClass.style === "Mindfulness" || yogaClass.style === "Nidra";
      } else if (activeFilter === "Flow") {
        matchesFilter = yogaClass.style === "Vinyasa" || yogaClass.style === "Hatha";
      }

      return matchesSearch && matchesFilter;
    });
    setFilteredClasses(filtered);
  }, [searchTerm, activeFilter]);

  useEffect(() => {
    setFilteredClasses(classes);
  }, []);

  return (
    <div className="relative min-h-screen bg-yoga-cream">
      <VideoBackground />
      {showParticles && <SaltDrops />}
      {showParticles && <YogaParticles />}
      <SubscriptionModal 
        isOpen={isPopupOpen} 
        onClose={closePopup} 
        onSubscribe={handleSubscribe} 
      />

      <div className="relative z-20">
        <Navbar />

        {/* Header with Search & Filter */}
        <div className="bg-white/10 backdrop-blur-md border-b border-white/20 pt-24 pb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            {/* Search Bar */}
            <div className="relative animate-fade-in">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
              <input
                type="text"
                placeholder="Search classes, styles, practices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-12 py-3 rounded-lg border-2 border-white/20 text-white font-bold text-lg placeholder-white/60 focus:outline-none focus:border-white/40 transition-colors duration-300 bg-white/5 focus:shadow-lg focus:shadow-white/10"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Filter Bar */}
            <div className="flex gap-2 overflow-x-auto pb-2 animate-slide-up scrollbar-hide">
              {["All", "Beginner", "Intermediate", "Advanced", "Meditation", "Flow"].map((filter, index) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-lg font-bold text-lg whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                    activeFilter === filter
                      ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/30"
                      : "border border-white/20 text-white hover:bg-white/10 hover:border-white/40"
                  }`}
                  style={{ animationDelay: `${0.05 * (index + 1)}s` }}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Classes Grid */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Results header */}
            <div className="mb-8 animate-fade-in">
              <h2 className="text-2xl font-bold text-white">
                {activeFilter}
              </h2>
            </div>

            {filteredClasses.length > 0 ? (
              <Carousel slidesToShow={5}>
                {filteredClasses.map((yogaClass, index) => (
                  <div key={yogaClass.id} className="group cursor-pointer transform transition-all duration-300 hover:scale-105" onClick={() => openVideo(videoUrls[index % videoUrls.length], yogaClass.name)}>
                    <div className="relative aspect-video rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300">
                      <img src={`/thumbnails/${['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9', 'P10', 'S1', 'S2'][index % 20]}.png`} alt={yogaClass.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-yoga-brown ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <h3 className="font-bold text-sm text-white">{yogaClass.name}</h3>
                      <p className="text-xs text-white/80">{yogaClass.time}</p>
                    </div>
                  </div>
                ))}
              </Carousel>
            ) : (
              <div className="text-center py-20">
                <span className="text-6xl mb-4 block">🔍</span>
                <h3 className="text-2xl font-bold text-yoga-brown mb-2">No classes found</h3>
                <p className="text-yoga-brown/60">Try adjusting your search terms</p>
              </div>
            )}
          </div>
        </section>

        {/* Popular Videos Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              Popular Yoga <span className="text-purple-500">Sessions</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-10">
              {[
                { id: 1, title: "Morning Flow", time: "00:34 mins" },
                { id: 2, title: "Gentle Practice", time: "00:41 mins" },
                { id: 3, title: "Daily Yoga", time: "00:42 mins" },
                { id: 4, title: "Mindful Movement", time: "00:33 mins" },
                { id: 5, title: "Flexibility Focus", time: "00:40 mins" },
                { id: 6, title: "Studio Sessions", time: "00:34 mins" },
                { id: 7, title: "Home Practice", time: "00:38 mins" },
                { id: 8, title: "Quick Flow", time: "00:35 mins" },
                { id: 9, title: "Deep Stretch", time: "00:37 mins" },
                { id: 10, title: "Yoga Bliss", time: "00:39 mins" },
                { id: 11, title: "Balance Work", time: "00:36 mins" },
                { id: 12, title: "Core Strength", time: "00:41 mins" },
                { id: 13, title: "Soul Practice", time: "00:43 mins" },
                { id: 14, title: "Energy Boost", time: "00:38 mins" },
              ].map((video, index) => (
                <div key={video.id} className="group cursor-pointer animate-fade-in" style={{ animationDelay: `${index * 50}ms` }} onClick={() => openVideo(videoUrls[14 + index], video.title)}>
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300">
                    <img src={`/thumbnails/${video.id}.png`} alt={video.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-yoga-brown ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs text-white/80">{video.time}, YogaFlow</p>
                    <h3 className="font-bold text-sm text-white">{video.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solo Episodes Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              Solo Episodes <span className="text-purple-500">Watch Now!</span>
            </h2>
            <Carousel slidesToShow={5}>
              {[
                { id: 15, title: "Meditation Journey", time: "00:33 mins" },
                { id: 16, title: "Yoga Studio", time: "00:36 mins" },
                { id: 17, title: "The Yoga Lab", time: "00:34 mins" },
                { id: 18, title: "Flow & Breathe", time: "00:40 mins" },
                { id: 19, title: "Peace & Balance", time: "00:34 mins" },
                { id: 20, title: "Mindful Studio", time: "00:41 mins" },
                { id: 21, title: "Zen Practice", time: "00:42 mins" },
              ].map((video, index) => (
                <div key={video.id} className="group cursor-pointer px-2" onClick={() => openVideo(videoUrls[28 + index], video.title)}>
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 max-w-[150px] mx-auto">
                    <img src={`/thumbnails/${video.id}.png`} alt={video.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-yoga-brown ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 max-w-[150px] mx-auto">
                    <p className="text-xs text-white/80">{video.time}, YogaFlow</p>
                    <h3 className="font-bold text-xs text-white">{video.title}</h3>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </section>

        {/* Class Transformation Episodes Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-yoga-brown/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Class Transformation <span className="text-purple-500">Episodes</span></h2>
              <p className="text-white/90">Watch Now</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[
                { id: 1, episode: "S01E01", title: "Yoga Journey", img: "S17.png" },
                { id: 2, episode: "S01E02", title: "Flow Series", img: "S16.png" },
                { id: 3, episode: "S01E03", title: "Balance Studio", img: "S15.png" },
                { id: 4, episode: "S01E04", title: "Mindful Practice", img: "S14.png" },
              ].map((ep, index) => (
                <div key={ep.id} className="group cursor-pointer animate-fade-in" style={{ animationDelay: `${index * 100}ms` }} onClick={() => openVideo(videoUrls[35 + index], ep.title)}>
                  <div className="relative aspect-video rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300">
                    <img src={`/thumbnails/${ep.img}`} alt={ep.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-yoga-brown ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs text-white/80">{ep.episode}</p>
                    <h3 className="font-bold text-sm text-white">{ep.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Bites Slider */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              Quick Sessions <span className="text-purple-500">Under 30 Minutes</span>
            </h2>
            <Carousel slidesToShow={5}>
              {[
                { id: 1, title: "Express Flow", time: "15 mins", img: "S13" },
                { id: 2, title: "Quick Stretch", time: "20 mins", img: "S12" },
                { id: 3, title: "Easy Meditation", time: "25 mins", img: "S11" },
                { id: 4, title: "Simple Breath", time: "10 mins", img: "S10" },
                { id: 5, title: "Rapid Relax", time: "18 mins", img: "S9" },
                { id: 6, title: "Swift Balance", time: "22 mins", img: "S8" },
                { id: 7, title: "Speedy Core", time: "12 mins", img: "S7" },
                { id: 8, title: "Quick Calm", time: "28 mins", img: "S6" },
              ].map((video, index) => (
                <div key={video.id} className="group cursor-pointer transform transition-all duration-300 hover:scale-105" onClick={() => openVideo(videoUrls[39 + index], video.title)}>
                  <div className="relative aspect-video rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300">
                    <img src={`/thumbnails/${video.img}.png`} alt={video.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-yoga-brown ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <h3 className="font-bold text-sm text-white">{video.title}</h3>
                    <p className="text-xs text-white/80">{video.time}</p>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </section>

        {/* Instructor's Special Collection */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              Instructor's Special <span className="text-purple-500">Collection</span>
            </h2>
            <Carousel slidesToShow={5}>
              {[
                { id: 1, title: "Signature Flow", instructor: "Instructor Maya", img: "F1" },
                { id: 2, title: "Sacred Practice", instructor: "Instructor Lisa", img: "F2" },
                { id: 3, title: "Master Class", instructor: "Instructor David", img: "F3" },
                { id: 4, title: "Pro Techniques", instructor: "Instructor Sarah", img: "F4" },
                { id: 5, title: "Expert Guide", instructor: "Instructor Raj", img: "F5" },
                { id: 6, title: "Premium Practice", instructor: "Instructor Emma", img: "F6" },
                { id: 7, title: "Elite Sessions", instructor: "Instructor Alex", img: "F7" },
                { id: 8, title: "Top Choice", instructor: "Instructor Nina", img: "F8" },
              ].map((video, index) => (
                <div key={video.id} className="group cursor-pointer transform transition-all duration-300 hover:scale-105" onClick={() => openVideo(videoUrls[47 + index], video.title)}>
                  <div className="relative aspect-video rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300">
                    <img src={`/thumbnails/${video.img}.png`} alt={video.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-yoga-brown ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <h3 className="font-bold text-sm text-white">{video.title}</h3>
                    <p className="text-xs text-white/80">{video.instructor}</p>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </section>

        {/* Trending Now Slider */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              Trending <span className="text-purple-500">This Week</span>
            </h2>
            <Carousel slidesToShow={5}>
              {[
                { id: 1, title: "Viral Practice", views: "2.5M views", img: "P1" },
                { id: 2, title: "Trending Flow", views: "1.8M views", img: "P2" },
                { id: 3, title: "Popular Session", views: "3.2M views", img: "P3" },
                { id: 4, title: "Must Practice", views: "1.5M views", img: "P4" },
                { id: 5, title: "Top Rated", views: "2.1M views", img: "P5" },
                { id: 6, title: "Community Favorite", views: "1.9M views", img: "P6" },
                { id: 7, title: "Best Practice", views: "2.7M views", img: "P7" },
                { id: 8, title: "Most Loved", views: "3.5M views", img: "P8" },
              ].map((video, index) => (
                <div key={video.id} className="group cursor-pointer transform transition-all duration-300 hover:scale-105" onClick={() => openVideo(videoUrls[55 + index], video.title)}>
                  <div className="relative aspect-video rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300">
                    <img src={`/thumbnails/${video.img}.png`} alt={video.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-yoga-brown ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <h3 className="font-bold text-sm text-white">{video.title}</h3>
                    <p className="text-xs text-white/80">{video.views}</p>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/20 bg-white/10 backdrop-blur-md py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center text-white text-sm">
            <p className="mb-2">&copy; 2025, Alphamovil All Rights Reserved</p>
            <div className="flex gap-2 justify-center">
              <Link to="/terms" className="hover:text-white/80">Terms of Services</Link>
              <span>|</span>
              <Link to="/refund" className="hover:text-white/80">Refund Policy</Link>
              <span>|</span>
              <Link to="/privacy" className="hover:text-white/80">Privacy Policy</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
