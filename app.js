const LS_TX = "tx";
const LS_FIXED = "fixed_month";
const LS_INCOME = "income_month";
const LS_PROFILE = "user_profile";
const LS_ONBOARD = "onboarding_done";
const LS_SAVING = "saving_month";

const CATEGORIES = [
  "食費","外食費","日用品","衣服","美容","交際費","医療費","教育費",
  "交通費","コンビニ","カフェ",
  "デート","趣味","仕事"
];

const QUALITY_TARGET = new Set(["外食費","交際費","デート","趣味","カフェ","コンビニ"]);

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

function renderHappinessScatterContent({ youX, youY, avgX, avgY, xMid=50, yMid=70 }){
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
      <div class="scatterLegend">● あなた / ■ アプリ内平均（仮）</div>
    </div>
    ${!hasYou ? `<div class="small" style="margin-top:6px;">データが少ないため、次の月に精度が上がります（まずは記録と★でOK）</div>` : ""}
    <div class="small muted guideLine">納得して使えていて、かつ家計への負担が軽いほど右上に近づきます</div>
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

function buildSummaryTextMonthly({ savingsScore, fixedScore, varScore, qualityScore }){
  const parts = [
    { key:"貯蓄", score: savingsScore },
    { key:"固定費", score: fixedScore },
    { key:"変動費", score: varScore },
    { key:"納得（質）", score: Number.isFinite(qualityScore) ? qualityScore : null },
  ].filter(p=>Number.isFinite(p.score));

  if(parts.length === 0){
    return "今月の特徴は、これから見えてきます。";
  }

  const sorted = [...parts].sort((a,b)=>b.score - a.score);
  const topA = sorted[0]?.key;
  const topB = sorted[1]?.key;
  const bottom = sorted[sorted.length - 1]?.key;

  if(topA && topB && bottom){
    return `${topA}と${topB}は安定しています。${bottom}は伸びしろです。`;
  }
  return `${topA}に特徴が出ています。`;
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
function switchScreen(name){
  const map = { input:"screen-input", list:"screen-list", score:"screen-score", profile:"screen-profile" };
  Object.values(map).forEach(id=>{
    const el = $(id);
    if(el) el.classList.toggle("active", id === map[name]);
  });
  ["input","list","score","profile"].forEach(t=>{
    const b = $("tab-"+t);
    if(b) b.classList.toggle("active", t===name);
  });

  if(name === "list"){
    renderCalendar();
    renderList();
  }
  if(name === "score") syncScoreMonthDefault();
  if(name === "profile") loadProfileToUI();
}
window.switchScreen = switchScreen;

function switchScoreView(view){
  const weekly = $("score-weekly");
  const monthly = $("score-monthly");
  if(weekly) weekly.style.display = (view === "weekly") ? "" : "none";
  if(monthly) monthly.style.display = (view === "monthly") ? "" : "none";
  $("scoreTab-weekly")?.classList.toggle("active", view === "weekly");
  $("scoreTab-monthly")?.classList.toggle("active", view === "monthly");
  if(view === "weekly") renderWeeklyInline();
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

  const preset = opts.presetCategory || $("entryCategoryHidden").value;
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
  const now = new Date();
  const time = `${pad2(now.getHours())}:${pad2(now.getMinutes())}`;
  const tx = loadTx();
  tx.push({ id, date: dt, category: cat, amount: amt, satisfaction: sat, trigger: trig, trigMemo: note, memo: memoTop, time });
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
}

function closeEntryModal(){
  closeModal("entryModal");
}

function deleteTx(id){
  const next = loadTx().filter(t=>t.id !== id);
  saveTx(next);
}

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
          <button class="danger" style="padding:8px 10px; font-size:12px;" type="button" data-del="${t.id}">削除</button>
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

/* ===== Weekly / Monthly ===== */
function getScoreState(score){
  if(score < 50) return "bad";
  if(score < 75) return "mid";
  return "good";
}
function getStateColorVar(state){
  const map = {
    bad: "var(--state-bad)",
    mid: "var(--state-mid)",
    good: "var(--state-good)",
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

/* ===== Time Insights ===== */
function bucketFromTime(timeStr){
  if(!timeStr || !/^\d{2}:\d{2}$/.test(timeStr)) return "不明";
  const h = Number(timeStr.split(":")[0]);
  if(Number.isNaN(h)) return "不明";
  if(h >= 5 && h < 10) return "朝";
  if(h >= 10 && h < 14) return "昼";
  if(h >= 14 && h < 18) return "夕";
  if(h >= 18 && h < 22) return "夜";
  if(h >= 22 || h < 2) return "深夜";
  if(h >= 2 && h < 5) return "明け方";
  return "不明";
}

function buildTimeInsights(txList){
  const spendBy = {};
  const regretBy = {};
  const triggerBy = {};

  for(const t of txList){
    const bucket = bucketFromTime(t.time);
    if(!spendBy[bucket]) spendBy[bucket] = 0;
    spendBy[bucket] += Number(t.amount||0);

    const isRegret = QUALITY_TARGET.has(t.category)
      && Number.isFinite(Number(t.satisfaction))
      && Number(t.satisfaction) <= 2;
    if(isRegret){
      if(!regretBy[bucket]) regretBy[bucket] = 0;
      regretBy[bucket] += Number(t.amount||0);
      if(t.trigger){
        if(!triggerBy[t.trigger]) triggerBy[t.trigger] = 0;
        triggerBy[t.trigger] += 1;
      }
    }
  }

  const topN = (obj, n)=>{
    const entries = Object.entries(obj).sort((a,b)=> b[1]-a[1]).slice(0, n);
    return entries.map(([k,v])=>({ key:k, value:v }));
  };

  const topSpend = topN(spendBy, 3);
  const topRegret = topN(regretBy, 3);
  const topTrigger = topN(triggerBy, 1);

  return {
    spendTop: topSpend.length ? topSpend : [{ key:"—", value:null }],
    regretTop: topRegret.length ? topRegret : [{ key:"—", value:null }],
    regretTrigger: topTrigger.length && topTrigger[0].key ? (TRIGGER_LABEL[topTrigger[0].key] || topTrigger[0].key) : "—",
  };
}

function renderTimeRank(items){
  return items.map((it, idx)=>{
    const amt = (it.value == null || !Number.isFinite(it.value)) ? "—" : `${Math.round(it.value).toLocaleString("ja-JP")}円`;
    return `${idx+1}. ${it.key} ${amt}`;
  }).join(" / ");
}

function renderTimeRankLines(items){
  const out = [];
  for(let i=0;i<3;i++){
    const it = items[i];
    if(!it){
      out.push(`—`);
      continue;
    }
    const amt = (it.value == null || !Number.isFinite(it.value)) ? "—" : `${Math.round(it.value).toLocaleString("ja-JP")}円`;
    out.push(`${it.key} ${amt}`);
  }
  return out;
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
  const timeInsights = buildTimeInsights(allTx);
  const weeklyState = getScoreState(weeklyScore);

  const spendLines = renderTimeRankLines(timeInsights.spendTop);
  const regretLines = renderTimeRankLines(timeInsights.regretTop);

  const html = `
    <div class="resultWrap">
      <div class="insightRow twoCol animIn a1">
        <div class="summaryCard weeklySummary score--${weeklyState}">
          <div class="summaryGrid">
            <div>
              <div class="summaryTitle">週次スコア</div>
              <div class="summaryLead">${escapeHtml(summaryWeekly)}</div>
              <div class="summaryMeta">期間：${escapeHtml(period)}</div>
            </div>
            <div class="summaryRight">
              ${donutHTML(weeklyScore, { size:"xxl" })}
            </div>
          </div>
        </div>

        <div class="sectionCard">
          <div class="sectionHead">
            <div><div class="sectionName">行動の質（納得）</div><div class="sectionHint">選んだ支出の納得度を可視化</div></div>
            <div class="sectionScore">今週</div>
          </div>
          <div>
            <div class="metricBlock">
              <div class="metricLabel">質スコア（今週のお金の使い方は、どれくらい納得できていたか）</div>
              <div class="small" style="margin-bottom:6px;">${qualityScore==null?"—":`${qualityScore}/100`}</div>
              <div class="miniBar"><div style="--w:${qualityScore==null?0:qualityScore}%;"></div></div>
            </div>
            <div class="metricBlock" style="margin-top:8px;">
              <div class="metricLabel">納得効率（使ったお金のうち、どれくらいが“後悔の少ないお金”だったか）</div>
              <div class="small" style="margin-bottom:6px;">${weeklyEff==null?"—":`${weeklyEff}/100`}</div>
              <div class="miniBar"><div style="--w:${weeklyEff==null?0:weeklyEff}%;"></div></div>
            </div>
            <div class="metricBlock" style="margin-top:8px;">
              <div class="metricLabel">納得度入力率</div>
              <div class="small" style="margin-bottom:6px;">${coveragePct}%</div>
              <div class="miniBar"><div style="--w:${coveragePct}%;"></div></div>
            </div>
          </div>
        </div>
      </div>

      <div class="insightRow twoCol animIn a2">
        <div class="sectionCard">
          <div class="sectionHead">
            <div><div class="sectionName">他者比較マップ（週次）</div><div class="sectionHint">横軸：支出コントロール / 縦軸：納得効率</div></div>
            <div class="sectionScore">比較</div>
          </div>
          ${renderHappinessScatterContent({
            youX: weeklySpendControl,
            youY: weeklyEff,
            avgX: APP_AVG_PLACEHOLDER.weekly.spendControl,
            avgY: APP_AVG_PLACEHOLDER.weekly.satisfactionEfficiency
            ,xMid:70
            ,yMid:70
          })}
        </div>
        <div class="sectionCard">
          <div class="sectionHead">
            <div><div class="sectionName">行動分析（時間帯）</div><div class="sectionHint">記録時刻を朝/昼/夕/夜/深夜/明け方で集計</div></div>
            <div class="sectionScore">上位3</div>
          </div>
          <div class="insightCard">
            <div style="font-weight:900; color:var(--ink);">支出が多い時間帯</div>
            ${spendLines.map((line, idx)=> `<div>${idx+1}. ${escapeHtml(line)}</div>`).join("")}
          </div>
          <div class="insightCard" style="margin-top:8px;">
            <div style="font-weight:900; color:var(--ink);">後悔が多い時間帯</div>
            ${regretLines.map((line, idx)=> `<div>${idx+1}. ${escapeHtml(line)}</div>`).join("")}
            <div class="small" style="margin-top:4px;">きっかけ：${escapeHtml(timeInsights.regretTrigger)}</div>
          </div>
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

  let score = 70;
  const savingRate = income>0 ? (saving/income) : null;
  const fixedRate = income>0 ? (fixedSum/income) : null;
  const varRate = income>0 ? (varSpend/income) : null;

  if(fixedRate!=null) score -= clamp((fixedRate-0.25)*80, 0, 25);
  if(varRate!=null) score -= clamp((varRate-0.35)*80, 0, 25);
  if(regretRate!=null) score -= clamp(regretRate*30, 0, 30);
  if(savingRate!=null) score += clamp((savingRate-0.15)*80, -10, 20);

  score = clamp(Math.round(score), 0, 100);

  const rr = regretRate==null ? "—" : `${Math.round(regretRate*100)}%`;
  const sr = savingRate==null ? "—" : `${Math.round(savingRate*100)}%`;
  const fr = fixedRate==null ? "—" : `${Math.round(fixedRate*100)}%`;
  const vr = varRate==null ? "—" : `${Math.round(varRate*100)}%`;

  const savingsScore = savingRate==null ? 50 : clamp(Math.round(50 + (savingRate-0.15)*200), 0, 100);
  const fixedScore   = fixedRate==null ? 50 : clamp(Math.round(100 - Math.max(0, (fixedRate-0.25))*220), 0, 100);
  const varScore     = varRate==null   ? 50 : clamp(Math.round(100 - Math.max(0, (varRate-0.35))*220), 0, 100);
  const qualityShow  = qualityScore==null ? 0 : qualityScore;
  const qualityLabel = qualityScore==null ? "対象なし" : `${qualityShow}/100`;
  const totalSpend = fixedSum + varSpend;
  const satisfactionEfficiency = calcSatisfactionEfficiency(qualityScore, qx.qSpend, varSpend);
  const spendControl = income > 0 ? clamp(Math.round((1 - (totalSpend / income)) * 100), 0, 100) : null;

  const publicRates = calcPublicRates(tx, fixed, income);

  const summaryMonthly = buildSummaryTextMonthly({ savingsScore, fixedScore, varScore, qualityScore });
  const timeInsights = buildTimeInsights(tx);
  const monthlyState = getScoreState(score);
  const spendLines = renderTimeRankLines(timeInsights.spendTop);
  const regretLines = renderTimeRankLines(timeInsights.regretTop);

  const html = `
    <div class="resultWrap">
      <div class="summaryCard animIn a1 score--${monthlyState}">
        <div class="summaryGrid">
          <div>
            <div class="summaryTitle">月次レポート：${escapeHtml(m)}</div>
            <div class="summaryLead">${escapeHtml(summaryMonthly)}</div>
            <div class="summaryMeta">総合スコアは現在地。良し悪しではなく、状態を知るための指標です</div>
          </div>
          <div class="summaryRight">
            ${donutHTML(score, { size:"lg" })}
          </div>
        </div>
      </div>

      <div class="structureCard animIn a2">
        <div class="summaryTitle">家計の構造</div>
        <div class="structureGrid">
          <div class="metricCard">
            <div class="metricName">貯蓄</div>
            <div class="metricValue numEmph">${savingsScore}/100</div>
            <div class="metricSub">貯蓄率：${sr}</div>
            <div class="miniProgress"><div style="--w:${savingsScore}%;"></div></div>
          </div>
          <div class="metricCard">
            <div class="metricName">固定費</div>
            <div class="metricValue numEmph">${fixedScore}/100</div>
            <div class="metricSub">固定費率：${fr}</div>
            <div class="miniProgress"><div style="--w:${fixedScore}%;"></div></div>
          </div>
          <div class="metricCard">
            <div class="metricName">変動費</div>
            <div class="metricValue numEmph">${varScore}/100</div>
            <div class="metricSub">変動費率：${vr}</div>
            <div class="miniProgress"><div style="--w:${varScore}%;"></div></div>
          </div>
        </div>
      </div>

      <div class="insightRow twoCol animIn a3">
        <div class="sectionCard">
          <div class="sectionHead">
            <div><div class="sectionName">行動の質（納得）</div><div class="sectionHint">選んだ支出の納得度を可視化</div></div>
            <div class="sectionScore">今月</div>
          </div>
          <div>
            <div class="metricBlock">
              <div class="metricLabel">質スコア（今月のお金の使い方は、どれくらい納得できていたか）</div>
              <div class="small" style="margin-bottom:6px;">${qualityLabel}</div>
              <div class="miniBar"><div style="--w:${qualityShow}%;"></div></div>
            </div>
            <div class="metricBlock" style="margin-top:8px;">
              <div class="metricLabel">納得効率（使ったお金のうち、どれくらいが“後悔の少ないお金”だったか）</div>
              <div class="small" style="margin-bottom:6px;">${satisfactionEfficiency==null?"—":`${satisfactionEfficiency}/100`}</div>
              <div class="miniBar"><div style="--w:${satisfactionEfficiency==null?0:satisfactionEfficiency}%;"></div></div>
            </div>
            <div class="metricBlock" style="margin-top:8px;">
              <div class="metricLabel">納得度入力率</div>
              <div class="small" style="margin-bottom:6px;">${coveragePct}%</div>
              <div class="miniBar"><div style="--w:${coveragePct}%;"></div></div>
            </div>
          </div>
        </div>
        <div class="sectionCard">
          <div class="sectionHead">
            <div><div class="sectionName">行動マップ（月次）</div><div class="sectionHint">横軸：支出コントロール / 縦軸：納得効率</div></div>
            <div class="sectionScore">比較</div>
          </div>
          ${renderHappinessScatterContent({
            youX: spendControl,
            youY: satisfactionEfficiency,
            avgX: APP_AVG_PLACEHOLDER.monthly.spendControl,
            avgY: APP_AVG_PLACEHOLDER.monthly.satisfactionEfficiency
            ,xMid:70
            ,yMid:70
          })}
        </div>
      </div>

      <div class="sectionCard animIn a4">
        <div class="sectionHead">
          <div><div class="sectionName">支出配分の比較（中央値）</div><div class="sectionHint">参考情報として見てください</div></div>
          <div class="sectionScore">比較</div>
        </div>
        <div class="small muted">この比較は、良し悪しを判断するものではありません</div>
        <div class="small muted">世の中の傾向との違いを知るための参考情報です</div>
        <div class="small muted">中央値より低くても、納得して使えているなら問題ありません</div>
        <div style="height:8px;"></div>
        ${renderPublicCompareTable(publicRates)}
      </div>

      <div class="sectionCard animIn a5">
        <div class="sectionHead">
          <div><div class="sectionName">行動分析（時間帯）</div><div class="sectionHint">記録時刻を朝/昼/夕/夜/深夜/明け方で集計</div></div>
          <div class="sectionScore">上位3</div>
        </div>
        <div class="insightCard">
          <div style="font-weight:900; color:var(--ink);">支出が多い時間帯</div>
          ${spendLines.map((line, idx)=> `<div>${idx+1}. ${escapeHtml(line)}</div>`).join("")}
        </div>
        <div class="insightCard" style="margin-top:8px;">
          <div style="font-weight:900; color:var(--ink);">後悔が多い時間帯</div>
          ${regretLines.map((line, idx)=> `<div>${idx+1}. ${escapeHtml(line)}</div>`).join("")}
          <div class="small" style="margin-top:4px;">きっかけ：${escapeHtml(timeInsights.regretTrigger)}</div>
        </div>
      </div>

      <div class="sectionCard animIn a6">
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

      <div style="height:10px;"></div>
    </div>
  `;

  const text =
`月次レポート：${m}
総合スコア：${score}/100
納得効率：${satisfactionEfficiency==null?"—":satisfactionEfficiency+"/100"}

貯蓄率：${sr}
固定費率：${fr}
変動費率：${vr}
後悔率（納得<=2）：${rr}

質スコア（納得）：${qualityScore==null?"—":qualityScore+"/100"}
納得入力カバー率：${coveragePct}%

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
        <td>${escapeHtml(t.date)}</td>
        <td>${escapeHtml(t.category)}</td>
        <td class="num">${Number(t.amount||0).toLocaleString("ja-JP")}</td>
        <td class="center">${escapeHtml(sat)}</td>
        <td>${escapeHtml(trig)}</td>
        <td>${escapeHtml(memo)}</td>
        <td class="num"><button class="danger" style="padding:8px 10px; font-size:12px;" type="button" data-del="${t.id}">削除</button></td>
      </tr>
    `;
  }).join("");

  area.innerHTML = `
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
  `;

  area.querySelectorAll("[data-del]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      deleteTx(btn.dataset.del);
      toast("削除しました");
      renderList();
      renderCalendar();
    });
  });
}
window.renderList = renderList;

function clearMonthTx(){
  const input = $("viewMonth");
  const target = input && input.value ? input.value : ym(new Date());
  if(!confirm(`${target} のデータを削除しますか？（元に戻せません）`)) return;

  const next = loadTx().filter(t=> !(t.date && t.date.startsWith(target)));
  saveTx(next);

  toast("月データを削除しました");
  renderList();
  renderCalendar();
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

  $("entryPrevDay")?.addEventListener("click", ()=> openEntryModal(addDays(SELECTED_DATE, -1)));
  $("entryNextDay")?.addEventListener("click", ()=> openEntryModal(addDays(SELECTED_DATE, +1)));

  $("entryPrimaryBtn")?.addEventListener("click", handleEntryPrimary);
  $("entryCloseBtn")?.addEventListener("click", closeEntryModal);

  ["entryModal","dayDetailModal","resultModal","savingModal","surveyModal"].forEach(id=>{
    const ov = $(id);
    if(!ov) return;
    ov.addEventListener("click", (e)=>{ if(e.target === ov) closeModal(id); });
  });

  if($("viewMonth") && !$("viewMonth").value) $("viewMonth").value = ym(CAL_ANCHOR);
  if($("scoreMonth") && !$("scoreMonth").value) $("scoreMonth").value = ym(new Date());
  if($("settingsMonth") && !$("settingsMonth").value) $("settingsMonth").value = ym(new Date());

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
  $("incomeYen")?.addEventListener("input", ()=>{});

  loadProfileToUI();

  if(!localStorage.getItem(LS_ONBOARD)){
    nextSlide(1);
    openModal("onboardingModal");
  }else{
    closeModal("onboardingModal");
  }

  renderCalendar();
  renderList();
  refreshSavingLabel();
  renderWeeklyInline();
  switchScoreView("weekly");
  loadMonthlySettings($("settingsMonth")?.value || ym(new Date()));
  switchScreen("input");
}

init();
