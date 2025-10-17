// Global State
let currentDate = new Date();
const dateLabel = document.getElementById('date-label');
const prevBtn = document.getElementById('prev-day-btn');
const nextBtn = document.getElementById('next-day-btn');
let currentView = 'live';

// Format date label
function formatDateLabel(date) {
    const today = new Date();
    const diffDays = Math.round((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === -1) return 'Yesterday';
    if (diffDays === 1) return 'Tomorrow';
    return 'Today';
}

// Update date UI
function updateDateUI() {
    const label = formatDateLabel(currentDate);
    dateLabel.textContent = label;
    prevBtn.disabled = label === 'Yesterday';
    nextBtn.disabled = label === 'Tomorrow';
    resetCollapsibleSections();
}

// Reset collapsible sections
function resetCollapsibleSections() {
    const sections = document.querySelectorAll('.collapsible-content');
    sections.forEach(content => {
        content.classList.add('is-expanded');
        const button = content.previousElementSibling;
        const arrowIcon = button ? button.querySelector('[data-arrow-icon]') : null;
        if (arrowIcon) arrowIcon.style.transform = 'rotate(0deg)';
    });
    const toggleAllBtn = document.getElementById('toggleAllBtn');
    if (toggleAllBtn) toggleAllBtn.textContent = 'Hide all';
}

// Toggle single league
function toggleLeague(button) {
    const content = button.nextElementSibling;
    const arrowIcon = button.querySelector('[data-arrow-icon]');
    if (content) {
        const isExpanded = content.classList.toggle('is-expanded');
        if (arrowIcon) arrowIcon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
    }
}

// Toggle all leagues
function toggleAllSections() {
    const sections = document.querySelectorAll('.collapsible-content');
    const toggleAllBtn = document.getElementById('toggleAllBtn');
    let allExpanded = sections[0] ? sections[0].classList.contains('is-expanded') : true;
    let newState = !allExpanded;
    sections.forEach(content => {
        const button = content.previousElementSibling;
        const arrowIcon = button ? button.querySelector('[data-arrow-icon]') : null;
        if (newState) {
            content.classList.add('is-expanded');
            if (arrowIcon) arrowIcon.style.transform = 'rotate(0deg)';
        } else {
            content.classList.remove('is-expanded');
            if (arrowIcon) arrowIcon.style.transform = 'rotate(180deg)';
        }
    });
    toggleAllBtn.textContent = newState ? 'Show all' : 'Hide all';
}

// Switch main view
function switchView(viewName) {
    currentView = viewName;
    document.querySelectorAll('.view-content').forEach(el => el.classList.add('hidden'));
    const targetContent = document.getElementById(`${viewName}-content`);
    if (targetContent) targetContent.classList.remove('hidden');
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if (btn.dataset.view === viewName) {
            btn.classList.remove('filter-btn-inactive');
            btn.classList.add('filter-btn-active');
            btn.style.backgroundColor = (viewName === 'live') ? '#ef4444' : '#34d399';
        } else {
            btn.classList.remove('filter-btn-active');
            btn.classList.add('filter-btn-inactive');
            btn.style.backgroundColor = '#374151';
        }
    });
    const toggleAllBtn = document.getElementById('toggleAllBtn');
    if (toggleAllBtn) toggleAllBtn.classList.toggle('hidden', viewName !== 'live');
}

// Sidebar functions
function openSidebar() {
    document.getElementById('sidebar').classList.add('open');
    document.getElementById('sidebar-overlay').classList.remove('hidden');
}
function closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebar-overlay').classList.add('hidden');
}

// Initialization
window.onload = function() {
    updateDateUI();
    prevBtn.addEventListener('click', () => {
        currentDate.setDate(currentDate.getDate() - 1);
        updateDateUI();
    });
    nextBtn.addEventListener('click', () => {
        currentDate.setDate(currentDate.getDate() + 1);
        updateDateUI();
    });
    const toggleAllBtn = document.getElementById('toggleAllBtn');
    if (toggleAllBtn) toggleAllBtn.addEventListener('click', toggleAllSections);
};