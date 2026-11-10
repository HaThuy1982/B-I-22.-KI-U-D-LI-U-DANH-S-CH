import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Award, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { playClick, playSuccess, playWrong } from '../../utils/audio';

interface Screen6QuizProps {
  onNext: () => void;
  classroomMode: boolean;
  hideAnswers: boolean;
  onSetQuizScore: (score: number) => void;
  onUnlockBadge: (badgeId: string) => void;
}

interface QuizQuestion {
  id: number;
  question: string;
  codeSnippet?: string;
  options: { key: string; label: string }[];
  correctAnswer: string;
  explanation: string;
  hint: string;
}

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Python List bắt đầu đánh số chỉ số (Index) từ bao nhiêu?',
    options: [
      { key: 'A', label: '0' },
      { key: 'B', label: '1' },
      { key: 'C', label: '2' },
    ],
    correctAnswer: 'A',
    explanation: 'Chính xác! Trong Python và hầu hết các ngôn ngữ lập trình, chỉ số index luôn bắt đầu từ số 0.',
    hint: 'Gợi ý: Hãy nhớ lại vạch xuất phát trên thước kẻ hoặc quy tắc máy tính đếm độ dời từ đầu tàu!',
  },
  {
    id: 2,
    question: 'Muốn lấy phần tử "Blue" trong danh sách sau, ta viết cú pháp nào?',
    codeSnippet: 'colors = ["Red", "Blue", "Green"]',
    options: [
      { key: 'A', label: 'colors[0]' },
      { key: 'B', label: 'colors[1]' },
      { key: 'C', label: 'colors[2]' },
    ],
    correctAnswer: 'B',
    explanation: '"Red" ở index 0, "Blue" ở index 1, "Green" ở index 2. Vì vậy cú pháp lấy "Blue" là colors[1].',
    hint: 'Gợi ý: "Red" là phần tử đầu tiên nên nhận index 0. Vậy phần tử thứ hai nhận index mấy?',
  },
  {
    id: 3,
    question: 'Lệnh numbers[3] trả về kết quả nào?',
    codeSnippet: 'numbers = [10, 20, 30, 40]',
    options: [
      { key: 'A', label: '20' },
      { key: 'B', label: '30' },
      { key: 'C', label: '40' },
    ],
    correctAnswer: 'C',
    explanation: 'Chính xác! numbers[0] = 10, numbers[1] = 20, numbers[2] = 30, và numbers[3] = 40 (chính là phần tử thứ 4).',
    hint: 'Gợi ý: Index 3 ứng với phần tử ở vị trí thứ (3 + 1) = 4 trong danh sách!',
  },
  {
    id: 4,
    question: 'Lệnh nào dùng để thêm một phần tử mới vào cuối danh sách?',
    options: [
      { key: 'A', label: 'append()' },
      { key: 'B', label: 'remove()' },
      { key: 'C', label: 'print()' },
    ],
    correctAnswer: 'A',
    explanation: 'Tuyệt vời! Hàm append() luôn gắn một toa tàu mới vào vị trí cuối cùng của đoàn tàu.',
    hint: 'Gợi ý: Lệnh này có nghĩa là "nối thêm / đính kèm" vào sau cùng.',
  },
  {
    id: 5,
    question: 'Một danh sách có 40 phần tử. Index của phần tử cuối cùng là bao nhiêu?',
    options: [
      { key: 'A', label: '40' },
      { key: 'B', label: '39' },
      { key: 'C', label: '41' },
    ],
    correctAnswer: 'B',
    explanation: 'Quá đỉnh! Vì đếm từ 0, danh sách có N phần tử thì index sẽ chạy từ 0 đến N - 1. Với N = 40, index cuối cùng là 40 - 1 = 39.',
    hint: 'Gợi ý: Áp dụng công thức Index cuối cùng = Độ dài - 1 = 40 - 1!',
  },
];

