import React from 'react';
import { TrainCarItem } from '../types';

interface TrainVisualizerProps {
  cars: TrainCarItem[];
  selectedIndex?: number | null;
  highlightedIndex?: number | null;
  onSelectCar?: (index: number) => void;
  showHumanPosition?: boolean;
  showPythonIndex?: boolean;
  showTypeBadge?: boolean;
  interactive?: boolean;
  onDeleteCar?: (index: number) => void;
  size?: 'normal' | 'compact';
}

export const TrainVisualizer: React.FC<TrainVisualizerProps> = ({
  cars,
  selectedIndex = null,
  highlightedIndex = null,
  onSelectCar,
  showHumanPosition = true,
  showPythonIndex = true,
  showTypeBadge = true,
  interactive = true,
  onDeleteCar,
  size = 'normal',
}) => {
  const isCompact = size === 'compact';

  return (
    <div className="w-full overflow-x-auto py-6 px-4 select-none relative scroll-smooth">
      {/* Train track background layer */}
      <div className="min-w-max flex items-end pb-8 relative">
        {/* Locomotive Engine (Đầu máy xe lửa) */}
        <div className="relative shrink-0 mr-1 z-10 flex flex-col items-center">
          {/* Steam Smoke Puffs */}
          <div className="absolute -top-10 left-12 flex gap-1 pointer-events-none">
            <div className="w-4 h-4 rounded-full bg-slate-300/80 animate-smoke" style={{ animationDelay: '0s' }} />
            <div className="w-6 h-6 rounded-full bg-slate-200/70 animate-smoke" style={{ animationDelay: '0.6s' }} />
            <div className="w-8 h-8 rounded-full bg-slate-100/60 animate-smoke" style={{ animationDelay: '1.2s' }} />
          </div>

          {/* Locomotive Body */}
          <div className="relative flex items-end">
            {/* Cab */}
            <div className={`${isCompact ? 'w-24 h-28' : 'w-32 h-36'} bg-red-600 rounded-t-2xl border-4 border-red-800 shadow-md relative flex flex-col justify-between p-2`}>
              {/* Roof visor */}
              <div className="absolute -top-3 -left-2 -right-2 h-3.5 bg-red-900 rounded-full" />
              
              {/* Chimney */}
              <div className="absolute -top-7 left-4 w-6 h-8 bg-slate-800 border-2 border-slate-900 rounded-t-sm flex items-top justify-center">
                <div className="w-8 h-2 bg-slate-950 rounded-full -mt-1" />
              </div>

              {/* Cabin Window */}
              <div className="w-full flex justify-around mt-4">
                <div className="w-7 h-9 bg-cyan-200 border-2 border-red-950 rounded-t-md relative overflow-hidden">
                  {/* Glass glare */}
                  <div className="absolute -inset-1 bg-gradient-to-tr from-transparent via-white/50 to-transparent rotate-45" />
                  {/* Engineer mascot icon */}
                  <div className="absolute bottom-1 left-1.5 text-xs">👨‍✈️</div>
                </div>
              </div>

              {/* Headlight on front */}
              <div className="absolute bottom-8 -right-3 w-4 h-6 bg-amber-300 border-2 border-amber-600 rounded-r-md shadow-[0_0_15px_rgba(251,191,36,0.9)]" />

              {/* Engine Nameplate */}
              <div className="bg-amber-400 text-red-950 text-[10px] font-black uppercase text-center rounded py-0.5 border border-amber-600 tracking-wider shadow-inner">
                PYTHON 3.12
              </div>
            </div>

            {/* Boiler & Cowcatcher */}
            <div className={`${isCompact ? 'w-16 h-18' : 'w-20 h-22'} bg-red-700 border-y-4 border-r-4 border-red-900 rounded-r-2xl relative flex items-center justify-center`}>
              <div className="w-full h-2 bg-red-900/60" />
              {/* Golden bell */}
              <div className="absolute -top-3 left-6 w-3 h-4 bg-amber-400 rounded-t-full border border-amber-700" />
            </div>
          </div>

          {/* Engine Wheels */}
          <div className="flex gap-2 -mt-4 z-20">
            <div className={`${isCompact ? 'w-9 h-9' : 'w-12 h-12'} rounded-full bg-slate-900 border-4 border-red-900 flex items-center justify-center shadow-md animate-chugga`}>
              <div className="w-3 h-3 rounded-full bg-amber-400" />
            </div>
            <div className={`${isCompact ? 'w-9 h-9' : 'w-12 h-12'} rounded-full bg-slate-900 border-4 border-red-900 flex items-center justify-center shadow-md animate-chugga`}>
              <div className="w-3 h-3 rounded-full bg-amber-400" />
            </div>
            <div className={`${isCompact ? 'w-7 h-7' : 'w-9 h-9'} rounded-full bg-slate-800 border-2 border-slate-950 flex items-center justify-center shadow-md self-end mb-0.5`}>
              <div className="w-2 h-2 rounded-full bg-slate-400" />
            </div>
          </div>
        </div>

        {/* Cars list (Các toa tàu) */}
        {cars.map((car, index) => {
          const isSelected = selectedIndex === index;
          const isHighlighted = highlightedIndex === index;
          const humanOrdinal = index + 1;

          return (
            <div key={car.id || index} className="flex items-end shrink-0">
              {/* Train Coupler / Hook (Khớp nối toa) */}
              <div className="w-4 h-2 bg-slate-800 self-center mb-6 relative">
                <div className="w-2 h-2 rounded-full bg-slate-600 absolute -top-1 left-1" />
              </div>

              {/* Train Car Unit */}
              <div className="flex flex-col items-center">
                {/* 1. Human Position Label (Hàng trên) */}
                {showHumanPosition && (
                  <div
                    className={`text-xs font-bold px-2 py-0.5 rounded-t-md transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-blue-100 text-blue-900 border border-blue-200'
                    }`}
                  >
                    Toa {humanOrdinal}
                  </div>
                )}

                {/* 2. Car Box Container */}
                <div
                  onClick={() => interactive && onSelectCar && onSelectCar(index)}
                  className={`relative cursor-pointer transition-all duration-200 flex flex-col justify-between rounded-xl border-4 shadow-md ${
                    isCompact ? 'w-24 h-28 p-2' : 'w-32 md:w-36 h-36 md:h-40 p-3'
                  } ${
                    isSelected
                      ? 'ring-4 ring-amber-400 -translate-y-2 scale-105 shadow-xl border-amber-500'
                      : isHighlighted
                      ? 'ring-4 ring-purple-500 -translate-y-2 scale-105 shadow-xl border-purple-600 animate-bounce'
                      : 'hover:-translate-y-1 hover:shadow-lg'
                  }`}
                  style={{
                    backgroundColor: car.color || '#3b82f6',
                    borderColor: isSelected ? '#f59e0b' : '#1e293b',
                  }}
                >
                  {/* Car Roof Stripe */}
                  <div className="w-full h-2.5 bg-black/20 rounded-full mb-1" />

                  {/* Car Cargo / Value Container */}
                  <div className="bg-white/95 rounded-lg p-2 shadow-inner border border-black/10 flex flex-col items-center justify-center flex-1 my-1 overflow-hidden">
                    <span className="text-xs text-slate-400 font-mono">giá trị</span>
                    <span
                      className={`font-mono font-bold text-center truncate w-full ${
                        isCompact ? 'text-sm' : 'text-base md:text-lg'
                      } ${
                        typeof car.value === 'string'
                          ? 'text-emerald-700'
                          : typeof car.value === 'number'
                          ? 'text-blue-700'
                          : 'text-purple-700'
                      }`}
                    >
                      {typeof car.value === 'string' ? `"${car.value}"` : String(car.value)}
                    </span>
                  </div>

                  {/* Type badge and delete button */}
                  <div className="flex items-center justify-between w-full pt-1">
                    {showTypeBadge && (
                      <span className="text-[10px] uppercase font-bold font-mono tracking-wider bg-black/30 text-white px-1.5 py-0.5 rounded">
                        {car.type || typeof car.value}
                      </span>
                    )}

                    {onDeleteCar && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteCar(index);
                        }}
                        title="Xóa toa này"
                        className="text-[10px] bg-red-600/80 hover:bg-red-700 text-white rounded px-1.5 py-0.5 transition-colors"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                {/* 3. Car Wheels */}
                <div className="flex justify-between w-4/5 -mt-3.5 z-20">
                  <div
                    className={`${
                      isCompact ? 'w-6 h-6' : 'w-8 h-8'
                    } rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center shadow`}
                  >
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                  </div>
                  <div
                    className={`${
                      isCompact ? 'w-6 h-6' : 'w-8 h-8'
                    } rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center shadow`}
                  >
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                  </div>
                </div>

                {/* 4. Python Index Label (Hàng dưới) */}
                {showPythonIndex && (
                  <div
                    className={`mt-2 font-mono text-xs md:text-sm font-black px-2.5 py-1 rounded-md transition-all ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300 scale-110 shadow'
                        : isHighlighted
                        ? 'bg-purple-600 text-white ring-2 ring-purple-300 scale-110 shadow'
                        : 'bg-slate-900 text-amber-300 border border-slate-700'
                    }`}
                  >
                    Index: {index}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Caboose / Train End Marker */}
        <div className="shrink-0 ml-2 self-center mb-6">
          <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-slate-900 animate-pulse" title="Đuôi tàu" />
        </div>
      </div>

      {/* Railway Track Layer */}
      <div className="w-full relative mt-[-26px]">
        {/* Steel Rail Top */}
        <div className="h-2 bg-slate-600 border-y border-slate-900 shadow-sm" />
        {/* Wooden Ties (Thanh ray gỗ) */}
        <div className="h-4 rail-track-bg opacity-80" />
        {/* Steel Rail Bottom */}
        <div className="h-1 bg-slate-700 border-b border-slate-950" />
      </div>
    </div>
  );
};
