import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { X, Maximize, Minimize } from 'lucide-react';

export default function Watch() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const videoUrl = searchParams.get('url');
  const videoTitle = searchParams.get('title');
  const videoDescription = searchParams.get('description');

  useEffect(() => {
    if (videoRef.current && videoUrl) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
      setIsPlaying(false);
      setIsLoading(true);
    }
  }, [videoUrl]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          exitFullscreen();
        } else {
          handleClose();
        }
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isFullscreen]);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => console.log('Play error:', err));
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const enterFullscreen = () => {
    const element = containerRef.current || videoRef.current;
    if (element) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if ((element as any).webkitRequestFullscreen) {
        (element as any).webkitRequestFullscreen();
      }
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    }
  };

  const toggleFullscreen = () => {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  };

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    navigate(-1);
  };

  if (!videoUrl) {
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
    <div className="fixed inset-0 bg-black z-50">
      <div className="relative w-full h-full">
        <button 
          className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors" 
          onClick={handleClose}
        >
          <X className="w-6 h-6 text-white" />
        </button>
        
        <button 
          className="absolute top-4 right-16 z-50 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors" 
          onClick={toggleFullscreen}
        >
          {isFullscreen ? <Minimize className="w-6 h-6 text-white" /> : <Maximize className="w-6 h-6 text-white" />}
        </button>
        
        <div className="w-full h-full flex items-center justify-center" ref={containerRef}>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          )}
          
          {!isPlaying && !isLoading && (
            <div className="absolute inset-0 flex items-center justify-center cursor-pointer" onClick={handlePlay}>
              <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors">
                <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
          
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            controls
            controlsList="nodownload noremoteplayback"
            disablePictureInPicture
            onPlay={handlePlay}
            onPause={handlePause}
            onEnded={() => setIsPlaying(false)}
            onLoadStart={() => setIsLoading(true)}
            onCanPlay={() => setIsLoading(false)}
            preload="metadata"
          >
            <source src={videoUrl} type="video/webm" />
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        {(videoTitle || videoDescription) && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            {videoTitle && <h3 className="text-white text-2xl font-bold mb-2">{videoTitle}</h3>}
            {videoDescription && <p className="text-white/80">{videoDescription}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
