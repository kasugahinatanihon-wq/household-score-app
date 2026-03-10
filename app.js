const LS_TX = "tx";
const LS_FIXED = "fixed_month";
const LS_INCOME = "income_month";
const LS_PROFILE = "user_profile";
const LS_ONBOARD = "onboarding_done";
const LS_SAT_SCALE = "sat_scale_version";
const LS_SAVING = "saving_month";
const LS_REVIEW = "review_open";
const LS_MONTHLY_READY = "monthly_ready";
const LS_MONTHLY_AVG = "monthly_avg_score";
const LS_TOTAL_XP = "total_xp";
const LS_XP_MONTHS = "xp_months";
const LS_DAILY_XP = "daily_xp";
const LS_HOME_PREVIEW = "home_preview_mode";
const LS_HOME_PREVIEW_CATEGORY = "home_preview_category";
const LS_PREMIUM = "premium_plan";
const LS_SUPABASE = "supabase_config_v1";
const LS_REMOTE_USER = "remote_user_v1";
const LS_AUTH_SESSION = "supabase_auth_session_v1";
const LS_ACTIVE_HOUSEHOLD = "active_household_id_v1";
const LS_ACTIVE_HOUSEHOLD_CODE = "active_household_code_v1";
const LS_ACTIVE_HOUSEHOLD_NAME = "active_household_name_v1";
const LS_HOME_REACTION = "home_reaction_v1";
const LS_HOUSEHOLD_VALUE_PROMPTED = "household_value_prompted_v1";
const LS_PASSWORD_SETUP_REQUIRED = "password_setup_required_v1";
const LS_HOUSEHOLD_ONBOARDING_DONE = "household_onboarding_done_v1";
const MAX_LEVEL = 100;
const LS_EVOLUTION = "evolution_stage_category";
const SAT_SCALE_VERSION = 2;

const CATEGORIES = [
  "食費","外食費","日用品","衣服","美容","交際費","医療費","教育費",
  "交通費","コンビニ","カフェ",
  "デート","趣味","仕事"
];

const QUALITY_TARGET = new Set(CATEGORIES);
const DEFAULT_PROFILE = {
  household:"unknown",
  ageBand:"unknown",
  age:"",
  householdSize:"",
  annualIncomeGross:"",
  housingType:"unknown",
  regionType:"unknown",
  workType:"unknown",
  valueCats:["","","","",""],
  valueTop3:[]
};
const VALUE_CATEGORY_SUGGESTIONS = [
  "リフレッシュ","家族時間","自己投資","安心感","時短","健康",
  "ご褒美","体験","人付き合い","学び","挑戦","趣味没頭"
];
const SAT_LEVELS = [
  { value:5, label:"😊 すごく納得" },
  { value:4, label:"🙂 まあ納得" },
  { value:3, label:"😐 どちらでもない" },
  { value:2, label:"🙁 少し後悔" },
  { value:1, label:"😢 後悔している" }
];
const CATEGORY_EMOJI = {
  "外食費":"🍽️",
  "交際費":"🤝",
  "デート":"💑",
  "趣味":"🎯",
  "カフェ":"☕️",
  "コンビニ":"🏪",
};
const REPORT_COLORS = [
  "#60a5fa","#34d399","#fbbf24","#f97316","#f472b6",
  "#a78bfa","#38bdf8","#fca5a5","#22c55e","#fb7185",
];


const BENCH_PUBLIC_2024 = {
  totalMedian: 244396,
  foodMedian: 78810,
  utilitiesMedian: 21200,
  transportCommMedian: 22274,
  leisureMedian: 16000,
  otherMedian: 33030,
  housingMedian: 0.28,
};
const BENCH_PUBLIC_EXTRA_2024 = {
  dailyMiscRate: 0.135,
  medicalInsuranceRate: 0.04,
  educationRate: 0.03,
};

const BENCH_TARGET_2024 = {
  ageBands: [
    { id:"under40", label:"40歳未満", netIncomeMonthly:516000, livingCost:280000, surplusRate:0.457 },
    { id:"40s", label:"40代", netIncomeMonthly:571000, livingCost:331000, surplusRate:0.419 },
    { id:"50s", label:"50代", netIncomeMonthly:569000, livingCost:360000, surplusRate:0.368 },
    { id:"60plus", label:"60歳以上", netIncomeMonthly:410000, livingCost:309000, surplusRate:0.247 },
    { id:"all", label:"全世帯平均", netIncomeMonthly:522000, surplusRate:0.378 },
  ],
  engelByHousehold: [
    { size:1, rate:0.251 },
    { size:2, rate:0.246 },
    { size:3, rate:0.264 },
    { size:4, rate:0.277 },
    { size:5, rate:0.290 },
    { size:6, rate:0.314 },
  ],
  engelByIncome: [
    { min:0, max:300, rate:0.33 },
    { min:300, max:500, rate:0.30 },
    { min:500, max:700, rate:0.29 },
    { min:700, max:1000, rate:0.27 },
    { min:1000, max:99999, rate:0.25 },
  ],
  netRateByIncome: [
    { min:0, max:300, rate:0.82 },
    { min:300, max:500, rate:0.80 },
    { min:500, max:700, rate:0.78 },
    { min:700, max:1000, rate:0.76 },
    { min:1000, max:99999, rate:0.74 },
  ],
  regionAdjust: {
    metro: { engel: -0.01 },
    local: { engel: +0.01 },
  },
  workAdjust: {
    co: { engel: +0.01 },
    single: { engel: 0 },
  }
};

const APP_AVG_PLACEHOLDER = {
  weekly: { spendControl: 70, satisfactionEfficiency: 60 },
  monthly: { spendControl: 70, satisfactionEfficiency: 62 },
};

const CATEGORY_TO_PUBLIC = {
  FOOD: new Set(["食費","外食費","コンビニ"]),
  UTILITIES: new Set(["光熱費"]),
  TRANS_COMM: new Set(["交通費","通信費"]),
  LEISURE: new Set(["趣味","デート","交際費","カフェ"]),
  HOUSING: new Set(["住居費"]),
};
const EXCLUDE_FROM_PUBLIC_TX = new Set(["住居費","通信費","サブスク"]);
const FIXED_CATEGORIES = new Set(["住居費","光熱費","通信費","サブスク"]);

const MASCOT_TONES = {
  food:{ body:"#bbf7d0", cheek:"#86efac", accent:"#16a34a" },
  daily:{ body:"#bfdbfe", cheek:"#93c5fd", accent:"#2563eb" },
  style:{ body:"#fbcfe8", cheek:"#f9a8d4", accent:"#db2777" },
  social:{ body:"#fed7aa", cheek:"#fdba74", accent:"#ea580c" },
  care:{ body:"#fde68a", cheek:"#facc15", accent:"#ca8a04" },
  learn:{ body:"#ddd6fe", cheek:"#c4b5fd", accent:"#7c3aed" },
  work:{ body:"#e2e8f0", cheek:"#cbd5f5", accent:"#475569" },
  play:{ body:"#bae6fd", cheek:"#7dd3fc", accent:"#0284c7" },
};
const CATEGORY_TONE_KEY = {
  "食費":"food",
  "外食費":"food",
  "コンビニ":"food",
  "カフェ":"food",
  "日用品":"daily",
  "交通費":"daily",
  "住居費":"daily",
  "光熱費":"daily",
  "通信費":"daily",
  "サブスク":"daily",
  "衣服":"style",
  "美容":"style",
  "交際費":"social",
  "デート":"social",
  "医療費":"care",
  "教育費":"learn",
  "趣味":"play",
  "仕事":"work",
};
const CATEGORY_LINEAGE_KEY = {
  "食費":"gourmet",
  "外食費":"gourmet",
  "カフェ":"gourmet",
  "衣服":"selfcare",
  "美容":"selfcare",
  "交際費":"social",
  "デート":"social",
  "教育費":"learning",
  "趣味":"learning",
  "仕事":"learning",
  "日用品":"lifesupport",
  "医療費":"lifesupport",
  "交通費":"mobility",
  "コンビニ":"convenience",
};
const MASCOT_STAGE_COLORS = [
  { body:"#f1f5f9", cheek:"#e2e8f0", accent:"#cbd5f5" },
  { body:"#e0f2fe", cheek:"#bae6fd", accent:"#7dd3fc" },
  { body:"#dbeafe", cheek:"#bfdbfe", accent:"#93c5fd" },
  { body:"#c7d2fe", cheek:"#a5b4fc", accent:"#818cf8" },
  { body:"#ddd6fe", cheek:"#c4b5fd", accent:"#a78bfa" },
  { body:"#ede9fe", cheek:"#d8b4fe", accent:"#c084fc" },
  { body:"#f5d0fe", cheek:"#f0abfc", accent:"#e879f9" },
  { body:"#fbcfe8", cheek:"#f9a8d4", accent:"#f472b6" },
  { body:"#fee2e2", cheek:"#fecaca", accent:"#fca5a5" },
  { body:"#ffedd5", cheek:"#fed7aa", accent:"#fdba74" },
  { body:"#fef9c3", cheek:"#fde68a", accent:"#facc15" },
  { body:"#dcfce7", cheek:"#bbf7d0", accent:"#86efac" },
];

const $ = (id)=>document.getElementById(id);
let AUTH_GATE_NEXT_SCREEN = "score";
let AUTH_GATE_BUSY = false;
let AUTH_GATE_MODE = "login";

function ensureToast(){
  if($("toast")) return;
  const t = document.createElement("div");
  t.id = "toast";
  t.style.cssText = `
    position:fixed; left:50%; bottom:calc(var(--navH) + var(--safeBottom) + 10px);
    transform:translateX(-50%);
    background:rgba(13,27,42,.92); color:#fff; padding:10px 14px;
    border-radius:14px; font-size:13px; z-index:99999;
    box-shadow:0 12px 30px rgba(0,0,0,.25); display:none;
    max-width:min(92vw,560px); text-align:center;
  `;
  document.body.appendChild(t);
}
function toast(msg){
  ensureToast();
  const el = $("toast");
  el.textContent = msg;
  el.style.display = "block";
  clearTimeout(toast._t);
  toast._t = setTimeout(()=>{ el.style.display = "none"; }, 1500);
}

const pad2 = (n)=>String(n).padStart(2,"0");
function ymd(d){ return `${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}`; }
function ym(d){ return `${d.getFullYear()}-${pad2(d.getMonth()+1)}`; }
function toDate(str){
  const [y,m,da] = str.split("-").map(Number);
  return new Date(y, m-1, da);
}
function monthStart(d){ return new Date(d.getFullYear(), d.getMonth(), 1); }
function clamp(n,min,max){ return Math.max(min, Math.min(max, n)); }
function clamp01(x){ return Math.max(0, Math.min(1, x)); }
function fmtPct(rate){
  if(rate == null || !Number.isFinite(rate)) return "—";
  return `${Math.round(rate*100)}%`;
}
function fmtYen(value){
  if(value == null || !Number.isFinite(value)) return "—";
  return Number(value).toLocaleString("ja-JP");
}
function getAgeBandId(age){
  if(!Number.isFinite(age)) return "unknown";
  if(age < 40) return "under40";
  if(age < 50) return "40s";
  if(age < 60) return "50s";
  return "60plus";
}

function findRateByRange(list, value){
  return (list.find(x=> value >= x.min && value < x.max) || list[list.length - 1]).rate;
}

function normalizeAnnualIncomeYen(raw){
  const value = Number(raw || 0);
  if(!Number.isFinite(value) || value <= 0) return "";
  // Backward compatibility: old data was stored in "万円" units.
  if(value < 100000) return Math.round(value * 10000);
  return Math.round(value);
}

function normalizeHouseholdSize(profile){
  const raw = Number(profile.householdSize || profile.household || 0);
  if(Number.isFinite(raw) && raw > 0) return Math.min(raw, 6);
  if(profile.household === "single") return 1;
  if(profile.household === "twoPlus") return 2;
  return null;
}

function getHouseholdEngel(size){
  if(!Number.isFinite(size)) return null;
  if(size >= 6) return 0.314;
  const row = BENCH_TARGET_2024.engelByHousehold.find(x=>x.size === size);
  return row ? row.rate : null;
}

function getAgeBandFromProfile(profile){
  const age = Number(profile.age || 0);
  if(Number.isFinite(age) && age > 0) return getAgeBandId(age);
  return "unknown";
}

function buildTargetBudget(profile){
  const householdSize = normalizeHouseholdSize(profile);
  const ageBandId = getAgeBandFromProfile(profile);
  const annualIncomeGross = Number(normalizeAnnualIncomeYen(profile.annualIncomeGross) || 0);
  if(!householdSize || ageBandId === "unknown" || !Number.isFinite(annualIncomeGross) || annualIncomeGross <= 0){
    return null;
  }
  const annualIncomeGrossInMan = annualIncomeGross / 10000;
  const ageBand = BENCH_TARGET_2024.ageBands.find(x=>x.id === ageBandId) || BENCH_TARGET_2024.ageBands[0];
  const netRate = findRateByRange(BENCH_TARGET_2024.netRateByIncome, annualIncomeGrossInMan);
  const annualNet = annualIncomeGross * netRate;
  const monthlyNet = annualNet / 12;

  const engelBySize = getHouseholdEngel(householdSize);
  const engelByIncome = findRateByRange(BENCH_TARGET_2024.engelByIncome, annualIncomeGrossInMan);
  let foodRateTarget = (engelBySize + engelByIncome) / 2;

  if(profile.regionType && BENCH_TARGET_2024.regionAdjust[profile.regionType]){
    foodRateTarget += BENCH_TARGET_2024.regionAdjust[profile.regionType].engel;
  }
  if(profile.workType && BENCH_TARGET_2024.workAdjust[profile.workType]){
    foodRateTarget += BENCH_TARGET_2024.workAdjust[profile.workType].engel;
  }

  return {
    ageBandId,
    ageBandLabel: ageBand.label,
    householdSize,
    annualIncomeGross,
    netRate,
    monthlyNetTarget: monthlyNet,
    target: {
      surplusRate: clamp(ageBand.surplusRate, 0.1, 0.6),
      foodRate: clamp(foodRateTarget, 0.1, 0.6),
    }
  };
}

function calcSurplusTargetRate(profile, income){
  if(!Number.isFinite(income) || income <= 0) return null;
  let base = 0.18;
  if(income >= 600000) base = 0.24;
  else if(income >= 450000) base = 0.21;
  else if(income >= 320000) base = 0.18;
  else if(income >= 250000) base = 0.15;
  else base = 0.12;

  const size = normalizeHouseholdSize(profile);
  if(Number.isFinite(size) && size >= 4) base -= 0.02;
  else if(Number.isFinite(size) && size >= 3) base -= 0.01;

  if(profile.housingType === "owned") base += 0.01;
  if(profile.housingType === "mortgage") base -= 0.01;

  return clamp(base, 0.10, 0.30);
}

function niceMax(value){
  if(!Number.isFinite(value) || value <= 0) return 1;
  const pow = Math.pow(10, Math.floor(Math.log10(value)));
  const n = value / pow;
  const step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10;
  return step * pow;
}

function renderHappinessScatterContent({ youX, youY, avgX, avgY, xMid=50, yMid=70, guideLineText }){
  const hasYou = Number.isFinite(youX) && Number.isFinite(youY);
  const hasAvg = Number.isFinite(avgX) && Number.isFinite(avgY);
  const xMax = 100;
  const yMax = 100;

  const w = 360;
  const h = 230;
  const pad = { left:42, right:16, top:16, bottom:38 };
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;

  const xTo = (x)=> pad.left + (x / xMax) * plotW;
  const yTo = (y)=> pad.top + (1 - (y / yMax)) * plotH;

  const youHalo = hasYou ? `<circle class="scatterPointHalo scatterSeries" data-series="you" cx="${xTo(youX)}" cy="${yTo(youY)}" r="9"></circle>` : "";
  const youPoint = hasYou ? `<circle class="scatterPoint you scatterSeries" data-series="you" cx="${xTo(youX)}" cy="${yTo(youY)}" r="6" data-tooltip="あなた｜安定度 ${Math.round(youX)} / 納得度 ${Math.round(youY)}"></circle>` : "";
  const avgPoint = hasAvg ? `<rect class="scatterPoint avg scatterSeries" data-series="avg" x="${xTo(avgX)-3.5}" y="${yTo(avgY)-3.5}" width="7" height="7" rx="2" data-tooltip="ユーザー中央値（仮）｜安定度 ${Math.round(avgX)} / 納得度 ${Math.round(avgY)}"></rect>` : "";
  const x25 = xTo(25);
  const x75 = xTo(75);
  const y25 = yTo(25);
  const y75 = yTo(75);

  return `
    <div class="scatterWrap">
      <div class="scatterHeader">
        <div>
          <div class="scatterTitle">ユーザー中央値比較マップ</div>
          <div class="scatterSub">横軸：家計安定度 / 縦軸：家計納得度</div>
        </div>
        <button class="scatterAction" type="button">比較</button>
      </div>
      <div class="scatterChart">
        <svg class="scatterSvg" viewBox="0 0 ${w} ${h}" role="img" aria-label="行動マップの比較">
        <line class="scatterAxis" x1="${pad.left}" y1="${pad.top}" x2="${pad.left}" y2="${pad.top + plotH}"></line>
        <line class="scatterAxis" x1="${pad.left}" y1="${pad.top + plotH}" x2="${pad.left + plotW}" y2="${pad.top + plotH}"></line>

        <rect class="scatterZone ideal" x="${xTo(xMid)}" y="${pad.top}" width="${pad.left + plotW - xTo(xMid)}" height="${yTo(yMid) - pad.top}"></rect>
        <rect class="scatterZone attack" x="${xTo(xMid)}" y="${yTo(yMid)}" width="${pad.left + plotW - xTo(xMid)}" height="${pad.top + plotH - yTo(yMid)}"></rect>
        <rect class="scatterZone defense" x="${pad.left}" y="${pad.top}" width="${xTo(xMid) - pad.left}" height="${yTo(yMid) - pad.top}"></rect>
        <rect class="scatterZone improve" x="${pad.left}" y="${yTo(yMid)}" width="${xTo(xMid) - pad.left}" height="${pad.top + plotH - yTo(yMid)}"></rect>
        <line class="scatterGrid" x1="${x25}" y1="${pad.top}" x2="${x25}" y2="${pad.top + plotH}"></line>
        <line class="scatterGrid" x1="${x75}" y1="${pad.top}" x2="${x75}" y2="${pad.top + plotH}"></line>
        <line class="scatterGrid" x1="${pad.left}" y1="${y25}" x2="${pad.left + plotW}" y2="${y25}"></line>
        <line class="scatterGrid" x1="${pad.left}" y1="${y75}" x2="${pad.left + plotW}" y2="${y75}"></line>
        <line class="scatterMedian" x1="${pad.left}" y1="${yTo(yMid)}" x2="${pad.left + plotW}" y2="${yTo(yMid)}"></line>
        <line class="scatterMedian" x1="${xTo(xMid)}" y1="${pad.top}" x2="${xTo(xMid)}" y2="${pad.top + plotH}"></line>

        <text class="scatterTick" x="${pad.left}" y="${pad.top + plotH + 18}" text-anchor="middle">0</text>
        <text class="scatterTick" x="${xTo(xMid)}" y="${pad.top + plotH + 18}" text-anchor="middle">${Math.round(xMid)}</text>
        <text class="scatterTick" x="${pad.left + plotW}" y="${pad.top + plotH + 18}" text-anchor="middle">100</text>

        <text class="scatterTick" x="${pad.left - 8}" y="${pad.top + plotH}" text-anchor="end">0</text>
        <text class="scatterTick" x="${pad.left - 8}" y="${yTo(yMid)+4}" text-anchor="end">${Math.round(yMid)}</text>
        <text class="scatterTick" x="${pad.left - 8}" y="${pad.top + 4}" text-anchor="end">100</text>

        ${avgPoint}
        ${youHalo}
        ${youPoint}
        </svg>
        <div class="scatterQuadrants">
          <span class="quadPill ideal">理想ゾーン</span>
          <span class="quadPill attack">攻め型</span>
          <span class="quadPill defense">守り型</span>
          <span class="quadPill improve">要改善</span>
        </div>
        <div class="scatterTooltip" aria-hidden="true"></div>
      </div>
      <div class="scatterLegend">
        <span class="legendPill you" data-target="you" role="button" aria-pressed="true"><span class="dot"></span>あなた</span>
        <span class="legendPill avg" data-target="avg" role="button" aria-pressed="true"><span class="dot"></span>ユーザー中央値（仮）</span>
      </div>
    </div>
    ${!hasYou ? `<div class="small" style="margin-top:6px;">データが少ないため、次の月に精度が上がります（まずは記録と納得入力でOK）</div>` : ""}
    <div class="small muted guideLine">${escapeHtml(guideLineText || "納得して使えていて、かつ家計への負担が軽いほど右上に近づきます")}</div>
  `;
}

function renderHappinessScatter({ title, youX, youY, avgX, avgY, xMid=50, yMid=70, xLabel, yLabel }){
  return `
    <div class="sectionCard">
      <div class="sectionHead">
        <div><div class="sectionName">${escapeHtml(title)}</div><div class="sectionHint">${escapeHtml(xLabel)} / ${escapeHtml(yLabel)}</div></div>
        <div class="sectionScore">比較</div>
      </div>
      ${renderHappinessScatterContent({ youX, youY, avgX, avgY, xMid, yMid })}
    </div>
  `;
}

function getDevTitleInfo(devScore){
  if(devScore >= 80) return { title:"👑 マネーマスター", variant:"gold", min:80, next: null };
  if(devScore >= 70) return { title:"🌟 上級マネープレイヤー", variant:"emerald", min:70, next: 80 };
  if(devScore >= 60) return { title:"🟢 バランス良好", variant:"teal", min:60, next: 70 };
  if(devScore >= 50) return { title:"🔵 安定形成期", variant:"blue", min:50, next: 60 };
  if(devScore >= 40) return { title:"🟡 見直しチャンス期", variant:"amber", min:40, next: 50 };
  return { title:"🟠 再設計スタート期", variant:"orange", min:0, next: 40 };
}

function renderDevScoreCard(devScore, diffFromAvg, percentileText, avgScore){
  const info = getDevTitleInfo(devScore);
  const nextDiff = info.next ? Math.max(0, info.next - devScore) : 0;
  const nextTitle = info.next ? getDevTitleInfo(info.next).title : "";
  const nextText = info.next ? `あと+${nextDiff}` : "最高称号に到達";
  const markerX = clamp(((devScore - 30) / 40) * 100, 0, 100);
  const diffClass = diffFromAvg >= 0 ? "pos" : "neg";
  const span = info.next ? (info.next - info.min) : 1;
  const progress = info.next ? clamp((devScore - info.min) / span, 0, 1) : 1;
  return `
    <div class="dev-card">
      <div class="dev-header">
        <div>
          <div class="dev-title">偏差値比較</div>
          <div class="dev-subtitle">同年代平均との差</div>
        </div>
        <div class="dev-monitor">MONITOR</div>
      </div>
      <div class="small muted">※ 現在は暫定値です。データが溜まり次第、実偏差値に更新予定。</div>
      <div class="dev-score-big">${devScore}</div>
      <div class="dev-score-label">あなたの偏差値</div>
      <div class="title-pill ${info.variant}"><span class="title-icon">${info.title.split(" ")[0]}</span><span>${info.title.replace(/^[^\\s]+\\s*/, "")}</span></div>
      <div class="title-sub">安定×納得のバランスが良い状態</div>
      <div class="dev-diffRow">
        <div class="dev-diff ${diffClass}">${diffFromAvg >= 0 ? "+" : ""}${diffFromAvg}</div>
        <div class="dev-diffLabel">同年代平均との差</div>
      </div>
      <div class="dev-gauge">
        <div class="dev-marker" style="--x:${markerX}%;">
          <span class="dev-marker-label">${devScore}</span>
        </div>
        <div class="dev-ticks">
          <span>30</span><span>40</span><span class="mid">50</span><span>60</span><span>70</span>
        </div>
      </div>
      <div class="evolve-wrap">
        <div class="evolve-head"><span>EVOLVE</span><span class="evolve-next">${nextText}</span></div>
        <div class="evolve-bar"><span class="evolve-fill" style="--w:${Math.round(progress * 100)}%;"></span></div>
        ${info.next ? `<div class="evolve-title">次は ${nextTitle}</div>` : `<div class="evolve-title">次の称号はありません</div>`}
      </div>
      ${percentileText ? `<div class="percentile-chip">${escapeHtml(percentileText)}</div>` : ""}
    </div>
  `;
}

function buildSummaryTextWeekly({ daysWithEntry, subjectiveScore, regretRate }){
  let a = "今週はこれからのペースです。";
  if(Number.isFinite(daysWithEntry) && daysWithEntry >= 4){
    a = "記録は続けられています。";
  }else if(Number.isFinite(daysWithEntry) && daysWithEntry >= 1){
    a = "記録は始められています。";
  }

  let b = "納得はこれから積み上げられます。";
  if(Number.isFinite(subjectiveScore) && subjectiveScore >= 70){
    b = "納得も積み上がっています。";
  }else if(Number.isFinite(subjectiveScore) && subjectiveScore < 55){
    b = "納得は伸びしろです。";
  }else if(Number.isFinite(subjectiveScore)){
    b = "納得は安定しています。";
  }

  if(Number.isFinite(regretRate) && regretRate > 0.4){
    b = "納得のばらつきが見えています。";
  }

  return `${a} ${b}`;
}

function buildSummaryTextMonthly({ satisfactionScore, stabilityScore }){
  if(Number.isFinite(satisfactionScore) && Number.isFinite(stabilityScore)){
    if(satisfactionScore >= 75 && stabilityScore >= 75){
      return "納得度・安定度ともに高い月です。";
    }
    if(satisfactionScore >= 75){
      return "納得度が高く、安定度は伸びしろです。";
    }
    if(stabilityScore >= 75){
      return "安定度が高く、納得度は伸びしろです。";
    }
  }
  return "今月の状態を2つの軸で確認できます。";
}

function buildNextActionWeekly({ daysWithEntry, coveragePct, subjectiveScore, regretRate }){
  let text = "今の入力リズムを続ける";
  if(Number.isFinite(daysWithEntry) && daysWithEntry <= 2){
    text = "3日だけ記録する";
  }else if(Number.isFinite(coveragePct) && coveragePct < 50){
    text = "納得度を1回入力する";
  }else if(Number.isFinite(subjectiveScore) && subjectiveScore < 55){
    text = "納得できた支出を1回増やす";
  }else if(Number.isFinite(regretRate) && regretRate > 0.40){
    text = "後悔した支出を1回見直す";
  }
  return `次は「${text}」を1つだけ試してみましょう`;
}

function buildNextActionMonthly({ coveragePct, subjectiveScore, valueAlignScore, regretScore, happinessScore, varRate, savingRate, fixedRate }){
  let text = "同じ入力リズムを続ける";
  if(Number.isFinite(coveragePct) && coveragePct < 70){
    text = "納得度を週3回入力する";
  }else if(Number.isFinite(subjectiveScore) && subjectiveScore < 55){
    text = "納得できた支出を1つ増やす";
  }else if(Number.isFinite(valueAlignScore) && valueAlignScore < 60){
    text = "TOP3への配分を少し増やす";
  }else if(Number.isFinite(regretScore) && regretScore < 70){
    text = "後悔した支出の理由を1つメモする";
  }else if(Number.isFinite(happinessScore) && happinessScore < 40){
    text = "幸せ判定の支出を1つ増やす";
  }else if(Number.isFinite(varRate) && varRate > 0.40){
    text = "後悔が多い支出を1つ見直す";
  }else if(Number.isFinite(fixedRate) && fixedRate > 0.33){
    text = "通信 or サブスクを1つ棚卸しする";
  }else if(Number.isFinite(savingRate) && savingRate < 0.15){
    text = "先取り貯蓄を10,000円だけ上乗せする";
  }
  return `次は「${text}」を1つだけ試してみましょう`;
}

function calcSatisfactionEfficiency(qualityScore, qSpend, varSpend){
  if(!Number.isFinite(qualityScore) || !Number.isFinite(qSpend) || !Number.isFinite(varSpend) || varSpend <= 0){
    return null;
  }
  const spendPressure = qSpend / varSpend;
  const penalty = clamp((spendPressure - 0.30) * 100, 0, 30);
  return clamp(Math.round(qualityScore - penalty), 0, 100);
}

function calcWeeklySatisfactionEfficiency(qualityScore, qSpend, spend){
  if(!Number.isFinite(qualityScore) || !Number.isFinite(qSpend) || !Number.isFinite(spend) || spend <= 0){
    return null;
  }
  const weeklySpendPressure = qSpend / spend;
  const weeklyPenalty = clamp((weeklySpendPressure - 0.50) * 40, 0, 20);
  return clamp(Math.round(qualityScore - weeklyPenalty), 0, 100);
}

