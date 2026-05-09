// script.js - Nave Sports v1.0

// Elements
const contentArea = document.getElementById('content-area');
const btnYesterday = document.getElementById('btn-yesterday');
const btnToday = document.getElementById('btn-today');
const btnTomorrow = document.getElementById('btn-tomorrow');
const dateLabel = document.getElementById('date-label');
const prevBtn = document.getElementById('prev-day-btn');
const nextBtn = document.getElementById('next-day-btn');

let currentDate = new Date(); // reference date shown in label (Today initially)
let currentView = 'today'; // 'yesterday' | 'today' | 'tomorrow'

// Sidebar controls
function openSidebar() {
  document.getElementById('sidebar').classList.remove('-translate-x-full');
  document.getElementById('sidebar-overlay').classList.remove('hidden');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.add('-translate-x-full');
  document.getElementById('sidebar-overlay').classList.add('hidden');
}

// format the label (Today, Yesterday, Tomorrow)
function formatLabel(d) {
  const today = new Date();
  const diff = Math.round((d - today)/(1000*60*60*24));
  if (diff === 0) return 'Today';
  if (diff === -1) return 'Yesterday';
  if (diff === 1) return 'Tomorrow';
  return d.toDateString();
}

// load a small html fragment into content area
function loadFragment(file) {
  fetch(file).then(r=>{
    if(!r.ok) throw new Error('Fetch failed');
    return r.text();
  }).then(html=>{
    contentArea.innerHTML = html;
  }).catch(e=>{
    contentArea.innerHTML = '<div class="card"><p class="text-red-400">Could not load content.</p></div>';
    console.error(e);
  });
}

// wiring buttons to load fragments
btnYesterday.addEventListener('click', ()=>{
  setActiveView('yesterday');
});
btnToday.addEventListener('click', ()=>{
  setActiveView('today');
});
btnTomorrow.addEventListener('click', ()=>{
  setActiveView('tomorrow');
});

function setActiveView(view) {
  currentView = view;
  // update button styles
  [btnYesterday, btnToday, btnTomorrow].forEach(b=> b.classList.remove('bg-accent-green','text-white','font-semibold'));
  if (view === 'yesterday') btnYesterday.classList.add('bg-accent-green','text-white','font-semibold');
  if (view === 'today') btnToday.classList.add('bg-accent-green','text-white','font-semibold');
  if (view === 'tomorrow') btnTomorrow.classList.add('bg-accent-green','text-white','font-semibold');

  // load corresponding fragment
  if (view === 'yesterday') loadFragment('yesterday.html');
  if (view === 'today') loadFragment('today.html');
  if (view === 'tomorrow') loadFragment('tomorrow.html');
}

// Date prev/next (limits to Yesterday..Tomorrow)
prevBtn.addEventListener('click', ()=>{
  const yesterday = new Date(); yesterday.setDate(yesterday.getDate()-1);
  if (currentDate > yesterday) {
    currentDate.setDate(currentDate.getDate()-1);
    dateLabel.textContent = formatLabel(currentDate);
  }
});
nextBtn.addEventListener('click', ()=>{
  const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate()+1);
  if (currentDate < tomorrow) {
    currentDate.setDate(currentDate.getDate()+1);
    dateLabel.textContent = formatLabel(currentDate);
  }
});

// load default view
document.addEventListener('DOMContentLoaded', ()=>{
  dateLabel.textContent = formatLabel(currentDate);
  setActiveView('today');
  // attach overlay click to close
  document.getElementById('sidebar-overlay').addEventListener('click', closeSidebar);
});
