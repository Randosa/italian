'use strict';
const direct = [
 {row:0,scene:0,text:'Lo fotografa Marco.',cast:'Marco: striped shirt, left. Paolo: plain shirt, right.',explain:'Marco fotografa Paolo. «Lo» refers to Paolo; Marco is the subject, even after the verb.'},
 {row:1,scene:1,text:'La fotografa Anna.',cast:'Giulia: striped shirt, left. Anna: plain shirt, right.',explain:'Anna fotografa Giulia. «La» refers to Giulia; Anna takes the picture.'},
 {row:2,scene:0,text:'Li fotografa Giulia.',cast:'Giulia: striped shirt, left. Marco e Luca: right.',explain:'Giulia fotografa Marco e Luca. «Li» refers to the two men.'},
 {row:3,scene:1,text:'Lo fotografano Anna e Sofia.',cast:'Marco: striped shirt, left. Anna e Sofia: right.',explain:'Anna e Sofia fotografano Marco. «Lo» refers to Marco; the two women are the subject.'},
 {row:0,scene:1,text:'Paolo lo fotografa.',cast:'Marco: striped shirt, left. Paolo: plain shirt, right.',explain:'Paolo fotografa Marco. «Lo» refers to Marco.'},
 {row:1,scene:0,text:'Giulia la fotografa.',cast:'Giulia: striped shirt, left. Anna: plain shirt, right.',explain:'Giulia fotografa Anna. «La» refers to Anna.'},
 {row:2,scene:1,text:'Marco e Luca la fotografano.',cast:'Giulia: striped shirt, left. Marco e Luca: right.',explain:'Marco e Luca fotografano Giulia. «La» refers to Giulia.'},
 {row:3,scene:0,text:'Le fotografa Marco.',cast:'Marco: striped shirt, left. Anna e Sofia: right.',explain:'Marco fotografa Anna e Sofia. Direct «le» refers to the two women.'}
];
const indirect = [
 {row:4,scene:0,text:'Giulia gli dà un libro.',cast:'Giulia: striped shirt, left. Marco: middle. Anna: right.',explain:'Giulia dà un libro a Marco. «Gli» means to him; Marco receives the book.'},
 {row:5,scene:1,text:'Marco le dà un libro.',cast:'Marco: striped shirt, left. Paolo: middle. Anna: right.',explain:'Marco dà un libro ad Anna. Indirect «le» means to her; Anna receives the book.'},
 {row:4,scene:1,text:'Le dà un libro Giulia.',cast:'Giulia: striped shirt, left. Marco: middle. Anna: right.',explain:'Giulia dà un libro ad Anna. «Le» means to her; Giulia is the subject after the verb.'},
 {row:5,scene:0,text:'Gli dà un libro Marco.',cast:'Marco: striped shirt, left. Paolo: middle. Anna: right.',explain:'Marco dà un libro a Paolo. «Gli» means to him; Marco is the subject after the verb.'}
];
const sceneAlts = [
 ['The striped man photographs the curly-haired man.','The curly-haired man photographs the striped man.'],
 ['The striped woman photographs the bob-haired woman.','The bob-haired woman photographs the striped woman.'],
 ['The striped woman photographs two men.','Two men take a photograph of the striped woman.'],
 ['The striped man photographs two women.','Two women take a photograph of the striped man.'],
 ['The striped woman gives a book to the man in the middle; the woman on the right watches.','The striped woman gives a book to the woman on the right; the man in the middle watches.'],
 ['The striped man gives a book to the man in the middle; the woman on the right watches.','The striped man gives a book to the woman on the right; the man in the middle watches.']
];
let mode='direct',items=[],index=0,score=0,attempted=false,complete=false;
const el=id=>document.getElementById(id);
function start(selected){
 mode=selected;items=mode==='direct'?[...direct]:mode==='indirect'?[...indirect]:[...direct,...indirect].sort(()=>Math.random()-.5);
 index=0;score=0;complete=false;
 document.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===mode)));
 render();
}
function render(){
 attempted=false;el('progress').textContent=`${index+1} / ${items.length}`;el('score').textContent=`First choices correct: ${score}`;
 el('meter').max=items.length;el('meter').value=index;el('stage').textContent=mode==='direct'?'PRONOMI DIRETTI':mode==='indirect'?'PRONOMI INDIRETTI':'RIPASSO · MIXED PRACTICE';
 const item=items[index];el('sentence').textContent=item.text;el('cast').textContent=item.cast;
 el('feedback').textContent='';el('feedback').className='feedback';el('next').hidden=true;
 el('next').textContent=index===items.length-1?'Risultati →':'Avanti →';el('choices').replaceChildren();
 const order=Math.random()<.5?[0,1]:[1,0];
 order.forEach((scene,i)=>{
  const button=document.createElement('button');button.type='button';button.className='picture-choice';
  button.setAttribute('aria-label',`${i===0?'A':'B'}: ${sceneAlts[item.row][scene]}`);
  const drawing=document.createElement('span');drawing.className='scene';drawing.setAttribute('aria-hidden','true');
  drawing.style.backgroundPosition=`${scene*100}% ${item.row*20}%`;
  const letter=document.createElement('span');letter.className='choice-letter';letter.textContent=i===0?'A':'B';
  button.append(drawing,letter);button.addEventListener('click',()=>choose(button,scene,item));el('choices').append(button);
 });
}
function choose(button,scene,item){
 if(complete)return;
 const correct=scene===item.scene;
 if(!attempted){if(correct)score++;attempted=true;el('score').textContent=`First choices correct: ${score}`;}
 if(correct){
  el('feedback').textContent=`Esatto! ${item.explain}`;el('feedback').className='feedback correct';button.classList.add('correct');
  el('choices').querySelectorAll('button').forEach(b=>b.disabled=true);el('next').hidden=false;el('next').focus();
 }else{
  button.disabled=true;button.classList.add('incorrect');el('feedback').textContent='Riprova. Follow the pronoun and the named subject: who acts, and who receives?';el('feedback').className='feedback incorrect';
 }
}
el('next').addEventListener('click',()=>{
 index++;
 if(index<items.length){render();el('sentence').focus();return;}
 complete=true;el('meter').value=items.length;el('progress').textContent='Completed';el('sentence').textContent='Ben fatto!';el('sentence').focus();
 el('cast').textContent=`${score} / ${items.length} correct on the first choice.`;el('choices').replaceChildren();el('next').hidden=true;
 el('feedback').textContent='Reflect: did you follow the pronoun and the verb, or guess from word order? Repeat this set or choose the next tab.';
});
el('restart').addEventListener('click',()=>{start(mode);el('sentence').focus();});
document.querySelectorAll('[data-mode]').forEach(button=>button.addEventListener('click',()=>{start(button.dataset.mode);el('sentence').focus();}));
start('direct');