function loadJSON(key, fallback){
  try{ return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
  catch{ return fallback; }
}
function saveJSON(key, obj){
  localStorage.setItem(key, JSON.stringify(obj));
}
function getSupabaseConfig(){
  const local = loadJSON(LS_SUPABASE, { url:"", anonKey:"" });
  const appDefault = window.APP_SUPABASE_CONFIG || {};
  const defaultUrl = normalizeSupabaseBaseUrl(appDefault.url || "");
  const defaultKey = String(appDefault.anonKey || "").trim();
  const usableDefaultKey = defaultKey && defaultKey !== "PASTE_PUBLISHABLE_KEY_HERE" ? defaultKey : "";
  return {
    url: normalizeSupabaseBaseUrl(local.url || "") || defaultUrl,
    anonKey: String(local.anonKey || "").trim() || usableDefaultKey
  };
}
function normalizeSupabaseBaseUrl(raw){
  let url = String(raw || "").trim();
  if(!url) return "";
  // If DB host is pasted (e.g. db.<ref>.supabase.co), convert to project API host.
  if(/^db\.[a-z0-9-]+\.supabase\.co$/i.test(url)){
    url = `https://${url.replace(/^db\./i, "")}`;
  }
  if(/^https?:\/\/db\.[a-z0-9-]+\.supabase\.co$/i.test(url)){
    url = url.replace(/^https?:\/\/db\./i, "https://");
  }
  url = url.replace(/\/+$/, "");
  url = url.replace(/\/rest\/v1(?:\/.*)?$/i, "");
  return url;
}
function setSupabaseStatus(msg, isError = false){
  const el = $("supabaseSyncStatus");
  if(!el) return;
  el.textContent = msg;
  el.style.color = isError ? "#b91c1c" : "";
}
function saveSupabaseConfig(){
  const url = normalizeSupabaseBaseUrl($("supabaseUrl")?.value || "");
  const anonKey = String($("supabaseAnonKey")?.value || "").trim();
  saveJSON(LS_SUPABASE, { url, anonKey });
  if($("supabaseUrl")) $("supabaseUrl").value = url;
  setSupabaseStatus(url && anonKey ? "接続情報を保存しました" : "未接続");
  toast("接続情報を保存しました");
}
window.saveSupabaseConfig = saveSupabaseConfig;
function loadAuthSession(){
  return loadJSON(LS_AUTH_SESSION, null);
}
function saveAuthSession(session){
  saveJSON(LS_AUTH_SESSION, session || null);
}
function normalizeAuthSessionPayload(payload){
  if(!payload || typeof payload !== "object") return null;
  if(payload.access_token) return payload;
  if(payload.session && payload.session.access_token){
    return {
      ...payload.session,
      user: payload.user || payload.session.user || null
    };
  }
  return null;
}
function getAuthAccessToken(){
  const s = loadAuthSession();
  return s?.access_token || "";
}
function getAuthUserId(){
  const s = loadAuthSession();
  if(!s?.access_token) return "";
  return s?.user?.id || "";
}
function setAuthStatus(msg, isError = false){
  const el = $("authStatus");
  if(!el) return;
  el.textContent = `ログイン状態: ${msg}`;
  el.style.color = isError ? "#b91c1c" : "";
  refreshHouseholdControls();
}
function setAuthGateStatus(msg, isError = false){
  const el = $("authGateStatus");
  if(!el) return;
  el.textContent = msg || "";
  el.style.color = isError ? "#b91c1c" : "";
  el.classList.toggle("is-error", !!isError);
  el.classList.toggle("is-success", !isError && !!msg);
}
function setAuthGateBusy(isBusy, mode = ""){
  AUTH_GATE_BUSY = !!isBusy;
  const signInBtn = $("authGateSignInBtn");
  const signUpBtn = $("authGateSignUpBtn");
  const emailEl = $("authGateEmail");
  const passEl = $("authGatePassword");
  if(signInBtn) signInBtn.disabled = !!isBusy;
  if(signUpBtn) signUpBtn.disabled = !!isBusy;
  if(emailEl) emailEl.disabled = !!isBusy;
  if(passEl) passEl.disabled = !!isBusy;
  if(isBusy){
    if(mode === "signup"){
      setAuthGateStatus("新規登録を処理しています…");
    }else if(mode === "signin"){
      setAuthGateStatus("ログインを処理しています…");
    }
  }
}
function setAuthGateMode(mode){
  AUTH_GATE_MODE = (mode === "signup") ? "signup" : "login";
  const inputRow = $("authGateInputRow");
  const loginBtn = $("authModeLoginBtn");
  const signupBtn = $("authModeSignupBtn");
  const signInBtn = $("authGateSignInBtn");
  const signUpBtn = $("authGateSignUpBtn");
  const leadLogin = $("authGateLeadLogin");
  const leadSignup = $("authGateLeadSignup");
  const passWrap = $("authGatePasswordWrap");
  if(loginBtn) loginBtn.classList.toggle("primary", AUTH_GATE_MODE === "login");
  if(loginBtn) loginBtn.classList.toggle("ghost", AUTH_GATE_MODE !== "login");
  if(signupBtn) signupBtn.classList.toggle("primary", AUTH_GATE_MODE === "signup");
  if(signupBtn) signupBtn.classList.toggle("ghost", AUTH_GATE_MODE !== "signup");
  if(signInBtn) signInBtn.style.display = AUTH_GATE_MODE === "login" ? "" : "none";
  if(signUpBtn){
    signUpBtn.style.display = AUTH_GATE_MODE === "signup" ? "" : "none";
    signUpBtn.classList.toggle("primary", AUTH_GATE_MODE === "signup");
    signUpBtn.classList.toggle("ghost", AUTH_GATE_MODE !== "signup");
  }
  if(leadLogin) leadLogin.style.display = AUTH_GATE_MODE === "login" ? "" : "none";
  if(leadSignup) leadSignup.style.display = AUTH_GATE_MODE === "signup" ? "" : "none";
  if(passWrap) passWrap.style.display = AUTH_GATE_MODE === "login" ? "" : "none";
  if(inputRow) inputRow.classList.toggle("is-signup", AUTH_GATE_MODE === "signup");
  setAuthGateStatus("");
}
window.setAuthGateMode = setAuthGateMode;
function getAppAuthRedirectUrl(flow = ""){
  const u = new URL(window.location.href);
  const redirect = new URL(`${u.origin}${u.pathname}`);
  const invite = String(u.searchParams.get("invite") || "").trim();
  if(invite) redirect.searchParams.set("invite", invite);
  if(flow) redirect.searchParams.set("authFlow", flow);
  return redirect.toString();
}
function parseAuthCallbackFromHash(){
  const raw = String(window.location.hash || "");
  if(!raw.startsWith("#")) return null;
  const params = new URLSearchParams(raw.slice(1));
  const accessToken = params.get("access_token");
  if(!accessToken) return null;
  return {
    access_token: accessToken,
    refresh_token: params.get("refresh_token") || "",
    token_type: params.get("token_type") || "bearer",
    expires_in: Number(params.get("expires_in") || 0) || 0,
    type: params.get("type") || "",
  };
}
async function fetchAuthUser(accessToken){
  const cfg = getSupabaseConfig();
  if(!cfg.url || !cfg.anonKey || !accessToken) return null;
  const res = await fetch(`${cfg.url}/auth/v1/user`, {
    method: "GET",
    headers: {
      apikey: cfg.anonKey,
      Authorization: `Bearer ${accessToken}`
    }
  });
  if(!res.ok) return null;
  return res.json();
}
async function consumeAuthCallbackIfPresent(){
  const callback = parseAuthCallbackFromHash();
  if(!callback) return false;
  const params = new URLSearchParams(window.location.search || "");
  const flow = String(params.get("authFlow") || "");
  const invite = String(params.get("invite") || "").trim();
  if(flow === "signup_email"){
    localStorage.setItem(LS_PASSWORD_SETUP_REQUIRED, "1");
  }
  const session = {
    access_token: callback.access_token,
    refresh_token: callback.refresh_token,
    token_type: callback.token_type,
    expires_in: callback.expires_in,
    expires_at: callback.expires_in ? (Math.floor(Date.now() / 1000) + callback.expires_in) : null,
    user: null,
  };
  try{
    const user = await fetchAuthUser(callback.access_token);
    if(user && typeof user === "object"){
      session.user = user;
    }
  }catch(err){
    console.error(err);
  }
  saveAuthSession(session);
  const cleanUrl = new URL(`${window.location.origin}${window.location.pathname}`);
  if(invite) cleanUrl.searchParams.set("invite", invite);
  const clean = cleanUrl.toString();
  history.replaceState({}, "", clean);
  return true;
}
async function maybeOpenPasswordSetupModal(){
  if(localStorage.getItem(LS_PASSWORD_SETUP_REQUIRED) !== "1") return;
  if(!getAuthAccessToken()) return;
  if($("authSetPasswordStatus")) $("authSetPasswordStatus").textContent = "";
  if($("authNewPassword")) $("authNewPassword").value = "";
  if($("authNewPasswordConfirm")) $("authNewPasswordConfirm").value = "";
  openModal("setPasswordModal");
}
async function updateAuthPassword(newPassword){
  const cfg = getSupabaseConfig();
  const accessToken = getAuthAccessToken();
  if(!cfg.url || !cfg.anonKey || !accessToken) throw new Error("ログイン状態が必要です");
  const res = await fetch(`${cfg.url}/auth/v1/user`, {
    method: "PUT",
    headers: {
      apikey: cfg.anonKey,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: newPassword })
  });
  const text = await res.text();
  const json = text ? JSON.parse(text) : {};
  if(!res.ok){
    throw new Error(json?.msg || json?.error_description || json?.error || `Auth error ${res.status}`);
  }
  return json;
}
async function submitNewPassword(){
  const pw = String($("authNewPassword")?.value || "");
  const pw2 = String($("authNewPasswordConfirm")?.value || "");
  const status = $("authSetPasswordStatus");
  const btn = $("authSetPasswordBtn");
  if(!pw || pw.length < 8){
    if(status){
      status.textContent = "8文字以上のパスワードを入力してください";
      status.style.color = "#b91c1c";
    }
    return;
  }
  if(pw !== pw2){
    if(status){
      status.textContent = "確認用パスワードが一致しません";
      status.style.color = "#b91c1c";
    }
    return;
  }
  if(btn) btn.disabled = true;
  if(status){
    status.textContent = "パスワードを設定しています…";
    status.style.color = "";
  }
  try{
    await updateAuthPassword(pw);
    localStorage.removeItem(LS_PASSWORD_SETUP_REQUIRED);
    if(status){
      status.textContent = "設定が完了しました。今後はメールアドレスとパスワードでログインできます。";
      status.style.color = "#0f766e";
    }
    toast("パスワードを設定しました");
    setTimeout(()=> closeModal("setPasswordModal"), 500);
  }catch(err){
    console.error(err);
    if(status){
      status.textContent = `設定失敗: ${err.message}`;
      status.style.color = "#b91c1c";
    }
  }finally{
    if(btn) btn.disabled = false;
  }
}
window.submitNewPassword = submitNewPassword;
function setHouseholdStatus(msg, isError = false){
  const el = $("householdStatus");
  if(!el) return;
  el.textContent = `世帯状態: ${msg}`;
  el.style.color = isError ? "#b91c1c" : "";
  refreshHouseholdControls();
}
function launchOnboardingIfNeeded(){
  if(localStorage.getItem(LS_PASSWORD_SETUP_REQUIRED) === "1") return;
  if(localStorage.getItem(LS_ONBOARD)) return;
  nextSlide(1);
  openModal("onboardingModal");
}
function refreshHouseholdControls(){
  const loggedIn = !!getAuthAccessToken();
  const hasHousehold = !!getActiveHouseholdId();
  const householdName = getActiveHouseholdName();
  const householdCode = getActiveHouseholdCode();
  const createBtn = $("createHouseholdBtn");
  const joinBtn = $("joinHouseholdBtn");
  const pullBtn = $("pullHouseholdBtn");
  const copyBtn = $("copyInviteBtn");
  const createJoinArea = $("householdCreateJoinArea");
  const joinedArea = $("householdJoinedArea");
  const joinedSummary = $("householdJoinedSummary");
  const signOutBtn = $("signOutBtn");
  const signInBtn = $("signInBtn");
  const signUpBtn = $("signUpBtn");
  const guide = $("householdGuide");
  if(createBtn) createBtn.disabled = !loggedIn;
  if(joinBtn) joinBtn.disabled = !loggedIn;
  if(pullBtn) pullBtn.disabled = !(loggedIn && hasHousehold);
  if(copyBtn) copyBtn.disabled = !(loggedIn && hasHousehold && !!householdCode);
  if(signOutBtn) signOutBtn.disabled = !loggedIn;
  if(signInBtn) signInBtn.style.display = loggedIn ? "none" : "";
  if(signUpBtn) signUpBtn.style.display = loggedIn ? "none" : "";
  if(signOutBtn) signOutBtn.style.display = loggedIn ? "" : "none";
  if(createJoinArea) createJoinArea.style.display = loggedIn && !hasHousehold ? "" : "none";
  if(joinedArea) joinedArea.style.display = loggedIn && hasHousehold ? "" : "none";
  if(joinedSummary){
    const safeName = householdName || "世帯";
    const safeCode = householdCode || "-";
    joinedSummary.textContent = `参加中の世帯: ${safeName}（コード: ${safeCode}）`;
  }
  if(guide){
    if(!loggedIn) guide.textContent = "ログインすると世帯共有を設定できます。";
    else if(!hasHousehold) guide.textContent = "「世帯を作成」または「招待コードで参加」を選択してください。";
    else guide.textContent = "世帯を共有中です。招待コピーから家族を追加できます。";
  }
}
function openProfileAuthGate(){
  if(getAuthAccessToken()){
    switchScreen(AUTH_GATE_NEXT_SCREEN || "score");
    return;
  }
  const modal = $("profileAuthGateModal");
  const closeBtn = $("authGateCloseBtn");
  if(modal){
    modal.dataset.locked = "1";
  }
  if(closeBtn){
    closeBtn.style.display = "none";
  }
  if($("authGateEmail") && $("authEmail")?.value) $("authGateEmail").value = $("authEmail").value;
  if($("authGatePassword")) $("authGatePassword").value = "";
  setAuthGateMode("login");
  setAuthGateBusy(false);
  setAuthGateStatus("");
  openModal("profileAuthGateModal");
}
window.openProfileAuthGate = openProfileAuthGate;
function openOpeningModal(){
  const modal = $("openingModal");
  if(!modal) return;
  modal.dataset.locked = "1";
  openModal("openingModal");
}
window.openOpeningModal = openOpeningModal;
function startAuthEntryFlow(){
  closeModal("openingModal");
  openProfileAuthGate();
}
window.startAuthEntryFlow = startAuthEntryFlow;
function closeProfileAuthGate(){
  const modal = $("profileAuthGateModal");
  if(modal?.dataset.locked === "1") return;
  closeModal("profileAuthGateModal");
}
window.closeProfileAuthGate = closeProfileAuthGate;
function getActiveHouseholdId(){
  return String(localStorage.getItem(LS_ACTIVE_HOUSEHOLD) || "");
}
function setActiveHouseholdId(householdId){
  if(householdId){
    localStorage.setItem(LS_ACTIVE_HOUSEHOLD, householdId);
  }else{
    localStorage.removeItem(LS_ACTIVE_HOUSEHOLD);
  }
}
function setActiveHouseholdCode(code){
  if(code){
    localStorage.setItem(LS_ACTIVE_HOUSEHOLD_CODE, code);
  }else{
    localStorage.removeItem(LS_ACTIVE_HOUSEHOLD_CODE);
  }
}
function getActiveHouseholdCode(){
  return String(localStorage.getItem(LS_ACTIVE_HOUSEHOLD_CODE) || "");
}
function setActiveHouseholdName(name){
  if(name){
    localStorage.setItem(LS_ACTIVE_HOUSEHOLD_NAME, name);
  }else{
    localStorage.removeItem(LS_ACTIVE_HOUSEHOLD_NAME);
  }
}
function getActiveHouseholdName(){
  return String(localStorage.getItem(LS_ACTIVE_HOUSEHOLD_NAME) || "");
}
function getInviteCodeFromUrl(){
  try{
    const u = new URL(window.location.href);
    return String(u.searchParams.get("invite") || "").trim().toUpperCase();
  }catch{
    return "";
  }
}
function isHouseholdSharedMode(){
  return !!(getAuthUserId() && getActiveHouseholdId());
}
function loadHouseholdValuePromptedMap(){
  return loadJSON(LS_HOUSEHOLD_VALUE_PROMPTED, {});
}
function markHouseholdValuePrompted(householdId){
  if(!householdId) return;
  const map = loadHouseholdValuePromptedMap();
  map[householdId] = Date.now();
  saveJSON(LS_HOUSEHOLD_VALUE_PROMPTED, map);
}
function wasHouseholdValuePrompted(householdId){
  if(!householdId) return false;
  const map = loadHouseholdValuePromptedMap();
  return !!map[householdId];
}
async function maybePromptHouseholdValueAlignment(){
  const householdId = getActiveHouseholdId();
  if(!householdId || !getAuthUserId()) return;
  if(wasHouseholdValuePrompted(householdId)) return;
  try{
    const members = await supabaseRequest(`household_members?household_id=eq.${encodeURIComponent(householdId)}&select=user_id`);
    const memberCount = Array.isArray(members) ? members.length : 0;
    if(memberCount >= 2){
      markHouseholdValuePrompted(householdId);
      openModal("householdValueModal");
    }
  }catch(err){
    console.error(err);
  }
}
function openHouseholdValueSetup(){
  closeModal("householdValueModal");
  switchScreen("profile");
  const section = $("settingsValueSection");
  if(section) section.open = true;
  setTimeout(()=> $("valueCat1")?.focus(), 0);
}
window.openHouseholdValueSetup = openHouseholdValueSetup;
let HOUSEHOLD_PULL_TIMER = null;
function applyHouseholdRowsToLocal(rows){
  const txRows = Array.isArray(rows.txRows) ? rows.txRows : [];
  const settingRows = Array.isArray(rows.settingRows) ? rows.settingRows : [];
  const profileRow = rows.profileRow || null;

  const tx = txRows.map(r=>({
    id: r.id,
    date: r.occurred_on,
    category: r.category,
    amount: Number(r.amount_yen || 0),
    satisfaction: r.sat == null ? null : Number(r.sat),
    valueTag: r.value_tag || null,
    memo: r.memo || "",
    trigMemo: r.memo || "",
    isDeleted: !!r.is_deleted
  }));
  saveTx(tx);

  const fixedMap = {};
  const incomeMap = {};
  const savingMap = {};
  for(const r of settingRows){
    const month = String(r.month || "").slice(0, 7);
    if(!month) continue;
    if(!fixedMap[month]){
      fixedMap[month] = { housingYen:0, utilityYen:0, netYen:0, subYen:0, mortgagePrincipalYen:0 };
      incomeMap[month] = 0;
      savingMap[month] = { saving:0, invest:0 };
    }
    fixedMap[month].housingYen += Number(r.housing_yen || 0);
    fixedMap[month].utilityYen += Number(r.utility_yen || 0);
    fixedMap[month].netYen += Number(r.net_yen || 0);
    fixedMap[month].subYen += Number(r.sub_yen || 0);
    fixedMap[month].mortgagePrincipalYen += Number(r.mortgage_principal_yen || 0);
    incomeMap[month] += Number(r.income_yen || 0);
    savingMap[month].saving += Number(r.saving_yen || 0);
    savingMap[month].invest += Number(r.invest_yen || 0);
  }
  saveJSON(LS_FIXED, fixedMap);
  saveIncomeMap(incomeMap);
  saveSavingMap(savingMap);

  if(profileRow){
    const profile = {
      household: profileRow.household_size ? String(profileRow.household_size) : "unknown",
      householdSize: Number(profileRow.household_size || 0) || "",
      age: Number(profileRow.age || 0) || "",
      annualIncomeGross: Number(profileRow.annual_income_gross_yen || 0) || "",
      housingType: profileRow.housing_type || "unknown",
      regionType: profileRow.region_type || "unknown",
      workType: profileRow.work_type || "unknown",
      valueCats: [
        profileRow.value_cat_1 || "",
        profileRow.value_cat_2 || "",
        profileRow.value_cat_3 || "",
        profileRow.value_cat_4 || "",
        profileRow.value_cat_5 || "",
      ],
      valueTop3: [
        profileRow.value_top_1 || "",
        profileRow.value_top_2 || "",
        profileRow.value_top_3 || "",
      ].filter(Boolean),
    };
    saveJSON(LS_PROFILE, profile);
  }
}
async function pullHouseholdDataToLocal({ silent = false } = {}){
  if(!isHouseholdSharedMode()) return false;
  const householdId = getActiveHouseholdId();
  if(!householdId) return false;
  const hid = encodeURIComponent(householdId);
  try{
    if(!silent) setHouseholdStatus("世帯データ読み込み中...");
    const [txRows, settingRows, profileRows] = await Promise.all([
      supabaseRequest(`transactions?household_id=eq.${hid}&is_deleted=eq.false&select=id,occurred_on,category,amount_yen,sat,value_tag,memo,is_deleted,updated_at&order=occurred_on.desc,updated_at.desc&limit=10000`),
      supabaseRequest(`monthly_settings?household_id=eq.${hid}&select=month,income_yen,saving_yen,invest_yen,housing_yen,utility_yen,net_yen,sub_yen,mortgage_principal_yen`),
      supabaseRequest(`user_profiles?household_id=eq.${hid}&select=household_size,age,annual_income_gross_yen,housing_type,region_type,work_type,value_cat_1,value_cat_2,value_cat_3,value_cat_4,value_cat_5,value_top_1,value_top_2,value_top_3,effective_month,created_at&order=effective_month.desc,created_at.desc&limit=1`)
    ]);
    applyHouseholdRowsToLocal({ txRows, settingRows, profileRow: profileRows?.[0] || null });
    renderCalendar();
    renderList();
    renderMonthlyReport();
    renderWeeklyInline();
    renderMonthlyGate();
    loadProfileToUI();
    if(!silent) setHouseholdStatus("世帯データを更新しました");
    return true;
  }catch(err){
    console.error(err);
    if(!silent) setHouseholdStatus(`読み込み失敗: ${err.message}`, true);
    return false;
  }
}
function startHouseholdPulling(){
  if(HOUSEHOLD_PULL_TIMER){
    clearInterval(HOUSEHOLD_PULL_TIMER);
    HOUSEHOLD_PULL_TIMER = null;
  }
  if(!isHouseholdSharedMode()) return;
  HOUSEHOLD_PULL_TIMER = setInterval(()=>{
    pullHouseholdDataToLocal({ silent:true });
  }, 30000);
}
async function pullHouseholdNow(){
  const ok = await pullHouseholdDataToLocal();
  toast(ok ? "世帯データを再読み込みしました" : "世帯データの読み込みに失敗しました");
}
window.pullHouseholdNow = pullHouseholdNow;
async function supabaseAuthRequest(path, { method = "POST", body = null } = {}){
  const cfg = getSupabaseConfig();
  if(!cfg.url || !cfg.anonKey) throw new Error("Supabase未設定");
  const headers = {
    apikey: cfg.anonKey,
    "Content-Type": "application/json",
  };
  const res = await fetch(`${cfg.url}/auth/v1/${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  const json = text ? JSON.parse(text) : {};
  if(!res.ok){
    throw new Error(json?.msg || json?.error_description || json?.error || `Auth error ${res.status}`);
  }
  return json;
}
async function signUpWithEmail(){
  const email = String($("authEmail")?.value || "").trim();
  return signUpWithEmailCore(email, { fromGate:false });
}
async function signUpWithEmailCore(email, { fromGate = false } = {}){
  if(!email){
    const msg = "メールアドレスを入力してください";
    toast(msg);
    if(fromGate) setAuthGateStatus(msg, true);
    return false;
  }
  try{
    await supabaseAuthRequest("otp", {
      body: {
        email,
        create_user: true,
        email_redirect_to: getAppAuthRedirectUrl("signup_email")
      }
    });
    setAuthStatus("確認メールを送信しました。メールのリンクを開いてパスワードを設定してください");
    if(fromGate){
      if($("authEmail")) $("authEmail").value = email;
      setAuthGateStatus("確認メールを送信しました。メールのリンクを開くと、パスワード設定画面が表示されます。");
    }
    toast("確認メールを送信しました");
    return true;
  }catch(err){
    console.error(err);
    setAuthStatus(`登録失敗: ${err.message}`, true);
    if(fromGate) setAuthGateStatus(`登録失敗: ${err.message}`, true);
    toast("登録失敗");
    return false;
  }
}
window.signUpWithEmail = signUpWithEmail;
async function signUpFromGate(){
  if(AUTH_GATE_BUSY) return;
  const email = String($("authGateEmail")?.value || "").trim();
  setAuthGateBusy(true, "signup");
  try{
    await signUpWithEmailCore(email, { fromGate:true });
  }finally{
    setAuthGateBusy(false);
  }
}
window.signUpFromGate = signUpFromGate;
async function signInWithEmail(){
  const email = String($("authEmail")?.value || "").trim();
  const password = String($("authPassword")?.value || "");
  return signInWithEmailCore(email, password, { fromGate:false });
}
async function signInWithEmailCore(email, password, { fromGate = false } = {}){
  if(!email || !password){
    const msg = "メールアドレスとパスワードを入力してください";
    toast(msg);
    if(fromGate) setAuthGateStatus(msg, true);
    return false;
  }
  try{
    const raw = await supabaseAuthRequest("token?grant_type=password", {
      body: { email, password }
    });
    const session = normalizeAuthSessionPayload(raw);
    if(!session?.access_token){
      throw new Error("ログインセッションの取得に失敗しました");
    }
    saveAuthSession(session);
    await ensureRemoteUser();
    await refreshHouseholdState();
    await pullHouseholdDataToLocal({ silent:true });
    startHouseholdPulling();
    setAuthStatus(`ログイン中: ${email}`);
    launchOnboardingIfNeeded();
    if(fromGate){
      if($("authEmail")) $("authEmail").value = email;
      if($("authPassword")) $("authPassword").value = password;
      setAuthGateStatus("");
      const modal = $("profileAuthGateModal");
      if(modal) modal.dataset.locked = "";
      const closeBtn = $("authGateCloseBtn");
      if(closeBtn) closeBtn.style.display = "";
      closeProfileAuthGate();
      switchScreen(AUTH_GATE_NEXT_SCREEN || "score");
    }
    toast("ログインしました");
    return true;
  }catch(err){
    console.error(err);
    const rawMsg = String(err?.message || "");
    const friendlyMsg = /email.*confirm|confirmed|verify/i.test(rawMsg)
      ? "メール認証が未完了です。届いたメールのリンクを開いてからログインしてください。"
      : `ログイン失敗: ${rawMsg}`;
    setAuthStatus(friendlyMsg, true);
    if(fromGate) setAuthGateStatus(friendlyMsg, true);
    toast("ログイン失敗");
    return false;
  }
}
window.signInWithEmail = signInWithEmail;
async function signInFromGate(){
  if(AUTH_GATE_BUSY) return;
  const email = String($("authGateEmail")?.value || "").trim();
  const password = String($("authGatePassword")?.value || "");
  setAuthGateBusy(true, "signin");
  try{
    await signInWithEmailCore(email, password, { fromGate:true });
  }finally{
    setAuthGateBusy(false);
  }
}
window.signInFromGate = signInFromGate;
function signOutAccount(){
  saveAuthSession(null);
  setActiveHouseholdId("");
  setActiveHouseholdCode("");
  setActiveHouseholdName("");
  if(HOUSEHOLD_PULL_TIMER){
    clearInterval(HOUSEHOLD_PULL_TIMER);
    HOUSEHOLD_PULL_TIMER = null;
  }
  setAuthStatus("未ログイン");
  setHouseholdStatus("未参加");
  toast("ログアウトしました");
  AUTH_GATE_NEXT_SCREEN = "score";
  openOpeningModal();
}
window.signOutAccount = signOutAccount;
async function createHousehold(){
  const name = String($("householdName")?.value || "").trim() || "わが家";
  if(!getAuthAccessToken() || !getAuthUserId()){
    toast("先にログインしてください");
    return;
  }
  try{
    const created = await supabaseRequest("rpc/create_household_with_membership", {
      method: "POST",
      body: { p_name: name },
      prefer: "return=representation"
    });
    const household = created?.[0] || {};
    const householdId = household.id || household.household_id || household.out_household_id;
    const householdName = household.name || household.household_name || household.out_household_name;
    const inviteCode = household.invite_code || household.household_invite_code || household.out_household_invite_code;
    if(!householdId) throw new Error("世帯作成に失敗しました");
    setActiveHouseholdId(householdId);
    setActiveHouseholdCode(inviteCode || "");
    setActiveHouseholdName(householdName || "");
    await pullHouseholdDataToLocal({ silent:true });
    startHouseholdPulling();
    setHouseholdStatus(`参加中: ${householdName || "世帯"} / コード ${inviteCode || "-"}`);
    await maybePromptHouseholdValueAlignment();
    toast("世帯を作成しました");
  }catch(err){
    console.error(err);
    if(String(err?.message || "").includes("42501")){
      setHouseholdStatus("世帯作成失敗: ログインをやり直してから再実行してください", true);
    }else{
      setHouseholdStatus(`世帯作成失敗: ${err.message}`, true);
    }
    toast("世帯作成失敗");
  }
}
window.createHousehold = createHousehold;
async function joinHousehold(){
  const code = String($("joinHouseholdCode")?.value || "").trim().toUpperCase();
  if(!code){
    toast("参加コードを入力してください");
    return;
  }
  if(!getAuthAccessToken() || !getAuthUserId()){
    toast("先にログインしてください");
    return;
  }
  try{
    const joined = await supabaseRequest("rpc/join_household_by_code", {
      method: "POST",
      body: { p_invite_code: code },
      prefer: "return=representation"
    });
    const household = joined?.[0] || {};
    const householdId = household.id || household.household_id || household.out_household_id;
    const householdName = household.name || household.household_name || household.out_household_name;
    const inviteCode = household.invite_code || household.household_invite_code || household.out_household_invite_code;
    if(!householdId) throw new Error("参加コードが見つかりません");
    setActiveHouseholdId(householdId);
    setActiveHouseholdCode(inviteCode || "");
    setActiveHouseholdName(householdName || "");
    await pullHouseholdDataToLocal({ silent:true });
    startHouseholdPulling();
    setHouseholdStatus(`参加中: ${householdName || "世帯"} / コード ${inviteCode || "-"}`);
    await maybePromptHouseholdValueAlignment();
    toast("世帯に参加しました");
  }catch(err){
    console.error(err);
    setHouseholdStatus(`参加失敗: ${err.message}`, true);
    toast("参加失敗");
  }
}
window.joinHousehold = joinHousehold;
async function refreshHouseholdState(){
  if(!getAuthUserId()){
    setHouseholdStatus("世帯未参加");
    return;
  }
  try{
    const userId = await ensureRemoteUser();
    const members = await supabaseRequest(`household_members?user_id=eq.${encodeURIComponent(userId)}&select=household_id,role&limit=1`);
    const member = members?.[0];
    if(!member?.household_id){
      setActiveHouseholdId("");
      setActiveHouseholdCode("");
      setActiveHouseholdName("");
      startHouseholdPulling();
      setHouseholdStatus("世帯未参加");
      return;
    }
    setActiveHouseholdId(member.household_id);
    startHouseholdPulling();
    const households = await supabaseRequest(`households?id=eq.${encodeURIComponent(member.household_id)}&select=id,name,invite_code&limit=1`);
    const h = households?.[0];
    setActiveHouseholdCode(h?.invite_code || "");
    setActiveHouseholdName(h?.name || "");
    setHouseholdStatus(h?.name ? `参加中: ${h.name} / コード ${h.invite_code}` : "世帯参加中");
    await maybePromptHouseholdValueAlignment();
  }catch(err){
    console.error(err);
    setHouseholdStatus(`世帯状態取得失敗: ${err.message}`, true);
  }
}
async function copyHouseholdInvite(){
  const code = getActiveHouseholdCode();
  if(!code){
    toast("世帯コードがありません");
    return;
  }
  const inviteUrl = `${window.location.origin}${window.location.pathname}?invite=${encodeURIComponent(code)}`;
  const text = `家計アプリの世帯招待コード: ${code}\n参加リンク: ${inviteUrl}`;
  try{
    await navigator.clipboard.writeText(text);
    toast("招待情報をコピーしました");
  }catch{
    toast("コピーに失敗しました");
  }
}
window.copyHouseholdInvite = copyHouseholdInvite;
function shouldShowHouseholdOnboarding(){
  if(localStorage.getItem(LS_HOUSEHOLD_ONBOARDING_DONE) === "1") return false;
  if(getAuthUserId()) return false;
  return true;
}
function openHouseholdOnboarding(){
  if(!shouldShowHouseholdOnboarding()) return;
  openModal("householdOnboardingModal");
}
function skipHouseholdOnboarding(){
  localStorage.setItem(LS_HOUSEHOLD_ONBOARDING_DONE, "1");
  closeModal("householdOnboardingModal");
}
window.skipHouseholdOnboarding = skipHouseholdOnboarding;
function startSharedOnboarding(){
  localStorage.setItem(LS_HOUSEHOLD_ONBOARDING_DONE, "1");
  closeModal("householdOnboardingModal");
  switchScreen("profile");
  const section = $("settingsHouseholdSection");
  if(section) section.open = true;
  setTimeout(()=> $("authEmail")?.focus(), 0);
}
window.startSharedOnboarding = startSharedOnboarding;
function hasSupabaseConfig(){
  const cfg = getSupabaseConfig();
  return !!(cfg.url && cfg.anonKey);
}
function getAnonId(){
  const state = loadJSON(LS_REMOTE_USER, {});
  if(state.anonymousId) return state.anonymousId;
  const anonymousId = (crypto && crypto.randomUUID) ? crypto.randomUUID() : `anon_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  saveJSON(LS_REMOTE_USER, { ...state, anonymousId });
  return anonymousId;
}
function monthToDate(m){
  return /^\d{4}-\d{2}$/.test(m || "") ? `${m}-01` : null;
}
async function supabaseRequest(path, { method = "GET", body = null, prefer = "" } = {}){
  const cfg = getSupabaseConfig();
  if(!cfg.url || !cfg.anonKey) throw new Error("Supabase未設定");
  const anonId = getAnonId();
  const accessToken = getAuthAccessToken();
  const headers = {
    apikey: cfg.anonKey,
    Authorization: `Bearer ${accessToken || cfg.anonKey}`,
    "x-anon-id": anonId,
  };
  if(body !== null) headers["Content-Type"] = "application/json";
  if(prefer) headers["Prefer"] = prefer;
  const res = await fetch(`${cfg.url}/rest/v1/${path}`, {
    method,
    headers,
    body: body !== null ? JSON.stringify(body) : undefined,
  });
  if(!res.ok){
    const text = await res.text();
    throw new Error(`Supabase API error ${res.status}: ${text || res.statusText}`);
  }
  if(res.status === 204) return null;
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}
async function ensureRemoteUser(){
  const state = loadJSON(LS_REMOTE_USER, {});
  const authUserId = getAuthUserId();
  if(authUserId){
    const s = loadAuthSession();
    const anonymousId = `auth_${authUserId}`;
    const payload = {
      id: authUserId,
      anonymous_id: anonymousId,
      consent_version: "2026-03-ja-v1",
      app_version: "web-local",
      locale: "ja-JP",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Tokyo",
    };
    await supabaseRequest(
      "users?on_conflict=id&select=id,anonymous_id",
      { method: "POST", body: payload, prefer: "resolution=merge-duplicates,return=representation" }
    );
    saveJSON(LS_REMOTE_USER, {
      ...state,
      anonymousId,
      userId: authUserId,
      email: s?.user?.email || state.email || ""
    });
    return authUserId;
  }
  if(state.userId) return state.userId;
  const anonymousId = getAnonId();
  const consentVersion = "2026-03-ja-v1";
  const payload = {
    anonymous_id: anonymousId,
    consent_version: consentVersion,
    app_version: "web-local",
    locale: "ja-JP",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Tokyo",
  };
  const upsert = await supabaseRequest(
    "users?on_conflict=anonymous_id&select=id,anonymous_id",
    { method: "POST", body: payload, prefer: "resolution=merge-duplicates,return=representation" }
  );
  const userId = upsert?.[0]?.id;
  if(!userId) throw new Error("ユーザー作成に失敗しました");
  saveJSON(LS_REMOTE_USER, { ...state, anonymousId, userId });
  return userId;
}
async function syncProfileToSupabase(){
  if(!hasSupabaseConfig()) return;
  const userId = await ensureRemoteUser();
  const householdId = getActiveHouseholdId() || null;
  const profile = getProfile();
  const nowMonth = monthToDate(ym(new Date()));
  if(!nowMonth) return;
  const valueCats = normalizeValueCats(profile.valueCats);
  const top3 = getValueTop3FromProfile(profile);
  const payload = {
    user_id: userId,
    household_id: householdId,
    household_size: Number(profile.householdSize || profile.household || 0) || null,
    age: Number(profile.age || 0) || null,
    annual_income_gross_yen: Number(profile.annualIncomeGross || 0) || null,
    housing_type: profile.housingType || "unknown",
    region_type: profile.regionType || "unknown",
    work_type: profile.workType || "unknown",
    value_cat_1: valueCats[0] || null,
    value_cat_2: valueCats[1] || null,
    value_cat_3: valueCats[2] || null,
    value_cat_4: valueCats[3] || null,
    value_cat_5: valueCats[4] || null,
    value_top_1: top3[0] || null,
    value_top_2: top3[1] || null,
    value_top_3: top3[2] || null,
    effective_month: nowMonth,
  };
  await supabaseRequest("user_profiles", {
    method: "POST",
    body: payload,
    prefer: "return=minimal",
  });
}
async function syncMonthlySettingsToSupabase(monthStr){
  if(!hasSupabaseConfig()) return;
  const month = monthToDate(monthStr);
  if(!month) return;
  const userId = await ensureRemoteUser();
  const householdId = getActiveHouseholdId() || null;
  const fixedAll = loadJSON(LS_FIXED, {});
  const fixed = fixedAll[monthStr] || {};
  const incomeAll = loadIncomeMap();
  const savingAll = loadSavingMap();
  const saving = savingAll[monthStr] || {};
  const payload = {
    user_id: userId,
    household_id: householdId,
    month,
    income_yen: Number(incomeAll[monthStr] || 0),
    saving_yen: Number(saving.saving || 0),
    invest_yen: Number(saving.invest || 0),
    housing_yen: Number(fixed.housingYen || 0),
    utility_yen: Number(fixed.utilityYen || 0),
    net_yen: Number(fixed.netYen || 0),
    sub_yen: Number(fixed.subYen || 0),
    mortgage_principal_yen: Number(fixed.mortgagePrincipalYen || 0),
  };
  await supabaseRequest("monthly_settings?on_conflict=user_id,month", {
    method: "POST",
    body: payload,
    prefer: "resolution=merge-duplicates,return=minimal",
  });
}
function txToRemotePayload(tx, userId){
  const householdId = getActiveHouseholdId() || null;
  return {
    id: tx.id,
    user_id: userId,
    household_id: householdId,
    occurred_on: tx.date,
    category: tx.category,
    amount_yen: Number(tx.amount || 0),
    sat: tx.satisfaction == null ? null : Number(tx.satisfaction),
    value_tag: tx.valueTag || null,
    memo: tx.memo || null,
    is_deleted: !!tx.isDeleted,
  };
}
async function syncTransactionToSupabase(tx){
  if(!hasSupabaseConfig() || !tx?.id) return;
  const userId = await ensureRemoteUser();
  await supabaseRequest("transactions?on_conflict=id", {
    method: "POST",
    body: txToRemotePayload(tx, userId),
    prefer: "resolution=merge-duplicates,return=minimal",
  });
}
async function testSupabaseConnection(){
  if(!hasSupabaseConfig()){
    toast("先に接続情報を保存してください");
    setSupabaseStatus("未接続", true);
    return;
  }
  setSupabaseStatus("接続テスト中...");
  try{
    const userId = await ensureRemoteUser();
    setSupabaseStatus(`接続OK / user: ${userId.slice(0, 8)}...`);
    toast("接続OK");
  }catch(err){
    console.error(err);
    setSupabaseStatus(`接続失敗: ${err.message}`, true);
    toast("接続失敗");
  }
}
window.testSupabaseConnection = testSupabaseConnection;
async function syncAllToSupabase(){
  if(!hasSupabaseConfig()){
    toast("先に接続情報を保存してください");
    setSupabaseStatus("未接続", true);
    return;
  }
  setSupabaseStatus("同期中...");
  try{
    await syncProfileToSupabase();
    const monthKeys = new Set();
    Object.keys(loadJSON(LS_FIXED, {})).forEach(m=> monthKeys.add(m));
    Object.keys(loadIncomeMap()).forEach(m=> monthKeys.add(m));
    Object.keys(loadSavingMap()).forEach(m=> monthKeys.add(m));
    for(const m of monthKeys){
      await syncMonthlySettingsToSupabase(m);
    }
    const tx = loadTx();
    for(const row of tx){
      await syncTransactionToSupabase(row);
    }
    await pullHouseholdDataToLocal({ silent:true });
    setSupabaseStatus(`同期完了: ${tx.length}件`);
    toast("Supabase同期完了");
  }catch(err){
    console.error(err);
    setSupabaseStatus(`同期失敗: ${err.message}`, true);
    toast("同期失敗");
  }
}
window.syncAllToSupabase = syncAllToSupabase;
function syncSafely(task, successMessage){
  task().then(()=>{
    if(successMessage) setSupabaseStatus(successMessage);
  }).catch(err=>{
    console.error(err);
    if(hasSupabaseConfig()){
      setSupabaseStatus(`同期失敗: ${err.message}`, true);
    }
  });
}
function isPremiumUser(){
  return localStorage.getItem(LS_PREMIUM) === "1";
}
function syncPremiumModeDevUI(){
  const el = $("premiumModeDev");
  if(!el) return;
  el.value = isPremiumUser() ? "premium" : "free";
}
function setPremiumMode(mode){
  const premium = mode === "premium";
  localStorage.setItem(LS_PREMIUM, premium ? "1" : "0");
  syncPremiumModeDevUI();
  renderMonthlyReport();
  renderMonthlyGate();
  toast(`表示モード: ${premium ? "プレミアム" : "無料"}`);
}
window.setPremiumMode = setPremiumMode;
function openPremiumModal(opts = {}){
  const title = $("premiumModalTitle");
  const body = $("premiumModalBody");
  if(title) title.textContent = opts.title || "プレミアムで解放";
  if(body) body.textContent = opts.message || "この機能はプレミアムで利用できます。";
  openModal("premiumModal");
}
function openPremiumFromCompare(){
  openPremiumModal({
    title: "比較履歴を解放",
    message: "マンスリーサマリー詳細はプレミアムで利用できます。"
  });
}
window.openPremiumFromCompare = openPremiumFromCompare;
function openPremiumPlan(){
  closeModal("premiumModal");
  openModal("premiumPlanModal");
}
window.openPremiumPlan = openPremiumPlan;
function loadReviewState(){
  return loadJSON(LS_REVIEW, { weeklyLast:null, monthly:{} });
}
function saveReviewState(state){
  saveJSON(LS_REVIEW, state);
}
function loadMonthlyReady(){
  return loadJSON(LS_MONTHLY_READY, { ready:{}, lastSeenMonth:null });
}
function saveMonthlyReady(state){
  saveJSON(LS_MONTHLY_READY, state);
}
function markMonthlyReady(monthStr){
  if(!monthStr) return;
  const state = loadMonthlyReady();
  state.ready = state.ready || {};
  state.ready[monthStr] = true;
  saveMonthlyReady(state);
}
function getLatestReadyMonth(){
  const state = loadMonthlyReady();
  const months = Object.keys(state.ready || {}).sort();
  return months.length ? months[months.length - 1] : null;
}
function canViewMonthlySummaryOnFree(monthStr){
  if(!monthStr) return false;
  const currentMonth = ym(new Date());
  if(monthStr === currentMonth) return true;
  const latestReady = getLatestReadyMonth();
  if(latestReady && monthStr === latestReady) return true;
  return false;
}
function markWeeklyReview(dateStr){
  if(!dateStr) return;
  const state = loadReviewState();
  state.weeklyLast = dateStr;
  saveReviewState(state);
}
function markMonthlyReview(monthStr){
  if(!monthStr) return;
  const state = loadReviewState();
  state.monthly = state.monthly || {};
  state.monthly[monthStr] = true;
  saveReviewState(state);
}
function saveMonthlyAverageScore(monthStr, score){
  if(!monthStr || !Number.isFinite(score)) return;
  const state = loadJSON(LS_MONTHLY_AVG, {});
  state[monthStr] = score;
  saveJSON(LS_MONTHLY_AVG, state);
}
function getCumulativeMonthlyAverageScore(){
  const state = loadJSON(LS_MONTHLY_AVG, {});
  return Object.values(state).reduce((sum, value)=>(
    sum + (Number.isFinite(value) ? Number(value) : 0)
  ), 0);
}
function getTotalXP(){
  return Number(loadJSON(LS_TOTAL_XP, 0)) || 0;
}
function saveTotalXP(value){
  saveJSON(LS_TOTAL_XP, Number(value || 0));
}
function loadXPMonths(){
  return loadJSON(LS_XP_MONTHS, {});
}
function addMonthlyXP(monthStr, amount){
  if(!monthStr || !Number.isFinite(amount)) return getTotalXP();
  const log = loadXPMonths();
  const existing = log[monthStr];
  if(existing === true) return getTotalXP();
  if(existing && existing.provisional === false) return getTotalXP();
  const finalAmount = Math.round(amount);
  const prevAmount = existing && typeof existing.amount === "number" ? existing.amount : 0;
  const delta = Math.max(finalAmount - prevAmount, 0);
  if(delta <= 0){
    log[monthStr] = { amount: finalAmount, provisional: false };
    saveJSON(LS_XP_MONTHS, log);
    return getTotalXP();
  }
  const next = getTotalXP() + delta;
  log[monthStr] = { amount: finalAmount, provisional: false };
  saveJSON(LS_XP_MONTHS, log);
  saveTotalXP(next);
  return next;
}
function addMonthlyProvisionalXP(monthStr, amount){
  if(!monthStr || !Number.isFinite(amount)) return getTotalXP();
  const log = loadXPMonths();
  const existing = log[monthStr];
  if(existing === true) return getTotalXP();
  if(existing && existing.provisional === false) return getTotalXP();
  if(existing && existing.provisional === true) return getTotalXP();
  const provisionalAmount = Math.max(10, Math.round(amount));
  const next = getTotalXP() + provisionalAmount;
  log[monthStr] = { amount: provisionalAmount, provisional: true };
  saveJSON(LS_XP_MONTHS, log);
  saveTotalXP(next);
  return next;
}
function loadDailyXPLog(){
  return loadJSON(LS_DAILY_XP, {});
}
function addDailyXP(dateStr, amount){
  if(!dateStr || !Number.isFinite(amount)) return getTotalXP();
  const log = loadDailyXPLog();
  if(log[dateStr]) return getTotalXP();
  const next = getTotalXP() + Math.round(amount);
  log[dateStr] = true;
  saveJSON(LS_DAILY_XP, log);
  saveTotalXP(next);
  return next;
}
function calcStreakDays(dateSet){
  if(!dateSet || !dateSet.size) return 0;
  const today = ymd(new Date());
  let count = 0;
  let cursor = today;
  while(dateSet.has(cursor)){
    count += 1;
    const d = toDate(cursor);
    d.setDate(d.getDate() - 1);
    cursor = ymd(d);
  }
  return count;
}
function getWeeklyReviewScore(start, end){
  const state = loadReviewState();
  if(!state.weeklyLast) return 0;
  const d = toDate(state.weeklyLast);
  return (d >= start && d <= end) ? 100 : 0;
}
function getMonthlyReviewScore(monthStr){
  const state = loadReviewState();
  return state.monthly && state.monthly[monthStr] ? 100 : 0;
}
function calcAxisScore(values){
  const valid = values.filter(v=>Number.isFinite(v));
  if(!valid.length) return 50;
  const avg = valid.reduce((a,b)=>a+b,0) / valid.length;
  return clamp(Math.round(avg), 0, 100);
}
function normalCdf(z){
  const sign = z < 0 ? -1 : 1;
  const x = Math.abs(z) / Math.sqrt(2);
  const t = 1 / (1 + 0.3275911 * x);
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const erf = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return 0.5 * (1 + sign * erf);
}
function loadEvolutionMap(){
  return loadJSON(LS_EVOLUTION, {});
}
function saveEvolutionMap(map){
  saveJSON(LS_EVOLUTION, map);
}
function ensureEvolutionCategory(stage, txList){
  const map = loadEvolutionMap();
  const key = String(stage);
  if(map[key]) return map[key];
  const topCategory = getTopCategory(txList);
  if(topCategory){
    map[key] = topCategory;
    saveEvolutionMap(map);
    return topCategory;
  }
  return null;
}
function getLatestMonthlyAvgScore(){
  const state = loadJSON(LS_MONTHLY_AVG, {});
  const months = Object.keys(state || {}).sort();
  if(!months.length) return null;
  const last = months[months.length - 1];
  const val = Number(state[last]);
  return Number.isFinite(val) ? val : null;
}
function calcHabitScore(daysWithEntry, totalDays){
  if(!Number.isFinite(daysWithEntry) || !Number.isFinite(totalDays) || totalDays <= 0){
    return null;
  }
  return clamp(Math.round((daysWithEntry / totalDays) * 100), 0, 100);
}
function loadTx(){ return loadJSON(LS_TX, []); }
function saveTx(list){ saveJSON(LS_TX, list); }

function loadSavingMap(){ return loadJSON(LS_SAVING, {}); }
function saveSavingMap(map){ saveJSON(LS_SAVING, map); }
function getSavingForMonth(m){ return loadSavingMap()[m] || null; }
function setSavingForMonth(m, saving, invest){
  const map = loadSavingMap();
  map[m] = { saving:Number(saving||0), invest:Number(invest||0) };
  saveSavingMap(map);
}

function loadIncomeMap(){ return loadJSON(LS_INCOME, {}); }
function saveIncomeMap(map){ saveJSON(LS_INCOME, map); }
function getIncomeForMonth(m){ return loadIncomeMap()[m] ?? null; }
function setIncomeForMonth(m, income){
  const map = loadIncomeMap();
  map[m] = Number(income||0);
  saveIncomeMap(map);
}

function prevMonthStr(m){
  if(!m || !/^\d{4}-\d{2}$/.test(m)) return null;
  const [y, mo] = m.split("-").map(Number);
  const d = new Date(y, mo - 1, 1);
  d.setMonth(d.getMonth() - 1);
  return ym(d);
}

function loadMonthlySettings(m){
  if(!m) return;
  const fixedAll = loadJSON(LS_FIXED, {});
  const incomeAll = loadIncomeMap();
  const prev = prevMonthStr(m);

  const fixed = fixedAll[m] || (prev ? fixedAll[prev] : null) || { housingYen:0, utilityYen:0, netYen:0, subYen:0, mortgagePrincipalYen:0 };
  $("housingYen") && ($("housingYen").value = fixed.housingYen ? String(fixed.housingYen) : "");
  $("utilityYen") && ($("utilityYen").value = fixed.utilityYen ? String(fixed.utilityYen) : "");
  $("netYen") && ($("netYen").value = fixed.netYen ? String(fixed.netYen) : "");
  $("subYen") && ($("subYen").value = fixed.subYen ? String(fixed.subYen) : "");
  $("mortgagePrincipalYen") && ($("mortgagePrincipalYen").value = fixed.mortgagePrincipalYen ? String(fixed.mortgagePrincipalYen) : "");

  const income = incomeAll[m] ?? (prev ? incomeAll[prev] : null);
  $("incomeYen") && ($("incomeYen").value = income ? String(income) : "");
}

function saveMonthlySettings(m){
  if(!m) return;
  const fixedAll = loadJSON(LS_FIXED, {});
  const prev = prevMonthStr(m);
  const base = fixedAll[m] || (prev ? fixedAll[prev] : null) || {};

  const getVal = (id, fallback)=> {
    const raw = $(id)?.value.trim();
    if(raw === "") return fallback ?? 0;
    return Number(raw || 0);
  };

  fixedAll[m] = {
    housingYen: getVal("housingYen", base.housingYen),
    utilityYen: getVal("utilityYen", base.utilityYen),
    netYen: getVal("netYen", base.netYen),
    subYen: getVal("subYen", base.subYen),
    mortgagePrincipalYen: getVal("mortgagePrincipalYen", base.mortgagePrincipalYen),
  };
  saveJSON(LS_FIXED, fixedAll);

  const incomeRaw = $("incomeYen")?.value.trim();
  if(incomeRaw !== ""){
    setIncomeForMonth(m, Number(incomeRaw || 0));
  }
  syncSafely(()=> syncMonthlySettingsToSupabase(m));
}

let CAL_ANCHOR = monthStart(new Date());
let SELECTED_DATE = ymd(new Date());
let entryStep = "category"; // category -> amount -> satisfaction -> memo

const ENTRY_STEPS = ["category","amount","quality","memo"];
let PENDING_MONTHLY = false;

function setEntryStep(step){
  entryStep = step;
  const btn = $("entryPrimaryBtn");
  if(!btn) return;
  btn.textContent = (step === "memo") ? "保存" : "次へ";
}

function showEntryStep(step){
  ENTRY_STEPS.forEach(s=>{
    const el = $("step-" + s);
    if(el) el.style.display = (s === step) ? "" : "none";
  });
  setEntryStep(step);
}

/* ===== Modal helpers ===== */
function openModal(id){
  const el = $(id);
  if(!el) return;
  el.style.display = "flex";
  el.classList.remove("hidden");
  requestAnimationFrame(()=>{ el.classList.add("isOpen"); });
}
function closeModal(id){
  const el = $(id);
  if(!el) return;
  el.classList.remove("isOpen");
  el.style.display = "none";
  el.classList.add("hidden");
}
window.closeModal = closeModal;

/* ===== Screen Tabs ===== */
function syncReportMonthDefault(){
  const el = $("reportMonth");
  if(el && !el.value) el.value = ym(new Date());
}

function updateScreenHeader(name){
  const headerMap = {
    input: { icon:"✏️", title:"入力", hint:"カテゴリを選んで今日の支出を記録する" },
    list: { icon:"📅", title:"カレンダー", hint:"" },
    report: { icon:"🧾", title:"レポート", hint:"" },
    score: { icon:"🏠", title:"ホーム", hint:"今月の状態をキャラクターで確認しよう" },
    profile: { icon:"⚙️", title:"設定", hint:"" }
  };
  const data = headerMap[name] || headerMap.score;
  if($("currentScreenIcon")) $("currentScreenIcon").textContent = data.icon;
  if($("currentScreenTitle")) $("currentScreenTitle").textContent = data.title;
  if($("currentScreenHint")){
    $("currentScreenHint").textContent = data.hint;
    $("currentScreenHint").style.display = data.hint ? "" : "none";
  }
}

function switchScreen(name){
  if(!getAuthAccessToken()){
    AUTH_GATE_NEXT_SCREEN = name || "score";
    if($("profileAuthGateModal")?.classList.contains("isOpen")){
      return;
    }
    if($("openingModal")?.classList.contains("isOpen")){
      return;
    }
    openOpeningModal();
    return;
  }
  const map = { input:"screen-input", list:"screen-list", report:"screen-report", score:"screen-score", profile:"screen-profile" };
  if(!map[name]) name = "score";
  Object.values(map).forEach(id=>{
    const el = $(id);
    if(el) el.classList.toggle("active", id === map[name]);
  });
  ["input","list","report","score","profile"].forEach(t=>{
    const b = $("tab-"+t);
    if(b) b.classList.toggle("active", t===name);
  });
  $("scoreQuickBtn")?.classList.toggle("active", name === "score");
  updateScreenHeader(name);

  if(name === "list"){
    renderCalendar();
    renderList();
  }
  if(name === "report"){
    syncReportMonthDefault();
    renderMonthlyReport();
  }
  if(name === "score"){
    syncScoreMonthDefault();
    renderWeeklyInline();
    renderMonthlyGate();
  }
  if(name === "profile") loadProfileToUI();
}
window.switchScreen = switchScreen;

function switchScoreView(view){
  const weekly = $("score-weekly");
  if(weekly) weekly.style.display = "";
  renderWeeklyInline();
}
window.switchScoreView = switchScoreView;

/* ===== Calendar ===== */
function calMove(delta){
  CAL_ANCHOR.setMonth(CAL_ANCHOR.getMonth() + delta);
  renderCalendar();
  renderList();
}
window.calMove = calMove;

function sumByDateInMonth(monthStr){
  const map = {};
  const tx = loadTx().filter(t=>t.date && t.date.startsWith(monthStr));
  for(const t of tx){
    if(!map[t.date]) map[t.date] = {sum:0, count:0};
    map[t.date].sum += Number(t.amount||0);
    map[t.date].count++;
  }
  return map;
}

function renderCalendar(){
  const monthStr = ym(CAL_ANCHOR);
  $("calMonthPill") && ($("calMonthPill").textContent = monthStr);

  if($("calDow")){
    $("calDow").innerHTML = ["日","月","火","水","木","金","土"]
      .map(d=>`<div class="calDow">${d}</div>`).join("");
  }

  const totals = sumByDateInMonth(monthStr);
  const first = new Date(CAL_ANCHOR.getFullYear(), CAL_ANCHOR.getMonth(), 1);
  const start = new Date(first);
  start.setDate(first.getDate() - first.getDay());

  const todayStr = ymd(new Date());
  const sel = SELECTED_DATE;

  let html = "";
  for(let i=0;i<42;i++){
    const d = new Date(start);
    d.setDate(start.getDate()+i);
    const dStr = ymd(d);
    const inMonth = d.getMonth() === CAL_ANCHOR.getMonth();

    const inf = totals[dStr];
    const sum = inf ? inf.sum : 0;

    const cls = [
      "calCell",
      inMonth ? "" : "mutedCell",
      dStr === todayStr ? "today" : "",
      dStr === sel ? "selected" : ""
    ].filter(Boolean).join(" ");

    html += `
      <div class="${cls}" data-date="${dStr}" data-has="${inf ? "true" : "false"}">
        <div class="calBadge"></div>
        <div class="calTop">
          <div class="calDayNum">${d.getDate()}</div>
        </div>
        ${inf ? `<div class="calSum">${Math.round(sum).toLocaleString("ja-JP")}</div>` : `<div class="calSum">&nbsp;</div>`}
      </div>
    `;
  }

  const grid = $("calGrid");
  if(!grid) return;
  grid.innerHTML = html;

  let pressTimer = null;

  grid.querySelectorAll(".calCell").forEach(cell=>{
    const dt = cell.dataset.date;

    cell.addEventListener("click", ()=>{
      SELECTED_DATE = dt;
      $("txDate") && ($("txDate").value = dt);
      renderCalendar();
      openEntryModal(dt);
    });

    cell.addEventListener("pointerdown", ()=>{
      pressTimer = setTimeout(()=>{
        SELECTED_DATE = dt;
        $("txDate") && ($("txDate").value = dt);
        renderCalendar();
        openDayDetail(dt);
      }, 520);
    });

    ["pointerup","pointerleave","pointercancel"].forEach(ev=>{
      cell.addEventListener(ev, ()=>{ if(pressTimer) clearTimeout(pressTimer); });
    });
  });
}

/* ===== Entry Modal ===== */
function buildCatCards(){
  const PICTO = {
    食費: `<path d="M4 11h16"/><path d="M6 11a6 6 0 0 0 12 0"/><path d="M3 15h18"/><path d="M8 5v3M12 5v3M16 5v3"/>`,
    外食費: `<circle cx="12" cy="12" r="5"/><path d="M5 4v6M7 4v6"/><path d="M19 4v6M17 4v6"/>`,
    日用品: `<rect x="5" y="6" width="14" height="12" rx="2"/><path d="M5 10h14"/><path d="M9 10v8"/>`,
    衣服: `<path d="M6 6l3-2h6l3 2v3l-2 1v9H8V10L6 9z"/>`,
    美容: `<circle cx="12" cy="10" r="4"/><path d="M12 14v5"/><circle cx="12" cy="20" r="1.5"/>`,
    交際費: `<rect x="4" y="6" width="8" height="6" rx="2"/><path d="M8 12l-2 2v-2"/><rect x="12" y="10" width="8" height="6" rx="2"/><path d="M16 16l2 2v-2"/>`,
    医療費: `<circle cx="12" cy="12" r="7"/><path d="M12 9v6M9 12h6"/>`,
    教育費: `<path d="M4 7h7a2 2 0 0 1 2 2v10H6a2 2 0 0 0-2 2z"/><path d="M20 7h-7a2 2 0 0 0-2 2v10h7a2 2 0 0 1 2 2z"/>`,
    交通費: `<rect x="6" y="4" width="12" height="12" rx="2"/><path d="M6 9h12"/><circle cx="9" cy="16" r="1.5"/><circle cx="15" cy="16" r="1.5"/>`,
    コンビニ: `<path d="M4 9h16l-1-4H5z"/><rect x="5" y="9" width="14" height="9" rx="1.5"/><path d="M9 18v-4h6v4"/>`,
    カフェ: `<path d="M6 8h9v6a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3z"/><path d="M15 9h2a2 2 0 0 1 0 4h-2"/><path d="M8 5v2M11 5v2"/>`,
    デート: `<path d="M12 20s-6-4.2-6-8.3A3.3 3.3 0 0 1 12 8a3.3 3.3 0 0 1 6 3.7c0 4.1-6 8.3-6 8.3z"/>`,
    趣味: `<rect x="5" y="10" width="14" height="6" rx="3"/><path d="M9 13h2M8 13v-2"/><circle cx="15" cy="12.5" r="0.7"/><circle cx="17" cy="13.5" r="0.7"/>`,
    仕事: `<rect x="5" y="8" width="14" height="10" rx="2"/><path d="M9 8V6h6v2"/><path d="M5 12h14"/>`
  };
  const pictogramHTML = (cat)=>{
    const svg = PICTO[cat] || `<circle cx="12" cy="12" r="6"/>`;
    return `<svg class="pictogramSvg" viewBox="0 0 24 24" aria-hidden="true">${svg}</svg>`;
  };
  const renderCards = (wrap, onSelect)=>{
    if(!wrap) return;
    wrap.innerHTML = CATEGORIES.map(c=>`
      <div class="catCard" data-cat="${escapeHtml(c)}">
        <div class="icon">${pictogramHTML(c)}</div>
        <div class="label">${escapeHtml(c)}</div>
      </div>
    `).join("");
    wrap.querySelectorAll(".catCard").forEach(card=>{
      card.addEventListener("click", ()=> onSelect(card.dataset.cat));
    });
  };

  renderCards($("entryCatArea"), (cat)=> selectCategory(cat));
  renderCards($("quickCatArea"), (cat)=> startQuickEntry(cat));
}

function selectCategory(cat){
  $("entryCategoryHidden").value = cat;
  document.querySelectorAll("#entryCatArea .catCard").forEach(c=>{
    c.classList.toggle("active", c.dataset.cat === cat);
  });
  $("entryMsg").textContent = "";
  showEntryStep("amount");
  setTimeout(()=> $("entryAmount").focus(), 100);
}

function startQuickEntry(cat){
  const today = ymd(new Date());
  openEntryModal(today, { presetCategory: cat });
}
window.startQuickEntry = startQuickEntry;

function openEntryModal(dt, opts = {}){
  SELECTED_DATE = dt;
  const prof = getProfile();
  updateValueCategorySelects(normalizeValueCats(prof.valueCats).filter(Boolean));
  $("txDate") && ($("txDate").value = dt);
  $("entryDateText") && ($("entryDateText").textContent = dt);

  const prevCat = opts.keepCategory ? $("entryCategoryHidden")?.value : "";

  // reset
  $("entryMsg").textContent = "";
  $("entryAmount").value = "";
  $("entryMemoTop").value = "";
  $("entrySat").value = "";
  $("entryValueTag") && ($("entryValueTag").value = "");
  $("entryValueTagCustom") && ($("entryValueTagCustom").value = "");
  $("entryValueTagCustomWrap") && ($("entryValueTagCustomWrap").style.display = "none");

  $("entryCategoryHidden").value = "";
  document.querySelectorAll("#entryCatArea .catCard").forEach(c=> c.classList.remove("active"));

  // last_cat は見た目だけ残す（勝手に入力欄は出さない）
  const last = localStorage.getItem("last_cat") || "";
  if(last){
    $("entryCategoryHidden").value = last;
    document.querySelectorAll("#entryCatArea .catCard").forEach(c=>{
      c.classList.toggle("active", c.dataset.cat === last);
    });
    $("entryCategoryHidden").value = ""; // ← 実入力としては未選択扱いに戻す
    document.querySelectorAll("#entryCatArea .catCard").forEach(c=>{
      c.classList.toggle("active", c.dataset.cat === last);
    });
  }

  const preset = opts.presetCategory || prevCat || $("entryCategoryHidden").value;
  if(preset){
    $("entryCategoryHidden").value = preset;
    document.querySelectorAll("#entryCatArea .catCard").forEach(c=>{
      c.classList.toggle("active", c.dataset.cat === preset);
    });
    showEntryStep("amount");
    setTimeout(()=> $("entryAmount").focus(), 100);
  }else{
    showEntryStep("category");
  }
  openModal("entryModal");

  const card = $("entryModalCard");
  card?.scrollTo({top:0, behavior:"instant"});
  setTimeout(()=> card?.scrollTo({top:0, behavior:"smooth"}), 0);
}

function addDays(dtStr, delta){
  const d = toDate(dtStr);
  d.setDate(d.getDate()+delta);
  return ymd(d);
}

function renderEntryDayBox(dt){
  if(!$("entryDaySumPill") || !$("entryDayList")) return;
  const tx = loadTx().filter(t=>t.date === dt).sort((a,b)=> (b.id).localeCompare(a.id));
  const sum = tx.reduce((a,b)=>a+Number(b.amount||0),0);

  $("entryDaySumPill").textContent = `本日合計：${Math.round(sum).toLocaleString("ja-JP")}円`;
  $("entryDayCountPill").textContent = `${tx.length}件`;

  if(tx.length === 0){
    $("entryDayList").innerHTML = `<div class="muted small" style="padding:12px;">まだ記録がありません</div>`;
    return;
  }

  $("entryDayList").innerHTML = tx.map(t=>{
    const meta = [];
    if(t.satisfaction!=null) meta.push(`納得:${getSatLabel(t.satisfaction)}`);
    if(t.valueTag) meta.push(`価値観:${escapeHtml(t.valueTag)}`);
    const memo = t.memo ? ` / ${escapeHtml(t.memo)}` : "";
    return `
      <div class="miniRow">
        <div>
          <div class="miniCat">${escapeHtml(t.category)}</div>
          <div class="miniMeta">${Number(t.amount||0).toLocaleString("ja-JP")}円 ${meta.length?`/ ${meta.join(" / ")}`:""}${memo}</div>
        </div>
        <button class="danger" style="padding:8px 10px; font-size:12px;" type="button" data-del="${t.id}">削除</button>
      </div>
    `;
  }).join("");

  $("entryDayList").querySelectorAll("[data-del]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      deleteTx(btn.dataset.del);
      renderEntryDayBox(dt);
      renderCalendar();
    });
  });
}

