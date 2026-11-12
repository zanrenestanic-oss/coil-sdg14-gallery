"use strict";
// GALLERY: Photos and captions are edited in gallery-data.js.
const grid=document.getElementById('photo-grid');
for(const photo of galleryPhotos){const card=document.createElement('article');card.className='photo-card';card.dataset.category=photo.category;const btn=document.createElement('button');btn.className='photo-open';btn.type='button';btn.setAttribute('aria-label','Open '+photo.title);const img=document.createElement('img');img.src=photo.src;img.alt=photo.description;img.loading='lazy';btn.append(img);btn.addEventListener('click',()=>openPhoto(photo));const info=document.createElement('div');info.className='info';const author=document.createElement('span');author.textContent=photo.author;const heading=document.createElement('h3');heading.textContent=photo.title;const desc=document.createElement('p');desc.textContent=photo.description;info.append(author,heading,desc);card.append(btn,info);grid.append(card)}
for(const filter of document.querySelectorAll('.filter'))filter.addEventListener('click',()=>{const choice=filter.dataset.filter;for(const f of document.querySelectorAll('.filter')){f.classList.toggle('active',f===filter);f.setAttribute('aria-pressed',String(f===filter))}for(const c of document.querySelectorAll('.photo-card'))c.hidden=choice!=='all'&&c.dataset.category!==choice});
const lightbox=document.getElementById('lightbox'),lightboxImage=document.getElementById('lightbox-image');let previousFocus=null;function openPhoto(photo){previousFocus=document.activeElement;lightboxImage.src=photo.src;lightboxImage.alt=photo.description;document.getElementById('lightbox-caption').textContent=photo.title+' — '+photo.description;lightbox.hidden=false;document.body.style.overflow='hidden';document.getElementById('lightbox-close').focus()}function closePhoto(){lightbox.hidden=true;lightboxImage.removeAttribute('src');document.body.style.overflow='';if(previousFocus)previousFocus.focus()}document.getElementById('lightbox-close').addEventListener('click',closePhoto);lightbox.addEventListener('click',e=>{if(e.target===lightbox)closePhoto()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!lightbox.hidden)closePhoto();if(e.key==='Tab'&&!lightbox.hidden){e.preventDefault();document.getElementById('lightbox-close').focus()}});
// CROSSWORD: A real intersecting crossword. Shared squares are a single input.
const crosswordWords=[
 {number:1,answer:"OCEANS",row:5,col:3,direction:"across"},
 {number:2,answer:"REEFS",row:4,col:5,direction:"down"},
 {number:3,answer:"TURTLE",row:4,col:3,direction:"across"},
 {number:4,answer:"PLASTIC",row:8,col:2,direction:"across"},
 {number:5,answer:"HABITAT",row:0,col:6,direction:"down"},
 {number:6,answer:"DOLPHIN",row:5,col:2,direction:"down"},
 {number:7,answer:"CORAL",row:5,col:4,direction:"down"},
 {number:8,answer:"SHARK",row:8,col:5,direction:"down"}
];
const crosswordGrid=document.getElementById('crossword-grid');
const crosswordCells=new Map();
const rowMin=0,rowMax=12,colMin=2,colMax=8;
for(const word of crosswordWords){
 for(let i=0;i<word.answer.length;i++){
  const row=word.row+(word.direction==="down"?i:0);
  const col=word.col+(word.direction==="across"?i:0);
  const key=row+","+col;
  if(!crosswordCells.has(key))crosswordCells.set(key,{letter:word.answer[i],number:i===0?word.number:null,words:[]});
  const cell=crosswordCells.get(key);cell.words.push(word.number);
  if(i===0)cell.number=word.number;
 }
}
for(let row=rowMin;row<=rowMax;row++){
 const rowEl=document.createElement('div');rowEl.className='crossword-row';
 for(let col=colMin;col<=colMax;col++){
  const cellData=crosswordCells.get(row+","+col);
  const square=document.createElement('div');
  if(!cellData){square.className='crossword-square crossword-black';rowEl.append(square);continue;}
  square.className='crossword-square';
  if(cellData.number){const number=document.createElement('span');number.className='crossword-number';number.textContent=cellData.number;square.append(number);}
  const input=document.createElement('input');input.type='text';input.maxLength=1;input.autocomplete='off';input.spellcheck=false;
  input.setAttribute('aria-label','Crossword row '+(row+1)+', column '+(col+1));
  input.dataset.answer=cellData.letter;input.dataset.words=cellData.words.join(',');
  input.addEventListener('input',()=>{input.value=input.value.replace(/[^a-z]/gi,'').toUpperCase().slice(-1);input.classList.remove('correct','incorrect');if(input.value){const cells=[...crosswordGrid.querySelectorAll('input')];const at=cells.indexOf(input);cells.slice(at+1).find(x=>x.dataset.words.split(',').some(n=>cellData.words.includes(Number(n))))?.focus();}});
  input.addEventListener('keydown',e=>{if(e.key==='Backspace'&&!input.value){const cells=[...crosswordGrid.querySelectorAll('input')];cells[Math.max(0,cells.indexOf(input)-1)]?.focus();}});
  square.append(input);rowEl.append(square);
 }
 crosswordGrid.append(rowEl);
}
const crosswordInputs=[...crosswordGrid.querySelectorAll('input')];
document.getElementById('crossword-check').addEventListener('click',()=>{
 let correct=0;
 crosswordInputs.forEach(input=>{const ok=input.value.toUpperCase()===input.dataset.answer;input.classList.toggle('correct',ok);input.classList.toggle('incorrect',!ok);if(ok)correct++;});
 const feedback=document.getElementById('crossword-feedback');
 feedback.textContent=correct===crosswordInputs.length?'Excellent! The whole crossword is correct. 🌊':correct+' of '+crosswordInputs.length+' squares are correct. Keep trying!';
});
document.getElementById('crossword-reset').addEventListener('click',()=>{
 crosswordInputs.forEach(input=>{input.value='';input.classList.remove('correct','incorrect')});
 document.getElementById('crossword-feedback').textContent='';
 crosswordInputs[0]?.focus();
});
// SURVEY: Demo results are stored in localStorage on THIS browser only.
// A public survey that aggregates all visitors needs an external database/backend.
const key='coil-sdg14-poll-demo-v1',choices=['Reusable bottle','Avoid single-use bags','Join a clean-up'];let votes;try{votes=JSON.parse(localStorage.getItem(key))||{'Reusable bottle':0,'Avoid single-use bags':0,'Join a clean-up':0}}catch{votes={'Reusable bottle':0,'Avoid single-use bags':0,'Join a clean-up':0}};for(const c of choices)if(!Number.isFinite(votes[c])||votes[c]<0)votes[c]=0;function drawVotes(){const total=choices.reduce((s,c)=>s+votes[c],0),target=document.getElementById('poll-bars');target.replaceChildren();for(const c of choices){const percent=total?Math.round(votes[c]/total*100):0;const row=document.createElement('div');row.className='poll-row';const label=document.createElement('div');label.className='poll-row-top';const name=document.createElement('span');name.textContent=c;const amount=document.createElement('span');amount.textContent=`${votes[c]} vote(s) · ${percent}%`;label.append(name,amount);const track=document.createElement('div');track.className='poll-track';const fill=document.createElement('div');fill.className='poll-fill';fill.style.width=percent+'%';track.append(fill);row.append(label,track);target.append(row)}}document.getElementById('poll-vote').addEventListener('click',()=>{const selected=document.querySelector('input[name="poll"]:checked');if(!selected){alert('Please choose one answer first.');return}votes[selected.value]++;try{localStorage.setItem(key,JSON.stringify(votes))}catch{}document.getElementById('poll').hidden=true;document.getElementById('poll-results').hidden=false;drawVotes()});document.getElementById('poll-reset').addEventListener('click',()=>{votes={'Reusable bottle':0,'Avoid single-use bags':0,'Join a clean-up':0};try{localStorage.removeItem(key)}catch{}document.getElementById('poll').hidden=false;document.getElementById('poll-results').hidden=true;document.querySelectorAll('input[name="poll"]').forEach(x=>x.checked=false)});
const toggle=document.querySelector('.menu-toggle'),nav=document.getElementById('navlinks');toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open))});for(const a of nav.querySelectorAll('a'))a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')});
