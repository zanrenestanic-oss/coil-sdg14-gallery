"use strict";
// GALLERY: Photos and captions are edited in gallery-data.js.
const grid=document.getElementById('photo-grid');
for(const photo of galleryPhotos){const card=document.createElement('article');card.className='photo-card';card.dataset.category=photo.category;const btn=document.createElement('button');btn.className='photo-open';btn.type='button';btn.setAttribute('aria-label','Open '+photo.title);const img=document.createElement('img');img.src=photo.src;img.alt=photo.description;img.loading='lazy';btn.append(img);btn.addEventListener('click',()=>openPhoto(photo));const info=document.createElement('div');info.className='info';const author=document.createElement('span');author.textContent=photo.author;const heading=document.createElement('h3');heading.textContent=photo.title;const desc=document.createElement('p');desc.textContent=photo.description;info.append(author,heading,desc);card.append(btn,info);grid.append(card)}
for(const filter of document.querySelectorAll('.filter'))filter.addEventListener('click',()=>{const choice=filter.dataset.filter;for(const f of document.querySelectorAll('.filter')){f.classList.toggle('active',f===filter);f.setAttribute('aria-pressed',String(f===filter))}for(const c of document.querySelectorAll('.photo-card'))c.hidden=choice!=='all'&&c.dataset.category!==choice});
const lightbox=document.getElementById('lightbox'),lightboxImage=document.getElementById('lightbox-image');let previousFocus=null;function openPhoto(photo){previousFocus=document.activeElement;lightboxImage.src=photo.src;lightboxImage.alt=photo.description;document.getElementById('lightbox-caption').textContent=photo.title+' — '+photo.description;lightbox.hidden=false;document.body.style.overflow='hidden';document.getElementById('lightbox-close').focus()}function closePhoto(){lightbox.hidden=true;lightboxImage.removeAttribute('src');document.body.style.overflow='';if(previousFocus)previousFocus.focus()}document.getElementById('lightbox-close').addEventListener('click',closePhoto);lightbox.addEventListener('click',e=>{if(e.target===lightbox)closePhoto()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!lightbox.hidden)closePhoto();if(e.key==='Tab'&&!lightbox.hidden){e.preventDefault();document.getElementById('lightbox-close').focus()}});
// INTERACTIVE CROSSWORD: Across words cross the vertical answer OCEANS.
const crosswordWords=[
 {number:1,answer:'OCTOPUS',row:0,col:4,dir:'across'},
 {number:2,answer:'CORAL',row:1,col:4,dir:'across'},
 {number:3,answer:'REEFS',row:2,col:3,dir:'across'},
 {number:4,answer:'PLASTIC',row:3,col:2,dir:'across'},
 {number:5,answer:'ANEMONE',row:4,col:3,dir:'across'},
 {number:6,answer:'FISH',row:5,col:2,dir:'across'},
 {number:7,answer:'OCEANS',row:0,col:4,dir:'down'}
];
const board=document.getElementById('crossword-board');
const crosswordCells=new Map();
for(const word of crosswordWords){
 [...word.answer].forEach((letter,index)=>{
  const row=word.row+(word.dir==='down'?index:0),col=word.col+(word.dir==='across'?index:0),key=`${row}-${col}`;
  if(!crosswordCells.has(key))crosswordCells.set(key,{row,col,letter,words:[],number:null});
  const cell=crosswordCells.get(key);cell.words.push({number:word.number,index,answer:word.answer});
  if(index===0)cell.number=cell.number?`${cell.number},${word.number}`:String(word.number);
 });
}
const maxRow=Math.max(...[...crosswordCells.values()].map(c=>c.row)),maxCol=Math.max(...[...crosswordCells.values()].map(c=>c.col));
board.style.gridTemplateColumns=`repeat(${maxCol+1}, minmax(27px, 39px))`;
for(let row=0;row<=maxRow;row++)for(let col=0;col<=maxCol;col++){
 const key=`${row}-${col}`,data=crosswordCells.get(key);
 if(!data){const blank=document.createElement('span');blank.className='crossword-blank';board.append(blank);continue;}
 const wrap=document.createElement('label');wrap.className='crossword-square';
 if(data.number){const num=document.createElement('small');num.textContent=data.number;wrap.append(num);}
 const input=document.createElement('input');input.type='text';input.maxLength=1;input.autocomplete='off';input.spellcheck=false;input.setAttribute('aria-label',`Row ${row+1}, column ${col+1}`);input.dataset.cell=key;input.dataset.words=JSON.stringify(data.words);input.dataset.solution=data.letter;
 input.addEventListener('input',()=>{input.value=input.value.replace(/[^a-z]/gi,'').toUpperCase().slice(-1);input.classList.remove('correct','incorrect');if(input.value){const next=[...board.querySelectorAll('input')].find(x=>{const [r,c]=x.dataset.cell.split('-').map(Number);return r===row&&c===col+1});if(next)next.focus();}});
 input.addEventListener('keydown',e=>{if(e.key==='Backspace'&&!input.value){const prev=[...board.querySelectorAll('input')].find(x=>{const [r,c]=x.dataset.cell.split('-').map(Number);return r===row&&c===col-1});if(prev)prev.focus();}});
 wrap.append(input);board.append(wrap);
}
const crosswordInputs=[...board.querySelectorAll('input')];
document.getElementById('crossword-check').addEventListener('click',()=>{
 let solved=0;
 for(const word of crosswordWords){let typed='';for(let i=0;i<word.answer.length;i++){const r=word.row+(word.dir==='down'?i:0),c=word.col+(word.dir==='across'?i:0);typed+=board.querySelector(`[data-cell="${r}-${c}"]`)?.value||'';}if(typed===word.answer)solved++;}
 crosswordInputs.forEach(input=>{const ok=input.value.toUpperCase()===input.dataset.solution;input.classList.toggle('correct',ok);input.classList.toggle('incorrect',!ok);});
 document.getElementById('crossword-feedback').textContent=solved===crosswordWords.length?'Brilliant! You solved the whole crossword! 🌊':`${solved} of ${crosswordWords.length} words are correct. Keep going!`;
});
document.getElementById('crossword-reset').addEventListener('click',()=>{crosswordInputs.forEach(input=>{input.value='';input.classList.remove('correct','incorrect')});document.getElementById('crossword-feedback').textContent='';crosswordInputs[0]?.focus();});
// SURVEY: Demo results are stored in localStorage on THIS browser only.
// A public survey that aggregates all visitors needs an external database/backend.
const key='coil-sdg14-poll-demo-v1',choices=['Reusable bottle','Avoid single-use bags','Join a clean-up'];let votes;try{votes=JSON.parse(localStorage.getItem(key))||{'Reusable bottle':0,'Avoid single-use bags':0,'Join a clean-up':0}}catch{votes={'Reusable bottle':0,'Avoid single-use bags':0,'Join a clean-up':0}};for(const c of choices)if(!Number.isFinite(votes[c])||votes[c]<0)votes[c]=0;function drawVotes(){const total=choices.reduce((s,c)=>s+votes[c],0),target=document.getElementById('poll-bars');target.replaceChildren();for(const c of choices){const percent=total?Math.round(votes[c]/total*100):0;const row=document.createElement('div');row.className='poll-row';const label=document.createElement('div');label.className='poll-row-top';const name=document.createElement('span');name.textContent=c;const amount=document.createElement('span');amount.textContent=`${votes[c]} vote(s) · ${percent}%`;label.append(name,amount);const track=document.createElement('div');track.className='poll-track';const fill=document.createElement('div');fill.className='poll-fill';fill.style.width=percent+'%';track.append(fill);row.append(label,track);target.append(row)}}document.getElementById('poll-vote').addEventListener('click',()=>{const selected=document.querySelector('input[name="poll"]:checked');if(!selected){alert('Please choose one answer first.');return}votes[selected.value]++;try{localStorage.setItem(key,JSON.stringify(votes))}catch{}document.getElementById('poll').hidden=true;document.getElementById('poll-results').hidden=false;drawVotes()});document.getElementById('poll-reset').addEventListener('click',()=>{votes={'Reusable bottle':0,'Avoid single-use bags':0,'Join a clean-up':0};try{localStorage.removeItem(key)}catch{}document.getElementById('poll').hidden=false;document.getElementById('poll-results').hidden=true;document.querySelectorAll('input[name="poll"]').forEach(x=>x.checked=false)});
const toggle=document.querySelector('.menu-toggle'),nav=document.getElementById('navlinks');toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open))});for(const a of nav.querySelectorAll('a'))a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')});