function saveEntry(){
  const dt = SELECTED_DATE;
  const cat = $("entryCategoryHidden").value;
  const amt = Number($("entryAmount").value || 0);

  if(!dt || !cat){
    $("entryMsg").textContent = "カテゴリを選択してください";
    toast("カテゴリを選んでね");
    return null;
  }
  if(!(amt > 0)){
    $("entryMsg").textContent = "支出を1円以上で入力してください";
    toast("支出を入力してね");
    return null;
  }

  const sat = $("entrySat").value ? Number($("entrySat").value) : null;
  const valueTag = resolveValueTag("entryValueTag", "entryValueTagCustom");
  const memoTop = ($("entryMemoTop").value||"").trim();
  const note = memoTop;

  const id = (crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2);
  const tx = loadTx();
  const row = { id, date: dt, category: cat, amount: amt, satisfaction: sat, valueTag: valueTag || null, trigMemo: note, memo: memoTop, isDeleted:false };
  tx.push(row);
  saveTx(tx);
  syncSafely(()=> syncTransactionToSupabase(row));
  localStorage.setItem("last_cat", cat);
  return row;
}

function handleEntryPrimary(){
  if(entryStep === "category"){
    const cat = $("entryCategoryHidden").value;
    if(!cat){
      toast("カテゴリを選んでね");
      return;
    }
    showEntryStep("amount");
    return;
  }

  if(entryStep === "amount"){
    const amt = Number($("entryAmount").value || 0);
    if(!(amt > 0)){
      toast("支出を入力してね");
      return;
    }

    showEntryStep("quality");
    return;
  }

  if(entryStep === "quality"){
    showEntryStep("memo");
    return;
  }

  const savedRow = saveEntry();
  if(savedRow) afterEntrySaved(savedRow);
}

