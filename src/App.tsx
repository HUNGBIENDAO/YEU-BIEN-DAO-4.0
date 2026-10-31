/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import {
  Compass,
  Search,
  BookOpen,
  CheckCircle2,
  Circle,
  Play,
  RotateCcw,
  Sparkles,
  Award,
  ChevronRight,
  ChevronLeft,
  FileText,
  Layers,
  Menu,
  X,
  Languages,
  Download,
  Share2,
  ExternalLink,
  Flame,
  Check,
} from 'lucide-react';
import { LESSONS, CHAPTERS, Lesson } from './data/lessonsData';
import { HologramSimulator } from './components/HologramSimulator';
import { OceanCurrentSimulator } from './components/OceanCurrentSimulator';
import { SingleHtmlExporter } from './components/SingleHtmlExporter';
import heroImage from './assets/images/hero_teen_bien_dao_1793264207314.jpg';

export default function App() {
  // State management
  const [selectedLessonId, setSelectedLessonId] = useState<string>('lesson-1');
  const [activeTab, setActiveTab] = useState<'summary' | 'quiz' | 'stem' | 'notes'>('summary');
  const [lang, setLang] = useState<'vi' | 'en'>('vi');
  const [selectedGrade, setSelectedGrade] = useState<'all' | '6' | '7' | '8' | '9'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [showShareToast, setShowShareToast] = useState<boolean>(false);

  // User Quiz State per lesson: { [lessonId]: { [questionId]: selectedOptionIndex } }
  const [userAnswers, setUserAnswers] = useState<Record<string, Record<string, number>>>({});
  // Quiz submission state per lesson: { [lessonId]: boolean }
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});

  // Completed Lessons set: string[]
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('teen_completed_lessons');
      return saved ? JSON.parse(saved) : ['lesson-1'];
    } catch {
      return ['lesson-1'];
    }
  });

  // User Notes per lesson: { [lessonId]: string }
  const [notes, setNotes] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('teen_user_notes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Save completion state
  useEffect(() => {
    try {
      localStorage.setItem('teen_completed_lessons', JSON.stringify(completedLessons));
    } catch {}
  }, [completedLessons]);

  // Save notes
  useEffect(() => {
    try {
      localStorage.setItem('teen_user_notes', JSON.stringify(notes));
    } catch {}
  }, [notes]);

  // Current Lesson lookup
  const currentLesson: Lesson = useMemo(() => {
    return LESSONS.find((l) => l.id === selectedLessonId) || LESSONS[0];
  }, [selectedLessonId]);

  // Filtered chapters and lessons
  const filteredChapters = useMemo(() => {
    return CHAPTERS.map((ch) => {
      const lessons = LESSONS.filter((les) => {
        if (!ch.lessonIds.includes(les.id)) return false;
        if (selectedGrade !== 'all' && les.grade !== selectedGrade && les.grade !== 'all') {
          return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = (les.titleVi + ' ' + les.titleEn).toLowerCase().includes(q);
          const matchSub = (les.subjectVi + ' ' + les.subjectEn).toLowerCase().includes(q);
          const matchSum = (les.summaryVi.lead + ' ' + les.summaryEn.lead).toLowerCase().includes(q);
          return matchTitle || matchSub || matchSum;
        }
        return true;
      });
      return { ...ch, filteredLessons: lessons };
    }).filter((ch) => ch.filteredLessons.length > 0);
  }, [selectedGrade, searchQuery]);

  // Quiz calculations for current lesson
  const currentQuizAnswers = userAnswers[currentLesson.id] || {};
  const isCurrentQuizSubmitted = !!quizSubmitted[currentLesson.id];

  const quizScore = useMemo(() => {
    let correct = 0;
    currentLesson.quiz.forEach((q) => {
      if (currentQuizAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });
    return correct;
  }, [currentLesson, currentQuizAnswers]);

  const quizTotal = currentLesson.quiz.length;
  const isQuizPassed = quizTotal > 0 && quizScore / quizTotal >= 0.7;

  // Handler for selecting an answer
  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentLesson.id]: {
        ...(prev[currentLesson.id] || {}),
        [questionId]: optionIndex,
      },
    }));
  };

  const handleSubmitQuiz = () => {
    setQuizSubmitted((prev) => ({ ...prev, [currentLesson.id]: true }));
    // If passed, automatically mark lesson as completed
    if (quizScore / quizTotal >= 0.7 && !completedLessons.includes(currentLesson.id)) {
      setCompletedLessons((prev) => [...prev, currentLesson.id]);
    }
  };

  const handleResetQuiz = () => {
    setUserAnswers((prev) => {
      const next = { ...prev };
      delete next[currentLesson.id];
      return next;
    });
    setQuizSubmitted((prev) => {
      const next = { ...prev };
      delete next[currentLesson.id];
      return next;
    });
  };

  const toggleLessonCompleted = (lessonId: string) => {
    setCompletedLessons((prev) =>
      prev.includes(lessonId) ? prev.filter((id) => id !== lessonId) : [...prev, lessonId]
    );
  };

  // Next / Previous navigation
  const allLessonList = useMemo(() => LESSONS, []);
  const currentIndex = allLessonList.findIndex((l) => l.id === currentLesson.id);
  const prevLesson = currentIndex > 0 ? allLessonList[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessonList.length - 1 ? allLessonList[currentIndex + 1] : null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2500);
    }
  };

  const progressPercentage = Math.round((completedLessons.length / LESSONS.length) * 100);

  return (
    <div className="flex flex-col h-screen w-screen bg-[#F8FAFC] text-slate-800 overflow-hidden font-sans">
      {/* ---------------- 1. TOP NAVIGATION BAR (Coursera Minimalist Style) ---------------- */}
      <header className="h-16 bg-white border-b border-slate-200 px-4 lg:px-6 flex items-center justify-between gap-4 shrink-0 z-30 shadow-xs">
        {/* Brand & Mobile Sidebar Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg lg:hidden"
            title="Đóng / Mở danh mục bài học"
            aria-label="Toggle Navigation Sidebar"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <a
            href="/"
            className="flex items-center gap-2.5 text-slate-900 font-bold text-lg tracking-tight hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            <div className="w-8 h-8 rounded-lg bg-[#0056D2] text-white flex items-center justify-center font-black shadow-xs">
              <Compass className="w-5 h-5" />
            </div>
            <span className="text-[#0056D2] font-extrabold hidden sm:inline">TEEN YÊU BIỂN ĐẢO</span>
            <span className="text-slate-900 font-semibold hidden md:inline">4.0</span>
          </a>
        </div>

        {/* Lesson Search Input */}
        <div className="flex-1 max-w-md relative hidden sm:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              lang === 'vi'
                ? 'Tìm kiếm bài học, chủ quyền, dòng hải lưu, STEM...'
                : 'Search lessons, sovereignty, currents, STEM...'
            }
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:bg-white focus:border-[#0056D2] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
            >
              ×
            </button>
          )}
        </div>

        {/* Grade Filters & Controls (Clean Segmented Buttons) */}
        <div className="flex items-center gap-2">
          {/* Grade Selector */}
          <div className="hidden xl:flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200 text-xs">
            {(['all', '6', '7', '8', '9'] as const).map((grade) => (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className={`px-2.5 py-1 font-medium rounded-md transition-colors whitespace-nowrap ${
                  selectedGrade === grade
                    ? 'bg-white text-[#0056D2] font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {grade === 'all' ? (lang === 'vi' ? 'Tất cả khối' : 'All') : `${lang === 'vi' ? 'Lớp' : 'Grade'} ${grade}`}
              </button>
            ))}
          </div>

          {/* Bilingual Language Switcher */}
          <button
            onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            title="Chuyển đổi ngôn ngữ Tiếng Việt / English"
          >
            <Languages className="w-3.5 h-3.5 text-[#0056D2]" />
            <span>{lang === 'vi' ? 'VI' : 'EN'}</span>
          </button>

          {/* Standalone Single File HTML Export Button */}
          <button
            onClick={() => setShowExportModal(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0056D2] hover:bg-[#00419e] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
            title="Tải xuống tệp HTML/CSS/JS thuần độc lập"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden md:inline">
              {lang === 'vi' ? 'Tải file index.html thuần' : 'Get Single HTML'}
            </span>
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors relative"
            title="Sao chép liên kết bài học"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Share Toast Notification */}
      {showShareToast && (
        <div className="fixed top-18 right-6 z-50 bg-slate-900 text-white text-xs px-3.5 py-2 rounded-lg shadow-lg flex items-center gap-2 border border-slate-700">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>{lang === 'vi' ? 'Đã sao chép liên kết vào bộ nhớ tạm!' : 'Link copied to clipboard!'}</span>
        </div>
      )}

      {/* ---------------- 2. MAIN TWO-COLUMN BODY LAYOUT ---------------- */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* ================= LEFT SIDEBAR (Chapters & Lesson Navigation) ================= */}
        <aside
          className={`w-80 md:w-96 bg-white border-r border-slate-200 flex flex-col shrink-0 z-20 transition-all duration-200 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-0 lg:overflow-hidden lg:border-none'
          } absolute lg:relative inset-y-0 left-0 shadow-lg lg:shadow-none`}
        >
          {/* Course Progress Header Bar */}
          <div className="p-4 border-b border-slate-200 bg-slate-50/70">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#0056D2]" />
                {lang === 'vi' ? 'Tiến độ học tập khóa học' : 'Course Completion Progress'}
              </span>
              <span className="text-[#0056D2] font-mono font-bold">
                {completedLessons.length}/{LESSONS.length} ({progressPercentage}%)
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0056D2] transition-all duration-300 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Chapters & Lessons Scroll Container */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredChapters.map((chapter, chIdx) => (
              <div key={chapter.id} className="py-2">
                {/* Chapter Banner */}
                <div className="px-4 py-2 bg-slate-100/70 border-y border-slate-200/60">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0056D2] block">
                    {lang === 'vi' ? `Chương ${chIdx + 1}` : `Module ${chIdx + 1}`}
                  </span>
                  <h4 className="text-xs font-bold text-slate-800 leading-tight">
                    {lang === 'vi' ? chapter.titleVi : chapter.titleEn}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    {lang === 'vi' ? chapter.descriptionVi : chapter.descriptionEn}
                  </p>
                </div>

                {/* Chapter Lessons */}
                <div className="py-1">
                  {chapter.filteredLessons.map((lesson) => {
                    const isSelected = lesson.id === selectedLessonId;
                    const isCompleted = completedLessons.includes(lesson.id);

                    return (
                      <div
                        key={lesson.id}
                        onClick={() => {
                          setSelectedLessonId(lesson.id);
                          if (window.innerWidth < 1024) {
                            setSidebarOpen(false);
                          }
                        }}
                        className={`group px-4 py-3 flex items-start gap-3 cursor-pointer transition-colors border-l-4 ${
                          isSelected
                            ? 'bg-[#eff6ff] border-[#0056D2]'
                            : 'border-transparent hover:bg-slate-50 hover:border-slate-300'
                        }`}
                      >
                        {/* Completion Checkbox Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLessonCompleted(lesson.id);
                          }}
                          className="mt-0.5 text-slate-400 hover:text-[#0056D2] transition-colors shrink-0"
                          title={isCompleted ? 'Đánh dấu chưa hoàn thành' : 'Đánh dấu đã hoàn thành'}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                          ) : (
                            <Circle className="w-4 h-4" />
                          )}
                        </button>

                        {/* Title & Metadata */}
                        <div className="flex-1 min-w-0">
                          <h5
                            className={`text-xs font-semibold leading-snug line-clamp-2 ${
                              isSelected ? 'text-[#0056D2]' : 'text-slate-800 group-hover:text-slate-900'
                            }`}
                          >
                            {lang === 'vi' ? lesson.titleVi : lesson.titleEn}
                          </h5>

                          {/* Unboxed Metadata Discipline */}
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-1 font-mono">
                            <span>{lesson.duration}</span>
                            <span aria-hidden="true">·</span>
                            <span>{lang === 'vi' ? `Lớp ${lesson.grade}` : `Gr ${lesson.grade}`}</span>
                            <span aria-hidden="true">·</span>
                            <span className="truncate">{lang === 'vi' ? lesson.subjectVi : lesson.subjectEn}</span>
                          </div>
                        </div>

                        {isSelected && <Play className="w-3.5 h-3.5 text-[#0056D2] shrink-0 mt-1 fill-current" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {filteredChapters.length === 0 && (
              <div className="p-8 text-center text-slate-500 text-xs">
                {lang === 'vi'
                  ? 'Không tìm thấy bài học phù hợp với bộ lọc hoặc từ khóa tìm kiếm.'
                  : 'No lessons found matching the selected grade or search term.'}
              </div>
            )}
          </div>

          {/* Quick Footer inside Sidebar */}
          <div className="p-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
            <span className="truncate">Kênh YouTube: @TEENYEUBIENDAO</span>
            <span className="font-semibold text-slate-700">v4.0</span>
          </div>
        </aside>

        {/* ================= RIGHT MAIN CONTENT PANE (Video + Tabs + Tools) ================= */}
        <main className="flex-1 flex flex-col overflow-y-auto bg-[#F8FAFC]">
          {/* 1. YouTube Player Section (16:9 Aspect Ratio) */}
          <div className="w-full bg-slate-950 flex justify-center border-b border-slate-800">
            <div className="w-full max-w-5xl aspect-video relative shadow-2xl">
              <iframe
                key={currentLesson.videoId}
                src={`https://www.youtube.com/embed/${currentLesson.videoId}?rel=0&modestbranding=1`}
                title={lang === 'vi' ? currentLesson.titleVi : currentLesson.titleEn}
                className="w-full h-full border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>

          {/* 2. Lesson Title, Navigation Controls & Badges */}
          <div className="bg-white border-b border-slate-200 px-6 py-4 shadow-xs">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                {/* Unboxed breadcrumb metadata */}
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                  <span>
                    {lang === 'vi' ? 'Teen Yêu Biển Đảo 4.0' : 'Maritime Youth 4.0'}
                  </span>
                  <span aria-hidden="true">/</span>
                  <span className="text-[#0056D2] font-semibold">
                    {lang === 'vi' ? currentLesson.subjectVi : currentLesson.subjectEn}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{lang === 'vi' ? `Khối lớp ${currentLesson.grade}` : `Grade ${currentLesson.grade}`}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono">{currentLesson.duration}</span>
                </div>

                <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                  {lang === 'vi' ? currentLesson.titleVi : currentLesson.titleEn}
                </h1>
              </div>

              {/* Action Buttons: Mark as complete & Navigation */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => toggleLessonCompleted(currentLesson.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors shadow-xs ${
                    completedLessons.includes(currentLesson.id)
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                      : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <CheckCircle2
                    className={`w-4 h-4 ${
                      completedLessons.includes(currentLesson.id) ? 'text-emerald-600' : 'text-slate-400'
                    }`}
                  />
                  <span>
                    {completedLessons.includes(currentLesson.id)
                      ? lang === 'vi'
                        ? 'Đã hoàn thành'
                        : 'Completed'
                      : lang === 'vi'
                      ? 'Đánh dấu hoàn thành'
                      : 'Mark as Complete'}
                  </span>
                </button>

                {/* Prev Button */}
                <button
                  disabled={!prevLesson}
                  onClick={() => prevLesson && setSelectedLessonId(prevLesson.id)}
                  className={`p-2 rounded-lg border transition-colors ${
                    prevLesson
                      ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                      : 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed'
                  }`}
                  title={lang === 'vi' ? 'Bài học trước' : 'Previous Lesson'}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Next Button */}
                <button
                  disabled={!nextLesson}
                  onClick={() => nextLesson && setSelectedLessonId(nextLesson.id)}
                  className={`p-2 rounded-lg border transition-colors ${
                    nextLesson
                      ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                      : 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed'
                  }`}
                  title={lang === 'vi' ? 'Bài học kế tiếp' : 'Next Lesson'}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* 3. Coursera-Style Tabbed Content Section */}
          <div className="flex-1 max-w-5xl mx-auto w-full p-4 md:p-6 space-y-6">
            {/* Tabs Header */}
            <div className="flex items-center gap-6 border-b border-slate-200 text-sm font-semibold overflow-x-auto">
              <button
                onClick={() => setActiveTab('summary')}
                className={`pb-3 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'summary'
                    ? 'border-[#0056D2] text-[#0056D2]'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'vi' ? 'Tóm tắt nội dung cốt lõi' : 'Core Summary & Key Insights'}
              </button>

              <button
                onClick={() => setActiveTab('quiz')}
                className={`pb-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'quiz'
                    ? 'border-[#0056D2] text-[#0056D2]'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{lang === 'vi' ? 'Bài tập củng cố (Quiz)' : 'Reinforcement Quiz'}</span>
                {isCurrentQuizSubmitted && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                      isQuizPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {quizScore}/{quizTotal}
                  </span>
                )}
              </button>

              {/* STEM Lab Tab (Always available or highlighted when lesson has stemLab) */}
              <button
                onClick={() => setActiveTab('stem')}
                className={`pb-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'stem'
                    ? 'border-[#0056D2] text-[#0056D2]'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                <span>{lang === 'vi' ? 'Góc STEM & 3D Hologram' : 'STEM Lab & 3D Hologram'}</span>
              </button>

              <button
                onClick={() => setActiveTab('notes')}
                className={`pb-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'notes'
                    ? 'border-[#0056D2] text-[#0056D2]'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span>{lang === 'vi' ? 'Sổ tay ghi chú học tập' : 'Personal Study Notes'}</span>
              </button>
            </div>

            {/* TAB 1: SUMMARY & CORE TAKEAWAYS */}
            {activeTab === 'summary' && (
              <div className="space-y-6">
                {/* Hero / Lead Insight Card */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex-1 space-y-4">
                      <p className="text-base text-slate-700 font-medium leading-relaxed">
                        {lang === 'vi' ? currentLesson.summaryVi.lead : currentLesson.summaryEn.lead}
                      </p>

                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#0056D2] mb-3">
                          {lang === 'vi' ? 'Các điểm sáng trọng tâm của bài học:' : 'Key Learning Objectives:'}
                        </h3>
                        <ul className="space-y-2.5">
                          {(lang === 'vi' ? currentLesson.summaryVi.keyPoints : currentLesson.summaryEn.keyPoints).map(
                            (point, pIdx) => (
                              <li key={pIdx} className="flex items-start gap-2.5 text-sm text-slate-600">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0056D2] mt-2 shrink-0" />
                                <span className="leading-relaxed">{point}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>

                    {/* Quick Illustration Asset */}
                    <div className="w-full md:w-64 aspect-4/3 rounded-lg overflow-hidden border border-slate-200 shrink-0 bg-slate-100 relative">
                      <img
                        src={heroImage}
                        alt="Teen Yêu Biển Đảo 4.0 Educational Illustration"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-3">
                        <span className="text-[11px] font-semibold text-white">
                          {lang === 'vi' ? 'Hải đăng & Biển đảo Việt Nam' : 'Vietnam Maritime Heritage'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Maritime Terms & Legal Foundations */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                  <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#0056D2]" />
                    {lang === 'vi'
                      ? 'Thuật ngữ Khoa học Hải dương & Pháp lý Biển cần ghi nhớ'
                      : 'Essential Marine Science & Sovereignty Terminology'}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(lang === 'vi' ? currentLesson.summaryVi.maritimeTerms : currentLesson.summaryEn.maritimeTerms).map(
                      (item, idx) => (
                        <div key={idx} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200/80">
                          <h4 className="text-xs font-bold text-[#0056D2] mb-1">{item.term}</h4>
                          <p className="text-xs text-slate-600 leading-relaxed">{item.definition}</p>
                        </div>
                      )
                    )}
                  </div>

                  {/* Student Action Callout */}
                  <div className="mt-5 p-4 bg-sky-50 rounded-lg border border-sky-100 flex items-start gap-3 text-xs text-sky-900 leading-relaxed">
                    <Flame className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold mb-0.5">
                        {lang === 'vi' ? 'Hành động của học sinh THCS:' : 'Student Call to Action:'}
                      </strong>
                      <span>
                        {lang === 'vi'
                          ? currentLesson.summaryVi.studentAction
                          : currentLesson.summaryEn.studentAction}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: INTERACTIVE REINFORCEMENT QUIZ */}
            {activeTab === 'quiz' && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      {lang === 'vi' ? 'Bài tập củng cố kiến thức trực tiếp' : 'Direct Knowledge Assessment Quiz'}
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {lang === 'vi'
                        ? 'Chọn đáp án đúng cho từng câu hỏi. Hệ thống sẽ chấm điểm và cung cấp lời giải thích chi tiết ngay lập tức.'
                        : 'Select the best answer for each question to receive instant automated scoring and explanations.'}
                    </p>
                  </div>

                  {/* Score Indicator */}
                  {isCurrentQuizSubmitted && (
                    <div
                      className={`px-4 py-2 rounded-lg border text-xs font-bold flex items-center gap-2 ${
                        isQuizPassed
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                          : 'bg-amber-50 border-amber-300 text-amber-800'
                      }`}
                    >
                      <Award className="w-4 h-4" />
                      <span>
                        {lang === 'vi' ? 'Kết quả:' : 'Score:'} {quizScore}/{quizTotal} (
                        {Math.round((quizScore / quizTotal) * 100)}%)
                      </span>
                    </div>
                  )}
                </div>

                {/* Question List */}
                <div className="space-y-6">
                  {currentLesson.quiz.map((q, qIndex) => {
                    const selectedOpt = currentQuizAnswers[q.id];
                    const isAnswered = selectedOpt !== undefined;
                    const isCorrect = isAnswered && selectedOpt === q.correctIndex;
                    const options = lang === 'vi' ? q.optionsVi : q.optionsEn;

                    return (
                      <div
                        key={q.id}
                        className="p-5 rounded-lg border border-slate-200 bg-slate-50/60 space-y-3"
                      >
                        <div className="flex items-start gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-[#0056D2] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                            {qIndex + 1}
                          </span>
                          <h4 className="text-sm font-semibold text-slate-900 leading-snug">
                            {lang === 'vi' ? q.questionVi : q.questionEn}
                          </h4>
                        </div>

                        {/* Options */}
                        <div className="space-y-2 pt-1 pl-8">
                          {options.map((optText, optIdx) => {
                            const isThisSelected = selectedOpt === optIdx;
                            let btnStyle = 'border-slate-200 bg-white hover:border-slate-300 text-slate-700';

                            if (isCurrentQuizSubmitted) {
                              if (optIdx === q.correctIndex) {
                                btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold';
                              } else if (isThisSelected && !isCorrect) {
                                btnStyle = 'border-red-400 bg-red-50 text-red-900 line-through';
                              } else {
                                btnStyle = 'border-slate-200 bg-slate-50 text-slate-400';
                              }
                            } else if (isThisSelected) {
                              btnStyle = 'border-[#0056D2] bg-blue-50 text-[#0056D2] font-semibold';
                            }

                            return (
                              <button
                                key={optIdx}
                                disabled={isCurrentQuizSubmitted}
                                onClick={() => handleSelectOption(q.id, optIdx)}
                                className={`w-full text-left p-3 rounded-lg border text-xs transition-colors flex items-center justify-between cursor-pointer ${btnStyle}`}
                              >
                                <span className="leading-relaxed">{optText}</span>
                                {isCurrentQuizSubmitted && optIdx === q.correctIndex && (
                                  <Check className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Explanation Box (Revealed on submission) */}
                        {isCurrentQuizSubmitted && (
                          <div className="ml-8 mt-3 p-3 bg-white rounded-md border border-slate-200 text-xs text-slate-600 leading-relaxed">
                            <span className="font-bold text-[#0056D2] block mb-1">
                              {lang === 'vi' ? 'Giải thích khoa học & pháp lý:' : 'Scientific & Legal Rationale:'}
                            </span>
                            {lang === 'vi' ? q.explanationVi : q.explanationEn}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Quiz Bottom Controls */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <button
                    onClick={handleResetQuiz}
                    className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-100 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{lang === 'vi' ? 'Làm lại bài trắc nghiệm' : 'Reset Quiz'}</span>
                  </button>

                  {!isCurrentQuizSubmitted ? (
                    <button
                      onClick={handleSubmitQuiz}
                      disabled={Object.keys(currentQuizAnswers).length === 0}
                      className="px-5 py-2 bg-[#0056D2] hover:bg-[#00419e] disabled:bg-slate-300 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
                    >
                      {lang === 'vi' ? 'Nộp bài & Chấm điểm ngay' : 'Submit & Check Answers'}
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      {isQuizPassed && (
                        <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          {lang === 'vi' ? 'Đã đạt tiêu chuẩn bài học!' : 'Passed Lesson Criteria!'}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Certificate of Achievement Banner if passed */}
                {isCurrentQuizSubmitted && isQuizPassed && (
                  <div className="p-4 bg-gradient-to-r from-blue-900 to-[#0056D2] text-white rounded-xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                        <Award className="w-6 h-6 text-amber-300" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">
                          {lang === 'vi' ? 'Chứng nhận hoàn thành chuyên đề!' : 'Module Mastery Badge Earned!'}
                        </h4>
                        <p className="text-xs text-blue-100">
                          {lang === 'vi'
                            ? `Bạn đã xuất sắc vượt qua bài củng cố của "${currentLesson.titleVi}".`
                            : `You successfully completed the quiz for "${currentLesson.titleEn}".`}
                        </p>
                      </div>
                    </div>
                    {nextLesson && (
                      <button
                        onClick={() => setSelectedLessonId(nextLesson.id)}
                        className="px-3.5 py-1.5 bg-white text-[#0056D2] font-semibold text-xs rounded-lg hover:bg-blue-50 transition-colors whitespace-nowrap"
                      >
                        {lang === 'vi' ? 'Học bài kế tiếp' : 'Next Lesson'} →
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: STEM 4.0 & 3D HOLOGRAM LAB */}
            {activeTab === 'stem' && (
              <div className="space-y-6">
                {/* Check if current lesson is current-oriented or hologram-oriented */}
                {currentLesson.stemLab?.type === 'oceanCurrent' ? (
                  <OceanCurrentSimulator lang={lang} />
                ) : (
                  <HologramSimulator lang={lang} />
                )}

                {/* Secondary Sandbox Switcher so students can test both anytime! */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    {lang === 'vi' ? 'Thử nghiệm phòng Lab bổ trợ:' : 'Complementary STEM Laboratories:'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex flex-col justify-between">
                      <div>
                        <h5 className="font-bold text-xs text-slate-900">
                          {lang === 'vi' ? 'Mô hình Quang học Hologram 4 Chiều' : '4-Way 3D Optical Hologram'}
                        </h5>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {lang === 'vi'
                            ? 'Dùng lăng kính mica nghiêng 45° quan sát sinh vật biển và hải đăng lơ lửng.'
                            : '45-degree prism projecting spatial marine life and beacons.'}
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab('stem')}
                        className="mt-3 text-xs font-semibold text-[#0056D2] hover:underline self-start"
                      >
                        {lang === 'vi' ? 'Xem phòng thí nghiệm Hologram' : 'Open Hologram Lab'} →
                      </button>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex flex-col justify-between">
                      <div>
                        <h5 className="font-bold text-xs text-slate-900">
                          {lang === 'vi' ? 'Mô phỏng Dòng hải lưu & Nước trồi' : 'Ocean Current & Upwelling Lab'}
                        </h5>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {lang === 'vi'
                            ? 'Mô phỏng quy luật gió mùa Đông Bắc và Tây Nam tác động lên Biển Đông.'
                            : 'Simulate monsoon reversals driving East Sea ocean circulation.'}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedLessonId('lesson-5');
                          setActiveTab('stem');
                        }}
                        className="mt-3 text-xs font-semibold text-[#0056D2] hover:underline self-start"
                      >
                        {lang === 'vi' ? 'Chuyển sang bài mô phỏng dòng chảy' : 'Open Ocean Current Lab'} →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: PERSONAL STUDY NOTES */}
            {activeTab === 'notes' && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {lang === 'vi' ? 'Sổ tay ghi chú học tập cá nhân' : 'Personal Study Notebook'}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {lang === 'vi'
                        ? 'Ghi chép tự động lưu vào trình duyệt của bạn (LocalStorage) không lo bị mất.'
                        : 'Notes are saved locally in your browser storage automatically.'}
                    </p>
                  </div>
                  <span className="text-[11px] text-emerald-600 font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {lang === 'vi' ? '✓ Tự động lưu' : '✓ Auto-saved'}
                  </span>
                </div>

                <textarea
                  value={notes[currentLesson.id] || ''}
                  onChange={(e) =>
                    setNotes((prev) => ({ ...prev, [currentLesson.id]: e.target.value }))
                  }
                  placeholder={
                    lang === 'vi'
                      ? 'Ghi lại các mốc thời gian quan trọng trong video, các câu hỏi thắc mắc hoặc ý tưởng sáng tạo STEM...'
                      : 'Record timestamps, key takeaways, questions or STEM project sketches...'
                  }
                  rows={8}
                  className="w-full p-4 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-hidden focus:bg-white focus:border-[#0056D2] leading-relaxed resize-y"
                />

                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span>
                    {lang === 'vi'
                      ? `Bài học hiện tại: ${currentLesson.titleVi}`
                      : `Current Lesson: ${currentLesson.titleEn}`}
                  </span>
                  <button
                    onClick={() => {
                      const noteText = notes[currentLesson.id] || '';
                      const blob = new Blob([noteText], { type: 'text/plain;charset=utf-8' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `ghi_chu_${currentLesson.id}.txt`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 font-medium transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{lang === 'vi' ? 'Tải ghi chú (.txt)' : 'Download Notes (.txt)'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Standalone Single HTML Export Modal */}
      <SingleHtmlExporter
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        lang={lang}
      />
    </div>
  );
}
