// ===== SMARTFUTURE COURSE RECOMMENDER =====
// ⚠️ After deploying backend to Render, replace this URL:
const BACKEND_URL = "https://smartfuture254-backend.onrender.com";

// ===== GRADE TO POINTS MAPPING =====
const GRADE_POINTS = {
  "A": 12, "A-": 11, "B+": 10, "B": 9, "B-": 8,
  "C+": 7, "C": 6, "C-": 5, "D+": 4, "D": 3, "D-": 2, "E": 1
};

// Grade rank for comparison
const GRADE_RANK = {
  "A": 12, "A-": 11, "B+": 10, "B": 9, "B-": 8,
  "C+": 7, "C": 6, "C-": 5, "D+": 4, "D": 3, "D-": 2, "E": 1
};

function gradeGTE(g1, g2) {
  return (GRADE_RANK[g1] || 0) >= (GRADE_RANK[g2] || 0);
}

// ===== COURSE DATABASE =====
const COURSES = [
  // C+ level
  { name: "Information Technology", minGrade: "C+", highIncome: false, category: "Computing & IT", req: {}, clusterSubjects: ["Math","Physics","English","Chemistry"] },
  { name: "Computer Science", minGrade: "C+", highIncome: true, category: "Computing & IT", req: { Math: "C+" }, clusterSubjects: ["Math","Physics","English","Chemistry"] },
  { name: "Software Engineering", minGrade: "C+", highIncome: true, category: "Computing & IT", req: { Math: "C+" }, clusterSubjects: ["Math","Physics","English","Chemistry"] },
  { name: "Cyber Security", minGrade: "C+", highIncome: true, category: "Computing & IT", req: { Math: "C+" }, clusterSubjects: ["Math","Physics","English","Chemistry"] },
  { name: "Data Science", minGrade: "C+", highIncome: true, category: "Computing & IT", req: { Math: "C+" }, clusterSubjects: ["Math","Physics","English","Chemistry"] },
  { name: "Bachelor of Commerce", minGrade: "C+", highIncome: false, category: "Business", req: {}, clusterSubjects: ["Math","English","Geography","Biology"] },
  { name: "Business Administration", minGrade: "C+", highIncome: false, category: "Business", req: {}, clusterSubjects: ["Math","English","Geography","Biology"] },
  { name: "Procurement & Supply Chain", minGrade: "C+", highIncome: false, category: "Business", req: {}, clusterSubjects: ["Math","English","Geography","Biology"] },
  { name: "Human Resource Management", minGrade: "C+", highIncome: false, category: "Business", req: {}, clusterSubjects: ["Math","English","Geography","Biology"] },
  { name: "Marketing", minGrade: "C+", highIncome: false, category: "Business", req: {}, clusterSubjects: ["Math","English","Geography","Biology"] },
  { name: "Entrepreneurship", minGrade: "C+", highIncome: true, category: "Business", req: {}, clusterSubjects: ["Math","English","Geography","Biology"] },
  { name: "Bachelor of Education (Arts)", minGrade: "C+", highIncome: false, category: "Education", req: {}, clusterSubjects: ["English","Kiswahili","Geography","History"] },
  { name: "Bachelor of Education (Science)", minGrade: "C+", highIncome: false, category: "Education", req: { Math: "C+", Biology: "C+" }, clusterSubjects: ["Math","Biology","Chemistry","Physics"] },
  { name: "Sociology", minGrade: "C+", highIncome: false, category: "Social Sciences", req: {}, clusterSubjects: ["English","History","Geography","Biology"] },
  { name: "Political Science", minGrade: "C+", highIncome: false, category: "Social Sciences", req: {}, clusterSubjects: ["English","History","Geography","Biology"] },
  { name: "International Relations", minGrade: "C+", highIncome: false, category: "Social Sciences", req: {}, clusterSubjects: ["English","History","Geography","Biology"] },
  { name: "Journalism", minGrade: "C+", highIncome: false, category: "Arts & Media", req: {}, clusterSubjects: ["English","Kiswahili","History","Geography"] },
  { name: "Mass Communication", minGrade: "C+", highIncome: false, category: "Arts & Media", req: {}, clusterSubjects: ["English","Kiswahili","History","Geography"] },
  { name: "Agribusiness", minGrade: "C+", highIncome: false, category: "Agriculture", req: {}, clusterSubjects: ["Biology","Chemistry","Math","Geography"] },
  { name: "Environmental Science", minGrade: "C+", highIncome: false, category: "Agriculture", req: {}, clusterSubjects: ["Biology","Chemistry","Math","Geography"] },
  { name: "Nutrition & Dietetics", minGrade: "C+", highIncome: false, category: "Agriculture", req: { Biology: "C+" }, clusterSubjects: ["Biology","Chemistry","Math","Physics"] },

  // B- level
  { name: "Economics", minGrade: "B-", highIncome: false, category: "Finance", req: { Math: "B-" }, clusterSubjects: ["Math","English","Geography","Biology"] },
  { name: "Statistics", minGrade: "B-", highIncome: false, category: "Finance", req: { Math: "B-" }, clusterSubjects: ["Math","Physics","Chemistry","Biology"] },
  { name: "Geography & GIS", minGrade: "B-", highIncome: false, category: "Geography", req: { Geography: "C+" }, clusterSubjects: ["Math","Geography","Biology","Chemistry"] },
  { name: "Construction Management", minGrade: "B-", highIncome: false, category: "Technical", req: {}, clusterSubjects: ["Math","Physics","Chemistry","English"] },
  { name: "Quantity Surveying", minGrade: "B-", highIncome: false, category: "Technical", req: {}, clusterSubjects: ["Math","Physics","Chemistry","English"] },

  // B level
  { name: "Civil Engineering", minGrade: "B", highIncome: true, category: "Engineering", req: { Math: "B", Physics: "B" }, clusterSubjects: ["Math","Physics","Chemistry","English"] },
  { name: "Electrical Engineering", minGrade: "B", highIncome: true, category: "Engineering", req: { Math: "B", Physics: "B" }, clusterSubjects: ["Math","Physics","Chemistry","English"] },
  { name: "Mechanical Engineering", minGrade: "B", highIncome: true, category: "Engineering", req: { Math: "B", Physics: "B" }, clusterSubjects: ["Math","Physics","Chemistry","English"] },
  { name: "Nursing", minGrade: "B", highIncome: false, category: "Health", req: { Biology: "B", Chemistry: "C+" }, clusterSubjects: ["Biology","Chemistry","Physics","Math"] },
  { name: "Public Health", minGrade: "B", highIncome: false, category: "Health", req: { Biology: "B" }, clusterSubjects: ["Biology","Chemistry","Physics","Math"] },

  // B+ level
  { name: "Bachelor of Laws (LLB)", minGrade: "B+", highIncome: true, category: "Law", req: { English: "B" }, clusterSubjects: ["English","Kiswahili","History","Geography"] },
  { name: "Architecture", minGrade: "B+", highIncome: true, category: "Architecture", req: { Math: "B+" }, clusterSubjects: ["Math","Physics","Chemistry","English"] },
  { name: "Finance", minGrade: "B+", highIncome: true, category: "Business", req: { Math: "B+" }, clusterSubjects: ["Math","English","Physics","Chemistry"] },
  { name: "Actuarial Science", minGrade: "B+", highIncome: true, category: "Finance", req: { Math: "B+" }, clusterSubjects: ["Math","Physics","Chemistry","Biology"] },

  // A- level
  { name: "Pharmacy", minGrade: "A-", highIncome: true, category: "Medical", req: { Biology: "B+", Chemistry: "B+", Math: "B" }, clusterSubjects: ["Biology","Chemistry","Physics","Math"] },
  { name: "Dentistry", minGrade: "A-", highIncome: true, category: "Medical", req: { Biology: "B+", Chemistry: "B+", Math: "B" }, clusterSubjects: ["Biology","Chemistry","Physics","Math"] },
  { name: "Medical Laboratory Science", minGrade: "A-", highIncome: false, category: "Medical", req: { Biology: "B+", Chemistry: "B+" }, clusterSubjects: ["Biology","Chemistry","Physics","Math"] },

  // A level
  { name: "Medicine & Surgery (MBChB)", minGrade: "A", highIncome: true, category: "Medical", req: { Biology: "A-", Chemistry: "A-", Math: "B+" }, clusterSubjects: ["Biology","Chemistry","Physics","Math"] },
];

