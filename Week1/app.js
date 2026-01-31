const $ = (selector, scope = document) => scope.querySelector(selector);

const state = {
  me: null,
  activeTab: "items",
  itemStatusFilter: "ALL",
  sort: "DATE_DESC",
};

function setStatus(type, text) {
  const statusArea = $("#statusArea");
  const badge = statusArea.querySelector(".badge");
  const statusText = statusArea.querySelector(".status-text");

  badge.classList.remove("good", "bad");
  if (type === "GOOD") badge.classList.add("good");
  if (type === "BAD") badge.classList.add("bad");

  badge.textContent = type;
  statusText.textContent = text;
}

function formatCoin(n) {
  return new Intl.NumberFormat("ko-KR").format(n);
}

function safeText(value) {
  return value === null || value === undefined || value === "" ? "-" : String(value);
}

function toDateKey(value) {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? 0 : d.getTime();
}

function clearSkeleton() {
  $("#profileArea").classList.remove("skeleton");
  $("#rentalArea").classList.remove("skeleton");
}

function renderProfile(me) {
  const el = $("#profileArea");

  // TODO: me.data를 사용해 내 정보 영역을 채우세요.
  // 힌트: el.innerHTML = `...` 형태로 row를 구성합니다.
  el.innerHTML = "";
}

function renderRental(me) {
  const el = $("#rentalArea");

  // TODO: me.data를 사용해 대여 현황 영역을 채우세요.
  el.innerHTML = "";
}

function applyItemFiltersAndSort(items) {
  // TODO: 상태 필터(state.itemStatusFilter) + 날짜 정렬(state.sort) 적용
  return items;
}

function renderItemHistories(me) {
  const tbody = $("#itemHistoryTbody");
  const items = me?.data?.itemHistories ?? [];
  const filtered = applyItemFiltersAndSort(items);

  // TODO: filtered 데이터를 사용해 tbody를 렌더링하세요.
  // TODO: 빈 데이터일 때 안내 row를 추가하세요.
  tbody.innerHTML = "";
}

function renderCoinHistories(me) {
  const tbody = $("#coinHistoryTbody");
  const coins = me?.data?.coinHistories ?? [];

  // TODO: coins 데이터를 날짜 정렬 후 tbody를 렌더링하세요.
  // TODO: 증감 색상(+/-)을 스타일로 표현해 보세요.
  tbody.innerHTML = "";
}

function renderAll() {
  if (!state.me) return;
  clearSkeleton();
  renderProfile(state.me);
  renderRental(state.me);
  renderItemHistories(state.me);
  renderCoinHistories(state.me);
}

async function loadMe() {
  try {
    setStatus("LOADING", "데이터 불러오는 중...");
    const tokenValue = $("#tokenInput").value.trim();

    // TODO: Bearer 토큰 규칙을 적용하세요.
    // 예) "Bearer " 접두가 없으면 자동으로 붙이기
    const token = tokenValue;

    // TODO: MockApi.getUsersMe 호출
    const res = await MockApi.getUsersMe({ token });
    state.me = res;

    // TODO: 성공 상태 표시 + renderAll 호출
    setStatus("GOOD", "불러오기 성공");
    renderAll();
  } catch (err) {
    state.me = null;

    // TODO: 에러 상태 메시지 구성 (status/code/message)
    setStatus("BAD", "불러오기 실패");

    $("#itemHistoryTbody").innerHTML = "";
    $("#coinHistoryTbody").innerHTML = "";
  }
}

function setActiveTab(tab) {
  state.activeTab = tab;

  // TODO: 탭 버튼의 활성 상태 및 aria-selected를 업데이트하세요.
  // TODO: tab-items / tab-coins 패널 hidden 토글 구현
}

function bindEvents() {
  $("#reloadBtn").addEventListener("click", loadMe);

  document.querySelectorAll(".tab").forEach((btn) => {
    btn.addEventListener("click", () => setActiveTab(btn.dataset.tab));
  });

  $("#itemStatusFilter").addEventListener("change", (e) => {
    state.itemStatusFilter = e.target.value;
    if (state.me) renderItemHistories(state.me);
  });

  $("#sortSelect").addEventListener("change", (e) => {
    state.sort = e.target.value;
    if (state.me) {
      renderItemHistories(state.me);
      renderCoinHistories(state.me);
    }
  });
}

(function init() {
  bindEvents();
  setActiveTab("items");
})();
