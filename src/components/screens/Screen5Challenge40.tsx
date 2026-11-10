import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { 
  Users, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Search, 
  Edit2, 
  TrendingUp, 
  Award, 
  Calculator,
  PlusCircle,
  Trash2
} from 'lucide-react';
import { FeynmanBox } from '../FeynmanBox';
import { playClick, playSuccess, playWrong } from '../../utils/audio';

interface Screen5Challenge40Props {
  onNext: () => void;
  classroomMode: boolean;
  hideAnswers: boolean;
  onUnlockBadge: (badgeId: string) => void;
}

// Initial 40 realistic student scores
const initialScores: number[] = [
  8.5, 7.0, 9.0, 6.5, 10.0, 8.0, 7.5, 9.5, 8.0, 9.0, // 0 - 9 (Student 1 - 10)
  6.0, 7.5, 8.5, 9.0, 10.0, 8.0, 7.0, 6.5, 8.5, 9.0, // 10 - 19 (Student 11 - 20)
  7.5, 8.0, 9.5, 6.0, 8.5, 7.0, 9.0, 10.0, 8.5, 7.5, // 20 - 29 (Student 21 - 30)
  9.0, 8.0, 6.5, 7.0, 8.5, 9.5, 7.5, 8.0, 9.0, 10.0  // 30 - 39 (Student 31 - 40)
];