// Grade hierarchy for filtering
const GRADE_ORDER = ["C+", "B-", "B", "B+", "A-", "A"];

function gradeIndex(g) { return GRADE_ORDER.indexOf(g); }

function meetsMinGrade(studentGrade, minGrade) {
  const sIdx = gradeIndex(studentGrade);
  const mIdx = gradeIndex(minGrade);
  if (sIdx === -1 || mIdx === -1) return false;
  return sIdx >= mIdx;
}

function meetsSubjectReqs(subjects, requirements) {
  for (const [subj, minGrade] of Object.entries(requirements)) {
    const studentGrade = subjects[subj];
    if (!studentGrade) return false;
    if (!gradeGTE(studentGrade, minGrade)) return false;
  }
  return true;
}

// ===== CLUSTER POINTS CALCULATOR =====
function calculateClusterPoints(course, subjects) {
  const clusterSubjs = course.clusterSubjects;
  let points = 0;
  const breakdown = {};
  const used = [];

  for (const subj of clusterSubjs) {
    if (subjects[subj] && GRADE_POINTS[subjects[subj]]) {
      const p = GRADE_POINTS[subjects[subj]];
      breakdown[subj] = p;
      points += p;
      used.push(subj);
    }
  }

  return {
    course: course.name,
    clusterSubjectsUsed: used,
    pointsBreakdown: breakdown,
    clusterPoints: points,
    maxPoints: used.length * 12
  };
}

