const STORAGE_KEY = 'fitnessPlans';

const defaultPlans = Array.from({length:7},(_,i)=>({
  day:i+1,
  title:`Day ${i+1} Workout`,
  image:'',
  description:'No workout plan set yet.'
}));

let plans = JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultPlans;
localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));

const grid = document.getElementById('grid');
const loginBtn = document.getElementById('loginBtn');
const dayOverlay = document.getElementById('dayOverlay');

renderGrid();

function renderGrid(){
  grid.innerHTML='';
  plans.forEach(p=>{
    const card = document.createElement('div');
    card.className='card';
    card.onclick=()=>openDay(p);

    card.innerHTML=`
      <div class="card-top c${p.day}">
        <div>
          <div>Day</div>
          <div class="num">${p.day}</div>
        </div>
        <div>›</div>
      </div>
      <div class="card-body">
        <div class="card-title">${p.title}</div>
        <div>${p.description.slice(0,80)}...</div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function openDay(plan){
  dayOverlay.style.display='flex';
  dayOverlay.innerHTML=`
    <div class="modal">
      <div class="card-top c${plan.day}">
        <h2>${plan.title}</h2>
        <button onclick="closeDay()">✕</button>
      </div>
      <div style="padding:20px">
        ${plan.image ? `<img src="${plan.image}" style="width:100%;border-radius:10px">` : ''}
        <p>${plan.description}</p>
      </div>
    </div>
  `;
}

function closeDay(){
  dayOverlay.style.display='none';
  dayOverlay.innerHTML='';
}
