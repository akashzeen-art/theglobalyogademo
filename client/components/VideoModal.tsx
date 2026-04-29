import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
}

const isIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

const getOptimizedUrl = (url: string) => {
  if (!url) return url;
  return isIOS() ? url.replace('play_480p.mp4', 'play_360p.mp4') : url;
};

export default function VideoModal({ isOpen, onClose, videoUrl, title }: VideoModalProps) {
  const [error, setError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const optimizedUrl = getOptimizedUrl(videoUrl);

  useEffect(() => {
    setError(false);
    if (isOpen && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [videoUrl, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-5xl mx-4" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-12 right-0 text-white hover:text-purple-500 transition-colors">
          <X className="w-8 h-8" />
        </button>
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
          {!videoUrl ? (
            <div className="flex items-center justify-center h-full text-white">
              <p>No video URL provided</p>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full text-white">
              <p>Unable to load video. Please try again.</p>
            </div>
          ) : (
            <video
              ref={videoRef}
              key={optimizedUrl}
              className="w-full h-full"
              controls
              playsInline
              autoPlay
              preload="auto"
              webkit-playsinline="true"
              x-webkit-airplay="allow"
              onError={() => setError(true)}
            >
              <source src={optimizedUrl} type="video/mp4" />
            </video>
          )}
        </div>
      </div>
    </div>
  );
}