// ===== MAIN RECOMMENDER =====
function recommendCourses(meanGrade, subjects) {
  const eligible = COURSES.filter(course => {
    return meetsMinGrade(meanGrade, course.minGrade) && meetsSubjectReqs(subjects, course.req);
  });

  // Sort: high income first, then by grade
  eligible.sort((a, b) => {
    if (a.highIncome && !b.highIncome) return -1;
    if (!a.highIncome && b.highIncome) return 1;
    return gradeIndex(b.minGrade) - gradeIndex(a.minGrade);
  });

  // Add cluster points
  return eligible.map(course => ({
    ...course,
    cluster: calculateClusterPoints(course, subjects)
  }));
}

// ===== PAYMENT FLOW =====
let currentReference = null;
let statusPollInterval = null;
let savedStudentData = null;

function getStudentData() {
  const meanGrade = document.getElementById('meanGrade')?.value;
  if (!meanGrade) return null;
  const subjects = {};
  ['Math','English','Biology','Chemistry','Physics','History','Geography','Kiswahili','CRE','Business'].forEach(subj => {
    const el = document.getElementById('subj_' + subj);
    if (el && el.value) subjects[subj] = el.value;
  });
  return { meanGrade, subjects };
}

function openPaymentModal() {
  const data = getStudentData();
  if (!data || !data.meanGrade) {
    alert('Please select your Mean Grade first.');
    return;
  }
  savedStudentData = data;

  const modal = document.getElementById('paymentModal');
  if (modal) modal.classList.add('active');
}

function closePaymentModal() {
  const modal = document.getElementById('paymentModal');
  if (modal) modal.classList.remove('active');
}

