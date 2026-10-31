import React, { useState } from 'react';
import { Download, Copy, Check, Code, X } from 'lucide-react';
import { LESSONS, CHAPTERS } from '../data/lessonsData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  lang: 'vi' | 'en';
}

export const SingleHtmlExporter: React.FC<Props> = ({ isOpen, onClose, lang }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Generate pure, standalone, zero-dependency HTML with embedded CSS and Vanilla JS
  const generateStandaloneHtml = () => {
    return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TEEN YÊU BIỂN ĐẢO 4.0 - Học Tập Trực Tuyến</title>
  <style>
    :root {
      --primary: #0056D2;
      --primary-hover: #00419e;
      --bg-page: #f8fafc;
      --surface: #ffffff;
      --border: #e2e8f0;
      --text-main: #0f172a;
      --text-muted: #64748b;
      --success: #059669;
      --danger: #dc2626;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background-color: var(--bg-page);
      color: var(--text-main);
      display: flex;
      flex-direction: column;
      height: 100vh;
      overflow: hidden;
    }
    /* Top Bar */
    header {
      background: #ffffff;
      border-bottom: 1px solid var(--border);
      padding: 12px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      height: 64px;
      flex-shrink: 0;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--primary);
      text-decoration: none;
      white-space: nowrap;
    }
    .search-box {
      flex: 1;
      max-width: 480px;
      position: relative;
    }
    .search-box input {
      width: 100%;
      padding: 8px 14px;
      border: 1px solid var(--border);
      border-radius: 6px;
      font-size: 14px;
      outline: none;
    }
    .search-box input:focus { border-color: var(--primary); }
    .filters {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .filter-btn {
      padding: 6px 12px;
      font-size: 13px;
      border: 1px solid var(--border);
      background: white;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      color: var(--text-muted);
    }
    .filter-btn.active {
      background: var(--primary);
      color: white;
      border-color: var(--primary);
    }
    .lang-toggle {
      padding: 6px 12px;
      border: 1px solid var(--border);
      background: #f1f5f9;
      border-radius: 6px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 600;
      color: var(--primary);
    }
    /* App Layout */
    .app-container {
      display: flex;
      flex: 1;
      overflow: hidden;
    }
    /* Sidebar */
    .sidebar {
      width: 340px;
      background: #ffffff;
      border-right: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      overflow-y: auto;
    }
    .chapter-header {
      padding: 12px 16px;
      background: #f8fafc;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--text-muted);
      border-bottom: 1px solid var(--border);
      border-top: 1px solid var(--border);
    }
    .lesson-item {
      padding: 14px 16px;
      border-bottom: 1px solid #f1f5f9;
      cursor: pointer;
      transition: all 0.15s ease;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .lesson-item:hover { background: #f8fafc; }
    .lesson-item.active {
      background: #eff6ff;
      border-left: 4px solid var(--primary);
    }
    .lesson-item-title {
      font-size: 14px;
      font-weight: 600;
      color: var(--text-main);
      line-height: 1.4;
    }
    .lesson-item-meta {
      font-size: 12px;
      color: var(--text-muted);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    /* Main Content */
    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      background: var(--bg-page);
    }
    .video-viewport {
      background: #000;
      position: relative;
      width: 100%;
      padding-top: 56.25%; /* 16:9 ratio */
    }
    .video-viewport iframe {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      border: none;
    }
    .content-body {
      max-width: 980px;
      margin: 0 auto;
      padding: 24px;
      width: 100%;
    }
    .lesson-header {
      margin-bottom: 20px;
    }
    .lesson-header h1 {
      font-size: 1.6rem;
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 8px;
    }
    .tags {
      display: flex;
      gap: 8px;
      font-size: 12px;
      color: var(--text-muted);
      align-items: center;
    }
    /* Tabs */
    .tab-bar {
      display: flex;
      border-bottom: 2px solid var(--border);
      margin-bottom: 20px;
      gap: 24px;
    }
    .tab-btn {
      padding: 10px 4px;
      background: none;
      border: none;
      font-size: 15px;
      font-weight: 600;
      color: var(--text-muted);
      cursor: pointer;
      position: relative;
    }
    .tab-btn.active {
      color: var(--primary);
    }
    .tab-btn.active::after {
      content: "";
      position: absolute;
      bottom: -2px; left: 0; right: 0;
      height: 2px;
      background: var(--primary);
    }
    /* Summary Card */
    .summary-card {
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 20px;
      line-height: 1.6;
    }
    .summary-lead {
      font-size: 15px;
      font-weight: 500;
      margin-bottom: 16px;
      color: #334155;
    }
    .key-points {
      list-style-type: disc;
      padding-left: 20px;
      margin-bottom: 20px;
      color: #475569;
    }
    .key-points li { margin-bottom: 8px; }
    /* Quiz */
    .quiz-question {
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 16px;
    }
    .quiz-title {
      font-size: 15px;
      font-weight: 600;
      margin-bottom: 12px;
    }
    .quiz-option {
      padding: 10px 14px;
      border: 1px solid var(--border);
      border-radius: 6px;
      margin-bottom: 8px;
      cursor: pointer;
      transition: all 0.15s ease;
      font-size: 14px;
    }
    .quiz-option:hover { background: #f8fafc; border-color: #cbd5e1; }
    .quiz-option.correct {
      background: #ecfdf5;
      border-color: var(--success);
      color: #065f46;
      font-weight: 600;
    }
    .quiz-option.wrong {
      background: #fef2f2;
      border-color: var(--danger);
      color: #991b1b;
    }
    .explanation {
      margin-top: 10px;
      padding: 10px;
      background: #f1f5f9;
      border-radius: 6px;
      font-size: 13px;
      color: #334155;
      display: none;
    }
    .explanation.show { display: block; }
  </style>
</head>
<body>

  <!-- Top Bar -->
  <header>
    <a href="#" class="brand">
      ⚓ TEEN YÊU BIỂN ĐẢO 4.0
    </a>
    <div class="search-box">
      <input type="text" id="searchInput" placeholder="Tìm kiếm bài giảng, chủ quyền, dòng hải lưu..." oninput="filterLessons()">
    </div>
    <div class="filters">
      <button class="filter-btn active" onclick="setGradeFilter('all', this)">Tất cả</button>
      <button class="filter-btn" onclick="setGradeFilter('6', this)">Lớp 6</button>
      <button class="filter-btn" onclick="setGradeFilter('7', this)">Lớp 7</button>
      <button class="filter-btn" onclick="setGradeFilter('8', this)">Lớp 8</button>
      <button class="filter-btn" onclick="setGradeFilter('9', this)">Lớp 9</button>
    </div>
    <button class="lang-toggle" onclick="toggleLanguage()">VI | EN</button>
  </header>

  <!-- Two-column Body -->
  <div class="app-container">
    <!-- Sidebar -->
    <aside class="sidebar" id="lessonList">
      <!-- Chapters and Lessons injected dynamically -->
    </aside>

    <!-- Main Content Stage -->
    <main class="main-content">
      <div class="video-viewport">
        <iframe id="videoPlayer" src="https://www.youtube.com/embed/P7jz8IYJaP8" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>

      <div class="content-body">
        <div class="lesson-header">
          <h1 id="lessonTitle">Bài 1: Kỷ niệm 10 năm Teen yêu biển đảo</h1>
          <div class="tags">
            <span id="lessonSubject">Lịch sử & Hoạt động Trải nghiệm</span>
            <span>·</span>
            <span id="lessonGrade">Khối 8</span>
            <span>·</span>
            <span id="lessonChannel">@TEENYEUBIENDAO</span>
          </div>
        </div>

        <div class="tab-bar">
          <button class="tab-btn active" onclick="switchTab('summary', this)">Tóm tắt cốt lõi</button>
          <button class="tab-btn" onclick="switchTab('quiz', this)">Bài tập củng cố (Quiz)</button>
        </div>

        <div id="tabSummary" class="tab-pane">
          <div class="summary-card">
            <p class="summary-lead" id="summaryLead"></p>
            <h4 style="margin-bottom: 8px; font-size: 14px; font-weight: 600;">Nội dung trọng tâm:</h4>
            <ul class="key-points" id="summaryPoints"></ul>
            <div id="maritimeTermsBox" style="margin-top: 16px; padding: 12px; background: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0;">
              <h5 style="font-size: 13px; font-weight: 700; color: #0056D2; margin-bottom: 6px;">Thuật ngữ hải dương & chủ quyền:</h5>
              <div id="termsList" style="font-size: 13px; color: #475569;"></div>
            </div>
          </div>
        </div>

        <div id="tabQuiz" class="tab-pane" style="display: none;">
          <div id="quizContainer">
            <!-- Quiz questions generated here -->
          </div>
        </div>
      </div>
    </main>
  </div>

  <script>
    const CHAPTERS = ${JSON.stringify(CHAPTERS)};
    const LESSONS = ${JSON.stringify(LESSONS)};

    let currentLang = 'vi';
    let currentGrade = 'all';
    let currentLessonId = 'lesson-1';
    let searchQuery = '';

    function init() {
      renderSidebar();
      loadLesson(currentLessonId);
    }

    function toggleLanguage() {
      currentLang = currentLang === 'vi' ? 'en' : 'vi';
      renderSidebar();
      loadLesson(currentLessonId);
    }

    function setGradeFilter(grade, btn) {
      currentGrade = grade;
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderSidebar();
    }

    function filterLessons() {
      searchQuery = document.getElementById('searchInput').value.toLowerCase();
      renderSidebar();
    }

    function renderSidebar() {
      const container = document.getElementById('lessonList');
      container.innerHTML = '';

      CHAPTERS.forEach(ch => {
        const filteredLessonList = LESSONS.filter(l => 
          ch.lessonIds.includes(l.id) &&
          (currentGrade === 'all' || l.grade === currentGrade || l.grade === 'all') &&
          ((l.titleVi + l.titleEn + l.summaryVi.lead).toLowerCase().includes(searchQuery))
        );

        if (filteredLessonList.length === 0) return;

        const chHeader = document.createElement('div');
        chHeader.className = 'chapter-header';
        chHeader.textContent = currentLang === 'vi' ? ch.titleVi : ch.titleEn;
        container.appendChild(chHeader);

        filteredLessonList.forEach(les => {
          const item = document.createElement('div');
          item.className = 'lesson-item' + (les.id === currentLessonId ? ' active' : '');
          item.onclick = () => loadLesson(les.id);
          
          item.innerHTML = \`
            <div class="lesson-item-title">\${currentLang === 'vi' ? les.titleVi : les.titleEn}</div>
            <div class="lesson-item-meta">
              <span>\${les.duration}</span>
              <span>·</span>
              <span>\${currentLang === 'vi' ? 'Lớp ' + les.grade : 'Grade ' + les.grade}</span>
            </div>
          \`;
          container.appendChild(item);
        });
      });
    }

    function loadLesson(id) {
      currentLessonId = id;
      const lesson = LESSONS.find(l => l.id === id);
      if (!lesson) return;

      document.querySelectorAll('.lesson-item').forEach(el => el.classList.remove('active'));
      renderSidebar();

      document.getElementById('videoPlayer').src = "https://www.youtube.com/embed/" + lesson.videoId;
      document.getElementById('lessonTitle').textContent = currentLang === 'vi' ? lesson.titleVi : lesson.titleEn;
      document.getElementById('lessonSubject').textContent = currentLang === 'vi' ? lesson.subjectVi : lesson.subjectEn;
      document.getElementById('lessonGrade').textContent = currentLang === 'vi' ? 'Khối ' + lesson.grade : 'Grade ' + lesson.grade;

      const summary = currentLang === 'vi' ? lesson.summaryVi : lesson.summaryEn;
      document.getElementById('summaryLead').textContent = summary.lead;
      
      const pointsList = document.getElementById('summaryPoints');
      pointsList.innerHTML = summary.keyPoints.map(p => \`<li>\${p}</li>\`).join('');

      const termsList = document.getElementById('termsList');
      termsList.innerHTML = summary.maritimeTerms.map(t => \`<p><strong>\${t.term}:</strong> \${t.definition}</p>\`).join('');

      renderQuiz(lesson);
    }

    function switchTab(tabName, btn) {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      document.getElementById('tabSummary').style.display = tabName === 'summary' ? 'block' : 'none';
      document.getElementById('tabQuiz').style.display = tabName === 'quiz' ? 'block' : 'none';
    }

    function renderQuiz(lesson) {
      const container = document.getElementById('quizContainer');
      container.innerHTML = '';

      lesson.quiz.forEach((q, idx) => {
        const qCard = document.createElement('div');
        qCard.className = 'quiz-question';

        const qTitle = document.createElement('div');
        qTitle.className = 'quiz-title';
        qTitle.textContent = (idx + 1) + '. ' + (currentLang === 'vi' ? q.questionVi : q.questionEn);
        qCard.appendChild(qTitle);

        const options = currentLang === 'vi' ? q.optionsVi : q.optionsEn;
        const explanationText = currentLang === 'vi' ? q.explanationVi : q.explanationEn;

        const expBox = document.createElement('div');
        expBox.className = 'explanation';
        expBox.innerHTML = '<strong>Giải thích:</strong> ' + explanationText;

        options.forEach((opt, optIdx) => {
          const optDiv = document.createElement('div');
          optDiv.className = 'quiz-option';
          optDiv.textContent = opt;
          optDiv.onclick = () => {
            if (optIdx === q.correctIndex) {
              optDiv.classList.add('correct');
            } else {
              optDiv.classList.add('wrong');
            }
            expBox.classList.add('show');
          };
          qCard.appendChild(optDiv);
        });

        qCard.appendChild(expBox);
        container.appendChild(qCard);
      });
    }

    window.onload = init;
  </script>
</body>
</html>`;
  };

  const downloadFile = () => {
    const content = generateStandaloneHtml();
    const blob = new Blob([content], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'teen_yeu_bien_dao_4.0_standalone.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateStandaloneHtml());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-900">
            <Code className="w-5 h-5 text-[#0056D2]" />
            <h3 className="font-bold text-base">
              {lang === 'vi' ? 'Xuất File Web App Single-Page (HTML/CSS/JS thuần)' : 'Export Standalone Single HTML File'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-4 text-slate-700 text-sm">
          <p className="leading-relaxed">
            {lang === 'vi'
              ? 'Tệp mã nguồn này gói trọn toàn bộ cấu trúc HTML5, CSS Flexbox/Grid responsive phong cách Coursera và Javascript thuần (Vanilla JS) trong đúng 1 file index.html duy nhất. Bạn có thể mở trực tiếp bằng bất kỳ trình duyệt nào trên máy tính hoặc điện thoại mà không cần máy chủ hoặc kết nối mạng đặc biệt.'
              : 'This standalone bundle packages complete HTML5, Coursera-style CSS responsive layout, and vanilla JavaScript into a single zero-dependency index.html file. It can be opened directly in any browser offline.'}
          </p>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs font-mono text-slate-600 space-y-1">
            <div>✓ Single File: HTML5 + CSS + Vanilla JS</div>
            <div>✓ Không cần thư viện ngoài hay cài đặt npm</div>
            <div>✓ Tích hợp đầy đủ các bài giảng kênh @TEENYEUBIENDAO (P7jz8IYJaP8, qbWH1rn6oHE, Vl9K5xEONN8, zunqfsa8LVE, 6J8GSqP_-Kw, 7tly8LmHiNg)</div>
            <div>✓ Tự động cập nhật Video & Trắc nghiệm khi bấm chọn ở Sidebar</div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            onClick={copyToClipboard}
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            {copied ? (lang === 'vi' ? 'Đã sao chép!' : 'Copied!') : (lang === 'vi' ? 'Sao chép mã HTML' : 'Copy HTML Code')}
          </button>

          <button
            onClick={downloadFile}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0056D2] hover:bg-[#00419e] text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
          >
            <Download className="w-4 h-4" />
            {lang === 'vi' ? 'Tải tệp index.html ngay' : 'Download index.html Now'}
          </button>
        </div>
      </div>
    </div>
  );
};
