// ========================================
// APIクライアント
// ========================================

const API_BASE_URL = 'http://localhost:3000';

/**
 * GET リクエスト共通処理
 */
async function apiGet(path) {
  const res = await fetch(`${API_BASE_URL}${path}`);
  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.error?.message || `API error: ${res.status}`);
  }
  return res.json();
}

/**
 * ヘルスチェック
 * @returns {Promise<{status: string}>}
 */
async function checkHealth() {
  return apiGet('/health');
}

/**
 * 指定日の全レース予想一覧
 * @param {string} date - YYYY-MM-DD
 * @returns {Promise<{data: Array}>}
 */
async function fetchEstimatesByDate(date) {
  return apiGet(`/v1/estimates?date=${date}`);
}

/**
 * 単一レース予想取得
 * @param {string} raceCode - YYYYMMDDJJRR 形式
 * @returns {Promise<Object>}
 */
async function fetchEstimate(raceCode) {
  return apiGet(`/v1/estimates/${raceCode}`);
}

/**
 * raceCode 組み立てヘルパー
 * @param {string} date - YYYY-MM-DD
 * @param {number|string} venueCode - 会場番号 (1-24)
 * @param {number|string} raceNumber - レース番号 (1-12)
 * @returns {string} YYYYMMDDJJRR
 */
function buildRaceCode(date, venueCode, raceNumber) {
  const d = date.replace(/-/g, '');
  const v = String(venueCode).padStart(2, '0');
  const r = String(raceNumber).padStart(2, '0');
  return `${d}${v}${r}`;
}
