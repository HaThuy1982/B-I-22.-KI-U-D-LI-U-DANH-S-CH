import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  ArrowRight, 
  Terminal, 
  RotateCcw,
  Play,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { TrainVisualizer } from '../TrainVisualizer';
import { FeynmanBox } from '../FeynmanBox';
import { TrainCarItem } from '../../types';
import { playClick, playSuccess, playWrong, playChugga } from '../../utils/audio';

interface Screen4LaboratoryProps {
  onNext: () => void;
  classroomMode: boolean;
  onUnlockBadge: (badgeId: string) => void;
}

const defaultLaboratoryCars: TrainCarItem[] = [
  { id: '1', value: 7, type: 'int', color: '#3b82f6' },
  { id: '2', value: 'Lan', type: 'str', color: '#10b981' },
  { id: '3', value: 3.5, type: 'float', color: '#f59e0b' },
  { id: '4', value: true, type: 'bool', color: '#8b5cf6' },
  { id: '5', value: 'Tin', type: 'str', color: '#ec4899' },
];

const carColors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#e11d48', '#84cc16'];

export const Screen4Laboratory: React.FC<Screen4LaboratoryProps> = ({
  onNext,
  classroomMode,
  onUnlockBadge,
}) => {
  const [cars, setCars] = useState<TrainCarItem[]>(defaultLaboratoryCars);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);

  // Forms state
  const [appendValue, setAppendValue] = useState<string>('Minh');
  const [appendType, setAppendType] = useState<'str' | 'int' | 'float' | 'bool'>('str');

  const [editValue, setEditValue] = useState<string>('10');
  const [editIndex, setEditIndex] = useState<number>(0);

  const [popIndex, setPopIndex] = useState<number>(0);

  // Console output log
  const [consoleHistory, setConsoleHistory] = useState<Array<{ code: string; result: string; type: 'success' | 'error' }>>([
    {
      code: 'students = [7, "Lan", 3.5, True, "Tin"]',
      result: 'Danh sách ban đầu gồm 5 phần tử đã sẵn sàng trên đường ray!',
      type: 'success',
    },
  ]);

  const parseValue = (raw: string, type: 'str' | 'int' | 'float' | 'bool') => {
    if (type === 'int') {
      const val = parseInt(raw, 10);
      return isNaN(val) ? 0 : val;
    }
    if (type === 'float') {
      const val = parseFloat(raw);
      return isNaN(val) ? 0.0 : val;
    }
    if (type === 'bool') {
      return raw.toLowerCase() === 'true' || raw === '1';
    }
    return raw;
  };

  // 1. Append
  const handleAppend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appendValue.trim()) return;
    const val = parseValue(appendValue, appendType);
    const color = carColors[cars.length % carColors.length];
    const newCar: TrainCarItem = {
      id: String(Date.now()),
      value: val,
      type: appendType,
      color,
    };

    const newCars = [...cars, newCar];
    setCars(newCars);
    setSelectedIndex(newCars.length - 1);
    playChugga();
    playSuccess();
    onUnlockBadge('engineer');

    const codeStr = appendType === 'str' ? `students.append("${val}")` : `students.append(${val})`;
    setConsoleHistory((prev) => [
      {
        code: codeStr,
        result: `Toa mới mang giá trị ${typeof val === 'string' ? `"${val}"` : val} đã được nối vào cuối đoàn tàu ở Index ${newCars.length - 1}!`,
        type: 'success',
      },
      ...prev.slice(0, 7),
    ]);
  };

  // 2. Modify / Update
  const handleModify = (e: React.FormEvent) => {
    e.preventDefault();
    if (cars.length === 0) return;
    if (editIndex < 0 || editIndex >= cars.length) {
      playWrong();
      setConsoleHistory((prev) => [
        {
          code: `students[${editIndex}] = ...`,
          result: `IndexError: list assignment index out of range (Không tồn tại toa có index ${editIndex})`,
          type: 'error',
        },
        ...prev.slice(0, 7),
      ]);
      return;
    }

    const currentCar = cars[editIndex];
    // try to retain type or infer
    let val: string | number | boolean = editValue;
    if (!isNaN(Number(editValue)) && editValue.trim() !== '') {
      val = editValue.includes('.') ? parseFloat(editValue) : parseInt(editValue, 10);
    } else if (editValue.toLowerCase() === 'true') {
      val = true;
    } else if (editValue.toLowerCase() === 'false') {
      val = false;
    }

    const updatedCars = [...cars];
    updatedCars[editIndex] = {
      ...currentCar,
      value: val,
      type: typeof val === 'number' ? (Number.isInteger(val) ? 'int' : 'float') : typeof val === 'boolean' ? 'bool' : 'str',
    };

    setCars(updatedCars);
    setSelectedIndex(editIndex);
    playSuccess();
    onUnlockBadge('engineer');

    const codeValStr = typeof val === 'string' ? `"${val}"` : String(val);
    setConsoleHistory((prev) => [
      {
        code: `students[${editIndex}] = ${codeValStr}`,
        result: `Đã thay đổi hàng hóa của toa tại Index ${editIndex} thành ${codeValStr}!`,
        type: 'success',
      },
      ...prev.slice(0, 7),
    ]);
  };

  // 3. Pop / Remove
  const handlePop = (targetIdx: number) => {
    if (cars.length === 0) {
      playWrong();
      return;
    }
    if (targetIdx < 0 || targetIdx >= cars.length) {
      playWrong();
      setConsoleHistory((prev) => [
        {
          code: `students.pop(${targetIdx})`,
          result: `IndexError: pop index out of range`,
          type: 'error',
        },
        ...prev.slice(0, 7),
      ]);
      return;
    }

    const removedCar = cars[targetIdx];
    const newCars = cars.filter((_, idx) => idx !== targetIdx);
    setCars(newCars);
    setSelectedIndex(newCars.length > 0 ? Math.min(targetIdx, newCars.length - 1) : null);
    playSuccess();
    onUnlockBadge('engineer');

    setConsoleHistory((prev) => [
      {
        code: `students.pop(${targetIdx})`,
        result: `Toa tại Index ${targetIdx} (chứa "${removedCar.value}") đã được tháo dỡ khỏi đoàn tàu. Các toa phía sau tự động dịch chuyển lùi 1 vị trí!`,
        type: 'success',
      },
      ...prev.slice(0, 7),
    ]);
  };

  const handleResetLab = () => {
    playClick();
    setCars(defaultLaboratoryCars);
    setSelectedIndex(0);
    setConsoleHistory([
      {
        code: 'students = [7, "Lan", 3.5, True, "Tin"]',
        result: 'Đã khôi phục đoàn tàu thí nghiệm ban đầu gồm 5 toa!',
        type: 'success',
      },
    ]);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="text-xs md:text-sm font-semibold uppercase tracking-wider text-amber-800">
          Màn 4: Xưởng thực hành tương tác
        </div>
        <h2
          className={`font-black text-slate-900 tracking-tight ${
            classroomMode ? 'text-3xl md:text-5xl' : 'text-2xl md:text-4xl'
          }`}
        >
          PHÒNG THÍ NGHIỆM PYTHON LIST
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base">
          Tự tay lắp ráp, thay đổi và điều khiển đoàn tàu! Mọi hành động của em trên giao diện sẽ được biên dịch trực tiếp sang câu lệnh Python chuẩn.
        </p>
      </div>

      {/* Train Interactive Track Stage */}
      <div className="bg-white border-2 border-amber-300 rounded-3xl p-4 md:p-6 shadow-sm overflow-hidden space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs md:text-sm">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-slate-800">
              students = [{cars.map((c) => (typeof c.value === 'string' ? `"${c.value}"` : String(c.value))).join(', ')}]
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs bg-slate-100 px-2.5 py-1 rounded-md text-slate-700">
              len(students) = {cars.length}
            </span>
            <button
              onClick={handleResetLab}
              title="Khôi phục mặc định"
              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {cars.length > 0 ? (
          <TrainVisualizer
            cars={cars}
            selectedIndex={selectedIndex}
            onSelectCar={(idx) => {
              playClick();
              setSelectedIndex(idx);
              setEditIndex(idx);
              setPopIndex(idx);
            }}
            onDeleteCar={handlePop}
            showHumanPosition={true}
            showPythonIndex={true}
            showTypeBadge={true}
            interactive={true}
          />
        ) : (
          <div className="py-12 text-center text-slate-400 font-medium">
            Đoàn tàu hiện không còn toa nào! Hãy thêm toa mới bên dưới.
          </div>
        )}
      </div>

      {/* Lab Actions Panel (3 Columns: Append, Modify, Pop) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Action 1: Append */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
              <Plus className="w-4 h-4 text-emerald-600" />
              <span>1. Thêm toa mới (append)</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Lệnh <code className="font-mono text-emerald-700">append()</code> luôn gắn toa mới vào đuôi đoàn tàu.
            </p>

            <form onSubmit={handleAppend} className="mt-4 space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase">Giá trị toa mới:</label>
                <input
                  type="text"
                  value={appendValue}
                  onChange={(e) => setAppendValue(e.target.value)}
                  placeholder="Ví dụ: Minh, 99, 4.2..."
                  className="w-full text-sm font-mono mt-1 px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase">Kiểu dữ liệu:</label>
                <select
                  value={appendType}
                  onChange={(e) => setAppendType(e.target.value as 'str' | 'int' | 'float' | 'bool')}
                  className="w-full text-xs font-mono mt-1 px-3 py-2 border border-slate-300 rounded-xl bg-white"
                >
                  <option value="str">str (Chuỗi chữ - "Minh")</option>
                  <option value="int">int (Số nguyên - 10)</option>
                  <option value="float">float (Số thực - 8.5)</option>
                  <option value="bool">bool (Đúng/Sai - True)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs md:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
              >
                <Play className="w-3.5 h-3.5" />
                <span>students.append(...)</span>
              </button>
            </form>
          </div>
        </div>

        {/* Action 2: Modify / Update */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-blue-800 font-bold text-sm">
              <Edit3 className="w-4 h-4 text-blue-600" />
              <span>2. Đổi giá trị toa (Modify)</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Cú pháp: <code className="font-mono text-blue-700">students[index] = giá_trị_mới</code>
            </p>

            <form onSubmit={handleModify} className="mt-4 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase">Index cần sửa:</label>
                  <input
                    type="number"
                    min={0}
                    max={Math.max(0, cars.length - 1)}
                    value={editIndex}
                    onChange={(e) => setEditIndex(parseInt(e.target.value, 10) || 0)}
                    className="w-full text-sm font-mono mt-1 px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase">Giá trị mới:</label>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    placeholder="Ví dụ: 10"
                    className="w-full text-sm font-mono mt-1 px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={cars.length === 0}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs md:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
              >
                <Play className="w-3.5 h-3.5" />
                <span>students[{editIndex}] = {editValue || '...'}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Action 3: Pop / Remove */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
              <Trash2 className="w-4 h-4 text-rose-600" />
              <span>3. Xóa / Tháo dỡ toa (pop)</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Lệnh <code className="font-mono text-rose-700">students.pop(index)</code> sẽ lấy và xóa toa tại vị trí index.
            </p>

            <div className="mt-4 space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase">Index muốn xóa:</label>
                <input
                  type="number"
                  min={0}
                  max={Math.max(0, cars.length - 1)}
                  value={popIndex}
                  onChange={(e) => setPopIndex(parseInt(e.target.value, 10) || 0)}
                  className="w-full text-sm font-mono mt-1 px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <button
                onClick={() => handlePop(popIndex)}
                disabled={cars.length === 0}
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs md:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>students.pop({popIndex})</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Python Live Console Output */}
      <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 text-slate-200 space-y-3 shadow-lg">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-amber-400" />
            <span className="font-mono text-xs font-bold text-slate-300">Nhật ký thực thi Python mô phỏng</span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">{consoleHistory.length} câu lệnh vừa chạy</span>
        </div>

        <div className="space-y-2 font-mono text-xs max-h-48 overflow-y-auto pr-1">
          {consoleHistory.map((item, idx) => (
            <div key={idx} className="space-y-0.5">
              <div className="text-amber-300 flex items-center gap-1.5 font-bold">
                <span className="text-slate-500">&gt;&gt;&gt;</span>
                <span>{item.code}</span>
              </div>
              <div
                className={`pl-5 text-[11px] flex items-center gap-1.5 ${
                  item.type === 'error' ? 'text-red-400' : 'text-emerald-400'
                }`}
              >
                {item.type === 'error' ? (
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                )}
                <span>{item.result}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feynman Method */}
      <FeynmanBox
        topic="Cách thức hoạt động của các lệnh List (append, pop, modify)"
        suggestedExplanation="Em có thể giải thích như sau: List trong Python giống như đoàn tàu lắp ghép bằng lego. Lệnh append() nối thêm một toa mới vào đuôi. Lệnh pop(i) tháo dỡ một toa ở vị trí i ra ngoài (khi đó các toa phía sau sẽ tự động dồn lên phía trước và giảm chỉ số Index đi 1). Còn students[i] = giá_trị giống như mở cửa toa số i để đổi hàng hóa bên trong!"
        sampleAnalogy="Xếp hàng mua vé xem phim: append() là người mới đến xếp ở cuối hàng, pop() là người rời khỏi hàng, còn đổi chỗ là thay người đứng ở vị trí đó!"
      />

      {/* Nav button */}
      <div className="flex justify-end pt-2">
        <button
          onClick={() => {
            playClick();
            onNext();
          }}
          className="px-8 py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-2xl shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
        >
          <span>TIẾP THEO: THỬ THÁCH QUẢN LÝ LỚP 40 HỌC SINH</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
