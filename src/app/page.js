'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import VideoToGif from '@/components/VideoToGif';
import GifToVideo from '@/components/GifToVideo';
import HomeContent from '@/components/HomeContent';
import Footer from '@/components/Footer';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen font-sans flex flex-col bg-[#fafafa]">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 w-full flex justify-center mb-12">
        {activeTab === 'home' && <HomeContent setActiveTab={setActiveTab} />}
        {activeTab === 'videotogif' && <VideoToGif />}
        {activeTab === 'giftovideo' && <GifToVideo />}
      </main>

      <Footer />

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
