// ========================================
// 共通ヘッダー/ナビゲーション動的挿入
// ========================================

// テーマ初期化（FOUC防止のため最速で実行）
(function() {
  const saved = localStorage.getItem('bp-theme');
  if (saved === 'light') document.body.classList.add('light-mode');
})();

document.addEventListener('DOMContentLoaded', function () {
  const headerEl = document.getElementById('app-header');
  if (!headerEl) return;

  const path = window.location.pathname;
  const isAdmin = path.includes('/admin/');
  const isLoginPage = path.includes('login.html');
  const isIndex = path.endsWith('index.html') || path.endsWith('/');

  // ログインページとランディングページではナビなし
  if (isLoginPage || isIndex) {
    headerEl.innerHTML = getMinimalHeader(isAdmin);
    initHeaderSparkles();
    initPageBokeh();
    updateToggleIcon();
    return;
  }

  headerEl.innerHTML = isAdmin ? getAdminHeader() : getUserHeader();
  initMobileMenu();
  initHeaderSparkles();
  initPageBokeh();
  updateToggleIcon();
});

// テーマトグルボタンHTML
function getThemeToggleBtn() {
  return `<button id="theme-toggle" onclick="toggleTheme()" class="theme-toggle-btn" title="テーマ切替">
    <i class="fa-solid fa-sun text-base"></i>
  </button>`;
}

// テーマ切替
function toggleTheme() {
  const isLight = document.body.classList.toggle('light-mode');
  localStorage.setItem('bp-theme', isLight ? 'light' : 'dark');
  updateToggleIcon();
}

// トグルアイコン更新（全トグルボタンを更新）
function updateToggleIcon() {
  const isLight = document.body.classList.contains('light-mode');
  const icon = isLight
    ? '<i class="fa-solid fa-moon text-base"></i>'
    : '<i class="fa-solid fa-sun text-base"></i>';
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.innerHTML = icon;
  document.querySelectorAll('.theme-toggle-icon').forEach(el => {
    el.innerHTML = icon;
  });
}

function getMinimalHeader(isAdmin) {
  return `
    <header class="header-premium sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex-1"></div>
          <a href="${isAdmin ? '../index.html' : '../index.html'}" class="flex items-center gap-2">
            <i class="fa-solid fa-ship text-gold-shine text-xl"></i>
            <span class="text-xl font-bold text-gold-gradient font-heading">BOAT</span>
            <span class="text-xl font-bold text-cream font-heading">PREDICTOR</span>
            ${isAdmin ? '<span class="text-[0.625rem] font-bold text-gold-light ml-2 px-2 py-0.5 bg-gold/10 rounded-md tracking-wider">ADMIN</span>' : ''}
          </a>
          <div class="flex-1 flex justify-end">
            ${getThemeToggleBtn()}
          </div>
        </div>
      </div>
      <div class="header-sparkles"></div>
    </header>`;
}

function getUserHeader() {
  return `
    <header class="header-premium sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <a href="../index.html" class="flex items-center gap-1.5 sm:gap-2">
            <i class="fa-solid fa-ship text-gold-shine text-lg sm:text-xl"></i>
            <span class="text-lg sm:text-xl font-bold text-gold-gradient font-heading">BOAT</span>
            <span class="text-lg sm:text-xl font-bold text-cream font-heading">PREDICTOR</span>
          </a>
          <nav class="flex items-center space-x-4 sm:space-x-6">
            <a href="predict.html" class="text-warm-text/80 hover:text-cream transition-all duration-400 flex items-center gap-1.5 text-sm">
              <i class="fa-solid fa-chart-line text-lg sm:text-sm"></i><span class="hidden sm:inline">予測</span>
            </a>
            <a href="weekly.html" class="text-warm-text/80 hover:text-cream transition-all duration-400 flex items-center gap-1.5 text-sm">
              <i class="fa-solid fa-calendar-week text-lg sm:text-sm"></i><span class="hidden sm:inline">今週の一覧</span>
            </a>
            ${getThemeToggleBtn()}
            <a href="login.html" class="text-warm-gray/60 hover:text-status-error transition-all duration-400 flex items-center gap-1.5 text-sm">
              <i class="fa-solid fa-right-from-bracket text-lg sm:text-sm"></i>
            </a>
          </nav>
        </div>
      </div>
      <div class="header-sparkles"></div>
    </header>`;
}

