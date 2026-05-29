// ========================================
// ダミーデータ定義 (BoatraceOpenAPI構造準拠)
// ========================================

const STADIUMS = {
  1: '桐生', 2: '戸田', 3: '江戸川', 4: '平和島', 5: '多摩川',
  6: '浜名湖', 7: '蒲郡', 8: '常滑', 9: '津', 10: '三国',
  11: 'びわこ', 12: '住之江', 13: '尼崎', 14: '鳴門', 15: '丸亀',
  16: '児島', 17: '宮島', 18: '徳山', 19: '下関', 20: '若松',
  21: '芦屋', 22: '福岡', 23: '唐津', 24: '大村'
};

const RACER_CLASSES = { 1: 'A1', 2: 'A2', 3: 'B1', 4: 'B2' };

// 出走表ダミーデータ
const DUMMY_PROGRAMS = [
  {
    race_date: '2026-02-23',
    race_stadium_number: 3,
    race_number: 1,
    race_title: '江戸川グランプリ',
    race_subtitle: '予選',
    race_distance: 1800,
    boats: [
      { racer_boat_number: 1, racer_name: '田中 太郎', racer_number: 4321, racer_class_number: 1, racer_age: 35, racer_weight: 52, racer_national_top_1_percent: 7.23, racer_national_top_2_percent: 52.10, racer_national_top_3_percent: 75.00, racer_average_start_timing: 0.15, racer_assigned_motor_number: 22, racer_assigned_motor_top_2_percent: 47.67, racer_assigned_boat_number: 65, racer_assigned_boat_top_2_percent: 51.32 },
      { racer_boat_number: 2, racer_name: '鈴木 次郎', racer_number: 3987, racer_class_number: 2, racer_age: 41, racer_weight: 54, racer_national_top_1_percent: 5.45, racer_national_top_2_percent: 38.20, racer_national_top_3_percent: 58.30, racer_average_start_timing: 0.18, racer_assigned_motor_number: 15, racer_assigned_motor_top_2_percent: 35.21, racer_assigned_boat_number: 42, racer_assigned_boat_top_2_percent: 38.90 },
      { racer_boat_number: 3, racer_name: '佐藤 三郎', racer_number: 4102, racer_class_number: 3, racer_age: 28, racer_weight: 51, racer_national_top_1_percent: 4.12, racer_national_top_2_percent: 28.50, racer_national_top_3_percent: 45.60, racer_average_start_timing: 0.20, racer_assigned_motor_number: 31, racer_assigned_motor_top_2_percent: 52.14, racer_assigned_boat_number: 18, racer_assigned_boat_top_2_percent: 44.50 },
      { racer_boat_number: 4, racer_name: '高橋 四郎', racer_number: 4456, racer_class_number: 1, racer_age: 32, racer_weight: 53, racer_national_top_1_percent: 6.89, racer_national_top_2_percent: 48.70, racer_national_top_3_percent: 70.20, racer_average_start_timing: 0.14, racer_assigned_motor_number: 8, racer_assigned_motor_top_2_percent: 41.33, racer_assigned_boat_number: 29, racer_assigned_boat_top_2_percent: 46.80 },
      { racer_boat_number: 5, racer_name: '山本 五郎', racer_number: 4789, racer_class_number: 3, racer_age: 25, racer_weight: 50, racer_national_top_1_percent: 3.95, racer_national_top_2_percent: 25.10, racer_national_top_3_percent: 40.30, racer_average_start_timing: 0.22, racer_assigned_motor_number: 44, racer_assigned_motor_top_2_percent: 29.87, racer_assigned_boat_number: 51, racer_assigned_boat_top_2_percent: 33.20 },
      { racer_boat_number: 6, racer_name: '中村 六郎', racer_number: 3654, racer_class_number: 2, racer_age: 38, racer_weight: 55, racer_national_top_1_percent: 5.67, racer_national_top_2_percent: 40.30, racer_national_top_3_percent: 60.10, racer_average_start_timing: 0.17, racer_assigned_motor_number: 12, racer_assigned_motor_top_2_percent: 44.56, racer_assigned_boat_number: 37, racer_assigned_boat_top_2_percent: 42.10 }
    ]
  },
  {
    race_date: '2026-02-23',
    race_stadium_number: 3,
    race_number: 2,
    race_title: '江戸川グランプリ',
    race_subtitle: '予選',
    race_distance: 1800,
    boats: [
      { racer_boat_number: 1, racer_name: '渡辺 一郎', racer_number: 4200, racer_class_number: 2, racer_age: 33, racer_weight: 53, racer_national_top_1_percent: 5.89, racer_national_top_2_percent: 41.20, racer_national_top_3_percent: 62.40, racer_average_start_timing: 0.16, racer_assigned_motor_number: 19, racer_assigned_motor_top_2_percent: 38.90, racer_assigned_boat_number: 55, racer_assigned_boat_top_2_percent: 45.30 },
      { racer_boat_number: 2, racer_name: '伊藤 健太', racer_number: 4567, racer_class_number: 1, racer_age: 30, racer_weight: 51, racer_national_top_1_percent: 7.56, racer_national_top_2_percent: 55.30, racer_national_top_3_percent: 78.90, racer_average_start_timing: 0.13, racer_assigned_motor_number: 27, racer_assigned_motor_top_2_percent: 50.12, racer_assigned_boat_number: 33, racer_assigned_boat_top_2_percent: 48.70 },
      { racer_boat_number: 3, racer_name: '加藤 真一', racer_number: 3890, racer_class_number: 3, racer_age: 44, racer_weight: 56, racer_national_top_1_percent: 3.78, racer_national_top_2_percent: 22.10, racer_national_top_3_percent: 38.50, racer_average_start_timing: 0.21, racer_assigned_motor_number: 5, racer_assigned_motor_top_2_percent: 31.45, racer_assigned_boat_number: 48, racer_assigned_boat_top_2_percent: 36.20 },
      { racer_boat_number: 4, racer_name: '吉田 大輔', racer_number: 4678, racer_class_number: 2, racer_age: 36, racer_weight: 54, racer_national_top_1_percent: 5.12, racer_national_top_2_percent: 36.40, racer_national_top_3_percent: 55.80, racer_average_start_timing: 0.19, racer_assigned_motor_number: 38, racer_assigned_motor_top_2_percent: 42.78, racer_assigned_boat_number: 21, racer_assigned_boat_top_2_percent: 40.50 },
      { racer_boat_number: 5, racer_name: '松本 翔', racer_number: 4890, racer_class_number: 1, racer_age: 29, racer_weight: 52, racer_national_top_1_percent: 6.45, racer_national_top_2_percent: 45.60, racer_national_top_3_percent: 68.30, racer_average_start_timing: 0.15, racer_assigned_motor_number: 41, racer_assigned_motor_top_2_percent: 55.34, racer_assigned_boat_number: 14, racer_assigned_boat_top_2_percent: 52.10 },
      { racer_boat_number: 6, racer_name: '木村 拓也', racer_number: 3456, racer_class_number: 4, racer_age: 47, racer_weight: 57, racer_national_top_1_percent: 2.34, racer_national_top_2_percent: 15.20, racer_national_top_3_percent: 28.90, racer_average_start_timing: 0.24, racer_assigned_motor_number: 9, racer_assigned_motor_top_2_percent: 25.67, racer_assigned_boat_number: 60, racer_assigned_boat_top_2_percent: 30.40 }
    ]
  }
];