function afterEntrySaved(savedRow){
  const beforeXP = getTotalXP();
  const afterXP = addDailyXP(SELECTED_DATE, 2);
  setHomeReaction(savedRow);
  toast("入力完了");
  closeModal("entryModal");
  renderCalendar();
  renderList();
  renderWeeklyInline();
  renderMonthlyGate();
  if(afterXP > beforeXP){
    const bar = document.querySelector(".growthFill");
    if(bar){
      bar.classList.remove("bump");
      void bar.offsetWidth;
      bar.classList.add("bump");
    }
  }
}

function closeEntryModal(){
  closeModal("entryModal");
}

function deleteTx(id){
  const before = loadTx();
  const target = before.find(t=> t.id === id);
  const next = before.filter(t=>t.id !== id);
  saveTx(next);
  if(target){
    syncSafely(()=> syncTransactionToSupabase({ ...target, isDeleted:true }));
  }
  renderWeeklyInline();
  renderMonthlyGate();
}

function openEditModal(id){
  const tx = loadTx().find(t=>t.id === id);
  if(!tx) return;
  const prof = getProfile();
  const valueCats = normalizeValueCats(prof.valueCats).filter(Boolean);
  updateValueCategorySelects(valueCats);
  $("editId") && ($("editId").value = tx.id);
  $("editDate") && ($("editDate").value = tx.date || "");
  $("editCategory") && ($("editCategory").value = tx.category || "");
  $("editAmount") && ($("editAmount").value = tx.amount || "");
  $("editSat") && ($("editSat").value = (tx.satisfaction!=null ? String(tx.satisfaction) : ""));
  setValueTagSelection("editValueTag", "editValueTagCustom", tx.valueTag || "", valueCats);
  $("editMemo") && ($("editMemo").value = tx.memo || "");
  openModal("editModal");
}
window.openEditModal = openEditModal;

function saveEdit(){
  const id = $("editId")?.value;
  if(!id) return;
  const list = loadTx();
  const idx = list.findIndex(t=>t.id === id);
  if(idx === -1) return;

  const amount = Number($("editAmount")?.value || 0);
  if(!(amount > 0)){
    toast("金額を入力してね");
    return;
  }

  const category = $("editCategory")?.value || list[idx].category;
  const memo = ($("editMemo")?.value || "").trim();
  const satRaw = ($("editSat")?.value || "").trim();
  const valueTag = resolveValueTag("editValueTag", "editValueTagCustom");

  list[idx] = {
    ...list[idx],
    date: $("editDate")?.value || list[idx].date,
    category,
    amount,
    satisfaction: satRaw ? Number(satRaw) : null,
    memo,
    valueTag: valueTag || null,
    trigMemo: memo,
    isDeleted: false,
  };
  saveTx(list);
  syncSafely(()=> syncTransactionToSupabase(list[idx]));
  closeModal("editModal");
  toast("更新しました");
  renderList();
  renderCalendar();
  renderWeeklyInline();
  renderMonthlyGate();
}
window.saveEdit = saveEdit;

/* ===== Day Detail ===== */
function openDayDetail(dt){
  $("dayDetailDateText").textContent = dt;
  const tx = loadTx().filter(t=>t.date===dt).sort((a,b)=> (b.id).localeCompare(a.id));
  const sum = tx.reduce((a,b)=>a+Number(b.amount||0),0);

  $("dayDetailSumPill").textContent = `合計：${Math.round(sum).toLocaleString("ja-JP")}円`;
  $("dayDetailCountPill").textContent = `${tx.length}件`;

  if(tx.length === 0){
    $("dayDetailList").innerHTML = `<div class="muted small" style="padding:12px;">まだ記録がありません</div>`;
  }else{
  $("dayDetailList").innerHTML = tx.map(t=>{
    const meta = [];
    if(t.satisfaction!=null) meta.push(`納得:${getSatLabel(t.satisfaction)}`);
    const memo = t.memo ? ` / ${escapeHtml(t.memo)}` : "";
    return `
      <div class="miniRow">
        <div>
          <div class="miniCat">${escapeHtml(t.category)}</div>
          <div class="miniMeta">${Number(t.amount||0).toLocaleString("ja-JP")}円 ${meta.length?`/ ${meta.join(" / ")}`:""}${memo}</div>
        </div>
        <div class="bar" style="gap:6px;">
          <button class="ghost" style="padding:8px 10px; font-size:12px;" type="button" data-edit="${t.id}">編集</button>
          <button class="danger" style="padding:8px 10px; font-size:12px;" type="button" data-del="${t.id}">削除</button>
        </div>
      </div>
    `;
  }).join("");

  $("dayDetailList").querySelectorAll("[data-del]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      deleteTx(btn.dataset.del);
      openDayDetail(dt);
      renderCalendar();
    });
  });
  $("dayDetailList").querySelectorAll("[data-edit]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      openEditModal(btn.dataset.edit);
    });
  });
  }

  openModal("dayDetailModal");
}
window.openDayDetail = openDayDetail;

/* ===== Satisfaction Score ===== */
function normalizeSatValue(val){
  const n = Number(val);
  if(!Number.isFinite(n)) return null;
  if(n < 1 || n > 5) return null;
  return Math.round(n);
}
const SAT_LABEL_MAP = SAT_LEVELS.reduce((acc, cur)=>{
  acc[String(cur.value)] = cur.label;
  return acc;
}, {});
function getSatLabel(val){
  const n = normalizeSatValue(val);
  return n ? (SAT_LABEL_MAP[String(n)] || String(n)) : "—";
}
function migrateSatisfactionScale(){
  const v = Number(localStorage.getItem(LS_SAT_SCALE) || 1);
  if(v >= SAT_SCALE_VERSION) return;
  const tx = loadTx();
  let changed = false;
  for(const t of tx){
    const n = Number(t.satisfaction);
    if(Number.isFinite(n) && n >= 1 && n <= 4){
      t.satisfaction = (n === 1) ? 1 : (n === 2) ? 2 : (n === 3) ? 4 : 5;
      changed = true;
    }
  }
  if(changed) saveTx(tx);
  localStorage.setItem(LS_SAT_SCALE, String(SAT_SCALE_VERSION));
}

function calcSubjectiveMetrics(txList){
  const rated = txList.filter(t=> normalizeSatValue(t.satisfaction) != null);
  const ratedCount = rated.length;
  const ratedSpend = rated.reduce((a,t)=> a + Number(t.amount||0), 0);
  const totalCount = txList.length;
  if(ratedSpend <= 0){
    return { ratedCount, ratedSpend, coverage: totalCount ? (ratedCount / totalCount) : 0, avgSat:null, score:null };
  }
  let sum = 0;
  for(const t of rated){
    sum += Number(t.amount||0) * normalizeSatValue(t.satisfaction);
  }
  const avgSat = sum / ratedSpend;
  const score = clamp(Math.round(((avgSat - 1) / 4) * 100), 0, 100);
  const coverage = totalCount ? (ratedCount / totalCount) : 0;
  return { ratedCount, ratedSpend, coverage, avgSat, score };
}

function calcValueAlignmentMetrics(txList, top3){
  const totalSpend = txList.reduce((a,t)=> a + Number(t.amount||0), 0);
  if(!totalSpend || !top3 || !top3.length){
    return { valueSpend:0, ratio:null, score:null, totalSpend };
  }
  const set = new Set(top3);
  const valueSpend = txList
    .filter(t=> set.has(t.valueTag))
    .reduce((a,t)=> a + Number(t.amount||0), 0);
  const ratio = totalSpend > 0 ? (valueSpend / totalSpend) : null;
  const score = ratio == null ? null : clamp(Math.round((ratio / 0.40) * 100), 0, 100);
  return { valueSpend, ratio, score, totalSpend };
}

function calcRegretMetrics(txList){
  const totalSpend = txList.reduce((a,t)=> a + Number(t.amount||0), 0);
  if(!totalSpend){
    return { regretSpend:0, rate:null, score:null };
  }
  const regretSpend = txList
    .filter(t=> {
      const n = normalizeSatValue(t.satisfaction);
      return n === 1 || n === 2;
    })
    .reduce((a,t)=> a + Number(t.amount||0), 0);
  const rate = regretSpend / totalSpend;
  const score = clamp(Math.round((1 - rate) * 100), 0, 100);
  return { regretSpend, rate, score };
}

function calcHappinessEfficiency(txList, disposableIncome){
  if(!Number.isFinite(disposableIncome) || disposableIncome <= 0){
    return { happySpend:0, rate:null, score:null };
  }
  const happySpend = txList
    .filter(t=> {
      const n = normalizeSatValue(t.satisfaction);
      return n === 4 || n === 5;
    })
    .reduce((a,t)=> a + Number(t.amount||0), 0);
  const rate = happySpend / disposableIncome;
  const score = clamp(Math.round(rate * 100), 0, 100);
  return { happySpend, rate, score };
}

function calcWeightedScore(items){
  const valid = items.filter(item=> Number.isFinite(item.score) && Number.isFinite(item.weight) && item.weight > 0);
  if(!valid.length) return 50;
  const sumWeight = valid.reduce((a,b)=> a + b.weight, 0);
  const sum = valid.reduce((a,b)=> a + (b.score * b.weight), 0);
  return clamp(Math.round(sum / sumWeight), 0, 100);
}

function calcCategorySatisfactionScores(txList){
  return CATEGORIES.map(cat=>{
    const items = txList.filter(t=>t.category === cat);
    if(items.length === 0){
      return { category:cat, score:null };
    }
    const rated = items.filter(t=> normalizeSatValue(t.satisfaction) != null);
    const ratedSpend = rated.reduce((a,t)=> a + Number(t.amount||0), 0);
    if(ratedSpend <= 0){
      return { category:cat, score:null };
    }
    let sum = 0;
    for(const t of rated){
      sum += Number(t.amount||0) * normalizeSatValue(t.satisfaction);
    }
    const avgSat = sum / ratedSpend;
    const score = clamp(Math.round(((avgSat - 1) / 4) * 100), 0, 100);
    return { category:cat, score };
  });
}

/* ===== Public Bench ===== */
function sumByPublicCategory(txList){
  const sums = { FOOD:0, UTILITIES:0, TRANS_COMM:0, LEISURE:0, HOUSING:0, OTHER:0 };
  for(const t of txList){
    const cat = t.category;
    const amt = Number(t.amount||0);
    if(EXCLUDE_FROM_PUBLIC_TX.has(cat)) continue;
    if(CATEGORY_TO_PUBLIC.FOOD.has(cat)) sums.FOOD += amt;
    else if(CATEGORY_TO_PUBLIC.UTILITIES.has(cat)) sums.UTILITIES += amt;
    else if(CATEGORY_TO_PUBLIC.TRANS_COMM.has(cat)) sums.TRANS_COMM += amt;
    else if(CATEGORY_TO_PUBLIC.LEISURE.has(cat)) sums.LEISURE += amt;
    else if(CATEGORY_TO_PUBLIC.HOUSING.has(cat)) sums.HOUSING += amt;
    else sums.OTHER += amt;
  }
  return sums;
}

function calcPublicRates(txListForMonth, fixed, income){
  const baseTxTotal = txListForMonth.reduce((a,b)=>a+Number(b.amount||0),0);
  const sums = sumByPublicCategory(txListForMonth);

  const fixedHousing = Number(fixed?.housingYen||0);
  const fixedUtilities = Number(fixed?.utilityYen||0);
  const fixedComm = Number(fixed?.netYen||0);
  const fixedSub = Number(fixed?.subYen||0);

  sums.HOUSING = fixedHousing;
  sums.UTILITIES += fixedUtilities;
  sums.TRANS_COMM += fixedComm;
  sums.OTHER += fixedSub;

  const userTotal = baseTxTotal + fixedHousing + fixedUtilities + fixedComm + fixedSub;

  const bench = BENCH_PUBLIC_2024;
  const benchRates = {
    HOUSING: bench.housingMedian>0 ? bench.housingMedian : null,
    FOOD: bench.foodMedian / bench.totalMedian,
    UTILITIES: bench.utilitiesMedian / bench.totalMedian,
    TRANS_COMM: bench.transportCommMedian / bench.totalMedian,
    LEISURE: bench.leisureMedian / bench.totalMedian,
    OTHER: bench.otherMedian / bench.totalMedian,
  };

  const userRates = {
    HOUSING: income>0 ? sums.HOUSING / income : null,
    FOOD: userTotal>0 ? sums.FOOD / userTotal : null,
    UTILITIES: userTotal>0 ? sums.UTILITIES / userTotal : null,
    TRANS_COMM: userTotal>0 ? sums.TRANS_COMM / userTotal : null,
    LEISURE: userTotal>0 ? sums.LEISURE / userTotal : null,
    OTHER: userTotal>0 ? sums.OTHER / userTotal : null,
  };

  return { userTotal, sums, benchRates, userRates };
}

function calcExtendedPublicRates(txListForMonth, fixed){
  const baseTxTotal = txListForMonth.reduce((a,b)=>a+Number(b.amount||0),0);
  const fixedHousing = Number(fixed?.housingYen||0);
  const fixedUtilities = Number(fixed?.utilityYen||0);
  const fixedComm = Number(fixed?.netYen||0);
  const fixedSub = Number(fixed?.subYen||0);
  const userTotal = baseTxTotal + fixedHousing + fixedUtilities + fixedComm + fixedSub;

  const sums = { leisure:0, transComm:fixedComm, utilities:fixedUtilities, daily:0, medical:0, education:0 };
  for(const t of txListForMonth){
    const cat = t.category;
    const amt = Number(t.amount||0);
    if(cat === "交通費") sums.transComm += amt;
    else if(cat === "日用品") sums.daily += amt;
    else if(cat === "医療費") sums.medical += amt;
    else if(cat === "教育費") sums.education += amt;
    else if(CATEGORY_TO_PUBLIC.LEISURE.has(cat)) sums.leisure += amt;
  }

  const bench = BENCH_PUBLIC_2024;
  const benchRates = {
    leisure: bench.leisureMedian / bench.totalMedian,
    transComm: bench.transportCommMedian / bench.totalMedian,
    utilities: bench.utilitiesMedian / bench.totalMedian,
    daily: BENCH_PUBLIC_EXTRA_2024.dailyMiscRate,
    medical: BENCH_PUBLIC_EXTRA_2024.medicalInsuranceRate,
    education: BENCH_PUBLIC_EXTRA_2024.educationRate,
  };

  const userRates = {
    leisure: userTotal>0 ? sums.leisure / userTotal : null,
    transComm: userTotal>0 ? sums.transComm / userTotal : null,
    utilities: userTotal>0 ? sums.utilities / userTotal : null,
    daily: userTotal>0 ? sums.daily / userTotal : null,
    medical: userTotal>0 ? sums.medical / userTotal : null,
    education: userTotal>0 ? sums.education / userTotal : null,
  };

  return { userTotal, sums, benchRates, userRates };
}

function calcBenchScore(you, target, mode){
  if(you == null || target == null || !Number.isFinite(you) || !Number.isFinite(target)) return null;
  if(mode === "higher"){
    if(target <= 0) return null;
    const ratio = you / target;
    return clamp(Math.round(ratio * 100), 0, 100);
  }
  if(mode === "lower"){
    if(you <= 0) return 100;
    const ratio = target / you;
    return clamp(Math.round(ratio * 100), 0, 100);
  }
  const diff = Math.abs(you - target);
  return clamp(Math.round(100 - diff * 120), 0, 100);
}

function benchZone(score){
  if(!Number.isFinite(score)) return { label:"評価待ち", tone:"neutral" };
  if(score >= 80) return { label:"目安内", tone:"good" };
  if(score >= 60) return { label:"注意", tone:"mid" };
  return { label:"要改善", tone:"low" };
}

function benchComment(you, target){
  if(you == null || target == null || !Number.isFinite(you) || !Number.isFinite(target)) return "記録が増えると精度が上がります";
  if(you <= target * 0.9) return "平均より少し抑えられています";
  if(you <= target * 1.05) return "安心ラインを上回っています";
  return "基準をやや超えています";
}

function renderBenchCompareBar(you, target){
  if(you == null || target == null || !Number.isFinite(you) || !Number.isFinite(target)){
    return `<div class="benchCompare is-empty"></div>`;
  }
  const max = Math.max(0.5, you, target);
  const youPos = clamp01(you / max) * 100;
  const targetPos = clamp01(target / max) * 100;
  return `
    <div class="benchCompare">
      <span class="benchCompareTarget" style="left:${targetPos}%;">
        <span class="benchCompareTargetLabel">目安</span>
      </span>
      <span class="benchCompareMarker" style="left:${youPos}%;">
        <span class="benchCompareMarkerLabel">あなた</span>
      </span>
    </div>
  `;
}


/* ===== Weekly / Monthly ===== */
function getScoreState(score){
  if(score < 40) return "low";
  if(score < 60) return "mid";
  if(score < 80) return "high";
  return "top";
}
function getStateLabel(state){
  if(state === "top") return "非常に良好";
  if(state === "high") return "良好な状態";
  if(state === "mid") return "安定な状態";
  return "要注意の状態";
}
function getScoreTone(score){
  if(!Number.isFinite(score)) return "score-tone-2";
  if(score < 25) return "score-tone-1";
  if(score < 50) return "score-tone-2";
  if(score < 75) return "score-tone-3";
  return "score-tone-4";
}
function getScoreToneColor(score, flavor = "sat"){
  const prefix = flavor === "stable" ? "--tone-stable-" : "--tone-sat-";
  if(!Number.isFinite(score)) return `var(${prefix}2)`;
  if(score < 25) return `var(${prefix}1)`;
  if(score < 50) return `var(${prefix}2)`;
  if(score < 75) return `var(${prefix}3)`;
  return `var(${prefix}4)`;
}
function withEmoji(label, emoji){
  return emoji ? `${emojiHTML(emoji, "mini")} ${escapeHtml(label)}` : escapeHtml(label);
}
function emojiHTML(emoji, sizeClass){
  const cls = sizeClass ? ` ${sizeClass}` : "";
  return `<span class="emojiWarm${cls}" aria-hidden="true">${emoji}</span>`;
}

function xpForLevel(level){
  const lv = clamp(Math.round(level), 1, MAX_LEVEL);
  const n = lv - 1;
  return Math.round((n * n * 2) + (n * 8));
}
function levelFromXP(totalXP){
  if(!Number.isFinite(totalXP) || totalXP <= 0) return 1;
  let lvl = 1;
  for(let i=2;i<=MAX_LEVEL;i++){
    if(totalXP < xpForLevel(i)) break;
    lvl = i;
  }
  return lvl;
}
function getXPProgress(totalXP){
  const level = levelFromXP(totalXP);
  if(level >= MAX_LEVEL){
    return { level: MAX_LEVEL, inLevel: 0, next: 0, pct: 100 };
  }
  const cur = xpForLevel(level);
  const next = xpForLevel(level + 1);
  const span = Math.max(1, next - cur);
  const inLevel = Math.max(0, totalXP - cur);
  const pct = clamp(Math.round((inLevel / span) * 100), 0, 100);
  return { level, inLevel, next: span, pct };
}
function getGrowthStage(totalXP){
  const level = levelFromXP(totalXP);
  if(level <= 25) return 1;
  if(level <= 50) return 2;
  if(level <= 75) return 3;
  return 4;
}
function getGrowthLabel(stage){
  const idx = Number.isFinite(stage) ? stage : 1;
  return `進化${idx}`;
}
function getGrowthComment(stage){
  const idx = Number.isFinite(stage) ? stage : 1;
  if(idx === 1) return "これから一緒に育っていこう。";
  if(idx === 2) return "少しずつ育ってきたよ。";
  if(idx === 3) return "いい感じ！この調子で続けよう。";
  return "しっかり育ったね。";
}

function getMascotTone(category){
  if(!category) return null;
  const key = CATEGORY_TONE_KEY[category];
  return key ? MASCOT_TONES[key] : null;
}
function getMascotMood(qualityScore){
  if(!Number.isFinite(qualityScore)) return "neutral";
  if(qualityScore >= 72) return "happy";
  if(qualityScore <= 45) return "sad";
  return "neutral";
}
function getLineageFromCategory(category){
  return CATEGORY_LINEAGE_KEY[category] || null;
}
function getCharacterName(level, lineage, monthTopCategory){
  if(!Number.isFinite(level) || level < 25) return "コゼニィ";
  const lv = clamp(level, 1, MAX_LEVEL);
  const bucket = lv >= 100 ? 5 : (lv >= 75 ? 4 : (lv >= 50 ? 3 : 2));
  const map = {
    gourmet:{
      2:"モグリン",
      3:"コダワリ・モグリン",
      4:"グルメロード・モグリン",
      5: (monthTopCategory === "カフェ") ? "ゆるふわバリスタ" : "キング・ゴクミ",
    },
    selfcare:{
      2:"ピカリン",
      3:"ツヤピカ・ピカリン",
      4:"グロウ・ピカリン",
      5: (monthTopCategory === "衣服") ? "トレンド・スター" : "ビューティ・フェアリー",
    },
    social:{
      2:"ニコモン",
      3:"ハピネス・ニコモン",
      4:"コネクト・ニコモン",
      5: (monthTopCategory === "交際費") ? "パーティ・ナイト" : "ロマンス・スワン",
    },
    learning:{
      2:"シャキーン",
      3:"フォーカス・シャキーン",
      4:"マスター・シャキーン",
      5: (monthTopCategory === "趣味") ? "マニア・ドラゴン" : "賢者マスター",
    },
    lifesupport:{
      2:"ホカリン",
      3:"プロテクト・ホカリン",
      4:"セーフティ・ホカリン",
      5:"ガーディアン・ケア",
    },
    mobility:{
      2:"トコトコ",
      3:"ダッシュ・トコトコ",
      4:"スピード・トコトコ",
      5:"ジェット・トラベラー",
    },
    convenience:{
      2:"ベンリィ",
      3:"スマート・ベンリィ",
      4:"フレックス・ベンリィ",
      5:"オールマイティ",
    },
  };
  const list = map[lineage || ""] || null;
  if(!list) return "コゼニィ";
  return list[bucket] || "コゼニィ";
}
function getTopCategory(txList){
  const sums = {};
  for(const t of txList || []){
    const cat = t.category;
    if(!cat || FIXED_CATEGORIES.has(cat)) continue;
    const amt = Number(t.amount||0);
    if(!Number.isFinite(amt) || amt <= 0) continue;
    sums[cat] = (sums[cat] || 0) + amt;
  }
  const top = Object.entries(sums).sort((a,b)=>b[1]-a[1])[0];
  return top ? top[0] : null;
}

function mascotSvgHTML(stage = 1, opts = {}){
  return `<img class="mascotImg" src="assets/characters/kozeni.png" alt="コゼニィ">`;
}

function buildMonthlyReportItems(monthStr){
  const tx = loadTx().filter(t=>t.date && t.date.startsWith(monthStr));
  const sums = {};
  for(const t of tx){
    if(!sums[t.category]) sums[t.category] = 0;
    sums[t.category] += Number(t.amount||0);
  }

  const fixedAll = loadJSON(LS_FIXED, {});
  const fixed = fixedAll[monthStr] || { housingYen:0, utilityYen:0, netYen:0, subYen:0 };
  const fixedMap = {
    "住居費": Number(fixed.housingYen||0),
    "光熱費": Number(fixed.utilityYen||0),
    "通信費": Number(fixed.netYen||0),
    "サブスク": Number(fixed.subYen||0),
  };
  for(const key in fixedMap){
    if(fixedMap[key] > 0){
      sums[key] = (sums[key] || 0) + fixedMap[key];
    }
  }

  const items = Object.entries(sums)
    .map(([label, amount])=>({ label, amount }))
    .filter(item=>item.amount > 0)
    .sort((a,b)=>b.amount - a.amount);

  const total = items.reduce((a,b)=>a + b.amount, 0);
  return { items, total };
}

function getReportCutoffDay(monthStr){
  const tx = loadTx().filter(t=> t.date && t.date.startsWith(monthStr));
  let maxRecordedDay = 0;
  tx.forEach(t=>{
    const day = toDate(t.date).getDate();
    if(day > maxRecordedDay) maxRecordedDay = day;
  });
  if(maxRecordedDay > 0) return maxRecordedDay;
  if(monthStr === ym(new Date())) return new Date().getDate();
  const [y, m] = monthStr.split("-").map(Number);
  return new Date(y, m, 0).getDate();
}

function buildMonthlyReportItemsToDay(monthStr, cutoffDay){
  const [y, m] = monthStr.split("-").map(Number);
  const daysInMonth = new Date(y, m, 0).getDate();
  const dayLimit = clamp(Math.round(Number(cutoffDay || 0)), 1, daysInMonth);
  const tx = loadTx().filter(t=>{
    if(!(t.date && t.date.startsWith(monthStr))) return false;
    const day = toDate(t.date).getDate();
    return day <= dayLimit;
  });

  const sums = {};
  for(const t of tx){
    if(!sums[t.category]) sums[t.category] = 0;
    sums[t.category] += Number(t.amount || 0);
  }

  // Fixed costs are prorated to compare the same day range fairly.
  const fixedAll = loadJSON(LS_FIXED, {});
  const fixed = fixedAll[monthStr] || { housingYen:0, utilityYen:0, netYen:0, subYen:0 };
  const ratio = dayLimit / daysInMonth;
  const fixedMap = {
    "住居費": Math.round(Number(fixed.housingYen || 0) * ratio),
    "光熱費": Math.round(Number(fixed.utilityYen || 0) * ratio),
    "通信費": Math.round(Number(fixed.netYen || 0) * ratio),
    "サブスク": Math.round(Number(fixed.subYen || 0) * ratio),
  };
  for(const key in fixedMap){
    if(fixedMap[key] > 0){
      sums[key] = (sums[key] || 0) + fixedMap[key];
    }
  }

  const items = Object.entries(sums)
    .map(([label, amount])=>({ label, amount }))
    .filter(item=>item.amount > 0)
    .sort((a,b)=>b.amount - a.amount);
  const total = items.reduce((a,b)=>a + b.amount, 0);
  return { items, total, dayLimit };
}

function getLargestSinglePurchase(monthStr, totalBase){
  const tx = loadTx().filter(t=> t.date && t.date.startsWith(monthStr));
  if(!tx.length) return null;
  let maxTx = null;
  tx.forEach(t=>{
    const amount = Number(t.amount || 0);
    if(!(amount > 0)) return;
    if(!maxTx || amount > Number(maxTx.amount || 0)) maxTx = t;
  });
  if(!maxTx) return null;
  const amount = Number(maxTx.amount || 0);
  const share = totalBase > 0 ? Math.round((amount / totalBase) * 100) : 0;
  return {
    amount,
    share,
    category: maxTx.category || "未設定",
    memo: String(maxTx.memo || "").trim()
  };
}

function renderReportCategoryDrill(monthStr, category, totalBase){
  const wrap = $("reportCategoryDrill");
  if(!wrap) return;
  if(!category){
    wrap.innerHTML = `<div class="small muted">カテゴリをタップすると、その内訳が表示されます</div>`;
    return;
  }
  const tx = loadTx()
    .filter(t=> t.date && t.date.startsWith(monthStr) && t.category === category)
    .sort((a,b)=> Number(b.amount || 0) - Number(a.amount || 0));

  if(tx.length){
    const sum = tx.reduce((acc, t)=> acc + Number(t.amount || 0), 0);
    const share = totalBase > 0 ? Math.round((sum / totalBase) * 100) : 0;
    wrap.innerHTML = `
      <div class="reportDrillHead">${escapeHtml(category)} の内訳 <span>${fmtYen(Math.round(sum))}円 / ${share}%</span></div>
      <div class="reportDrillList">
        ${tx.slice(0, 6).map(t=>{
          const memo = String(t.memo || "").trim();
          return `
            <div class="reportDrillRow">
              <div>${escapeHtml(t.date)}</div>
              <div>${fmtYen(Math.round(Number(t.amount || 0)))}円${memo ? ` / ${escapeHtml(memo)}` : ""}</div>
            </div>
          `;
        }).join("")}
      </div>
    `;
    return;
  }

  // Fixed-cost categories can exist without transaction rows.
  const fixedAll = loadJSON(LS_FIXED, {});
  const fixed = fixedAll[monthStr] || {};
  const fixedMap = {
    "住居費": Number(fixed.housingYen || 0),
    "光熱費": Number(fixed.utilityYen || 0),
    "通信費": Number(fixed.netYen || 0),
    "サブスク": Number(fixed.subYen || 0),
  };
  const fixedAmt = Number(fixedMap[category] || 0);
  if(fixedAmt > 0){
    const share = totalBase > 0 ? Math.round((fixedAmt / totalBase) * 100) : 0;
    wrap.innerHTML = `
      <div class="reportDrillHead">${escapeHtml(category)} の内訳 <span>${fmtYen(Math.round(fixedAmt))}円 / ${share}%</span></div>
      <div class="small muted" style="margin-top:6px;">このカテゴリは月次設定から反映されています</div>
    `;
    return;
  }

  wrap.innerHTML = `<div class="small muted">このカテゴリの内訳データはありません</div>`;
}

function getHomeBaseNameByCategory(category){
  const map = {
    "食費":"モグモグ隊長",
    "外食費":"ごちそうハンター",
    "日用品":"くらし整え名人",
    "衣服":"スタイルメーカー",
    "美容":"ビューティーチューナー",
    "交際費":"コネクトキャプテン",
    "医療費":"ヘルスガーディアン",
    "教育費":"ラーニングブースター",
    "交通費":"ムーブマネージャー",
    "コンビニ":"クイックバイヤー",
    "カフェ":"カフェブレイカー",
    "デート":"ロマンスプランナー",
    "趣味":"ホビーマスター",
    "仕事":"ワークドライバー",
  };
  return map[category] || "バランス志向";
}
function getHomeTierKey(tier){
  if(tier === "めっちゃ良い") return "great";
  if(tier === "良い") return "good";
  if(tier === "悪い") return "bad";
  if(tier === "めっちゃ悪い") return "verybad";
  return "analyzing";
}
function getHomeCharacterName(category, tier){
  const key = getHomeTierKey(tier);
  const table = {
    "食費": { great:"満腹賢者モグリオン", good:"モグモグ隊長", bad:"迷い食いモグリン", verybad:"暴食タイタン", analyzing:"モグモグ隊長（分析中）" },
    "外食費": { great:"予約名人グルメラ", good:"ごちそうハンター", bad:"衝動グルメランナー", verybad:"外食エンペラー", analyzing:"ごちそうハンター（分析中）" },
    "日用品": { great:"節度の整頓王", good:"くらし整え名人", bad:"ついで買いスプライター", verybad:"買い溜めコング", analyzing:"くらし整え名人（分析中）" },
    "衣服": { great:"着回しマエストロ", good:"スタイルメーカー", bad:"迷走クローゼッター", verybad:"浪費ランウェイ", analyzing:"スタイルメーカー（分析中）" },
    "美容": { great:"艶肌プランナー", good:"ビューティーチューナー", bad:"焦りケアジャンキー", verybad:"コスメストーム", analyzing:"ビューティーチューナー（分析中）" },
    "交際費": { great:"絆マネージャー", good:"コネクトキャプテン", bad:"見栄フォロワー", verybad:"付き合いヘラクレス", analyzing:"コネクトキャプテン（分析中）" },
    "医療費": { great:"ケアバランサー", good:"ヘルスガーディアン", bad:"後回しヒーラー", verybad:"不調レスキュー常連", analyzing:"ヘルスガーディアン（分析中）" },
    "教育費": { great:"投資インストラクター", good:"ラーニングブースター", bad:"散財スカラー", verybad:"教材コレクター暴走", analyzing:"ラーニングブースター（分析中）" },
    "交通費": { great:"移動ルート名匠", good:"ムーブマネージャー", bad:"寄り道トラベラー", verybad:"タクシードラゴン", analyzing:"ムーブマネージャー（分析中）" },
    "コンビニ": { great:"即決ミニマリスト", good:"クイックバイヤー", bad:"つまみ買いスプリンター", verybad:"深夜コンビニキング", analyzing:"クイックバイヤー（分析中）" },
    "カフェ": { great:"一杯集中バリスタ", good:"カフェブレイカー", bad:"寄り道ラテウォーカー", verybad:"カフェホッパーMAX", analyzing:"カフェブレイカー（分析中）" },
    "デート": { great:"しあわせ設計士", good:"ロマンスプランナー", bad:"見栄ロマンサー", verybad:"デート散財プリンス", analyzing:"ロマンスプランナー（分析中）" },
    "趣味": { great:"熱中バランサー", good:"ホビーマスター", bad:"沼落ちコレクター", verybad:"趣味課金カイザー", analyzing:"ホビーマスター（分析中）" },
    "仕事": { great:"成果ブースター", good:"ワークドライバー", bad:"焦り買いワーカー", verybad:"仕事道具メガトン", analyzing:"ワークドライバー（分析中）" },
  };
  const fallback = {
    great: "輝きのバランス志向",
    good: "バランス志向",
    bad: "ゆらぎのバランス志向",
    verybad: "暴走バランス志向",
    analyzing: "バランス志向（分析中）",
  };
  const names = table[category] || fallback;
  return names[key] || names.good;
}
function getHomeCategoryKey(category){
  const map = {
    "食費":"food",
    "外食費":"dineout",
    "日用品":"daily",
    "衣服":"fashion",
    "美容":"beauty",
    "交際費":"social",
    "医療費":"medical",
    "教育費":"education",
    "交通費":"transport",
    "コンビニ":"convenience",
    "カフェ":"cafe",
    "デート":"date",
    "趣味":"hobby",
    "仕事":"work",
  };
  return map[category] || "balance";
}
function getHomeCharacterAsset(category, tier){
  const tierKey = getHomeTierKey(tier);
  const categoryKey = getHomeCategoryKey(category);
  return `assets/characters/home/${categoryKey}_${tierKey}.png`;
}
function homeAvatarHTML(category, tier, mood, opts = {}){
  const extraClass = opts.extraClass ? ` ${opts.extraClass}` : "";
  const imgClass = opts.imgClass ? ` ${opts.imgClass}` : "";
  const fallbackClass = opts.fallbackClass ? ` ${opts.fallbackClass}` : "";
  const src = getHomeCharacterAsset(category, tier);
  const alt = `${category || "バランス"} / ${tier} キャラクター`;
  return `
    <img class="homeAvatarImg${imgClass}" src="${src}" alt="${escapeHtml(alt)}"
      onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
    <span class="homeAvatarFallback${fallbackClass}">${mood}</span>
    <span class="homeAvatarAura${extraClass}" aria-hidden="true"></span>
  `;
}
function buildHomeReactionFromEntry(row){
  if(!row || typeof row !== "object") return null;
  const sat = Number(row.satisfaction || 0);
  const amt = Number(row.amount || 0);
  const hasValueTag = !!String(row.valueTag || "").trim();
  const cat = String(row.category || "支出");
  let mood = "🙂";
  let tone = "neutral";
  let text = `${cat}を記録したよ。続けるほど育つよ。`;
  if(sat >= 5){
    mood = "🤩";
    tone = "good";
    text = `${cat}、すごく納得の選択！この調子で育てよう。`;
  }else if(sat >= 4){
    mood = "😄";
    tone = "good";
    text = `${cat}、いい感じ！今日も一歩前進。`;
  }else if(sat === 3){
    mood = "🙂";
    tone = "neutral";
    text = `${cat}を記録完了。次はもっと納得の使い方を探そう。`;
  }else if(sat > 0){
    mood = "😟";
    tone = "warn";
    text = `${cat}、少し気になるかも。次は気持ちよく使える形に。`;
  }
  if(amt >= 10000 && tone !== "warn"){
    text = `${cat}で大きめの支出を記録。全体バランスも一緒に見てみよう。`;
  }
  if(hasValueTag && tone !== "warn"){
    text = `${cat}は価値観「${row.valueTag}」につながるね。いい選択！`;
  }
  return {
    mood,
    tone,
    text,
    at: Date.now()
  };
}
function setHomeReaction(row){
  const reaction = buildHomeReactionFromEntry(row);
  if(!reaction) return;
  saveJSON(LS_HOME_REACTION, reaction);
}
function getHomeReaction(){
  const reaction = loadJSON(LS_HOME_REACTION, null);
  if(!reaction || typeof reaction !== "object") return null;
  const at = Number(reaction.at || 0);
  if(!at || (Date.now() - at) > (1000 * 60 * 60 * 12)) return null;
  return reaction;
}