function getAdminHeader() {
  return `
    <header class="header-premium sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <a href="../index.html" class="flex items-center gap-2">
            <i class="fa-solid fa-ship text-gold-shine text-xl"></i>
            <span class="text-xl font-bold text-gold-gradient font-heading">BOAT</span>
            <span class="text-xl font-bold text-cream font-heading">PREDICTOR</span>
            <span class="text-[0.625rem] font-bold text-gold-light ml-2 px-2 py-0.5 bg-gold/10 rounded-md tracking-wider">ADMIN</span>
          </a>
          <nav class="hidden md:flex items-center space-x-6">
            <a href="dashboard.html" class="text-warm-text/80 hover:text-cream transition-all duration-400 flex items-center gap-2 text-sm">
              <i class="fa-solid fa-gauge-high"></i>ダッシュボード
            </a>
            <div class="flex items-center gap-2 text-warm-gray/60">
              <i class="fa-solid fa-user-shield"></i>
              <span class="text-xs">管理者</span>
            </div>
            ${getThemeToggleBtn()}
            <a href="login.html" class="text-warm-gray/60 hover:text-status-error transition-all duration-400 flex items-center gap-2 text-sm">
              <i class="fa-solid fa-right-from-bracket"></i>ログアウト
            </a>
          </nav>
          <div class="flex items-center gap-2 md:hidden">
            <button onclick="toggleTheme()" class="theme-toggle-btn theme-toggle-icon" title="テーマ切替">
              <i class="fa-solid fa-sun text-base"></i>
            </button>
            <button id="mobile-menu-btn" class="text-warm-text/80 hover:text-cream p-2 transition-all duration-400">
              <i class="fa-solid fa-bars text-xl"></i>
            </button>
          </div>
        </div>
        <nav id="mobile-menu" class="hidden md:hidden pb-4 space-y-1" style="transition: max-height 0.4s ease, opacity 0.4s ease;">
          <a href="dashboard.html" class="block px-4 py-2.5 rounded-xl text-warm-text/80 hover:bg-dark-surface hover:text-cream transition-all duration-400">
            <i class="fa-solid fa-gauge-high mr-2"></i>ダッシュボード
          </a>
          <a href="login.html" class="block px-4 py-2.5 rounded-xl text-warm-gray/60 hover:bg-dark-surface hover:text-status-error transition-all duration-400">
            <i class="fa-solid fa-right-from-bracket mr-2"></i>ログアウト
          </a>
        </nav>
      </div>
      <div class="header-sparkles"></div>
    </header>`;
}

function initHeaderSparkles() {
  const container = document.querySelector('.header-sparkles');
  if (!container) return;

  // 小さめのボケ玉
  for (let i = 0; i < 15; i++) {
    const dot = document.createElement('span');
    dot.className = 'header-sparkle';
    dot.style.left = (2 + Math.random() * 96) + '%';
    dot.style.top = (5 + Math.random() * 90) + '%';
    dot.style.setProperty('--dur', (3 + Math.random() * 4) + 's');
    dot.style.setProperty('--delay', (Math.random() * 8) + 's');
    dot.style.setProperty('--peak', (0.4 + Math.random() * 0.4).toFixed(2));
    const size = (12 + Math.random() * 20) + 'px';
    dot.style.width = size;
    dot.style.height = size;
    container.appendChild(dot);
  }

  // 大きなボケ玉
  for (let i = 0; i < 8; i++) {
    const lg = document.createElement('span');
    lg.className = 'header-sparkle-lg';
    lg.style.left = (5 + Math.random() * 90) + '%';
    lg.style.top = (0 + Math.random() * 100) + '%';
    lg.style.setProperty('--dur', (4 + Math.random() * 5) + 's');
    lg.style.setProperty('--delay', (Math.random() * 10) + 's');
    lg.style.setProperty('--peak', (0.3 + Math.random() * 0.35).toFixed(2));
    const size = (30 + Math.random() * 40) + 'px';
    lg.style.width = size;
    lg.style.height = size;
    container.appendChild(lg);
  }

  // アクセントの明るいボケ玉
  for (let i = 0; i < 6; i++) {
    const bright = document.createElement('span');
    bright.className = 'header-sparkle-bright';
    bright.style.left = (10 + Math.random() * 80) + '%';
    bright.style.top = (10 + Math.random() * 80) + '%';
    bright.style.setProperty('--dur', (2.5 + Math.random() * 3) + 's');
    bright.style.setProperty('--delay', (Math.random() * 7) + 's');
    bright.style.setProperty('--peak', (0.6 + Math.random() * 0.4).toFixed(2));
    const size = (6 + Math.random() * 12) + 'px';
    bright.style.width = size;
    bright.style.height = size;
    container.appendChild(bright);
  }
}

