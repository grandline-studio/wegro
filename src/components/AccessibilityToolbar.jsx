import React, { useState, useEffect, useRef } from 'react';
import {
  Accessibility,
  X,
  ChevronDown,
  ChevronUp,
  Check,
} from 'lucide-react';

const STORAGE_KEY = 'wegro_a11y_preferences';

const DEFAULT_SETTINGS = {
  // 4 Accessibility Profiles
  seizureSafe: false,
  lowVision: false,
  adhdFriendly: false,
  dyslexia: false,

  // 21 Functional Feature Cards
  focus: false,
  cursor: false,
  highlight: false,
  contrast: 0,       // 0: default, 1: high (+40%), 2: dark, 3: inverted (4 levels)
  colorShift: 0,     // 0: default, 1: warm, 2: cool, 3: monochrome (4 levels)
  saturation: 0,     // 0: normal, 1: low, 2: vibrant, 3: desaturated (4 levels)
  animation: false,
  textSize: 0,       // 0: 100%, 1: 110%, 2: 120%, 3: 130% (4 levels)
  spacing: 0,        // 0: normal, 1: +0.04em, 2: +0.08em, 3: +0.12em (4 levels)
  lineHeight: 0,     // 0: 1.6, 1: 1.4, 2: 1.8, 3: 2.2 (4 levels)
  align: 0,          // 0: default, 1: center, 2: justify, 3: right (4 levels)
  font: 0,           // 0: default, 1: clean sans, 2: dyslexia font, 3: serif (4 levels)
  guide: false,
  windowMask: false,
  hideImages: false,
  readAloud: false,
  voice: false,
  altText: false,
  hoverHighlight: false,
  bigButtons: false,
  muteMedia: false,

  // UI state
  showShortcuts: false,
};

