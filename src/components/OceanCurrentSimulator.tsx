import React, { useState } from 'react';
import { Compass, Wind, Droplets, Info, Navigation } from 'lucide-react';

interface Props {
  lang: 'vi' | 'en';
}

export const OceanCurrentSimulator: React.FC<Props> = ({ lang }) => {
  const [season, setSeason] = useState<'northeast' | 'southwest'>('northeast');
  const [windSpeed, setWindSpeed] = useState<number>(32);
  const [showUpwelling, setShowUpwelling] = useState<boolean>(true);
  const [selectedStation, setSelectedStation] = useState<string>('ninhthuan');

  // Stations data along the Vietnam coastline and islands
  const stations = {
    bachlongvy: {
      nameVi: 'Trạm Bạch Long Vĩ (Vịnh Bắc Bộ)',
      nameEn: 'Bach Long Vy Island (Gulf of Tonkin)',
      lat: '20°08\'N',
      lng: '107°43\'E',
      salinity: '31.8 ‰',
      tempWinter: '19.5 °C',
      tempSummer: '29.2 °C',
      currentDirectionWinter: 'Tây Nam (SW)',
      currentDirectionSummer: 'Đông Bắc (NE)',
    },
    hoangsa: {
      nameVi: 'Trạm Quần đảo Hoàng Sa',
      nameEn: 'Paracel Islands Station',
      lat: '16°30\'N',
      lng: '112°00\'E',
      salinity: '33.9 ‰',
      tempWinter: '24.2 °C',
      tempSummer: '29.8 °C',
      currentDirectionWinter: 'Nam - Tây Nam (SSW)',
      currentDirectionSummer: 'Bắc - Đông Bắc (NNE)',
    },
    ninhthuan: {
      nameVi: 'Trạm Vùng Nước Trồi (Ninh Thuận - Bình Thuận)',
      nameEn: 'Coastal Upwelling Zone (Ninh Thuan)',
      lat: '11°34\'N',
      lng: '109°02\'E',
      salinity: '34.5 ‰',
      tempWinter: '25.8 °C',
      tempSummer: '23.4 °C (Nước trồi lạnh)',
      currentDirectionWinter: 'Tây Nam mạnh (SW)',
      currentDirectionSummer: 'Xoáy trồi tầng sâu (Upwelling Vortex)',
    },
    truongsa: {
      nameVi: 'Trạm Quần đảo Trường Sa',
      nameEn: 'Spratly Islands Station',
      lat: '08°38\'N',
      lng: '111°55\'E',
      salinity: '34.2 ‰',
      tempWinter: '26.9 °C',
      tempSummer: '30.1 °C',
      currentDirectionWinter: 'Tây Nam (SW)',
      currentDirectionSummer: 'Đông Bắc (NE)',
    },
  };

  const currentStation = stations[selectedStation as keyof typeof stations];
  const currentSpeed = ((windSpeed * 0.035) * (season === 'northeast' ? 1.2 : 0.9)).toFixed(2);

  return (
    <div className="bg-slate-900 rounded-xl p-5 text-white border border-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Compass className="w-4 h-4 text-sky-400" />
            {lang === 'vi' ? 'Mô Phỏng Thủy Triều & Dòng Hải Lưu Biển Đông' : 'East Sea Hydrodynamic & Monsoon Simulator'}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {lang === 'vi'
              ? 'Tương quan giữa hoàn lưu gió mùa và vận tốc dòng chảy tầng mặt ven bờ Việt Nam'
              : 'Correlation between seasonal monsoons and coastal surface current vectors'}
          </p>
        </div>

        {/* Season Selector */}
        <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg">
          <button
            onClick={() => setSeason('northeast')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              season === 'northeast' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Wind className="w-3.5 h-3.5 inline mr-1" />
            {lang === 'vi' ? 'Gió mùa Đông Bắc (Mùa Đông)' : 'Northeast Monsoon (Winter)'}
          </button>
          <button
            onClick={() => setSeason('southwest')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              season === 'southwest' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Wind className="w-3.5 h-3.5 inline mr-1" />
            {lang === 'vi' ? 'Gió mùa Tây Nam (Mùa Hè)' : 'Southwest Monsoon (Summer)'}
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Interactive Map Canvas (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950 rounded-lg border border-slate-800 p-3 relative overflow-hidden flex flex-col items-center">
          <div className="w-full flex justify-between text-xs text-slate-400 px-2 pb-2 border-b border-slate-800">
            <span className="font-mono text-sky-300">Biển Đông (East Sea) - Tọa độ 6°N - 22°N</span>
            <span className="flex items-center gap-1 text-[11px] text-emerald-400">
              <Navigation className="w-3 h-3 text-red-500 transform -rotate-45" /> BẮC (N)
            </span>
          </div>

          {/* SVG Map of Vietnam Coastline with Ocean Currents */}
          <div className="relative w-full aspect-[4/3] max-h-[340px] flex items-center justify-center">
            <svg viewBox="0 0 400 360" className="w-full h-full">
              <defs>
                <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#082f49" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
                <marker id="arrowHead" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill={season === 'northeast' ? '#38bdf8' : '#34d399'} />
                </marker>
                <marker id="upwellHead" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto">
                  <path d="M0,0 L5,2.5 L0,5 Z" fill="#f59e0b" />
                </marker>
              </defs>

              <rect width="400" height="360" fill="url(#oceanGrad)" rx="6" />

              {/* Grid lines */}
              <line x1="50" y1="90" x2="380" y2="90" stroke="#1e293b" strokeDasharray="3 3" />
              <line x1="50" y1="180" x2="380" y2="180" stroke="#1e293b" strokeDasharray="3 3" />
              <line x1="50" y1="270" x2="380" y2="270" stroke="#1e293b" strokeDasharray="3 3" />
              <text x="360" y="85" fill="#475569" fontSize="9" fontFamily="monospace">20°N</text>
              <text x="360" y="175" fill="#475569" fontSize="9" fontFamily="monospace">15°N</text>
              <text x="360" y="265" fill="#475569" fontSize="9" fontFamily="monospace">10°N</text>

              {/* Vietnam S-Shape Coastline outline */}
              <path
                d="M 60,30 
                   Q 80,45 110,40 
                   Q 125,50 115,75 
                   Q 100,105 125,125 
                   Q 145,145 155,175 
                   Q 165,210 160,250 
                   Q 150,280 130,295 
                   Q 110,310 95,295 
                   L 80,310 L 50,310 Z"
                fill="#1e3a5f"
                stroke="#38bdf8"
                strokeWidth="1.5"
                opacity="0.9"
              />
              <text x="75" y="130" fill="#93c5fd" fontSize="11" fontWeight="bold">VIỆT NAM</text>

              {/* Islands: Hoang Sa */}
              <g transform="translate(240, 130)">
                <circle cx="0" cy="0" r="10" fill="#0369a1" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
                <circle cx="-3" cy="-2" r="2.5" fill="#fbbf24" />
                <circle cx="3" cy="2" r="2" fill="#fbbf24" />
                <text x="14" y="3" fill="#fde047" fontSize="10" fontWeight="bold">Quần đảo Hoàng Sa</text>
                <text x="14" y="14" fill="#94a3b8" fontSize="8">(Việt Nam)</text>
              </g>

              {/* Islands: Truong Sa */}
              <g transform="translate(230, 260)">
                <circle cx="0" cy="0" r="14" fill="#0369a1" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
                <circle cx="-4" cy="-4" r="2.5" fill="#fbbf24" />
                <circle cx="4" cy="3" r="2" fill="#fbbf24" />
                <circle cx="-2" cy="5" r="2" fill="#fbbf24" />
                <text x="16" y="3" fill="#fde047" fontSize="10" fontWeight="bold">Quần đảo Trường Sa</text>
                <text x="16" y="14" fill="#94a3b8" fontSize="8">(Việt Nam)</text>
              </g>

              {/* Ocean Current Vectors based on season */}
              {season === 'northeast' ? (
                /* Winter: Northeast to Southwest currents */
                <g stroke="#38bdf8" strokeWidth="2" fill="none">
                  {/* Outer offshore flow */}
                  <path d="M 330,60 Q 280,110 240,180 T 200,310" markerEnd="url(#arrowHead)" strokeDasharray="6 3" />
                  <path d="M 280,40 Q 230,100 200,170 T 170,290" markerEnd="url(#arrowHead)" strokeDasharray="6 3" />
                  {/* Strong Coastal Current */}
                  <path d="M 130,85 Q 120,135 155,185 T 165,275" markerEnd="url(#arrowHead)" strokeWidth="3" />
                  <path d="M 145,100 Q 140,150 170,205 T 178,285" markerEnd="url(#arrowHead)" strokeWidth="2.5" />
                  {/* Text indicator */}
                  <text x="210" y="45" fill="#38bdf8" fontSize="10" fontWeight="bold">
                    Dòng chảy mùa Đông (Đông Bắc → Tây Nam)
                  </text>
                </g>
              ) : (
                /* Summer: Southwest to Northeast currents */
                <g stroke="#34d399" strokeWidth="2" fill="none">
                  {/* Offshore northward flow */}
                  <path d="M 190,320 Q 230,240 270,160 T 320,80" markerEnd="url(#arrowHead)" strokeDasharray="6 3" />
                  <path d="M 160,290 Q 200,210 230,140 T 280,60" markerEnd="url(#arrowHead)" strokeDasharray="6 3" />
                  {/* Coastal northward flow */}
                  <path d="M 160,265 Q 165,200 135,145 T 120,90" markerEnd="url(#arrowHead)" strokeWidth="3" />
                  {/* Text indicator */}
                  <text x="180" y="340" fill="#34d399" fontSize="10" fontWeight="bold">
                    Dòng chảy mùa Hè (Tây Nam → Đông Bắc)
                  </text>
                </g>
              )}

              {/* Upwelling indicator off Ninh Thuan/Binh Thuan */}
              {showUpwelling && (
                <g transform="translate(162, 230)">
                  <circle cx="0" cy="0" r="16" fill="#f59e0b" fillOpacity="0.25" stroke="#f59e0b" strokeWidth="1.5" />
                  <path d="M-6,8 L-6,-8 M0,8 L0,-8 M6,8 L6,-8" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#upwellHead)" />
                  <text x="20" y="4" fill="#fbbf24" fontSize="9" fontWeight="bold">Vùng Nước Trồi (Upwelling)</text>
                </g>
              )}

              {/* Station Markers */}
              <circle
                cx="115"
                cy="65"
                r="4.5"
                className="cursor-pointer hover:stroke-white stroke-2"
                fill={selectedStation === 'bachlongvy' ? '#ef4444' : '#38bdf8'}
                onClick={() => setSelectedStation('bachlongvy')}
              />
              <circle
                cx="240"
                cy="130"
                r="4.5"
                className="cursor-pointer hover:stroke-white stroke-2"
                fill={selectedStation === 'hoangsa' ? '#ef4444' : '#38bdf8'}
                onClick={() => setSelectedStation('hoangsa')}
              />
              <circle
                cx="162"
                cy="230"
                r="4.5"
                className="cursor-pointer hover:stroke-white stroke-2"
                fill={selectedStation === 'ninhthuan' ? '#ef4444' : '#38bdf8'}
                onClick={() => setSelectedStation('ninhthuan')}
              />
              <circle
                cx="230"
                cy="260"
                r="4.5"
                className="cursor-pointer hover:stroke-white stroke-2"
                fill={selectedStation === 'truongsa' ? '#ef4444' : '#38bdf8'}
                onClick={() => setSelectedStation('truongsa')}
              />
            </svg>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {lang === 'vi'
              ? 'Bấm vào các điểm đỏ/xanh trên bản đồ để xem trạm đo quan trắc khí tượng hải văn'
              : 'Click circles on map to inspect specific maritime oceanographic stations'}
          </p>
        </div>

        {/* Telemetry & Controls Deck (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4 bg-slate-800/60 p-4 rounded-lg border border-slate-800 text-xs">
          {/* Station Card */}
          <div className="bg-slate-900 p-3 rounded border border-slate-700/80">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="font-semibold text-sky-300">
                {lang === 'vi' ? currentStation.nameVi : currentStation.nameEn}
              </span>
              <span className="text-[10px] font-mono text-slate-400">{currentStation.lat}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2.5 text-[11px]">
              <div>
                <span className="text-slate-400 block">{lang === 'vi' ? 'Độ muối tầng mặt:' : 'Salinity:'}</span>
                <span className="font-mono text-white font-medium">{currentStation.salinity}</span>
              </div>
              <div>
                <span className="text-slate-400 block">
                  {lang === 'vi' ? 'Nhiệt độ nước biển:' : 'Water Temp:'}
                </span>
                <span className="font-mono text-amber-300 font-medium">
                  {season === 'northeast' ? currentStation.tempWinter : currentStation.tempSummer}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 block">
                  {lang === 'vi' ? 'Hướng dòng hải lưu chính:' : 'Current Direction:'}
                </span>
                <span className="text-sky-300 font-medium">
                  {season === 'northeast' ? currentStation.currentDirectionWinter : currentStation.currentDirectionSummer}
                </span>
              </div>
            </div>
          </div>

          {/* Wind Speed Controller Slider */}
          <div>
            <div className="flex justify-between items-center text-slate-300 mb-1">
              <span>{lang === 'vi' ? 'Vận tốc gió mùa mô phỏng' : 'Monsoon Wind Velocity'}</span>
              <span className="font-mono text-sky-400 font-semibold">{windSpeed} km/h</span>
            </div>
            <input
              type="range"
              min="10"
              max="65"
              step="1"
              value={windSpeed}
              onChange={(e) => setWindSpeed(parseInt(e.target.value))}
              className="w-full accent-sky-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
              <span>Cấp 3 (Nhẹ)</span>
              <span>Cấp 5 (Trung bình)</span>
              <span>Cấp 8 (Mạnh)</span>
            </div>
          </div>

          {/* Calculated Current Velocity */}
          <div className="bg-sky-950/40 border border-sky-800/60 p-2.5 rounded">
            <div className="flex items-center justify-between">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-sky-400" />
                {lang === 'vi' ? 'Vận tốc dòng chảy tính toán:' : 'Calculated Current Velocity:'}
              </span>
              <span className="font-mono text-sky-300 font-bold text-sm">
                {currentSpeed} m/s (~{(parseFloat(currentSpeed) * 1.944).toFixed(1)} hải lý/h)
              </span>
            </div>
          </div>

          {/* Toggle Upwelling */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-slate-300">
              {lang === 'vi' ? 'Hiển thị vùng Nước Trồi (Upwelling)' : 'Display Upwelling Zone'}
            </span>
            <button
              onClick={() => setShowUpwelling(!showUpwelling)}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                showUpwelling ? 'bg-amber-600 text-white' : 'bg-slate-700 text-slate-400'
              }`}
            >
              {showUpwelling ? (lang === 'vi' ? 'Bật' : 'ON') : (lang === 'vi' ? 'Tắt' : 'OFF')}
            </button>
          </div>

          <div className="p-2.5 bg-slate-900/80 rounded border border-slate-800 text-[11px] text-slate-300 leading-relaxed flex items-start gap-2">
            <Info className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
            <span>
              {lang === 'vi'
                ? 'Kiến thức cốt lõi: Gió mùa Đông Bắc thổi mạnh từ tháng 11 đến tháng 4 năm sau tạo nên dòng chảy ven bờ xiết về phía Nam, giúp tàu bè xuôi dòng nhanh hơn.'
                : 'Core Principle: The Northeast monsoon drives vigorous southward surface currents along Central Vietnam from November to April.'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
