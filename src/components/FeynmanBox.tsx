import React, { useState } from 'react';
import { Lightbulb, Send, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { playClick, playSuccess } from '../utils/audio';

interface FeynmanBoxProps {
  topic: string;
  suggestedExplanation: string;
  sampleAnalogy?: string;
}

export const FeynmanBox: React.FC<FeynmanBoxProps> = ({
  topic,
  suggestedExplanation,
  sampleAnalogy = 'Ví dụ: Tầng trệt của tòa nhà là tầng 0, hoặc vạch đầu tiên của cây thước kẻ luôn là số 0 cm!',
}) => {
  const [userText, setUserText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userText.trim()) return;
    playSuccess();
    setSubmitted(true);
    setShowHint(true);
  };

  return (
    <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 md:p-6 shadow-sm my-6 transition-all">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800">
            <span>Phương pháp Feynman</span>
            <span aria-hidden="true">·</span>
            <span>Tự giải thích để khắc sâu {topic}</span>
          </div>
          <h4 className="text-base md:text-lg font-bold text-slate-900 mt-1">
            Nếu em phải giải thích cho một người bạn chưa từng học Python, em sẽ giải thích như thế nào?
          </h4>
          <p className="text-sm text-slate-600 mt-1">
            Bí quyết học giỏi nhất là nói lại bằng ngôn ngữ đời thường đơn giản nhất!
          </p>

          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <textarea
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              placeholder="Nhập lời giải thích đơn giản của em ở đây (ví dụ: Em sẽ nói với bạn rằng...)"
              rows={3}
              className="w-full text-sm rounded-xl border border-amber-300/80 bg-white p-3.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                type="submit"
                disabled={!userText.trim()}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-sm transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Gửi lời giải thích của em</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playClick();
                  setShowHint(!showHint);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 hover:text-amber-950 underline decoration-amber-400 underline-offset-4 cursor-pointer"
              >
                {showHint ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                <span>{showHint ? 'Ẩn gợi ý sư phạm' : 'Xem gợi ý giải thích của thầy cô'}</span>
              </button>
            </div>
          </form>

          {submitted && (
            <div className="mt-4 flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-sm font-medium animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Tuyệt vời! Việc tự diễn đạt bằng lời giúp não bộ ghi nhớ Index lâu gấp 3 lần.</span>
            </div>
          )}

          {showHint && (
            <div className="mt-4 p-4 bg-white/90 border border-amber-200 rounded-xl space-y-2 text-sm text-slate-700 animate-fadeIn">
              <div className="font-semibold text-amber-900 flex items-center gap-2">
                <span>💡 Gợi ý giải thích trực quan:</span>
              </div>
              <p className="leading-relaxed">{suggestedExplanation}</p>
              <div className="text-xs text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200/60">
                <strong>Ẩn dụ thú vị:</strong> {sampleAnalogy}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
