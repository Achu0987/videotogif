'use client';

export default function HomeContent({ setActiveTab }) {
  return (
    <div className="w-full bg-[#fafafa] min-h-screen font-sans text-gray-900 pb-20">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-red-500 font-medium text-sm mb-8 border border-red-100">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Fast, Free, and No Registration Required
        </div>
        
        <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4 text-gray-900">
          Download High Quality <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-pink-500">
            Video Conversions
          </span>
        </h1>
        
        <p className="text-gray-500 text-lg max-w-2xl mx-auto mt-6">
          Select your tool below, upload your media, and get instant access to 
          direct high-speed GIF or MP4 downloads right in your browser.
        </p>
      </div>

      {/* Tools Cards */}
      <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        {/* Card 1 */}
        <div 
          onClick={() => setActiveTab('videotogif')}
          className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(239,68,68,0.1)] transition-all cursor-pointer border border-gray-100 group transform hover:-translate-y-1"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-pink-500 transition-colors">Video to GIF Maker</h3>
          <p className="text-gray-500 leading-relaxed text-sm">
            Instantly convert your MP4, WebM, or MOV videos into high-quality, looping GIFs. Adjust frame rates, crop limits, and dithering quality with zero wait time.
          </p>
        </div>

        {/* Card 2 */}
        <div 
          onClick={() => setActiveTab('giftovideo')}
          className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(59,130,246,0.1)] transition-all cursor-pointer border border-gray-100 group transform hover:-translate-y-1"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-blue-500 transition-colors">GIF to MP4 Converter</h3>
          <p className="text-gray-500 leading-relaxed text-sm">
            Convert heavy animated GIFs into lightweight MP4 videos perfectly optimized for social media sharing. Enjoy ultra-fast local browser processing.
          </p>
        </div>
      </div>

      {/* How it works */}
      <div className="max-w-5xl mx-auto px-6 mb-24">
        <h2 className="text-3xl font-bold mb-2 text-gray-900">How to Convert Media</h2>
        <p className="text-gray-500 mb-10">Follow these 3 simple steps to extract and download video content instantly from your computer or phone.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-white rounded-[1.5rem] p-8 border border-gray-100 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-500 font-bold flex items-center justify-center mb-6 text-sm">1</div>
            <h4 className="font-bold text-gray-900 mb-3 text-lg">Upload File</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              Open the conversion tool, select your video or GIF file from your device, and drop it directly into the input area.
            </p>
          </div>
          
          {/* Step 2 */}
          <div className="bg-white rounded-[1.5rem] p-8 border border-gray-100 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-500 font-bold flex items-center justify-center mb-6 text-sm">2</div>
            <h4 className="font-bold text-gray-900 mb-3 text-lg">Adjust Settings</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              Choose the precise start and end times, tweak the frame rate (FPS), and pick the perfect quality level for your output.
            </p>
          </div>
          
          {/* Step 3 */}
          <div className="bg-white rounded-[1.5rem] p-8 border border-gray-100 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-500 font-bold flex items-center justify-center mb-6 text-sm">3</div>
            <h4 className="font-bold text-gray-900 mb-3 text-lg">Download File</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              Review the live preview generated entirely in your browser, and press "Download" to securely save the file to your device.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="max-w-5xl mx-auto px-6 mb-24">
        <h2 className="text-3xl font-bold mb-2 text-gray-900">Simple, Transparent Pricing</h2>
        <p className="text-gray-500 mb-10">Start converting for free, or upgrade to a VIP pass for unrestricted batch features.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Free Card */}
          <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex flex-col">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Guest User</h3>
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-4xl font-black text-gray-900">₹0</span>
              <span className="text-gray-500 text-sm font-medium">/ forever</span>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-gray-600 text-sm">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                3 Single Conversions / day
              </li>
              <li className="flex items-center gap-3 text-gray-600 text-sm">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                Standard Speed
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                Multi-File Batch Processing
              </li>
              <li className="flex items-center gap-3 text-gray-600 text-sm">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                Watermark Free
              </li>
            </ul>
            <button className="w-full py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-bold hover:border-gray-300 hover:bg-gray-50 transition-colors">
              Current Plan
            </button>
          </div>

          {/* Account Card */}
          <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex flex-col hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Free Account</h3>
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-4xl font-black text-gray-900">₹0</span>
              <span className="text-gray-500 text-sm font-medium">/ forever</span>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-gray-600 text-sm">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                10 Single Conversions / day
              </li>
              <li className="flex items-center gap-3 text-gray-600 text-sm">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                Standard Speed
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                Multi-File Batch Processing
              </li>
              <li className="flex items-center gap-3 text-gray-600 text-sm">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                Watermark Free
              </li>
            </ul>
            <button className="w-full py-3 rounded-xl bg-gray-900 text-white font-bold hover:bg-gray-800 transition-colors shadow-sm">
              Create Account
            </button>
          </div>

          {/* VIP Card */}
          <div className="bg-[#f0f4ff] rounded-[2rem] p-8 border-2 border-indigo-500 shadow-lg flex flex-col relative overflow-hidden transform hover:-translate-y-1 transition-transform">
            <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-lg flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              MOST POPULAR
            </div>
            <h3 className="text-2xl font-bold text-indigo-600 mb-2">VIP Pass</h3>
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-4xl font-black text-gray-900">₹10</span>
              <span className="text-gray-500 text-sm font-medium">/ 1 Day</span>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-gray-700 text-sm font-medium">
                <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                Unlimited Single Conversions
              </li>
              <li className="flex items-center gap-3 text-gray-700 text-sm font-medium">
                <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                Priority High-Speed Processing
              </li>
              <li className="flex items-center gap-3 text-indigo-700 text-sm font-bold">
                <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                Unlimited Multi-File Batch
              </li>
              <li className="flex items-center gap-3 text-gray-700 text-sm font-medium">
                <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                Watermark Free
              </li>
            </ul>
            <button className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors shadow-md">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>

      {/* Features Bottom */}
      <div className="max-w-5xl mx-auto px-6 border-t border-gray-200 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-500 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-1">100% Secure & Safe</h4>
              <p className="text-sm text-gray-500">Processing happens locally. No cookies or files are sent to servers.</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-1">High-Speed Conversions</h4>
              <p className="text-sm text-gray-500">Utilizes WebAssembly for blazing fast in-browser media processing.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-1">Cross-Platform</h4>
              <p className="text-sm text-gray-500">Compatible with all modern browsers across Windows, macOS, Android, and iOS.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
