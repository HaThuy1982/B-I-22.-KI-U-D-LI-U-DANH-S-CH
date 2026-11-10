import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { TrainVisualizer } from '../TrainVisualizer';
import { TrainCarItem } from '../../types';
import { playTrainWhistle, playClick } from '../../utils/audio';

interface Screen1WelcomeProps {
  onStart: () => void;
  classroomMode: boolean;
}

const sampleCars: TrainCarItem[] = [
  { id: '1', value: 7, type: 'int', color: '#3b82f6' },
  { id: '2', value: 'Lan', type: 'str', color: '#10b981' },
  { id: '3', value: 3.5, type: 'float', color: '#f59e0b' },
  { id: '4', value: true, type: 'bool', color: '#8b5cf6' },
  { id: '5', value: 'Tin', type: 'str', color: '#ec4899' },
];

export const Screen1Welcome: React.FC<Screen1WelcomeProps> = ({ onStart, classroomMode }) => {
  const handleStart = () => {
    playTrainWhistle();
    playClick();
    onStart();
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Hero Welcome Banner */}
      <div className="text-center space-y-4 pt-4">
        {/* Editorial Subtitle without pill enclosure */}
        <div className="flex items-center justify-center gap-2 text-xs md:text-sm font-semibold text-amber-800 tracking-wide">
          <span>Hành trình lập trình cho người mới bắt đầu</span>
          <span aria-hidden="true">·</span>
          <span>Python cơ bản</span>
          <span aria-hidden="true">·</span>
          <span>Khái niệm Danh sách (List) & Index</span>
        </div>

        {/* Main Title */}
        <h1
          className={`font-black text-slate-900 tracking-tight ${
            classroomMode ? 'text-4xl md:text-6xl' : 'text-3xl md:text-5xl'
          }`}
        >
          ĐOÀN TÀU BÍ ẨN
        </h1>

        <p
          className={`text-slate-700 font-medium max-w-2xl mx-auto ${
            classroomMode ? 'text-xl md:text-2xl' : 'text-base md:text-lg'
          }`}
        >
          Một chuyến phiêu lưu trực quan khám phá{' '}
          <span className="font-mono font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded">
            Python List
          </span>{' '}
          và bí mật vì sao máy tính luôn đếm từ số 0!
        </p>
      </div>

      {/* Train Interactive Canvas */}
      <div className="bg-gradient-to-b from-sky-100/70 via-amber-50/50 to-white border border-amber-200/90 rounded-3xl p-4 md:p-6 shadow-sm overflow-hidden relative">
        {/* Station Signplate */}
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Nhà ga Trung Tâm: Tuyến Tàu Dữ Liệu
            </span>
          </div>
          <span className="text-xs text-slate-500 font-mono">5 toa đang sẵn sàng rời ga</span>
        </div>

        {/* Visual train */}
        <TrainVisualizer
          cars={sampleCars}
          showHumanPosition={true}
          showPythonIndex={true}
          showTypeBadge={true}
          interactive={false}
        />
      </div>

      {/* Primary Start CTA Button */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <button
          onClick={handleStart}
          className={`font-bold text-white bg-amber-600 hover:bg-amber-700 active:scale-95 transition-all rounded-2xl shadow-lg hover:shadow-xl flex items-center justify-center gap-3 cursor-pointer ring-4 ring-amber-300/40 ${
            classroomMode ? 'text-xl py-5 px-10' : 'text-lg py-4 px-8'
          }`}
        >
          <Sparkles className="w-6 h-6 animate-spin" style={{ animationDuration: '4s' }} />
          <span>BẮT ĐẦU KHÁM PHÁ</span>
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>

      {/* Learning Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-3">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Hiểu List là gì</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Một danh sách trong Python như một đoàn tàu, có thể chở nhiều loại hàng hóa: số nguyên, chữ cái, số thập phân hay đúng/sai!
            </p>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-blue-700 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Đa dạng kiểu dữ liệu</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold mb-3">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Bí mật Index từ 0</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Khám phá vì sao máy tính luôn bắt đầu đếm từ 0 và phân biệt vị trí đời thường với chỉ số Index của lập trình viên.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-amber-700 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Quy tắc Index = Vị trí - 1</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-3">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Thao tác & Quản lý</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Học lệnh thêm <code className="font-mono text-emerald-800">append()</code>, xóa <code className="font-mono text-emerald-800">pop()</code> và quản lý điểm số cho lớp 40 học sinh!
            </p>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Ứng dụng thực tế ngay lập tức</span>
          </div>
        </div>
      </div>
    </div>
  );
};
