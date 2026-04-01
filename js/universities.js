// ===== UNIVERSITIES DATA =====
const UNIVERSITIES = [
  // PUBLIC
  { name: "University of Nairobi", county: "Nairobi", type: "public", icon: "🏛️" },
  { name: "Kenyatta University", county: "Kiambu", type: "public", icon: "🎓" },
  { name: "Moi University", county: "Uasin Gishu", type: "public", icon: "🏫" },
  { name: "Egerton University", county: "Nakuru", type: "public", icon: "🌾" },
  { name: "Jomo Kenyatta University of Agriculture and Technology", county: "Kiambu", type: "public", icon: "⚙️" },
  { name: "Maseno University", county: "Kisumu", type: "public", icon: "🎓" },
  { name: "Masinde Muliro University of Science and Technology", county: "Kakamega", type: "public", icon: "🔬" },
  { name: "Technical University of Kenya", county: "Nairobi", type: "public", icon: "🔧" },
  { name: "Technical University of Mombasa", county: "Mombasa", type: "public", icon: "⚓" },
  { name: "Pwani University", county: "Kilifi", type: "public", icon: "🌊" },
  { name: "Chuka University", county: "Tharaka-Nithi", type: "public", icon: "🏔️" },
  { name: "Laikipia University", county: "Laikipia", type: "public", icon: "🌿" },
  { name: "South Eastern Kenya University", county: "Kitui", type: "public", icon: "🌅" },
  { name: "Meru University of Science and Technology", county: "Meru", type: "public", icon: "🔭" },
  { name: "Multimedia University of Kenya", county: "Nairobi", type: "public", icon: "📡" },
  { name: "Dedan Kimathi University of Technology", county: "Nyeri", type: "public", icon: "💡" },
  { name: "Kisii University", county: "Kisii", type: "public", icon: "📚" },
  { name: "University of Eldoret", county: "Uasin Gishu", type: "public", icon: "🏃" },
  // PRIVATE
  { name: "Strathmore University", county: "Nairobi", type: "private", icon: "💼" },
  { name: "United States International University Africa (USIU)", county: "Nairobi", type: "private", icon: "🌍" },
  { name: "Daystar University", county: "Machakos", type: "private", icon: "⭐" },
  { name: "Mount Kenya University", county: "Kiambu", type: "private", icon: "🏔️" },
  { name: "Catholic University of Eastern Africa (CUEA)", county: "Nairobi", type: "private", icon: "✝️" },
  { name: "Africa Nazarene University", county: "Kajiado", type: "private", icon: "🕊️" },
  { name: "Kenya Methodist University (KeMU)", county: "Meru", type: "private", icon: "📖" },
  { name: "Kabarak University", county: "Nakuru", type: "private", icon: "🌄" },
  { name: "Zetech University", county: "Kiambu", type: "private", icon: "💻" },
  { name: "Riara University", county: "Nairobi", type: "private", icon: "🎯" },
];

// ===== RENDER UNIVERSITIES =====
function renderUniversities(filter = { type: "all", search: "", county: "all" }) {
  const container = document.getElementById('uniList');
  if (!container) return;

  let filtered = UNIVERSITIES.filter(u => {
    const matchType = filter.type === "all" || u.type === filter.type;
    const matchSearch = !filter.search || u.name.toLowerCase().includes(filter.search.toLowerCase()) || u.county.toLowerCase().includes(filter.search.toLowerCase());
    const matchCounty = filter.county === "all" || u.county === filter.county;
    return matchType && matchSearch && matchCounty;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<div style="padding:32px;text-align:center;color:var(--gray);">No universities found for your search.</div>`;
    return;
  }

  container.innerHTML = filtered.map(u => `
    <div class="uni-card">
      <div class="uni-icon">${u.icon}</div>
      <div style="flex:1">
        <div class="uni-name">${u.name}</div>
        <div class="uni-county">📍 ${u.county} County</div>
      </div>
      <span class="uni-type-badge ${u.type === 'public' ? 'badge-public' : 'badge-private'}">
        ${u.type === 'public' ? 'Public' : 'Private'}
      </span>
    </div>
  `).join('');
}

// ===== POPULATE COUNTY FILTER =====
function populateCountyFilter() {
  const select = document.getElementById('countyFilter');
  if (!select) return;
  const counties = [...new Set(UNIVERSITIES.map(u => u.county))].sort();
  counties.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = `${c} County`;
    select.appendChild(opt);
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  populateCountyFilter();
  renderUniversities();

  let activeType = "all";

  // Tab clicks
  document.querySelectorAll('.uni-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.uni-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeType = tab.dataset.type;
      applyFilters();
    });
  });

  function applyFilters() {
    renderUniversities({
      type: activeType,
      search: document.getElementById('uniSearch')?.value || '',
      county: document.getElementById('countyFilter')?.value || 'all'
    });
  }

  document.getElementById('uniSearch')?.addEventListener('input', applyFilters);
  document.getElementById('countyFilter')?.addEventListener('change', applyFilters);
});