import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import VideoBackground from "@/components/VideoBackground";
import SaltDrops from "@/components/SaltDrops";
import YogaParticles from "@/components/YogaParticles";
import Carousel from "@/components/Carousel";
import VideoModal from "@/components/VideoModal";
import SubscriptionModal from "@/components/SubscriptionModal";
import PlanModal from "@/components/PlanModal";
import { MapPin } from "lucide-react";
import { videoUrls } from "@/data/videoUrls";

export default function Styles() {
  const [showParticles, setShowParticles] = useState(false);
  const [videoModal, setVideoModal] = useState({ isOpen: false, url: "", title: "" });
  const [subscriptionModal, setSubscriptionModal] = useState({ isOpen: false, url: "", title: "" });
  const [planModal, setPlanModal] = useState({ isOpen: false, mobile: "" });
  const [pendingVideo, setPendingVideo] = useState<{ url: string; title: string } | null>(null);

  const openVideo = (url: string, title: string) => {
    const hasSubscribed = localStorage.getItem("eYoga_subscribed");
    if (hasSubscribed) {
      // User already subscribed, play video directly
      setVideoModal({ isOpen: true, url, title });
    } else {
      // Show subscription flow
      setPendingVideo({ url, title });
      setSubscriptionModal({ isOpen: true, url, title });
    }
  };

  const closeVideo = () => {
    setVideoModal({ isOpen: false, url: "", title: "" });
  };

  const handleSubscription = (mobile: string) => {
    setSubscriptionModal({ isOpen: false, url: "", title: "" });
    setPlanModal({ isOpen: true, mobile });
  };

  const handlePlanSelection = (plan: string) => {
    console.log("Selected plan:", plan, "Mobile:", planModal.mobile);
    // Mark user as subscribed
    localStorage.setItem("eYoga_subscribed", "true");
    setPlanModal({ isOpen: false, mobile: "" });
    if (pendingVideo) {
      setVideoModal({ isOpen: true, url: pendingVideo.url, title: pendingVideo.title });
      setPendingVideo(null);
    }
  };

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

  const yogaStyles = [
    {
      id: 1,
      name: "Hatha Yoga",
      emoji: "🧘",
      description: "Traditional practice focusing on physical postures and breath",
      sessions: "150+ sessions",
      color: "from-purple-200 to-purple-100",
    },
    {
      id: 2,
      name: "Vinyasa Flow",
      emoji: "🌊",
      description: "Dynamic sequences linking breath with movement",
      sessions: "120+ sessions",
      color: "from-blue-200 to-blue-100",
    },
    {
      id: 3,
      name: "Ashtanga",
      emoji: "💪",
      description: "Rigorous style following specific sequence of postures",
      sessions: "100+ sessions",
      color: "from-orange-200 to-orange-100",
    },
    {
      id: 4,
      name: "Yin Yoga",
      emoji: "☯️",
      description: "Slow-paced practice with longer held poses",
      sessions: "110+ sessions",
      color: "from-teal-200 to-teal-100",
    },
    {
      id: 5,
      name: "Kundalini",
      emoji: "✨",
      description: "Spiritual practice awakening energy through breath and movement",
      sessions: "130+ sessions",
      color: "from-yellow-200 to-yellow-100",
    },
    {
      id: 6,
      name: "Iyengar",
      emoji: "🎯",
      description: "Precise alignment-focused practice with props",
      sessions: "140+ sessions",
      color: "from-green-200 to-green-100",
    },
    {
      id: 7,
      name: "Restorative",
      emoji: "🌸",
      description: "Gentle practice for deep relaxation and healing",
      sessions: "95+ sessions",
      color: "from-pink-200 to-pink-100",
    },
    {
      id: 8,
      name: "Power Yoga",
      emoji: "⚡",
      description: "Fitness-based vigorous vinyasa-style practice",
      sessions: "80+ sessions",
      color: "from-red-200 to-red-100",
    },
    {
      id: 9,
      name: "Bikram",
      emoji: "🔥",
      description: "Hot yoga with 26 postures in heated room",
      sessions: "125+ sessions",
      color: "from-orange-200 to-orange-100",
    },
    {
      id: 10,
      name: "Pranayama",
      emoji: "🌬️",
      description: "Breath control techniques for energy and calm",
      sessions: "105+ sessions",
      color: "from-cyan-200 to-cyan-100",
    },
    {
      id: 11,
      name: "Meditation",
      emoji: "🕉️",
      description: "Mindfulness and contemplative practices",
      sessions: "160+ sessions",
      color: "from-indigo-200 to-indigo-100",
    },
    {
      id: 12,
      name: "Yin Yang",
      emoji: "☮️",
      description: "Balance of dynamic and passive practices",
      sessions: "90+ sessions",
      color: "from-purple-200 to-purple-100",
    },
    {
      id: 13,
      name: "Jivamukti",
      emoji: "🎵",
      description: "Spiritual practice with music and chanting",
      sessions: "85+ sessions",
      color: "from-lime-200 to-lime-100",
    },
    {
      id: 14,
      name: "Sivananda",
      emoji: "🙏",
      description: "Classical approach with 12 basic postures",
      sessions: "115+ sessions",
      color: "from-amber-200 to-amber-100",
    },
    {
      id: 15,
      name: "Aerial Yoga",
      emoji: "🎪",
      description: "Practice using suspended hammocks",
      sessions: "75+ sessions",
      color: "from-sky-200 to-sky-100",
    },
    {
      id: 16,
      name: "Acro Yoga",
      emoji: "🤸",
      description: "Partner practice blending yoga and acrobatics",
      sessions: "70+ sessions",
      color: "from-rose-200 to-rose-100",
    },
    {
      id: 17,
      name: "Yoga Nidra",
      emoji: "😴",
      description: "Guided meditation for deep conscious relaxation",
      sessions: "65+ sessions",
      color: "from-violet-200 to-violet-100",
    },
    {
      id: 18,
      name: "Prenatal Yoga",
      emoji: "🤰",
      description: "Gentle practice for expecting mothers",
      sessions: "95+ sessions",
      color: "from-pink-200 to-pink-100",
    },
    {
      id: 19,
      name: "Chair Yoga",
      emoji: "🪑",
      description: "Accessible practice for all abilities",
      sessions: "60+ sessions",
      color: "from-emerald-200 to-emerald-100",
    },
    {
      id: 20,
      name: "Tantra Yoga",
      emoji: "💫",
      description: "Sacred practice for spiritual awakening",
      sessions: "55+ sessions",
      color: "from-fuchsia-200 to-fuchsia-100",
    },
  ];

  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="relative min-h-screen bg-yoga-cream">
      <VideoBackground />
      {showParticles && <SaltDrops />}
      {showParticles && <YogaParticles />}
      <VideoModal isOpen={videoModal.isOpen} onClose={closeVideo} videoUrl={videoModal.url} title={videoModal.title} />
      <SubscriptionModal 
        isOpen={subscriptionModal.isOpen} 
        onClose={() => setSubscriptionModal({ isOpen: false, url: "", title: "" })} 
        onSubmit={handleSubscription} 
      />
      <PlanModal
        isOpen={planModal.isOpen}
        onClose={() => setPlanModal({ isOpen: false, mobile: "" })}
        onSubmit={handlePlanSelection}
        mobile={planModal.mobile}
        email=""
        name="olivemint"
        txnid=""
      />

      <div className="relative z-20">
        <Navbar />

        {/* Header */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center mb-16 animate-slide-up">
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
              Explore <span className="text-purple-500">Global Styles</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Embark on a yoga journey around the world and discover authentic classes from every continent
            </p>
          </div>

          {/* Styles Grid */}
          <Carousel slidesToShow={5}>
            {yogaStyles.map((style, index) => (
              <div key={style.id} className="group cursor-pointer transform transition-all duration-300 hover:scale-105" onClick={() => openVideo(videoUrls[index], style.name)}>
                <div className="relative aspect-video rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300">
                  <img src={`/thumbnails/${['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'S11', 'S12', 'S13', 'S14', 'S15', 'F1', 'F2', 'F3', 'F4', 'F5'][index % 20]}.png`} alt={style.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="px-5 py-2 bg-white text-yoga-brown rounded-lg font-semibold hover:bg-yoga-cream hover:scale-110 transition-all duration-300 active:scale-95">
                      Explore
                    </button>
                  </div>
                </div>
                <div className="mt-2">
                  <h3 className="font-bold text-sm text-white">{style.name}</h3>
                  <p className="text-xs text-white/80">{style.sessions}</p>
                </div>
              </div>
            ))}
          </Carousel>
        </section>

        {/* Popular Videos Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              Popular Home Cooked Sessions <span className="text-purple-500">Watch Now!</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-10">
              {[
                { id: 1, title: "Comfort Yogas", time: "00:33 mins", image: "🍲" },
                { id: 2, title: "Family Classes", time: "00:36 mins", image: "👨‍👩‍👧‍👦" },
                { id: 3, title: "Home Feast", time: "00:34 mins", image: "🍽️" },
                { id: 4, title: "Studio Stories", time: "00:40 mins", image: "📖" },
                { id: 5, title: "Desi Delights", time: "00:34 mins", image: "🍛" },
                { id: 6, title: "Simple Sessions", time: "00:41 mins", image: "🥘" },
                { id: 7, title: "Everyday Practice", time: "00:42 mins", image: "🍳" },
                { id: 8, title: "Pure Taste", time: "00:33 mins", image: "✨" },
                { id: 9, title: "Healthy Plate", time: "00:40 mins", image: "🥗" },
                { id: 10, title: "Urban Studio", time: "00:34 mins", image: "🏙️" },
                { id: 11, title: "Home Instructor", time: "00:38 mins", image: "👨🍳" },
                { id: 12, title: "Quick Sessions", time: "00:35 mins", image: "⚡" },
                { id: 13, title: "Tasty Bites", time: "00:37 mins", image: "😋" },
                { id: 14, title: "Yoga Love", time: "00:39 mins", image: "❤️" }
              ].map((video, index) => (
                <div key={video.id} className="group cursor-pointer animate-fade-in" style={{ animationDelay: `${index * 50}ms` }} onClick={() => openVideo(videoUrls[20 + index], video.title)}>
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

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-16 animate-slide-up">
              Discover Yoga <span className="text-purple-500">Traditions</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "🧘",
                  title: "Authentic Classes",
                  description: "Learn traditional practice methods from authentic sources",
                },
                {
                  icon: "🌍",
                  title: "Cultural Stories",
                  description: "Understand the history and culture behind each style",
                },
                {
                  icon: "🛒",
                  title: "Ingredient Guides",
                  description: "Find where to source authentic ingredients",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-md p-8 text-center group animate-bounce-in hover:border-white/40 hover:shadow-xl hover:shadow-white/10 transition-all duration-300"
                  style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-white/80">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Regional Specialties Slider */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              Regional <span className="text-purple-500">Specialties</span>
            </h2>
            <Carousel slidesToShow={5}>
              {[
                { id: 1, title: "Tuscan Classics", region: "Italy", img: "F6" },
                { id: 2, title: "Sichuan Heat", region: "China", img: "F7" },
                { id: 3, title: "Provence Flavors", region: "France", img: "F8" },
                { id: 4, title: "Kerala Spices", region: "India", img: "P1" },
                { id: 5, title: "Okinawa Secrets", region: "Japan", img: "P2" },
                { id: 6, title: "Andalusian Tapas", region: "Spain", img: "P3" },
                { id: 7, title: "Yucatan Style", region: "Mexico", img: "P4" },
                { id: 8, title: "Aegean Delights", region: "Greece", img: "P5" },
              ].map((video, index) => (
                <div key={video.id} className="group cursor-pointer transform transition-all duration-300 hover:scale-105" onClick={() => openVideo(videoUrls[34 + index], video.title)}>
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
                    <p className="text-xs text-white/80">{video.region}</p>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </section>

        {/* Street Yoga Adventures */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              Street Yoga <span className="text-purple-500">Adventures</span>
            </h2>
            <Carousel slidesToShow={5}>
              {[
                { id: 1, title: "Bangkok Streets", style: "Thai", img: "P6" },
                { id: 2, title: "Mumbai Chaat", style: "Indian", img: "P7" },
                { id: 3, title: "Mexico City", style: "Mexican", img: "P8" },
                { id: 4, title: "Istanbul Bites", style: "Turkish", img: "P9" },
                { id: 5, title: "Tokyo Yatai", style: "Japanese", img: "P10" },
                { id: 6, title: "Marrakech Souk", style: "Moroccan", img: "S7" },
                { id: 7, title: "Seoul Night", style: "Korean", img: "S8" },
                { id: 8, title: "Hanoi Vendors", style: "Vietnamese", img: "S9" },
              ].map((video, index) => (
                <div key={video.id} className="group cursor-pointer transform transition-all duration-300 hover:scale-105" onClick={() => openVideo(videoUrls[42 + index], video.title)}>
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
                    <p className="text-xs text-white/80">{video.style}</p>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </section>

        {/* Festive Feasts Slider */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-yoga-brown/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              Festive <span className="text-purple-500">Feasts</span>
            </h2>
            <Carousel slidesToShow={5}>
              {[
                { id: 1, title: "Holiday Specials", occasion: "Christmas", img: "S10" },
                { id: 2, title: "Diwali Sweets", occasion: "Diwali", img: "S11" },
                { id: 3, title: "Lunar New Year", occasion: "CNY", img: "S12" },
                { id: 4, title: "Thanksgiving", occasion: "Turkey Day", img: "S13" },
                { id: 5, title: "Eid Delights", occasion: "Eid", img: "S14" },
                { id: 6, title: "Easter Brunch", occasion: "Easter", img: "S15" },
                { id: 7, title: "Hanukkah", occasion: "Festival", img: "F1" },
                { id: 8, title: "Ramadan Iftar", occasion: "Ramadan", img: "F2" },
              ].map((video, index) => (
                <div key={video.id} className="group cursor-pointer transform transition-all duration-300 hover:scale-105" onClick={() => openVideo(videoUrls[63 + index], video.title)}>
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
                    <p className="text-xs text-white/80">{video.occasion}</p>
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
