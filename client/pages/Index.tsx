import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import VideoBackground from "@/components/VideoBackground";
import VideoModal from "@/components/VideoModal";
import SubscriptionModal from "@/components/SubscriptionModal";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { usePreserveParams } from "@/hooks/usePreserveParams";
import { GraduationCap, Clock, Users, Star, ArrowRight, Leaf, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import { videoUrls } from "@/data/videoUrls";

export default function Index() {
  const [showParticles, setShowParticles] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string } | null>(null);
  const { isPopupOpen, closePopup, checkAndPlayVideo, handleSubscribe } = useSubscription();
  const queryParams = usePreserveParams();

  const openVideo = (url: string, title: string) => {
    checkAndPlayVideo({ url, title });
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

  const featuredClasses = [
    {
      id: 1,
      name: "Morning Hatha",
      time: "35 mins",
      image: "🧘",
      description: "Gentle flow focusing on breath and alignment",
      videoUrl: videoUrls[0],
    },
    {
      id: 2,
      name: "Power Vinyasa",
      time: "25 mins",
      image: "💪",
      description: "Dynamic sequences building strength and flexibility",
      videoUrl: videoUrls[1],
    },
    {
      id: 3,
      name: "Yin Relaxation",
      time: "20 mins",
      image: "☯️",
      description: "Deep stretches for stress relief and calm",
      videoUrl: videoUrls[2],
    },
    {
      id: 4,
      name: "Quick Meditation",
      time: "15 mins",
      image: "🙏",
      description: "Guided mindfulness for mental clarity",
      videoUrl: videoUrls[3],
    },
  ];

  const stats = [
    { number: "50K+", label: "Classes", icon: <GraduationCap className="w-6 h-6" /> },
    { number: "100K+", label: "Practice Enthusiasts", icon: <Users className="w-6 h-6" /> },
    { number: "4.9★", label: "Average Rating", icon: <Star className="w-6 h-6" /> },
    { number: "24/7", label: "Community Support", icon: <Flame className="w-6 h-6" /> },
  ];

  return (
    <div className="relative min-h-screen bg-yoga-cream">
      <VideoBackground />
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoUrl={selectedVideo?.url || ""}
        title={selectedVideo?.title || ""}
      />
      <SubscriptionModal 
        isOpen={isPopupOpen} 
        onClose={closePopup} 
        onSubscribe={handleSubscribe} 
      />

      <div className="relative z-20">
        <Navbar />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div className="animate-slide-up">
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-yoga-beige/50 border border-yoga-olive/20">
                  <Leaf className="w-4 h-4 text-yoga-olive" />
                  <span className="text-sm text-white font-medium">Premium Classes</span>
                </div>
                <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
                  Discover
                  <span className="text-purple-500"> Yoga Excellence</span>
                </h1>
                <p className="text-lg text-white/90 mb-8 leading-relaxed">
                  Explore thousands of transformative classes from certified instructors worldwide. Learn authentic techniques, discover diverse yoga styles, and deepen your practice.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to={`/classes${queryParams}`}
                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center justify-center gap-2 group hover:scale-105 active:scale-95"
                  >
                    <span>Explore Classes</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Hero Image */}
              <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-yoga-beige to-yoga-olive/20 rounded-3xl blur-3xl opacity-40"></div>
                  <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-xl text-center border border-white/20">
                    <div className="text-8xl mb-4">🧘</div>
                    <h3 className="text-2xl font-bold text-white mb-2">Premium Yoga</h3>
                    <p className="text-white/80">Handcrafted classes & tutorials</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-md p-6 text-center group animate-bounce-in hover:border-white/40 hover:shadow-xl hover:shadow-white/10 transition-all duration-300"
                  style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                >
                  <div className="flex justify-center mb-3 text-white group-hover:scale-125 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Classes Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-slide-up">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Featured <span className="text-purple-500">Classes</span>
              </h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Handpicked classes from our community of passionate home instructors and professionals
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredClasses.map((yogaClass, index) => (
                <div
                  key={yogaClass.id}
                  onClick={() => openVideo(yogaClass.videoUrl, yogaClass.name)}
                  className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-md overflow-hidden group cursor-pointer animate-bounce-in hover:border-white/40 hover:shadow-xl hover:shadow-white/10 transition-all duration-300"
                  style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                      <img src={`/thumbnails/F${index + 1}.png`} alt={yogaClass.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-yoga-brown/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-2">{yogaClass.name}</h3>
                    <p className="text-sm text-white/80 mb-4">{yogaClass.description}</p>
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{yogaClass.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to={`/classes${queryParams}`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-purple-500 border-2 border-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 hover:border-purple-600 transition-all duration-300 group"
              >
                <span>View All Classes</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-slide-up">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Why Choose <span className="text-purple-500">TheYogaStudio</span>?
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "🧘",
                  title: "Expert Guidance",
                  description: "Learn from professional instructors and yoga experts",
                },
                {
                  icon: "🌍",
                  title: "Global Classes",
                  description: "Discover styles from every corner of the world",
                },
                {
                  icon: "⭐",
                  title: "Premium Quality",
                  description: "Tested classes with high success rates",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-md p-8 group animate-bounce-in hover:border-white/40 hover:shadow-xl hover:shadow-white/10 transition-all duration-300"
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

        {/* Footer */}
        <footer className="relative border-t border-white/20 bg-white/10 backdrop-blur-md py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-6">
              <img src="/logo.png" alt="TheYogaStudio" className="w-20 h-20 object-contain" />
              <p className="text-white/80 text-sm">Your gateway to yoga excellence</p>
              <div className="border-t border-white/20 pt-6 w-full">
                <p className="text-white/80 text-sm mb-2">&copy; 2025, Alphamovil All Rights Reserved</p>
                <div className="flex gap-2 justify-center text-white/80 text-sm">
                  <Link to={`/terms${queryParams}`} className="hover:text-white">Terms of Services</Link>
                  <span>|</span>
                  <Link to={`/refund${queryParams}`} className="hover:text-white">Refund Policy</Link>
                  <span>|</span>
                  <Link to={`/privacy${queryParams}`} className="hover:text-white">Privacy Policy</Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
