import React from 'react';
import { GraduationCap, Volume2, VolumeX } from 'lucide-react';
import { ScreenId } from '../types';
import { playClick } from '../utils/audio';

interface NavbarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  isSoundEnabled: boolean;
  onToggleSound: () => void;
  isTeacherToolbarOpen: boolean;
  onToggleTeacherToolbar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  isSoundEnabled,
  onToggleSound,
  isTeacherToolbarOpen,
  onToggleTeacherToolbar,
}) => {
  const navItems: { id: ScreenId; label: string }[] = [
    { id: 1, label: 'Lên tàu' },
    { id: 2, label: 'Bí ẩn' },
    { id: 3, label: 'Giải mã Index' },
    { id: 4, label: 'Thí nghiệm' },
    { id: 5, label: 'Lớp 40 trò' },
    { id: 6, label: 'Thử thách' },
    { id: 7, label: 'Huy hiệu' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 md:gap-8 px-4 md:px-8 py-3.5">
        {/* Zone 1: Single text wordmark */}
        <button
          onClick={() => {
            playClick();
            onNavigate(1);
          }}
          className="text-lg md:text-xl font-extrabold tracking-tight text-amber-900 whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer group"
        >
          <span className="text-2xl transition-transform group-hover:scale-110">🚂</span>
          <span className="font-display">Đoàn Tàu Python</span>
        </button>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                playClick();
                onNavigate(item.id);
              }}
              className={`hover:text-amber-800 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 cursor-pointer ${
                currentScreen === item.id
                  ? 'text-amber-800 border-amber-600 font-bold'
                  : 'border-transparent text-slate-600 hover:border-amber-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Action Controls (Sound toggle + Teacher Mode) */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => {
              playClick();
              onToggleSound();
            }}
            title={isSoundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
            className="p-2 text-slate-600 hover:text-amber-800 hover:bg-amber-100/60 rounded-xl transition-colors cursor-pointer"
          >
            {isSoundEnabled ? <Volume2 className="w-5 h-5 text-emerald-600" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
          </button>

          <button
            onClick={() => {
              playClick();
              onToggleTeacherToolbar();
            }}
            className={`px-3.5 py-2 text-xs md:text-sm font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
              isTeacherToolbarOpen
                ? 'bg-amber-600 text-white'
                : 'bg-amber-100/80 text-amber-950 hover:bg-amber-200 border border-amber-300'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-amber-800" />
            <span className="whitespace-nowrap">Chế độ Giáo Viên</span>
          </button>
        </div>
      </div>

      {/* Mobile sub-navigation bar */}
      <div className="lg:hidden flex items-center gap-2 overflow-x-auto px-4 py-2 border-t border-amber-100 bg-amber-50/50">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              playClick();
              onNavigate(item.id);
            }}
            className={`text-xs font-semibold px-2.5 py-1 rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              currentScreen === item.id
                ? 'bg-amber-600 text-white'
                : 'bg-white text-slate-700 border border-amber-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
