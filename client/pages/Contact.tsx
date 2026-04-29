import Navbar from "@/components/Navbar";
import VideoBackground from "@/components/VideoBackground";
import { MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <div className="relative min-h-screen bg-yoga-cream">
      <VideoBackground />

      <div className="relative z-20">
        <Navbar />

        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-slide-up">
              <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
                Contact <span className="text-purple-500">Us</span>
              </h1>
              <p className="text-xl text-white/90">
                We'd love to hear from you. Feel free to reach out!
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 sm:p-12 animate-fade-in">
              <h2 className="text-3xl font-bold text-white mb-8">Alphamovil Digital Solutions LLP</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Address</h3>
                    <p className="text-white/80 text-lg">
                      Sector 54, Gurgaon, Haryana, 122011
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Phone</h3>
                    <a href="tel:+919667687077" className="text-white/80 text-lg hover:text-purple-400 transition-colors">
                      +91 9667687077
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
                    <a href="mailto:bd@alphamovil.com" className="text-white/80 text-lg hover:text-purple-400 transition-colors">
                      bd@alphamovil.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Right side - Contact Form Button */}
              <div className="flex flex-col justify-center items-center text-center space-y-6 mt-12 pt-12 border-t border-white/20">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-white">Facing an issue?</h3>
                  <p className="text-white/70 mb-6">Use this form for the quickest response from our team.</p>
                </div>

                <a
                  href="https://forms.gle/ddgv2HcZjgenot636"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold text-lg rounded-lg transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Send us a Message
                </a>
              </div>
            </div>
          </div>
        </section>

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