const ENABLE_GROWTH_LOG = false;
let REPORT_TAB = "overview";
function switchReportTab(tab){
  if(tab === "growth" && !ENABLE_GROWTH_LOG){
    tab = "overview";
  }
  const exists = !!document.querySelector(`.reportPane#reportPane-${tab}`);
  REPORT_TAB = exists ? tab : "overview";
  document.querySelectorAll(".reportTabBtn").forEach(btn=>{
    btn.classList.toggle("active", btn.dataset.reportTab === REPORT_TAB);
  });
  document.querySelectorAll(".reportPane").forEach(pane=>{
    pane.classList.toggle("active", pane.id === `reportPane-${REPORT_TAB}`);
  });
}
window.switchReportTab = switchReportTab;

function renderMonthlyReport(){
  const m = $("reportMonth")?.value || ym(new Date());
  const donut = $("reportDonut");
  const legend = $("reportLegend");
  const totalEl = $("reportTotal");
  const quickTotal = $("reportQuickTotal");
  const quickMoM = $("reportQuickMoM");
  const quickMoMHint = $("reportQuickMoMHint");
  const quickTopCat = $("reportQuickTopCat");
  const quickInsight = $("reportQuickInsight");
  const quickBigMemo = $("reportQuickBigMemo");
  const drill = $("reportCategoryDrill");
  renderSpendTrendChart(m);
  renderMonthlyCompareChart(m);
  if(ENABLE_GROWTH_LOG){
    renderReportGrowthLog(m);
  }
  if(!donut || !legend || !totalEl) return;

  const { items, total } = buildMonthlyReportItems(m);
  const cutoffDay = getReportCutoffDay(m);
  const sameDay = buildMonthlyReportItemsToDay(m, cutoffDay);
  const prevMonth = shiftYm(m, -1);
  const prevSameDay = buildMonthlyReportItemsToDay(prevMonth, cutoffDay);
  const momDiff = sameDay.total - prevSameDay.total;
  const momPct = prevSameDay.total > 0 ? Math.round((momDiff / prevSameDay.total) * 100) : null;
  const sameDayItems = sameDay.items;
  const variableItems = items.filter(item=> !FIXED_CATEGORIES.has(item.label));
  const topCat = variableItems[0]?.label || items[0]?.label || "未設定";
  const topCatAmount = variableItems[0]?.amount || items[0]?.amount || 0;
  const topCatShare = total > 0 ? Math.round((topCatAmount / total) * 100) : 0;
  const sameDayVariableItems = sameDayItems.filter(item=> !FIXED_CATEGORIES.has(item.label));
  const prevSameVariableItems = prevSameDay.items.filter(item=> !FIXED_CATEGORIES.has(item.label));
  const momHintText = sameDay.total === 0
    ? "まずは1件記録して比較を始める"
    : momDiff > 0
      ? "先月同日より増加。上位カテゴリを確認"
      : momDiff < 0
        ? "先月同日より減少。このペースを維持"
        : "先月同日と同水準";
  const largestSingle = getLargestSinglePurchase(m, total);

  if(quickTotal) quickTotal.textContent = `${fmtYen(Math.round(total))}円`;
  if(quickMoM){
    quickMoM.classList.remove("is-up", "is-down", "is-flat", "is-nodata");
    if(prevSameDay.total > 0){
      const dir = momDiff > 0 ? "▲ " : momDiff < 0 ? "▼ " : "■ ";
      quickMoM.textContent = `${dir}${momDiff > 0 ? "+" : ""}${fmtYen(Math.round(momDiff))}円 (${momPct > 0 ? "+" : ""}${momPct}%)`;
      if(momDiff > 0){
        quickMoM.classList.add("is-up");
      }else if(momDiff < 0){
        quickMoM.classList.add("is-down");
      }else{
        quickMoM.classList.add("is-flat");
      }
    }else{
      quickMoM.textContent = "比較データなし";
      quickMoM.classList.add("is-nodata");
    }
  }
  if(quickMoMHint) quickMoMHint.textContent = momHintText;
  if(quickTopCat){
    if(topCat === "未設定" || total <= 0){
      quickTopCat.textContent = "未設定";
    }else{
      quickTopCat.textContent = `${topCat} ${fmtYen(Math.round(topCatAmount))}円 (${topCatShare}%)`;
    }
  }
  if(quickInsight){
    if(largestSingle){
      quickInsight.textContent = `${fmtYen(Math.round(largestSingle.amount))}円 (${largestSingle.share}%)`;
    }else{
      quickInsight.textContent = "記録待ち";
    }
  }
  if(quickBigMemo){
    if(largestSingle){
      const memoText = largestSingle.memo ? escapeHtml(largestSingle.memo) : "メモなし";
      quickBigMemo.innerHTML = `${escapeHtml(largestSingle.category)} / ${memoText}`;
    }else{
      quickBigMemo.textContent = "カテゴリ・メモなし";
    }
  }
  totalEl.textContent = total > 0 ? `合計 ${Math.round(total).toLocaleString("ja-JP")}円` : "—";

  if(total <= 0){
    donut.style.background = "conic-gradient(#e2e8f0 0 100%)";
    donut.innerHTML = "";
    donut.classList.remove("is-anim");
    legend.innerHTML = `<div class="small muted">データがありません</div>`;
    if(drill) drill.innerHTML = `<div class="small muted">データがありません</div>`;
    switchReportTab(REPORT_TAB);
    return;
  }

  let start = 0;
  const segments = items.map((item, idx)=>{
    const startPct = start;
    const pct = total > 0 ? (item.amount / total) * 100 : 0;
    const color = REPORT_COLORS[idx % REPORT_COLORS.length];
    const end = start + pct;
    const seg = `${color} ${startPct.toFixed(2)}% ${end.toFixed(2)}%`;
    start = end;
    return { ...item, pct, color, seg, startPct, endPct:end };
  });
  const buildDonutGradient = (focusLabel = "")=>{
    const segStr = segments.map(s=>{
      const color = focusLabel && s.label !== focusLabel ? "#d1d5db" : s.color;
      return `${color} ${s.startPct.toFixed(2)}% ${s.endPct.toFixed(2)}%`;
    }).join(",");
    return `conic-gradient(${segStr})`;
  };
  donut.style.background = buildDonutGradient("");
  const labelMinPct = 7;
  const labelRadiusPct = 34;
  const labelHTML = segments
    .filter(s=> s.pct >= labelMinPct)
    .map(s=>{
      const mid = (s.startPct + s.endPct) / 2;
      const rad = (mid / 100) * Math.PI * 2 - (Math.PI / 2);
      const x = 50 + Math.cos(rad) * labelRadiusPct;
      const y = 50 + Math.sin(rad) * labelRadiusPct;
      return `<span class="reportDonutLabel" data-label="${escapeHtml(s.label)}" style="left:${x}%; top:${y}%;">${escapeHtml(s.label)} ${Math.round(s.pct)}%</span>`;
    }).join("");
  donut.innerHTML = labelHTML;
  donut.classList.remove("is-anim");
  void donut.offsetWidth;
  donut.classList.add("is-anim");

  legend.innerHTML = segments.map(item=>{
    const pctText = `${Math.round(item.pct)}%`;
    const amtText = `${Math.round(item.amount).toLocaleString("ja-JP")}円`;
    return `
      <button class="reportLegendItem" type="button" data-label="${escapeHtml(item.label)}">
        <div class="reportLegendKey"><span class="reportLegendDot" style="background:${item.color};"></span>${escapeHtml(item.label)}</div>
        <div class="reportLegendMeta">${pctText} / ${amtText}</div>
      </button>
    `;
  }).join("");
  let activeLabel = "";
  const syncDonutFocus = ()=>{
    donut.style.background = buildDonutGradient(activeLabel);
    legend.querySelectorAll(".reportLegendItem").forEach(el=>{
      const isActive = el.dataset.label === activeLabel;
      const isDim = activeLabel && !isActive;
      el.classList.toggle("is-active", !!isActive);
      el.classList.toggle("is-dim", !!isDim);
    });
    donut.querySelectorAll(".reportDonutLabel").forEach(el=>{
      const isDim = activeLabel && el.dataset.label !== activeLabel;
      el.classList.toggle("is-dim", !!isDim);
    });
    renderReportCategoryDrill(m, activeLabel, total);
  };
  legend.querySelectorAll(".reportLegendItem").forEach(el=>{
    el.addEventListener("click", ()=>{
      const label = el.dataset.label || "";
      activeLabel = (activeLabel === label) ? "" : label;
      syncDonutFocus();
    });
  });
  donut.querySelectorAll(".reportDonutLabel").forEach(el=>{
    el.addEventListener("click", ()=>{
      const label = el.dataset.label || "";
      activeLabel = (activeLabel === label) ? "" : label;
      syncDonutFocus();
    });
  });
  syncDonutFocus();
  switchReportTab(REPORT_TAB);
}

function getVariableSpendTotalToCutoff(monthStr, cutoffDay){
  return buildMonthlyReportItemsToDay(monthStr, cutoffDay).items
    .filter(item=> !FIXED_CATEGORIES.has(item.label))
    .reduce((sum, item)=> sum + Number(item.amount || 0), 0);
}

function buildCharacterSnapshot(monthStr){
  const monthTx = loadTx().filter(t=> t.date && t.date.startsWith(monthStr));
  const variableTx = monthTx.filter(t=> !FIXED_CATEGORIES.has(t.category));
  const byCat = {};
  variableTx.forEach(t=>{
    byCat[t.category] = (byCat[t.category] || 0) + Number(t.amount || 0);
  });
  const adjustedEntries = Object.entries(byCat).map(([cat, amt])=>({
    cat,
    rawAmount: Number(amt || 0),
    adjustedWeight: Math.sqrt(Math.max(Number(amt || 0), 0)),
  }));
  const adjustedTotal = adjustedEntries.reduce((sum, row)=> sum + row.adjustedWeight, 0);
  const topEntry = adjustedEntries.sort((a,b)=> b.adjustedWeight - a.adjustedWeight)[0];
  const topCategory = topEntry ? topEntry.cat : "未設定";
  const topShare = adjustedTotal > 0
    ? Math.round((topEntry.adjustedWeight / adjustedTotal) * 100)
    : 0;

  const prof = getProfile();
  const valueTop3 = getValueTop3FromProfile(prof);
  const subjective = calcSubjectiveMetrics(variableTx);
  const valueAlign = calcValueAlignmentMetrics(variableTx, valueTop3);
  const regret = calcRegretMetrics(variableTx);
  const cutoffDay = getReportCutoffDay(monthStr);
  const sameMonthVariable = getVariableSpendTotalToCutoff(monthStr, cutoffDay);
  const prevMonth = shiftYm(monthStr, -1);
  const prevMonthVariable = getVariableSpendTotalToCutoff(prevMonth, cutoffDay);
  const variableDiffRate = prevMonthVariable > 0
    ? ((sameMonthVariable - prevMonthVariable) / prevMonthVariable)
    : null;

  const parts = [];
  if(Number.isFinite(subjective.score)) parts.push({ score: subjective.score, weight: 0.5 });
  if(Number.isFinite(valueAlign.score)) parts.push({ score: valueAlign.score, weight: 0.3 });
  if(Number.isFinite(regret.score)) parts.push({ score: regret.score, weight: 0.2 });
  const weightedBase = parts.length
    ? (parts.reduce((s, p)=> s + p.score * p.weight, 0) / parts.reduce((s, p)=> s + p.weight, 0))
    : null;
  let characterScore = weightedBase;
  if(Number.isFinite(characterScore)){
    if(topShare >= 40) characterScore -= 10;
    else if(topShare >= 32) characterScore -= 5;
    if(Number.isFinite(variableDiffRate)){
      if(variableDiffRate > 0.25) characterScore -= 8;
      else if(variableDiffRate > 0.10) characterScore -= 4;
      else if(variableDiffRate < -0.15) characterScore += 4;
    }
    characterScore = clamp(Math.round(characterScore), 0, 100);
  }
  const dataEnough = variableTx.length >= 5 && subjective.coverage >= 0.4;
  const tier = !dataEnough || !Number.isFinite(characterScore)
    ? "分析中"
    : characterScore >= 82
      ? "めっちゃ良い"
      : characterScore >= 66
        ? "良い"
        : characterScore >= 45
          ? "悪い"
          : "めっちゃ悪い";
  return {
    tier,
    score: Number.isFinite(characterScore) ? characterScore : null,
    category: topCategory,
    name: getHomeCharacterName(topCategory, tier),
  };
}

function countContinuousMonthsWithRecords(targetMonth, monthsBack = 24){
  const recorded = new Set(loadTx().map(t=> (t.date || "").slice(0, 7)).filter(Boolean));
  let count = 0;
  for(let i=0;i<monthsBack;i++){
    const month = shiftYm(targetMonth, -i);
    if(recorded.has(month)){
      count += 1;
    }else{
      break;
    }
  }
  return count;
}

function renderReportGrowthLog(monthStr){
  const area = $("reportGrowthLog");
  if(!area) return;
  const continuousMonths = countContinuousMonthsWithRecords(monthStr, 24);
  const uniqueMonths = new Set(
    loadTx().map(t=> (t.date || "").slice(0, 7)).filter(m=> m && m <= monthStr)
  ).size;
  const current = buildCharacterSnapshot(monthStr);
  const prevMonth = shiftYm(monthStr, -1);
  const prev = buildCharacterSnapshot(prevMonth);
  const tierRank = { "分析中":0, "めっちゃ悪い":1, "悪い":2, "良い":3, "めっちゃ良い":4 };
  const tierDelta = (tierRank[current.tier] || 0) - (tierRank[prev.tier] || 0);
  const scoreDelta = (Number.isFinite(current.score) && Number.isFinite(prev.score))
    ? (current.score - prev.score)
    : null;
  const deltaClass = tierDelta > 0 ? "up" : tierDelta < 0 ? "down" : "flat";
  const deltaText = tierDelta > 0
    ? "先月より一段階アップ"
    : tierDelta < 0
      ? "先月より一段階ダウン"
      : "先月と同じ段階";
  const scoreText = Number.isFinite(scoreDelta)
    ? `${scoreDelta > 0 ? "+" : ""}${scoreDelta}pt`
    : "—";
  const trendMonths = [shiftYm(monthStr, -2), shiftYm(monthStr, -1), monthStr];
  const trendRows = trendMonths.map(m=>({
    month: m,
    total: buildMonthlyReportItems(m).total,
  }));
  const trendMax = Math.max(...trendRows.map(r=> r.total), 1);

  area.innerHTML = `
    <div class="growthLogGrid">
      <div class="growthLogCard">
        <div class="growthLogLabel">継続月数</div>
        <div class="growthLogValue">${continuousMonths}ヶ月</div>
        <div class="growthLogSub">これまで記録した月: ${uniqueMonths}ヶ月</div>
      </div>
      <div class="growthLogCard">
        <div class="growthLogLabel">キャラクター進化履歴</div>
        <div class="growthLogValue growthLogFlow">${escapeHtml(prev.name)} → ${escapeHtml(current.name)}</div>
        <div class="growthLogSub">
          <span class="growthLogDelta ${deltaClass}">${escapeHtml(deltaText)}</span>
          <span> / 判定スコア ${scoreText}</span>
        </div>
      </div>
      <div class="growthLogCard">
        <div class="growthLogLabel">3ヶ月推移</div>
        <div class="growthMiniTrend">
          ${trendRows.map(row=>{
            const label = `${Number(row.month.slice(5,7))}月`;
            const width = Math.max(8, Math.round((row.total / trendMax) * 100));
            const currentClass = row.month === monthStr ? "is-current" : "";
            return `
              <div class="growthMiniTrendRow ${currentClass}">
                <div class="growthMiniTrendLabel">${label}</div>
                <div class="growthMiniTrendBar"><span style="width:${width}%;"></span></div>
                <div class="growthMiniTrendValue">${fmtYen(Math.round(row.total))}円</div>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    </div>
  `;
}

function shiftYm(monthStr, delta){
  const [y, m] = monthStr.split("-").map(Number);
  const d = new Date(y, m - 1 + delta, 1);
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}`;
}

function renderSpendTrendChart(monthStr){
  const area = $("reportSpendTrend");
  if(!area) return;
  const tx = loadTx().filter(t=> t.date && t.date.startsWith(monthStr));
  if(!tx.length){
    area.innerHTML = `<div class="small muted" style="padding:8px 0;">対象月の日次データがありません</div>`;
    return;
  }

  const [year, month] = monthStr.split("-").map(Number);
  const days = new Date(year, month, 0).getDate();
  const daily = Array.from({ length: days }, ()=>0);
  tx.forEach(t=>{
    const d = toDate(t.date).getDate();
    if(d >= 1 && d <= days) daily[d - 1] += Number(t.amount || 0);
  });

  const prevMonthStr = shiftYm(monthStr, -1);
  const prevTx = loadTx().filter(t=> t.date && t.date.startsWith(prevMonthStr));
  const prevDays = new Date(Number(prevMonthStr.slice(0,4)), Number(prevMonthStr.slice(5,7)), 0).getDate();
  const prevDaily = Array.from({ length: days }, (_, idx)=> idx < prevDays ? 0 : null);
  prevTx.forEach(t=>{
    const d = toDate(t.date).getDate();
    if(d >= 1 && d <= days && prevDaily[d - 1] != null){
      prevDaily[d - 1] += Number(t.amount || 0);
    }
  });

  const cum = [];
  const prevCum = [];
  let run = 0;
  let prevRun = 0;
  for(let i=0;i<days;i++){
    run += daily[i];
    cum.push(run);
    if(prevDaily[i] == null){
      prevCum.push(null);
    }else{
      prevRun += Number(prevDaily[i] || 0);
      prevCum.push(prevRun);
    }
  }

  const maxCumVal = Math.max(...cum, ...prevCum.map(v=> Number(v || 0)), 1);
  const w = 360;
  const h = 170;
  const pad = { left:14, right:10, top:8, bottom:26 };
  const innerW = w - pad.left - pad.right;
  const innerH = h - pad.top - pad.bottom;
  const x = (i)=> pad.left + ((days <= 1 ? 0 : i / (days - 1)) * innerW);
  const yCum = (v)=> pad.top + (1 - (v / maxCumVal)) * innerH;
  const lineCum = cum.map((v, i)=>`${x(i)},${yCum(v)}`).join(" ");
  const linePrevCum = prevCum
    .map((v, i)=> v == null ? null : `${x(i)},${yCum(v)}`)
    .filter(Boolean)
    .join(" ");
  const areaCum = `M ${x(0)} ${yCum(cum[0])} L ${cum.map((v, i)=>`${x(i)} ${yCum(v)}`).join(" L ")} L ${x(days - 1)} ${yCum(0)} L ${x(0)} ${yCum(0)} Z`;

  const ticks = [];
  for(let d=1; d<=days; d+=7) ticks.push(d);
  if(ticks[ticks.length - 1] !== days) ticks.push(days);
  const yCumMarks = [maxCumVal, Math.round(maxCumVal/2), 0];
  const cumLatest = cum[cum.length - 1];
  const prevCumLatest = Number(prevCum[Math.min(days, prevDays) - 1] || 0);
  const prevMonthFinal = buildMonthlyReportItems(prevMonthStr).total;
  const cumDelta = cumLatest - prevCumLatest;
  const deltaSign = cumDelta > 0 ? "+" : "";
  const prevLastIndex = Math.max(Math.min(days, prevDays) - 1, 0);
  const prevLastY = yCum(Number(prevCum[prevLastIndex] || 0));
  const prevFinalY = yCum(prevMonthFinal);
  const currentY = yCum(cum[cum.length - 1]);
  let currentTopPct = clamp((currentY / h) * 100, 6, 86);
  let prevTopPct = clamp((prevFinalY / h) * 100, 6, 86);
  if(Math.abs(currentTopPct - prevTopPct) < 8){
    prevTopPct = clamp(prevTopPct + 9, 6, 90);
  }
  const maxDaySpend = Math.max(...daily);
  const maxDay = daily.indexOf(maxDaySpend) + 1;
  const shortYen = (v)=>{
    const n = Math.round(v);
    if(n >= 10000){
      const man = n / 10000;
      return `${man >= 100 ? Math.round(man) : man.toFixed(1)}万`;
    }
    return `${fmtYen(n)}`;
  };

  area.innerHTML = `
    <div class="dailyTrendLegend" style="margin-bottom:8px;">
      <span><i class="dailyTrendSwatch cum"></i>当月累計 ${fmtYen(Math.round(cumLatest))}円</span>
      <span><i class="dailyTrendSwatch prevcum"></i>先月累計 ${fmtYen(Math.round(prevCumLatest))}円</span>
    </div>
    <div class="dailyTrendDelta ${cumDelta > 0 ? "up" : (cumDelta < 0 ? "down" : "")}">
      先月同日比 ${deltaSign}${fmtYen(Math.round(cumDelta))}円
    </div>
    <div class="small muted" style="margin-bottom:6px;">月累計（積み上げ）</div>
    <div class="dailyTrendChartBox">
      <svg class="dailyTrendSvg" viewBox="0 0 ${w} ${h}" role="img" aria-label="1ヶ月の累計支出推移">
        <line class="dailyTrendGrid" x1="${pad.left}" y1="${yCum(yCumMarks[0])}" x2="${w - pad.right}" y2="${yCum(yCumMarks[0])}"></line>
        <line class="dailyTrendGrid" x1="${pad.left}" y1="${yCum(yCumMarks[1])}" x2="${w - pad.right}" y2="${yCum(yCumMarks[1])}"></line>
        <line class="dailyTrendGrid" x1="${pad.left}" y1="${yCum(yCumMarks[2])}" x2="${w - pad.right}" y2="${yCum(yCumMarks[2])}"></line>
        ${yCumMarks.map(v=>`<text class="dailyTrendYLabel" x="2" y="${yCum(v)+4}">${shortYen(v)}</text>`).join("")}
        <path class="dailyTrendArea" d="${areaCum}"></path>
        <polyline class="dailyTrendPrevCum" points="${linePrevCum}"></polyline>
        <polyline class="dailyTrendCum" points="${lineCum}"></polyline>
        <circle class="dailyTrendDotPrev" cx="${x(prevLastIndex)}" cy="${prevLastY}" r="3.5"></circle>
        <circle class="dailyTrendDot" cx="${x(days - 1)}" cy="${currentY}" r="4"></circle>
        <circle class="dailyTrendDotPrevFinal" cx="${x(days - 1)}" cy="${prevFinalY}" r="3.2"></circle>
      </svg>
      <div class="dailyTrendInlineValue current" style="top:${currentTopPct}%;">当月累計 ${fmtYen(Math.round(cumLatest))}円</div>
      <div class="dailyTrendInlineValue prev" style="top:${prevTopPct}%;">先月着地 ${fmtYen(Math.round(prevMonthFinal))}円</div>
    </div>
    <div class="dailyTrendAxis">
      ${ticks.map(d=>`<span>${d}日</span>`).join("")}
    </div>
    <div class="small muted" style="margin-top:6px;">今月の最大支出日: ${maxDay}日（${fmtYen(Math.round(maxDaySpend))}円）</div>
  `;
}

function renderMonthlyCompareChart(monthStr){
  const area = $("reportMonthlyCompare");
  if(!area) return;
  const months = [];
  for(let i=5;i>=0;i--) months.push(shiftYm(monthStr, -i));
  const rows = months.map(m=>({
    month: m,
    total: buildMonthlyReportItems(m).total
  }));
  const maxTotal = Math.max(...rows.map(r=>r.total), 1);
  const chartHtml = rows.map(r=>{
    const width = Math.round((r.total / maxTotal) * 100);
    const isCurrent = r.month === monthStr;
    const label = `${Number(r.month.slice(5,7))}月`;
    return `
      <div class="monthCompareRow ${isCurrent ? "isCurrent" : ""}">
        <div class="monthCompareLabel">${label}</div>
        <div class="monthCompareBar">
          <div class="monthCompareFill" style="width:${width}%;"></div>
        </div>
        <div class="monthCompareValue">${fmtYen(Math.round(r.total))}円</div>
      </div>
    `;
  }).join("");
  const premiumHint = isPremiumUser()
    ? ""
    : `<button class="monthCompareUnlockBtn" type="button" onclick="openPremiumFromCompare()">マンスリーサマリー詳細を解放する</button>`;
  area.innerHTML = `${chartHtml}${premiumHint}`;
}

function buildDailyComparisonData(monthStr){
  const tx = loadTx().filter(t=> t.date && t.date.startsWith(monthStr));
  if(!tx.length) return null;

  const byDate = {};
  const byDateCategory = {};
  tx.forEach(t=>{
    const date = t.date;
    if(!byDate[date]) byDate[date] = { sum:0, count:0 };
    byDate[date].sum += Number(t.amount || 0);
    byDate[date].count += 1;

    if(!byDateCategory[date]) byDateCategory[date] = {};
    byDateCategory[date][t.category] = (byDateCategory[date][t.category] || 0) + Number(t.amount || 0);
  });

  const dates = Object.keys(byDate).sort();
  if(dates.length < 2){
    return { dates, byDate, byDateCategory, latestDate: dates[0], prevDate: null };
  }

  const latestDate = dates[dates.length - 1];
  const prevDate = dates[dates.length - 2];
  return { dates, byDate, byDateCategory, latestDate, prevDate };
}

function calcWindowAverage(byDate, endDateStr, days){
  const end = toDate(endDateStr);
  let sum = 0;
  for(let i=0;i<days;i++){
    const d = new Date(end);
    d.setDate(end.getDate() - i);
    const key = ymd(d);
    sum += Number(byDate[key]?.sum || 0);
  }
  return sum / days;
}

function calcCategoryWindowTotals(tx, endDateStr, days){
  const end = toDate(endDateStr);
  const start = new Date(end);
  start.setDate(end.getDate() - (days - 1));
  const sums = {};
  tx.forEach(t=>{
    const d = toDate(t.date);
    if(d < start || d > end) return;
    const key = t.category;
    sums[key] = (sums[key] || 0) + Number(t.amount || 0);
  });
  return sums;
}

function buildDailyTrendChartHTML(byDate, latestDateStr, days = 30){
  const end = toDate(latestDateStr);
  const points = [];
  for(let i=days-1;i>=0;i--){
    const d = new Date(end);
    d.setDate(end.getDate() - i);
    const key = ymd(d);
    points.push({
      key,
      label: `${d.getMonth()+1}/${d.getDate()}`,
      value: Number(byDate[key]?.sum || 0),
    });
  }

  const ma = points.map((_, idx)=>{
    let sum = 0;
    for(let i=0;i<7;i++){
      const p = points[idx - i];
      if(!p) continue;
      sum += p.value;
    }
    return sum / Math.min(idx + 1, 7);
  });

  const maxValue = Math.max(
    ...points.map(p=>p.value),
    ...ma,
    1
  );
  const w = 320;
  const h = 140;
  const pad = { left:8, right:8, top:8, bottom:18 };
  const innerW = w - pad.left - pad.right;
  const innerH = h - pad.top - pad.bottom;
  const x = (idx)=> pad.left + (idx / (points.length - 1)) * innerW;
  const y = (val)=> pad.top + (1 - (val / maxValue)) * innerH;

  const line = points.map((p, idx)=>`${x(idx)},${y(p.value)}`).join(" ");
  const avgLine = ma.map((v, idx)=>`${x(idx)},${y(v)}`).join(" ");
  const latest = points[points.length - 1];
  const latestAvg = ma[ma.length - 1];
  const latestX = x(points.length - 1);
  const latestY = y(latest.value);
  const startLabel = points[0].label;
  const endLabel = latest.label;

  return `
    <div class="dailyTrendWrap">
      <div class="small muted" style="margin-bottom:6px;">日次推移（直近${days}日）</div>
      <svg class="dailyTrendSvg" viewBox="0 0 ${w} ${h}" role="img" aria-label="日次支出の推移">
        <line class="dailyTrendGrid" x1="${pad.left}" y1="${y(maxValue*0.5)}" x2="${w-pad.right}" y2="${y(maxValue*0.5)}"></line>
        <polyline class="dailyTrendAvg" points="${avgLine}"></polyline>
        <polyline class="dailyTrendMain" points="${line}"></polyline>
        <circle class="dailyTrendDot" cx="${latestX}" cy="${latestY}" r="3.5"></circle>
      </svg>
      <div class="dailyTrendAxis">
        <span>${startLabel}</span>
        <span>${endLabel}</span>
      </div>
      <div class="dailyTrendLegend">
        <span><i class="dailyTrendSwatch main"></i>日次支出 ${fmtYen(Math.round(latest.value))}円</span>
        <span><i class="dailyTrendSwatch avg"></i>7日平均 ${fmtYen(Math.round(latestAvg))}円/日</span>
      </div>
    </div>
  `;
}

