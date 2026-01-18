const LS_TX = "tx";
const LS_FIXED = "fixed_month";
const LS_INCOME = "income_month";
const LS_PROFILE = "user_profile";
const LS_ONBOARD = "onboarding_done";
const LS_SAVING = "saving_month";
const LS_REVIEW = "review_open";
const LS_MONTHLY_READY = "monthly_ready";
const LS_MONTHLY_AVG = "monthly_avg_score";

const CATEGORIES = [
  "食費","外食費","日用品","衣服","美容","交際費","医療費","教育費",
  "交通費","コンビニ","カフェ",
  "デート","趣味","仕事"
];

const QUALITY_TARGET = new Set(["外食費","交際費","デート","趣味","カフェ","コンビニ"]);
const CATEGORY_EMOJI = {
  "外食費":"🍽️",
  "交際費":"🤝",
  "デート":"💑",
  "趣味":"🎯",
  "カフェ":"☕️",
  "コンビニ":"🏪",
};
const PUBLIC_ITEM_EMOJI = {
  HOUSING:"🏠",
  FOOD:"🍚",
  UTILITIES:"💡",
  TRANS_COMM:"🚌",
  LEISURE:"🎬",
};
const REPORT_COLORS = [
  "#60a5fa","#34d399","#fbbf24","#f97316","#f472b6",
  "#a78bfa","#38bdf8","#fca5a5","#22c55e","#fb7185",
];

const TRIGGER_LABEL = {
  tired:"疲れ",
  stress:"ストレス",
  hungry:"空腹",
  reward:"ご褒美",
  social:"付き合い",
  timesave:"時短",
  bored:"なんとなく",
};

