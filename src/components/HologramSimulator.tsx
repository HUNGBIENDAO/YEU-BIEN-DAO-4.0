import React, { useState, useEffect } from 'react';
import { Eye, RotateCw, Sparkles, Download, Layers, ShieldCheck } from 'lucide-react';

interface Props {
  lang: 'vi' | 'en';
}

export const HologramSimulator: React.FC<Props> = ({ lang }) => {
  const [viewMode, setViewMode] = useState<'prism' | 'quadrant' | 'template'>('prism');
  const [model, setModel] = useState<'turtle' | 'lighthouse' | 'buoy'>('turtle');
  const [rotation, setRotation] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [colorScheme, setColorScheme] = useState<'cyan' | 'emerald' | 'amber'>('cyan');

  useEffect(() => {
    let animId: number;
    const animate = () => {
      setRotation((prev) => (prev + 0.8 * speed) % 360);
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [speed]);

  const colorStyles = {
    cyan: {
      text: 'text-cyan-400',
      stroke: '#22d3ee',
      glow: 'rgba(34, 211, 238, 0.4)',
      accent: 'border-cyan-500 bg-cyan-950/40 text-cyan-200',
    },
    emerald: {
      text: 'text-emerald-400',
      stroke: '#34d399',
      glow: 'rgba(52, 211, 153, 0.4)',
      accent: 'border-emerald-500 bg-emerald-950/40 text-emerald-200',
    },
    amber: {
      text: 'text-amber-400',
      stroke: '#fbbf24',
      glow: 'rgba(251, 191, 36, 0.4)',
      accent: 'border-amber-500 bg-amber-950/40 text-amber-200',
    },
  }[colorScheme];

  // Render SVG object based on selection
  const renderModelSvg = (angleOffset = 0, scale = 1) => {
    const curAngle = (rotation + angleOffset) % 360;
    const rad = (curAngle * Math.PI) / 180;
    const cosVal = Math.cos(rad);
    const sinVal = Math.sin(rad);

    if (model === 'turtle') {
      // 3D wireframe sea turtle
      return (
        <svg
          viewBox="-60 -60 120 120"
          className="w-full h-full"
          style={{ filter: `drop-shadow(0 0 8px ${colorStyles.glow})` }}
        >
          {/* Shell outline with 3D projection tilt */}
          <ellipse
            cx="0"
            cy="0"
            rx={32 * Math.abs(cosVal) + 8}
            ry="38"
            fill="none"
            stroke={colorStyles.stroke}
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />
          {/* Shell scutes */}
          <ellipse
            cx="0"
            cy="0"
            rx={20 * Math.abs(cosVal) + 4}
            ry="24"
            fill="none"
            stroke={colorStyles.stroke}
            strokeWidth="1"
          />
          <path
            d={`M0,-24 L0,24 M${-16 * cosVal},-10 L${16 * cosVal},-10 M${-16 * cosVal},10 L${16 * cosVal},10`}
            stroke={colorStyles.stroke}
            strokeWidth="1"
          />
          {/* Head */}
          <circle
            cx="0"
            cy="-44"
            r="8"
            fill="none"
            stroke={colorStyles.stroke}
            strokeWidth="1.5"
          />
          {/* Flippers */}
          <path
            d={`M${-25 * cosVal},-18 Q${-48 * cosVal},-32 ${-38 * cosVal},-5 Q${-20 * cosVal},-8 ${-15 * cosVal},-5`}
            fill="none"
            stroke={colorStyles.stroke}
            strokeWidth="1.5"
          />
          <path
            d={`M${25 * cosVal},-18 Q${48 * cosVal},-32 ${38 * cosVal},-5 Q${20 * cosVal},-8 ${15 * cosVal},-5`}
            fill="none"
            stroke={colorStyles.stroke}
            strokeWidth="1.5"
          />
          {/* Rear flippers */}
          <path
            d={`M${-12 * cosVal},34 L${-24 * cosVal},46 M${12 * cosVal},34 L${24 * cosVal},46`}
            stroke={colorStyles.stroke}
            strokeWidth="1.5"
          />
        </svg>
      );
    }

    if (model === 'lighthouse') {
      // Truong Sa Lighthouse
      return (
        <svg
          viewBox="-60 -60 120 120"
          className="w-full h-full"
          style={{ filter: `drop-shadow(0 0 10px ${colorStyles.glow})` }}
        >
          {/* Base */}
          <path
            d="M-28,46 L28,46 L22,38 L-22,38 Z"
            fill="none"
            stroke={colorStyles.stroke}
            strokeWidth="1.5"
          />
          {/* Tower shaft with 3D rotation bands */}
          <path
            d="M-18,38 L-10,-20 L10,-20 L18,38 Z"
            fill="none"
            stroke={colorStyles.stroke}
            strokeWidth="1.5"
          />
          <line x1={-16 + 2 * cosVal} y1="24" x2={16 - 2 * cosVal} y2="24" stroke={colorStyles.stroke} strokeWidth="1" />
          <line x1={-14 + 2 * cosVal} y1="10" x2={14 - 2 * cosVal} y2="10" stroke={colorStyles.stroke} strokeWidth="1" />
          <line x1={-12 + 2 * cosVal} y1="-5" x2={12 - 2 * cosVal} y2="-5" stroke={colorStyles.stroke} strokeWidth="1" />
          {/* Lantern room */}
          <rect x="-12" y="-34" width="24" height="14" fill="none" stroke={colorStyles.stroke} strokeWidth="1.5" />
          {/* Rotating beam */}
          <polygon
            points={`0,-27 ${60 * cosVal - 15 * sinVal},-50 ${60 * cosVal + 15 * sinVal},-5`}
            fill={colorStyles.stroke}
            fillOpacity="0.25"
          />
          {/* Dome & Flag */}
          <path d="M-10,-34 Q0,-46 10,-34 Z" fill="none" stroke={colorStyles.stroke} strokeWidth="1.5" />
          <line x1="0" y1="-46" x2="0" y2="-56" stroke={colorStyles.stroke} strokeWidth="1.5" />
          <polygon points="0,-56 12,-52 0,-48" fill={colorStyles.stroke} fillOpacity="0.6" stroke={colorStyles.stroke} strokeWidth="1" />
        </svg>
      );
    }

    // IoT Buoy
    return (
      <svg
        viewBox="-60 -60 120 120"
        className="w-full h-full"
        style={{ filter: `drop-shadow(0 0 8px ${colorStyles.glow})` }}
      >
        <circle cx="0" cy="8" r="24" fill="none" stroke={colorStyles.stroke} strokeWidth="1.5" strokeDasharray="6 3" />
        <ellipse cx="0" cy="8" rx={24 * Math.abs(cosVal) + 4} ry="10" fill="none" stroke={colorStyles.stroke} strokeWidth="1" />
        <line x1="-10" y1="8" x2="0" y2="-32" stroke={colorStyles.stroke} strokeWidth="1.5" />
        <line x1="10" y1="8" x2="0" y2="-32" stroke={colorStyles.stroke} strokeWidth="1.5" />
        <circle cx="0" cy="-32" r="5" fill={colorStyles.stroke} fillOpacity="0.6" stroke={colorStyles.stroke} strokeWidth="1" />
        {/* Antenna signal pulses */}
        <path d="M-12,-38 Q0,-46 12,-38" fill="none" stroke={colorStyles.stroke} strokeWidth="1" opacity={Math.abs(sinVal)} />
        <path d="M-18,-44 Q0,-54 18,-44" fill="none" stroke={colorStyles.stroke} strokeWidth="1" opacity={Math.abs(cosVal)} />
        {/* Underwater sensor probe */}
        <line x1="0" y1="32" x2="0" y2="52" stroke={colorStyles.stroke} strokeWidth="1.5" />
        <rect x="-6" y="44" width="12" height="6" fill="none" stroke={colorStyles.stroke} strokeWidth="1" />
      </svg>
    );
  };

  const handleDownloadSvgTemplate = () => {
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  <style>
    text { font-family: sans-serif; font-size: 11px; fill: #1e293b; }
    line, polygon { stroke: #0056D2; stroke-width: 1.5; fill: none; }
    .fold { stroke: #e11d48; stroke-dasharray: 4 3; }
  </style>
  <rect width="100%" height="100%" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
  <text x="250" y="30" text-anchor="middle" font-size="14" font-weight="bold">BẢN VẼ STEM: KIM TỰ THÁP HOLOGRAM 3D (ĐIỆN THOẠI)</text>
  <text x="250" y="48" text-anchor="middle" fill="#64748b">Tỷ lệ: Đáy lớn 6cm · Đáy nhỏ 1cm · Chiều cao 3.5cm</text>
  
  <!-- 4 Connected Trapezoids Cross layout -->
  <g transform="translate(250, 250)">
    <!-- Center top -->
    <polygon points="-5,-10 5,-10 30,-80 -30,-80" stroke="#0056D2" stroke-width="2" fill="#e0f2fe" fill-opacity="0.2"/>
    <!-- Center bottom -->
    <polygon points="-5,10 5,10 30,80 -30,80" stroke="#0056D2" stroke-width="2" fill="#e0f2fe" fill-opacity="0.2"/>
    <!-- Center left -->
    <polygon points="-10,-5 -10,5 -80,30 -80,-30" stroke="#0056D2" stroke-width="2" fill="#e0f2fe" fill-opacity="0.2"/>
    <!-- Center right -->
    <polygon points="10,-5 10,5 80,30 80,-30" stroke="#0056D2" stroke-width="2" fill="#e0f2fe" fill-opacity="0.2"/>
    <rect x="-10" y="-10" width="20" height="20" stroke="#e11d48" stroke-dasharray="3 2" fill="none"/>
  </g>
  <text x="250" y="440" text-anchor="middle" font-size="10" fill="#475569">Cắt theo nét liền màu xanh, gập góc 45 độ theo nét đứt màu đỏ.</text>
  <text x="250" y="458" text-anchor="middle" font-size="10" fill="#0056D2">Dự án: Teen Yêu Biển Đảo 4.0 - @TEENYEUBIENDAO</text>
</svg>`;
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ban-ve-stem-hologram-3d.svg';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-900 rounded-xl p-5 text-white border border-slate-800">
      {/* Top Controller Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            {lang === 'vi' ? 'Phòng Thí Nghiệm Quang Học Hologram 3D' : '3D Hologram Optical Lab'}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {lang === 'vi'
              ? 'Nguyên lý phản xạ 4 mặt nghiêng 45° tạo ảnh lơ lửng không gian'
              : '4-quadrant 45-degree prism reflection generating spatial floating illusions'}
          </p>
        </div>

        {/* View Mode Tabs */}
        <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg">
          <button
            onClick={() => setViewMode('prism')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              viewMode === 'prism' ? 'bg-cyan-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5 inline mr-1" />
            {lang === 'vi' ? 'Không gian 3D' : '3D Space'}
          </button>
          <button
            onClick={() => setViewMode('quadrant')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              viewMode === 'quadrant' ? 'bg-cyan-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5 inline mr-1" />
            {lang === 'vi' ? 'Màn hình 4 góc' : '4 Quadrants'}
          </button>
          <button
            onClick={() => setViewMode('template')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              viewMode === 'template' ? 'bg-cyan-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            {lang === 'vi' ? 'Bản vẽ cắt STEM' : 'Paper Template'}
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Visualizer Canvas Area (2 cols) */}
        <div className="lg:col-span-2 relative aspect-video bg-black rounded-lg border border-slate-800 overflow-hidden flex items-center justify-center p-4">
          {viewMode === 'prism' && (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Virtual Hologram Glass Pyramid wireframe */}
              <div
                className="absolute w-56 h-56 border border-cyan-500/30 rounded-full"
                style={{
                  transform: 'rotateX(65deg)',
                  boxShadow: '0 0 35px rgba(6,182,212,0.15)',
                }}
              />
              <div className="absolute w-40 h-40 border border-dashed border-cyan-400/40 transform rotate-45" />

              {/* Floating Holographic Central Entity */}
              <div
                className="relative z-10 w-44 h-44 flex items-center justify-center animate-pulse"
                style={{
                  transform: 'scale(1.1)',
                  filter: `drop-shadow(0 0 15px ${colorStyles.glow})`,
                }}
              >
                {renderModelSvg(0)}
              </div>

              {/* Optical rays simulation */}
              <div className="absolute inset-x-0 bottom-4 text-center">
                <span className="text-[11px] text-cyan-300/80 font-mono tracking-wide bg-slate-900/80 px-2.5 py-1 rounded border border-cyan-900/60">
                  {lang === 'vi'
                    ? `Ảnh ảo 3D hội tụ tại tâm kim tự tháp (Góc xoay: ${Math.round(rotation)}°)`
                    : `Virtual 3D image converging at pyramid apex (Angle: ${Math.round(rotation)}°)`}
                </span>
              </div>
            </div>
          )}

          {viewMode === 'quadrant' && (
            <div className="relative w-72 h-72 aspect-square bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-center">
              {/* Center crosshair for placing real pyramid */}
              <div className="absolute w-12 h-12 border border-dashed border-red-500/50 rounded flex items-center justify-center">
                <span className="text-[9px] text-red-400 font-mono">Đỉnh/Top</span>
              </div>
              <div className="absolute w-full h-0.5 bg-slate-800/80" />
              <div className="absolute h-full w-0.5 bg-slate-800/80" />

              {/* Top View (Upside down) */}
              <div className="absolute top-2 w-20 h-20 transform rotate-180">
                {renderModelSvg(0)}
              </div>

              {/* Bottom View (Normal) */}
              <div className="absolute bottom-2 w-20 h-20">
                {renderModelSvg(0)}
              </div>

              {/* Left View (Rotated 90 deg) */}
              <div className="absolute left-2 w-20 h-20 transform rotate-90">
                {renderModelSvg(0)}
              </div>

              {/* Right View (Rotated -90 deg) */}
              <div className="absolute right-2 w-20 h-20 transform -rotate-90">
                {renderModelSvg(0)}
              </div>
            </div>
          )}

          {viewMode === 'template' && (
            <div className="w-full h-full bg-slate-950 p-4 rounded flex flex-col items-center justify-center text-center">
              <div className="w-48 h-36 border-2 border-dashed border-cyan-400/60 rounded flex items-center justify-center p-3 mb-3 bg-cyan-950/20">
                <div className="text-center">
                  <div className="text-xs text-cyan-300 font-medium">Bản vẽ hình thang cân</div>
                  <div className="text-[11px] text-slate-400 mt-1">Đáy lớn: 6.0 cm</div>
                  <div className="text-[11px] text-slate-400">Đáy nhỏ: 1.0 cm</div>
                  <div className="text-[11px] text-slate-400">Chiều cao: 3.5 cm</div>
                </div>
              </div>
              <button
                onClick={handleDownloadSvgTemplate}
                className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium rounded-lg transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                {lang === 'vi' ? 'Tải file bản vẽ in SVG chuẩn' : 'Download Printable SVG Blueprint'}
              </button>
            </div>
          )}
        </div>

        {/* Controls Deck (1 col) */}
        <div className="flex flex-col justify-between space-y-4 bg-slate-800/50 p-4 rounded-lg border border-slate-800 text-xs">
          <div>
            <span className="text-slate-400 block mb-2 font-medium">
              {lang === 'vi' ? '1. Chọn vật thể 3D biển đảo' : '1. Select 3D Maritime Model'}
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => setModel('turtle')}
                className={`py-2 px-1 text-center rounded border transition-colors ${
                  model === 'turtle' ? 'bg-cyan-700/60 border-cyan-400 text-white' : 'border-slate-700 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {lang === 'vi' ? 'Rùa biển' : 'Sea Turtle'}
              </button>
              <button
                onClick={() => setModel('lighthouse')}
                className={`py-2 px-1 text-center rounded border transition-colors ${
                  model === 'lighthouse' ? 'bg-cyan-700/60 border-cyan-400 text-white' : 'border-slate-700 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {lang === 'vi' ? 'Hải đăng 4.0' : 'Lighthouse'}
              </button>
              <button
                onClick={() => setModel('buoy')}
                className={`py-2 px-1 text-center rounded border transition-colors ${
                  model === 'buoy' ? 'bg-cyan-700/60 border-cyan-400 text-white' : 'border-slate-700 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {lang === 'vi' ? 'Phao IoT' : 'Smart Buoy'}
              </button>
            </div>
          </div>

          <div>
            <span className="text-slate-400 block mb-2 font-medium">
              {lang === 'vi' ? '2. Màu quang phổ hiển thị' : '2. Optical Emission Color'}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setColorScheme('cyan')}
                className={`flex-1 py-1.5 rounded border transition-colors ${
                  colorScheme === 'cyan' ? 'border-cyan-400 bg-cyan-950 text-cyan-200' : 'border-slate-700 text-slate-400'
                }`}
              >
                Xanh lam
              </button>
              <button
                onClick={() => setColorScheme('emerald')}
                className={`flex-1 py-1.5 rounded border transition-colors ${
                  colorScheme === 'emerald' ? 'border-emerald-400 bg-emerald-950 text-emerald-200' : 'border-slate-700 text-slate-400'
                }`}
              >
                Ngọc bích
              </button>
              <button
                onClick={() => setColorScheme('amber')}
                className={`flex-1 py-1.5 rounded border transition-colors ${
                  colorScheme === 'amber' ? 'border-amber-400 bg-amber-950 text-amber-200' : 'border-slate-700 text-slate-400'
                }`}
              >
                Hổ phách
              </button>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-slate-400 mb-1">
              <span>{lang === 'vi' ? 'Tốc độ xoay mô hình' : 'Rotation Speed'}</span>
              <span className="font-mono text-cyan-300">{speed}x</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="3"
              step="0.2"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>

          <div className="pt-2 border-t border-slate-700/60 text-slate-300 text-[11px] leading-relaxed flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>
              {lang === 'vi'
                ? 'Mẹo STEM: Đặt màn hình nằm ngang trong phòng tối, đặt kim tự tháp mica trong suốt vào giữa để trải nghiệm hiệu ứng 3D trực quan như trong phòng thí nghiệm!'
                : 'STEM Tip: Lay your screen flat in a dimmed room, place your clear trapezoid pyramid atop the center crosshair to view spatial 3D visuals!'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
