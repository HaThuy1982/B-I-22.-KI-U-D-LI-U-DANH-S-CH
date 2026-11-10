import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Award, 
  CheckCircle2, 
  RotateCcw, 
  Printer, 
  Share2, 
  Sparkles, 
  BookOpen, 
  Check, 
  Train
} from 'lucide-react';
import { BadgeStatus } from '../../types';
import { playSuccess, playClick, playTrainWhistle } from '../../utils/audio';

interface Screen7SummaryProps {
  quizScore: number;
  badges: BadgeStatus[];
  onRestartAll: () => void;
  classroomMode: boolean;
}

export const Screen7Summary: React.FC<Screen7SummaryProps> = ({
  quizScore,
  badges,
  onRestartAll,
  classroomMode,
}) => {
  const [studentName, setStudentName] = useState<string>('Học Sinh Xuất Sắc');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const unlockedCount = badges.filter((b) => b.unlocked).length;

  const handlePrint = () => {
    playClick();
    window.print();
  };

  const handleShare = () => {
    playSuccess();
    confetti({ particleCount: 70, spread: 70 });
    navigator.clipboard?.writeText(
      `🎉 Mình vừa hoàn thành xuất sắc thử thách "Đoàn Tàu Bí Ẩn – Khám Phá Python List" với ${unlockedCount}/4 huy hiệu và đạt ${quizScore}/5 điểm kiểm tra!`
    );
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-fadeIn">
      {/* Celebration Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs md:text-sm font-bold">
          <Sparkles className="w-4 h-4 text-amber-600 animate-spin" style={{ animationDuration: '3s' }} />
          <span>Về Đích Thành Công – Nhà Ga Tốt Nghiệp</span>
        </div>

        <h2
          className={`font-black text-slate-900 tracking-tight ${
            classroomMode ? 'text-3xl md:text-5xl' : 'text-2xl md:text-4xl'
          }`}
        >
          TỔNG KẾT CHUYẾN TÀU KHÁM PHÁ
        </h2>

        {/* Mandatory Closing Message */}
        <div className="p-5 md:p-6 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 rounded-3xl shadow-lg border-2 border-amber-300 max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-black uppercase tracking-wider text-amber-950/80">
            Thông điệp ghi nhớ trọn đời
          </div>
          <p className="text-base md:text-lg font-bold text-white leading-relaxed">
            "Chúc mừng em! Em đã khám phá được bí mật của đoàn tàu Python. Hãy nhớ:{' '}
            <span className="underline decoration-amber-300 underline-offset-4">Python bắt đầu đếm từ 0</span>. Và giờ đây, em đã biết cách quản lý cả một đoàn tàu dữ liệu bằng List!"
          </p>
        </div>
      </div>

      {/* Badges Collection Showcase */}
      <div className="bg-white border-2 border-amber-300 rounded-3xl p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-600" />
            <h3 className="font-black text-slate-900 text-lg">
              Bộ Sưu Tập Huy Hiệu Của Em ({unlockedCount} / {badges.length})
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Điểm kiểm tra: {quizScore}/5
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-2xl border-2 text-center flex flex-col items-center justify-between transition-all ${
                badge.unlocked
                  ? 'border-amber-400 bg-amber-50/60 shadow-sm scale-102 ring-2 ring-amber-300/50'
                  : 'border-slate-200 bg-slate-50 opacity-60'
              }`}
            >
              <div className="text-4xl my-2">{badge.icon}</div>
              <div className="space-y-1">
                <div className="font-bold text-sm text-slate-900">{badge.title}</div>
                <div className="text-xs text-slate-500 leading-snug">{badge.description}</div>
              </div>
              <div className="mt-3">
                {badge.unlocked ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Đã nhận</span>
                  </span>
                ) : (
                  <span className="text-[11px] font-semibold text-slate-400">Chưa mở khóa</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Takeaways & Knowledge Recap */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <span>Những kiến thức vàng em đã thu hoạch được</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-700">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start gap-2.5">
            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>1. Khái niệm List:</strong> Là một thùng chứa/đoàn tàu gom nhiều dữ liệu thuộc mọi kiểu (số, chữ, boolean).
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start gap-2.5">
            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>2. Quy tắc Index từ 0:</strong> Phần tử đầu tiên có Index là 0. Toa thứ N luôn có Index là <strong>N - 1</strong>.
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start gap-2.5">
            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>3. Cú pháp truy xuất & sửa:</strong> Dùng <code className="font-mono text-blue-700 font-bold">list[index]</code> để đọc hoặc gán giá trị mới.
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start gap-2.5">
            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>4. Thêm & Xóa:</strong> Dùng <code className="font-mono text-emerald-700 font-bold">.append()</code> để nối đuôi tàu và <code className="font-mono text-rose-700 font-bold">.pop()</code> để tháo toa.
            </div>
          </div>
        </div>
      </div>

      {/* Printable Certificate of Completion */}
      <div className="bg-gradient-to-b from-amber-50 to-white border-4 border-amber-400 rounded-3xl p-6 md:p-8 text-center space-y-4 shadow-md relative print:m-0 print:border-2">
        <div className="w-14 h-14 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center mx-auto shadow-md">
          <Train className="w-8 h-8" />
        </div>

        <div className="text-xs uppercase tracking-widest font-black text-amber-800">
          CHỨNG NHẬN HOÀN THÀNH CHUYẾN TÀU PYTHON LIST
        </div>

        <div className="space-y-1">
          <p className="text-xs text-slate-500">Trân trọng trao tặng cho:</p>
          <div className="max-w-xs mx-auto">
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="text-center font-display font-black text-xl md:text-2xl text-amber-900 border-b-2 border-amber-400 bg-transparent focus:outline-none w-full py-1"
              title="Nhập tên của em để in chứng nhận"
            />
          </div>
        </div>

        <p className="text-xs md:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
          Đã xuất sắc hoàn thành tất cả các trạm dừng, giải mã thành công bí mật Index từ 0 và làm chủ kỹ năng quản lý đoàn tàu dữ liệu Python List!
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-3 print:hidden">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>In / Lưu Chứng Nhận (PDF)</span>
          </button>

          <button
            onClick={handleShare}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>{isCopied ? 'Đã sao chép lời chúc!' : 'Chia sẻ kết quả'}</span>
          </button>
        </div>
      </div>

      {/* Reset & Replay CTA */}
      <div className="flex justify-center pt-2">
        <button
          onClick={() => {
            playTrainWhistle();
            onRestartAll();
          }}
          className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl flex items-center gap-2 cursor-pointer transition-colors shadow-xs"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Khởi hành lại từ Nhà ga số 1 (Chơi lại)</span>
        </button>
      </div>
    </div>
  );
};
