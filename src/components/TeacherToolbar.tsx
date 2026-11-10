import React from 'react';
import { 
  GraduationCap, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  RotateCcw, 
  EyeOff, 
  Eye, 
  Tv, 
  X
} from 'lucide-react';
import { ScreenId, TeacherSettings } from '../types';
import { playClick, playTrainWhistle } from '../utils/audio';

interface TeacherToolbarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  settings: TeacherSettings;
  onUpdateSettings: (newSettings: Partial<TeacherSettings>) => void;
  onResetApp: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherToolbar: React.FC<TeacherToolbarProps> = ({
  currentScreen,
  onNavigate,
  settings,
  onUpdateSettings,
  onResetApp,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const toggleFullscreen = () => {
    playClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      onUpdateSettings({ fullscreen: true });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        onUpdateSettings({ fullscreen: false });
      }
    }
  };

  const screens: { id: ScreenId; title: string }[] = [
    { id: 1, title: '1. Chào mừng' },
    { id: 2, title: '2. Bí ẩn Toa tàu' },
    { id: 3, title: '3. Giải mã Index' },
    { id: 4, title: '4. Phòng thí nghiệm' },
    { id: 5, title: '5. Thử thách 40 học sinh' },
    { id: 6, title: '6. Vượt 5 thử thách' },
    { id: 7, title: '7. Tổng kết & Huy hiệu' },
  ];

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 bg-slate-900/95 text-white border-t border-slate-700 shadow-2xl backdrop-blur-md animate-fadeIn">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Header title */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-500 rounded-lg text-slate-950 font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-amber-400 font-bold">
                Bảng điều khiển Giảng Dạy
              </div>
              <div className="text-sm font-semibold text-slate-200">
                Dành riêng cho Giáo Viên trên lớp
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Screen quick jumper buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
          {screens.map((sc) => (
            <button
              key={sc.id}
              onClick={() => {
                playClick();
                onNavigate(sc.id);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                currentScreen === sc.id
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {sc.title}
            </button>
          ))}
        </div>

        {/* Classroom Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Audio toggle */}
          <button
            onClick={() => {
              playClick();
              onUpdateSettings({ soundEnabled: !settings.soundEnabled });
            }}
            title={settings.soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
            className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              settings.soundEnabled
                ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            {settings.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{settings.soundEnabled ? 'Âm thanh: Bật' : 'Âm thanh: Tắt'}</span>
          </button>

          {/* Test whistle */}
          <button
            onClick={() => playTrainWhistle()}
            title="Thổi còi tàu"
            className="px-2.5 py-2 bg-amber-600/30 hover:bg-amber-600/50 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-semibold cursor-pointer"
          >
            📢 Còi tàu
          </button>

          {/* Classroom Projection zoom mode */}
          <button
            onClick={() => {
              playClick();
              onUpdateSettings({ classroomMode: !settings.classroomMode });
            }}
            title="Chế độ chiếu bảng lớp (Phóng to cỡ chữ)"
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              settings.classroomMode
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Tv className="w-4 h-4" />
            <span>{settings.classroomMode ? 'Thu nhỏ chuẩn' : 'Chiếu lớp học (To)'}</span>
          </button>

          {/* Hide/Reveal solutions toggle */}
          <button
            onClick={() => {
              playClick();
              onUpdateSettings({ hideAnswers: !settings.hideAnswers });
            }}
            title="Ẩn hoặc hiện đáp án để học sinh động não"
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              settings.hideAnswers
                ? 'bg-amber-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {settings.hideAnswers ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{settings.hideAnswers ? 'Đang che đáp án' : 'Hiện gợi ý'}</span>
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            title="Toàn màn hình"
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs cursor-pointer"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {/* Reset App */}
          <button
            onClick={() => {
              if (window.confirm('Thầy/Cô có muốn đặt lại tiến trình của toàn bộ chuyến tàu không?')) {
                playClick();
                onResetApp();
              }
            }}
            title="Đặt lại trò chơi"
            className="px-2.5 py-2 bg-red-900/40 hover:bg-red-800/60 text-red-200 border border-red-700/50 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Đặt lại</span>
          </button>

          {/* Close toolbar button */}
          <button
            onClick={onClose}
            className="hidden md:inline-flex p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg cursor-pointer"
            title="Đóng bảng giáo viên"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
