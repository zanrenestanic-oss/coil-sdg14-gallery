"use strict";
// GALLERY: Photos and captions are edited in gallery-data.js.
const grid=document.getElementById('photo-grid');
for(const photo of galleryPhotos){const card=document.createElement('article');card.className='photo-card';card.dataset.category=photo.category;const btn=document.createElement('button');btn.className='photo-open';btn.type='button';btn.setAttribute('aria-label','Open '+photo.title);const img=document.createElement('img');img.src=photo.src;img.alt=photo.description;img.loading='lazy';btn.append(img);btn.addEventListener('click',()=>openPhoto(photo));const info=document.createElement('div');info.className='info';const author=document.createElement('span');author.textContent=photo.author;const heading=document.createElement('h3');heading.textContent=photo.title;const desc=document.createElement('p');desc.textContent=photo.description;info.append(author,heading,desc);card.append(btn,info);grid.append(card)}
for(const filter of document.querySelectorAll('.filter'))filter.addEventListener('click',()=>{const choice=filter.dataset.filter;for(const f of document.querySelectorAll('.filter')){f.classList.toggle('active',f===filter);f.setAttribute('aria-pressed',String(f===filter))}for(const c of document.querySelectorAll('.photo-card'))c.hidden=choice!=='all'&&c.dataset.category!==choice});
const lightbox=document.getElementById('lightbox'),lightboxImage=document.getElementById('lightbox-image');let previousFocus=null;function openPhoto(photo){previousFocus=document.activeElement;lightboxImage.src=photo.src;lightboxImage.alt=photo.description;document.getElementById('lightbox-caption').textContent=photo.title+' — '+photo.description;lightbox.hidden=false;document.body.style.overflow='hidden';document.getElementById('lightbox-close').focus()}function closePhoto(){lightbox.hidden=true;lightboxImage.removeAttribute('src');document.body.style.overflow='';if(previousFocus)previousFocus.focus()}document.getElementById('lightbox-close').addEventListener('click',closePhoto);lightbox.addEventListener('click',e=>{if(e.target===lightbox)closePhoto()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!lightbox.hidden)closePhoto();if(e.key==='Tab'&&!lightbox.hidden){e.preventDefault();document.getElementById('lightbox-close').focus()}});
// CROSSWORD: Each clue has a row of letter boxes. Answers are checked in the browser.
const crosswordEntries=[...document.querySelectorAll('.crossword-entry')];
for(const entry of crosswordEntries){
 const answer=entry.dataset.answer;
 for(let i=0;i<answer.length;i++){
  const input=document.createElement('input');
  input.type='text';input.maxLength=1;input.autocomplete='off';
  input.setAttribute('aria-label',`Letter ${i+1} of ${answer.length}`);
  input.dataset.index=String(i);
  input.addEventListener('input',()=>{
   input.value=input.value.replace(/[^a-z]/gi,'').toUpperCase().slice(-1);
   input.classList.remove('correct','incorrect');
   if(input.value && input.nextElementSibling)input.nextElementSibling.focus();
  });
  input.addEventListener('keydown',e=>{
   if(e.key==='Backspace'&&!input.value&&input.previousElementSibling)input.previousElementSibling.focus();
  });
  entry.append(input);
 }
}
document.getElementById('crossword-check').addEventListener('click',()=>{
 let correct=0,total=0;
 for(const entry of crosswordEntries){
  const answer=entry.dataset.answer;
  const cells=[...entry.querySelectorAll('input')];
  const typed=cells.map(x=>x.value.toUpperCase()).join('');
  total++;
  const ok=typed===answer;
  if(ok)correct++;
  cells.forEach((cell,i)=>{cell.classList.toggle('correct',ok);cell.classList.toggle('incorrect',!ok||cell.value.toUpperCase()!==answer[i]);});
 }
 const feedback=document.getElementById('crossword-feedback');
 feedback.textContent=correct===total?'Excellent! All answers are correct. 🌊':`${correct} of ${total} answers correct. Keep trying!`;
});
document.getElementById('crossword-reset').addEventListener('click',()=>{
 for(const entry of crosswordEntries)for(const cell of entry.querySelectorAll('input')){cell.value='';cell.classList.remove('correct','incorrect')}
 document.getElementById('crossword-feedback').textContent='';
 if(crosswordEntries[0]?.querySelector('input'))crosswordEntries[0].querySelector('input').focus();
});
// SURVEY: Demo results are stored in localStorage on THIS browser only.
// A public survey that aggregates all visitors needs an external database/backend.
const key='coil-sdg14-poll-demo-v1',choices=['Reusable bottle','Avoid single-use bags','Join a clean-up'];let votes;try{votes=JSON.parse(localStorage.getItem(key))||{'Reusable bottle':0,'Avoid single-use bags':0,'Join a clean-up':0}}catch{votes={'Reusable bottle':0,'Avoid single-use bags':0,'Join a clean-up':0}};for(const c of choices)if(!Number.isFinite(votes[c])||votes[c]<0)votes[c]=0;function drawVotes(){const total=choices.reduce((s,c)=>s+votes[c],0),target=document.getElementById('poll-bars');target.replaceChildren();for(const c of choices){const percent=total?Math.round(votes[c]/total*100):0;const row=document.createElement('div');row.className='poll-row';const label=document.createElement('div');label.className='poll-row-top';const name=document.createElement('span');name.textContent=c;const amount=document.createElement('span');amount.textContent=`${votes[c]} vote(s) · ${percent}%`;label.append(name,amount);const track=document.createElement('div');track.className='poll-track';const fill=document.createElement('div');fill.className='poll-fill';fill.style.width=percent+'%';track.append(fill);row.append(label,track);target.append(row)}}document.getElementById('poll-vote').addEventListener('click',()=>{const selected=document.querySelector('input[name="poll"]:checked');if(!selected){alert('Please choose one answer first.');return}votes[selected.value]++;try{localStorage.setItem(key,JSON.stringify(votes))}catch{}document.getElementById('poll').hidden=true;document.getElementById('poll-results').hidden=false;drawVotes()});document.getElementById('poll-reset').addEventListener('click',()=>{votes={'Reusable bottle':0,'Avoid single-use bags':0,'Join a clean-up':0};try{localStorage.removeItem(key)}catch{}document.getElementById('poll').hidden=false;document.getElementById('poll-results').hidden=true;document.querySelectorAll('input[name="poll"]').forEach(x=>x.checked=false)});
const toggle=document.querySelector('.menu-toggle'),nav=document.getElementById('navlinks');toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open))});for(const a of nav.querySelectorAll('a'))a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')});
