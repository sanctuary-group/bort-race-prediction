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
  const separator = `<span class="${arrowClass}"><i class="fa-solid fa-chevron-right"></i></span>`;

  if (size === 'lg') {
    const rankStyles = [
      { crown: '#d4c28a', label: '1st', filter: 'filter:brightness(0) invert(1) sepia(1) saturate(3) hue-rotate(10deg) brightness(0.85)', gradient: 'linear-gradient(135deg, #d4c28a, #b09a5c, #d4c28a)', glow: '0 0 12px rgba(176,154,92,0.4), 0 0 24px rgba(212,194,138,0.15)' },
      { crown: '#b0b0b0', label: '2nd', filter: 'filter:brightness(0) invert(1) sepia(0) saturate(0) brightness(0.75)', gradient: 'linear-gradient(135deg, #c0c0c0, #8a8a8a, #c0c0c0)', glow: '0 0 8px rgba(160,160,160,0.3)' },
      { crown: '#cd7f32', label: '3rd', filter: 'filter:brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(345deg) brightness(0.6)', gradient: 'linear-gradient(135deg, #cd7f32, #a0622d, #cd7f32)', glow: '0 0 8px rgba(141,125,63,0.3)' }
    ];

    return boats.map((n, i) => {
      if (i < 3) {
        const s = rankStyles[i];
        return `<div class="flex flex-col items-center" style="gap:2px">` +
          `<i class="fa-solid fa-crown" style="color:${s.crown};font-size:0.85rem;filter:drop-shadow(0 1px 2px rgba(0,0,0,0.4))"></i>` +
          `<div style="position:relative;width:60px;height:60px">` +
            `<img src="../shared/assets/wreath.png" style="width:100%;height:100%;${s.filter}" alt="">` +
            `<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:2"><div style="border-radius:50%;padding:3px;background:${s.gradient};box-shadow:${s.glow}">${getBoatBadge(n, size)}</div></div>` +
          `</div>` +
          `<span style="font-size:0.55rem;font-weight:700;color:${s.crown};letter-spacing:0.05em">${s.label}</span>` +
        `</div>`;
      }
      return `<div class="flex flex-col items-center">${getBoatBadge(n, size)}</div>`;
    }).join(separator);
  }

  return boats.map(n => getBoatBadge(n, size)).join(separator);
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

