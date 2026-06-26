export default function Footer() {
  return (
    <footer className="w-full bg-[#fafafa] border-t border-gray-200 mt-auto">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-10 flex flex-col md:flex-row justify-between items-start text-[13px] text-gray-500 font-sans gap-8 md:gap-0">
        
        {/* Left Side */}
        <div className="text-left">
          <p className="font-bold text-gray-900 text-base mb-3">CodeLove Converter Portal</p>
          <p className="mb-1 leading-relaxed">Disclaimer: We do not store, host, or crawl copyrighted social media content.</p>
          <p className="leading-relaxed">All files belong to their respective uploaders.</p>
        </div>

        {/* Right Side */}
        <div className="text-left md:text-right flex flex-col items-start md:items-end gap-3">
          <div className="flex gap-4 font-semibold text-gray-600 mb-1">
            <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Terms & Conditions</a>
          </div>
          <p className="font-mono text-xs text-gray-400">© 2026 codelove.in . All rights reserved.</p>
          <p className="text-gray-600 mt-1">
            Developed with <span className="text-red-500 mx-0.5">❤️</span> <span className="text-blue-500 font-mono font-bold mx-0.5">&lt;/&gt;</span> by <a href="https://harshitha.codelove.in" target="_blank" rel="noopener noreferrer" className="underline font-semibold text-gray-700 hover:text-pink-500 transition-colors">Harshitha</a>
          </p>
        </div>

      </div>
    </footer>
  );
}