// 予測結果ダミーデータ
const DUMMY_PREDICTIONS = {
  A: { logic_name: 'ロジックA', logic_subtitle: '安定型', confidence: 82, top3: [1, 4, 6], bets: [
    { type: '3連単', combination: '1-4-6', odds: 15.2 },
    { type: '3連複', combination: '1-4-6', odds: 5.6 },
    { type: '2連単', combination: '1-4', odds: 3.8 }
  ], analysis: '1号艇 田中: A1級 勝率7.23 インコース有利。4号艇 高橋: A1級 STタイム0.14で最速。6号艇 中村: モーター2連率44.56%で好調。' },
  B: { logic_name: 'ロジックB', logic_subtitle: '穴狙い型', confidence: 58, top3: [3, 5, 1], bets: [
    { type: '3連単', combination: '3-5-1', odds: 87.4 },
    { type: '3連複', combination: '1-3-5', odds: 22.1 },
    { type: '2連単', combination: '3-5', odds: 18.6 }
  ], analysis: '3号艇 佐藤: モーター2連率52.14%でトップ。当地勝率が高く展開有利。5号艇 山本: 若手で伸び足に期待。' },
  C: { logic_name: 'ロジックC', logic_subtitle: '展示重視', confidence: 71, top3: [4, 1, 3], bets: [
    { type: '3連単', combination: '4-1-3', odds: 28.9 },
    { type: '3連複', combination: '1-3-4', odds: 8.4 },
    { type: '2連単', combination: '4-1', odds: 6.2 }
  ], analysis: '4号艇 高橋: STタイム0.14で最速、展示タイムも良好。1号艇 田中: インコースから安定した走りが期待。3号艇 佐藤: モーター好調で差し展開あり。' }
};