export const Screen5Challenge40: React.FC<Screen5Challenge40Props> = ({
  onNext,
  classroomMode,
  hideAnswers,
  onUnlockBadge,
}) => {
  const [scores, setScores] = useState<number[]>(initialScores);
  const [selectedStudentIdx, setSelectedStudentIdx] = useState<number>(9); // 10th student by default
  const [targetSearchIndex, setTargetSearchIndex] = useState<string>('9');

  // Pedagogical challenge question state
  const [challengeAnswer, setChallengeAnswer] = useState<string>('');
  const [isChallengeCorrect, setIsChallengeCorrect] = useState<boolean | null>(null);

  // Edit score state
  const [newScoreVal, setNewScoreVal] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Add new student score
  const [addScoreVal, setAddScoreVal] = useState<string>('8.5');

  // Statistics calculated dynamically
  const stats = useMemo(() => {
    if (scores.length === 0) return { avg: 0, max: 0, min: 0, count: 0 };
    const sum = scores.reduce((acc, curr) => acc + curr, 0);
    const avg = Number((sum / scores.length).toFixed(2));
    const max = Math.max(...scores);
    const min = Math.min(...scores);
    return { avg, max, min, count: scores.length };
  }, [scores]);

  const handleCheckChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(challengeAnswer.trim(), 10);
    if (parsed === 9) {
      playSuccess();
      setIsChallengeCorrect(true);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      onUnlockBadge('captain');
    } else {
      playWrong();
      setIsChallengeCorrect(false);
    }
  };

  const handleSaveScore = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(newScoreVal);
    if (isNaN(val) || val < 0 || val > 10) {
      alert('Vui lòng nhập điểm hợp lệ từ 0 đến 10!');
      return;
    }
    const updated = [...scores];
    updated[selectedStudentIdx] = val;
    setScores(updated);
    setIsEditing(false);
    playSuccess();
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(addScoreVal);
    if (isNaN(val) || val < 0 || val > 10) return;
    const updated = [...scores, val];
    setScores(updated);
    setSelectedStudentIdx(updated.length - 1);
    playSuccess();
  };

  const handleDeleteStudent = (idx: number) => {
    if (scores.length <= 1) return;
    const updated = scores.filter((_, i) => i !== idx);
    setScores(updated);
    setSelectedStudentIdx(Math.min(idx, updated.length - 1));
    playSuccess();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="text-xs md:text-sm font-semibold uppercase tracking-wider text-amber-800">
          Màn 5: Vận dụng thực tế
        </div>
        <h2
          className={`font-black text-slate-900 tracking-tight ${
            classroomMode ? 'text-3xl md:text-5xl' : 'text-2xl md:text-4xl'
          }`}
        >
          THỬ THÁCH 40 HỌC SINH
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base">
          Tình huống thực tế: "Giáo viên có một lớp gồm 40 học sinh. Làm thế nào để lưu và quản lý điểm số của cả lớp mà không cần phải tạo 40 biến riêng lẻ?"
        </p>
      </div>

      {/* Classroom Situation Banner */}
      <div className="bg-amber-100/80 border border-amber-300 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4 text-slate-800">
        <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0">
          <Users className="w-6 h-6" />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h4 className="font-bold text-base text-amber-950">
            Giải pháp thông minh: Dùng 1 Python List duy nhất thay vì 40 biến!
          </h4>
          <p className="text-xs md:text-sm text-slate-600 mt-1">
            Thay vì viết <code className="font-mono bg-white px-1.5 py-0.5 rounded text-red-700">diem1, diem2, ..., diem40</code> (rất dài dòng và dễ nhầm lẫn), ta chỉ cần khai báo một danh sách:
            <code className="font-mono bg-white px-2 py-0.5 rounded font-bold text-emerald-800 ml-1">
              diem_so = [{scores.slice(0, 5).join(', ')}, ...]
            </code>
          </p>
        </div>
      </div>

      {/* Real-time Class Analytics KPI Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <Users className="w-4 h-4 text-blue-600" />
            <span>Sĩ số lớp (len)</span>
          </div>
          <div className="text-2xl font-black font-mono text-slate-900 mt-1 tabular-nums">
            {stats.count} <span className="text-xs text-slate-500 font-sans font-normal">học sinh</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <Calculator className="w-4 h-4 text-emerald-600" />
            <span>Điểm trung bình</span>
          </div>
          <div className="text-2xl font-black font-mono text-emerald-700 mt-1 tabular-nums">
            {stats.avg} <span className="text-xs text-slate-500 font-sans font-normal">/ 10</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <Award className="w-4 h-4 text-amber-600" />
            <span>Điểm cao nhất (max)</span>
          </div>
          <div className="text-2xl font-black font-mono text-amber-700 mt-1 tabular-nums">
            {stats.max}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <TrendingUp className="w-4 h-4 text-indigo-600" />
            <span>Điểm thấp nhất (min)</span>
          </div>
          <div className="text-2xl font-black font-mono text-indigo-700 mt-1 tabular-nums">
            {stats.min}
          </div>
        </div>
      </div>

      {/* Highlighted Pedagogical Question Card */}
      <div className="bg-white border-2 border-amber-400 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 font-bold">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="text-xs font-bold text-amber-800 uppercase tracking-wider">
              Câu hỏi trọng tâm lớp học
            </div>
            <h3 className={`font-black text-slate-900 mt-1 ${classroomMode ? 'text-2xl' : 'text-lg md:text-xl'}`}>
              "Nếu muốn lấy điểm của học sinh thứ 10 trong danh sách, em phải sử dụng Index nào trong Python?"
            </h3>

            {!hideAnswers ? (
              <form onSubmit={handleCheckChallenge} className="mt-4 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 font-mono text-base font-bold bg-slate-100 p-2 rounded-xl border border-slate-300">
                  <span>diem_so[</span>
                  <input
                    type="number"
                    value={challengeAnswer}
                    onChange={(e) => setChallengeAnswer(e.target.value)}
                    placeholder="?"
                    className="w-16 text-center font-bold text-amber-700 bg-white border border-amber-400 rounded-lg py-1 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <span>]</span>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-sm shadow-sm cursor-pointer"
                >
                  Kiểm tra đáp án
                </button>
              </form>
            ) : (
              <div className="mt-3 p-3 bg-amber-50 rounded-xl text-amber-900 text-xs font-semibold border border-amber-200">
                🔒 Thầy Cô đang ẩn ô nhập để học sinh trong lớp cùng giơ tay trả lời!
              </div>
            )}

            {isChallengeCorrect === true && (
              <div className="mt-4 p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-950 space-y-2 animate-fadeIn">
                <div className="flex items-center gap-2 font-bold text-emerald-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>XUẤT SẮC! ĐÁP ÁN ĐÚNG LÀ INDEX 9!</span>
                </div>
                <p className="text-xs md:text-sm leading-relaxed text-emerald-900">
                  <strong>Giải thích tại sao:</strong> Vì Python đánh số từ 0. Phần tử thứ nhất có index là 0, phần tử thứ hai có index là 1... Do đó, phần tử thứ 10 luôn có chỉ số Index là <strong>10 - 1 = 9</strong>!
                </p>
              </div>
            )}

            {isChallengeCorrect === false && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-900 text-xs md:text-sm flex items-start gap-2 animate-fadeIn">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Chưa đúng rồi!</strong> Đừng quên quy tắc vàng: <code className="font-mono bg-white px-1.5 py-0.5 rounded text-red-700">Index = Vị trí - 1</code>. Nếu là học sinh thứ 10, hãy lấy 10 trừ đi 1 nhé!
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Interactive 40 Students Train Yard / Grid */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-800">
              Đoàn tàu 40 Toa Điểm Số (Nhấn vào một ô để xem chi tiết & sửa điểm)
            </span>
          </div>

          {/* Quick search input */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="number"
                min={0}
                max={scores.length - 1}
                value={targetSearchIndex}
                onChange={(e) => {
                  setTargetSearchIndex(e.target.value);
                  const idx = parseInt(e.target.value, 10);
                  if (!isNaN(idx) && idx >= 0 && idx < scores.length) {
                    setSelectedStudentIdx(idx);
                  }
                }}
                placeholder="Tìm theo Index (0-39)..."
                className="pl-8 pr-3 py-1.5 text-xs font-mono border border-slate-300 rounded-xl w-44"
              />
            </div>
          </div>
        </div>

        {/* 40 Grid Units */}
        <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-10 gap-2">
          {scores.map((score, idx) => {
            const isSelected = selectedStudentIdx === idx;
            const ordinal = idx + 1;
            return (
              <button
                key={idx}
                onClick={() => {
                  playClick();
                  setSelectedStudentIdx(idx);
                  setTargetSearchIndex(String(idx));
                  setIsEditing(false);
                }}
                className={`p-2 rounded-xl text-center border-2 transition-all cursor-pointer flex flex-col items-center justify-between ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-300 scale-105 shadow-md'
                    : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100'
                }`}
              >
                <div className="text-[10px] text-slate-400 font-sans">
                  # {ordinal}
                </div>
                <div className="text-sm md:text-base font-bold font-mono text-slate-900 my-0.5">
                  {score}
                </div>
                <div className={`text-[9px] font-mono font-bold px-1 rounded ${
                  isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-200 text-slate-700'
                }`}>
                  [{idx}]
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Student Detail & Inspector */}
        {selectedStudentIdx !== null && selectedStudentIdx < scores.length && (
          <div className="mt-4 p-4 bg-slate-900 text-slate-100 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center md:text-left">
              <div className="text-xs text-amber-400 font-mono font-bold">
                Học sinh thứ {selectedStudentIdx + 1} &rarr; diem_so[{selectedStudentIdx}] = {scores[selectedStudentIdx]}
              </div>
              <div className="text-xs text-slate-400">
                Vị trí đời thường: Học sinh #{selectedStudentIdx + 1} | Chỉ số lập trình Python: Index [{selectedStudentIdx}]
              </div>
            </div>

            <div className="flex items-center gap-2">
              {!isEditing ? (
                <>
                  <button
                    onClick={() => {
                      playClick();
                      setNewScoreVal(String(scores[selectedStudentIdx]));
                      setIsEditing(true);
                    }}
                    className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Cập nhật điểm</span>
                  </button>
                  <button
                    onClick={() => handleDeleteStudent(selectedStudentIdx)}
                    title="Xóa học sinh này"
                    className="p-1.5 bg-red-900/60 hover:bg-red-800 text-red-200 rounded-xl text-xs cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <form onSubmit={handleSaveScore} className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={newScoreVal}
                    onChange={(e) => setNewScoreVal(e.target.value)}
                    className="w-20 px-2 py-1 bg-slate-950 text-amber-300 font-mono text-xs rounded border border-slate-700"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded cursor-pointer"
                  >
                    Lưu
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded cursor-pointer"
                  >
                    Hủy
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Add Student Form */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <form onSubmit={handleAddStudent} className="flex items-center gap-2">
            <span className="font-semibold text-slate-600">Thêm học sinh mới (append):</span>
            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={addScoreVal}
              onChange={(e) => setAddScoreVal(e.target.value)}
              className="w-16 px-2 py-1 border border-slate-300 rounded-lg font-mono"
            />
            <button
              type="submit"
              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg flex items-center gap-1 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>diem_so.append({addScoreVal})</span>
            </button>
          </form>

          <span className="text-slate-400 italic">
            Học sinh mới sẽ luôn nhận được Index = {scores.length}
          </span>
        </div>
      </div>

      {/* Feynman Method */}
      <FeynmanBox
        topic="Quản lý dữ liệu lớn bằng Python List"
        suggestedExplanation="Em có thể nói với bạn: Nếu lớp có 1000 học sinh, em không thể đặt 1000 cái tên biến. Nhưng với List, em chỉ cần một chiếc tủ lớn có 1000 ngăn kéo đánh số từ 0 đến 999. Muốn lấy đồ của ngăn nào, chỉ việc gọi tên_tủ[số_ngăn]!"
        sampleAnalogy="Tủ đựng giày ở trường học: Mỗi ô có một con số, ngăn đầu tiên luôn là ô số 0!"
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
          <span>TIẾP THEO: VƯỢT QUA 5 THỬ THÁCH ĐỂ NHẬN HUY HIỆU</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
