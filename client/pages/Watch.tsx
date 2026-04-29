import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { X } from 'lucide-react';

const isIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

const isMobileDevice = () =>
  /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

const getOptimizedUrl = (url: string) => {
  if (!url) return url;
  return isMobileDevice() ? url.replace('play_480p.mp4', 'play_360p.mp4') : url;
};

export default function Watch() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const rawUrl = searchParams.get('url') || '';
  const videoTitle = searchParams.get('title');
  const videoDescription = searchParams.get('description');
  const videoUrl = getOptimizedUrl(rawUrl);

  useEffect(() => {
    setIsLoading(true);
    setError(false);
    const video = videoRef.current;
    if (!video) return;
    video.load();
    const tryPlay = () => video.play().catch(() => {});
    video.addEventListener('canplay', tryPlay, { once: true });
    return () => video.removeEventListener('canplay', tryPlay);
  }, [videoUrl]);

  // Track fullscreen state to hide close button when in fullscreen
  useEffect(() => {
    const onFullscreenChange = () => {
      const fs = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement
      );
      setIsFullscreen(fs);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    document.addEventListener('webkitfullscreenchange', onFullscreenChange);
    document.addEventListener('mozfullscreenchange', onFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', onFullscreenChange);
      document.removeEventListener('mozfullscreenchange', onFullscreenChange);
    };
  }, []);

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.src = '';
    }
    navigate(-1);
  };

  if (!rawUrl) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl mb-4">Video not found</h2>
          <button onClick={() => navigate('/')} className="px-6 py-3 bg-purple-600 rounded-lg">
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black" style={{ zIndex: 50 }}>
      {/* Close button — hidden during fullscreen so it doesn't block controls */}
      {!isFullscreen && (
        <button
          className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
          style={{ zIndex: 51 }}
          onClick={handleClose}
        >
          <X className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Loading spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 52 }}>
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500" />
        </div>
      )}

      {/* Video — positioned to fill screen with no overlapping containers */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-contain"
        controls
        playsInline
        autoPlay
        preload="auto"
        webkit-playsinline="true"
        x-webkit-airplay="allow"
        style={{ zIndex: 50 }}
        onLoadStart={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
        onError={() => { setIsLoading(false); setError(true); }}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      {error && (
        <div className="absolute inset-0 flex items-center justify-center text-white" style={{ zIndex: 53 }}>
          <p>Unable to load video. Please try again.</p>
        </div>
      )}

      {/* Title overlay — only show when not fullscreen */}
      {!isFullscreen && (videoTitle || videoDescription) && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6" style={{ zIndex: 51 }}>
          {videoTitle && <h3 className="text-white text-2xl font-bold mb-2">{videoTitle}</h3>}
          {videoDescription && <p className="text-white/80">{videoDescription}</p>}
        </div>
      )}
    </div>
  );
}