function renderDailyComparison(monthStr){
  const area = $("reportDailyCompare");
  if(!area) return;
  const data = buildDailyComparisonData(monthStr);
  if(!data){
    area.innerHTML = `<div class="small muted" style="padding:8px 0;">日次比較データがありません</div>`;
    return;
  }

  const latest = data.latestDate;
  if(!data.prevDate){
    const latestSumOnly = Number(data.byDate[latest]?.sum || 0);
    area.innerHTML = `
      <div class="small muted" style="padding:8px 0;">
        ${latest} の記録のみあります（${fmtYen(latestSumOnly)}円）。比較するには2日以上の記録が必要です。
      </div>
    `;
    return;
  }

  const prev = data.prevDate;
  const latestSum = Number(data.byDate[latest]?.sum || 0);
  const prevSum = Number(data.byDate[prev]?.sum || 0);
  const delta = latestSum - prevSum;
  const deltaSign = delta > 0 ? "+" : "";
  const deltaTone = delta > 0 ? "up" : (delta < 0 ? "down" : "");
  const avg7 = calcWindowAverage(data.byDate, latest, 7);
  const prev7End = ymd(new Date(toDate(latest).getFullYear(), toDate(latest).getMonth(), toDate(latest).getDate() - 7));
  const prevAvg7 = calcWindowAverage(data.byDate, prev7End, 7);
  const avgDelta = avg7 - prevAvg7;
  const avgDeltaSign = avgDelta > 0 ? "+" : "";
  const avgTone = avgDelta > 0 ? "up" : (avgDelta < 0 ? "down" : "");

  const monthTx = loadTx().filter(t=> t.date && t.date.startsWith(monthStr));
  const latest7Cats = calcCategoryWindowTotals(monthTx, latest, 7);
  const prev7Cats = calcCategoryWindowTotals(monthTx, prev7End, 7);
  const keys = Array.from(new Set([...Object.keys(latest7Cats), ...Object.keys(prev7Cats)]));
  const topDiff = keys.map(key=>({
    key,
    diff: Number(latest7Cats[key] || 0) - Number(prev7Cats[key] || 0),
  }))
    .filter(x=>x.diff !== 0)
    .sort((a,b)=>Math.abs(b.diff) - Math.abs(a.diff))
    .slice(0,3);
  const trendChartHtml = buildDailyTrendChartHTML(data.byDate, latest, 30);

  area.innerHTML = `
    <div class="dailyCompareMeta">
      <span class="dailyComparePill">最新記録日: ${escapeHtml(latest)}</span>
      <span class="dailyComparePill">比較対象: ${escapeHtml(prev)}</span>
    </div>
    <div class="dailyCompareGrid">
      <div class="dailyCompareCard">
        <div class="dailyCompareLabel">1日支出の差分（最新 - 前回）</div>
        <div class="dailyCompareValue ${deltaTone}">${deltaSign}${fmtYen(delta)}円</div>
        <div class="dailyCompareSub">${fmtYen(latestSum)}円 vs ${fmtYen(prevSum)}円</div>
      </div>
      <div class="dailyCompareCard">
        <div class="dailyCompareLabel">直近7日平均の差分</div>
        <div class="dailyCompareValue ${avgTone}">${avgDeltaSign}${fmtYen(Math.round(avgDelta))}円/日</div>
        <div class="dailyCompareSub">${fmtYen(Math.round(avg7))}円/日 vs ${fmtYen(Math.round(prevAvg7))}円/日</div>
      </div>
    </div>
    <div class="dailyDiffList">
      <div class="small muted" style="margin-bottom:6px;">カテゴリ差分（直近7日 - その前7日）</div>
      ${topDiff.length ? topDiff.map(item=>`
        <div class="dailyDiffRow">
          <div style="font-weight:900;">${escapeHtml(item.key)}</div>
          <div class="dailyDiffAmt ${item.diff > 0 ? "up" : "down"}">${item.diff > 0 ? "+" : ""}${fmtYen(item.diff)}円</div>
        </div>
      `).join("") : `<div class="small muted">カテゴリ差分はありません</div>`}
    </div>
    ${trendChartHtml}
  `;
}
function getStateColorVar(state){
  const map = {
    low: "var(--state-low)",
    mid: "var(--state-mid)",
    high: "var(--state-high)",
    top: "var(--state-top)",
  };
  return map[state] || "var(--state-mid)";
}
function donutHTML(score, opts = {}){
  const p = clamp(Math.round(score), 0, 100);
  const sizeClass = opts.size === "xxl"
    ? "xxl"
    : (opts.size === "xl" ? "xl" : (opts.size === "lg" ? "lg" : ""));
  const state = opts.state || getScoreState(p);
  const color = opts.stateColor || getStateColorVar(state);
  return `
    <div class="donutWrap ${sizeClass}">
      <div class="donut ${sizeClass}" data-state="${state}" data-p="${p}" style="--p:0; --donut-color:${color};"></div>
      <div class="donutValue ${sizeClass}"><span>${p}</span><span>/100</span></div>
    </div>
  `;
}

function animateDonuts(scope){
  const root = scope || document;
  root.querySelectorAll(".donut[data-p]").forEach(el=>{
    const p = el.dataset.p;
    if(p == null) return;
    requestAnimationFrame(()=>{ el.style.setProperty("--p", String(p)); });
  });
}

function getRecentWeekRange(){
  const now = new Date();
  const end = new Date(now);
  end.setHours(0,0,0,0);
  const start = new Date(end);
  start.setDate(end.getDate() - 6);
  return { start, end };
}
function getDaysInMonth(monthStr){
  if(!monthStr || !/^\d{4}-\d{2}$/.test(monthStr)) return null;
  const [y,m] = monthStr.split("-").map(Number);
  if(!y || !m) return null;
  return new Date(y, m, 0).getDate();
}
function daysBetweenInclusive(a,b){
  const out = [];
  const d = new Date(a);
  while(d <= b){
    out.push(ymd(d));
    d.setDate(d.getDate()+1);
  }
  return out;
}

function buildWeeklyResult(){
  const { start, end } = getRecentWeekRange();
  const days = daysBetweenInclusive(start, end);

  const allTxRaw = loadTx();
  const allTx = allTxRaw.filter(t => days.includes(t.date));
  const spend = allTx.reduce((a,t)=>a+Number(t.amount||0),0);
  const monthStr = ym(new Date());
  const monthTx = allTxRaw.filter(t => t.date && t.date.startsWith(monthStr));
  const characterTx = monthTx.length ? monthTx : allTx;

  const subjective = calcSubjectiveMetrics(allTx);
  const subjectiveScore = subjective.score;
  const coveragePct = allTx.length ? Math.round(subjective.coverage * 100) : 0;
  const regret = calcRegretMetrics(allTx);
  const regretRate = regret.rate;

  const daysWithEntry = new Set(allTx.map(t=>t.date)).size;
  let weeklyScore = 60;
  weeklyScore += Math.min(daysWithEntry * 4, 20);
  if(subjectiveScore != null) weeklyScore += (subjectiveScore-50) * 0.25;
  if(regretRate != null) weeklyScore -= regretRate * 25;
  weeklyScore = clamp(Math.round(weeklyScore), 0, 100);

  const dow = ["日","月","火","水","木","金","土"][end.getDay()];
  const period = `${ymd(start)}（日）〜${ymd(end)}（${dow}）`;

  const income = Number($("incomeYen")?.value||0);
  const weeklySpendControl = income > 0
    ? clamp(Math.round((1 - (spend / (income / 4))) * 100), 0, 100)
    : null;

  const summaryWeekly = buildSummaryTextWeekly({ daysWithEntry, subjectiveScore, regretRate });
  const weeklyState = getScoreState(weeklyScore);
  const weeklyStateLabel = getStateLabel(weeklyState);
  const readyMonth = getLatestReadyMonth();
  const weeklyReportHint = readyMonth
    ? `<div class="weeklyHeroHint">${emojiHTML("📄","mini")} マンスリーサマリーが届いています</div>`
    : "";
  const weeklyMascotCTA = "";
  const weeklyReportCTA = readyMonth
    ? `role="button" aria-label="マンスリーサマリーを開く" onclick="showMonthlyScore()"`
    : "";
  const growthTotal = getTotalXP();
  const xp = getXPProgress(growthTotal);
  const xpLevel = xp.level;
  const xpInLevel = xp.inLevel;
  const xpPct = xp.pct;
  const xpNext = xp.next;
  const weeklyStage = getGrowthStage(growthTotal);
  const weeklyStageLabel = getGrowthLabel(weeklyStage);
  const characterQuality = calcSubjectiveMetrics(characterTx).score;
  const monthlyTopCategory = getTopCategory(monthTx);
  const weeklyTopCategory = getTopCategory(allTx);
  const evoCategory = (xpLevel >= 25) ? ensureEvolutionCategory(weeklyStage, monthTx) : null;
  const monthLineage = getLineageFromCategory(evoCategory || monthlyTopCategory);
  const dailyLineage = getLineageFromCategory(weeklyTopCategory);
  const lineage = (xpLevel < 25) ? dailyLineage : monthLineage;
  const mascotTone = getMascotTone((xpLevel < 25) ? weeklyTopCategory : (evoCategory || monthlyTopCategory));
  const mascotMood = getMascotMood(characterQuality);
  const weeklyStageComment = getGrowthComment(weeklyStage);
  const streakDays = calcStreakDays(new Set(allTxRaw.map(t=>t.date)));
  const latestMonthlyAvg = getLatestMonthlyAvgScore();
  const reactionText = (latestMonthlyAvg != null && latestMonthlyAvg >= 70)
    ? "いい流れ。今月もよく向き合えたね。"
    : "焦らなくて大丈夫。自分のペースで続けよう。";
  const characterName = getCharacterName(xpLevel, lineage, monthlyTopCategory);
  const lineageClass = lineage ? `lineage-${lineage}` : "";
  const html = `
    <div class="resultWrap">
      <div class="weeklyHero ${lineageClass}" aria-label="今週の家計コンディション">
        <div class="weeklyHeroArt" aria-hidden="true">
          <div class="heroHouse" aria-hidden="true">
            <div class="heroHouseRoof"></div>
            <div class="heroHouseBody"></div>
            <div class="heroHouseDoor"></div>
            <div class="heroHouseWindow"></div>
          </div>
          <div class="weeklyHeroMascot" ${weeklyMascotCTA} onclick="playMascotFlip(event)">
            <div class="mascotCore">
              <div class="mascotBody">
                ${mascotSvgHTML(weeklyStage, { tone: mascotTone, mood: mascotMood })}
              </div>
            </div>
          </div>
          ${readyMonth ? `<span class="mascotReport" ${weeklyReportCTA}>${emojiHTML("📄","mini")}</span>` : ""}
        </div>
        <div class="heroGauge">
          <div class="heroGaugeName">${characterName}</div>
          <div class="heroGaugeLine">${weeklyStateLabel} / Lv.${xpLevel}</div>
          <div class="heroGaugeTrack">
            <div class="heroGaugeFill" style="width:${xpPct}%;"></div>
          </div>
          <div class="heroGaugeMeta">次のLvまで ${xpNext ? (xpNext - xpInLevel) : 0}xp</div>
          <div class="heroGaugeMeta">連続入力：${streakDays}日</div>
          <div class="heroGaugeMeta">育成レベル：${weeklyStageLabel}</div>
          <div class="heroGaugeReact">${reactionText}</div>
          <div class="heroGaugeNote">${weeklyStageComment}</div>
          ${weeklyReportHint ? `<div class="heroGaugeBadge">${weeklyReportHint}</div>` : ""}
        </div>
      </div>
    </div>
  `;

 const text =
`今週のふりかえり
期間：${period}
週次スコア：${weeklyScore}/100
主観納得度：${subjectiveScore==null?"—":subjectiveScore+"/100"}
納得入力率：${coveragePct}%
後悔率：${regretRate==null?"—":`${Math.round(regretRate*100)}%`}`;

  return { html, text, weeklyScore };
}

function openWeeklyReport(){
  const result = buildWeeklyResult();
  const view = $("modalResultView");
  const txt = $("modalResultText");
  if(view) view.innerHTML = result.html;
  if(txt) txt.textContent = result.text;
  if(view) animateDonuts(view);
  $("weeklyBadge") && ($("weeklyBadge").textContent = "開封済");
  openModal("resultModal");
}
window.openWeeklyReport = openWeeklyReport;

function renderWeeklyInline(){
  const wrap = $("weeklyInline");
  if(!wrap) return;
  const monthStr = ym(new Date());
  const allMonthTx = loadTx().filter(t=> t.date && t.date.startsWith(monthStr));
  const variableTx = allMonthTx.filter(t=> !FIXED_CATEGORIES.has(t.category));
  const variableTotal = variableTx.reduce((sum, t)=> sum + Number(t.amount || 0), 0);
  const byCat = {};
  variableTx.forEach(t=>{
    byCat[t.category] = (byCat[t.category] || 0) + Number(t.amount || 0);
  });
  const adjustedEntries = Object.entries(byCat).map(([cat, amt])=>({
    cat,
    rawAmount: Number(amt || 0),
    // Share correction: suppress dominance of very large categories.
    adjustedWeight: Math.sqrt(Math.max(Number(amt || 0), 0)),
  }));
  const adjustedTotal = adjustedEntries.reduce((sum, row)=> sum + row.adjustedWeight, 0);
  const topEntry = adjustedEntries.sort((a,b)=> b.adjustedWeight - a.adjustedWeight)[0];
  const topCategory = topEntry ? topEntry.cat : "未設定";
  const topAmount = topEntry ? topEntry.rawAmount : 0;
  const topShare = adjustedTotal > 0
    ? Math.round((topEntry.adjustedWeight / adjustedTotal) * 100)
    : 0;

  const prof = getProfile();
  const valueTop3 = getValueTop3FromProfile(prof);
  const subjective = calcSubjectiveMetrics(variableTx);
  const valueAlign = calcValueAlignmentMetrics(variableTx, valueTop3);
  const regret = calcRegretMetrics(variableTx);

  const cutoffDay = getReportCutoffDay(monthStr);
  const prevSameAll = buildMonthlyReportItemsToDay(shiftYm(monthStr, -1), cutoffDay);
  const sameDayAll = buildMonthlyReportItemsToDay(monthStr, cutoffDay);
  const sameDayVariable = sameDayAll.items
    .filter(item=> !FIXED_CATEGORIES.has(item.label))
    .reduce((sum, item)=> sum + Number(item.amount || 0), 0);
  const prevSameVariable = prevSameAll.items
    .filter(item=> !FIXED_CATEGORIES.has(item.label))
    .reduce((sum, item)=> sum + Number(item.amount || 0), 0);
  const variableDiffRate = prevSameVariable > 0 ? ((sameDayVariable - prevSameVariable) / prevSameVariable) : null;

  const parts = [];
  if(Number.isFinite(subjective.score)) parts.push({ score: subjective.score, weight: 0.5 });
  if(Number.isFinite(valueAlign.score)) parts.push({ score: valueAlign.score, weight: 0.3 });
  if(Number.isFinite(regret.score)) parts.push({ score: regret.score, weight: 0.2 });
  const weightedBase = parts.length
    ? (parts.reduce((s, p)=> s + p.score * p.weight, 0) / parts.reduce((s, p)=> s + p.weight, 0))
    : null;
  let characterScore = weightedBase;
  if(Number.isFinite(characterScore)){
    if(topShare >= 40) characterScore -= 10;
    else if(topShare >= 32) characterScore -= 5;
    if(Number.isFinite(variableDiffRate)){
      if(variableDiffRate > 0.25) characterScore -= 8;
      else if(variableDiffRate > 0.10) characterScore -= 4;
      else if(variableDiffRate < -0.15) characterScore += 4;
    }
    characterScore = clamp(Math.round(characterScore), 0, 100);
  }

  const dataEnough = variableTx.length >= 5 && subjective.coverage >= 0.4;
  let tier = !dataEnough || !Number.isFinite(characterScore)
    ? "分析中"
    : characterScore >= 82
      ? "めっちゃ良い"
      : characterScore >= 66
        ? "良い"
        : characterScore >= 45
          ? "悪い"
          : "めっちゃ悪い";

  let displayCategory = topCategory;
  let displayShare = topShare;
  let archetype = getHomeCharacterName(displayCategory, tier);

  const daysInMonth = getDaysInMonth(monthStr) || 30;
  const daysWithEntry = new Set(allMonthTx.map(t=> t.date)).size;
  const latestEntry = allMonthTx
    .map(t=> t.date)
    .filter(Boolean)
    .sort()
    .pop() || "";
  const latestEntryLabel = latestEntry
    ? `${latestEntry.slice(5,7)}/${latestEntry.slice(8,10)}`
    : "未記録";
  const previewMode = localStorage.getItem(LS_HOME_PREVIEW) || "auto";
  const previewCategory = localStorage.getItem(LS_HOME_PREVIEW_CATEGORY) || "auto";
  if(previewCategory !== "auto" && CATEGORIES.includes(previewCategory)){
    displayCategory = previewCategory;
    displayShare = (displayCategory === topCategory && topShare > 0) ? topShare : 42;
    archetype = getHomeCharacterName(displayCategory, tier);
  }
  if(previewMode !== "auto"){
    const preset = {
      analyzing: { tier:"分析中", mood:"🙂", speech:"記録が増えると、あなたらしい使い方の傾向がはっきりしてきます。" },
      great: { tier:"めっちゃ良い", mood:"🤩", speech:"納得できる使い方ができています。今月はかなり良い状態です。" },
      good: { tier:"良い", mood:"😄", speech:"大きな崩れはなく、いいペースで使えています。" },
      bad: { tier:"悪い", mood:"😟", speech:"使い方に少しブレがあります。内訳を見て1カテゴリだけ整えましょう。" },
      verybad: { tier:"めっちゃ悪い", mood:"🥶", speech:"後悔につながる使い方が目立っています。今月は先に上限を決めて使うのが安全です。" },
    }[previewMode];
    if(preset){
      tier = preset.tier;
      archetype = getHomeCharacterName(displayCategory, tier);
    }
  }

  const mood = tier === "めっちゃ良い" ? "🤩"
    : tier === "良い" ? "😄"
    : tier === "悪い" ? "😟"
    : tier === "めっちゃ悪い" ? "🥶"
    : "🙂";
  const speech = tier === "分析中"
    ? "記録が増えると、あなたらしい使い方の傾向がはっきりしてきます。"
    : tier === "めっちゃ良い"
      ? "納得できる使い方ができています。今月はかなり良い状態です。"
      : tier === "良い"
        ? "大きな崩れはなく、いいペースで使えています。"
        : tier === "悪い"
          ? "使い方に少しブレがあります。内訳を見て1カテゴリだけ整えましょう。"
          : "後悔につながる使い方が目立っています。今月は先に上限を決めて使うのが安全です。";
  const reaction = getHomeReaction();
  const displayMood = reaction?.mood || mood;
  const displaySpeech = reaction?.text || speech;
  const reactionToneClass = reaction?.tone === "good"
    ? "good"
    : reaction?.tone === "warn"
      ? "warn"
      : "neutral";
  const readyMonth = getLatestReadyMonth();
  const reportBadge = readyMonth ? `<span class="homeLiveBadge report">📄 マンスリー便りあり</span>` : "";
  const reactionBadge = reaction ? `<span class="homeLiveBadge ${reactionToneClass}">${reaction.mood} いまの気分</span>` : "";

  wrap.innerHTML = `
    <div class="homeHeroCard">
      <div class="homeHeroHeader">
        <span class="homeHeroEyebrow">今月のキャラクター</span>
        ${reactionBadge}
        ${reportBadge}
      </div>
      <div class="homeHeroTop">
        <div class="homeAvatarWrap">
          <div class="homeAvatar is-live" id="homeAvatarLive">${homeAvatarHTML(displayCategory, tier, displayMood, { extraClass:"is-live", imgClass:"is-live", fallbackClass:"is-live" })}</div>
        </div>
        <div class="homeStateBlock">
          <div class="homeStateTitle">${escapeHtml(archetype)} <span class="homeStatePill ${tier === "めっちゃ良い" || tier === "良い" ? "good" : (tier === "悪い" || tier === "めっちゃ悪い" ? "warn" : "")}">${tier}</span></div>
          <div class="homeStateSub">${displayCategory !== "未設定" ? `主カテゴリ: ${escapeHtml(displayCategory)} (${displayShare}%)` : "主カテゴリ判定中"}${Number.isFinite(characterScore) ? ` / 判定スコア ${characterScore}` : ""}</div>
        </div>
      </div>
      <div class="homeSpeech ${reaction ? `is-live ${reactionToneClass}` : ""}">${displaySpeech}</div>
      <div class="homeRecordMeta">
        <span class="homeRecordPill">今月の記録あり: ${daysWithEntry}日</span>
        <span class="homeRecordPill">最終記録: ${latestEntryLabel}</span>
      </div>
    </div>
  `;
  const section = $("score-weekly");
  if(section) section.style.display = "";
}
window.renderWeeklyInline = renderWeeklyInline;

function setHomePreviewMode(mode){
  const allow = new Set(["auto","analyzing","great","good","bad","verybad"]);
  const value = allow.has(mode) ? mode : "auto";
  localStorage.setItem(LS_HOME_PREVIEW, value);
  renderWeeklyInline();
  toast(`表示確認: ${value === "auto" ? "自動判定" : value}`);
}
window.setHomePreviewMode = setHomePreviewMode;

function setHomePreviewCategory(category){
  const allow = new Set(["auto", ...CATEGORIES]);
  const value = allow.has(category) ? category : "auto";
  localStorage.setItem(LS_HOME_PREVIEW_CATEGORY, value);
  renderWeeklyInline();
  toast(`カテゴリ確認: ${value === "auto" ? "自動" : value}`);
}
window.setHomePreviewCategory = setHomePreviewCategory;
function setHomeReactionPreview(type){
  const map = {
    good: { mood:"😄", tone:"good", text:"今日の使い方、かなりいい感じ！このまま育てよう。" },
    neutral: { mood:"🙂", tone:"neutral", text:"順調に記録できています。次の一手を見つけよう。" },
    warn: { mood:"😟", tone:"warn", text:"少しブレあり。次の支出は納得感を意識してみよう。" },
  };
  const payload = map[type];
  if(!payload) return;
  saveJSON(LS_HOME_REACTION, { ...payload, at: Date.now() });
  renderWeeklyInline();
  toast("気分リアクションを反映しました");
}
window.setHomeReactionPreview = setHomeReactionPreview;
function clearHomeReactionPreview(){
  localStorage.removeItem(LS_HOME_REACTION);
  renderWeeklyInline();
  toast("自動表示に戻しました");
}
window.clearHomeReactionPreview = clearHomeReactionPreview;
function triggerHomeAvatarAction(action){
  const avatar = $("homeAvatarLive");
  if(!avatar) return;
  const cls = action === "spark" ? "is-spark" : "is-jump";
  avatar.classList.remove("is-jump", "is-spark");
  void avatar.offsetWidth;
  avatar.classList.add(cls);
  setTimeout(()=> avatar.classList.remove(cls), action === "spark" ? 900 : 700);
}
window.triggerHomeAvatarAction = triggerHomeAvatarAction;

function animateGrowth(scope){
  const root = scope || document;
  root.querySelectorAll(".growthFill").forEach(el=>{
    el.classList.remove("pulse");
    void el.offsetWidth;
    el.classList.add("pulse");
  });
}

function playMascotFlip(e){
  if(e){
    e.stopPropagation();
    e.preventDefault();
  }
  const target = e.currentTarget;
  if(!target) return;
  const body = target.querySelector(".mascotBody") || target;
  body.classList.remove("flip");
  void body.offsetWidth;
  body.classList.add("flip");
  clearTimeout(body._flipTimer);
  body._flipTimer = setTimeout(()=>{ body.classList.remove("flip"); }, 2300);
}
window.playMascotFlip = playMascotFlip;

function renderMonthlyGate(){
  const wrap = $("monthlyGate");
  if(!wrap) return;
  const readyMonth = getLatestReadyMonth();
  const currentMonth = ym(new Date());
  const targetMonth = readyMonth || currentMonth;
  $("scoreMonth") && ($("scoreMonth").value = targetMonth);

  if(readyMonth){
    wrap.innerHTML = `
      <div class="sectionCard monthlyGateCard">
        <div class="sectionHead">
          <div><div class="sectionName">マンスリーサマリー</div><div class="sectionHint">${escapeHtml(targetMonth)} 分が届いています</div></div>
        </div>
        <button class="primary" type="button" style="width:100%; margin-top:10px;" onclick="showMonthlyScore()">マンスリーサマリーを見る</button>
      </div>
    `;
    return;
  }

  wrap.innerHTML = `
    <div class="sectionCard">
      <div class="sectionHead">
        <div><div class="sectionName">マンスリーサマリー</div><div class="sectionHint">${escapeHtml(targetMonth)} を準備中</div></div>
      </div>
      <button class="ghost" type="button" style="width:100%; margin-top:10px;" onclick="openScreen('report')">レポート画面を見る</button>
    </div>
  `;
}
window.renderMonthlyGate = renderMonthlyGate;

function completeMonthFromCalendar(){
  const monthStr = ym(CAL_ANCHOR);
  if(!confirm(`${monthStr} の入力を完了しますか？`)) return;
  markMonthlyReady(monthStr);
  renderMonthlyGate();
  toast("マンスリーサマリーが届きました");
}
window.completeMonthFromCalendar = completeMonthFromCalendar;

function switchMonthlyAxis(axis){
  const panes = document.querySelectorAll(".monthlyAxisPane");
  panes.forEach(pane=>{
    pane.style.display = (pane.dataset.monthlyAxis === axis) ? "" : "none";
    pane.setAttribute("aria-hidden", pane.dataset.monthlyAxis === axis ? "false" : "true");
  });
  document.querySelectorAll(".monthlyAxisBtn").forEach(btn=>{
    btn.classList.toggle("active", btn.dataset.axis === axis);
    btn.setAttribute("aria-selected", btn.dataset.axis === axis ? "true" : "false");
  });
}
window.switchMonthlyAxis = switchMonthlyAxis;

function switchMonthlyMainTab(tab){
  const axisPanes = document.querySelectorAll(".monthlyAxisPane");
  const detailPanes = document.querySelectorAll(".monthlyDetailPane[data-detail]");
  axisPanes.forEach(pane=>{
    const show = pane.dataset.monthlyAxis === tab;
    pane.style.display = show ? "" : "none";
    pane.setAttribute("aria-hidden", show ? "false" : "true");
  });
  detailPanes.forEach(pane=>{
    const show = pane.dataset.detail === tab;
    pane.style.display = show ? "" : "none";
    pane.setAttribute("aria-hidden", show ? "false" : "true");
  });
  document.querySelectorAll(".monthlyAxisBtn").forEach(btn=>{
    const isActive = btn.dataset.main === tab;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-selected", isActive ? "true" : "false");
  });
}
window.switchMonthlyMainTab = switchMonthlyMainTab;

function bindScatterTooltips(){
  document.querySelectorAll(".scatterWrap").forEach(wrap=>{
    const tip = wrap.querySelector(".scatterTooltip");
    if(!tip) return;
    wrap.querySelectorAll("[data-tooltip]").forEach(node=>{
      node.addEventListener("mouseenter", (e)=>{
        tip.textContent = e.currentTarget.getAttribute("data-tooltip") || "";
        tip.style.opacity = "1";
        tip.style.transform = "translateY(0)";
      });
      node.addEventListener("mouseleave", ()=>{
        tip.style.opacity = "0";
        tip.style.transform = "translateY(-4px)";
      });
      node.addEventListener("mousemove", (e)=>{
        const rect = wrap.getBoundingClientRect();
        tip.style.left = `${e.clientX - rect.left + 8}px`;
        tip.style.top = `${e.clientY - rect.top - 28}px`;
      });
    });
  });
}

function bindScatterLegendToggles(){
  document.querySelectorAll(".scatterLegend").forEach(legend=>{
    legend.querySelectorAll(".legendPill[data-target]").forEach(pill=>{
      pill.addEventListener("click", ()=>{
        const target = pill.dataset.target;
        const wrap = legend.closest(".scatterWrap");
        if(!wrap) return;
        const isOff = pill.classList.toggle("is-off");
        pill.setAttribute("aria-pressed", isOff ? "false" : "true");
        wrap.querySelectorAll(`[data-series="${target}"]`).forEach(el=>{
          el.classList.toggle("is-hidden", isOff);
        });
      });
    });
  });
}

function switchMonthlyDetailTab(tab){
  const panes = document.querySelectorAll(".monthlyDetailPane");
  panes.forEach(pane=>{
    pane.style.display = (pane.dataset.detail === tab) ? "" : "none";
    pane.setAttribute("aria-hidden", pane.dataset.detail === tab ? "false" : "true");
  });
  document.querySelectorAll(".monthlyDetailBtn").forEach(btn=>{
    btn.classList.toggle("active", btn.dataset.detail === tab);
    btn.setAttribute("aria-selected", btn.dataset.detail === tab ? "true" : "false");
  });
}
window.switchMonthlyDetailTab = switchMonthlyDetailTab;

function toggleSatCategories(btn){
  const wrap = btn?.nextElementSibling;
  if(!wrap) return;
  const isHidden = wrap.classList.contains("isHidden");
  wrap.classList.toggle("isHidden", !isHidden);
  btn.textContent = isHidden ? "カテゴリ別を隠す" : "カテゴリ別を表示";
}
window.toggleSatCategories = toggleSatCategories;

function copyResult(){
  const txt = $("modalResultText");
  const str = txt ? txt.textContent : "";
  navigator.clipboard?.writeText(str);
  toast("コピーしました");
}
window.copyResult = copyResult;

function syncScoreMonthDefault(){
  const el = $("scoreMonth");
  if(el && !el.value) el.value = ym(new Date());
}

function refreshSavingLabel(){
  const m = $("scoreMonth")?.value;
  if(!m) return;
  const saved = getSavingForMonth(m);
  const label = $("savingInvestLabel");
  if(!label) return;
  if(!saved){
    label.textContent = "—";
    return;
  }
  const total = Number(saved.saving||0) + Number(saved.invest||0);
  label.textContent = `${Math.round(total).toLocaleString("ja-JP")}円`;
  $("savingYen") && ($("savingYen").value = String(total));
  $("investYen") && ($("investYen").value = String(saved.invest||0));
}

function openSavingModal(){
  const m = $("scoreMonth")?.value || ym(new Date());
  const saved = getSavingForMonth(m);
  $("savingInput") && ($("savingInput").value = saved ? String(saved.saving||0) : "");
  $("investInput") && ($("investInput").value = saved ? String(saved.invest||0) : "");
  openModal("savingModal");
}
window.openSavingModal = openSavingModal;

function saveSavingModal(){
  const m = $("scoreMonth")?.value || ym(new Date());
  const savingRaw = ($("savingInput")?.value || "").trim();
  const investRaw = ($("investInput")?.value || "").trim();
  if(!savingRaw && !investRaw){
    toast("貯蓄か投資の金額を入力してね");
    return;
  }
  const saving = Number(savingRaw || 0);
  const invest = Number(investRaw || 0);
  setSavingForMonth(m, saving, invest);
  syncSafely(()=> syncMonthlySettingsToSupabase(m));
  refreshSavingLabel();
  closeModal("savingModal");
  if(PENDING_MONTHLY){
    PENDING_MONTHLY = false;
    showMonthlyScore();
  }
}
window.saveSavingModal = saveSavingModal;

function showMonthlyScore(){
  const m = $("scoreMonth")?.value || ym(new Date());
  if(!isPremiumUser() && !canViewMonthlySummaryOnFree(m)){
    openPremiumModal({
      title: `${m} のマンスリーサマリー`,
      message: "過去のマンスリーサマリー詳細はプレミアムで解放されます。"
    });
    return;
  }
  markMonthlyReview(m);
  const result = buildMonthlyResult();
  if(result.missingSaving){
    PENDING_MONTHLY = true;
    openSavingModal();
    return;
  }
  const view = $("modalResultView");
  const txt = $("modalResultText");
  if(view) view.innerHTML = result.html;
  if(txt) txt.textContent = result.text;
  if(view) animateDonuts(view);
  bindScatterTooltips();
  bindScatterLegendToggles();
  openModal("resultModal");
}
window.showMonthlyScore = showMonthlyScore;

