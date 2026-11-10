import React, { useState } from 'react';
import { 
  ArrowRight, 
  Terminal, 
  Sparkles, 
  AlertTriangle,
  Lightbulb
} from 'lucide-react';
import { TrainVisualizer } from '../TrainVisualizer';
import { FeynmanBox } from '../FeynmanBox';
import { TrainCarItem } from '../../types';
import { playClick, playSuccess, playWrong } from '../../utils/audio';

interface Screen3DecodeIndexProps {
  onNext: () => void;
  classroomMode: boolean;
  onUnlockBadge: (badgeId: string) => void;
}

const sampleCars: TrainCarItem[] = [
  { id: '1', value: 7, type: 'int', color: '#3b82f6' },
  { id: '2', value: 'Lan', type: 'str', color: '#10b981' },
  { id: '3', value: 3.5, type: 'float', color: '#f59e0b' },
  { id: '4', value: true, type: 'bool', color: '#8b5cf6' },
  { id: '5', value: 'Tin', type: 'str', color: '#ec4899' },
];

export const Screen3DecodeIndex: React.FC<Screen3DecodeIndexProps> = ({
  onNext,
  classroomMode,
  onUnlockBadge,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(1); // Default select "Lan" at index 1
  const [testIndexInput, setTestIndexInput] = useState<string>('1');
  const [queryError, setQueryError] = useState<string | null>(null);

  const handleSelectCar = (index: number) => {
    playClick();
    setSelectedIndex(index);
    setTestIndexInput(String(index));
    setQueryError(null);
    onUnlockBadge('detective');
  };

  const handleExecuteQuery = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const idx = parseInt(testIndexInput, 10);
    if (isNaN(idx)) {
      playWrong();
      setQueryError('ValueError: Chỉ số index phải là một số nguyên (ví dụ: 0, 1, 2...)');
      return;
    }

    if (idx >= 0 && idx < sampleCars.length) {
      playSuccess();
      setSelectedIndex(idx);
      setQueryError(null);
      onUnlockBadge('detective');
    } else if (idx === -1) {
      // Bonus feature: Python negative index!
      playSuccess();
      setSelectedIndex(sampleCars.length - 1);
      setQueryError(null);
    } else {
      playWrong();
      setQueryError(`IndexError: list index out of range (Danh sách chỉ có index từ 0 đến ${sampleCars.length - 1}, không tồn tại index ${idx}!)`);
    }
  };

  const currentCar = selectedIndex !== null && selectedIndex >= 0 && selectedIndex < sampleCars.length
    ? sampleCars[selectedIndex]
    : null;

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="text-xs md:text-sm font-semibold uppercase tracking-wider text-amber-800">
          Màn 3: Kiến thức trọng tâm
        </div>
        <h2
          className={`font-black text-slate-900 tracking-tight ${
            classroomMode ? 'text-3xl md:text-5xl' : 'text-2xl md:text-4xl'
          }`}
        >
          GIẢI MÃ BÍ MẬT INDEX
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base">
          Hãy bấm vào từng toa tàu bên dưới để khám phá mối liên hệ kỳ diệu giữa{' '}
          <strong className="text-blue-700">Vị trí thông thường</strong> và{' '}
          <strong className="text-amber-700">Python Index</strong>!
        </p>
      </div>

      {/* Prominent Core Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 p-4 md:p-5 rounded-2xl shadow-md text-center">
        <div className="text-xs font-black uppercase tracking-widest text-amber-950/80 mb-1">
          Quy tắc vàng của mọi lập trình viên
        </div>
        <div
          className={`font-black tracking-wide text-white drop-shadow-sm ${
            classroomMode ? 'text-2xl md:text-4xl' : 'text-xl md:text-3xl'
          }`}
        >
          PYTHON LUÔN BẮT ĐẦU ĐẾM TỪ 0!
        </div>
      </div>

      {/* Visual Train with 2 Rows of Data */}
      <div className="bg-white border-2 border-amber-300 rounded-3xl p-4 md:p-6 shadow-sm overflow-hidden space-y-4">
        {/* Visual Map Explanation */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs md:text-sm pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-600" />
            <span className="font-bold text-blue-900">Hàng trên: Vị trí người gọi (1, 2, 3, 4, 5)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="font-mono font-bold text-slate-900">Hàng dưới: Python Index (0, 1, 2, 3, 4)</span>
          </div>
          <div className="text-slate-500 italic">
            👉 Bấm vào toa để thử nghiệm
          </div>
        </div>

        {/* 2D Train Visualizer */}
        <TrainVisualizer
          cars={sampleCars}
          selectedIndex={selectedIndex}
          onSelectCar={handleSelectCar}
          showHumanPosition={true}
          showPythonIndex={true}
          showTypeBadge={true}
          interactive={true}
        />

        {/* Index Formula Bridge Card */}
        <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-around gap-4 text-center">
          <div className="space-y-1">
            <div className="text-xs text-amber-800 font-semibold uppercase">Công thức quy đổi vàng</div>
            <div className="text-base md:text-xl font-mono font-black text-slate-900 bg-white px-4 py-2 rounded-xl border border-amber-300 shadow-xs">
              Index = Vị trí thứ N - 1
            </div>
          </div>
          <div className="text-xs md:text-sm text-slate-600 max-w-md text-left leading-relaxed">
            Ví dụ: Toa thứ <strong className="text-blue-700">1</strong> có Index là{' '}
            <strong className="text-amber-800">1 - 1 = 0</strong>.<br />
            Toa thứ <strong className="text-blue-700">2</strong> có Index là{' '}
            <strong className="text-amber-800">2 - 1 = 1</strong>.
          </div>
        </div>
      </div>

      {/* Real-time Python Code Execution Card */}
      {currentCar && (
        <div className="bg-slate-900 text-slate-100 rounded-3xl p-6 shadow-xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-amber-400" />
              <span className="font-mono font-bold text-sm text-slate-200">
                Python Terminal Simulator
              </span>
            </div>
            <span className="text-xs text-slate-400 font-mono">students = [7, "Lan", 3.5, True, "Tin"]</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Syntax Display */}
            <div className="space-y-3">
              <div className="text-xs uppercase font-mono font-bold text-slate-400">
                1. Cú pháp truy xuất trong Python
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-lg md:text-xl text-amber-300 flex items-center gap-2">
                <span className="text-slate-500">&gt;&gt;&gt;</span>
                <span>students[{selectedIndex}]</span>
              </div>
              <div className="text-xs text-slate-400 leading-relaxed">
                Dấu ngoặc vuông <code className="text-amber-300">[ ]</code> dùng để bao bọc chỉ số index cần lấy.
              </div>
            </div>

            {/* Output Display */}
            <div className="space-y-3">
              <div className="text-xs uppercase font-mono font-bold text-slate-400">
                2. Kết quả trả về
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-lg md:text-xl text-emerald-400 flex items-center justify-between">
                <span>{typeof currentCar.value === 'string' ? `"${currentCar.value}"` : String(currentCar.value)}</span>
                <span className="text-xs font-sans px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-normal">
                  Kiểu dữ liệu: {currentCar.type}
                </span>
              </div>
              <div className="text-xs text-slate-400">
                Toa số {selectedIndex + 1} có Index là {selectedIndex}, chứa giá trị {String(currentCar.value)}.
              </div>
            </div>
          </div>

          {/* Interactive Index Query Input */}
          <form onSubmit={handleExecuteQuery} className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-3">
            <span className="text-sm font-semibold text-slate-300 whitespace-nowrap">
              Thử nhập số Index bất kỳ:
            </span>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="number"
                value={testIndexInput}
                onChange={(e) => setTestIndexInput(e.target.value)}
                placeholder="Nhập 0, 1, 2, 3, 4 hoặc 5..."
                className="w-28 bg-slate-950 text-amber-300 font-mono text-base px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-sm transition-colors cursor-pointer"
              >
                Chạy thử
              </button>
            </div>
            <span className="text-xs text-slate-400 italic">
              💡 Thử nhập số 5 xem điều gì sẽ xảy ra khi vượt quá giới hạn danh sách!
            </span>
          </form>

          {/* Query Error Message if any */}
          {queryError && (
            <div className="p-3 bg-red-950/80 border border-red-700 text-red-300 rounded-xl text-xs md:text-sm font-mono flex items-start gap-2 animate-fadeIn">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <strong>LỖI TRUY XUẤT!</strong> {queryError}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Simple language pedagogical explanation */}
      <div className="bg-sky-50 border border-sky-200 rounded-2xl p-5 md:p-6 text-slate-800 space-y-3">
        <h4 className="font-bold text-sky-950 text-base md:text-lg flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-sky-700" />
          <span>Giải thích đơn giản như thế nào cho dễ nhớ?</span>
        </h4>
        <p className="text-sm md:text-base leading-relaxed text-slate-700">
          "Python không quan tâm toa đó là toa thứ mấy theo cách con người gọi hàng ngày. Python đánh số từ 0 để đo khoảng cách (độ dời) từ vị trí đầu tiên của đoàn tàu. Vì vậy, phần tử thứ nhất ở ngay đầu tàu nên có Index là <strong>0</strong>, phần tử thứ hai cách đầu tàu 1 toa nên có Index là <strong>1</strong>."
        </p>
      </div>

      {/* Feynman Method Reflection */}
      <FeynmanBox
        topic="Khái niệm Python Index bắt đầu từ 0"
        suggestedExplanation="Hãy nói với bạn rằng: Trong thế giới máy tính, số 0 là số tự nhiên đầu tiên. Giống như vạch xuất phát trên đường chạy là 0m, hay tầng trệt của tòa nhà là tầng 0. Toa đầu tiên có vị trí là 1 nhưng chỉ số Index là 0. Muốn tìm Index của toa thứ N, chỉ cần lấy N trừ đi 1!"
        sampleAnalogy="Cây thước kẻ bắt đầu từ vạch 0 cm, số tuổi của em bé khi mới sinh ra là 0 tuổi!"
      />

      {/* Navigation button */}
      <div className="flex justify-end pt-2">
        <button
          onClick={() => {
            playClick();
            onNext();
          }}
          className="px-8 py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-2xl shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
        >
          <span>TIẾP THEO: VÀO PHÒNG THÍ NGHIỆM TỰ TẠO LIST</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