const BENCH_PUBLIC_2024 = {
  totalMedian: 244396,
  foodMedian: 78810,
  utilitiesMedian: 21200,
  transportCommMedian: 22274,
  leisureMedian: 16000,
  otherMedian: 33030,
  housingMedian: 0.28,
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
function fmtDiff(rate, bench){
  if(rate == null || bench == null || !Number.isFinite(rate) || !Number.isFinite(bench)) return "—";
  const d = Math.round((rate - bench)*100);
  return `${d>0?"+":""}${d}%`;
}
function trendClass(kind, rate, bench){
  if(rate == null || bench == null || !Number.isFinite(rate) || !Number.isFinite(bench)) return "neutral";
  if(kind === "saving") return rate >= bench ? "good" : "bad";
  return rate <= bench ? "good" : "bad";
}
function barHTML(kind, rate, bench){
  const scaleMax = 0.5;
  if(rate == null || bench == null || !Number.isFinite(rate) || !Number.isFinite(bench)){
    return `<div class="compareBar empty"></div>`;
  }
  const youPos = clamp01(rate / scaleMax) * 100;
  const benchPos = clamp01(bench / scaleMax) * 100;
  const cls = trendClass(kind, rate, bench);
  return `
    <div class="compareBar ${cls}">
      <span class="compareMarker you ${cls}" style="left:${youPos}%;"></span>
      <span class="compareMarker bench" style="left:${benchPos}%;"></span>
    </div>
  `;
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

  const w = 320;
  const h = 170;
  const pad = { left:38, right:12, top:12, bottom:30 };
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;

  const xTo = (x)=> pad.left + (x / xMax) * plotW;
  const yTo = (y)=> pad.top + (1 - (y / yMax)) * plotH;

  const youPoint = hasYou ? `<circle class="scatterPoint you" cx="${xTo(youX)}" cy="${yTo(youY)}" r="5"></circle>` : "";
  const avgPoint = hasAvg ? `<rect class="scatterPoint avg" x="${xTo(avgX)-5}" y="${yTo(avgY)-5}" width="10" height="10" rx="2"></rect>` : "";

  return `
    <div class="scatterWrap compact">
      <svg class="scatterSvg compact" viewBox="0 0 ${w} ${h}" role="img" aria-label="行動マップの比較">
        <line class="scatterAxis" x1="${pad.left}" y1="${pad.top}" x2="${pad.left}" y2="${pad.top + plotH}"></line>
        <line class="scatterAxis" x1="${pad.left}" y1="${pad.top + plotH}" x2="${pad.left + plotW}" y2="${pad.top + plotH}"></line>

        <rect class="scatterZone" x="${xTo(xMid)}" y="${pad.top}" width="${pad.left + plotW - xTo(xMid)}" height="${yTo(yMid) - pad.top}"></rect>
        <line class="scatterGrid" x1="${pad.left}" y1="${yTo(yMid)}" x2="${pad.left + plotW}" y2="${yTo(yMid)}"></line>
        <line class="scatterGrid" x1="${xTo(xMid)}" y1="${pad.top}" x2="${xTo(xMid)}" y2="${pad.top + plotH}"></line>

        <text class="scatterTick" x="${pad.left}" y="${pad.top + plotH + 18}" text-anchor="middle">0</text>
        <text class="scatterTick" x="${xTo(xMid)}" y="${pad.top + plotH + 18}" text-anchor="middle">${Math.round(xMid)}</text>
        <text class="scatterTick" x="${pad.left + plotW}" y="${pad.top + plotH + 18}" text-anchor="middle">100</text>

        <text class="scatterTick" x="${pad.left - 8}" y="${pad.top + plotH}" text-anchor="end">0</text>
        <text class="scatterTick" x="${pad.left - 8}" y="${yTo(yMid)+4}" text-anchor="end">${Math.round(yMid)}</text>
        <text class="scatterTick" x="${pad.left - 8}" y="${pad.top + 4}" text-anchor="end">100</text>

        ${avgPoint}
        ${youPoint}
      </svg>
      <div class="scatterLegend">● あなた / ■ ユーザー中央値（仮）</div>
    </div>
    ${!hasYou ? `<div class="small" style="margin-top:6px;">データが少ないため、次の月に精度が上がります（まずは記録と★でOK）</div>` : ""}
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

function buildSummaryTextWeekly({ daysWithEntry, qualityScore, regretRate }){
  let a = "今週はこれからのペースです。";
  if(Number.isFinite(daysWithEntry) && daysWithEntry >= 4){
    a = "記録は続けられています。";
  }else if(Number.isFinite(daysWithEntry) && daysWithEntry >= 1){
    a = "記録は始められています。";
  }

  let b = "納得はこれから積み上げられます。";
  if(Number.isFinite(qualityScore) && qualityScore >= 70){
    b = "納得も積み上がっています。";
  }else if(Number.isFinite(qualityScore) && qualityScore < 55){
    b = "納得は伸びしろです。";
  }else if(Number.isFinite(qualityScore)){
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

function buildNextActionWeekly({ daysWithEntry, coveragePct, qualityScore }){
  let text = "今の入力リズムを続ける";
  if(Number.isFinite(daysWithEntry) && daysWithEntry <= 2){
    text = "3日だけ記録する";
  }else if(Number.isFinite(coveragePct) && coveragePct < 50){
    text = "★（納得度）を2回つける";
  }else if(Number.isFinite(qualityScore) && qualityScore < 55){
    text = "★3〜4になりやすい支出を1回増やす";
  }
  return `次は「${text}」を1つだけ試してみましょう`;
}

function buildNextActionMonthly({ coveragePct, qualityScore, varRate, savingRate, fixedRate }){
  let text = "同じ入力リズムを続ける";
  if(Number.isFinite(coveragePct) && Number.isFinite(qualityScore) && coveragePct < 70){
    text = "★（納得度）を週3回つける";
  }else if(Number.isFinite(qualityScore) && qualityScore < 55){
    text = "★3〜4が付く支出を1つ増やす";
  }else if(Number.isFinite(varRate) && varRate > 0.40){
    text = "★1〜2の支出を1つ見直す";
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
function calcHabitScore(daysWithEntry, totalDays){
  if(!Number.isFinite(daysWithEntry) || !Number.isFinite(totalDays) || totalDays <= 0){
    return null;
  }
  return clamp(Math.round((daysWithEntry / totalDays) * 100), 0, 100);
}
function calcSavingScoreFromRate(rate){
  if(!Number.isFinite(rate)) return null;
  return clamp(Math.round(50 + (rate - 0.15) * 200), 0, 100);
}
function calcBalanceScore(fixedRate, varRate){
  if(!Number.isFinite(fixedRate) || !Number.isFinite(varRate)) return null;
  const diff = Math.abs(fixedRate - 0.25) + Math.abs(varRate - 0.35);
  return clamp(Math.round(100 - diff * 200), 0, 100);
}
function calcPublicCompareScore(rates){
  if(!rates || !rates.userRates || !rates.benchRates) return null;
  const items = buildPublicCompareItems(rates);
  let sum = 0;
  let count = 0;
  for(const item of items){
    const score = calcPublicItemScore(item.you, item.bench, item.kind);
    if(!Number.isFinite(score)) continue;
    sum += score;
    count += 1;
  }
  if(count === 0) return null;
  return clamp(Math.round(sum / count), 0, 100);
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

  const fixed = fixedAll[m] || (prev ? fixedAll[prev] : null) || { housingYen:0, utilityYen:0, netYen:0, subYen:0 };
  $("housingYen") && ($("housingYen").value = fixed.housingYen ? String(fixed.housingYen) : "");
  $("utilityYen") && ($("utilityYen").value = fixed.utilityYen ? String(fixed.utilityYen) : "");
  $("netYen") && ($("netYen").value = fixed.netYen ? String(fixed.netYen) : "");
  $("subYen") && ($("subYen").value = fixed.subYen ? String(fixed.subYen) : "");

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
  };
  saveJSON(LS_FIXED, fixedAll);

  const incomeRaw = $("incomeYen")?.value.trim();
  if(incomeRaw !== ""){
    setIncomeForMonth(m, Number(incomeRaw || 0));
  }
}

let CAL_ANCHOR = monthStart(new Date());
let SELECTED_DATE = ymd(new Date());
let entryStep = "category"; // category -> amount -> satisfaction -> trigger -> memo

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
  const ICON = {
    食費:"🍚", 外食費:"🍜", 日用品:"🧻", 衣服:"👕", 美容:"💄", 交際費:"🍻",
    医療費:"🏥", 教育費:"📚", 交通費:"🚃", コンビニ:"🏪", カフェ:"☕",
    デート:"💑", 趣味:"🎮", 仕事:"💼"
  };
  const renderCards = (wrap, onSelect)=>{
    if(!wrap) return;
    wrap.innerHTML = CATEGORIES.map(c=>`
      <div class="catCard" data-cat="${escapeHtml(c)}">
        <div class="icon">${ICON[c] || "🧾"}</div>
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
  $("txDate") && ($("txDate").value = dt);
  $("entryDateText") && ($("entryDateText").textContent = dt);

  const prevCat = opts.keepCategory ? $("entryCategoryHidden")?.value : "";

  // reset
  $("entryMsg").textContent = "";
  $("entryAmount").value = "";
  $("entryMemoTop").value = "";
  $("entrySat").value = "";
  $("entryTrigger").value = "";

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
    if(t.satisfaction!=null) meta.push(`納得:${t.satisfaction}`);
    if(t.trigger) meta.push(`きっかけ:${TRIGGER_LABEL[t.trigger] || t.trigger}${t.trigMemo?`(${escapeHtml(t.trigMemo)})`:""}`);
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

  const isQ = QUALITY_TARGET.has(cat);
  const sat = isQ && $("entrySat").value ? Number($("entrySat").value) : null;
  const trig = isQ && $("entryTrigger").value ? $("entryTrigger").value : null;
  const memoTop = ($("entryMemoTop").value||"").trim();
  const note = isQ ? memoTop : "";

  const id = (crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2);
  const tx = loadTx();
  tx.push({ id, date: dt, category: cat, amount: amt, satisfaction: sat, trigger: trig, trigMemo: note, memo: memoTop });
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
    const cat = $("entryCategoryHidden").value;
    const isQ = QUALITY_TARGET.has(cat);
    const amt = Number($("entryAmount").value || 0);
    if(!(amt > 0)){
      toast("支出を入力してね");
      return;
    }

    if(isQ){
      showEntryStep("quality");
      return;
    }

    showEntryStep("memo");
    return;
  }

  if(entryStep === "quality"){
    showEntryStep("memo");
    return;
  }

  if(saveEntry()) afterEntrySaved();
}

