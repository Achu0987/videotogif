'use client';

export default function Header({ activeTab, setActiveTab }) {
  return (
    <header className="w-full flex flex-wrap items-center justify-between px-4 md:px-8 py-3 md:py-4 bg-white/80 backdrop-blur-md border-b border-gray-100 font-sans z-50 sticky top-0 transition-all gap-y-4">
      {/* Left: Logo Area */}
      <div 
        className="flex items-center gap-2 md:gap-3 cursor-pointer w-auto md:w-48 shrink-0"
        onClick={() => setActiveTab('home')}
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-[0_4px_10px_rgba(244,63,94,0.3)]">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-900 font-extrabold text-[15px] leading-tight tracking-tight">Converter</span>
          <span className="text-gray-400 text-[11px] font-semibold uppercase tracking-wider">Free Tool</span>
        </div>
      </div>

      {/* Center: Navigation Pill */}
      <div className="flex items-center justify-center w-full md:w-auto order-3 md:order-none bg-[#f4f4f5] rounded-full p-1.5 shadow-inner overflow-x-auto hide-scrollbar">
        <button 
          onClick={() => setActiveTab('home')}
          className={`px-6 py-2 rounded-full font-bold text-xs tracking-wide transition-all duration-300 ${
            activeTab === 'home' 
              ? 'bg-white text-gray-900 shadow-[0_2px_8px_rgba(0,0,0,0.06)] scale-100' 
              : 'text-gray-500 hover:text-gray-900 scale-95'
          }`}
        >
          HOME
        </button>
        <button 
          onClick={() => setActiveTab('videotogif')}
          className={`px-6 py-2 rounded-full font-bold text-xs tracking-wide transition-all duration-300 ${
            activeTab === 'videotogif' 
              ? 'bg-white text-gray-900 shadow-[0_2px_8px_rgba(0,0,0,0.06)] scale-100' 
              : 'text-gray-500 hover:text-gray-900 scale-95'
          }`}
        >
          VIDEO TO GIF
        </button>
        <button 
          onClick={() => setActiveTab('giftovideo')}
          className={`px-6 py-2 rounded-full font-bold text-xs tracking-wide transition-all duration-300 ${
            activeTab === 'giftovideo' 
              ? 'bg-white text-gray-900 shadow-[0_2px_8px_rgba(0,0,0,0.06)] scale-100' 
              : 'text-gray-500 hover:text-gray-900 scale-95'
          }`}
        >
          GIF TO VIDEO
        </button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center justify-end gap-2 md:gap-4 w-auto md:w-48 shrink-0 order-2 md:order-none">
        <button className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#f4f4f5] flex items-center justify-center text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors">
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>
        <button className="px-4 py-2 md:px-6 md:py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs md:text-sm transition-all shadow-[0_4px_14px_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] transform hover:-translate-y-0.5 whitespace-nowrap">
          Sign In
        </button>
      </div>
    </header>
  );
}