export default function AccessibilityToolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [cursorY, setCursorY] = useState(-100);
  const [navStructureOpen, setNavStructureOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const drawerRef = useRef(null);

  // Load saved preferences on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('enableuser_a11y_preferences');
      if (stored) {
        const parsed = JSON.parse(stored);
        setSettings((prev) => ({ ...prev, ...parsed }));
      }
    } catch (e) {}
  }, []);

  // Synchronize settings with document DOM attributes and persistent storage
  useEffect(() => {
    const root = document.documentElement;

    // Profiles
    root.setAttribute('data-a11y-seizure-safe', String(settings.seizureSafe || settings.animation));
    root.setAttribute('data-a11y-low-vision', String(settings.lowVision));
    root.setAttribute('data-a11y-adhd', String(settings.adhdFriendly));
    root.setAttribute('data-a11y-dyslexia', String(settings.dyslexia));

    // Single features
    root.setAttribute('data-a11y-focus', String(settings.focus));
    root.setAttribute('data-a11y-big-cursor', String(settings.cursor));
    root.setAttribute('data-a11y-highlight-links', String(settings.highlight));
    root.setAttribute('data-a11y-hide-images', String(settings.hideImages));
    root.setAttribute('data-a11y-hover-highlight', String(settings.hoverHighlight));
    root.setAttribute('data-a11y-big-buttons', String(settings.bigButtons));

    // Contrast mapping (4 levels: 0=normal, 1=high, 2=dark, 3=inverted)
    const contrastMap = ['normal', 'high-contrast', 'dark-contrast', 'inverted'];
    root.setAttribute('data-a11y-contrast', contrastMap[settings.contrast] || 'normal');

    // Color shift mapping (4 levels: 0=normal, 1=warm, 2=cool, 3=monochrome)
    const colorShiftMap = ['normal', 'warm', 'cool', 'monochrome'];
    root.setAttribute('data-a11y-colorshift', colorShiftMap[settings.colorShift] || 'normal');

    // Saturation mapping (4 levels: 0=normal, 1=low, 2=high, 3=monochrome)
    const satMap = ['normal', 'low', 'high', 'monochrome'];
    root.setAttribute('data-a11y-saturation', satMap[settings.saturation] || 'normal');

    // Text Size (0=100%, 1=110%, 2=120%, 3=130%)
    const textSizeMap = [100, 110, 120, 130];
    const targetSize = textSizeMap[settings.textSize] || 100;
    root.style.fontSize = targetSize !== 100 ? `${targetSize}%` : '';

    // Letter Spacing (0=0, 1=0.04em, 2=0.08em, 3=0.12em)
    const spacingMap = [0, 0.04, 0.08, 0.12];
    const targetSpacing = spacingMap[settings.spacing] || 0;
    document.body.style.letterSpacing = targetSpacing > 0 ? `${targetSpacing}em` : '';

    // Line Height (0=1.6, 1=1.4, 2=1.8, 3=2.2)
    const lineHeightMap = [1.6, 1.4, 1.8, 2.2];
    const targetLineHeight = lineHeightMap[settings.lineHeight] || 1.6;
    document.body.style.lineHeight = targetLineHeight !== 1.6 ? String(targetLineHeight) : '';

    // Text Align (0=default, 1=center, 2=justify, 3=right)
    const alignMap = ['default', 'center', 'justify', 'right'];
    root.setAttribute('data-a11y-align', alignMap[settings.align] || 'default');

    // Font family (0=default, 1=sans, 2=dyslexic, 3=serif)
    const fontMap = ['default', 'sans', 'dyslexic', 'serif'];
    root.setAttribute('data-a11y-font', fontMap[settings.font] || 'default');

    // Mute media
    document.querySelectorAll('video, audio').forEach((media) => {
      try {
        media.muted = settings.muteMedia;
        if (settings.seizureSafe || settings.animation) {
          media.pause();
        }
      } catch (e) {}
    });

    // Save to storage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {}
  }, [settings]);

  // Track cursor for reading guide & window mask
  useEffect(() => {
    if (!settings.guide && !settings.windowMask) return;
    const handleMouseMove = (e) => setCursorY(e.clientY);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [settings.guide, settings.windowMask]);

  // Keyboard shortcut listener (Alt + A to open, Escape to close)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
      if (e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Reset all settings to default
  const resetAll = () => {
    setSettings(DEFAULT_SETTINGS);
    const root = document.documentElement;
    root.style.fontSize = '';
    document.body.style.letterSpacing = '';
    document.body.style.lineHeight = '';
    try {
      localStorage.removeItem(STORAGE_KEY);
    try { localStorage.removeItem('enableuser_a11y_preferences'); } catch (e) {}
    } catch (e) {}
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Toggle or step a setting
  const updateSetting = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: typeof value === 'function' ? value(prev[key]) : value,
    }));
  };

  // Step a multi-level setting (cycles: 0 -> 1 -> 2 -> ... -> max -> 0)
  const cycleSetting = (key, maxSteps = 4) => {
    setSettings((prev) => ({
      ...prev,
      [key]: (prev[key] + 1) % maxSteps,
    }));
  };

  // Handle Read Aloud Text-to-Speech
  const handleReadAloud = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      updateSetting('readAloud', false);
      return;
    }

    // Read selected text or page hero headline
    let textToRead = window.getSelection()?.toString()?.trim();
    if (!textToRead) {
      const heading = document.querySelector('h1')?.innerText || '';
      const sub = document.querySelector('.hero-v2-sub, p')?.innerText || '';
      textToRead = `${heading}. ${sub}`;
    }

    if (textToRead) {
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => {
        setIsSpeaking(false);
        updateSetting('readAloud', false);
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        updateSetting('readAloud', false);
      };
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
      updateSetting('readAloud', true);
    }
  };

  // Handle Alt Text Badge Toggle
  const handleToggleAltText = () => {
    const nextVal = !settings.altText;
    updateSetting('altText', nextVal);
    document.querySelectorAll('img').forEach((img) => {
      if (img.closest('.a11y-exempt')) return;
      if (nextVal && img.alt) {
        let badge = img.parentElement?.querySelector('.a11y-alt-badge');
        if (!badge) {
          badge = document.createElement('span');
          badge.className = 'a11y-alt-badge';
          badge.style.position = 'absolute';
          badge.style.bottom = '8px';
          badge.style.left = '8px';
          badge.style.background = '#1C3F35';
          badge.style.color = '#FFFFFF';
          badge.style.padding = '3px 8px';
          badge.style.borderRadius = '6px';
          badge.style.fontSize = '11px';
          badge.style.fontWeight = '700';
          badge.style.zIndex = '99';
          badge.style.pointerEvents = 'none';
          badge.innerText = `ALT: ${img.alt}`;
          if (img.parentElement) {
            img.parentElement.style.position = 'relative';
            img.parentElement.appendChild(badge);
          }
        }
      } else {
        const badge = img.parentElement?.querySelector('.a11y-alt-badge');
        if (badge) badge.remove();
      }
    });
  };

  // Count active modifications
  const activeCount = [
    settings.seizureSafe,
    settings.lowVision,
    settings.adhdFriendly,
    settings.dyslexia,
    settings.focus,
    settings.cursor,
    settings.highlight,
    settings.contrast > 0,
    settings.colorShift > 0,
    settings.saturation > 0,
    settings.animation,
    settings.textSize > 0,
    settings.spacing > 0,
    settings.lineHeight > 0,
    settings.align > 0,
    settings.font > 0,
    settings.guide,
    settings.windowMask,
    settings.hideImages,
    settings.readAloud,
    settings.voice,
    settings.altText,
    settings.hoverHighlight,
    settings.bigButtons,
    settings.muteMedia,
  ].filter(Boolean).length;

  const activeProfilesCount = [
    settings.seizureSafe,
    settings.lowVision,
    settings.adhdFriendly,
    settings.dyslexia,
  ].filter(Boolean).length;

  // Render multi-level indicator dashes (matching screenshot 4 dashes exactly)
  const renderDashes = (currentVal, totalSteps = 4) => (
    <div className="flex items-center justify-center gap-1.5 mt-2 select-none" aria-hidden="true">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <span
          key={i}
          className={`h-1 w-3.5 rounded-full transition-colors duration-150 ${
            i <= currentVal && currentVal > 0
              ? 'bg-[#1C3F35]'
              : 'bg-[#E2E4DC]'
          }`}
        />
      ))}
    </div>
  );

  return (
    <>
      {/* =========================================================================
          1. READING GUIDE (HORIZONTAL FOCUS LINE TRACKS CURSOR)
          ========================================================================= */}
      {settings.guide && cursorY > 0 && (
        <div
          className="pointer-events-none fixed left-0 right-0 z-[99999] transition-transform duration-75 ease-out"
          style={{
            top: `${cursorY - 24}px`,
            height: '48px',
            borderTop: '2.5px solid #1C3F35',
            borderBottom: '2.5px solid #1C3F35',
            backgroundColor: 'rgba(28, 63, 53, 0.12)',
            boxShadow: '0 0 0 9999px rgba(8, 7, 5, 0.45)',
          }}
          aria-hidden="true"
        />
      )}

      {/* =========================================================================
          2. READING WINDOW (LETTERBOX FOCUS MASK)
          ========================================================================= */}
      {settings.windowMask && cursorY > 0 && (
        <div
          className="pointer-events-none fixed left-0 right-0 z-[99999] transition-transform duration-75 ease-out"
          style={{
            top: `${cursorY - 60}px`,
            height: '120px',
            borderTop: '3px solid #1C3F35',
            borderBottom: '3px solid #1C3F35',
            backgroundColor: 'transparent',
            boxShadow: '0 0 0 9999px rgba(8, 7, 5, 0.65)',
          }}
          aria-hidden="true"
        />
      )}

      {/* =========================================================================
          3. FLOATING ACCESSIBILITY LAUNCHER (CIRCULAR, DOCKED ON BOTTOM LEFT)
          ========================================================================= */}
      <div className="a11y-exempt fixed left-4 sm:left-6 bottom-4 sm:bottom-6 z-[9980] flex items-center">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1C3F35] text-white shadow-xl hover:shadow-2xl hover:shadow-emerald-950/30 transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-[#142F27] cursor-pointer border border-white/20 select-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400 focus-visible:ring-offset-2"
          aria-label="Open WeGro Accessibility Menu (Alt + A)"
          title="WeGro Accessibility Menu (Alt + A)"
        >
          <Accessibility className="h-6 w-6 sm:h-6.5 sm:w-6.5 text-white transition-transform duration-300 group-hover:scale-110" />
          {activeCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#10B981] text-[11px] font-black text-white ring-2 ring-white shadow-sm">
              {activeCount}
            </span>
          )}

          {/* Hover Tooltip (Appears to the right of the button) */}
          <span className="pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0 absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-[#080705] text-white text-xs font-semibold whitespace-nowrap shadow-xl border border-white/10 hidden sm:flex items-center gap-1.5 z-10">
            <span>Accessibility</span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white/15 text-emerald-200 rounded">Alt+A</kbd>
          </span>
        </button>
      </div>

      {/* =========================================================================
          4. ENTERPRISE ACCESSIBILITY SLIDE-OVER DRAWER (EXACT TARGET UI)
          ========================================================================= */}
      {isOpen && (
        <div
          className="a11y-exempt fixed inset-0 z-[9995] flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-labelledby="wegro-a11y-title"
        >
          {/* Subtle Dim Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-200"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Side Drawer Container (480px width, sleek white canvas) */}
          <div
            ref={drawerRef}
            className="relative w-full max-w-[460px] h-full bg-white text-[#18181B] shadow-[-20px_0_60px_rgba(0,0,0,0.22)] z-10 flex flex-col overflow-hidden animate-in slide-in-from-right duration-250 ease-out"
          >
            {/* Top Header: WeGro Brand + // + RESET + Close */}
            <div className="flex-shrink-0 flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#E8E8E0] bg-white">
              {/* Left Branding */}
              <div className="flex items-center gap-2.5 sm:gap-3">
                <img
                  src="/wegrow_emblem.png"
                  alt="WeGro Emblem"
                  className="w-8 h-8 sm:w-9 sm:h-9 object-contain shrink-0 rounded-md"
                />

                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 leading-none">
                    <span
                      id="wegro-a11y-title"
                      className="text-[17px] sm:text-[19px] font-black tracking-tight text-[#1C3F35]"
                    >
                      We<span className="text-[#059669]">Gro</span>
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#1C3F35] bg-[#E8F0EC] px-1.5 py-0.5 rounded border border-[#C2DDD3]">
                      Access
                    </span>
                  </div>
                  <span className="text-[10px] font-medium text-neutral-500 tracking-tight mt-1 truncate max-w-[200px] sm:max-w-none">
                    Adaptive Browsing & Institutional Compliance
                  </span>
                </div>
              </div>

              {/* Right Controls: // + RESET + Close */}
              <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                <span className="text-neutral-300 font-mono text-xs sm:text-sm select-none tracking-tight">
                  //
                </span>

                <button
                  type="button"
                  onClick={resetAll}
                  className="rounded-[6px] border border-[#1C3F35] bg-white px-2.5 sm:px-3.5 py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#1C3F35] hover:bg-[#F2F7F4] hover:border-[#142F27] transition-colors cursor-pointer active:scale-95 shadow-2xs"
                  title="Reset all settings to default"
                >
                  RESET
                </button>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg text-[#1C3F35] hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer"
                  aria-label="Close WeGro Accessibility Panel"
                >
                  <X className="h-5 w-5 stroke-[2.2]" />
                </button>
              </div>
            </div>

            {/* Scrollable Drawer Body */}
            <div className="flex-1 overflow-y-auto px-3.5 sm:px-6 py-3.5 sm:py-5 space-y-3.5 sm:space-y-4">
              
              {/* SECTION 1: Accessibility Profiles Box */}
              <div className="rounded-xl sm:rounded-2xl border border-[#E2E4DC] bg-[#F9FAF8] p-3.5 sm:p-4 shadow-xs">
                <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                  <h3 className="text-[12.5px] sm:text-[13px] font-bold text-[#1C3F35] tracking-tight">
                    Accessibility Profiles
                  </h3>
                  {activeProfilesCount > 0 && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#1C3F35] bg-[#E5EFEA] px-2 py-0.5 rounded-full border border-[#BED6CC]">
                      {activeProfilesCount} Active
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                  {[
                    { key: 'seizureSafe', label: 'Seizure Safe' },
                    { key: 'lowVision', label: 'Low Vision' },
                    { key: 'adhdFriendly', label: 'ADHD Friendly' },
                    { key: 'dyslexia', label: 'Dyslexia' },
                  ].map((profile) => {
                    const isActive = settings[profile.key];
                    return (
                      <button
                        key={profile.key}
                        type="button"
                        onClick={() => updateSetting(profile.key, (v) => !v)}
                        className={`h-9 sm:h-10 px-2 sm:px-3.5 rounded-full border text-[12px] sm:text-[13px] font-semibold transition-all duration-150 cursor-pointer flex items-center justify-center text-center shadow-xs active:scale-95 ${
                          isActive
                            ? 'bg-[#1C3F35] border-[#1C3F35] text-white shadow-xs'
                            : 'bg-white border-[#E2E4DC] text-[#1C3F35] hover:border-[#1C3F35]/50 hover:bg-[#F2F7F4] hover:text-[#1C3F35]'
                        }`}
                      >
                        <span className="truncate">{profile.label}</span>
                        {isActive && <Check className="h-3.5 w-3.5 ml-1.5 stroke-[3] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 2: Navigate by Page Structure (Collapsible Accordion) */}
              <div className="rounded-xl border border-[#E2E4DC] bg-white overflow-hidden shadow-xs">
                <button
                  type="button"
                  onClick={() => setNavStructureOpen((prev) => !prev)}
                  className="w-full flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3 text-[12.5px] sm:text-[13px] font-bold text-[#1C3F35] hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  <span>Navigate by Page Structure</span>
                  {navStructureOpen ? (
                    <ChevronUp className="h-4 w-4 text-neutral-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-neutral-500" />
                  )}
                </button>

                {navStructureOpen && (
                  <div className="px-4 pb-3.5 pt-1 border-t border-neutral-100 flex flex-col gap-1.5 bg-[#FAFBFD]">
                    {[
                      { label: 'Hero Section & Live Research', selector: '.hero-v2-section' },
                      { label: 'Corporate Experience & Statistics', selector: 'main section:nth-of-type(2)' },
                      { label: 'About WeGro Advisory Firm', selector: '.section' },
                      { label: 'Key Value Pillars', selector: '.section-header' },
                      { label: 'Important Regulatory Links & Offices', selector: 'footer' },
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          const target = document.querySelector(item.selector);
                          if (target) {
                            target.scrollIntoView({ behavior: 'smooth' });
                            setIsOpen(false);
                          }
                        }}
                        className="text-left text-xs font-medium text-neutral-600 hover:text-[#1C3F35] hover:bg-white p-2 rounded-lg transition-colors cursor-pointer flex items-center justify-between"
                      >
                        <span>{item.label}</span>
                        <span className="text-[10px] text-neutral-400 font-mono">Jump →</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* SECTION 3: Show shortcuts Toggle Row */}
              <div className="flex items-center justify-between px-1 py-1">
                <span className="text-[12.5px] sm:text-[13px] font-semibold text-[#1C3F35]">
                  Show shortcuts
                </span>
                
                {/* Pill Switch */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={settings.showShortcuts}
                  onClick={() => updateSetting('showShortcuts', (v) => !v)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    settings.showShortcuts ? 'bg-[#1C3F35]' : 'bg-[#E5E7EB]'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                      settings.showShortcuts ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* SECTION 4: Master 3-Column Features Grid (All 21 Enterprise Tools) */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 pb-8">
                
                {/* 1. Focus */}
                <button
                  type="button"
                  onClick={() => updateSetting('focus', (v) => !v)}
                  className={`relative flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border transition-all cursor-pointer min-h-[86px] sm:min-h-[98px] text-center active:scale-95 ${
                    settings.focus
                      ? 'bg-[#EDF5F2] border-[#1C3F35] shadow-xs ring-1 ring-[#1C3F35]'
                      : 'bg-[#F9FAF8] border-[#E8E8E0] hover:bg-white hover:border-[#1C3F35]/40 hover:shadow-xs'
                  }`}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1C3F35" strokeWidth="2">
                    <rect x="4" y="4" width="16" height="16" rx="3" strokeDasharray="3 3" />
                    <circle cx="12" cy="12" r="2.5" fill="#1C3F35" />
                  </svg>
                  <span className="text-[11px] sm:text-[12px] font-semibold text-[#1C3F35] mt-1.5 tracking-tight leading-tight line-clamp-1">
                    Focus
                  </span>
                  {settings.showShortcuts && (
                    <span className="absolute top-1.5 right-1.5 text-[9px] font-mono font-bold text-neutral-400 bg-white px-1 rounded">
                      F
                    </span>
                  )}
                </button>

                {/* 2. Cursor */}
                <button
                  type="button"
                  onClick={() => updateSetting('cursor', (v) => !v)}
                  className={`relative flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border transition-all cursor-pointer min-h-[86px] sm:min-h-[98px] text-center active:scale-95 ${
                    settings.cursor
                      ? 'bg-[#EDF5F2] border-[#1C3F35] shadow-xs ring-1 ring-[#1C3F35]'
                      : 'bg-[#F9FAF8] border-[#E8E8E0] hover:bg-white hover:border-[#1C3F35]/40 hover:shadow-xs'
                  }`}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1C3F35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4L11 20L14 13L21 10L4 4Z" />
                  </svg>
                  <span className="text-[11px] sm:text-[12px] font-semibold text-[#1C3F35] mt-1.5 tracking-tight leading-tight line-clamp-1">
                    Cursor
                  </span>
                  {settings.showShortcuts && (
                    <span className="absolute top-1.5 right-1.5 text-[9px] font-mono font-bold text-neutral-400 bg-white px-1 rounded">
                      C
                    </span>
                  )}
                </button>

                {/* 3. Highlight */}
                <button
                  type="button"
                  onClick={() => updateSetting('highlight', (v) => !v)}
                  className={`relative flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border transition-all cursor-pointer min-h-[86px] sm:min-h-[98px] text-center active:scale-95 ${
                    settings.highlight
                      ? 'bg-[#EDF5F2] border-[#1C3F35] shadow-xs ring-1 ring-[#1C3F35]'
                      : 'bg-[#F9FAF8] border-[#E8E8E0] hover:bg-white hover:border-[#1C3F35]/40 hover:shadow-xs'
                  }`}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1C3F35" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="5" y1="6" x2="19" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                    <line x1="3" y1="14" x2="21" y2="14" />
                    <line x1="5" y1="18" x2="19" y2="18" />
                  </svg>
                  <span className="text-[11px] sm:text-[12px] font-semibold text-[#1C3F35] mt-1.5 tracking-tight leading-tight line-clamp-1">
                    Highlight
                  </span>
                  {settings.showShortcuts && (
                    <span className="absolute top-1.5 right-1.5 text-[9px] font-mono font-bold text-neutral-400 bg-white px-1 rounded">
                      H
                    </span>
                  )}
                </button>

                {/* 4. Contrast (4 levels) */}
                <button
                  type="button"
                  onClick={() => cycleSetting('contrast', 4)}
                  className={`relative flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border transition-all cursor-pointer min-h-[86px] sm:min-h-[98px] text-center active:scale-95 ${
                    settings.contrast > 0
                      ? 'bg-[#EDF5F2] border-[#1C3F35] shadow-xs ring-1 ring-[#1C3F35]'
                      : 'bg-[#F9FAF8] border-[#E8E8E0] hover:bg-white hover:border-[#1C3F35]/40 hover:shadow-xs'
                  }`}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3A9 9 0 0 0 12 21V3Z" fill="#1C3F35" />
                    <path d="M12 3A9 9 0 0 1 12 21" stroke="#1C3F35" strokeWidth="2" />
                    <path d="M19 12H22M17.5 6.5L19.5 4.5M17.5 17.5L19.5 19.5" stroke="#1C3F35" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span className="text-[11px] sm:text-[12px] font-semibold text-[#1C3F35] mt-1.5 tracking-tight leading-tight line-clamp-1">
                    Contrast
                  </span>
                  {renderDashes(settings.contrast, 4)}
                </button>

                {/* 5. Color Shift (4 levels) */}
                <button
                  type="button"
                  onClick={() => cycleSetting('colorShift', 4)}
                  className={`relative flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border transition-all cursor-pointer min-h-[86px] sm:min-h-[98px] text-center active:scale-95 ${
                    settings.colorShift > 0
                      ? 'bg-[#EDF5F2] border-[#1C3F35] shadow-xs ring-1 ring-[#1C3F35]'
                      : 'bg-[#F9FAF8] border-[#E8E8E0] hover:bg-white hover:border-[#1C3F35]/40 hover:shadow-xs'
                  }`}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="#1C3F35" strokeWidth="2" />
                    <path d="M12 3A9 9 0 0 1 12 21V3Z" fill="#F472B6" />
                  </svg>
                  <span className="text-[11px] sm:text-[12px] font-semibold text-[#1C3F35] mt-1.5 tracking-tight leading-tight line-clamp-1">
                    Color Shift
                  </span>
                  {renderDashes(settings.colorShift, 4)}
                </button>

                {/* 6. Saturation (4 levels) */}
                <button
                  type="button"
                  onClick={() => cycleSetting('saturation', 4)}
                  className={`relative flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border transition-all cursor-pointer min-h-[86px] sm:min-h-[98px] text-center active:scale-95 ${
                    settings.saturation > 0
                      ? 'bg-[#EDF5F2] border-[#1C3F35] shadow-xs ring-1 ring-[#1C3F35]'
                      : 'bg-[#F9FAF8] border-[#E8E8E0] hover:bg-white hover:border-[#1C3F35]/40 hover:shadow-xs'
                  }`}
                >
                  <svg width="28" height="22" viewBox="0 0 28 20" fill="none" className="my-0.5">
                    <circle cx="7" cy="10" r="5" fill="#EF4444" />
                    <circle cx="14" cy="10" r="5" fill="#3B82F6" />
                    <circle cx="21" cy="10" r="5" fill="#10B981" />
                  </svg>
                  <span className="text-[11px] sm:text-[12px] font-semibold text-[#1C3F35] mt-1.5 tracking-tight leading-tight line-clamp-1">
                    Saturation
                  </span>
                  {renderDashes(settings.saturation, 4)}
                </button>

                {/* 7. Animation */}
                <button
                  type="button"
                  onClick={() => updateSetting('animation', (v) => !v)}
                  className={`relative flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border transition-all cursor-pointer min-h-[86px] sm:min-h-[98px] text-center active:scale-95 ${
                    settings.animation
                      ? 'bg-[#EDF5F2] border-[#1C3F35] shadow-xs ring-1 ring-[#1C3F35]'
                      : 'bg-[#F9FAF8] border-[#E8E8E0] hover:bg-white hover:border-[#1C3F35]/40 hover:shadow-xs'
                  }`}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1C3F35" strokeWidth="2" strokeLinecap="round">
                    <line x1="10" y1="9" x2="10" y2="15" strokeWidth="2.5" />
                    <line x1="14" y1="9" x2="14" y2="15" strokeWidth="2.5" />
                    <circle cx="12" cy="12" r="9" strokeDasharray="2.5 3.5" strokeWidth="2" />
                  </svg>
                  <span className="text-[11px] sm:text-[12px] font-semibold text-[#1C3F35] mt-1.5 tracking-tight leading-tight line-clamp-1">
                    Animation
                  </span>
                </button>

                {/* 8. Text Size (4 levels) */}
                <button
                  type="button"
                  onClick={() => cycleSetting('textSize', 4)}
                  className={`relative flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border transition-all cursor-pointer min-h-[86px] sm:min-h-[98px] text-center active:scale-95 ${
                    settings.textSize > 0
                      ? 'bg-[#EDF5F2] border-[#1C3F35] shadow-xs ring-1 ring-[#1C3F35]'
                      : 'bg-[#F9FAF8] border-[#E8E8E0] hover:bg-white hover:border-[#1C3F35]/40 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-baseline gap-1 my-0.5 text-[#1C3F35] font-serif font-black select-none">
                    <span className="text-sm">T</span>
                    <span className="text-xl">T</span>
                  </div>
                  <span className="text-[11px] sm:text-[12px] font-semibold text-[#1C3F35] mt-1.5 tracking-tight leading-tight line-clamp-1">
                    Text Size
                  </span>
                  {renderDashes(settings.textSize, 4)}
                </button>

                {/* 9. Spacing (4 levels) */}
                <button
                  type="button"
                  onClick={() => cycleSetting('spacing', 4)}
                  className={`relative flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border transition-all cursor-pointer min-h-[86px] sm:min-h-[98px] text-center active:scale-95 ${
                    settings.spacing > 0
                      ? 'bg-[#EDF5F2] border-[#1C3F35] shadow-xs ring-1 ring-[#1C3F35]'
                      : 'bg-[#F9FAF8] border-[#E8E8E0] hover:bg-white hover:border-[#1C3F35]/40 hover:shadow-xs'
                  }`}
                >
                  <div className="flex flex-col items-center justify-center text-[#1C3F35]">
                    <span className="text-sm font-black tracking-tight leading-none">AV</span>
                    <svg width="22" height="10" viewBox="0 0 22 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1">
                      <path d="M4 5L1 5M1 5L3 3M1 5L3 7" />
                      <path d="M1 5H21" />
                      <path d="M18 5L21 5M21 5L19 3M21 5L19 7" />
                    </svg>
                  </div>
                  <span className="text-[11px] sm:text-[12px] font-semibold text-[#1C3F35] mt-1.5 tracking-tight leading-tight line-clamp-1">
                    Spacing
                  </span>
                  {renderDashes(settings.spacing, 4)}
                </button>

                {/* 10. Line Height (4 levels) */}
                <button
                  type="button"
                  onClick={() => cycleSetting('lineHeight', 4)}
                  className={`relative flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border transition-all cursor-pointer min-h-[86px] sm:min-h-[98px] text-center active:scale-95 ${
                    settings.lineHeight > 0
                      ? 'bg-[#EDF5F2] border-[#1C3F35] shadow-xs ring-1 ring-[#1C3F35]'
                      : 'bg-[#F9FAF8] border-[#E8E8E0] hover:bg-white hover:border-[#1C3F35]/40 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-[#1C3F35]">
                    <svg width="10" height="20" viewBox="0 0 10 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 1L2 4M5 1L8 4M5 1V19M5 19L2 16M5 19L8 16" />
                    </svg>
                    <div className="flex flex-col gap-1.5">
                      <span className="w-4 h-0.5 bg-[#1C3F35] rounded-full" />
                      <span className="w-4 h-0.5 bg-[#1C3F35] rounded-full" />
                      <span className="w-4 h-0.5 bg-[#1C3F35] rounded-full" />
                    </div>
                  </div>
                  <span className="text-[11px] sm:text-[12px] font-semibold text-[#1C3F35] mt-1.5 tracking-tight leading-tight line-clamp-1">
                    Line Height
                  </span>
                  {renderDashes(settings.lineHeight, 4)}
                </button>

                {/* 11. Align (4 levels) */}
                <button
                  type="button"
                  onClick={() => cycleSetting('align', 4)}
                  className={`relative flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border transition-all cursor-pointer min-h-[86px] sm:min-h-[98px] text-center active:scale-95 ${
                    settings.align > 0
                      ? 'bg-[#EDF5F2] border-[#1C3F35] shadow-xs ring-1 ring-[#1C3F35]'
                      : 'bg-[#F9FAF8] border-[#E8E8E0] hover:bg-white hover:border-[#1C3F35]/40 hover:shadow-xs'
                  }`}
                >
                  <div className="flex flex-col items-center gap-1 text-[#1C3F35] my-1">
                    <span className="w-5 h-0.5 bg-[#1C3F35] rounded-full" />
                    <span className="w-3.5 h-0.5 bg-[#1C3F35] rounded-full" />
                    <span className="w-5 h-0.5 bg-[#1C3F35] rounded-full" />
                    <span className="w-3 h-0.5 bg-[#1C3F35] rounded-full" />
                  </div>
                  <span className="text-[11px] sm:text-[12px] font-semibold text-[#1C3F35] mt-1.5 tracking-tight leading-tight line-clamp-1">
                    Align
                  </span>
                  {renderDashes(settings.align, 4)}
                </button>

                {/* 12. Font (4 levels) */}
                <button
                  type="button"
                  onClick={() => cycleSetting('font', 4)}
                  className={`relative flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border transition-all cursor-pointer min-h-[86px] sm:min-h-[98px] text-center active:scale-95 ${
                    settings.font > 0
                      ? 'bg-[#EDF5F2] border-[#1C3F35] shadow-xs ring-1 ring-[#1C3F35]'
                      : 'bg-[#F9FAF8] border-[#E8E8E0] hover:bg-white hover:border-[#1C3F35]/40 hover:shadow-xs'
                  }`}
                >
                  <div className="flex flex-col items-center text-[#1C3F35] select-none my-0.5">
                    <span className="text-sm font-bold tracking-normal leading-tight font-sans">Aa</span>
                    <span className="w-5 h-0.5 bg-[#1C3F35] rounded-full mt-0.5" />
                  </div>
                  <span className="text-[11px] sm:text-[12px] font-semibold text-[#1C3F35] mt-1.5 tracking-tight leading-tight line-clamp-1">
                    Font
                  </span>
                  {renderDashes(settings.font, 4)}
                </button>

                {/* 13. Guide */}
                <button
                  type="button"
                  onClick={() => updateSetting('guide', (v) => !v)}
                  className={`relative flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border transition-all cursor-pointer min-h-[86px] sm:min-h-[98px] text-center active:scale-95 ${
                    settings.guide
                      ? 'bg-[#EDF5F2] border-[#1C3F35] shadow-xs ring-1 ring-[#1C3F35]'
                      : 'bg-[#F9FAF8] border-[#E8E8E0] hover:bg-white hover:border-[#1C3F35]/40 hover:shadow-xs'
                  }`}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1C3F35" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="3" y1="12" x2="21" y2="12" strokeDasharray="1 3" strokeWidth="3" />
                  </svg>
                  <span className="text-[11px] sm:text-[12px] font-semibold text-[#1C3F35] mt-1.5 tracking-tight leading-tight line-clamp-1">
                    Guide
                  </span>
                </button>

                {/* 14. Window */}
                <button
                  type="button"
                  onClick={() => updateSetting('windowMask', (v) => !v)}
                  className={`relative flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border transition-all cursor-pointer min-h-[86px] sm:min-h-[98px] text-center active:scale-95 ${
                    settings.windowMask
                      ? 'bg-[#EDF5F2] border-[#1C3F35] shadow-xs ring-1 ring-[#1C3F35]'
                      : 'bg-[#F9FAF8] border-[#E8E8E0] hover:bg-white hover:border-[#1C3F35]/40 hover:shadow-xs'
                  }`}
                >
                  <div className="flex flex-col gap-1 w-6 items-center my-0.5">
                    <span className="w-6 h-2 bg-[#1C3F35] rounded-xs" />
                    <span className="w-5 h-2.5 border border-[#1C3F35] rounded-xs bg-white" />
                    <span className="w-6 h-2 bg-[#1C3F35] rounded-xs" />
                  </div>
                  <span className="text-[11px] sm:text-[12px] font-semibold text-[#1C3F35] mt-1.5 tracking-tight leading-tight line-clamp-1">
                    Window
                  </span>
                </button>

                {/* 15. Images */}
                <button
                  type="button"
                  onClick={() => updateSetting('hideImages', (v) => !v)}
                  className={`relative flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border transition-all cursor-pointer min-h-[86px] sm:min-h-[98px] text-center active:scale-95 ${
                    settings.hideImages
                      ? 'bg-[#EDF5F2] border-[#1C3F35] shadow-xs ring-1 ring-[#1C3F35]'
                      : 'bg-[#F9FAF8] border-[#E8E8E0] hover:bg-white hover:border-[#1C3F35]/40 hover:shadow-xs'
                  }`}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1C3F35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" fill="#1C3F35" />
                  </svg>
                  <span className="text-[11px] sm:text-[12px] font-semibold text-[#1C3F35] mt-1.5 tracking-tight leading-tight line-clamp-1">
                    Images
                  </span>
                </button>

                {/* 16. Read Aloud */}
                <button
                  type="button"
                  onClick={handleReadAloud}
                  className={`relative flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border transition-all cursor-pointer min-h-[86px] sm:min-h-[98px] text-center active:scale-95 ${
                    isSpeaking
                      ? 'bg-[#EDF5F2] border-[#1C3F35] shadow-xs ring-1 ring-[#1C3F35] animate-pulse'
                      : 'bg-[#F9FAF8] border-[#E8E8E0] hover:bg-white hover:border-[#1C3F35]/40 hover:shadow-xs'
                  }`}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1C3F35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="#1C3F35" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  </svg>
                  <span className="text-[11px] sm:text-[12px] font-semibold text-[#1C3F35] mt-1.5 tracking-tight leading-tight line-clamp-1">
                    Read Aloud
                  </span>
                </button>

                {/* 17. Voice */}
                <button
                  type="button"
                  onClick={() => updateSetting('voice', (v) => !v)}
                  className={`relative flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border transition-all cursor-pointer min-h-[86px] sm:min-h-[98px] text-center active:scale-95 ${
                    settings.voice
                      ? 'bg-[#EDF5F2] border-[#1C3F35] shadow-xs ring-1 ring-[#1C3F35]'
                      : 'bg-[#F9FAF8] border-[#E8E8E0] hover:bg-white hover:border-[#1C3F35]/40 hover:shadow-xs'
                  }`}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1C3F35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="2" width="6" height="11" rx="3" fill="#1C3F35" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                    <line x1="8" y1="23" x2="16" y2="23" />
                  </svg>
                  <span className="text-[11px] sm:text-[12px] font-semibold text-[#1C3F35] mt-1.5 tracking-tight leading-tight line-clamp-1">
                    Voice
                  </span>
                </button>

                {/* 18. Alt Text */}
                <button
                  type="button"
                  onClick={handleToggleAltText}
                  className={`relative flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border transition-all cursor-pointer min-h-[86px] sm:min-h-[98px] text-center active:scale-95 ${
                    settings.altText
                      ? 'bg-[#EDF5F2] border-[#1C3F35] shadow-xs ring-1 ring-[#1C3F35]'
                      : 'bg-[#F9FAF8] border-[#E8E8E0] hover:bg-white hover:border-[#1C3F35]/40 hover:shadow-xs'
                  }`}
                >
                  <svg width="26" height="24" viewBox="0 0 24 24" fill="none" stroke="#1C3F35" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" fill="#1C3F35" />
                    <polyline points="21 15 16 10 5 21" />
                    <rect x="11" y="14" width="9" height="6" rx="1" fill="#1C3F35" stroke="none" />
                    <text x="12" y="18.5" fill="#FFFFFF" fontSize="4.5" fontWeight="bold" fontFamily="sans-serif">ALT</text>
                  </svg>
                  <span className="text-[11px] sm:text-[12px] font-semibold text-[#1C3F35] mt-1.5 tracking-tight leading-tight line-clamp-1">
                    Alt Text
                  </span>
                </button>

                {/* 19. Hover Highlight */}
                <button
                  type="button"
                  onClick={() => updateSetting('hoverHighlight', (v) => !v)}
                  className={`relative flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border transition-all cursor-pointer min-h-[86px] sm:min-h-[98px] text-center active:scale-95 ${
                    settings.hoverHighlight
                      ? 'bg-[#EDF5F2] border-[#1C3F35] shadow-xs ring-1 ring-[#1C3F35]'
                      : 'bg-[#F9FAF8] border-[#E8E8E0] hover:bg-white hover:border-[#1C3F35]/40 hover:shadow-xs'
                  }`}
                >
                  <div className="relative w-6 h-6 flex items-center justify-center">
                    <svg width="22" height="18" viewBox="0 0 20 16" fill="none" stroke="#1C3F35" strokeWidth="1.8">
                      <rect x="1" y="1" width="18" height="14" rx="2" />
                    </svg>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#1C3F35" stroke="#FFFFFF" strokeWidth="2" className="absolute -bottom-1 -right-1">
                      <path d="M4 4L11 20L14 13L21 10L4 4Z" />
                    </svg>
                  </div>
                  <span className="text-[11px] sm:text-[12px] font-semibold text-[#1C3F35] mt-1.5 tracking-tight leading-tight line-clamp-1">
                    Hover Highlight
                  </span>
                </button>

                {/* 20. Big Buttons */}
                <button
                  type="button"
                  onClick={() => updateSetting('bigButtons', (v) => !v)}
                  className={`relative flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border transition-all cursor-pointer min-h-[86px] sm:min-h-[98px] text-center active:scale-95 ${
                    settings.bigButtons
                      ? 'bg-[#EDF5F2] border-[#1C3F35] shadow-xs ring-1 ring-[#1C3F35]'
                      : 'bg-[#F9FAF8] border-[#E8E8E0] hover:bg-white hover:border-[#1C3F35]/40 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-center px-2 py-0.5 rounded-md border-2 border-[#1C3F35] text-[#1C3F35]">
                    <svg width="16" height="10" viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 5L1 5M1 5L3 3M1 5L3 7" />
                      <path d="M1 5H15" />
                      <path d="M13 5L15 5M15 5L13 3M15 5L13 7" />
                    </svg>
                  </div>
                  <span className="text-[11px] sm:text-[12px] font-semibold text-[#1C3F35] mt-1.5 tracking-tight leading-tight line-clamp-1">
                    Big Buttons
                  </span>
                </button>

                {/* 21. Mute Media */}
                <button
                  type="button"
                  onClick={() => updateSetting('muteMedia', (v) => !v)}
                  className={`relative flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border transition-all cursor-pointer min-h-[86px] sm:min-h-[98px] text-center active:scale-95 ${
                    settings.muteMedia
                      ? 'bg-[#EDF5F2] border-[#1C3F35] shadow-xs ring-1 ring-[#1C3F35]'
                      : 'bg-[#F9FAF8] border-[#E8E8E0] hover:bg-white hover:border-[#1C3F35]/40 hover:shadow-xs'
                  }`}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1C3F35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="#1C3F35" />
                    <line x1="22" y1="9" x2="16" y2="15" />
                    <line x1="16" y1="9" x2="22" y2="15" />
                  </svg>
                  <span className="text-[11px] sm:text-[12px] font-semibold text-[#1C3F35] mt-1.5 tracking-tight leading-tight line-clamp-1">
                    Mute Media
                  </span>
                </button>

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
