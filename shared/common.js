// ========================================
// 共通ユーティリティ
// ========================================

// 艇番カラー定義
const BOAT_COLORS = {
  1: { bg: 'bg-white', text: 'text-gray-900', border: 'border border-gold/20' },
  2: { bg: 'bg-black', text: 'text-white', border: '' },
  3: { bg: 'bg-red-500', text: 'text-white', border: '' },
  4: { bg: 'bg-blue-500', text: 'text-white', border: '' },
  5: { bg: 'bg-yellow-400', text: 'text-gray-900', border: '' },
  6: { bg: 'bg-green-500', text: 'text-white', border: '' }
};

// 艇番バッジHTML生成
function getBoatBadge(number, size = 'md') {
  const color = BOAT_COLORS[number];
  if (!color) return '';
  const sizeClass = size === 'lg' ? 'w-12 h-12 text-lg' : size === 'sm' ? 'w-6 h-6 text-xs' : 'w-8 h-8 text-sm';
  const shadowClass = size === 'lg' ? 'shadow-elevation-2' : 'shadow-elevation-1';
  const glowStyle = size === 'lg' ? ' style="box-shadow: 0 4px 12px rgba(0,0,0,0.3), 0 0 12px rgba(176,154,92,0.15)"' : '';
  return `<span class="inline-flex items-center justify-center ${sizeClass} rounded-full ${color.bg} ${color.text} ${color.border} font-bold ${shadowClass}"${glowStyle}>${number}</span>`;
}

// 予想着順を矢印付きで表示
function renderPredictionOrder(boats, size = 'md') {
  const arrowClass = size === 'lg' ? 'mx-2 text-gold/60 text-sm' : 'mx-1.5 text-warm-gray/50 text-xs';
  return boats.map(n => getBoatBadge(n, size)).join(`<span class="${arrowClass}"><i class="fa-solid fa-chevron-right"></i></span>`);
}

// 級別表示のクラス
function getClassStyle(classNumber) {
  switch (classNumber) {
    case 1: return 'text-gold-warm font-bold';
    case 2: return 'text-gold-warm font-semibold';
    case 3: return 'text-warm-text';
    case 4: return 'text-warm-gray';
    default: return 'text-warm-gray';
  }
}

// ステータスバッジ生成
function getStatusBadge(status) {
  const styles = {
    '有効': 'bg-status-success-bg text-status-success',
    '停止': 'bg-status-error-bg text-status-error',
    '保留': 'bg-status-warning-bg text-gold-dark',
    'テスト中': 'bg-status-purple-bg text-status-purple',
    '決済済': 'bg-status-success-bg text-status-success',
    '未決済': 'bg-status-info-bg text-warm-gray'
  };
  const style = styles[status] || 'bg-status-info-bg text-warm-gray';
  return `<span class="badge-premium ${style}">${status}</span>`;
}

// 信頼度バー生成
function getConfidenceBar(percent) {
  const color = percent >= 75 ? 'bg-status-success' : percent >= 50 ? 'bg-gold' : 'bg-gold-dark';
  const glowClass = percent >= 75 ? 'confidence-bar-glow-success' : percent >= 50 ? 'confidence-bar-glow' : '';
  return `
    <div class="flex items-center gap-3">
      <div class="flex-1 bg-dark-surface rounded-full h-2 overflow-hidden">
        <div class="${color} ${glowClass} h-2 rounded-full transition-all duration-800 ease-premium" style="width: ${percent}%"></div>
      </div>
      <span class="text-sm font-mono font-bold text-gold-warm tracking-tight">${percent}%</span>
    </div>`;
}

// 予想着順エリアのキラキラパーティクル生成
function initPredictionSparkles() {
  document.querySelectorAll('.prediction-sparkles').forEach(container => {
    if (container.children.length > 0) return;

    // 大きな四角星スパークル（目立つメイン）
    for (let i = 0; i < 5; i++) {
      const star = document.createElement('span');
      star.className = 'prediction-star';
      star.style.left = (10 + Math.random() * 80) + '%';
      star.style.top = (10 + Math.random() * 80) + '%';
      star.style.setProperty('--dur', (2.5 + Math.random() * 3) + 's');
      star.style.setProperty('--delay', (Math.random() * 6) + 's');
      star.style.setProperty('--peak', (0.7 + Math.random() * 0.3).toFixed(2));
      const size = (18 + Math.random() * 16) + 'px';
      star.style.width = size;
      star.style.height = size;
      container.appendChild(star);
    }

    // 細かいキラキラ粒子（たくさん散らばる）
    for (let i = 0; i < 100; i++) {
      const glitter = document.createElement('span');
      glitter.className = 'prediction-glitter';
      glitter.style.left = (1 + Math.random() * 98) + '%';
      glitter.style.top = (1 + Math.random() * 98) + '%';
      glitter.style.setProperty('--dur', (1.5 + Math.random() * 3) + 's');
      glitter.style.setProperty('--delay', (Math.random() * 8) + 's');
      glitter.style.setProperty('--peak', (0.3 + Math.random() * 0.7).toFixed(2));
      const size = (1.5 + Math.random() * 4) + 'px';
      glitter.style.width = size;
      glitter.style.height = size;
      container.appendChild(glitter);
    }
  });
}

// 日付フォーマット
function formatDate(dateStr) {
  const d = new Date(dateStr);
  const days = ['日', '月', '火', '水', '木', '金', '土'];
  return `${d.getMonth() + 1}/${d.getDate()} (${days[d.getDay()]})`;
}

// 今週の日付リスト取得
function getWeekDates() {
  const today = new Date('2026-02-23');
  const monday = new Date(today);
  monday.setDate(today.getDate() - today.getDay() + 1);
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    dates.push(d.toISOString().split('T')[0]);
  }
  return dates;
}