// ページ全体のボケ玉パーティクル
function initPageBokeh() {
  const container = document.createElement('div');
  container.className = 'page-bokeh-container';
  document.body.insertBefore(container, document.body.firstChild);

  // 大きなボケ玉（背景）
  for (let i = 0; i < 12; i++) {
    const bokeh = document.createElement('span');
    bokeh.className = 'page-bokeh';
    bokeh.style.left = (Math.random() * 100) + '%';
    bokeh.style.top = (Math.random() * 100) + '%';
    bokeh.style.setProperty('--dur', (6 + Math.random() * 8) + 's');
    bokeh.style.setProperty('--delay', (Math.random() * 12) + 's');
    bokeh.style.setProperty('--peak', (0.2 + Math.random() * 0.3).toFixed(2));
    const size = (40 + Math.random() * 80) + 'px';
    bokeh.style.width = size;
    bokeh.style.height = size;
    container.appendChild(bokeh);
  }

  // 小さめのボケ玉
  for (let i = 0; i < 18; i++) {
    const sm = document.createElement('span');
    sm.className = 'page-bokeh-sm';
    sm.style.left = (Math.random() * 100) + '%';
    sm.style.top = (Math.random() * 100) + '%';
    sm.style.setProperty('--dur', (4 + Math.random() * 6) + 's');
    sm.style.setProperty('--delay', (Math.random() * 10) + 's');
    sm.style.setProperty('--peak', (0.25 + Math.random() * 0.35).toFixed(2));
    const size = (15 + Math.random() * 30) + 'px';
    sm.style.width = size;
    sm.style.height = size;
    container.appendChild(sm);
  }

  // アクセントの明るいボケ玉
  for (let i = 0; i < 8; i++) {
    const bright = document.createElement('span');
    bright.className = 'page-bokeh-bright';
    bright.style.left = (5 + Math.random() * 90) + '%';
    bright.style.top = (5 + Math.random() * 90) + '%';
    bright.style.setProperty('--dur', (3 + Math.random() * 5) + 's');
    bright.style.setProperty('--delay', (Math.random() * 8) + 's');
    bright.style.setProperty('--peak', (0.3 + Math.random() * 0.4).toFixed(2));
    const size = (8 + Math.random() * 16) + 'px';
    bright.style.width = size;
    bright.style.height = size;
    container.appendChild(bright);
  }
}

function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', function () {
    const icon = btn.querySelector('i');
    if (menu.classList.contains('hidden')) {
      menu.classList.remove('hidden');
      menu.style.maxHeight = '0';
      menu.style.overflow = 'hidden';
      menu.style.opacity = '0';
      requestAnimationFrame(() => {
        menu.style.maxHeight = '300px';
        menu.style.opacity = '1';
      });
      icon.className = 'fa-solid fa-xmark text-xl';
    } else {
      menu.style.maxHeight = '0';
      menu.style.opacity = '0';
      setTimeout(() => {
        menu.classList.add('hidden');
        menu.style.removeProperty('max-height');
        menu.style.removeProperty('overflow');
        menu.style.removeProperty('opacity');
      }, 400);
      icon.className = 'fa-solid fa-bars text-xl';
    }
  });
}
