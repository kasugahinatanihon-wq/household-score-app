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
  const annualIncomeGross = Number(profile.annualIncomeGross || 0);
  if(!householdSize || ageBandId === "unknown" || !Number.isFinite(annualIncomeGross) || annualIncomeGross <= 0){
    return null;
  }
  const ageBand = BENCH_TARGET_2024.ageBands.find(x=>x.id === ageBandId) || BENCH_TARGET_2024.ageBands[0];
  const netRate = findRateByRange(BENCH_TARGET_2024.netRateByIncome, annualIncomeGross);
  const annualNet = annualIncomeGross * 10000 * netRate;
  const monthlyNet = annualNet / 12;

  const engelBySize = getHouseholdEngel(householdSize);
  const engelByIncome = findRateByRange(BENCH_TARGET_2024.engelByIncome, annualIncomeGross);
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
    text = "先取り貯蓄を1万円だけ上乗せする";
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
  btn.style.display = (step === "quality") ? "none" : "";
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

function switchScreen(name){
  const map = { input:"screen-input", list:"screen-list", report:"screen-report", score:"screen-score", profile:"screen-profile" };
  Object.values(map).forEach(id=>{
    const el = $(id);
    if(el) el.classList.toggle("active", id === map[name]);
  });
  ["input","list","report","score","profile"].forEach(t=>{
    const b = $("tab-"+t);
    if(b) b.classList.toggle("active", t===name);
  });
  $("scoreQuickBtn")?.classList.toggle("active", name === "score");

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
    return false;
  }
  if(!(amt > 0)){
    $("entryMsg").textContent = "支出を1円以上で入力してください";
    toast("支出を入力してね");
    return false;
  }

  const sat = $("entrySat").value ? Number($("entrySat").value) : null;
  const valueTag = ($("entryValueTag")?.value || "").trim();
  const memoTop = ($("entryMemoTop").value||"").trim();
  const note = memoTop;

  const id = (crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2);
  const tx = loadTx();
  tx.push({ id, date: dt, category: cat, amount: amt, satisfaction: sat, valueTag: valueTag || null, trigMemo: note, memo: memoTop });
  saveTx(tx);
  localStorage.setItem("last_cat", cat);
  return true;
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
    const sat = ($("entrySat")?.value || "").trim();
    const valueTag = ($("entryValueTag")?.value || "").trim();
    if(!sat || !valueTag){
      toast("納得度と価値観カテゴリを選んでね");
      return;
    }
    showEntryStep("memo");
    return;
  }

  if(saveEntry()) afterEntrySaved();
}

function afterEntrySaved(){
  const beforeXP = getTotalXP();
  const afterXP = addDailyXP(SELECTED_DATE, 2);
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
  const next = loadTx().filter(t=>t.id !== id);
  saveTx(next);
  renderWeeklyInline();
  renderMonthlyGate();
}