async function initiatePayment() {
  const phone = document.getElementById('payPhone')?.value?.trim();
  if (!phone) { alert('Please enter your phone number.'); return; }

  const payBtn = document.getElementById('payBtn');
  const payStatus = document.getElementById('payStatus');

  payBtn.disabled = true;
  payBtn.innerHTML = '<span style="display:inline-block;width:20px;height:20px;border:2px solid rgba(255,255,255,0.4);border-top-color:white;border-radius:50%;animation:spin 0.8s linear infinite;"></span> Sending STK Push...';

  payStatus.innerHTML = '';

  try {
    const res = await fetch(`${BACKEND_URL}/api/pay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, amount: 1, studentData: savedStudentData })
    });

    const data = await res.json();

    if (data.success) {
      currentReference = data.reference;
      payStatus.innerHTML = `
        <div style="background:#e8f5e9;border-radius:10px;padding:14px;color:#2e7d32;font-weight:500;">
          📱 STK Push sent! Check your phone and enter your M-PESA PIN.<br>
          <small style="color:#555">Reference: ${data.reference}</small>
        </div>`;
      payBtn.innerHTML = '⏳ Waiting for payment...';
      startPolling(data.reference);
    } else {
      throw new Error(data.error || 'Payment failed');
    }
  } catch (err) {
    payStatus.innerHTML = `<div style="background:#ffebee;border-radius:10px;padding:14px;color:#c62828;">❌ ${err.message}. Please try again.</div>`;
    payBtn.disabled = false;
    payBtn.innerHTML = '💳 Pay KSh 1 Now';
  }
}

function startPolling(reference) {
  let attempts = 0;
  const maxAttempts = 30; // Poll for 60 seconds

  statusPollInterval = setInterval(async () => {
    attempts++;
    try {
      const res = await fetch(`${BACKEND_URL}/api/status/${reference}`);
      const data = await res.json();

      if (data.status === 'success') {
        clearInterval(statusPollInterval);
        closePaymentModal();
        showResults(savedStudentData.meanGrade, savedStudentData.subjects);
      } else if (data.status === 'failed') {
        clearInterval(statusPollInterval);
        document.getElementById('payStatus').innerHTML = `<div style="background:#ffebee;border-radius:10px;padding:14px;color:#c62828;">❌ Payment failed. Please try again.</div>`;
        document.getElementById('payBtn').disabled = false;
        document.getElementById('payBtn').innerHTML = '💳 Pay KSh 1 Now';
      } else if (attempts >= maxAttempts) {
        clearInterval(statusPollInterval);
        document.getElementById('payStatus').innerHTML = `<div style="background:#fff3e0;border-radius:10px;padding:14px;color:#e65100;">⏰ Timeout. Use "Check Status" to verify payment.</div>`;
        document.getElementById('payBtn').disabled = false;
        document.getElementById('payBtn').innerHTML = '💳 Try Again';
        document.getElementById('checkStatusBtn')?.classList.remove('hidden');
      }
    } catch (e) { /* network error, keep trying */ }
  }, 2000);
}

async function checkPaymentStatus() {
  if (!currentReference) { alert('No active payment session.'); return; }
  try {
    const res = await fetch(`${BACKEND_URL}/api/status/${currentReference}`);
    const data = await res.json();
    if (data.status === 'success') {
      closePaymentModal();
      showResults(savedStudentData.meanGrade, savedStudentData.subjects);
    } else {
      alert(`Payment status: ${data.status || 'pending'}. If you paid, wait a few seconds and try again.`);
    }
  } catch (e) {
    alert('Could not check status. Please try again.');
  }
}

function showResults(meanGrade, subjects) {
  const courses = recommendCourses(meanGrade, subjects);
  const resultsSection = document.getElementById('resultsSection');
  const resultsList = document.getElementById('resultsList');

  if (!resultsSection || !resultsList) return;

  if (courses.length === 0) {
    resultsList.innerHTML = `<div style="padding:24px;text-align:center;color:var(--gray);">No courses found for your grade and subjects. Consider improving your grades for more options.</div>`;
  } else {
    resultsList.innerHTML = courses.map((c, i) => `
      <div class="result-course-card">
        <div class="result-num">${i + 1}</div>
        <div style="flex:1">
          <div class="result-course-name">
            ${c.name}
            ${c.highIncome ? '<span class="high-income-tag">💰 High Income</span>' : ''}
          </div>
          <div class="result-course-meta">📚 ${c.category} &nbsp;|&nbsp; Min. Grade: ${c.minGrade}</div>
          ${c.cluster.clusterPoints > 0 ? `
          <div class="cluster-points-display" style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
            <div>
              <div style="font-size:0.75rem;color:var(--gray);">Cluster Points</div>
              <div class="cluster-points-num">${c.cluster.clusterPoints}<span style="font-size:0.9rem;color:var(--gray)">/48</span></div>
            </div>
            <div style="font-size:0.78rem;color:var(--gray);">
              Subjects: ${c.cluster.clusterSubjectsUsed.map(s => `${s}(${GRADE_POINTS[subjects[s]] || 0})`).join(', ')}
            </div>
          </div>` : ''}
        </div>
      </div>
    `).join('');
  }

  resultsSection.classList.add('visible');
  resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Store for download
  window._lastResults = { meanGrade, subjects, courses };
}

function downloadResults() {
  const data = window._lastResults;
  if (!data) return;

  const lines = [
    '=========================================',
    '   SMARTFUTURE CAREER HUB',
    '   KUCCPS COURSE RECOMMENDATION REPORT',
    '=========================================',
    '',
    `Mean Grade: ${data.meanGrade}`,
    '',
    'SUBJECT GRADES:',
    ...Object.entries(data.subjects).map(([s, g]) => `  ${s}: ${g}`),
    '',
    '=========================================',
    'RECOMMENDED COURSES:',
    '=========================================',
    '',
    ...data.courses.map((c, i) => [
      `${i + 1}. ${c.name}${c.highIncome ? ' 💰 (High Income)' : ''}`,
      `   Category: ${c.category}`,
      `   Min Grade: ${c.minGrade}`,
      c.cluster.clusterPoints > 0 ? `   Cluster Points: ${c.cluster.clusterPoints}/48` : '',
      ''
    ].join('\n')),
    '=========================================',
    `Generated: ${new Date().toLocaleString()}`,
    'SmartFuture Career Hub — KUCCPS Guidance',
    '=========================================',
  ];

  const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'SmartFuture_Course_Recommendations.txt';
  a.click();
  URL.revokeObjectURL(url);
}

// Expose to HTML
window.openPaymentModal = openPaymentModal;
window.closePaymentModal = closePaymentModal;
window.initiatePayment = initiatePayment;
window.checkPaymentStatus = checkPaymentStatus;
window.downloadResults = downloadResults;