import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  AlertCircle, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight, 
  Volume2
} from 'lucide-react';
import { TrainVisualizer } from '../TrainVisualizer';
import { TrainCarItem } from '../../types';
import { playTrainWhistle, playClick, playSuccess, playWrong } from '../../utils/audio';

interface Screen2MysteryProps {
  onNext: () => void;
  classroomMode: boolean;
  hideAnswers: boolean;
  onUnlockBadge: (badgeId: string) => void;
}

const initialMysteryCars: TrainCarItem[] = [
  { id: '1', value: 7, type: 'int', color: '#3b82f6' },
  { id: '2', value: 'Lan', type: 'str', color: '#10b981' },
  { id: '3', value: 3.5, type: 'float', color: '#f59e0b' },
  { id: '4', value: true, type: 'bool', color: '#8b5cf6' },
  { id: '5', value: 'Tin', type: 'str', color: '#ec4899' },
];

export const Screen2Mystery: React.FC<Screen2MysteryProps> = ({
  onNext,
  classroomMode,
  hideAnswers,
  onUnlockBadge,
}) => {
  // Selected human ordinal number to call (1 to 5)
  const [calledOrdinal, setCalledOrdinal] = useState<number>(2); // Default 2 as in scenario
  const [hasCalled, setHasCalled] = useState<boolean>(false);
  
  // The surprise index activated by Python:
  // When human calls ordinal N (e.g. 2), Python evaluates `students[2]`, which is at index 2 (the 3rd car!)
  const [activatedIndex, setActivatedIndex] = useState<number | null>(null);

  // Quiz state
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  const handleCallTrain = () => {
    playTrainWhistle();
    setHasCalled(true);
    // Intentional twist: Human called number N -> Python accesses index N (which is car N+1)
    const pythonTargetIndex = Math.min(calledOrdinal, initialMysteryCars.length - 1);
    setActivatedIndex(pythonTargetIndex);
  };

  const handleSelectAnswer = (choice: string) => {
    setSelectedAnswer(choice);
    if (choice === 'B') {
      playSuccess();
      setIsAnswerCorrect(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
      onUnlockBadge('rookie');
    } else {
      playWrong();
      setIsAnswerCorrect(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="text-xs md:text-sm font-semibold uppercase tracking-wider text-amber-800">
          Màn 2: Trò chơi tương tác bất ngờ
        </div>
        <h2
          className={`font-black text-slate-900 tracking-tight ${
            classroomMode ? 'text-3xl md:text-5xl' : 'text-2xl md:text-4xl'
          }`}
        >
          TRÒ CHƠI ĐOÀN TÀU BÍ ẨN
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base">
          Trên đường ray có 5 toa tàu đang đỗ. Mỗi toa chở một giá trị khác nhau. Em hãy thử gọi một toa tàu xem điều kỳ lạ gì sẽ xảy ra nhé!
        </p>
      </div>

      {/* Train display */}
      <div className="bg-gradient-to-b from-sky-100/60 via-amber-50/40 to-white border border-amber-200 rounded-3xl p-4 md:p-6 shadow-sm overflow-hidden">
        <TrainVisualizer
          cars={initialMysteryCars}
          highlightedIndex={activatedIndex}
          showHumanPosition={true}
          showPythonIndex={hasCalled} // Initially keep python index secret or reveal upon surprise!
          showTypeBadge={true}
          interactive={false}
        />
      </div>

      {/* Control Station Panel */}
      <div className="bg-white border-2 border-amber-300 rounded-2xl p-5 md:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
              Bảng gọi toa của Thầy Cô / Học Sinh
            </span>
            <h3
              className={`font-black text-slate-900 ${
                classroomMode ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'
              }`}
            >
              Giáo viên gọi TOA SỐ MẤY?
            </h3>
            <p className="text-xs md:text-sm text-slate-500">
              Hãy bấm chọn số toa thông thường (từ 1 đến 5), sau đó nhấn nút gọi.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            {/* Number Selector Buttons 1 to 5 */}
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    playClick();
                    setCalledOrdinal(num);
                    setHasCalled(false);
                    setActivatedIndex(null);
                    setSelectedAnswer(null);
                    setIsAnswerCorrect(null);
                  }}
                  className={`w-11 h-11 md:w-13 md:h-13 rounded-xl font-black text-lg md:text-xl transition-all cursor-pointer shadow-sm ${
                    calledOrdinal === num
                      ? 'bg-amber-600 text-white ring-4 ring-amber-300 scale-105'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>

            {/* Call button */}
            <button
              onClick={handleCallTrain}
              className={`w-full md:w-auto font-black text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                classroomMode ? 'px-8 py-3.5 text-lg' : 'px-6 py-3 text-base'
              }`}
            >
              <Volume2 className="w-5 h-5" />
              <span>GỌI TOA TÀU SỐ {calledOrdinal}</span>
            </button>
          </div>
        </div>
      </div>

      {/* The Surprise Banner and Question */}
      {hasCalled && (
        <div className="bg-amber-100/90 border-2 border-amber-400 rounded-2xl p-6 shadow-md space-y-5 animate-fadeIn">
          {/* Mystery Banner */}
          <div className="flex items-center gap-3 p-3 bg-amber-500 text-slate-950 font-black rounded-xl text-base md:text-lg shadow-sm">
            <AlertCircle className="w-6 h-6 shrink-0 animate-bounce" />
            <span>BÍ MẬT ĐÃ ĐƯỢC BẬT MÍ!</span>
          </div>

          <div className="p-4 bg-white rounded-xl border border-amber-200 text-slate-800 space-y-2">
            <p className={`font-semibold ${classroomMode ? 'text-lg' : 'text-base'}`}>
              Em vừa gọi <strong className="text-blue-700">Toa số {calledOrdinal}</strong> ({calledOrdinal === 2 ? 'chứa "Lan"' : `toa thứ ${calledOrdinal}`}), nhưng nhìn kìa! Toa thứ <strong className="text-purple-700">{activatedIndex !== null ? activatedIndex + 1 : ''} (chứa giá trị {activatedIndex !== null ? String(initialMysteryCars[activatedIndex].value) : ''})</strong> mới là toa phát sáng và giơ tay hưởng ứng!
            </p>
          </div>

          {/* The Pedagogical Question */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-black text-lg md:text-xl">
              <HelpCircle className="w-6 h-6 text-amber-600" />
              <h4>Tại sao thầy gọi toa số {calledOrdinal} mà toa kế tiếp lại giơ tay?</h4>
            </div>

            {!hideAnswers ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  onClick={() => handleSelectAnswer('A')}
                  className={`p-4 rounded-xl text-left border-2 font-semibold transition-all cursor-pointer ${
                    selectedAnswer === 'A'
                      ? 'border-red-500 bg-red-50 text-red-900'
                      : 'border-slate-200 bg-white hover:border-amber-400 hover:bg-amber-50/50 text-slate-800'
                  }`}
                >
                  <div className="text-xs uppercase font-mono font-bold text-slate-400 mb-1">Đáp án A</div>
                  <div className="text-sm md:text-base">Vì toa tàu bị lỗi kĩ thuật.</div>
                </button>

                <button
                  onClick={() => handleSelectAnswer('B')}
                  className={`p-4 rounded-xl text-left border-2 font-semibold transition-all cursor-pointer ${
                    selectedAnswer === 'B'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-md ring-2 ring-emerald-300'
                      : 'border-slate-200 bg-white hover:border-amber-400 hover:bg-amber-50/50 text-slate-800'
                  }`}
                >
                  <div className="text-xs uppercase font-mono font-bold text-emerald-600 mb-1">Đáp án B (Gợi ý)</div>
                  <div className="text-sm md:text-base">Vì Python bắt đầu đếm từ 0.</div>
                </button>

                <button
                  onClick={() => handleSelectAnswer('C')}
                  className={`p-4 rounded-xl text-left border-2 font-semibold transition-all cursor-pointer ${
                    selectedAnswer === 'C'
                      ? 'border-red-500 bg-red-50 text-red-900'
                      : 'border-slate-200 bg-white hover:border-amber-400 hover:bg-amber-50/50 text-slate-800'
                  }`}
                >
                  <div className="text-xs uppercase font-mono font-bold text-slate-400 mb-1">Đáp án C</div>
                  <div className="text-sm md:text-base">Vì Python đếm ngẫu nhiên.</div>
                </button>
              </div>
            ) : (
              <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl text-center text-amber-900 font-bold">
                🔒 Thầy Cô đang ẩn các lựa chọn để cả lớp cùng trao đổi và phỏng đoán!
              </div>
            )}

            {/* Feedback & Result */}
            {isAnswerCorrect === false && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm flex items-start gap-2 animate-fadeIn">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Chưa chính xác rồi em ơi!</strong> Toa tàu hoàn toàn hoạt động bình thường và máy tính không bao giờ đếm ngẫu nhiên. Hãy nghĩ xem máy tính có thói quen đặc biệt nào khi đếm số nhé?
                </div>
              </div>
            )}

            {isAnswerCorrect === true && (
              <div className="p-5 bg-emerald-50 border-2 border-emerald-300 rounded-2xl text-emerald-950 space-y-3 animate-fadeIn">
                <div className="flex items-center gap-2 font-black text-lg text-emerald-800">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  <span>CHÍNH XÁC 100%! BẠN QUÁ THÔNG MINH!</span>
                </div>
                <p className="text-sm md:text-base leading-relaxed text-emerald-900">
                  Trong ngôn ngữ lập trình Python, <strong>máy tính luôn bắt đầu đếm từ số 0</strong> chứ không phải số 1 như con người! Do đó, khi em yêu cầu toa số 2, Python lại hiểu là toa có <strong>Index = 2</strong>, tức là toa thứ 3!
                </p>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      playClick();
                      onNext();
                    }}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
                  >
                    <span>TIẾP TỤC: GIẢI MÃ BÍ MẬT INDEX</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