function buildMonthlyResult(){
  const m = $("scoreMonth").value;
  const saved = getSavingForMonth(m);
  const incomeInputRaw = String($("incomeYen")?.value ?? "").trim();
  const incomeInputVal = Number(incomeInputRaw || 0);
  const missing = getMonthlyMissingFields();
  if(!saved || missing.length){
    const incomeStored = getIncomeForMonth(m);
    const income = incomeInputRaw !== ""
      ? incomeInputVal
      : ((incomeStored != null) ? Number(incomeStored||0) : 0);
    const fixed = {
      housingYen: Number($("housingYen").value||0),
      utilityYen: Number($("utilityYen").value||0),
      netYen: Number($("netYen").value||0),
      subYen: Number($("subYen").value||0),
      mortgagePrincipalYen: Number($("mortgagePrincipalYen")?.value||0),
    };
    const tx = loadTx().filter(t=>t.date && t.date.startsWith(m));
    const varSpend = tx.reduce((a,b)=>a+Number(b.amount||0),0);
    const fixedSum = [fixed.housingYen, fixed.utilityYen, fixed.netYen, fixed.subYen]
      .reduce((a,b)=>a+Number(b||0),0);
    const prof = getProfile();
    const valueTop3 = getValueTop3FromProfile(prof);
    const subjective = calcSubjectiveMetrics(tx);
    const valueAlign = calcValueAlignmentMetrics(tx, valueTop3);
    const regret = calcRegretMetrics(tx);
    const disposableIncome = income > 0 ? (income - fixedSum) : null;
    const happiness = calcHappinessEfficiency(tx, disposableIncome);
    const satisfactionScore = calcWeightedScore([
      { score: subjective.score, weight: 3 },
      { score: valueAlign.score, weight: 2 },
      { score: regret.score, weight: 3 },
      { score: happiness.score, weight: 2 },
    ]);
    const daysWithEntry = new Set(tx.map(t=>t.date)).size;
    const daysInMonth = getDaysInMonth(m) || 0;
    const saving = saved ? (Number(saved.saving||0) + Number(saved.invest||0)) : null;
    const publicRates = calcPublicRates(tx, fixed, income);
    const extraPublicRates = calcExtendedPublicRates(tx, fixed);
    const targetBudget = buildTargetBudget(prof);
    const mortgagePrincipal = Number(fixed.mortgagePrincipalYen || 0);
    const surplusBase = saving + ((prof.housingType === "mortgage") ? mortgagePrincipal : 0);
    const surplusRateActual = income>0 ? (surplusBase / income) : null;
    const surplusRateTarget = calcSurplusTargetRate(prof, income);
    const foodRateActual = publicRates.userRates.FOOD;
    const housingRateActual = income>0 ? (fixed.housingYen / income) : null;
    const housingRateTarget = prof.regionType === "metro" ? 0.30
      : prof.regionType === "local" ? 0.25
      : BENCH_PUBLIC_2024.housingMedian;
    const consumptionRateActual = income>0 ? ((fixedSum + varSpend) / income) : null;
    const consumptionRateTarget = targetBudget ? (1 - targetBudget.target.surplusRate) : null;
    const benchmarkItems = [
      { key:"surplus", you:surplusRateActual, target:surplusRateTarget, mode:"higher", weight:3 },
      { key:"food", you:foodRateActual, target:targetBudget?.target.foodRate, mode:"close", weight:3 },
      { key:"housing", you:housingRateActual, target:housingRateTarget, mode:"lower", weight:3 },
      { key:"consumption", you:consumptionRateActual, target:consumptionRateTarget, mode:"lower", weight:1 },
      { key:"leisure", you:extraPublicRates.userRates.leisure, target:extraPublicRates.benchRates.leisure, mode:"close", weight:1 },
      { key:"transComm", you:extraPublicRates.userRates.transComm, target:extraPublicRates.benchRates.transComm, mode:"close", weight:1 },
      { key:"utilities", you:extraPublicRates.userRates.utilities, target:extraPublicRates.benchRates.utilities, mode:"close", weight:1 },
      { key:"daily", you:extraPublicRates.userRates.daily, target:extraPublicRates.benchRates.daily, mode:"close", weight:1 },
      { key:"medical", you:extraPublicRates.userRates.medical, target:extraPublicRates.benchRates.medical, mode:"close", weight:1 },
      { key:"education", you:extraPublicRates.userRates.education, target:extraPublicRates.benchRates.education, mode:"close", weight:1 },
    ];
    const benchmarkScores = benchmarkItems.map(item=> ({
      score: calcBenchScore(item.you, item.target, item.mode),
      weight: item.weight
    }));
    const stabilityScore = calcWeightedScore(benchmarkScores);
    const provisionalAvg = clamp(Math.round((satisfactionScore + stabilityScore) / 2), 0, 100);
    const inputRate = daysInMonth > 0 ? (daysWithEntry / daysInMonth) : 0;
    const provisionalXP = Math.max(10, Math.round(provisionalAvg * inputRate));
    addMonthlyProvisionalXP(m, provisionalXP);
    return {
      missingSaving: !saved,
      html: buildMonthlyMissingHtml(missing),
      text: ""
    };
  }
  const incomeStored = getIncomeForMonth(m);
  const income = incomeInputRaw !== ""
    ? incomeInputVal
    : ((incomeStored != null) ? Number(incomeStored||0) : 0);
  const saving = Number(saved.saving||0) + Number(saved.invest||0);

  const fixed = {
    housingYen: Number($("housingYen").value||0),
    utilityYen: Number($("utilityYen").value||0),
    netYen: Number($("netYen").value||0),
    subYen: Number($("subYen").value||0),
    mortgagePrincipalYen: Number($("mortgagePrincipalYen")?.value||0),
  };

  const fixedAll = loadJSON(LS_FIXED, {});
  fixedAll[m] = fixed;
  saveJSON(LS_FIXED, fixedAll);

  const tx = loadTx().filter(t=>t.date && t.date.startsWith(m));
  const varSpend = tx.reduce((a,b)=>a+Number(b.amount||0),0);
  const fixedSum = [fixed.housingYen, fixed.utilityYen, fixed.netYen, fixed.subYen]
    .reduce((a,b)=>a+Number(b||0),0);

  const prof = getProfile();
  const valueTop3 = getValueTop3FromProfile(prof);
  const subjective = calcSubjectiveMetrics(tx);
  const subjectiveScore = subjective.score;
  const coveragePct = tx.length ? Math.round(subjective.coverage * 100) : 0;
  const regret = calcRegretMetrics(tx);
  const regretRate = regret.rate;
  const regretScore = regret.score;
  const valueAlign = calcValueAlignmentMetrics(tx, valueTop3);
  const valueAlignScore = valueAlign.score;
  const disposableIncome = income > 0 ? (income - fixedSum) : null;
  const happiness = calcHappinessEfficiency(tx, disposableIncome);
  const happinessScore = happiness.score;
  const categoryScores = calcCategorySatisfactionScores(tx);

  const savingRate = income>0 ? (saving/income) : null;
  const fixedRate = income>0 ? (fixedSum/income) : null;
  const varRate = income>0 ? (varSpend/income) : null;

  const rr = regretRate==null ? "—" : `${Math.round(regretRate*100)}%`;
  const valueRatioText = valueAlign.ratio==null ? "—" : `${Math.round(valueAlign.ratio*100)}%`;
  const valueTop3Text = valueTop3.length ? valueTop3.join(" / ") : "未設定";
  const valueTop3Html = valueTop3.length ? valueTop3.map(v=>escapeHtml(v)).join(" / ") : "未設定";
  const happinessRateText = happiness.rate==null ? "—" : `${Math.round(happiness.rate*100)}%`;
  const disposableIncomeText = Number.isFinite(disposableIncome) ? `${Math.round(disposableIncome).toLocaleString("ja-JP")}円` : "—";
  const sr = savingRate==null ? "—" : `${Math.round(savingRate*100)}%`;
  const fr = fixedRate==null ? "—" : `${Math.round(fixedRate*100)}%`;
  const vr = varRate==null ? "—" : `${Math.round(varRate*100)}%`;

  const subjectiveShow  = subjectiveScore==null ? 0 : subjectiveScore;
  const subjectiveLabel = subjectiveScore==null ? "対象なし" : `${subjectiveShow}/100`;
  const subjectiveAvgText = subjective.avgSat==null ? "—" : `${subjective.avgSat.toFixed(2)}/5`;
  const totalSpend = fixedSum + varSpend;
  const spendControl = income > 0 ? clamp(Math.round((1 - (totalSpend / income)) * 100), 0, 100) : null;

  const publicRates = calcPublicRates(tx, fixed, income);
  const extraPublicRates = calcExtendedPublicRates(tx, fixed);

  const targetBudget = buildTargetBudget(prof);
  const mortgagePrincipal = Number(fixed.mortgagePrincipalYen || 0);
  const surplusBase = saving + ((prof.housingType === "mortgage") ? mortgagePrincipal : 0);
  const surplusRateActual = income>0 ? (surplusBase / income) : null;
  const foodRateActual = publicRates.userRates.FOOD;
  const housingRateActual = income>0 ? (fixed.housingYen / income) : null;
  const housingRateTarget = prof.regionType === "metro" ? 0.30
    : prof.regionType === "local" ? 0.25
    : BENCH_PUBLIC_2024.housingMedian;
  const consumptionRateActual = income>0 ? ((fixedSum + varSpend) / income) : null;
  const consumptionRateTarget = targetBudget ? (1 - targetBudget.target.surplusRate) : null;
  const surplusRateTarget = calcSurplusTargetRate(prof, income);
  const benchmarkItems = [
    { key:"surplus", label:"黒字率（貯蓄余力）", you:surplusRateActual, target:surplusRateTarget, mode:"higher", weight:3, kind:"saving", source:"custom" },
    { key:"food", label:"食費率（エンゲル係数）", you:foodRateActual, target:targetBudget?.target.foodRate, mode:"close", weight:3, kind:"cost", source:"base" },
    { key:"housing", label:"住居費率", you:housingRateActual, target:housingRateTarget, mode:"lower", weight:3, kind:"cost", source:"base" },
    { key:"consumption", label:"家計全体の消費支出率", you:consumptionRateActual, target:consumptionRateTarget, mode:"lower", weight:1, kind:"cost", source:"custom" },
    { key:"leisure", label:"教養娯楽費率（趣味・レジャー）", you:extraPublicRates.userRates.leisure, target:extraPublicRates.benchRates.leisure, mode:"close", weight:1, kind:"cost", source:"public" },
    { key:"transComm", label:"交通・通信費率", you:extraPublicRates.userRates.transComm, target:extraPublicRates.benchRates.transComm, mode:"close", weight:1, kind:"cost", source:"public" },
    { key:"utilities", label:"光熱費率", you:extraPublicRates.userRates.utilities, target:extraPublicRates.benchRates.utilities, mode:"close", weight:1, kind:"cost", source:"public" },
    { key:"daily", label:"日用品・雑費率", you:extraPublicRates.userRates.daily, target:extraPublicRates.benchRates.daily, mode:"close", weight:1, kind:"cost", source:"custom" },
    { key:"medical", label:"医療・保険率", you:extraPublicRates.userRates.medical, target:extraPublicRates.benchRates.medical, mode:"close", weight:1, kind:"cost", source:"custom" },
    { key:"education", label:"教育費率", you:extraPublicRates.userRates.education, target:extraPublicRates.benchRates.education, mode:"close", weight:1, kind:"cost", source:"custom" },
  ];

  const benchmarkScores = benchmarkItems.map(item=> ({
    ...item,
    score: calcBenchScore(item.you, item.target, item.mode)
  }));
  const stabilityScore = calcWeightedScore(benchmarkScores);

  const renderBenchComparisonCard = (item)=>{
    const youText = fmtPct(item.you);
    const benchText = fmtPct(item.target);
      const diffPt = (Number.isFinite(item.you) && Number.isFinite(item.target))
        ? Math.round((item.you - item.target) * 100)
        : null;
      const diffText = Number.isFinite(diffPt)
        ? `${diffPt > 0 ? "+" : ""}${diffPt}pt`
        : "—";
      const positionText = !Number.isFinite(diffPt)
        ? "比較データ不足"
        : Math.abs(diffPt) <= 2
          ? "目安とほぼ同水準"
          : diffPt > 0
            ? `目安より高め（${diffText}）`
            : `目安より低め（${diffText}）`;
      const statusClass = item.score >= 80 ? "is-blue" : item.score >= 60 ? "is-yellow" : "is-red";
      const statusLabel = item.score >= 80 ? "目安内" : item.score >= 60 ? "注意" : "要改善";
      const sourceLabel = item.source === "public"
        ? "公的指標"
        : item.source === "base"
          ? "公的ベース"
          : "独自指標";
      return `
        <div class="benchCard ${statusClass}">
          <div class="benchTop">
            <div class="benchTitle">${item.label}</div>
            <div class="benchBadges">
              <span class="benchSource ${
                item.source === "public" ? "public" : (item.source === "base" ? "base" : "custom")
              }">${sourceLabel}</span>
              <span class="benchZone ${item.score >= 80 ? "good" : item.score >= 60 ? "mid" : "low"}">${statusLabel}</span>
            </div>
          </div>
          <div class="benchNumbers">
            <span>あなた <strong>${youText}</strong></span>
            <span>目安 <strong>${benchText}</strong></span>
          </div>
          ${renderBenchCompareBar(item.you, item.target)}
          <div class="benchPositionText">${positionText}</div>
        </div>
      `;
  };
  const benchmarkTop3Html = benchmarkScores
    .slice()
    .sort((a,b)=> (Number(b.weight || 0) - Number(a.weight || 0)))
    .slice(0,3)
    .map(renderBenchComparisonCard)
    .join("");
  const benchmarkOthersHtml = benchmarkScores
    .slice()
    .sort((a,b)=> (Number(b.weight || 0) - Number(a.weight || 0)))
    .slice(3)
    .map(renderBenchComparisonCard)
    .join("");
  const comparableScores = benchmarkScores.filter(item=> Number.isFinite(item.score));
  const countBlue = comparableScores.filter(item=> item.score >= 80).length;
  const countYellow = comparableScores.filter(item=> item.score >= 60 && item.score < 80).length;
  const countRed = comparableScores.filter(item=> item.score < 60).length;
  const stabilityPositionSummary = comparableScores.length
    ? `公的指標と比較できる ${comparableScores.length}項目中、目安内 ${countBlue} / 注意 ${countYellow} / 要改善 ${countRed}`
    : "比較できるデータが増えると、現在地の精度が上がります。";
  const benchmarkIntroHtml = targetBudget ? `
    <div class="small muted" style="margin-top:6px; margin-bottom:10px;">
      基準：${targetBudget.ageBandLabel} / 世帯${targetBudget.householdSize}人 / 年収${fmtYen(targetBudget.annualIncomeGross)}円（手取り換算）
    </div>
    <div class="small muted" style="margin-top:-4px; margin-bottom:10px;">
      ※ 公的指標 / 公的ベース / 独自指標 をラベルで区別しています
    </div>
  ` : `
    <div class="small muted" style="margin-top:6px;">
      年齢・世帯人数・年収の入力で表示されます。
    </div>
  `;

  const satisfactionScore = calcWeightedScore([
    { score: subjectiveScore, weight: 3 },
    { score: valueAlignScore, weight: 2 },
    { score: regretScore, weight: 3 },
    { score: happinessScore, weight: 2 },
  ]);
  const monthlyAvgScore = clamp(Math.round((satisfactionScore + stabilityScore) / 2), 0, 100);
  saveMonthlyAverageScore(m, monthlyAvgScore);
  const totalXP = addMonthlyXP(m, monthlyAvgScore);
  const monthlyState = getScoreState(monthlyAvgScore);
  const monthlyStateLabel = getStateLabel(monthlyState);

  const summaryMonthly = buildSummaryTextMonthly({ satisfactionScore, stabilityScore });

  const monthlyCharacter = buildCharacterSnapshot(m);
  const monthlyMood = monthlyCharacter.tier === "めっちゃ良い" ? "🤩"
    : monthlyCharacter.tier === "良い" ? "😄"
    : monthlyCharacter.tier === "悪い" ? "😟"
    : monthlyCharacter.tier === "めっちゃ悪い" ? "🥶"
    : "🙂";

  const html = `
    <div class="resultWrap monthlyResult">
        <div class="summaryCard animIn a1">
          <div class="summaryTitle">マンスリーサマリー：${escapeHtml(m)}</div>
          <div class="summaryLead">${escapeHtml(summaryMonthly)}</div>
          <div class="monthlySummaryCharacter">
            <div class="monthlySummaryCharacterAvatar">${homeAvatarHTML(monthlyCharacter.category, monthlyCharacter.tier, monthlyMood)}</div>
            <div class="monthlySummaryCharacterMeta">
              <div class="monthlySummaryCharacterName">${escapeHtml(monthlyCharacter.name)}</div>
              <div class="monthlySummaryCharacterSub">${escapeHtml(monthlyCharacter.tier)}</div>
              <div class="monthlySummaryCharacterNote">この月のお金の使い方の傾向から判定しています</div>
            </div>
          </div>
          <div class="monthlyAxisTabs" role="tablist" aria-label="マンスリーサマリー表示切り替え">
            <button class="monthlyAxisBtn active" data-main="sat" onclick="switchMonthlyMainTab('sat')" role="tab" aria-controls="monthlyAxisPanel-sat" aria-selected="true">家計納得度スコア</button>
            <button class="monthlyAxisBtn" data-main="stable" onclick="switchMonthlyMainTab('stable')" role="tab" aria-controls="monthlyAxisPanel-stable" aria-selected="false">家計安定度スコア</button>
            <button class="monthlyAxisBtn" data-main="map" onclick="switchMonthlyMainTab('map')" role="tab" aria-controls="monthlyDetail-map" aria-selected="false">2軸分布図</button>
            <button class="monthlyAxisBtn is-soon" data-main="compare" onclick="switchMonthlyMainTab('compare')" role="tab" aria-controls="monthlyDetail-compare" aria-selected="false">比較（準備中）</button>
          </div>
        </div>
      <div class="monthlyAxisPane animIn a2" id="monthlyAxisPanel-sat" data-monthly-axis="sat" role="tabpanel" aria-hidden="false">
        <div class="axisCard tone-sat ${getScoreTone(satisfactionScore)} score--${getScoreState(satisfactionScore)}">
          <div class="axisLabel">家計納得度スコア</div>
          <div class="axisSub">心理・行動</div>
          ${donutHTML(satisfactionScore, { size:"xl", stateColor:getScoreToneColor(satisfactionScore, "sat") })}
          <div class="small muted" style="line-height:1.6;">
            家計納得度スコアは、<br>
            お金の使い方に対する納得感や価値観との一致、<br>
            後悔の少なさ、幸福の実感をまとめて見える化した指標です。
          </div>
        </div>
        <div class="sectionCard tone-sat">
          <div class="sectionHead">
            <div><div class="sectionName">家計納得度スコア 内訳</div><div class="sectionHint">心理・行動の内訳</div></div>
          <div class="sectionScore">${satisfactionScore}/100</div>
        </div>
          <div>
            <div class="metricBlock ${getScoreTone(subjectiveScore)}">
              <div class="metricLabel">${emojiHTML("😊","mini")} 主観納得度スコア</div>
              <div class="small muted">使ったお金に気持ちが前向きかを見る</div>
              <div class="small" style="margin-bottom:4px;">${subjectiveLabel}</div>
              <div class="small muted" style="margin-bottom:6px;">平均 ${subjectiveAvgText}</div>
              <div class="miniBar"><div style="--w:${subjectiveShow}%;"></div></div>
              <div class="small muted" style="margin-top:10px;">カテゴリ別の主観納得度</div>
              <button class="ghost toggleBtn" type="button" onclick="toggleSatCategories(this)">カテゴリ別を表示</button>
              <div class="satCategoryWrap isHidden">
                ${categoryScores.map(item=>{
                  const scoreText = item.score == null ? "—" : `${item.score}/100`;
                  const barWidth = item.score == null ? 0 : item.score;
                  const toneClass = getScoreTone(item.score);
                  const label = withEmoji(item.category, CATEGORY_EMOJI[item.category]);
                  return `
                    <div class="metricBlock ${toneClass}" style="margin-top:8px;">
                      <div class="metricLabel">${label}</div>
                      <div class="small" style="margin-bottom:6px;">${scoreText}</div>
                      <div class="miniBar"><div style="--w:${barWidth}%;"></div></div>
                    </div>
                  `;
                }).join("")}
              </div>
            </div>
            <div class="metricBlock ${getScoreTone(valueAlignScore)}" style="margin-top:8px;">
              <div class="metricLabel">${emojiHTML("🎯","mini")} 価値観整合スコア</div>
              <div class="small muted">大切にしたいことへお金を回せたか</div>
              <div class="small" style="margin-bottom:4px;">${valueAlignScore==null?"—":`${valueAlignScore}/100`}</div>
              <div class="small muted" style="margin-bottom:6px;">配分 ${valueRatioText} / TOP3 ${valueTop3Html}</div>
              <div class="miniBar"><div style="--w:${valueAlignScore==null?0:valueAlignScore}%;"></div></div>
            </div>
            <div class="metricBlock ${getScoreTone(regretScore)}" style="margin-top:8px;">
              <div class="metricLabel">${emojiHTML("🌀","mini")} 後悔率スコア</div>
              <div class="small muted">後悔の少ない支出ができているか</div>
              <div class="small" style="margin-bottom:4px;">${regretScore==null?"—":`${regretScore}/100`}</div>
              <div class="small muted" style="margin-bottom:6px;">後悔率 ${rr}</div>
              <div class="miniBar"><div style="--w:${regretScore==null?0:regretScore}%;"></div></div>
            </div>
            <div class="metricBlock ${getScoreTone(happinessScore)}" style="margin-top:8px;">
              <div class="metricLabel">${emojiHTML("🌈","mini")} 幸福効率</div>
              <div class="small muted">使ったお金が幸福につながっているか</div>
              <div class="small" style="margin-bottom:4px;">${happinessScore==null?"—":`${happinessScore}/100`}</div>
              <div class="small muted" style="margin-bottom:6px;">効率 ${happinessRateText} / 可処分所得 ${disposableIncomeText}</div>
              <div class="miniBar"><div style="--w:${happinessScore==null?0:happinessScore}%;"></div></div>
            </div>
          </div>
        </div>
      </div>

      <div class="monthlyAxisPane animIn a2" id="monthlyAxisPanel-stable" data-monthly-axis="stable" role="tabpanel" aria-hidden="true" style="display:none;">
        <div class="axisCard tone-stable axis-stable ${getScoreTone(stabilityScore)} score--${getScoreState(stabilityScore)}">
          <div class="axisLabel">家計安定度スコア</div>
          <div class="axisSub">バランス・比較</div>
          ${donutHTML(stabilityScore, { size:"xl", stateColor:getScoreToneColor(stabilityScore, "stable") })}
          <div class="small muted" style="line-height:1.6;">
            家計の土台がどれだけ安定しているかを、<br>
            収支のバランスや貯蓄の状態からまとめて見える化した指標です。
          </div>
        </div>
        <div class="sectionCard tone-stable">
          <div class="sectionHead">
            <div><div class="sectionName">家計安定度スコア 内訳</div><div class="sectionHint">バランス・比較の内訳</div></div>
          <div class="sectionScore">${stabilityScore}/100</div>
        </div>
          <div>
            <div class="benchPositionSummary">${stabilityPositionSummary}</div>
            <div class="benchLegend">
              <span class="benchLegendPill blue">青: 目安内</span>
              <span class="benchLegendPill yellow">黄: 注意</span>
              <span class="benchLegendPill red">赤: 要改善</span>
            </div>
            ${benchmarkIntroHtml}
            ${targetBudget ? benchmarkTop3Html : ""}
            ${targetBudget ? `<details class="benchCard benchMoreWrap" style="margin-top:10px;"><summary><div class="benchTop"><div class="benchTitle">その他の指標</div></div></summary><div class="benchDetail">${benchmarkOthersHtml}</div></details>` : ""}
          </div>
        </div>
      </div>

      <div class="monthlyDetailPane animIn a3" id="monthlyDetail-map" data-detail="map" role="tabpanel" aria-hidden="true" style="display:none;">
        ${renderHappinessScatterContent({
          youX: stabilityScore,
          youY: satisfactionScore,
          avgX: APP_AVG_PLACEHOLDER.monthly.spendControl,
          avgY: APP_AVG_PLACEHOLDER.monthly.satisfactionEfficiency
          ,xMid:70
          ,yMid:70
          ,guideLineText:"安定した家計と納得したお金の使い方ができているほど右上に遷移します"
        })}
      </div>

      <div class="monthlyDetailPane animIn a3" id="monthlyDetail-compare" data-detail="compare" role="tabpanel" aria-hidden="true" style="display:none;">
        <div class="sectionCard">
          <div class="sectionHead">
            <div><div class="sectionName">比較機能（準備中）</div><div class="sectionHint">データが溜まり次第、同属性比較を表示</div></div>
            <div class="sectionScore"><span class="benchSource custom">準備中</span></div>
          </div>
          <div class="comparePreviewGrid">
            <div class="comparePreviewCard">
              <div class="comparePreviewLabel">表示予定</div>
              <div class="comparePreviewValue">同属性内の現在地</div>
              <div class="small muted">年齢帯・世帯人数・年収帯などを反映</div>
            </div>
            <div class="comparePreviewCard">
              <div class="comparePreviewLabel">表示予定</div>
              <div class="comparePreviewValue">平均との差と推移</div>
              <div class="small muted">月ごとの変化を比較しやすく表示</div>
            </div>
          </div>
          <div class="small muted" style="margin-top:8px;">今は精度担保のため非表示です。十分なデータが集まり次第リリースします。</div>
        </div>
      </div>

      <div class="monthlyDetailPane animIn a3 breakdownPane">
        <div class="sectionCard">
          <div class="sectionHead">
            <div><div class="sectionName">金額内訳（円）</div><div class="sectionHint">月次の内訳</div></div>
            <div class="sectionScore"></div>
          </div>
          <div class="bar" style="justify-content:space-between;"><div>手取り</div><div style="font-weight:1100;">${income.toLocaleString("ja-JP")}</div></div>
          <div class="bar" style="justify-content:space-between;"><div>貯蓄</div><div style="font-weight:1100;">${saving.toLocaleString("ja-JP")}</div></div>
          <div class="bar" style="justify-content:space-between;"><div>固定費</div><div style="font-weight:1100;">${fixedSum.toLocaleString("ja-JP")}</div></div>
          <div class="bar" style="justify-content:space-between;"><div>変動費</div><div style="font-weight:1100;">${varSpend.toLocaleString("ja-JP")}</div></div>
          <div class="bar" style="justify-content:space-between;"><div>可処分所得</div><div style="font-weight:1100;">${disposableIncomeText}</div></div>
        </div>
      </div>

      <div style="height:10px;"></div>
    </div>
  `;

  const text =
`マンスリーサマリー：${m}

家計納得度スコア：${satisfactionScore}/100
- 主観納得度スコア：${subjectiveScore==null?"—":subjectiveScore+"/100"}
- 価値観整合スコア：${valueAlignScore==null?"—":valueAlignScore+"/100"}
- 後悔率スコア：${regretScore==null?"—":regretScore+"/100"}
- 幸福効率：${happinessScore==null?"—":happinessScore+"/100"}

家計安定度スコア：${stabilityScore}/100
- 黒字率：${fmtPct(surplusRateActual)}
- 食費率：${fmtPct(foodRateActual)}
- 住居費率：${fmtPct(housingRateActual)}
- 消費支出率：${fmtPct(consumptionRateActual)}
- 教養娯楽/交通通信/光熱/日用品/医療/教育はベンチマーク比較

貯蓄率：${sr}
固定費率：${fr}
変動費率：${vr}
後悔率（🙁/😢）：${rr}
価値観TOP3配分：${valueRatioText}
幸福効率：${happinessRateText}
可処分所得：${disposableIncomeText}

手取り：${income}円
貯蓄：${saving}円
固定費：${fixedSum}円
変動費：${varSpend}円
`;
  return { html, text, missingSaving:false };
}

function getMonthlyMissingFields(){
  const fields = [
    { id:"incomeYen", label:"月収（手取り）" },
    { id:"housingYen", label:"住居費" },
    { id:"utilityYen", label:"光熱費" },
    { id:"netYen", label:"通信費" },
    { id:"subYen", label:"サブスク" },
  ];
  const missing = [];
  for(const f of fields){
    const raw = $(f.id)?.value;
    if(raw == null || String(raw).trim() === ""){
      missing.push(f.label);
    }
  }
  return missing;
}

function buildMonthlyMissingHtml(missing){
  return `
    <div class="resultWrap">
      <div class="sectionCard">
        <div class="sectionHead">
          <div><div class="sectionName">入力が必要な項目</div><div class="sectionHint">設定画面の該当項目を入力してください</div></div>
        </div>
        <div class="insightCard">
          ${missing.map(name=> `<div>・${escapeHtml(name)}</div>`).join("")}
        </div>
      </div>
    </div>
  `;
}


/* ===== List ===== */
function renderList(){
  const input = $("viewMonth");
  const target = input && input.value ? input.value : ym(CAL_ANCHOR);
  if(input && !input.value) input.value = target;

  const tx = loadTx()
    .filter(t=>t.date && t.date.startsWith(target))
    .sort((a,b)=> (b.date+a.id).localeCompare(a.date+b.id));

  const area = $("listArea");
  if(!area) return;

  if(tx.length === 0){
    area.innerHTML = `<div class="muted">データがありません</div>`;
    return;
  }

  const rows = tx.map(t=>{
    const sat = (t.satisfaction!=null) ? getSatLabel(t.satisfaction) : "—";
    const valueTag = t.valueTag ? `価値観:${t.valueTag}` : "";
    const memo = t.memo ? t.memo : "—";
    const memoText = (memo === "—" && valueTag) ? valueTag : (valueTag ? `${memo} / ${valueTag}` : memo);
    return `
      <tr>
        <td data-label="日付">${escapeHtml(t.date)}</td>
        <td data-label="カテゴリ">${escapeHtml(t.category)}</td>
        <td class="num" data-label="金額">${Number(t.amount||0).toLocaleString("ja-JP")}</td>
        <td class="center" data-label="納得度">${escapeHtml(sat)}</td>
        <td data-label="メモ">${escapeHtml(memoText)}</td>
        <td class="num" data-label="操作">
          <div class="bar" style="justify-content:flex-end; gap:6px;">
            <button class="ghost" style="padding:8px 10px; font-size:12px;" type="button" data-edit="${t.id}">編集</button>
            <button class="danger" style="padding:8px 10px; font-size:12px;" type="button" data-del="${t.id}">削除</button>
          </div>
        </td>
      </tr>
    `;
  }).join("");

  const cards = tx.map(t=>{
    const sat = (t.satisfaction!=null) ? getSatLabel(t.satisfaction) : "—";
    const valueTag = t.valueTag ? `価値観:${t.valueTag}` : "";
    const memo = t.memo ? t.memo : "—";
    const memoText = (memo === "—" && valueTag) ? valueTag : (valueTag ? `${memo} / ${valueTag}` : memo);
    return `
      <div class="listCard">
        <div class="listTop">${escapeHtml(t.date)}</div>
        <div class="listMain">
          <div class="listCat">${escapeHtml(t.category)}</div>
          <div class="listAmt">${Number(t.amount||0).toLocaleString("ja-JP")}円</div>
          <div class="listSat">納得度 ${escapeHtml(sat)}</div>
        </div>
        <div class="listSub">
          <div class="listMemo">${escapeHtml(memoText)}</div>
        </div>
        <div class="listActions">
          <button class="ghost" style="padding:8px 10px; font-size:12px;" type="button" data-edit="${t.id}">編集</button>
          <button class="danger" style="padding:8px 10px; font-size:12px;" type="button" data-del="${t.id}">削除</button>
        </div>
      </div>
    `;
  }).join("");

  area.innerHTML = `
    <div class="listScrollWrap">
      <div class="tableWrap">
        <table>
          <thead>
            <tr>
              <th>日付</th>
              <th>カテゴリ</th>
              <th style="text-align:right;">金額</th>
              <th style="text-align:center;">納得度</th>
              <th>メモ</th>
              <th style="text-align:right;">操作</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <div class="listCards">${cards}</div>
    </div>
  `;

  area.querySelectorAll("[data-del]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      deleteTx(btn.dataset.del);
      toast("削除しました");
      renderList();
      renderCalendar();
    });
  });
  area.querySelectorAll("[data-edit]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      openEditModal(btn.dataset.edit);
    });
  });
}
window.renderList = renderList;

function clearMonthTx(){
  const input = $("viewMonth");
  const target = input && input.value ? input.value : ym(CAL_ANCHOR);
  if(!confirm(`${target} のデータを削除しますか？（元に戻せません）`)) return;

  const current = loadTx();
  const toDelete = current.filter(t=> t.date && t.date.startsWith(target));
  const next = current.filter(t=> !(t.date && t.date.startsWith(target)));
  saveTx(next);
  toDelete.forEach(t=> syncSafely(()=> syncTransactionToSupabase({ ...t, isDeleted:true })));

  toast("月データを削除しました");
  renderList();
  renderCalendar();
  renderWeeklyInline();
  renderMonthlyGate();
}
window.clearMonthTx = clearMonthTx;