export const Screen6Quiz: React.FC<Screen6QuizProps> = ({
  onNext,
  classroomMode,
  hideAnswers,
  onSetQuizScore,
  onUnlockBadge,
}) => {
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResultForCurrent, setShowResultForCurrent] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);

  const currentQ = questions[currentQIndex];
  const userChoice = selectedAnswers[currentQ.id];
  const isCorrect = userChoice === currentQ.correctAnswer;

  const totalScore = Object.entries(selectedAnswers).filter(
    ([qId, ans]) => {
      const q = questions.find((item) => item.id === Number(qId));
      return q && q.correctAnswer === ans;
    }
  ).length;

  const handleSelectOption = (key: string) => {
    playClick();
    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: key }));
    setShowResultForCurrent(true);

    if (key === currentQ.correctAnswer) {
      playSuccess();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    } else {
      playWrong();
    }
  };

  const handleNextQuestion = () => {
    playClick();
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setShowResultForCurrent(!!selectedAnswers[questions[currentQIndex + 1]?.id]);
    } else {
      // Finished all 5 questions
      setCompleted(true);
      const finalScore = Object.entries(selectedAnswers).filter(
        ([qId, ans]) => {
          const q = questions.find((item) => item.id === Number(qId));
          return q && q.correctAnswer === ans;
        }
      ).length;
      onSetQuizScore(finalScore);

      if (finalScore >= 4) {
        onUnlockBadge('captain');
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
        });
      }
    }
  };

  const handlePrevQuestion = () => {
    if (currentQIndex > 0) {
      playClick();
      setCurrentQIndex((prev) => prev - 1);
      setShowResultForCurrent(!!selectedAnswers[questions[currentQIndex - 1]?.id]);
    }
  };

  const handleRestartQuiz = () => {
    playClick();
    setSelectedAnswers({});
    setCurrentQIndex(0);
    setShowResultForCurrent(false);
    setCompleted(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="text-xs md:text-sm font-semibold uppercase tracking-wider text-amber-800">
          Màn 6: Đánh giá năng lực
        </div>
        <h2
          className={`font-black text-slate-900 tracking-tight ${
            classroomMode ? 'text-3xl md:text-5xl' : 'text-2xl md:text-4xl'
          }`}
        >
          VƯỢT QUA 5 THỬ THÁCH
        </h2>
        <p className="text-slate-600 max-w-xl mx-auto text-sm md:text-base">
          Kiểm tra độ hiểu sâu của em về List, Index và các hàm thao tác. Đạt từ 4/5 câu (80%) để trở thành Thuyền Trưởng Python!
        </p>
      </div>

      {/* Progress Bar & Indicators */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {questions.map((q, idx) => {
            const answered = selectedAnswers[q.id];
            const isQCorrect = answered === q.correctAnswer;
            const isCurrent = currentQIndex === idx;

            return (
              <button
                key={q.id}
                onClick={() => {
                  playClick();
                  setCurrentQIndex(idx);
                  setShowResultForCurrent(!!selectedAnswers[q.id]);
                }}
                className={`w-9 h-9 rounded-xl font-bold font-mono text-sm transition-all cursor-pointer flex items-center justify-center ${
                  isCurrent
                    ? 'ring-2 ring-amber-500 scale-105'
                    : ''
                } ${
                  answered
                    ? isQCorrect
                      ? 'bg-emerald-600 text-white'
                      : 'bg-red-500 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {q.id}
              </button>
            );
          })}
        </div>

        <div className="text-xs md:text-sm font-bold text-slate-700">
          Điểm hiện tại: <span className="font-mono text-amber-700 text-base">{totalScore}</span> / 5
        </div>
      </div>

      {!completed ? (
        /* Question Card */
        <div className="bg-white border-2 border-amber-300 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          {/* Question text */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Câu hỏi {currentQ.id} / 5
            </div>
            <h3
              className={`font-black text-slate-900 leading-snug ${
                classroomMode ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'
              }`}
            >
              {currentQ.question}
            </h3>

            {/* Code Snippet if applicable */}
            {currentQ.codeSnippet && (
              <div className="p-3.5 bg-slate-900 rounded-xl text-amber-300 font-mono text-sm md:text-base border border-slate-800 shadow-inner">
                {currentQ.codeSnippet}
              </div>
            )}
          </div>

          {/* Options List */}
          {!hideAnswers ? (
            <div className="space-y-3">
              {currentQ.options.map((opt) => {
                const isSelected = userChoice === opt.key;
                const isCorrectOpt = opt.key === currentQ.correctAnswer;

                let optStyle = 'border-slate-200 bg-slate-50 hover:border-amber-400 hover:bg-amber-50/50 text-slate-800';
                if (showResultForCurrent && isSelected) {
                  optStyle = isCorrect
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-300'
                    : 'border-red-500 bg-red-50 text-red-950 ring-2 ring-red-300';
                } else if (showResultForCurrent && isCorrectOpt) {
                  optStyle = 'border-emerald-500 bg-emerald-50/60 text-emerald-950';
                }

                return (
                  <button
                    key={opt.key}
                    onClick={() => handleSelectOption(opt.key)}
                    className={`w-full p-4 rounded-2xl border-2 text-left font-semibold transition-all cursor-pointer flex items-center justify-between ${optStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-white border border-slate-300 flex items-center justify-center font-mono font-bold text-slate-700 shadow-xs">
                        {opt.key}
                      </span>
                      <span className="font-mono text-base md:text-lg">{opt.label}</span>
                    </div>

                    {showResultForCurrent && isSelected && (
                      <div>
                        {isCorrect ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-600" />
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="p-6 bg-amber-50 rounded-2xl text-center text-amber-900 font-bold border border-amber-300">
              🔒 Thầy Cô đang bật chế độ che đáp án để cả lớp cùng trao đổi!
            </div>
          )}

          {/* Feedback & Explanation */}
          {showResultForCurrent && (
            <div
              className={`p-5 rounded-2xl border text-sm md:text-base space-y-2 animate-fadeIn ${
                isCorrect
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-red-50 border-red-300 text-red-950'
              }`}
            >
              <div className="flex items-center gap-2 font-bold">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>ĐÚNG RỒI! RẤT XUẤT SẮC!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                    <span>CHƯA CHÍNH XÁC RỒI!</span>
                  </>
                )}
              </div>
              <p className="leading-relaxed">{currentQ.explanation}</p>
              {!isCorrect && (
                <div className="text-xs text-red-800 bg-red-100/70 p-2.5 rounded-lg border border-red-200">
                  {currentQ.hint}
                </div>
              )}
            </div>
          )}

          {/* Navigation between questions */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={handlePrevQuestion}
              disabled={currentQIndex === 0}
              className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 font-semibold text-sm cursor-pointer"
            >
              Câu trước
            </button>

            <button
              onClick={handleNextQuestion}
              disabled={!userChoice}
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-xl text-sm flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <span>{currentQIndex === questions.length - 1 ? 'Xem kết quả' : 'Câu tiếp theo'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Quiz Complete Card */
        <div className="bg-white border-2 border-amber-400 rounded-3xl p-8 text-center space-y-6 shadow-md animate-fadeIn">
          <div className="w-16 h-16 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center mx-auto shadow-md">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl font-black text-slate-900">
              HOÀN THÀNH BÀI KIỂM TRA!
            </h3>
            <p className="text-slate-600">
              Em đã trả lời đúng <strong className="text-amber-700 text-xl font-mono">{totalScore} / 5</strong> câu hỏi!
            </p>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl max-w-md mx-auto text-sm text-slate-700">
            {totalScore >= 4 ? (
              <div className="flex items-center gap-2 text-emerald-800 font-bold justify-center">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <span>Chúc mừng! Em đã mở khóa thành công Huy hiệu Thuyền Trưởng Python!</span>
              </div>
            ) : (
              <p>
                Em hãy bấm nút "Làm lại bài kiểm tra" để thử đạt điểm tuyệt đối 5/5 nhé!
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestartQuiz}
              className="px-5 py-3 border border-slate-300 hover:bg-slate-100 rounded-xl font-semibold text-slate-700 text-sm flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Làm lại bài</span>
            </button>

            <button
              onClick={() => {
                playClick();
                onNext();
              }}
              className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-md flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
            >
              <span>XEM TỔNG KẾT & NHẬN BẰNG KHEN</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
