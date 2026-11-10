import { useState, useEffect } from 'react';
import { ScreenId, TeacherSettings, BadgeStatus } from './types';
import { Navbar } from './components/Navbar';
import { TeacherToolbar } from './components/TeacherToolbar';
import { Screen1Welcome } from './components/screens/Screen1Welcome';
import { Screen2Mystery } from './components/screens/Screen2Mystery';
import { Screen3DecodeIndex } from './components/screens/Screen3DecodeIndex';
import { Screen4Laboratory } from './components/screens/Screen4Laboratory';
import { Screen5Challenge40 } from './components/screens/Screen5Challenge40';
import { Screen6Quiz } from './components/screens/Screen6Quiz';
import { Screen7Summary } from './components/screens/Screen7Summary';
import { setMuted } from './utils/audio';

const initialBadges: BadgeStatus[] = [
  {
    id: 'rookie',
    title: 'Huy hiệu Tân Binh',
    description: 'Khám phá thành công điều bất ngờ ở Toa tàu số 2.',
    icon: '🎖️',
    unlocked: false,
  },
  {
    id: 'detective',
    title: 'Huy hiệu Thám Tử Index',
    description: 'Hiểu cặn kẽ vì sao Python luôn bắt đầu đếm từ 0.',
    icon: '🔍',
    unlocked: false,
  },
  {
    id: 'engineer',
    title: 'Huy hiệu Kỹ Sư List',
    description: 'Thao tác thành thạo append, modify và pop trong phòng thí nghiệm.',
    icon: '🛠️',
    unlocked: false,
  },
  {
    id: 'captain',
    title: 'Huy hiệu Thuyền Trưởng Python',
    description: 'Đạt ít nhất 80% (từ 4/5 câu) trong bài kiểm tra 5 thử thách.',
    icon: '👨‍✈️',
    unlocked: false,
  },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>(1);
  const [isTeacherToolbarOpen, setIsTeacherToolbarOpen] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [badges, setBadges] = useState<BadgeStatus[]>(initialBadges);

  const [teacherSettings, setTeacherSettings] = useState<TeacherSettings>({
    soundEnabled: true,
    classroomMode: false,
    hideAnswers: false,
    revealSolutions: false,
    fullscreen: false,
  });

  useEffect(() => {
    setMuted(!teacherSettings.soundEnabled);
  }, [teacherSettings.soundEnabled]);

  const unlockBadge = (badgeId: string) => {
    setBadges((prev) =>
      prev.map((b) => (b.id === badgeId ? { ...b, unlocked: true } : b))
    );
  };

  const handleUpdateSettings = (newSettings: Partial<TeacherSettings>) => {
    setTeacherSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const handleResetApp = () => {
    setCurrentScreen(1);
    setQuizScore(0);
    setBadges(initialBadges);
    setTeacherSettings((prev) => ({
      ...prev,
      hideAnswers: false,
      revealSolutions: false,
    }));
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-all bg-amber-50/40 text-slate-900 ${
        teacherSettings.classroomMode ? 'text-lg' : 'text-base'
      }`}
    >
      {/* Top Bar Contract (Wordmark - Links - Primary Action) */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={(screenId) => setCurrentScreen(screenId)}
        isSoundEnabled={teacherSettings.soundEnabled}
        onToggleSound={() =>
          handleUpdateSettings({ soundEnabled: !teacherSettings.soundEnabled })
        }
        isTeacherToolbarOpen={isTeacherToolbarOpen}
        onToggleTeacherToolbar={() => setIsTeacherToolbarOpen(!isTeacherToolbarOpen)}
      />

      {/* Main Content Stage */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 pb-28">
        {currentScreen === 1 && (
          <Screen1Welcome
            onStart={() => setCurrentScreen(2)}
            classroomMode={teacherSettings.classroomMode}
          />
        )}

        {currentScreen === 2 && (
          <Screen2Mystery
            onNext={() => setCurrentScreen(3)}
            classroomMode={teacherSettings.classroomMode}
            hideAnswers={teacherSettings.hideAnswers}
            onUnlockBadge={unlockBadge}
          />
        )}

        {currentScreen === 3 && (
          <Screen3DecodeIndex
            onNext={() => setCurrentScreen(4)}
            classroomMode={teacherSettings.classroomMode}
            onUnlockBadge={unlockBadge}
          />
        )}

        {currentScreen === 4 && (
          <Screen4Laboratory
            onNext={() => setCurrentScreen(5)}
            classroomMode={teacherSettings.classroomMode}
            onUnlockBadge={unlockBadge}
          />
        )}

        {currentScreen === 5 && (
          <Screen5Challenge40
            onNext={() => setCurrentScreen(6)}
            classroomMode={teacherSettings.classroomMode}
            hideAnswers={teacherSettings.hideAnswers}
            onUnlockBadge={unlockBadge}
          />
        )}

        {currentScreen === 6 && (
          <Screen6Quiz
            onNext={() => setCurrentScreen(7)}
            classroomMode={teacherSettings.classroomMode}
            hideAnswers={teacherSettings.hideAnswers}
            onSetQuizScore={(score) => setQuizScore(score)}
            onUnlockBadge={unlockBadge}
          />
        )}

        {currentScreen === 7 && (
          <Screen7Summary
            quizScore={quizScore}
            badges={badges}
            onRestartAll={handleResetApp}
            classroomMode={teacherSettings.classroomMode}
          />
        )}
      </main>

      {/* Teacher Control Drawer / Toolbar */}
      <TeacherToolbar
        currentScreen={currentScreen}
        onNavigate={(s) => setCurrentScreen(s)}
        settings={teacherSettings}
        onUpdateSettings={handleUpdateSettings}
        onResetApp={handleResetApp}
        isOpen={isTeacherToolbarOpen}
        onClose={() => setIsTeacherToolbarOpen(false)}
      />

      {/* Clean Academic Footer without slop */}
      <footer className="border-t border-amber-200/60 bg-white/60 py-4 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            Đoàn Tàu Bí Ẩn · Nền tảng học Python List & Index trực quan
          </div>
          <div>
            Nguyên tắc cốt lõi: <strong>Python luôn bắt đầu đếm từ 0</strong>
          </div>
        </div>
      </footer>
    </div>
  );
}