function openEditModal(id){
  const tx = loadTx().find(t=>t.id === id);
  if(!tx) return;
  const prof = getProfile();
  updateValueCategorySelects(normalizeValueCats(prof.valueCats).filter(Boolean));
  $("editId") && ($("editId").value = tx.id);
  $("editDate") && ($("editDate").value = tx.date || "");
  $("editCategory") && ($("editCategory").value = tx.category || "");
  $("editAmount") && ($("editAmount").value = tx.amount || "");
  $("editSat") && ($("editSat").value = (tx.satisfaction!=null ? String(tx.satisfaction) : ""));
  $("editValueTag") && ($("editValueTag").value = tx.valueTag || "");
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
  const valueTag = ($("editValueTag")?.value || "").trim();

  list[idx] = {
    ...list[idx],
    date: $("editDate")?.value || list[idx].date,
    category,
    amount,
    satisfaction: satRaw ? Number(satRaw) : null,
    memo,
    valueTag: valueTag || null,
    trigMemo: memo,
  };
  saveTx(list);
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
  if(score >= 80) return { label:"🟢 安心ゾーン", tone:"good" };
  if(score >= 60) return { label:"🟦 安定ゾーン", tone:"mid" };
  return { label:"🟡 見直しゾーン", tone:"low" };
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
      <span class="benchCompareTarget" style="left:${targetPos}%"></span>
      <span class="benchCompareMarker" style="left:${youPos}%"></span>
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

function renderMonthlyReport(){
  const m = $("reportMonth")?.value || ym(new Date());
  const donut = $("reportDonut");
  const legend = $("reportLegend");
  const list = $("reportList");
  const totalEl = $("reportTotal");
  if(!donut || !legend || !list || !totalEl) return;

  const { items, total } = buildMonthlyReportItems(m);
  totalEl.textContent = total > 0 ? `合計 ${Math.round(total).toLocaleString("ja-JP")}円` : "—";

  if(total <= 0){
    donut.style.background = "conic-gradient(#e2e8f0 0 100%)";
    donut.classList.remove("is-anim");
    legend.innerHTML = `<div class="small muted">データがありません</div>`;
    list.innerHTML = `<div class="muted small" style="padding:8px 0;">データがありません</div>`;
    return;
  }

  let start = 0;
  const segments = items.map((item, idx)=>{
    const pct = total > 0 ? (item.amount / total) * 100 : 0;
    const color = REPORT_COLORS[idx % REPORT_COLORS.length];
    const end = start + pct;
    const seg = `${color} ${start.toFixed(2)}% ${end.toFixed(2)}%`;
    start = end;
    return { ...item, pct, color, seg };
  });
  donut.style.background = `conic-gradient(${segments.map(s=>s.seg).join(",")})`;
  donut.classList.remove("is-anim");
  void donut.offsetWidth;
  donut.classList.add("is-anim");

  legend.innerHTML = segments.map(item=>{
    const pctText = `${Math.round(item.pct)}%`;
    const amtText = `${Math.round(item.amount).toLocaleString("ja-JP")}円`;
    return `
      <div class="reportLegendItem">
        <div class="reportLegendKey"><span class="reportLegendDot" style="background:${item.color};"></span>${escapeHtml(item.label)}</div>
        <div>${pctText} / ${amtText}</div>
      </div>
    `;
  }).join("");

  list.innerHTML = segments.map(item=>{
    const pctText = `${Math.round(item.pct)}%`;
    const amtText = `${Math.round(item.amount).toLocaleString("ja-JP")}円`;
    return `
      <div class="reportListRow">
        <div>
          <div style="font-weight:900;">${escapeHtml(item.label)}</div>
          <div class="reportListMeta">${pctText} / ${amtText}</div>
        </div>
        <div class="reportLegendDot" style="background:${item.color}; align-self:center;"></div>
      </div>
    `;
  }).join("");
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
    ? `<div class="weeklyHeroHint">${emojiHTML("📄","mini")} 月次レポートが届いています</div>`
    : "";
  const weeklyMascotCTA = "";
  const weeklyReportCTA = readyMonth
    ? `role="button" aria-label="月次レポートを開く" onclick="showMonthlyScore()"`
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
  const result = buildWeeklyResult();
  wrap.innerHTML = result.html;
  animateDonuts(wrap);
  animateGrowth(wrap);
}
window.renderWeeklyInline = renderWeeklyInline;

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
  const reviewState = loadReviewState();
  const opened = !!(reviewState.monthly && reviewState.monthly[targetMonth]);
  const statusBadge = readyMonth
    ? (opened ? `<span class="statusBadge status-done">受領済み</span>` : `<span class="statusBadge status-wait">受け取り待ち</span>`)
    : `<span class="statusBadge status-soon">準備中</span>`;
  const readyHint = opened
    ? "月次レポートは受領済みです。"
    : "ホームのキャラクターをタップして、貯蓄・投資を入力してから受け取りましょう。";
  const tx = loadTx().filter(t=>t.date && t.date.startsWith(targetMonth));
  const daysInMonth = getDaysInMonth(targetMonth) || 0;
  const daysWithEntry = new Set(tx.map(t=>t.date)).size;
  const pct = daysInMonth > 0 ? Math.round((daysWithEntry / daysInMonth) * 100) : 0;

  if(readyMonth){
    wrap.innerHTML = `
      <div class="sectionCard monthlyGateCard ${opened ? "" : "isReady"}">
        <div class="sectionHead">
          <div><div class="sectionName">月次レポート</div><div class="sectionHint">${escapeHtml(targetMonth)} 分が届いています</div></div>
          <div class="sectionScore">${statusBadge}</div>
        </div>
        <div class="metricBlock" style="margin-top:10px;">
          <div class="metricLabel">今月の記録進捗</div>
          <div class="small" style="margin-bottom:6px;">${daysWithEntry}/${daysInMonth} 日</div>
          <div class="dayProgressGrid">
            ${(()=>{
              const today = new Date();
              const currentMonth = ym(today);
              const cutoff = Number(today.getDate()) - 1;
              const isPastMonth = targetMonth < currentMonth;
              return Array.from({ length: daysInMonth }, (_, i)=>{
                const dayNum = i + 1;
                const isFilled = isPastMonth || (targetMonth === currentMonth && dayNum <= cutoff);
                return `<span class="dayDot ${isFilled ? "isOn" : ""}"></span>`;
              }).join("");
            })()}
          </div>
        </div>
        <div class="small muted" style="margin-top:8px;">${readyHint}</div>
      </div>
    `;
    return;
  }

  wrap.innerHTML = `
    <div class="sectionCard">
      <div class="sectionHead">
        <div><div class="sectionName">月次レポート</div><div class="sectionHint">月が切り替わると届きます</div></div>
        <div class="sectionScore">${statusBadge}</div>
      </div>
      <div class="metricBlock" style="margin-top:10px;">
        <div class="metricLabel">今月の記録進捗</div>
        <div class="small" style="margin-bottom:6px;">${daysWithEntry}/${daysInMonth} 日</div>
        <div class="dayProgressGrid">
          ${(()=>{
            const today = new Date();
            const currentMonth = ym(today);
            const cutoff = Number(today.getDate()) - 1;
            const isPastMonth = targetMonth < currentMonth;
            return Array.from({ length: daysInMonth }, (_, i)=>{
              const dayNum = i + 1;
              const isFilled = isPastMonth || (targetMonth === currentMonth && dayNum <= cutoff);
              return `<span class="dayDot ${isFilled ? "isOn" : ""}"></span>`;
            }).join("");
          })()}
        </div>
      </div>
      <div class="small muted" style="margin-top:8px;">月の入力完了を押すと、キャラクターがレポートを届けます。</div>
    </div>
  `;
}
window.renderMonthlyGate = renderMonthlyGate;

