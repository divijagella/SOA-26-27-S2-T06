const endpoints=[
  ['/api/auth/login','POST','Protected','18,420','Low'],
  ['/api/users','GET','Protected','32,810','Low'],
  ['/api/payments','POST','Protected','9,482','Medium'],
  ['/api/search','GET','Protected','51,203','Medium'],
  ['/api/admin','GET','Protected','1,204','High']
];
const threats=[
  ['SQL Injection','203.0.113.45','/api/users','Blocked','2 min ago'],
  ['Brute Force','198.51.100.22','/auth/login','Blocked','8 min ago'],
  ['Suspicious IP','203.0.113.77','/api/admin','Blocked','14 min ago'],
  ['Rate Limit','192.0.2.19','/api/search','Mitigated','21 min ago'],
  ['XSS Payload','198.51.100.9','/api/comments','Blocked','31 min ago']
];

function showPage(id,btn){
 document.querySelectorAll('.page').forEach(p=>p.classList.add('hidden'));
 document.getElementById(id).classList.remove('hidden');
 document.querySelectorAll('.nav').forEach(n=>n.classList.remove('active'));
 if(btn) btn.classList.add('active');
 const titles={overview:'API Security Overview',endpoints:'Protected Endpoints',threats:'Threat Detection',logs:'Security Logs'};
 document.getElementById('pageTitle').textContent=titles[id];
 if(id==='endpoints') renderEndpoints();
 if(id==='threats') renderThreats();
 if(id==='logs') renderLogs();
}
function renderEndpoints(){
 document.getElementById('endpointTable').innerHTML=endpoints.map(e=>`<tr><td>${e[0]}</td><td>${e[1]}</td><td><span class="safe">${e[2]}</span></td><td>${e[3]}</td><td>${e[4]}</td></tr>`).join('');
}
function renderThreats(){
 document.getElementById('threatList').innerHTML=threats.map(t=>`<div class="threat"><b>${t[0]}</b><span class="danger">${t[3].toUpperCase()}</span><small>${t[1]} → ${t[2]} · ${t[4]}</small></div>`).join('');
}
function renderLogs(){
 document.getElementById('logsList').innerHTML=[
 'POST /api/auth/login — 403 — SQL injection pattern detected',
 'GET /api/users — 200 — request validated',
 'POST /api/payments — 200 — authentication passed',
 'GET /api/admin — 403 — high-risk IP blocked',
 'GET /api/search — 429 — rate limit applied'
 ].map((x,i)=>`<div class="log"><span>13:${String(42-i*4).padStart(2,'0')}</span>${x}</div>`).join('');
}
function refreshData(){
 const el=document.getElementById('requests');
 const n=Number(el.textContent.replace(',',''))+Math.floor(Math.random()*250);
 el.textContent=n.toLocaleString();
}
function addEndpoint(){
 endpoints.push(['/api/new-endpoint','GET','Protected','0','Low']);
 document.getElementById('endpointsCount').textContent=endpoints.length;
 renderEndpoints();
}
function clearLogs(){document.getElementById('logsList').innerHTML='<div class="log">Logs cleared.</div>'}
renderEndpoints();