function afterEntrySaved(){
  toast("入力完了");
  closeModal("entryModal");
  renderCalendar();
  renderList();
  renderWeeklyInline();
  renderMonthlyGate();
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
  $("editId") && ($("editId").value = tx.id);
  $("editDate") && ($("editDate").value = tx.date || "");
  $("editCategory") && ($("editCategory").value = tx.category || "");
  $("editAmount") && ($("editAmount").value = tx.amount || "");
  $("editSat") && ($("editSat").value = (tx.satisfaction!=null ? String(tx.satisfaction) : ""));
  $("editTrigger") && ($("editTrigger").value = tx.trigger || "");
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
  const isQ = QUALITY_TARGET.has(category);
  const satRaw = ($("editSat")?.value || "").trim();
  const trigRaw = ($("editTrigger")?.value || "").trim();

  list[idx] = {
    ...list[idx],
    date: $("editDate")?.value || list[idx].date,
    category,
    amount,
    satisfaction: satRaw ? Number(satRaw) : null,
    trigger: trigRaw || null,
    memo,
    trigMemo: isQ ? memo : "",
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
    if(t.satisfaction!=null) meta.push(`納得:${t.satisfaction}`);
    if(t.trigger) meta.push(`きっかけ:${TRIGGER_LABEL[t.trigger] || t.trigger}${t.trigMemo?`(${escapeHtml(t.trigMemo)})`:""}`);
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

/* ===== Quality Score ===== */
function calcQualityMetrics(txList){
  const q = txList.filter(t => QUALITY_TARGET.has(t.category));
  const qCount = q.length;
  const qSpend = q.reduce((a,t)=> a + Number(t.amount||0), 0);

  const rated = q.filter(t => Number.isFinite(Number(t.satisfaction)) && Number(t.satisfaction)>=1 && Number(t.satisfaction)<=4);
  const ratedCount = rated.length;
  const ratedSpend = rated.reduce((a,t)=> a + Number(t.amount||0), 0);

  if(qCount === 0){
    return { qCount:0, ratedCount:0, qSpend:0, ratedSpend:0, coverage:0, avgSat:null, baseScore:null, penalty:0, qualityScore:null };
  }

  let num = 0;
  for(const t of rated) num += Number(t.amount||0) * Number(t.satisfaction);
  const avgSat = ratedSpend > 0 ? (num / ratedSpend) : null;
  const baseScore = (avgSat == null) ? 50 : ((avgSat - 1) / 3) * 100;

  const coverage = clamp01(qCount > 0 ? (ratedCount / qCount) : 0);
  const penalty = (1 - coverage) * 20;

  const qualityScore = Math.max(0, Math.min(100, Math.round(baseScore - penalty)));
  return { qCount, ratedCount, qSpend, ratedSpend, coverage, avgSat, baseScore, penalty, qualityScore };
}

function calcCategorySatisfactionScores(txList){
  const out = [];
  for(const cat of QUALITY_TARGET){
    const items = txList.filter(t=>t.category === cat);
    if(items.length === 0){
      out.push({ category:cat, score:null });
      continue;
    }
    const rated = items.filter(t=> Number.isFinite(Number(t.satisfaction)) && Number(t.satisfaction)>=1 && Number(t.satisfaction)<=4);
    const ratedSpend = rated.reduce((a,t)=> a + Number(t.amount||0), 0);
    if(ratedSpend <= 0){
      out.push({ category:cat, score:null });
      continue;
    }
    let sum = 0;
    for(const t of rated){
      sum += Number(t.amount||0) * Number(t.satisfaction);
    }
    const avgSat = sum / ratedSpend;
    const score = clamp(Math.round(((avgSat - 1) / 3) * 100), 0, 100);
    out.push({ category:cat, score });
  }
  return out;
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

function buildPublicCompareItems(rates){
  return [
    { label:withEmoji("住居費率", PUBLIC_ITEM_EMOJI.HOUSING), kind:"housing", you:rates.userRates.HOUSING, bench:rates.benchRates.HOUSING },
    { label:withEmoji("食費率", PUBLIC_ITEM_EMOJI.FOOD), kind:"cost", you:rates.userRates.FOOD, bench:rates.benchRates.FOOD },
    { label:withEmoji("光熱費率", PUBLIC_ITEM_EMOJI.UTILITIES), kind:"cost", you:rates.userRates.UTILITIES, bench:rates.benchRates.UTILITIES },
    { label:withEmoji("交通・通信費率", PUBLIC_ITEM_EMOJI.TRANS_COMM), kind:"cost", you:rates.userRates.TRANS_COMM, bench:rates.benchRates.TRANS_COMM },
    { label:withEmoji("教養娯楽率", PUBLIC_ITEM_EMOJI.LEISURE), kind:"cost", you:rates.userRates.LEISURE, bench:rates.benchRates.LEISURE },
  ];
}

function calcPublicItemScore(rate, bench, kind){
  if(rate == null || bench == null || !Number.isFinite(rate) || !Number.isFinite(bench)) return null;
  if(kind === "housing"){
    return clamp(Math.round(100 - (rate * 100)), 0, 100);
  }
  const diff = rate - bench;
  return clamp(Math.round(100 - Math.abs(diff) * 90), 0, 100);
}

function renderPublicCompareTable(rates){
  const rows = [];

  rows.push({ label:"住居費率", kind:"cost", you:rates.userRates.HOUSING, bench:rates.benchRates.HOUSING });

  rows.push(
    { label:"食費率", kind:"cost", you:rates.userRates.FOOD, bench:rates.benchRates.FOOD },
    { label:"光熱費率", kind:"cost", you:rates.userRates.UTILITIES, bench:rates.benchRates.UTILITIES },
    { label:"交通・通信費率", kind:"cost", you:rates.userRates.TRANS_COMM, bench:rates.benchRates.TRANS_COMM },
    { label:"教養娯楽率", kind:"cost", you:rates.userRates.LEISURE, bench:rates.benchRates.LEISURE }
  );

  return `
    <div class="compareTableWrap">
      <div class="compareTable">
      <div class="compareHead">項目</div>
      <div class="compareHead">あなた</div>
      <div class="compareHead">目安（中央値）</div>
      <div class="compareHead">差分</div>
      <div class="compareHead">位置</div>
      ${rows.map(r=>{
        const youText = fmtPct(r.you);
        const benchText = r.benchText || fmtPct(r.bench);
        const diffText = fmtDiff(r.you, r.bench);
        const cls = trendClass(r.kind, r.you, r.bench);
        return `
          <div>${r.label}</div>
          <div class="num">${youText}</div>
          <div class="num">${benchText}</div>
          <div class="num"><span class="compareDiff ${cls}">${diffText}</span></div>
          ${barHTML(r.kind, r.you, r.bench)}
        `;
      }).join("")}
      </div>
    </div>
    <div class="small compareLegend">● あなた / ◾️ 目安（スケール上限50%）・緑=参考値より少なめ / 赤=参考値より多め</div>
    <div class="small" style="margin-top:6px;">出典：総務省 家計調査（家計収支編）2024年 二人以上世帯・月次平均値を参考値中央値算出</div>
    <div class="small" style="margin-top:6px;">住居は国土交通省 住宅情報データ（都内）目安28%（暫定）</div>
  `;
}

function renderPublicCompareScoreTable(rates){
  const rows = buildPublicCompareItems(rates);
  return `
    <div class="compareTableWrap">
      <div class="compareTable compareScore">
      <div class="compareHead">項目</div>
      <div class="compareHead">あなた</div>
      <div class="compareHead">目安（中央値）</div>
      <div class="compareHead">差分</div>
      <div class="compareHead">スコア</div>
      <div class="compareHead">位置</div>
      ${rows.map(r=>{
        const youText = fmtPct(r.you);
        const benchText = fmtPct(r.bench);
        const diffText = fmtDiff(r.you, r.bench);
        const cls = trendClass(r.kind, r.you, r.bench);
        const score = calcPublicItemScore(r.you, r.bench, r.kind);
        const scoreText = score == null ? "—" : `${score}/100`;
        return `
          <div>${r.label}</div>
          <div class="num">${youText}</div>
          <div class="num">${benchText}</div>
          <div class="num"><span class="compareDiff ${cls}">${diffText}</span></div>
          <div class="num">${scoreText}</div>
          ${barHTML(r.kind, r.you, r.bench)}
        `;
      }).join("")}
      </div>
    </div>
    <div class="small compareLegend">● あなた / ◾️ 目安（スケール上限50%）・緑=参考値より少なめ / 赤=参考値より多め</div>
    <div class="small" style="margin-top:6px;">出典：総務省 家計調査（家計収支編）2024年 二人以上世帯・月次平均値を参考値中央値算出</div>
    <div class="small" style="margin-top:6px;">住居は国土交通省 住宅情報データ（都内）目安28%（暫定）</div>
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
  return emoji ? `${emoji} ${label}` : label;
}

function getGrowthStage(totalScore){
  if(!Number.isFinite(totalScore) || totalScore <= 0) return 1;
  const stage = Math.floor(totalScore / 80) + 1;
  return clamp(stage, 1, 12);
}
function getGrowthLabel(stage){
  const idx = Number.isFinite(stage) ? stage : 1;
  return `Lv.${idx}`;
}
function getGrowthComment(stage){
  const idx = Number.isFinite(stage) ? stage : 1;
  if(idx <= 3) return "これから一緒に育っていこう。";
  if(idx <= 6) return "少しずつ育ってきたよ。";
  if(idx <= 9) return "いい感じ！この調子で続けよう。";
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
function getTriggerComment(txList){
  const counts = {};
  for(const t of txList || []){
    if(!t.trigger) continue;
    counts[t.trigger] = (counts[t.trigger] || 0) + 1;
  }
  const top = Object.entries(counts).sort((a,b)=>b[1]-a[1])[0];
  if(!top) return null;
  const key = top[0];
  const map = {
    tired:"疲れ気味みたい。無理せず休もう。",
    stress:"ストレス多めかも。深呼吸しよう。",
    hungry:"空腹での出費が多め。先に軽食で整えよう。",
    reward:"ご褒美が多め。がんばった証拠だね。",
    social:"付き合いが多め。ペース配分を意識しよう。",
    timesave:"時短が多め。無理しすぎないでね。",
    bored:"なんとなくが多め。気分転換を工夫しよう。",
  };
  return map[key] || null;
}

function mascotSvgHTML(stage = 1, opts = {}){
  const tone = opts.tone || {};
  const mood = opts.mood || "neutral";
  const stageIdx = Number.isFinite(stage) ? Math.max(1, Math.min(12, Math.round(stage))) : 1;
  const stageTone = MASCOT_STAGE_COLORS[stageIdx - 1] || {};
  const body = tone.body || stageTone.body || "#f3f4f6";
  const cheek = tone.cheek || stageTone.cheek || "#dbeafe";
  const accent = tone.accent || stageTone.accent || "#c7d2fe";
  const mouth = mood === "happy"
    ? "M48 74 Q60 82 72 74"
    : mood === "sad"
      ? "M48 78 Q60 70 72 78"
      : "M48 75 Q60 77 72 75";
  return `
    <svg class="mascotSvg" viewBox="0 0 120 120" role="img" aria-label="家計コンディションのキャラクター">
      <circle cx="60" cy="64" r="40" fill="${body}"/>
      <circle cx="75" cy="56" r="16" fill="${cheek}" opacity=".6"/>
      <circle cx="46" cy="60" r="4" fill="#2b2f38"/>
      <circle cx="66" cy="60" r="4" fill="#2b2f38"/>
      <path d="${mouth}" stroke="#2b2f38" stroke-width="4" fill="none" stroke-linecap="round"/>
      <rect x="36" y="88" width="48" height="18" rx="6" fill="#eef2ff" stroke="${accent}"/>
      <circle cx="60" cy="97" r="3" fill="${accent}"/>
      <g class="mascotBird">
        <circle cx="88" cy="30" r="10" fill="#f8d7aa"/>
        <circle cx="92" cy="30" r="2" fill="#2b2f38"/>
        <path d="M98 32 L106 36 L98 38 Z" fill="#f4a261"/>
      </g>
    </svg>
  `;
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

  const qx = calcQualityMetrics(allTx);
  const qualityScore = qx.qualityScore;
  const coveragePct = qx.qCount>0 ? Math.round(qx.coverage*100) : 0;

  const q = allTx.filter(t=>QUALITY_TARGET.has(t.category));
  const qSum = q.reduce((a,b)=>a+Number(b.amount||0),0);
  const regret = q.filter(t=>t.satisfaction!=null && Number(t.satisfaction)<=2).reduce((a,b)=>a+Number(b.amount||0),0);
  const regretRate = qSum>0 ? (regret/qSum) : null;

  const daysWithEntry = new Set(allTx.map(t=>t.date)).size;
  let weeklyScore = 60;
  weeklyScore += Math.min(daysWithEntry * 4, 20);
  if(qualityScore != null) weeklyScore += (qualityScore-50) * 0.25;
  if(regretRate != null) weeklyScore -= regretRate * 25;
  weeklyScore = clamp(Math.round(weeklyScore), 0, 100);

  const dow = ["日","月","火","水","木","金","土"][end.getDay()];
  const period = `${ymd(start)}（日）〜${ymd(end)}（${dow}）`;

  const weeklyEff = calcWeeklySatisfactionEfficiency(qualityScore, qx.qSpend, spend);
  const income = Number($("incomeYen")?.value||0);
  const weeklySpendControl = income > 0
    ? clamp(Math.round((1 - (spend / (income / 4))) * 100), 0, 100)
    : null;

  const summaryWeekly = buildSummaryTextWeekly({ daysWithEntry, qualityScore, regretRate });
  const weeklyState = getScoreState(weeklyScore);
  const weeklyStateLabel = getStateLabel(weeklyState);
  const readyMonth = getLatestReadyMonth();
  const weeklyReportHint = readyMonth
    ? `<div class="weeklyHeroHint">📄 月次レポートが届いています</div>`
    : "";
  const weeklyMascotCTA = readyMonth
    ? `role="button" aria-label="月次レポートを開く" onclick="showMonthlyScore()"`
    : "";
  const growthTotal = getCumulativeMonthlyAverageScore();
  const weeklyStage = getGrowthStage(growthTotal);
  const weeklyStageLabel = getGrowthLabel(weeklyStage);
  const characterQuality = calcQualityMetrics(characterTx).qualityScore;
  const topCategory = getTopCategory(characterTx);
  const mascotTone = getMascotTone(topCategory);
  const mascotMood = getMascotMood(characterQuality);
  const triggerComment = getTriggerComment(characterTx);
  const weeklyStageComment = triggerComment || getGrowthComment(weeklyStage);

  const html = `
    <div class="resultWrap">
      <div class="weeklyHero" aria-label="今週の家計コンディション">
          <div class="weeklyHeroArt" aria-hidden="true">
          <div class="weeklyHeroMascot" ${weeklyMascotCTA}>
            ${mascotSvgHTML(weeklyStage, { tone: mascotTone, mood: mascotMood })}
            ${readyMonth ? `<span class="mascotReport">📄</span>` : ""}
          </div>
        </div>
        <div class="weeklyHeroMeta">
          <div class="weeklyHeroState">${weeklyStateLabel}</div>
          <div class="weeklyHeroSub">育成レベル：${weeklyStageLabel}</div>
          <div class="small muted" style="margin-top:6px;">${weeklyStageComment}</div>
          ${weeklyReportHint}
        </div>
      </div>
    </div>
  `;

  const text =
`今週のふりかえり
期間：${period}
週次スコア：${weeklyScore}/100
納得効率：${weeklyEff==null?"—":weeklyEff+"/100"}
質スコア：${qualityScore==null?"—":qualityScore+"/100"}
納得入力カバー率：${coveragePct}%
質カテゴリ合計：${Math.round(qx.qSpend)}円`;

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
}
window.renderWeeklyInline = renderWeeklyInline;

function renderMonthlyGate(){
  const wrap = $("monthlyGate");
  if(!wrap) return;
  const readyMonth = getLatestReadyMonth();
  const currentMonth = ym(new Date());
  const targetMonth = readyMonth || currentMonth;
  $("scoreMonth") && ($("scoreMonth").value = targetMonth);
  const reviewState = loadReviewState();
  const opened = !!(reviewState.monthly && reviewState.monthly[targetMonth]);
  const statusLabel = readyMonth
    ? (opened ? "受領済み" : "受け取り待ち")
    : "準備中";
  const readyHint = opened
    ? "月次レポートは受領済みです。"
    : "ホームのキャラクターをタップして開いてください。";
  const tx = loadTx().filter(t=>t.date && t.date.startsWith(targetMonth));
  const daysInMonth = getDaysInMonth(targetMonth) || 0;
  const daysWithEntry = new Set(tx.map(t=>t.date)).size;
  const pct = daysInMonth > 0 ? Math.round((daysWithEntry / daysInMonth) * 100) : 0;

  if(readyMonth){
    wrap.innerHTML = `
      <div class="sectionCard monthlyGateCard">
        <div class="sectionHead">
          <div><div class="sectionName">月次レポート</div><div class="sectionHint">${escapeHtml(targetMonth)} 分が届いています</div></div>
          <div class="sectionScore">${statusLabel}</div>
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
        <div class="sectionScore">${statusLabel}</div>
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
  openModal("resultModal");
}
window.showMonthlyScore = showMonthlyScore;

function buildMonthlyResult(){
  const m = $("scoreMonth").value;
  const saved = getSavingForMonth(m);
  if(!saved){
    return { missingSaving:true, html:"", text:"" };
  }
  const missing = getMonthlyMissingFields();
  if(missing.length){
    return {
      missingSaving:false,
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
  };

  const fixedAll = loadJSON(LS_FIXED, {});
  fixedAll[m] = fixed;
  saveJSON(LS_FIXED, fixedAll);

  const tx = loadTx().filter(t=>t.date && t.date.startsWith(m));
  const varSpend = tx.reduce((a,b)=>a+Number(b.amount||0),0);
  const fixedSum = Object.values(fixed).reduce((a,b)=>a+Number(b||0),0);

  const q = tx.filter(t=>QUALITY_TARGET.has(t.category));
  const qSum = q.reduce((a,b)=>a+Number(b.amount||0),0);
  const regret = q.filter(t=>t.satisfaction!=null && Number(t.satisfaction)<=2).reduce((a,b)=>a+Number(b.amount||0),0);
  const regretRate = qSum>0 ? (regret/qSum) : null;

  const qx = calcQualityMetrics(tx);
  const qualityScore = qx.qualityScore;
  const coveragePct = qx.qCount>0 ? Math.round(qx.coverage*100) : 0;
  const categoryScores = calcCategorySatisfactionScores(tx);

  const savingRate = income>0 ? (saving/income) : null;
  const fixedRate = income>0 ? (fixedSum/income) : null;
  const varRate = income>0 ? (varSpend/income) : null;

  const rr = regretRate==null ? "—" : `${Math.round(regretRate*100)}%`;
  const sr = savingRate==null ? "—" : `${Math.round(savingRate*100)}%`;
  const fr = fixedRate==null ? "—" : `${Math.round(fixedRate*100)}%`;
  const vr = varRate==null ? "—" : `${Math.round(varRate*100)}%`;

  const savingsScore = calcSavingScoreFromRate(savingRate);
  const qualityShow  = qualityScore==null ? 0 : qualityScore;
  const qualityLabel = qualityScore==null ? "対象なし" : `${qualityShow}/100`;
  const totalSpend = fixedSum + varSpend;
  const satisfactionEfficiency = calcSatisfactionEfficiency(qualityScore, qx.qSpend, varSpend);
  const spendControl = income > 0 ? clamp(Math.round((1 - (totalSpend / income)) * 100), 0, 100) : null;

  const publicRates = calcPublicRates(tx, fixed, income);
  const publicCompareScore = calcPublicCompareScore(publicRates);
  const publicItems = buildPublicCompareItems(publicRates);
  const publicItemBlocks = publicItems.map(item=>{
    const itemScore = calcPublicItemScore(item.you, item.bench, item.kind);
    const toneClass = getScoreTone(itemScore);
    const scoreText = itemScore == null ? "—" : `${itemScore}/100`;
    const barWidth = itemScore == null ? 0 : itemScore;
    const youText = fmtPct(item.you);
    const benchText = fmtPct(item.bench);
    const diffText = fmtDiff(item.you, item.bench);
    return `
      <div class="metricBlock ${toneClass}" style="margin-top:8px;">
        <div class="metricLabel">${escapeHtml(item.label)}</div>
        <div class="small" style="margin-bottom:6px;">${scoreText}</div>
        <div class="small muted" style="margin-bottom:6px;">あなた ${youText} / 中央値 ${benchText} / 差分 ${diffText}</div>
        <div class="miniBar"><div style="--w:${barWidth}%;"></div></div>
      </div>
    `;
  }).join("");
  const balanceScore = calcBalanceScore(fixedRate, varRate);

  const daysWithEntry = new Set(tx.map(t=>t.date)).size;
  const daysInMonth = getDaysInMonth(m);
  const habitScore = calcHabitScore(daysWithEntry, daysInMonth);
  const reflectionScore = getMonthlyReviewScore(m);
  const satisfactionScore = calcAxisScore([qualityScore, habitScore, reflectionScore]);
  const stabilityScore = calcAxisScore([savingsScore, publicCompareScore, balanceScore]);
  const monthlyAvgScore = clamp(Math.round((satisfactionScore + stabilityScore) / 2), 0, 100);
  saveMonthlyAverageScore(m, monthlyAvgScore);
  const monthlyState = getScoreState(monthlyAvgScore);
  const monthlyStateLabel = getStateLabel(monthlyState);

  const summaryMonthly = buildSummaryTextMonthly({ satisfactionScore, stabilityScore });

  const html = `
    <div class="resultWrap monthlyResult">
      <div class="summaryCard animIn a1">
        <div class="summaryTitle">月次レポート：${escapeHtml(m)}</div>
        <div class="summaryLead">${escapeHtml(summaryMonthly)}</div>
        <div class="monthlyAxisTabs" role="tablist" aria-label="月次スコア切り替え">
          <button class="monthlyAxisBtn active" id="monthlyAxis-sat" data-axis="sat" onclick="switchMonthlyAxis('sat')" role="tab" aria-controls="monthlyAxisPanel-sat" aria-selected="true">家計納得度スコア</button>
          <button class="monthlyAxisBtn" id="monthlyAxis-stable" data-axis="stable" onclick="switchMonthlyAxis('stable')" role="tab" aria-controls="monthlyAxisPanel-stable" aria-selected="false">家計安定度スコア</button>
        </div>
      </div>

      <div class="monthlyAxisPane animIn a2" id="monthlyAxisPanel-sat" data-monthly-axis="sat" role="tabpanel" aria-hidden="false">
        <div class="axisCard tone-sat ${getScoreTone(satisfactionScore)} score--${getScoreState(satisfactionScore)}">
          <div class="axisLabel">家計納得度スコア</div>
          <div class="axisSub">心理・行動</div>
          ${donutHTML(satisfactionScore, { size:"xl", stateColor:getScoreToneColor(satisfactionScore, "sat") })}
          <div class="small muted" style="line-height:1.6;">
            家計納得度スコアは、<br>
            お金の使い方に対する「納得度」「向き合い方」「振り返り行動」をもとに、<br>
            あなた自身の家計との向き合い方を数値化した指標です。
          </div>
        </div>
        <div class="sectionCard tone-sat">
          <div class="sectionHead">
            <div><div class="sectionName">家計納得度スコア 内訳</div><div class="sectionHint">心理・行動の内訳</div></div>
          <div class="sectionScore">${satisfactionScore}/100</div>
        </div>
          <div>
            <div class="metricBlock ${getScoreTone(qualityScore)}">
              <div class="metricLabel">💡 納得度（質スコア）</div>
              <div class="small" style="margin-bottom:6px;">${qualityLabel}</div>
              <div class="miniBar"><div style="--w:${qualityShow}%;"></div></div>
            </div>
            <div class="metricBlock ${getScoreTone(habitScore)}" style="margin-top:8px;">
              <div class="metricLabel">🗓️ 記録継続（入力日数・習慣）</div>
              <div class="small" style="margin-bottom:6px;">${habitScore==null?"—":`${habitScore}/100`}</div>
              <div class="miniBar"><div style="--w:${habitScore==null?0:habitScore}%;"></div></div>
            </div>
            <div class="metricBlock ${getScoreTone(reflectionScore)}" style="margin-top:8px;">
              <div class="metricLabel">🔍 振り返り（月次レポート開封）</div>
              <div class="small" style="margin-bottom:6px;">${reflectionScore}/100</div>
              <div class="miniBar"><div style="--w:${reflectionScore}%;"></div></div>
            </div>
            <div class="small muted" style="margin-top:10px;">カテゴリ別の納得度</div>
            ${categoryScores.map(item=>{
              const scoreText = item.score == null ? "—" : `${item.score}/100`;
              const barWidth = item.score == null ? 0 : item.score;
              const toneClass = getScoreTone(item.score);
              const label = withEmoji(item.category, CATEGORY_EMOJI[item.category]);
              return `
                <div class="metricBlock ${toneClass}" style="margin-top:8px;">
                  <div class="metricLabel">${escapeHtml(label)}</div>
                  <div class="small" style="margin-bottom:6px;">${scoreText}</div>
                  <div class="miniBar"><div style="--w:${barWidth}%;"></div></div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      </div>

      <div class="monthlyAxisPane animIn a2" id="monthlyAxisPanel-stable" data-monthly-axis="stable" role="tabpanel" aria-hidden="true" style="display:none;">
        <div class="axisCard tone-stable axis-stable ${getScoreTone(stabilityScore)} score--${getScoreState(stabilityScore)}">
          <div class="axisLabel">家計安定度スコア</div>
          <div class="axisSub">バランス・比較</div>
          ${donutHTML(stabilityScore, { size:"xl", stateColor:getScoreToneColor(stabilityScore, "stable") })}
          <div class="small muted" style="line-height:1.6;">
            家計安定度スコアは、「貯蓄率」「公的比較（中央値ベース）」「固定費・変動費のバランス」をもとに、<br>
            家計の構造と数字の安定性を数値化した指標です。
          </div>
        </div>
        <div class="sectionCard tone-stable">
          <div class="sectionHead">
            <div><div class="sectionName">家計安定度スコア 内訳</div><div class="sectionHint">バランス・比較の内訳</div></div>
          <div class="sectionScore">${stabilityScore}/100</div>
        </div>
          <div>
            <div class="metricBlock ${getScoreTone(savingsScore)}">
              <div class="metricLabel">💰 貯蓄率</div>
              <div class="small" style="margin-bottom:6px;">${savingsScore==null?"—":`${savingsScore}/100`}</div>
              <div class="miniBar"><div style="--w:${savingsScore==null?0:savingsScore}%;"></div></div>
            </div>
            <div class="metricBlock ${getScoreTone(balanceScore)}" style="margin-top:8px;">
              <div class="metricLabel">⚖️ バランス（固定費・変動費の偏り）</div>
              <div class="small" style="margin-bottom:6px;">${balanceScore==null?"—":`${balanceScore}/100`}</div>
              <div class="miniBar"><div style="--w:${balanceScore==null?0:balanceScore}%;"></div></div>
            </div>
            <div class="small muted" style="margin-top:10px;">公的比較（中央値ベース）</div>
            ${publicItemBlocks}
          </div>
        </div>
      </div>

      <div class="monthlyDetailTabs" role="tablist" aria-label="月次レポートの詳細切り替え">
        <button class="monthlyDetailBtn active" data-detail="map" onclick="switchMonthlyDetailTab('map')" role="tab" aria-selected="true">行動マップ</button>
        <button class="monthlyDetailBtn" data-detail="rank" onclick="switchMonthlyDetailTab('rank')" role="tab" aria-selected="false">ランキング</button>
        <button class="monthlyDetailBtn" data-detail="breakdown" onclick="switchMonthlyDetailTab('breakdown')" role="tab" aria-selected="false">内訳</button>
      </div>

      <div class="monthlyDetailPane animIn a3" data-detail="map" role="tabpanel" aria-hidden="false">
        <div class="sectionCard">
          <div class="sectionHead">
            <div><div class="sectionName">ユーザー中央値比較マップ</div><div class="sectionHint">横軸：家計安定度 / 縦軸：家計納得度</div></div>
            <div class="sectionScore">比較</div>
          </div>
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
      </div>

      <div class="monthlyDetailPane animIn a3" data-detail="rank" role="tabpanel" aria-hidden="true" style="display:none;">
        <div class="sectionCard">
          <div class="sectionHead">
            <div><div class="sectionName">スコアランキング（仮）</div><div class="sectionHint">月次平均スコアで並び替え</div></div>
            <div class="sectionScore">上位</div>
          </div>
          <div class="rankList">
            ${[
              { name:"ユーザーA", sat:92, stable:88 },
              { name:"ユーザーB", sat:86, stable:81 },
              { name:"あなた", sat:satisfactionScore, stable:stabilityScore, you:true },
              { name:"ユーザーC", sat:80, stable:83 },
              { name:"ユーザーD", sat:79, stable:78 },
              { name:"ユーザーE", sat:76, stable:80 },
            ].map(item=>{
              const avg = clamp(Math.round((item.sat + item.stable) / 2), 0, 100);
              return { ...item, avg };
            }).sort((a,b)=>b.avg - a.avg).map((item, idx)=>{
              const rowClass = item.you ? "rankRow you" : "rankRow";
              return `
                <div class="${rowClass}">
                  <div class="rankBadge">${idx + 1}</div>
                  <div class="rankMeta">
                    <div class="rankName">${escapeHtml(item.name)}</div>
                    <div class="rankScore">納得度 ${item.sat} / 安定度 ${item.stable}</div>
                  </div>
                  <div class="rankScoreNum">${item.avg}</div>
                </div>
              `;
            }).join("")}
          </div>
          <div class="small muted" style="margin-top:8px;">※ 現在は仮データ。今後、同期間のスコア上位が表示されます。</div>
        </div>
      </div>

      <div class="monthlyDetailPane animIn a3" data-detail="breakdown" role="tabpanel" aria-hidden="true" style="display:none;">
        <div class="sectionCard">
          <div class="sectionHead">
            <div><div class="sectionName">金額内訳（円）</div><div class="sectionHint">月次の内訳</div></div>
            <div class="sectionScore"></div>
          </div>
          <div class="bar" style="justify-content:space-between;"><div>手取り</div><div style="font-weight:1100;">${income.toLocaleString("ja-JP")}</div></div>
          <div class="bar" style="justify-content:space-between;"><div>貯蓄</div><div style="font-weight:1100;">${saving.toLocaleString("ja-JP")}</div></div>
          <div class="bar" style="justify-content:space-between;"><div>固定費</div><div style="font-weight:1100;">${fixedSum.toLocaleString("ja-JP")}</div></div>
          <div class="bar" style="justify-content:space-between;"><div>変動費</div><div style="font-weight:1100;">${varSpend.toLocaleString("ja-JP")}</div></div>
          <div class="bar" style="justify-content:space-between;"><div>質カテゴリ合計</div><div style="font-weight:1100;">${Math.round(qx.qSpend).toLocaleString("ja-JP")}円</div></div>
        </div>
      </div>

      <div style="height:10px;"></div>
    </div>
  `;

  const text =
`月次レポート：${m}

家計納得度スコア：${satisfactionScore}/100
- 納得度（質スコア）：${qualityScore==null?"—":qualityScore+"/100"}
- 記録継続（入力日数）：${habitScore==null?"—":habitScore+"/100"}
- 振り返り（月次レポート開封）：${reflectionScore}/100

家計安定度スコア：${stabilityScore}/100
- 貯蓄率：${savingsScore==null?"—":savingsScore+"/100"}
- 公的比較：${publicCompareScore==null?"—":publicCompareScore+"/100"}
- バランス：${balanceScore==null?"—":balanceScore+"/100"}

貯蓄率：${sr}
固定費率：${fr}
変動費率：${vr}
後悔率（納得<=2）：${rr}

手取り：${income}円
貯蓄：${saving}円
固定費：${fixedSum}円
変動費：${varSpend}円
質カテゴリ合計：${Math.round(qx.qSpend)}円`;
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
    const sat = (t.satisfaction!=null) ? String(t.satisfaction) : "—";
    const trig = t.trigger ? (TRIGGER_LABEL[t.trigger] || t.trigger) : "—";
    const memo = t.memo ? t.memo : "—";
    return `
      <tr>
        <td data-label="日付">${escapeHtml(t.date)}</td>
        <td data-label="カテゴリ">${escapeHtml(t.category)}</td>
        <td class="num" data-label="金額">${Number(t.amount||0).toLocaleString("ja-JP")}</td>
        <td class="center" data-label="納得">${escapeHtml(sat)}</td>
        <td data-label="きっかけ">${escapeHtml(trig)}</td>
        <td data-label="メモ">${escapeHtml(memo)}</td>
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
    const sat = (t.satisfaction!=null) ? String(t.satisfaction) : "—";
    const trig = t.trigger ? (TRIGGER_LABEL[t.trigger] || t.trigger) : "—";
    const memo = t.memo ? t.memo : "—";
    return `
      <div class="listCard">
        <div class="listTop">${escapeHtml(t.date)}</div>
        <div class="listMain">
          <div class="listCat">${escapeHtml(t.category)}</div>
          <div class="listAmt">${Number(t.amount||0).toLocaleString("ja-JP")}円</div>
          <div class="listSat">納得 ${escapeHtml(sat)}</div>
        </div>
        <div class="listSub">
          <div class="listTrig">きっかけ ${escapeHtml(trig)}</div>
          <div class="listMemo">${escapeHtml(memo)}</div>
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
              <th style="text-align:center;">納得</th>
              <th>きっかけ</th>
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
function loadProfileToUI(){
  const prof = loadJSON(LS_PROFILE, {household:"unknown", ageBand:"unknown"});
  $("profileHousehold") && ($("profileHousehold").value = prof.household || "unknown");
  $("profileAgeBand") && ($("profileAgeBand").value = prof.ageBand || "unknown");

  const p = $("profileMiniPill");
  if(p){
    const hh = prof.household==="single" ? "1人" : prof.household==="twoPlus" ? "2人以上" : "未設定";
    const abMap = {u29:"〜29歳", "30s":"30代","40s":"40代","50s":"50代","60p":"60歳以上", unknown:"未設定"};
    p.textContent = `目安：${hh} / ${abMap[prof.ageBand||"unknown"] || "未設定"}`;
  }
}
function saveProfile(){
  const prof = { household: $("profileHousehold").value, ageBand: $("profileAgeBand").value };
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
  $("surveyHousehold") && ($("surveyHousehold").value = prof.household || "unknown");
  $("surveyAgeBand") && ($("surveyAgeBand").value = prof.ageBand || "unknown");
  closeModal("onboardingModal");
  openModal("surveyModal");
}
window.openSurvey = openSurvey;

function finishSurvey(){
  const prof = {
    household: $("surveyHousehold")?.value || "unknown",
    ageBand: $("surveyAgeBand")?.value || "unknown"
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
  };
  saveJSON(LS_FIXED, fixedAll);

  loadProfileToUI();
  $("settingsMonth") && ($("settingsMonth").value = m);
  $("scoreMonth") && ($("scoreMonth").value = m);
  loadMonthlySettings(m);
  refreshSavingLabel();
  localStorage.setItem(LS_ONBOARD, "1");
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
  buildCatCards();

  const tryAdvanceQuality = ()=>{
    if(entryStep !== "quality") return;
    const sat = ($("entrySat")?.value || "").trim();
    const trig = ($("entryTrigger")?.value || "").trim();
    if(sat && trig) showEntryStep("memo");
  };
  $("entrySat")?.addEventListener("change", tryAdvanceQuality);
  $("entryTrigger")?.addEventListener("change", tryAdvanceQuality);
  $("qualitySkipBtn")?.addEventListener("click", ()=>{
    if(entryStep === "quality") showEntryStep("memo");
  });

  $("entryPrevDay")?.addEventListener("click", ()=> openEntryModal(addDays(SELECTED_DATE, -1), { keepCategory:true }));
  $("entryNextDay")?.addEventListener("click", ()=> openEntryModal(addDays(SELECTED_DATE, +1), { keepCategory:true }));

  $("entryPrimaryBtn")?.addEventListener("click", handleEntryPrimary);
  $("entryCloseBtn")?.addEventListener("click", closeEntryModal);

  ["entryModal","dayDetailModal","resultModal","savingModal","surveyModal","editModal"].forEach(id=>{
    const ov = $(id);
    if(!ov) return;
    ov.addEventListener("click", (e)=>{ if(e.target === ov) closeModal(id); });
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