function completeMonthFromCalendar(){
  const monthStr = ym(CAL_ANCHOR);
  if(!confirm(`${monthStr} の入力を完了しますか？`)) return;
  markMonthlyReady(monthStr);
  renderMonthlyGate();
  toast("月次レポートが届きました");
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
  const missing = getMonthlyMissingFields();
  if(!saved || missing.length){
    const incomeStored = getIncomeForMonth(m);
    const income = (incomeStored != null) ? Number(incomeStored||0) : Number($("incomeYen").value||0);
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
    const foodRateActual = publicRates.userRates.FOOD;
    const housingRateActual = income>0 ? (fixed.housingYen / income) : null;
    const housingRateTarget = prof.regionType === "metro" ? 0.30
      : prof.regionType === "local" ? 0.25
      : BENCH_PUBLIC_2024.housingMedian;
    const consumptionRateActual = income>0 ? ((fixedSum + varSpend) / income) : null;
    const consumptionRateTarget = targetBudget ? (1 - targetBudget.target.surplusRate) : null;
    const benchmarkItems = [
      { key:"surplus", you:surplusRateActual, target:targetBudget?.target.surplusRate, mode:"higher", weight:3 },
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
  const income = (incomeStored != null) ? Number(incomeStored||0) : Number($("incomeYen").value||0);
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
  const benchmarkItems = [
    { key:"surplus", label:"黒字率（貯蓄余力）", you:surplusRateActual, target:targetBudget?.target.surplusRate, mode:"higher", weight:3, kind:"saving" },
    { key:"food", label:"食費率（エンゲル係数）", you:foodRateActual, target:targetBudget?.target.foodRate, mode:"close", weight:3, kind:"cost" },
    { key:"housing", label:"住居費率", you:housingRateActual, target:housingRateTarget, mode:"lower", weight:3, kind:"cost" },
    { key:"consumption", label:"家計全体の消費支出率", you:consumptionRateActual, target:consumptionRateTarget, mode:"lower", weight:1, kind:"cost" },
    { key:"leisure", label:"教養娯楽費率（趣味・レジャー）", you:extraPublicRates.userRates.leisure, target:extraPublicRates.benchRates.leisure, mode:"close", weight:1, kind:"cost" },
    { key:"transComm", label:"交通・通信費率", you:extraPublicRates.userRates.transComm, target:extraPublicRates.benchRates.transComm, mode:"close", weight:1, kind:"cost" },
    { key:"utilities", label:"光熱費率", you:extraPublicRates.userRates.utilities, target:extraPublicRates.benchRates.utilities, mode:"close", weight:1, kind:"cost" },
    { key:"daily", label:"日用品・雑費率", you:extraPublicRates.userRates.daily, target:extraPublicRates.benchRates.daily, mode:"close", weight:1, kind:"cost" },
    { key:"medical", label:"医療・保険率", you:extraPublicRates.userRates.medical, target:extraPublicRates.benchRates.medical, mode:"close", weight:1, kind:"cost" },
    { key:"education", label:"教育費率", you:extraPublicRates.userRates.education, target:extraPublicRates.benchRates.education, mode:"close", weight:1, kind:"cost" },
  ];

  const benchmarkScores = benchmarkItems.map(item=> ({
    ...item,
    score: calcBenchScore(item.you, item.target, item.mode)
  }));
  const stabilityScore = calcWeightedScore(benchmarkScores);

  const benchmarkBlocksAll = benchmarkScores.map(item=>{
    const scoreText = item.score == null ? "—" : `${item.score}/100`;
    const zone = benchZone(item.score);
    const comment = benchComment(item.you, item.target);
    const youText = fmtPct(item.you);
    const benchText = fmtPct(item.target);
    const labelNote = item.key === "housing"
      ? "（都市部30% / 地方25%補正）"
      : item.key === "consumption"
      ? "（黒字率目標から逆算）"
      : "";
    return `
      <details class="benchCard">
        <summary>
          <div class="benchTop">
            <div class="benchTitle">${item.label}${labelNote}</div>
            <div class="benchScore">${scoreText}</div>
          </div>
          <div class="benchMeta">
            <span class="benchZone ${zone.tone}">${zone.label}</span>
            <span class="benchComment">${comment}</span>
          </div>
          <div class="miniBar" style="margin-top:8px;"><div style="--w:${item.score == null ? 0 : item.score}%;"></div></div>
        </summary>
        <div class="benchDetail">
          <div class="benchStats">
            <div><span class="benchKey">あなた</span><span class="benchVal">${youText}</span></div>
            <div><span class="benchKey">同属性平均</span><span class="benchVal">${benchText}</span></div>
            <div><span class="benchKey">目安ライン</span><span class="benchVal">${benchText}</span></div>
          </div>
          <div class="benchExplain">${comment}</div>
          ${renderBenchCompareBar(item.you, item.target)}
        </div>
      </details>
    `;
  }).join("");
  const benchmarkIntroHtml = targetBudget ? `
    <div class="small muted" style="margin-top:6px; margin-bottom:10px;">
      基準：${targetBudget.ageBandLabel} / 世帯${targetBudget.householdSize}人 / 年収${targetBudget.annualIncomeGross}万円（手取り換算）
      ・目安手取り月収 ${fmtYen(Math.round(targetBudget.monthlyNetTarget))}円
    </div>
    <div class="small muted" style="margin-bottom:10px;">
      黒字率/食費/光熱/交通通信/教養娯楽は公的指標ベース。日用品・医療/保険・教育はプロ視点の目安値です。
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

  const trendMonths = (()=> {
    const base = m ? new Date(`${m}-01T00:00:00`) : new Date();
    const labels = [];
    for(let i=2;i>=0;i--){
      const d = new Date(base);
      d.setMonth(d.getMonth() - i);
      labels.push(`${d.getMonth()+1}月`);
    }
    return labels;
  })();
  const trendSat = [
    clamp(satisfactionScore - 8, 0, 100),
    clamp(satisfactionScore - 3, 0, 100),
    satisfactionScore
  ];
  const trendStable = [
    clamp(stabilityScore - 6, 0, 100),
    clamp(stabilityScore - 2, 0, 100),
    stabilityScore
  ];
  const satDelta = clamp(trendSat[2] - trendSat[1], -100, 100);
  const stableDelta = clamp(trendStable[2] - trendStable[1], -100, 100);
  const trendPoints = (values, w=320, h=140, pad=16)=>{
    const plotW = w - pad * 2;
    const plotH = h - pad * 2;
    return values.map((v, i)=>{
      const x = pad + (plotW / (values.length - 1)) * i;
      const y = pad + (1 - (v / 100)) * plotH;
      return { x, y };
    });
  };
  const satPoints = trendPoints(trendSat);
  const stablePoints = trendPoints(trendStable);
  const pointsToPath = pts => pts.map((p,i)=> `${i===0?"M":"L"}${p.x},${p.y}`).join(" ");
  const satPath = pointsToPath(satPoints);
  const stablePath = pointsToPath(stablePoints);
  const satLast = satPoints[satPoints.length - 1];
  const stableLast = stablePoints[stablePoints.length - 1];
  const gaugeValue = 63;
  const compareAvg = 50;
  const compareDiff = gaugeValue - compareAvg;
  const zScore = (gaugeValue - 50) / 10;
  const comparePct = clamp(Math.round((1 - normalCdf(zScore)) * 100), 1, 99);
  const compareText = `あなたは同年代上位 ${comparePct}%`;

  const html = `
    <div class="resultWrap monthlyResult">
        <div class="summaryCard animIn a1">
          <div class="summaryTitle">月次レポート：${escapeHtml(m)}</div>
          <div class="summaryLead">${escapeHtml(summaryMonthly)}</div>
          <div class="monthlyAxisTabs" role="tablist" aria-label="月次レポート表示切り替え">
            <button class="monthlyAxisBtn active" data-main="sat" onclick="switchMonthlyMainTab('sat')" role="tab" aria-controls="monthlyAxisPanel-sat" aria-selected="true">家計納得度スコア</button>
            <button class="monthlyAxisBtn" data-main="stable" onclick="switchMonthlyMainTab('stable')" role="tab" aria-controls="monthlyAxisPanel-stable" aria-selected="false">家計安定度スコア</button>
            <button class="monthlyAxisBtn" data-main="trend" onclick="switchMonthlyMainTab('trend')" role="tab" aria-controls="monthlyDetail-trend" aria-selected="false">3ヶ月推移</button>
            <button class="monthlyAxisBtn" data-main="map" onclick="switchMonthlyMainTab('map')" role="tab" aria-controls="monthlyDetail-map" aria-selected="false">2軸分布図</button>
            <button class="monthlyAxisBtn" data-main="compare" onclick="switchMonthlyMainTab('compare')" role="tab" aria-controls="monthlyDetail-compare" aria-selected="false">偏差値比較</button>
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
            ${benchmarkIntroHtml}
            ${targetBudget ? benchmarkBlocksAll : ""}
          </div>
        </div>
      </div>

      <div class="monthlyDetailPane animIn a3" id="monthlyDetail-trend" data-detail="trend" role="tabpanel" aria-hidden="true" style="display:none;">
        <div class="sectionCard">
          <div class="sectionHead">
            <div><div class="sectionName">3ヶ月推移</div><div class="sectionHint">家計納得度 / 家計安定度</div></div>
            <div class="sectionScore">推移</div>
          </div>
          <div class="trendCards">
            <div class="trendCard sat">
              <div class="trendLabel">家計納得度</div>
              <div class="trendValue">${satisfactionScore}</div>
              <div class="trendDelta ${satDelta >= 0 ? "up" : "down"}">${satDelta >= 0 ? "▲" : "▼"} ${Math.abs(satDelta)}</div>
            </div>
            <div class="trendCard stable">
              <div class="trendLabel">家計安定度</div>
              <div class="trendValue">${stabilityScore}</div>
              <div class="trendDelta ${stableDelta >= 0 ? "up" : "down"}">${stableDelta >= 0 ? "▲" : "▼"} ${Math.abs(stableDelta)}</div>
            </div>
          </div>
          <div class="trendChart">
            <svg viewBox="0 0 320 140" role="img" aria-label="3ヶ月推移ラインチャート">
              <path class="trendLine sat" d="${satPath}"></path>
              <path class="trendLine stable" d="${stablePath}"></path>
              ${satPoints.map((p,i)=>`<circle class="trendDot sat ${i===2?"latest":""}" cx="${p.x}" cy="${p.y}" r="${i===2?5:3}"></circle>`).join("")}
              ${stablePoints.map((p,i)=>`<circle class="trendDot stable ${i===2?"latest":""}" cx="${p.x}" cy="${p.y}" r="${i===2?5:3}"></circle>`).join("")}
            </svg>
            <div class="trendAxis">
              ${trendMonths.map(label=> `<span>${label}</span>`).join("")}
            </div>
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
          ${renderDevScoreCard(gaugeValue, compareDiff, compareText, compareAvg)}
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
`月次レポート：${m}

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

  const next = loadTx().filter(t=> !(t.date && t.date.startsWith(target)));
  saveTx(next);

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
  return loadJSON(LS_PROFILE, DEFAULT_PROFILE);
}
function getValueTop3FromProfile(profile){
  const top = (profile && Array.isArray(profile.valueTop3)) ? profile.valueTop3 : [];
  return dedupeList(top).slice(0,3);
}
function buildValueOptionHTML(cats, withEmpty){
  const base = withEmpty ? `<option value="">未設定</option>` : "";
  return base + cats.map(c=>`<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join("");
}
function updateValueCategorySelects(cats){
  const options = buildValueOptionHTML(cats, true);
  ["valueTop1","valueTop2","valueTop3"].forEach(id=>{
    const el = $(id);
    if(!el) return;
    const current = el.value || "";
    el.innerHTML = options;
    if(current && cats.includes(current)) el.value = current;
  });
  ["entryValueTag","editValueTag"].forEach(id=>{
    const el = $(id);
    if(!el) return;
    const current = el.value || "";
    el.innerHTML = options;
    if(current && cats.includes(current)) el.value = current;
  });
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
  const annualIncomeGross = Number($("profileAnnualIncome")?.value || 0);
  const householdSize = Number($("profileHousehold")?.value || 0);
  const prof = {
    household: $("profileHousehold").value,
    householdSize: Number.isFinite(householdSize) && householdSize > 0 ? householdSize : "",
    age: Number.isFinite(ageRaw) && ageRaw > 0 ? ageRaw : "",
    annualIncomeGross: Number.isFinite(annualIncomeGross) && annualIncomeGross > 0 ? annualIncomeGross : "",
    housingType: $("profileHousingType")?.value || "unknown",
    regionType: $("profileRegionType")?.value || "unknown",
    workType: $("profileWorkType")?.value || "unknown",
    valueCats,
    valueTop3
  };
  saveJSON(LS_PROFILE, prof);
  const m = $("settingsMonth")?.value || ym(new Date());
  saveMonthlySettings(m);
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

function openSurvey(){
  const prof = loadJSON(LS_PROFILE, {household:"unknown", ageBand:"unknown"});
  if($("surveyHousehold")){
    const size = normalizeHouseholdSize(prof);
    $("surveyHousehold").value = size ? String(size) : (prof.household || "unknown");
  }
  $("surveyAge") && ($("surveyAge").value = prof.age ? String(prof.age) : "");
  $("surveyAnnualIncome") && ($("surveyAnnualIncome").value = prof.annualIncomeGross ? String(prof.annualIncomeGross) : "");
  $("surveyHousingType") && ($("surveyHousingType").value = prof.housingType || "unknown");
  $("surveyRegionType") && ($("surveyRegionType").value = prof.regionType || "unknown");
  $("surveyWorkType") && ($("surveyWorkType").value = prof.workType || "unknown");
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

function finishSurvey(){
  const requiredFields = [
    { id:"surveyHousehold", label:"世帯人数", type:"select" },
    { id:"surveyAge", label:"年齢（世帯主）", type:"input" },
    { id:"surveyAnnualIncome", label:"昨年の世帯年収", type:"input" },
    { id:"surveyIncome", label:"手取り月収", type:"input" },
    { id:"surveyHousing", label:"住居費", type:"input" },
    { id:"surveyUtility", label:"光熱費", type:"input" },
    { id:"surveyNet", label:"通信費", type:"input" },
    { id:"surveySub", label:"サブスク", type:"input" },
    { id:"surveyMortgagePrincipal", label:"ローン元本返済", type:"input" },
    { id:"surveyHousingType", label:"住居形態", type:"select" },
    { id:"surveyRegionType", label:"居住地域", type:"select" },
    { id:"surveyWorkType", label:"就業形態", type:"select" },
  ];
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
  const ageRaw = Number($("surveyAge")?.value || 0);
  const annualIncomeGross = Number($("surveyAnnualIncome")?.value || 0);
  const householdSize = Number($("surveyHousehold")?.value || 0);
  const prof = {
    household: $("surveyHousehold")?.value || "unknown",
    householdSize: Number.isFinite(householdSize) && householdSize > 0 ? householdSize : "",
    age: Number.isFinite(ageRaw) && ageRaw > 0 ? ageRaw : "",
    annualIncomeGross: Number.isFinite(annualIncomeGross) && annualIncomeGross > 0 ? annualIncomeGross : "",
    housingType: $("surveyHousingType")?.value || "unknown",
    regionType: $("surveyRegionType")?.value || "unknown",
    workType: $("surveyWorkType")?.value || "unknown",
  };
  saveJSON(LS_PROFILE, prof);

  const m = ym(new Date());
  const income = Number($("surveyIncome")?.value || 0);
  if($("surveyIncome")?.value.trim() !== "") setIncomeForMonth(m, income);

  const fixedAll = loadJSON(LS_FIXED, {});
  fixedAll[m] = {
    housingYen: Number($("surveyHousing")?.value || 0),
    utilityYen: Number($("surveyUtility")?.value || 0),
    netYen: Number($("surveyNet")?.value || 0),
    subYen: Number($("surveySub")?.value || 0),
    mortgagePrincipalYen: Number($("surveyMortgagePrincipal")?.value || 0),
  };
  saveJSON(LS_FIXED, fixedAll);

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
}
window.finishSurvey = finishSurvey;

function resetOnboarding(){
  localStorage.removeItem(LS_ONBOARD);
  nextSlide(1);
  openModal("onboardingModal");
}
window.resetOnboarding = resetOnboarding;

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
function init(){
  migrateSatisfactionScale();
  buildCatCards();

  const tryAdvanceQuality = ()=>{
    if(entryStep !== "quality") return;
    const sat = ($("entrySat")?.value || "").trim();
    const valueTag = ($("entryValueTag")?.value || "").trim();
    if(sat && valueTag) showEntryStep("memo");
  };
  $("entrySat")?.addEventListener("change", tryAdvanceQuality);
  $("entryValueTag")?.addEventListener("change", tryAdvanceQuality);

  $("entryPrevDay")?.addEventListener("click", ()=> openEntryModal(addDays(SELECTED_DATE, -1), { keepCategory:true }));
  $("entryNextDay")?.addEventListener("click", ()=> openEntryModal(addDays(SELECTED_DATE, +1), { keepCategory:true }));

  $("entryPrimaryBtn")?.addEventListener("click", handleEntryPrimary);
  $("entryCloseBtn")?.addEventListener("click", closeEntryModal);

  ["entryModal","dayDetailModal","resultModal","savingModal","surveyModal","editModal"].forEach(id=>{
    const ov = $(id);
    if(!ov) return;
    ov.addEventListener("click", (e)=>{
      if(e.target !== ov) return;
      if(id === "surveyModal" && ov.dataset.locked === "1") return;
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

  if(!localStorage.getItem(LS_ONBOARD)){
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
  switchScreen("score");
}

init();