/* ===== Profile ===== */
function normalizeValueCats(cats){
  const arr = Array.isArray(cats) ? cats.slice(0,5) : [];
  while(arr.length < 5) arr.push("");
  return arr.map(v=> String(v || "").trim());
}
function dedupeList(items){
  const out = [];
  for(const item of items){
    if(!item || out.includes(item)) continue;
    out.push(item);
  }
  return out;
}
function getProfile(){
  const prof = loadJSON(LS_PROFILE, DEFAULT_PROFILE);
  const normalizedAnnualIncome = normalizeAnnualIncomeYen(prof.annualIncomeGross);
  const currentAnnualIncome = Number(prof.annualIncomeGross || 0);
  if(normalizedAnnualIncome !== "" && normalizedAnnualIncome !== currentAnnualIncome){
    prof.annualIncomeGross = normalizedAnnualIncome;
    saveJSON(LS_PROFILE, prof);
  }
  return prof;
}
function getValueTop3FromProfile(profile){
  const top = (profile && Array.isArray(profile.valueTop3)) ? profile.valueTop3 : [];
  return dedupeList(top).slice(0,3);
}
function buildValueOptionHTML(cats, withEmpty){
  const base = withEmpty ? `<option value="">未設定</option>` : "";
  return base + cats.map(c=>`<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join("");
}
function buildValueTagOptionHTML(cats, current = ""){
  const normalized = dedupeList((cats || []).map(c=> String(c || "").trim()).filter(Boolean));
  const options = [`<option value="">未設定</option>`];
  options.push(...normalized.map(c=>`<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`));
  options.push(`<option value="__none__">該当なし</option>`);
  options.push(`<option value="__custom__">その他（自由入力）</option>`);
  if(current && !normalized.includes(current)){
    options.push(`<option value="${escapeHtml(current)}">${escapeHtml(current)}（登録済み）</option>`);
  }
  return options.join("");
}
function setValueTagSelection(selectId, customId, value, cats){
  const selectEl = $(selectId);
  const customEl = $(customId);
  const wrapEl = $(`${customId}Wrap`);
  if(!selectEl) return;
  const current = String(value || "").trim();
  selectEl.innerHTML = buildValueTagOptionHTML(cats, current);
  if(!current){
    selectEl.value = "";
    if(customEl) customEl.value = "";
    if(wrapEl) wrapEl.style.display = "none";
    return;
  }
  const values = Array.from(selectEl.options).map(o=> o.value);
  if(values.includes(current)){
    selectEl.value = current;
    if(customEl) customEl.value = "";
    if(wrapEl) wrapEl.style.display = "none";
    return;
  }
  selectEl.value = "__custom__";
  if(customEl) customEl.value = current;
  if(wrapEl) wrapEl.style.display = "";
}
function toggleValueTagCustom(selectId, customId){
  const selectEl = $(selectId);
  const customEl = $(customId);
  const wrapEl = $(`${customId}Wrap`);
  if(!selectEl || !wrapEl) return;
  const showCustom = selectEl.value === "__custom__";
  wrapEl.style.display = showCustom ? "" : "none";
  if(showCustom){
    setTimeout(()=> customEl?.focus(), 0);
  }else if(customEl){
    customEl.value = "";
  }
}
function resolveValueTag(selectId, customId){
  const raw = String($(selectId)?.value || "").trim();
  if(!raw || raw === "__none__") return "";
  if(raw === "__custom__"){
    return String($(customId)?.value || "").trim();
  }
  return raw;
}
function updateValueCategorySelects(cats, currentValueTag = ""){
  const options = buildValueOptionHTML(cats, true);
  ["valueTop1","valueTop2","valueTop3"].forEach(id=>{
    const el = $(id);
    if(!el) return;
    const current = el.value || "";
    el.innerHTML = options;
    if(current && cats.includes(current)) el.value = current;
  });
  setValueTagSelection("entryValueTag", "entryValueTagCustom", currentValueTag || $("entryValueTag")?.value || "", cats);
  setValueTagSelection("editValueTag", "editValueTagCustom", currentValueTag || $("editValueTag")?.value || "", cats);
}
function collectValueCatsFromUI(){
  return [1,2,3,4,5].map(i=> ($(`valueCat${i}`)?.value || "").trim());
}

function loadProfileToUI(){
  const prof = getProfile();
  if($("profileHousehold")){
    const size = normalizeHouseholdSize(prof);
    $("profileHousehold").value = size ? String(size) : (prof.household || "unknown");
  }
  $("profileAge") && ($("profileAge").value = prof.age ? String(prof.age) : "");
  $("profileAnnualIncome") && ($("profileAnnualIncome").value = prof.annualIncomeGross ? String(prof.annualIncomeGross) : "");
  $("profileHousingType") && ($("profileHousingType").value = prof.housingType || "unknown");
  $("profileRegionType") && ($("profileRegionType").value = prof.regionType || "unknown");
  $("profileWorkType") && ($("profileWorkType").value = prof.workType || "unknown");

  const cats = normalizeValueCats(prof.valueCats);
  cats.forEach((val, idx)=>{
    const el = $(`valueCat${idx + 1}`);
    if(el) el.value = val;
  });
  updateValueCategorySelects(cats.filter(Boolean));

  const top3 = getValueTop3FromProfile(prof);
  if($("valueTop1")) $("valueTop1").value = top3[0] || "";
  if($("valueTop2")) $("valueTop2").value = top3[1] || "";
  if($("valueTop3")) $("valueTop3").value = top3[2] || "";

  const p = $("profileMiniPill");
  if(p){
    const size = normalizeHouseholdSize(prof);
    const hh = size ? `${size}人` : "未設定";
    const ageText = prof.age ? `${prof.age}歳` : "未設定";
    p.textContent = `目安：${hh} / ${ageText}`;
  }
}
function saveProfile(){
  const valueCats = normalizeValueCats(collectValueCatsFromUI());
  const rawTop = [
    $("valueTop1")?.value || "",
    $("valueTop2")?.value || "",
    $("valueTop3")?.value || ""
  ];
  const valueTop3 = dedupeList(rawTop).slice(0,3);
  const ageRaw = Number($("profileAge")?.value || 0);
  const annualIncomeGross = Number(normalizeAnnualIncomeYen($("profileAnnualIncome")?.value) || 0);
  const householdSize = Number($("profileHousehold")?.value || 0);
  const prof = {
    household: $("profileHousehold").value,
    householdSize: Number.isFinite(householdSize) && householdSize > 0 ? householdSize : "",
    age: Number.isFinite(ageRaw) && ageRaw > 0 ? ageRaw : "",
    annualIncomeGross: annualIncomeGross > 0 ? annualIncomeGross : "",
    housingType: $("profileHousingType")?.value || "unknown",
    regionType: $("profileRegionType")?.value || "unknown",
    workType: $("profileWorkType")?.value || "unknown",
    valueCats,
    valueTop3
  };
  saveJSON(LS_PROFILE, prof);
  const m = $("settingsMonth")?.value || ym(new Date());
  saveMonthlySettings(m);
  syncSafely(()=> syncProfileToSupabase());
  toast("保存しました");
  loadProfileToUI();
}
window.saveProfile = saveProfile;

/* ===== Export / Import ===== */
function downloadData(){
  const data = {};
  for(let i=0;i<localStorage.length;i++){
    const k = localStorage.key(i);
    data[k] = localStorage.getItem(k);
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], {type:"application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `kakei_data_${new Date().toISOString().slice(0,10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
window.downloadData = downloadData;

function importData(input){
  const file = input.files && input.files[0];
  if(!file) return;
  if(!confirm("現在のデータを上書きして読み込みますか？")) return;

  const reader = new FileReader();
  reader.onload = (e)=>{
    try{
      const json = JSON.parse(e.target.result);
      localStorage.clear();
      for(const k in json) localStorage.setItem(k, json[k]);
      toast("読み込み完了");
      CAL_ANCHOR = monthStart(new Date());
      SELECTED_DATE = ymd(new Date());
      renderCalendar();
      renderList();
      loadProfileToUI();
      closeModal("entryModal");
      closeModal("dayDetailModal");
      closeModal("resultModal");
    }catch(err){
      alert("読み込みエラー: " + err);
    }finally{
      input.value = "";
    }
  };
  reader.readAsText(file);
}
window.importData = importData;

/* ===== Onboarding ===== */
function nextSlide(n){
  [1,2,3,4,5].forEach(i=>{
    const el = $("slide"+i);
    if(el) el.style.display = (i===n) ? "" : "none";
  });
}
window.nextSlide = nextSlide;

const SURVEY_STEPS = [
  { stepId:"surveyStepAge", fieldId:"surveyAge", label:"年齢（世帯主）", type:"input", question:"まずは、あなたの年齢を教えてください", hint:"同年代との比較精度が上がります。" },
  { stepId:"surveyStepHousehold", fieldId:"surveyHousehold", label:"世帯人数", type:"select", question:"いま一緒に暮らしている人数は？", hint:"世帯人数で基準が変わります。" },
  { stepId:"surveyStepWorkType", fieldId:"surveyWorkType", label:"就業形態", type:"select", question:"働き方はどちらに近いですか？", hint:"共働き/片働きで、家計の余裕度の見方が変わります。" },
  { stepId:"surveyStepRegionType", fieldId:"surveyRegionType", label:"居住地域", type:"select", question:"お住まいのエリアはどちらですか？", hint:"地域差をふまえて分析します。" },
  { stepId:"surveyStepHousingType", fieldId:"surveyHousingType", label:"住居形態", type:"select", question:"住まいのタイプを教えてください", hint:"次の住居費の質問を、家賃/ローンに合わせて出し分けます。" },
  { stepId:"surveyStepAnnualIncome", fieldId:"surveyAnnualIncome", label:"昨年の世帯年収（円）", type:"input", question:"昨年の世帯年収（税込・額面）は？", hint:"おおよその金額で大丈夫です（例: 6500000）。" },
  { stepId:"surveyStepIncome", fieldId:"surveyIncome", label:"手取り月収（円）", type:"input", question:"毎月の手取り収入はどのくらいですか？", hint:"だいたいの金額でOKです（例: 305000）。" },
  { stepId:"surveyStepHousing", fieldId:"surveyHousing", label:"住居費", type:"input", question:"毎月の住まい関連の支払いは？", hint:"家賃またはローン返済額を入力してください。" },
  { stepId:"surveyStepUtility", fieldId:"surveyUtility", label:"光熱費", type:"input", question:"光熱費は月いくらくらいですか？", hint:"電気・ガス・水道の合計です。" },
  { stepId:"surveyStepNet", fieldId:"surveyNet", label:"通信費", type:"input", question:"通信費は月いくらくらいですか？", hint:"スマホとネット回線の合計です。" },
  { stepId:"surveyStepSub", fieldId:"surveySub", label:"サブスク", type:"input", question:"サブスクの毎月支払いは？", hint:"把握していない場合は、ここで一度合計してみましょう。" },
  { stepId:"surveyStepValueCats", fieldId:"surveyValueCat1", label:"価値観カテゴリ", type:"valuecats", question:"お金を使うときに、大事にしたいことは何ですか？", hint:"使い道（食費・趣味など）とは別に、何を大切にしたいかを3つまで設定します。" },
  { stepId:"surveyStepMortgagePrincipal", fieldId:"surveyMortgagePrincipal", label:"ローン元本返済", type:"input", mortgageOnly:true, question:"そのうちローン元本返済はいくらですか？", hint:"ローン返済中の方のみ入力します。" },
];
let surveyStepIndex = 0;

function getSurveyStepsForCurrentHousing(){
  const housingType = $("surveyHousingType")?.value || "unknown";
  return SURVEY_STEPS.filter(step=> !step.mortgageOnly || housingType === "mortgage");
}

function updateSurveyProgress(current, total){
  const progress = $("surveyProgress");
  if(progress) progress.textContent = `${current} / ${total}`;
}

function renderSurveyStep(){
  const steps = getSurveyStepsForCurrentHousing();
  if(surveyStepIndex > steps.length - 1) surveyStepIndex = Math.max(steps.length - 1, 0);
  steps.forEach((step, i)=>{
    const el = $(step.stepId);
    if(el) el.style.display = i === surveyStepIndex ? "" : "none";
  });
  SURVEY_STEPS.forEach((step)=>{
    if(steps.some(x=>x.stepId === step.stepId)) return;
    const el = $(step.stepId);
    if(el) el.style.display = "none";
  });

  const prevBtn = $("surveyPrevBtn");
  const nextBtn = $("surveyNextBtn");
  const finishBtn = $("surveyFinishBtn");
  const titleEl = $("surveyQuestionTitle");
  const hintEl = $("surveyQuestionHint");
  const atFirst = surveyStepIndex === 0;
  const atLast = surveyStepIndex === steps.length - 1;
  const step = steps[surveyStepIndex];
  if(prevBtn) prevBtn.style.visibility = atFirst ? "hidden" : "visible";
  if(nextBtn) nextBtn.style.display = atLast ? "none" : "";
  if(finishBtn) finishBtn.style.display = atLast ? "" : "none";
  if(titleEl) titleEl.textContent = step?.question || "あなたのことを教えてください";
  if(hintEl) hintEl.textContent = step?.hint || "答えやすいものからサクッと進めましょう。";
  updateSurveyProgress(steps.length ? surveyStepIndex + 1 : 0, steps.length);
  focusCurrentSurveyField();
}

function getCurrentSurveyStep(){
  const steps = getSurveyStepsForCurrentHousing();
  return steps[surveyStepIndex] || null;
}

function validateSurveyStep(step){
  if(!step) return true;
  if(step.type === "valuecats"){
    const cats = collectSurveyValueCats();
    if(!cats.length){
      alert("価値観カテゴリを1つ以上入力してください");
      return false;
    }
    return true;
  }
  const el = $(step.fieldId);
  if(!el){
    alert(`${step.label}の入力欄が見つかりません`);
    return false;
  }
  if(step.type === "select"){
    if(!el.value || el.value === "unknown"){
      alert(`${step.label}を選択してください`);
      return false;
    }
    return true;
  }
  if(String(el.value ?? "").trim() === ""){
    alert(`${step.label}を入力してください`);
    return false;
  }
  return true;
}

function nextSurveyStep(){
  const step = getCurrentSurveyStep();
  if(!validateSurveyStep(step)) return;
  const steps = getSurveyStepsForCurrentHousing();
  if(surveyStepIndex < steps.length - 1){
    surveyStepIndex += 1;
    renderSurveyStep();
  }
}

function prevSurveyStep(){
  if(surveyStepIndex > 0){
    surveyStepIndex -= 1;
    renderSurveyStep();
  }
}

function resetSurveyWizard(){
  surveyStepIndex = 0;
  renderSurveyStep();
}

function collectSurveyValueCats(){
  return dedupeList([
    $("surveyValueCat1")?.value || "",
    $("surveyValueCat2")?.value || "",
    $("surveyValueCat3")?.value || "",
  ].map(v=> String(v || "").trim()).filter(Boolean)).slice(0,3);
}

function collectValueCategoryInputIds(mode){
  if(mode === "survey") return ["surveyValueCat1","surveyValueCat2","surveyValueCat3"];
  return ["valueCat1","valueCat2","valueCat3","valueCat4","valueCat5"];
}

function fillFirstEmptyValueCategory(mode, text){
  const ids = collectValueCategoryInputIds(mode);
  for(const id of ids){
    const el = $(id);
    if(!el) continue;
    if(!String(el.value || "").trim()){
      el.value = text;
      el.dispatchEvent(new Event("input", { bubbles:true }));
      el.focus();
      return;
    }
  }
  const last = $(ids[ids.length - 1]);
  if(last){
    last.value = text;
    last.dispatchEvent(new Event("input", { bubbles:true }));
    last.focus();
  }
}

function renderValueCategorySuggestions(mode, targetId){
  const wrap = $(targetId);
  if(!wrap) return;
  wrap.innerHTML = VALUE_CATEGORY_SUGGESTIONS
    .map(item=>`<button type="button" class="valueExampleChip" data-value-example="${escapeHtml(item)}">${escapeHtml(item)}</button>`)
    .join("");
  wrap.querySelectorAll("[data-value-example]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      fillFirstEmptyValueCategory(mode, btn.dataset.valueExample || "");
    });
  });
}

function openSurvey(){
  const prof = getProfile();
  if($("surveyHousehold")){
    const size = normalizeHouseholdSize(prof);
    $("surveyHousehold").value = size ? String(size) : (prof.household || "unknown");
  }
  $("surveyAge") && ($("surveyAge").value = prof.age ? String(prof.age) : "");
  $("surveyAnnualIncome") && ($("surveyAnnualIncome").value = prof.annualIncomeGross ? String(prof.annualIncomeGross) : "");
  $("surveyHousingType") && ($("surveyHousingType").value = prof.housingType || "unknown");
  $("surveyRegionType") && ($("surveyRegionType").value = prof.regionType || "unknown");
  $("surveyWorkType") && ($("surveyWorkType").value = prof.workType || "unknown");
  const surveyValueCats = normalizeValueCats(prof.valueCats).filter(Boolean).slice(0,3);
  $("surveyValueCat1") && ($("surveyValueCat1").value = surveyValueCats[0] || "");
  $("surveyValueCat2") && ($("surveyValueCat2").value = surveyValueCats[1] || "");
  $("surveyValueCat3") && ($("surveyValueCat3").value = surveyValueCats[2] || "");
  updateSurveyHousingFields();
  resetSurveyWizard();
  const surveyModal = $("surveyModal");
  const isForced = !localStorage.getItem(LS_ONBOARD);
  if(surveyModal){
    surveyModal.dataset.locked = isForced ? "1" : "0";
    const closeBtn = surveyModal.querySelector(".modalHeader button.ghost");
    if(closeBtn) closeBtn.style.display = isForced ? "none" : "";
  }
  closeModal("onboardingModal");
  openModal("surveyModal");
}
window.openSurvey = openSurvey;

function updateSurveyHousingFields(){
  const housingType = $("surveyHousingType")?.value || "unknown";
  const amountLabel = $("surveyHousingAmountText");
  const housingInput = $("surveyHousing");
  const principalWrap = $("surveyMortgagePrincipalWrap");
  const principalInput = $("surveyMortgagePrincipal");
  if(housingType === "rent"){
    if(amountLabel) amountLabel.textContent = "家賃 (円)";
    if(housingInput) housingInput.placeholder = "例：95000";
  }else if(housingType === "mortgage"){
    if(amountLabel) amountLabel.textContent = "住宅ローン返済額 (円)";
    if(housingInput) housingInput.placeholder = "例：120000";
  }else if(housingType === "owned"){
    if(amountLabel) amountLabel.textContent = "住居費（管理費など）(円)";
    if(housingInput) housingInput.placeholder = "例：20000";
  }else{
    if(amountLabel) amountLabel.textContent = "住居費 (円)";
    if(housingInput) housingInput.placeholder = "家賃またはローン返済額";
  }

  const showPrincipal = housingType === "mortgage";
  if(principalWrap) principalWrap.style.display = showPrincipal ? "" : "none";
  if(!showPrincipal && principalInput) principalInput.value = "";
  renderSurveyStep();
}

function focusCurrentSurveyField(){
  const step = getCurrentSurveyStep();
  const id = step?.fieldId;
  const el = id ? $(id) : null;
  if(!el) return;
  setTimeout(()=>{
    el.focus();
    if(el instanceof HTMLInputElement && (el.type === "number" || el.type === "text")){
      const len = el.value?.length || 0;
      el.setSelectionRange(len, len);
    }
  }, 0);
}

function handleSurveyEnterKey(e){
  if(e.key !== "Enter") return;
  const step = getCurrentSurveyStep();
  if(!step) return;
  const target = e.target;
  if(!(target instanceof HTMLElement)) return;
  if(step.type === "valuecats"){
    const ids = ["surveyValueCat1","surveyValueCat2","surveyValueCat3"];
    const idx = ids.findIndex(id=> $(id) === target);
    if(idx >= 0){
      e.preventDefault();
      const nextId = ids[idx + 1];
      if(nextId && !String($(nextId)?.value || "").trim()){
        $(nextId)?.focus();
        return;
      }
      const steps = getSurveyStepsForCurrentHousing();
      if(surveyStepIndex >= steps.length - 1){
        finishSurvey();
      }else{
        nextSurveyStep();
      }
      return;
    }
  }
  if(step.fieldId && $(step.fieldId) === target){
    e.preventDefault();
    const steps = getSurveyStepsForCurrentHousing();
    if(surveyStepIndex >= steps.length - 1){
      finishSurvey();
    }else{
      nextSurveyStep();
    }
  }
}

function bindSurveyKeyboardFlow(){
  const ids = dedupeList(SURVEY_STEPS.map(s=> s.fieldId).filter(Boolean));
  ids.forEach(id=>{
    const el = $(id);
    if(!el) return;
    el.addEventListener("keydown", handleSurveyEnterKey);
    if(el instanceof HTMLSelectElement){
      el.addEventListener("change", ()=>{
        const step = getCurrentSurveyStep();
        if(step?.fieldId === id && id !== "surveyHousingType"){
          nextSurveyStep();
        }
      });
    }
  });
}

function finishSurvey(){
  const requiredFields = [
    { id:"surveyHousehold", label:"世帯人数", type:"select" },
    { id:"surveyAge", label:"年齢（世帯主）", type:"input" },
    { id:"surveyAnnualIncome", label:"昨年の世帯年収（円）", type:"input" },
    { id:"surveyIncome", label:"手取り月収（円）", type:"input" },
    { id:"surveyUtility", label:"光熱費", type:"input" },
    { id:"surveyNet", label:"通信費", type:"input" },
    { id:"surveySub", label:"サブスク", type:"input" },
    { id:"surveyHousingType", label:"住居形態", type:"select" },
    { id:"surveyRegionType", label:"居住地域", type:"select" },
    { id:"surveyWorkType", label:"就業形態", type:"select" },
  ];
  const housingType = $("surveyHousingType")?.value || "unknown";
  const housingLabel = housingType === "rent"
    ? "家賃"
    : housingType === "mortgage"
      ? "住宅ローン返済額"
      : "住居費";
  requiredFields.push({ id:"surveyHousing", label:housingLabel, type:"input" });
  if(housingType === "mortgage"){
    requiredFields.push({ id:"surveyMortgagePrincipal", label:"ローン元本返済", type:"input" });
  }
  const missing = [];
  requiredFields.forEach(({ id, label, type })=>{
    const el = $(id);
    if(!el){
      missing.push(label);
      return;
    }
    if(type === "select"){
      if(!el.value || el.value === "unknown") missing.push(label);
      return;
    }
    if(String(el.value ?? "").trim() === "") missing.push(label);
  });
  if(missing.length){
    alert(`以下の入力が必要です：\n${missing.join(" / ")}`);
    return;
  }
  if(!collectSurveyValueCats().length){
    alert("価値観カテゴリを1つ以上入力してください");
    return;
  }
  const ageRaw = Number($("surveyAge")?.value || 0);
  const annualIncomeGross = Number(normalizeAnnualIncomeYen($("surveyAnnualIncome")?.value) || 0);
  const householdSize = Number($("surveyHousehold")?.value || 0);
  const valueCats = normalizeValueCats(collectSurveyValueCats());
  const valueTop3 = dedupeList(valueCats.filter(Boolean)).slice(0,3);
  const prof = {
    household: $("surveyHousehold")?.value || "unknown",
    householdSize: Number.isFinite(householdSize) && householdSize > 0 ? householdSize : "",
    age: Number.isFinite(ageRaw) && ageRaw > 0 ? ageRaw : "",
    annualIncomeGross: annualIncomeGross > 0 ? annualIncomeGross : "",
    housingType: $("surveyHousingType")?.value || "unknown",
    regionType: $("surveyRegionType")?.value || "unknown",
    workType: $("surveyWorkType")?.value || "unknown",
    valueCats,
    valueTop3,
  };
  saveJSON(LS_PROFILE, prof);

  const m = ym(new Date());
  const incomeYen = Number($("surveyIncome")?.value || 0);
  if($("surveyIncome")?.value.trim() !== ""){
    setIncomeForMonth(m, Math.round(incomeYen));
  }

  const fixedAll = loadJSON(LS_FIXED, {});
  fixedAll[m] = {
    housingYen: Number($("surveyHousing")?.value || 0),
    utilityYen: Number($("surveyUtility")?.value || 0),
    netYen: Number($("surveyNet")?.value || 0),
    subYen: Number($("surveySub")?.value || 0),
    mortgagePrincipalYen: (prof.housingType === "mortgage")
      ? Number($("surveyMortgagePrincipal")?.value || 0)
      : 0,
  };
  saveJSON(LS_FIXED, fixedAll);
  syncSafely(()=> syncProfileToSupabase());
  syncSafely(()=> syncMonthlySettingsToSupabase(m));

  loadProfileToUI();
  $("settingsMonth") && ($("settingsMonth").value = m);
  $("scoreMonth") && ($("scoreMonth").value = m);
  loadMonthlySettings(m);
  refreshSavingLabel();
  localStorage.setItem(LS_ONBOARD, "1");
  const surveyModal = $("surveyModal");
  if(surveyModal) surveyModal.dataset.locked = "0";
  closeModal("surveyModal");
  closeModal("onboardingModal");
  openHouseholdOnboarding();
}
window.finishSurvey = finishSurvey;

function resetOnboarding(){
  localStorage.removeItem(LS_ONBOARD);
  nextSlide(1);
  openModal("onboardingModal");
}
window.resetOnboarding = resetOnboarding;
function resetToFirstRunLocal(){
  const ok = window.confirm("この端末のログイン状態とローカルデータを初期化します。実行しますか？");
  if(!ok) return;
  [
    LS_TX, LS_FIXED, LS_INCOME, LS_PROFILE, LS_ONBOARD, LS_SAT_SCALE, LS_SAVING,
    LS_REVIEW, LS_MONTHLY_READY, LS_MONTHLY_AVG, LS_TOTAL_XP, LS_XP_MONTHS,
    LS_DAILY_XP, LS_HOME_PREVIEW, LS_HOME_PREVIEW_CATEGORY, LS_PREMIUM, LS_HOME_REACTION,
    LS_REMOTE_USER, LS_AUTH_SESSION, LS_ACTIVE_HOUSEHOLD, LS_ACTIVE_HOUSEHOLD_CODE,
    LS_ACTIVE_HOUSEHOLD_NAME, LS_HOUSEHOLD_VALUE_PROMPTED, LS_PASSWORD_SETUP_REQUIRED, LS_HOUSEHOLD_ONBOARDING_DONE, LS_EVOLUTION
  ].forEach((k)=> localStorage.removeItem(k));
  location.reload();
}
window.resetToFirstRunLocal = resetToFirstRunLocal;

/* ===== Utils ===== */
function escapeHtml(str){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}


/* ===== Init ===== */
async function init(){
  migrateSatisfactionScale();
  buildCatCards();
  $("surveyHousingType")?.addEventListener("change", updateSurveyHousingFields);
  $("surveyNextBtn")?.addEventListener("click", nextSurveyStep);
  $("surveyPrevBtn")?.addEventListener("click", prevSurveyStep);
  bindSurveyKeyboardFlow();
  updateSurveyHousingFields();
  renderValueCategorySuggestions("survey", "surveyValueExampleChips");
  renderValueCategorySuggestions("profile", "profileValueExampleChips");

  $("entryValueTag")?.addEventListener("change", ()=> toggleValueTagCustom("entryValueTag", "entryValueTagCustom"));
  $("editValueTag")?.addEventListener("change", ()=> toggleValueTagCustom("editValueTag", "editValueTagCustom"));

  $("entryPrevDay")?.addEventListener("click", ()=> openEntryModal(addDays(SELECTED_DATE, -1), { keepCategory:true }));
  $("entryNextDay")?.addEventListener("click", ()=> openEntryModal(addDays(SELECTED_DATE, +1), { keepCategory:true }));

  $("entryPrimaryBtn")?.addEventListener("click", handleEntryPrimary);
  $("entryCloseBtn")?.addEventListener("click", closeEntryModal);
  $("tab-input")?.addEventListener("click", ()=> updateScreenHeader("input"));
  $("tab-list")?.addEventListener("click", ()=> updateScreenHeader("list"));
  $("tab-report")?.addEventListener("click", ()=> updateScreenHeader("report"));
  $("tab-profile")?.addEventListener("click", ()=> updateScreenHeader("profile"));
  $("scoreQuickBtn")?.addEventListener("click", ()=> updateScreenHeader("score"));

  ["entryModal","dayDetailModal","resultModal","savingModal","surveyModal","editModal","premiumModal","premiumPlanModal","householdOnboardingModal","householdValueModal","profileAuthGateModal","setPasswordModal","openingModal"].forEach(id=>{
    const ov = $(id);
    if(!ov) return;
    ov.addEventListener("click", (e)=>{
      if(e.target !== ov) return;
      if(id === "surveyModal" && ov.dataset.locked === "1") return;
      if(id === "profileAuthGateModal" && ov.dataset.locked === "1") return;
      if(id === "openingModal" && ov.dataset.locked === "1") return;
      closeModal(id);
    });
  });

  $("editCategory") && ($("editCategory").innerHTML = CATEGORIES.map(c=>`<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join(""));

  if($("viewMonth") && !$("viewMonth").value) $("viewMonth").value = ym(CAL_ANCHOR);
  if($("scoreMonth") && !$("scoreMonth").value) $("scoreMonth").value = ym(new Date());
  if($("settingsMonth") && !$("settingsMonth").value) $("settingsMonth").value = ym(new Date());
  if($("reportMonth") && !$("reportMonth").value) $("reportMonth").value = ym(new Date());

  $("scoreMonth")?.addEventListener("change", ()=>{
    const m = $("scoreMonth")?.value;
    refreshSavingLabel();
    if(m && $("settingsMonth")) $("settingsMonth").value = m;
    if(m) loadMonthlySettings(m);
  });
  $("settingsMonth")?.addEventListener("change", ()=>{
    const m = $("settingsMonth")?.value;
    if(m) loadMonthlySettings(m);
  });
  $("reportMonth")?.addEventListener("change", ()=>{
    renderMonthlyReport();
  });
  $("incomeYen")?.addEventListener("input", ()=>{});
  if($("homePreviewCategory")){
    const current = localStorage.getItem(LS_HOME_PREVIEW_CATEGORY) || "auto";
    $("homePreviewCategory").value = CATEGORIES.includes(current) ? current : "auto";
  }
  syncPremiumModeDevUI();
  const supa = getSupabaseConfig();
  if(supa.url && supa.anonKey){
    saveJSON(LS_SUPABASE, supa);
  }
  if($("supabaseUrl")) $("supabaseUrl").value = supa.url || "";
  if($("supabaseAnonKey")) $("supabaseAnonKey").value = supa.anonKey || "";
  setSupabaseStatus(supa.url && supa.anonKey ? "自動接続設定あり（未テスト）" : "未接続");
  await consumeAuthCallbackIfPresent();
  const auth = loadAuthSession();
  if($("authEmail") && auth?.user?.email) $("authEmail").value = auth.user.email;
  setAuthStatus(auth?.user?.email ? `${auth.user.email} でログイン中` : "未ログイン");
  const inviteCode = getInviteCodeFromUrl();
  if(inviteCode && $("joinHouseholdCode")){
    $("joinHouseholdCode").value = inviteCode;
    const section = $("settingsHouseholdSection");
    if(section) section.open = true;
    setHouseholdStatus(`招待コードを読み込みました: ${inviteCode}`);
  }
  refreshHouseholdState().then(()=>{
    pullHouseholdDataToLocal({ silent:true });
    startHouseholdPulling();
    maybeOpenPasswordSetupModal();
  });
  refreshHouseholdControls();

  loadProfileToUI();
  [1,2,3,4,5].forEach(i=>{
    $(`valueCat${i}`)?.addEventListener("input", ()=>{
      const cats = collectValueCatsFromUI().filter(Boolean);
      updateValueCategorySelects(cats);
    });
  });

  const readyState = loadMonthlyReady();
  const nowMonth = ym(new Date());
  if(readyState.lastSeenMonth && readyState.lastSeenMonth !== nowMonth){
    readyState.ready = readyState.ready || {};
    readyState.ready[readyState.lastSeenMonth] = true;
  }
  readyState.lastSeenMonth = nowMonth;
  saveMonthlyReady(readyState);

  const loggedIn = !!getAuthAccessToken();
  if(loggedIn && localStorage.getItem(LS_PASSWORD_SETUP_REQUIRED) !== "1" && !localStorage.getItem(LS_ONBOARD)){
    nextSlide(1);
    openModal("onboardingModal");
  }else{
    closeModal("onboardingModal");
  }

  renderCalendar();
  renderList();
  renderMonthlyReport();
  refreshSavingLabel();
  renderWeeklyInline();
  renderMonthlyGate();
  loadMonthlySettings($("settingsMonth")?.value || ym(new Date()));
  if(loggedIn){
    switchScreen("score");
    updateScreenHeader("score");
  }else{
    AUTH_GATE_NEXT_SCREEN = "score";
    openOpeningModal();
  }
}

init();
