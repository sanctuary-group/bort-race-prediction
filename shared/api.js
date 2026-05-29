// ========================================
// APIクライアント (V2)
// ========================================

const API_BASE_URL = '';

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
  return apiGet(`/v2/estimates?date=${date}`);
}

/**
 * 単一レース予想取得
 * @param {string} raceCode - YYYYMMDDJJRR 形式
 * @returns {Promise<Object>}
 */
async function fetchEstimate(raceCode) {
  return apiGet(`/v2/estimates/${raceCode}`);
}

/**
 * 指定日の全レース出走表一覧（V2 で新規追加）
 * @param {string} date - YYYY-MM-DD
 * @returns {Promise<{data: Array}>}
 */
async function fetchRacesByDate(date) {
  return apiGet(`/v2/races?date=${date}`);
}

/**
 * 単一レース出走表取得
 * @param {string} raceCode - YYYYMMDDJJRR 形式
 * @returns {Promise<Object>}
 */
async function fetchRace(raceCode) {
  return apiGet(`/v2/races/${raceCode}`);
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

/**
 * V2Estimate の predictions[] から logicKey に対応するものを取り出す
 * @param {Object|null} estimate
 * @param {'A'|'B'|'C'} logicKey
 * @returns {Object|null}
 */
function pickPrediction(estimate, logicKey) {
  if (!estimate || !Array.isArray(estimate.predictions)) return null;
  return estimate.predictions.find(p => p.logicKey === logicKey) ?? null;
}

/**
 * 日付から races と estimates を同時取得し raceCode で結合した一覧を返す
 * @param {string} date - YYYY-MM-DD
 * @returns {Promise<{races: Array, estimates: Array, estByCode: Map<string, Object>}>}
 */
async function fetchDailyRaceList(date) {
  const [racesRes, estimatesRes] = await Promise.all([
    fetchRacesByDate(date).catch(() => ({ data: [] })),
    fetchEstimatesByDate(date).catch(() => ({ data: [] })),
  ]);
  const races = racesRes.data || [];
  const estimates = estimatesRes.data || [];
  const estByCode = new Map(estimates.map(e => [e.raceCode, e]));
  return { races, estimates, estByCode };
}