// ロジック一覧ダミーデータ
const DUMMY_LOGICS = [
  { id: 'A', name: 'ロジックA', description: '勝率・連対率重視の安定型', accuracy: 68.5, status: '有効',
    api_endpoint: 'https://api.bp-engine.com/v2/predict-stable', api_key: 'sk-bp-a1b2c3d4e5f6g7h8' },
  { id: 'B', name: 'ロジックB', description: 'モーター成績重視の穴狙い型', accuracy: 42.3, status: '有効',
    api_endpoint: 'https://api.bp-engine.com/v2/predict-risk', api_key: 'sk-bp-i9j0k1l2m3n4o5p6' },
  { id: 'C', name: 'ロジックC', description: 'スタートタイミング+展示重視', accuracy: 55.1, status: 'テスト中',
    api_endpoint: 'https://api.bp-engine.com/v2/predict-exhibition', api_key: 'sk-bp-q7r8s9t0u1v2w3x4' }
];

// 今週の予測ダミーデータ
const DUMMY_WEEKLY = [
  { date: '2026-02-23', stadium: 3, race: 1, logic: 'A', confidence: 82, prediction: [1, 4, 6], result: [1, 4, 3], hit: true },
  { date: '2026-02-23', stadium: 3, race: 2, logic: 'B', confidence: 58, prediction: [2, 5, 1], result: [2, 5, 1], hit: true },
  { date: '2026-02-23', stadium: 4, race: 5, logic: 'A', confidence: 75, prediction: [1, 3, 5], result: [3, 1, 5], hit: false },
  { date: '2026-02-23', stadium: 12, race: 8, logic: 'C', confidence: 71, prediction: [4, 1, 3], result: null, hit: null },
  { date: '2026-02-23', stadium: 15, race: 3, logic: 'A', confidence: 88, prediction: [1, 2, 4], result: [1, 2, 4], hit: true },
  { date: '2026-02-24', stadium: 3, race: 1, logic: 'A', confidence: 79, prediction: [1, 3, 6], result: null, hit: null },
  { date: '2026-02-24', stadium: 6, race: 4, logic: 'B', confidence: 62, prediction: [3, 1, 5], result: null, hit: null },
  { date: '2026-02-24', stadium: 18, race: 7, logic: 'C', confidence: 66, prediction: [2, 4, 1], result: null, hit: null },
  { date: '2026-02-25', stadium: 5, race: 2, logic: 'A', confidence: 85, prediction: [1, 4, 2], result: null, hit: null },
  { date: '2026-02-25', stadium: 12, race: 10, logic: 'B', confidence: 55, prediction: [5, 3, 1], result: null, hit: null }
];

// AIコメントダミーデータ
const DUMMY_AI_COMMENT = {
  comment: '江戸川 1Rは荒れ傾向です',
  recommendation: 4,
  recommended_stadium: 9,
  recommended_race: 1
};

// ユーザー一覧ダミーデータ (管理画面用)
const DUMMY_USERS = [
  { id: 1, name: '山田 太郎', email: 'yamada@example.com', method: 'LINE', status: '有効', payment: '決済済', registered: '2026-01-15' },
  { id: 2, name: '鈴木 花子', email: 'suzuki@example.com', method: 'SNS', status: '有効', payment: '決済済', registered: '2026-01-20' },
  { id: 3, name: '高橋 次郎', email: 'takahashi@example.com', method: 'LINE', status: '停止', payment: '未決済', registered: '2026-01-22' },
  { id: 4, name: '田中 美咲', email: 'tanaka@example.com', method: 'SNS', status: '有効', payment: '決済済', registered: '2026-02-01' },
  { id: 5, name: '伊藤 健太', email: 'ito@example.com', method: 'LINE', status: '有効', payment: '決済済', registered: '2026-02-03' },
  { id: 6, name: '渡辺 由美', email: 'watanabe@example.com', method: 'LINE', status: '保留', payment: '未決済', registered: '2026-02-05' },
  { id: 7, name: '松本 翔', email: 'matsumoto@example.com', method: 'SNS', status: '有効', payment: '決済済', registered: '2026-02-08' },
  { id: 8, name: '加藤 真一', email: 'kato@example.com', method: 'LINE', status: '有効', payment: '決済済', registered: '2026-02-10' },
  { id: 9, name: '吉田 大輔', email: 'yoshida@example.com', method: 'SNS', status: '停止', payment: '決済済', registered: '2026-02-12' },
  { id: 10, name: '木村 拓也', email: 'kimura@example.com', method: 'LINE', status: '有効', payment: '決済済', registered: '2026-02-14' }
];
