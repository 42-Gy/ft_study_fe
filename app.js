import { MockApi } from './mockApi.js';

// 1. 상태(State) 관리
const state = {
  me: null,
  activeTab: 'item',
};

// 2. DOM 요소 선택
const elements = {
  tokenInput: document.getElementById('token-input'),
  searchBtn: document.getElementById('search-btn'),
  resultContainer: document.getElementById('result-container'),
  errorMsg: document.getElementById('error-msg'),
  
  // 내 정보 영역
  userName: document.getElementById('user-name'),
  userEmail: document.getElementById('user-email'),
  userRole: document.getElementById('user-role'),
  userCoin: document.getElementById('user-coin'),
  
  // 대여 영역
  lockerNum: document.getElementById('locker-num'),
  rentalStart: document.getElementById('rental-start'),
  rentalEnd: document.getElementById('rental-end'),
  rentalBadge: document.getElementById('rental-badge'),

  // 테이블 영역
  tableHead: document.getElementById('table-head'),
  tableBody: document.getElementById('table-body'),
  tabs: document.querySelectorAll('.tab'),
  statusFilter: document.getElementById('status-filter'),
};

// 3. 메인 함수: 데이터 가져오기
async function fetchUserData() {
  const inputToken = elements.tokenInput.value.trim();

  elements.errorMsg.classList.add('hidden');
  elements.resultContainer.classList.add('hidden');
  elements.searchBtn.textContent = '로딩중...';

  try {
    const finalToken = inputToken.startsWith('Bearer ') ? inputToken : `Bearer ${inputToken}`;
    const data = await MockApi.getUsersMe({ token: inputToken ? finalToken : null }); 
    state.me = data; // 성공 상태
    renderUserInfo();
    renderRentalInfo();
    renderTable();
    
    elements.resultContainer.classList.remove('hidden');

  } catch (error) { // 실패 상태
    elements.errorMsg.textContent = error.message;
    elements.errorMsg.classList.remove('hidden');
  } finally {
    elements.searchBtn.textContent = '조회';
  }
}
// 4. 화면 렌더링 함수들
function renderUserInfo() {
  const { user } = state.me;
  elements.userName.textContent = user.name;
  elements.userEmail.textContent = user.email;
  elements.userRole.textContent = user.role;
  elements.userCoin.textContent = `${user.coin.toLocaleString()} 수박씨 🍉`;
}

function renderRentalInfo() {
  const rental = state.me.user.rentals[0];

  if (rental) {
    elements.lockerNum.textContent = `${rental.locker} (${rental.area})`;
    elements.rentalStart.textContent = rental.startDate;
    elements.rentalEnd.textContent = rental.endDate;
    elements.rentalBadge.textContent = '대여중';
    elements.rentalBadge.classList.add('good');
    elements.rentalBadge.classList.remove('bad');
    
    if (rental.status === 'overdue') {
      elements.rentalBadge.textContent = '연체됨';
      elements.rentalBadge.classList.add('bad');
      elements.rentalBadge.classList.remove('good');
    }
  } else {
    elements.lockerNum.textContent = '-';
    elements.rentalBadge.textContent = '미대여';
    elements.rentalBadge.classList.remove('good', 'bad');
  }
}
function renderTable() {
  const isItemTab = state.activeTab === 'item';
  let list = isItemTab ? [...state.me.items] : [...state.me.coins]; 

  // 1. 날짜 Date로 변환 후 비교
  list.sort((a, b) => new Date(b.date) - new Date(a.date));

  const filterValue = elements.statusFilter.value;
  
  if (filterValue !== 'all') {
    list = list.filter(item => {
      if (isItemTab) {
        if (filterValue === 'active') return item.status === '보유중';
        if (filterValue === 'used') return item.status === '사용 완료';
      } else {
        if (filterValue === 'active') return item.amount > 0;
        if (filterValue === 'used') return item.amount < 0;
      }
    });
  }

  // 3. 빈 상태(Empty State) 처리
  if (list.length === 0) {
    elements.tableBody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align: center; padding: 40px 0; color: var(--muted);">
          <div style="font-size: 24px; margin-bottom: 8px;">텅...</div>
          <div>조건에 맞는 내역이 없습니다.</div>
        </td>
      </tr>`;
    elements.tableHead.innerHTML = isItemTab 
    ? `<tr><th>아이템명</th><th>설명</th><th>날짜</th><th>상태</th></tr>`
    : `<tr><th>내용</th><th>변동액</th><th>날짜</th></tr>`;
    return;
  }

  // 4. 테이블 헤더 그리기
  elements.tableHead.innerHTML = isItemTab 
    ? `<tr><th>아이템명</th><th>설명</th><th>날짜</th><th>상태</th></tr>`
    : `<tr><th>내용</th><th>변동액</th><th>날짜</th></tr>`;

  // 5. 테이블 바디 그리기
  elements.tableBody.innerHTML = list.map(item => {
    if (isItemTab) {
      const statusClass = item.status === '보유중' ? 'good' : '';
      return `
        <tr>
          <td style="font-weight: bold;">${item.name}</td>
          <td style="color: var(--muted); font-size: 12px;">${item.desc || '-'}</td>
          <td>${item.date}</td>
          <td><span class="badge ${statusClass}">${item.status}</span></td>
        </tr>`;
    } else {
      const isPlus = item.amount > 0;
      const amountClass = isPlus ? 'good' : 'bad';
      const amountStr = isPlus ? `+${item.amount}` : item.amount;
      return `
        <tr>
          <td>${item.detail}</td>
          <td style="color: var(--${amountClass}); font-weight: bold;">${amountStr} 수박씨</td>
          <td>${item.date}</td>
        </tr>`;
    }
  }).join('');
}

// 5. 이벤트 리스너 등록
elements.searchBtn.addEventListener('click', fetchUserData);
elements.tabs.forEach(tab => {
  tab.addEventListener('click', (e) => {
    elements.tabs.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    e.target.classList.add('active');
    e.target.setAttribute('aria-selected', 'true');
    
    state.activeTab = e.target.dataset.tab;
    elements.statusFilter.value = 'all';
    renderTable();
  });
});
elements.statusFilter.addEventListener('change', () => {
  renderTable();
});