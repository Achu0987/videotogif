'use client';

import { useState, useEffect, useRef } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

export default function GifToVideo() {
  const [loaded, setLoaded] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('Loading Conversion Engine...');
  const ffmpegRef = useRef(null);
  
  const [gifFile, setGifFile] = useState(null);
  const [gifUrl, setGifUrl] = useState('');
  
  const [videoUrl, setVideoUrl] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);

  // Settings
  const [quality, setQuality] = useState(23); // CRF value: 18 (Best) to 32 (Smaller)
  const [loops, setLoops] = useState(1);

  useEffect(() => {
    ffmpegRef.current = new FFmpeg();
    loadFfmpeg();
  }, []);

  const loadFfmpeg = async () => {
    try {
      const ffmpeg = ffmpegRef.current;
      ffmpeg.on('log', ({ message }) => console.log(message));
      ffmpeg.on('progress', ({ progress }) => setProgress(Math.round(progress * 100)));
      
      await ffmpeg.load({
        coreURL: 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.js',
        wasmURL: 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.wasm',
      });
      
      setLoaded(true);
    } catch (err) {
      console.error('Failed to load FFmpeg', err);
      setLoadingMsg('Engine failed to load. Check console.');
    }
  };

  const handleGifUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setGifFile(file);
    setGifUrl(URL.createObjectURL(file));
    setVideoUrl('');
    setProgress(0);
  };

  const resetApp = () => {
    setGifFile(null);
    setGifUrl('');
    setVideoUrl('');
    setProgress(0);
    setQuality(23);
    setLoops(1);
  };

  const convertToVideo = async () => {
    if (!gifFile || !loaded) return;
    setIsConverting(true);
    setProgress(0);
    setVideoUrl('');

    try {
      const ffmpeg = ffmpegRef.current;
      const inputName = 'input.gif';
      const outputName = 'output.mp4';

      await ffmpeg.writeFile(inputName, await fetchFile(gifFile));

      // Build FFmpeg command for GIF to MP4
      const args = ['-y'];
      
      // If user wants to loop the GIF multiple times to make a longer MP4
      if (loops > 1) {
        args.push('-stream_loop', `${loops - 1}`);
      }
      
      args.push(
        '-i', inputName,
        '-movflags', 'faststart',
        '-pix_fmt', 'yuv420p',
        '-crf', `${quality}`,
        '-preset', 'fast',
        '-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2', // Ensure dimensions are even for H.264
        outputName
      );

      const ret = await ffmpeg.exec(args);

      if (ret !== 0) throw new Error(`FFmpeg exited with code ${ret}`);

      const data = await ffmpeg.readFile(outputName);
      if (data.length === 0) throw new Error('Output file is empty');
      
      const url = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
      setVideoUrl(url);
    } catch (err) {
      console.error('Conversion failed', err);
      alert('Conversion failed. Check console for details.');
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="flex flex-col items-center py-12 px-4 selection:bg-blue-100 w-full font-sans">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-gray-900">
            Convert GIF to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">Video</span>
          </h1>
          <p className="text-gray-500 text-lg">Turn heavy animated GIFs into perfectly optimized MP4s for social media.</p>
        </div>

        {!loaded ? (
          <div className="flex flex-col items-center justify-center p-12 border border-gray-100 rounded-3xl bg-white shadow-sm">
            <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin mb-4"></div>
            <p className="text-blue-500 font-medium animate-pulse">{loadingMsg}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Column: Upload */}
            <div className="space-y-6">
              <div className="relative group rounded-[2rem] border-2 border-dashed border-gray-200 hover:border-blue-400 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(59,130,246,0.08)] transition-all duration-300 overflow-hidden">
                <input 
                  type="file" 
                  accept="image/gif" 
                  onChange={handleGifUpload} 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="p-12 text-center flex flex-col items-center justify-center h-full min-h-[400px]">
                  {gifUrl ? (
                    <img 
                      src={gifUrl} 
                      alt="Uploaded GIF"
                      className="max-h-[360px] rounded-2xl shadow-xl relative z-20 pointer-events-auto w-full object-contain bg-gray-50 border border-gray-100"
                    />
                  ) : (
                    <>
                      <div className="w-20 h-20 mb-6 rounded-3xl bg-blue-50 shadow-inner border border-blue-100 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
                        <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                      </div>
                      <p className="text-2xl font-bold text-gray-900 tracking-tight">Drop your GIF here</p>
                      <p className="text-sm text-gray-500 mt-3 font-medium">Any GIF format (Max 100MB)</p>
                    </>
                  )}
                </div>
              </div>

              {/* Action Area */}
              {gifFile && (
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={convertToVideo}
                      disabled={isConverting}
                      className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 shadow-md transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                        videoUrl 
                          ? 'bg-white border-2 border-blue-500 text-blue-600 hover:bg-blue-50' 
                          : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white hover:shadow-lg'
                      }`}
                    >
                      {isConverting ? 'Processing...' : (videoUrl ? 'Re-convert with these settings' : 'Convert to MP4')}
                    </button>

                    {videoUrl && (
                      <button 
                        onClick={resetApp}
                        className="w-full py-4 px-6 rounded-2xl font-bold text-lg bg-gray-900 hover:bg-gray-800 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Convert New GIF
                      </button>
                    )}
                  </div>

                  {isConverting && (
                    <div className="mt-6">
                      <div className="flex justify-between text-sm mb-2 text-gray-700 font-medium">
                        <span>Encoding Video</span>
                        <span className="text-blue-500">{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2.5 rounded-full transition-all duration-300 ease-out relative"
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
              
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden group">
                <h2 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Export Settings
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center text-sm font-medium text-gray-700 mb-2">
                      <label>Video Quality (CRF)</label>
                      <span className="text-gray-900 font-bold">{quality === 18 ? 'Ultra' : quality <= 23 ? 'High' : 'Standard'}</span>
                    </div>
                    <input 
                      type="range" 
                      min="18" 
                      max="32" 
                      step="1"
                      value={quality}
                      onChange={(e) => setQuality(Number(e.target.value))}
                      className="w-full accent-blue-500 bg-gray-200 rounded-lg appearance-none h-1.5 cursor-pointer"
                      style={{ direction: 'rtl' }} // lower CRF is higher quality, so we flip the slider visually
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
                      <span>Smaller File</span>
                      <span>Best Quality</span>
                    </div>
                  </div>

                  <hr className="border-gray-100" />

                  <div>
                    <div className="flex justify-between items-center text-sm font-medium text-gray-700 mb-2">
                      <label>Loop Count</label>
                      <span className="text-cyan-600 font-bold">{loops}x</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="10" 
                      value={loops} 
                      onChange={(e) => setLoops(Number(e.target.value))}
                      className="w-full accent-cyan-500 bg-gray-200 rounded-lg appearance-none h-1.5 cursor-pointer"
                    />
                    <p className="text-xs text-gray-400 mt-2 font-medium">
                      Extend short GIFs by looping them multiple times into a single video file.
                    </p>
                  </div>
                </div>
              </div>

              {/* Output Result */}
              {videoUrl && (
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_8px_30px_rgba(59,130,246,0.1)] relative animate-[fade-in_0.5s_ease-out]">
                  <div className="relative">
                    <h3 className="text-lg font-bold mb-4 text-gray-900 flex justify-between items-center">
                      <span>Ready to Download!</span>
                      <span className="text-xs px-3 py-1 rounded-full bg-green-50 text-green-600 font-bold">Success</span>
                    </h3>
                    <div className="rounded-2xl overflow-hidden mb-6 bg-black flex justify-center border border-gray-100">
                      <video src={videoUrl} controls className="max-w-full max-h-[300px] object-contain" />
                    </div>
                    <a 
                      href={videoUrl} 
                      download="converted-video.mp4"
                      className="block w-full text-center py-4 rounded-2xl font-bold text-gray-900 bg-white border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-all duration-300 shadow-sm"
                    >
                      Download MP4
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Info Section Below Tool */}
        <div className="mt-32 pt-16 border-t border-gray-100">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Convert GIF to MP4?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">GIFs are notorious for massive file sizes. Converting them to MP4 can reduce the file size by over 90%, making them perfect for Instagram, Twitter, and fast web loading.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">90% Smaller Files</h3>
              <p className="text-gray-500 text-sm leading-relaxed">MP4 uses H.264 compression which is infinitely more efficient than the 30-year-old GIF format. Save your bandwidth.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <div className="w-12 h-12 bg-cyan-50 text-cyan-500 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Social Media Ready</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Instagram and TikTok do not support direct GIF uploads. Convert your GIFs to MP4 to post them effortlessly on any social platform.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">100% Private</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Like all our tools, conversion happens locally in your web browser. No files are ever sent to external servers.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