// 予想着順エリアのキラキラパーティクル生成（canvas版: DOM要素の代わりに1枚のcanvasで描画）
function initPredictionSparkles() {
  function lerp(a, b, t) { return a + (b - a) * t; }

  function getStarState(p, now) {
    const t = ((now + p.delay) % p.dur) / p.dur;
    let opacity, scale, rotate;
    if      (t < 0.2) { const u = t / 0.2;        opacity = lerp(0,           p.peak,       u); scale = lerp(0.2, 1,   u); rotate = lerp(0,  15, u); }
    else if (t < 0.4) { const u = (t - 0.2) / 0.2; opacity = lerp(p.peak,      p.peak * 0.5, u); scale = lerp(1,   0.7, u); rotate = lerp(15, 25, u); }
    else if (t < 0.6) { const u = (t - 0.4) / 0.2; opacity = lerp(p.peak*0.5,  p.peak,       u); scale = lerp(0.7, 1.1, u); rotate = lerp(25, 35, u); }
    else if (t < 0.8) { const u = (t - 0.6) / 0.2; opacity = lerp(p.peak,      p.peak * 0.3, u); scale = lerp(1.1, 0.5, u); rotate = lerp(35, 45, u); }
    else               { const u = (t - 0.8) / 0.2; opacity = lerp(p.peak*0.3,  0,            u); scale = lerp(0.5, 0.2, u); rotate = lerp(45, 0,  u); }
    return { opacity, scale, rotate };
  }

  function getGlitterState(p, now) {
    const t = ((now + p.delay) % p.dur) / p.dur;
    let opacity, scale;
    if      (t < 0.3) { const u = t / 0.3;        opacity = lerp(0,          p.peak,       u); scale = lerp(0.3, 1,   u); }
    else if (t < 0.5) { const u = (t - 0.3) / 0.2; opacity = lerp(p.peak,     p.peak * 0.4, u); scale = lerp(1,   0.6, u); }
    else if (t < 0.7) { const u = (t - 0.5) / 0.2; opacity = lerp(p.peak*0.4, p.peak,       u); scale = lerp(0.6, 1.2, u); }
    else               { const u = (t - 0.7) / 0.3; opacity = lerp(p.peak,     0,            u); scale = lerp(1.2, 0.3, u); }
    return { opacity, scale };
  }

  // 4点星（clip-path: polygon と同じ形状）
  function drawStarShape(ctx, r) {
    const pts = [[0,-1],[0.16,-0.24],[1,0],[0.16,0.24],[0,1],[-0.16,0.24],[-1,0],[-0.16,-0.24]];
    ctx.beginPath();
    pts.forEach(([dx, dy], i) => {
      i === 0 ? ctx.moveTo(dx * r, dy * r) : ctx.lineTo(dx * r, dy * r);
    });
    ctx.closePath();
  }

  document.querySelectorAll('.prediction-sparkles').forEach(container => {
    if (container.dataset.canvasInit) return;
    container.dataset.canvasInit = '1';

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none';
    container.appendChild(canvas);

    // パーティクルデータ生成（DOMではなくJSオブジェクト）
    const stars = Array.from({length: 5}, () => ({
      x: 10 + Math.random() * 80, y: 10 + Math.random() * 80,
      size: 18 + Math.random() * 16,
      dur: (2.5 + Math.random() * 3) * 1000,
      delay: Math.random() * 6000,
      peak: 0.7 + Math.random() * 0.3,
    }));
    const glitters = Array.from({length: 100}, () => ({
      x: 1 + Math.random() * 98, y: 1 + Math.random() * 98,
      size: 1.5 + Math.random() * 4,
      dur: (1.5 + Math.random() * 3) * 1000,
      delay: Math.random() * 8000,
      peak: 0.3 + Math.random() * 0.7,
    }));

    let rafId = null;
    let cw = 0, ch = 0;

    function draw() {
      if (!container.isConnected) { rafId = null; return; }
      const w = container.offsetWidth, h = container.offsetHeight;
      if (w !== cw || h !== ch) { cw = w; ch = h; canvas.width = w; canvas.height = h; }

      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, cw, ch);
      const now = Date.now();

      // 星を描画
      stars.forEach(p => {
        const { opacity, scale, rotate } = getStarState(p, now);
        if (opacity <= 0.01) return;
        const r = (p.size * scale) / 2;
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
        grad.addColorStop(0,   'rgba(255,240,150,0.95)');
        grad.addColorStop(0.4, 'rgba(255,220,80,0.4)');
        grad.addColorStop(1,   'rgba(255,220,80,0)');
        ctx.save();
        ctx.translate(p.x / 100 * cw, p.y / 100 * ch);
        ctx.rotate(rotate * Math.PI / 180);
        ctx.globalAlpha = opacity;
        ctx.fillStyle = grad;
        drawStarShape(ctx, r);
        ctx.fill();
        ctx.restore();
      });

      // グリッターを描画
      ctx.fillStyle = 'rgba(255,235,150,0.9)';
      glitters.forEach(p => {
        const { opacity, scale } = getGlitterState(p, now);
        if (opacity <= 0.01) return;
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.arc(p.x / 100 * cw, p.y / 100 * ch, (p.size * scale) / 2, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(draw);
    }

    container._startSparkles = () => { if (!rafId) rafId = requestAnimationFrame(draw); };
    container._stopSparkles  = () => { if (rafId) { cancelAnimationFrame(rafId); rafId = null; } };
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
