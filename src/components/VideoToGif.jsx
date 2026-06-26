'use client';

import { useState, useEffect, useRef } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

export default function VideoToGif() {
  const [loaded, setLoaded] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('Loading Conversion Engine...');
  const ffmpegRef = useRef(null);
  
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoDuration, setVideoDuration] = useState(0);
  
  const [gifUrl, setGifUrl] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);

  // Settings
  const [fps, setFps] = useState(10);
  const [width, setWidth] = useState(480);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(10);
  const [quality, setQuality] = useState(2);

  useEffect(() => {
    ffmpegRef.current = new FFmpeg();
    loadFfmpeg();
  }, []);

  const loadFfmpeg = async () => {
    try {
      const ffmpeg = ffmpegRef.current;
      ffmpeg.on('log', ({ message }) => {
        console.log(message);
      });
      ffmpeg.on('progress', ({ progress }) => {
        setProgress(Math.round(progress * 100));
      });
      
      await ffmpeg.load({
        coreURL: 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.js',
        wasmURL: 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.wasm',
      });
      
      setLoaded(true);
    } catch (err) {
      console.error('Failed to load FFmpeg', err);
      setLoadingMsg('Failed to load FFmpeg. Please ensure Cross-Origin headers are set or check console.');
    }
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setVideoFile(file);
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    setGifUrl('');
    setProgress(0);
  };

  const resetApp = () => {
    setVideoFile(null);
    setVideoUrl('');
    setGifUrl('');
    setProgress(0);
    setVideoDuration(0);
    setStartTime(0);
    setEndTime(5);
  };

  const handleVideoLoaded = (e) => {
    const duration = Math.floor(e.target.duration);
    setVideoDuration(duration);
    setEndTime(Math.min(duration, 5));
    setStartTime(0);
  };

  const convertToGif = async () => {
    if (!videoFile || !loaded) return;
    setIsConverting(true);
    setProgress(0);
    setGifUrl('');

    try {
      const ffmpeg = ffmpegRef.current;
      
      const ext = videoFile.name.split('.').pop() || 'mp4';
      const inputName = `input.${ext}`;
      const outputName = 'output.gif';

      await ffmpeg.writeFile(inputName, await fetchFile(videoFile));

      const duration = endTime - startTime;

      const ret = await ffmpeg.exec([
        '-y',
        '-ss', `${startTime}`,
        '-t', `${duration}`,
        '-i', inputName,
        '-vf', `fps=${fps},scale=${width}:-1:flags=lanczos,split[s0][s1];[s0]palettegen=stats_mode=diff[p];[s1][p]paletteuse=dither=bayer:bayer_scale=${quality}`,
        '-loop', '0',
        '-f', 'gif',
        outputName
      ]);

      if (ret !== 0) {
        throw new Error(`FFmpeg exited with code ${ret}`);
      }

      const data = await ffmpeg.readFile(outputName);
      if (data.length === 0) {
        throw new Error('Output file is empty');
      }
      
      const url = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }));
      setGifUrl(url);
    } catch (err) {
      console.error('Conversion failed', err);
      alert('Conversion failed. Check console for FFmpeg logs. Try a smaller video or lower quality.');
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="flex flex-col items-center py-8 md:py-12 px-4 selection:bg-pink-100 w-full font-sans">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-black mb-3 md:mb-4 tracking-tight text-gray-900">
            Convert Video to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">GIF</span>
          </h1>
          <p className="text-gray-500 text-lg">Create high-quality looping GIFs instantly in your browser.</p>
        </div>

        {!loaded ? (
          <div className="flex flex-col items-center justify-center p-12 border border-gray-100 rounded-3xl bg-white shadow-sm">
            <div className="w-12 h-12 border-4 border-pink-100 border-t-pink-500 rounded-full animate-spin mb-4"></div>
            <p className="text-pink-500 font-medium animate-pulse">{loadingMsg}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            
            {/* Left Column: Upload & Preview */}
            <div className="space-y-6">
              <div className="relative group rounded-[2rem] border-2 border-dashed border-gray-200 hover:border-pink-400 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(236,72,153,0.08)] transition-all duration-300 overflow-hidden">
                <input 
                  type="file" 
                  accept="video/mp4,video/mov,video/webm" 
                  onChange={handleVideoUpload} 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="p-6 md:p-12 text-center flex flex-col items-center justify-center h-full min-h-[300px] md:min-h-[400px]">
                  {videoUrl ? (
                    <video 
                      src={videoUrl} 
                      controls 
                      className="max-h-[360px] rounded-2xl shadow-xl relative z-20 pointer-events-auto w-full object-contain bg-gray-900 border border-gray-100"
                      onLoadedMetadata={handleVideoLoaded}
                    />
                  ) : (
                    <>
                      <div className="w-20 h-20 mb-6 rounded-3xl bg-pink-50 shadow-inner border border-pink-100 flex items-center justify-center group-hover:scale-110 group-hover:bg-pink-100 transition-all duration-300">
                        <svg className="w-10 h-10 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                      </div>
                      <p className="text-2xl font-bold text-gray-900 tracking-tight">Drag & drop your video</p>
                      <p className="text-sm text-gray-500 mt-3 font-medium">MP4, MOV, WebM (Max 100MB)</p>
                    </>
                  )}
                </div>
              </div>

              {/* Progress & Convert Button */}
              {videoFile && (
                <div className="bg-white rounded-3xl p-5 md:p-6 border border-gray-100 shadow-sm">
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={convertToGif}
                      disabled={isConverting}
                      className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 shadow-md transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                        gifUrl 
                          ? 'bg-white border-2 border-pink-500 text-pink-600 hover:bg-pink-50' 
                          : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white hover:shadow-lg'
                      }`}
                    >
                      {isConverting ? 'Processing...' : (gifUrl ? 'Re-convert with these settings' : 'Convert to GIF')}
                    </button>

                    {gifUrl && (
                      <button 
                        onClick={resetApp}
                        className="w-full py-4 px-6 rounded-2xl font-bold text-lg bg-gray-900 hover:bg-gray-800 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Convert New Video
                      </button>
                    )}
                  </div>

                  {isConverting && (
                    <div className="mt-6">
                      <div className="flex justify-between text-sm mb-2 text-gray-700 font-medium">
                        <span>Encoding Frames</span>
                        <span className="text-pink-500">{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full transition-all duration-300 ease-out relative"
                          style={{ width: `${progress}%` }}
                        >
                          <div className="absolute top-0 left-0 right-0 bottom-0 bg-white/20 animate-[shimmer_1s_infinite]"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Column: Settings & Result */}
            <div className="space-y-6">
              
              {/* Settings Panel */}
              <div className="bg-white rounded-3xl p-5 md:p-8 border border-gray-100 shadow-sm relative overflow-hidden group">
                <h2 className="text-xl font-bold mb-5 md:mb-6 text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  GIF Settings
                </h2>
                
                <div className="space-y-6">
                  {/* Trim Controls */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm font-medium text-gray-700">
                      <label>Trim Video (Seconds)</label>
                      <span className="text-pink-500 font-bold">{startTime}s - {endTime}s</span>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="text-xs text-gray-500 mb-1 block">Start Time</label>
                        <input 
                          type="range" 
                          min="0" 
                          max={videoDuration || 100} 
                          value={startTime} 
                          onChange={(e) => setStartTime(Math.min(Number(e.target.value), endTime - 1))}
                          className="w-full accent-purple-500 bg-gray-200 rounded-lg appearance-none h-1.5 cursor-pointer"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs text-gray-500 mb-1 block">End Time</label>
                        <input 
                          type="range" 
                          min="0" 
                          max={videoDuration || 100} 
                          value={endTime} 
                          onChange={(e) => setEndTime(Math.max(Number(e.target.value), startTime + 1))}
                          className="w-full accent-pink-500 bg-gray-200 rounded-lg appearance-none h-1.5 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  <hr className="border-gray-100" />

                  {/* FPS & Quality */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <div className="flex justify-between items-center text-sm font-medium text-gray-700 mb-2">
                        <label>Frame Rate</label>
                        <span className="text-purple-500 font-bold">{fps} FPS</span>
                      </div>
                      <input 
                        type="range" 
                        min="5" 
                        max="30" 
                        value={fps} 
                        onChange={(e) => setFps(Number(e.target.value))}
                        className="w-full accent-purple-500 bg-gray-200 rounded-lg appearance-none h-1.5 cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-center text-sm font-medium text-gray-700 mb-2">
                        <label>Resolution</label>
                        <span className="text-pink-500 font-bold">{width}px</span>
                      </div>
                      <select 
                        value={width} 
                        onChange={(e) => setWidth(Number(e.target.value))}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-700 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all cursor-pointer font-medium text-sm"
                      >
                        <option value={320}>320p (Small)</option>
                        <option value={480}>480p (Standard)</option>
                        <option value={640}>640p (Medium)</option>
                        <option value={800}>800p (High)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-sm font-medium text-gray-700 mb-2">
                      <label>Dithering Quality</label>
                      <span className="text-gray-900 font-bold">Level {6 - quality}</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="5" 
                      value={5 - quality}
                      onChange={(e) => setQuality(5 - Number(e.target.value))}
                      className="w-full accent-pink-500 bg-gray-200 rounded-lg appearance-none h-1.5 cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
                      <span>Smaller File</span>
                      <span>Better Quality</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Output Result */}
              {gifUrl && (
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_8px_30px_rgba(236,72,153,0.1)] relative animate-[fade-in_0.5s_ease-out]">
                  <div className="relative">
                    <h3 className="text-lg font-bold mb-4 text-gray-900 flex justify-between items-center">
                      <span>Ready to Download!</span>
                      <span className="text-xs px-3 py-1 rounded-full bg-green-50 text-green-600 font-bold">Success</span>
                    </h3>
                    <div className="rounded-2xl overflow-hidden mb-6 bg-gray-50 flex justify-center border border-gray-100">
                      <img src={gifUrl} alt="Converted GIF" className="max-w-full max-h-[300px] object-contain" />
                    </div>
                    <a 
                      href={gifUrl} 
                      download="converted-awesome.gif"
                      className="block w-full text-center py-4 rounded-2xl font-bold text-gray-900 bg-white border-2 border-gray-200 hover:border-pink-500 hover:text-pink-600 transition-all duration-300 shadow-sm"
                    >
                      Download GIF
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Info Section Below Tool */}
        <div className="mt-16 md:mt-32 pt-12 md:pt-16 border-t border-gray-100">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Use Our Video to GIF Maker?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Everything happens instantly in your browser. No sketchy server uploads, no waiting in queues, and absolutely zero compromises on quality.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24">
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">100% Private & Secure</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Your files never leave your device. Our WebAssembly engine processes the video entirely within your local browser, guaranteeing absolute privacy.</p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <div className="w-12 h-12 bg-pink-50 text-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
              <p className="text-gray-500 text-sm leading-relaxed">No need to upload massive 100MB videos to a slow server. Since everything runs locally, conversions happen at the maximum speed your computer can handle.</p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Custom Palettes</h3>
              <p className="text-gray-500 text-sm leading-relaxed">We utilize FFmpeg's advanced palette generation and Bayer dithering to ensure your GIF retains the highest possible color accuracy and quality.</p>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto bg-gray-50 rounded-[2rem] p-6 md:p-10 border border-gray-100">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8 text-center">Frequently Asked Questions</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Is this tool actually free?</h4>
                <p className="text-sm text-gray-500">Yes! The base conversion tool is 100% free with no watermarks and no hidden fees.</p>
              </div>
              <hr className="border-gray-200" />
              <div>
                <h4 className="font-bold text-gray-900 mb-2">What is the maximum file size?</h4>
                <p className="text-sm text-gray-500">Because the conversion happens in your browser's memory, we recommend keeping videos under 100MB to prevent your browser from freezing.</p>
              </div>
              <hr className="border-gray-200" />
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Why does my GIF look pixelated?</h4>
                <p className="text-sm text-gray-500">GIFs are limited to 256 colors by design. To improve quality, try lowering the 'Dithering Quality' slider towards Level 1, which applies a smoother color blend.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
