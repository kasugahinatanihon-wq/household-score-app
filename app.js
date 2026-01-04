const LS_TX = "tx";
const LS_FIXED = "fixed_month";
const LS_PROFILE = "user_profile";
const LS_ONBOARD = "onboarding_done";

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
  weekly: { qualitySpend: 9000, qualityScore: 58 },
  monthly: { qualitySpend: 35000, qualityScore: 60 },
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

function renderHappinessScatter({ title, youX, youY, avgX, avgY }){
  const hasYou = Number.isFinite(youX) && Number.isFinite(youY);
  const hasAvg = Number.isFinite(avgX) && Number.isFinite(avgY);
  const xMax = niceMax(Math.max(youX||0, avgX||0, 1));
  const yMax = 100;

  const w = 320;
  const h = 200;
  const pad = { left:44, right:16, top:14, bottom:36 };
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;

  const xTo = (x)=> pad.left + (x / xMax) * plotW;
  const yTo = (y)=> pad.top + (1 - (y / yMax)) * plotH;

  const xMid = xMax / 2;
  const yMid = 50;

  const youPoint = hasYou ? `<circle class="scatterPoint you" cx="${xTo(youX)}" cy="${yTo(youY)}" r="5"></circle>` : "";
  const avgPoint = hasAvg ? `<rect class="scatterPoint avg" x="${xTo(avgX)-5}" y="${yTo(avgY)-5}" width="10" height="10" rx="2"></rect>` : "";

  return `
    <div class="sectionCard">
      <div class="sectionHead">
        <div><div class="sectionName">${escapeHtml(title)}</div><div class="sectionHint">横軸：質カテゴリ支出 / 縦軸：質スコア</div></div>
        <div class="sectionScore">比較</div>
      </div>
      <div class="scatterWrap">
        <svg class="scatterSvg" viewBox="0 0 ${w} ${h}" role="img" aria-label="幸福度の比較分布">
          <line class="scatterAxis" x1="${pad.left}" y1="${pad.top}" x2="${pad.left}" y2="${pad.top + plotH}"></line>
          <line class="scatterAxis" x1="${pad.left}" y1="${pad.top + plotH}" x2="${pad.left + plotW}" y2="${pad.top + plotH}"></line>

          <line class="scatterGrid" x1="${pad.left}" y1="${yTo(yMid)}" x2="${pad.left + plotW}" y2="${yTo(yMid)}"></line>
          <line class="scatterGrid" x1="${xTo(xMid)}" y1="${pad.top}" x2="${xTo(xMid)}" y2="${pad.top + plotH}"></line>

          <text class="scatterTick" x="${pad.left}" y="${pad.top + plotH + 18}" text-anchor="middle">0</text>
          <text class="scatterTick" x="${xTo(xMid)}" y="${pad.top + plotH + 18}" text-anchor="middle">${Math.round(xMid).toLocaleString("ja-JP")}</text>
          <text class="scatterTick" x="${pad.left + plotW}" y="${pad.top + plotH + 18}" text-anchor="middle">${Math.round(xMax).toLocaleString("ja-JP")}</text>

          <text class="scatterTick" x="${pad.left - 8}" y="${pad.top + plotH}" text-anchor="end">0</text>
          <text class="scatterTick" x="${pad.left - 8}" y="${yTo(yMid)+4}" text-anchor="end">50</text>
          <text class="scatterTick" x="${pad.left - 8}" y="${pad.top + 4}" text-anchor="end">100</text>

          ${avgPoint}
          ${youPoint}
        </svg>
        <div class="scatterLegend">● あなた / ■ アプリ内平均（仮）</div>
      </div>
      ${!hasYou ? `<div class="small" style="margin-top:6px;">データが少ないため、あなたの点はまだ表示されません。</div>` : ""}
    </div>
  `;
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

let CAL_ANCHOR = monthStart(new Date());
let SELECTED_DATE = ymd(new Date());
let entryStep = "category"; // category -> amount -> details

function setEntryStep(step){
  entryStep = step;
  const btn = $("entryPrimaryBtn");
  if(!btn) return;
  btn.textContent = (step === "details") ? "保存" : "次へ";
}

/* ===== Modal helpers ===== */
function openModal(id){
  const el = $(id);
  if(!el) return;
  el.style.display = "flex";
  el.classList.remove("hidden");
}
function closeModal(id){
  const el = $(id);
  if(!el) return;
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

  if(name === "input") renderCalendar();
  if(name === "list") renderList();
  if(name === "score") syncScoreMonthDefault();
  if(name === "profile") loadProfileToUI();
}
window.switchScreen = switchScreen;

/* ===== Calendar ===== */
function calMove(delta){
  CAL_ANCHOR.setMonth(CAL_ANCHOR.getMonth() + delta);
  renderCalendar();
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
  const wrap = $("entryCatArea");
  if(!wrap) return;

  const ICON = {
    食費:"🍚", 外食費:"🍜", 日用品:"🧻", 衣服:"👕", 美容:"💄", 交際費:"🍻",
    医療費:"🏥", 教育費:"📚", 交通費:"🚃", コンビニ:"🏪", カフェ:"☕",
    デート:"💑", 趣味:"🎮", 仕事:"💼"
  };

  wrap.innerHTML = CATEGORIES.map(c=>`
    <div class="catCard" data-cat="${escapeHtml(c)}">
      <div class="icon">${ICON[c] || "🧾"}</div>
      <div class="label">${escapeHtml(c)}</div>
    </div>
  `).join("");

  wrap.querySelectorAll(".catCard").forEach(card=>{
    card.addEventListener("click", ()=> selectCategory(card.dataset.cat));
  });
}

function selectCategory(cat){
  $("entryCategoryHidden").value = cat;
  document.querySelectorAll("#entryCatArea .catCard").forEach(c=>{
    c.classList.toggle("active", c.dataset.cat === cat);
  });

  // ✅ カテゴリ選択で“下”の入力欄を出す（カテゴリの下にある）
  $("entryFields").style.display = "";
  $("entrySatWrap").style.display = "none";
  $("entryMsg").textContent = "";

  setEntryStep("amount");

  // ✅ 自然に「金額欄」へスクロール＆フォーカス
  $("amountRow").scrollIntoView({behavior:"smooth", block:"center"});
  setTimeout(()=> $("entryAmount").focus(), 250);
}

function openEntryModal(dt){
  SELECTED_DATE = dt;
  $("txDate") && ($("txDate").value = dt);
  $("entryDateText") && ($("entryDateText").textContent = dt);

  // reset
  $("entryMsg").textContent = "";
  $("entryFields").style.display = "none";
  $("entryAmount").value = "";
  $("entryMemoTop").value = "";
  $("entrySat").value = "";
  $("entryTrigger").value = "";
  $("entryNote").value = "";
  $("entrySatWrap").style.display = "none";

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

  setEntryStep("category");
  renderEntryDayBox(dt);
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
  const note = isQ ? ($("entryNote").value||"").trim() : "";
  const memoTop = ($("entryMemoTop").value||"").trim();

  const id = (crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2);
  const tx = loadTx();
  tx.push({ id, date: dt, category: cat, amount: amt, satisfaction: sat, trigger: trig, trigMemo: note, memo: memoTop });
  saveTx(tx);
  localStorage.setItem("last_cat", cat);
  return true;
}

function handleEntryPrimary(){
  if(entryStep === "category"){
    toast("カテゴリを選んでね");
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
      $("entrySatWrap").style.display = "";
      setEntryStep("details");
      $("entrySatWrap").scrollIntoView({behavior:"smooth", block:"start"});
      return;
    }

    if(saveEntry()) afterEntrySaved();
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

function calcPublicRates(txListForMonth, fixed){
  const baseTxTotal = txListForMonth.reduce((a,b)=>a+Number(b.amount||0),0);
  const sums = sumByPublicCategory(txListForMonth);

  const fixedHousing = Number(fixed?.housingYen||0);
  const fixedUtilities = Number(fixed?.utilityYen||0);
  const fixedComm = Number(fixed?.netYen||0);
  const fixedSub = Number(fixed?.subYen||0);

  sums.HOUSING += fixedHousing;
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
    HOUSING: userTotal>0 ? sums.HOUSING / userTotal : null,
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
    <div class="small compareLegend">● あなた / ▲ 目安（スケール上限50%）・緑=良い / 赤=改善</div>
    <div class="small" style="margin-top:8px;">住居は国土交通省 住宅情報データ（都内）目安28%（暫定）</div>
    <div class="small" style="margin-top:6px;">出典：総務省 家計調査（家計収支編）2024年 二人以上世帯・月次中央値</div>
  `;
}

/* ===== Weekly / Monthly ===== */
function donutHTML(score){
  const p = clamp(Math.round(score), 0, 100);
  return `
    <div class="donutWrap">
      <div class="donut" style="--p:${p};"></div>
      <div class="donutValue"><span>${p}</span><span>/100</span></div>
    </div>
  `;
}

function getLastWeekRange(){
  const now = new Date();
  const day = now.getDay();
  const thisWeekSun = new Date(now);
  thisWeekSun.setHours(0,0,0,0);
  thisWeekSun.setDate(now.getDate() - day);

  const lastWeekSun = new Date(thisWeekSun);
  lastWeekSun.setDate(thisWeekSun.getDate() - 7);

  const lastWeekSat = new Date(thisWeekSun);
  lastWeekSat.setDate(thisWeekSun.getDate() - 1);

  return { start:lastWeekSun, end:lastWeekSat };
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

function openWeeklyReport(){
  const { start, end } = getLastWeekRange();
  const days = daysBetweenInclusive(start, end);

  const allTx = loadTx().filter(t => days.includes(t.date));
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

  const period = `${ymd(start)}（日）〜${ymd(end)}（土）`;

  const view = $("modalResultView");
  const txt = $("modalResultText");

  view.innerHTML = `
    <div class="resultWrap">
      <div class="pill" style="margin-bottom:10px;">週次（先週：日〜土）</div>
      <div class="small" style="margin-bottom:12px;">期間：${escapeHtml(period)}</div>

      <div class="scoreCard">
        <div class="scoreTop">
          ${donutHTML(weeklyScore)}
          <div>
            <div class="bigTitle">週次スコア：<span class="scoreValue">${weeklyScore}<span class="scoreUnit">/100</span></span></div>
            <div class="scoreSub">記録習慣＋質（納得）＋後悔の少なさをまとめた簡易スコア</div>
          </div>
        </div>

        <div class="kpiGrid">
          <div class="kpiBox"><div class="kpiT">総支出</div><div class="kpiV">${Math.round(spend).toLocaleString("ja-JP")}円</div></div>
          <div class="kpiBox"><div class="kpiT">記録日数</div><div class="kpiV">${daysWithEntry}日</div></div>
          <div class="kpiBox"><div class="kpiT">質スコア（納得）</div><div class="kpiV">${qualityScore==null?"—":`${qualityScore}/100`}</div></div>
          <div class="kpiBox"><div class="kpiT">納得入力カバー</div><div class="kpiV">${coveragePct}%</div></div>
        </div>
      </div>

      ${renderHappinessScatter({
        title:"幸福度分布（週次）",
        youX: qx.qSpend,
        youY: qualityScore,
        avgX: APP_AVG_PLACEHOLDER.weekly.qualitySpend,
        avgY: APP_AVG_PLACEHOLDER.weekly.qualityScore
      })}
    </div>
  `;

  txt.textContent =
`週次（先週：日〜土）
期間：${period}
週次スコア：${weeklyScore}/100
総支出：${Math.round(spend)}円
記録日数：${daysWithEntry}日
質スコア（納得）：${qualityScore==null?"—":qualityScore+"/100"}
納得入力カバー率：${coveragePct}%`;

  $("weeklyBadge") && ($("weeklyBadge").textContent = "開封済");
  openModal("resultModal");
}
window.openWeeklyReport = openWeeklyReport;

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

function showMonthlyScore(){
  const m = $("scoreMonth").value;
  const income = Number($("incomeYen").value||0);
  const saving = Number($("savingYen").value||0);

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

  if(fixedRate!=null) score -= clamp((fixedRate-0.30)*80, 0, 20);
  if(varRate!=null) score -= clamp((varRate-0.35)*80, 0, 25);
  if(regretRate!=null) score -= clamp(regretRate*30, 0, 30);
  if(savingRate!=null) score += clamp((savingRate-0.15)*80, -10, 20);

  score = clamp(Math.round(score), 0, 100);

  const rr = regretRate==null ? "—" : `${Math.round(regretRate*100)}%`;
  const sr = savingRate==null ? "—" : `${Math.round(savingRate*100)}%`;
  const fr = fixedRate==null ? "—" : `${Math.round(fixedRate*100)}%`;
  const vr = varRate==null ? "—" : `${Math.round(varRate*100)}%`;

  const savingsScore = savingRate==null ? 50 : clamp(Math.round(50 + (savingRate-0.15)*200), 0, 100);
  const fixedScore   = fixedRate==null ? 50 : clamp(Math.round(100 - Math.max(0, (fixedRate-0.30))*220), 0, 100);
  const varScore     = varRate==null   ? 50 : clamp(Math.round(100 - Math.max(0, (varRate-0.35))*220), 0, 100);
  const qualityShow  = qualityScore==null ? 0 : qualityScore;
  const qualityLabel = qualityScore==null ? "対象なし" : `${qualityShow}/100`;

  const publicRates = calcPublicRates(tx, fixed);

  const view = $("modalResultView");
  const txt = $("modalResultText");

  view.innerHTML = `
    <div class="resultWrap">
      <div class="pill" style="margin-bottom:10px;">月次診断：${escapeHtml(m)}</div>

      <div class="scoreCard">
        <div class="scoreTop">
          ${donutHTML(score)}
          <div>
            <div class="bigTitle">総合スコア：<span class="scoreValue">${score}<span class="scoreUnit">/100</span></span></div>
            <div class="scoreSub">貯蓄・固定・変動・質（後悔率）をまとめた総合診断</div>
          </div>
        </div>

        <div class="kpiGrid">
          <div class="kpiBox"><div class="kpiT">貯蓄率</div><div class="kpiV">${sr}</div></div>
          <div class="kpiBox"><div class="kpiT">固定費率</div><div class="kpiV">${fr}</div></div>
          <div class="kpiBox"><div class="kpiT">変動費率</div><div class="kpiV">${vr}</div></div>
          <div class="kpiBox"><div class="kpiT">後悔率（質）</div><div class="kpiV">${rr}</div></div>
        </div>
      </div>

      <div class="sectionCard">
        <div class="sectionHead">
          <div><div class="sectionName">貯蓄</div><div class="sectionHint">貯蓄率が高いほど良い</div></div>
          <div class="sectionScore">${savingsScore}/100</div>
        </div>
        <div class="progress"><div style="width:${savingsScore}%;"></div></div>
      </div>

      <div class="sectionCard">
        <div class="sectionHead">
          <div><div class="sectionName">固定費</div><div class="sectionHint">固定費率が低いほど良い</div></div>
          <div class="sectionScore">${fixedScore}/100</div>
        </div>
        <div class="progress"><div style="width:${fixedScore}%;"></div></div>
      </div>

      <div class="sectionCard">
        <div class="sectionHead">
          <div><div class="sectionName">変動費</div><div class="sectionHint">変動費率が低いほど良い</div></div>
          <div class="sectionScore">${varScore}/100</div>
        </div>
        <div class="progress"><div style="width:${varScore}%;"></div></div>
      </div>

      <div class="sectionCard">
        <div class="sectionHead">
          <div><div class="sectionName">質（納得）</div><div class="sectionHint">未入力が多いと最大-20点</div></div>
          <div class="sectionScore">${qualityLabel}</div>
        </div>
        <div class="progress"><div style="width:${qualityShow}%;"></div></div>
        <div class="small" style="margin-top:10px;">
          質カテゴリ合計：${Math.round(qx.qSpend).toLocaleString("ja-JP")}円 / 納得入力カバー率：${coveragePct}%
        </div>
      </div>

      <div class="sectionCard">
        <div class="sectionHead">
          <div><div class="sectionName">比較（公的ベンチマーク）</div><div class="sectionHint">中央値ベースで比較</div></div>
          <div class="sectionScore">率（%）</div>
        </div>
        ${renderPublicCompareTable(publicRates)}
      </div>

      ${renderHappinessScatter({
        title:"幸福度分布（月次）",
        youX: qx.qSpend,
        youY: qualityScore,
        avgX: APP_AVG_PLACEHOLDER.monthly.qualitySpend,
        avgY: APP_AVG_PLACEHOLDER.monthly.qualityScore
      })}

      <!-- ✅ 月次の内訳：モーダルがスクロール対応なので必ず見れる -->
      <div class="sectionCard">
        <div class="sectionHead">
          <div><div class="sectionName">金額（円）</div><div class="sectionHint">内訳</div></div>
          <div class="sectionScore"></div>
        </div>
        <div class="bar" style="justify-content:space-between;"><div>手取り</div><div style="font-weight:1100;">${income.toLocaleString("ja-JP")}</div></div>
        <div class="bar" style="justify-content:space-between;"><div>貯蓄</div><div style="font-weight:1100;">${saving.toLocaleString("ja-JP")}</div></div>
        <div class="bar" style="justify-content:space-between;"><div>固定費</div><div style="font-weight:1100;">${fixedSum.toLocaleString("ja-JP")}</div></div>
        <div class="bar" style="justify-content:space-between;"><div>変動費</div><div style="font-weight:1100;">${varSpend.toLocaleString("ja-JP")}</div></div>
        <div class="bar" style="justify-content:space-between;"><div>質カテゴリ合計</div><div style="font-weight:1100;">${Math.round(qx.qSpend).toLocaleString("ja-JP")}</div></div>
      </div>

      <div style="height:10px;"></div>
    </div>
  `;

  txt.textContent =
`月次診断：${m}
総合スコア：${score}/100

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

  openModal("resultModal");
}
window.showMonthlyScore = showMonthlyScore;

/* ===== List ===== */
function renderList(){
  const input = $("viewMonth");
  const target = input && input.value ? input.value : ym(new Date());
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
    return `
      <tr>
        <td>${escapeHtml(t.date)}</td>
        <td>${escapeHtml(t.category)}</td>
        <td class="num">${Number(t.amount||0).toLocaleString("ja-JP")}</td>
        <td class="center">${escapeHtml(sat)}</td>
        <td>${escapeHtml(trig)}</td>
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
  [1,2,3].forEach(i=>{
    const el = $("slide"+i);
    if(el) el.style.display = (i===n) ? "" : "none";
  });
}
window.nextSlide = nextSlide;

function finishOnboarding(){
  localStorage.setItem(LS_ONBOARD, "1");
  closeModal("onboardingModal");
}
window.finishOnboarding = finishOnboarding;

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

  $("entryPrevDay")?.addEventListener("click", ()=> openEntryModal(addDays(SELECTED_DATE, -1)));
  $("entryNextDay")?.addEventListener("click", ()=> openEntryModal(addDays(SELECTED_DATE, +1)));

  $("entryPrimaryBtn")?.addEventListener("click", handleEntryPrimary);
  $("entryCloseBtn")?.addEventListener("click", closeEntryModal);

  ["entryModal","dayDetailModal","resultModal"].forEach(id=>{
    const ov = $(id);
    if(!ov) return;
    ov.addEventListener("click", (e)=>{ if(e.target === ov) closeModal(id); });
  });

  if($("viewMonth") && !$("viewMonth").value) $("viewMonth").value = ym(new Date());
  if($("scoreMonth") && !$("scoreMonth").value) $("scoreMonth").value = ym(new Date());

  loadProfileToUI();

  if(!localStorage.getItem(LS_ONBOARD)){
    nextSlide(1);
    openModal("onboardingModal");
  }else{
    closeModal("onboardingModal");
  }

  renderCalendar();
  renderList();
  switchScreen("input");
}

init();
