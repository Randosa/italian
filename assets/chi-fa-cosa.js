'use strict';
const direct = [
 {row:0,scene:0,text:'Lo abbraccia Giulia.',cast:'Giulia: striped shirt. Marco: plain shirt.',subject:'fs',object:'ms',explain:'Giulia abbraccia Marco. «Lo» refers to Marco (one man); Giulia is the subject.'},
 {row:1,scene:1,text:'Le saluta Anna.',cast:'Giulia e Sofia: striped shirts, left. Anna: plain shirt, right.',subject:'fs',object:'fp',explain:'Anna saluta Giulia e Sofia. «Le» refers to the two women; Anna is one person.'},
 {row:2,scene:0,text:'Li insegue Giulia.',cast:'Giulia: striped shirt. Marco e Luca: plain shirts.',subject:'fs',object:'mp',explain:'Giulia insegue Marco e Luca. «Li» refers to the two men; Giulia is the subject.'},
 {row:3,scene:1,text:'Lo fotografano Anna e Sofia.',cast:'Marco: striped shirt, left. Anna e Sofia: plain shirts, right.',subject:'fp',object:'ms',explain:'Anna e Sofia fotografano Marco. «Lo» refers to one man; the two women are the subject.'},
 {row:0,scene:1,text:'Marco la abbraccia.',cast:'Giulia: striped shirt. Marco: plain shirt.',subject:'ms',object:'fs',explain:'Marco abbraccia Giulia. «La» refers to Giulia (one woman); Marco is the subject.'},
 {row:1,scene:0,text:'Giulia e Sofia la salutano.',cast:'Giulia e Sofia: striped shirts, left. Anna: plain shirt, right.',subject:'fp',object:'fs',explain:'Giulia e Sofia salutano Anna. «La» refers to one woman; the subject is two women.'},
 {row:2,scene:1,text:'Marco e Luca la inseguono.',cast:'Giulia: striped shirt. Marco e Luca: plain shirts.',subject:'mp',object:'fs',explain:'Marco e Luca inseguono Giulia. «La» refers to one woman; the two men are the subject.'},
 {row:3,scene:0,text:'Le fotografa Marco.',cast:'Marco: striped shirt, left. Anna e Sofia: plain shirts, right.',subject:'ms',object:'fp',explain:'Marco fotografa Anna e Sofia. «Le» refers to two women; Marco is one man.'}
];
const indirect = [
 {row:4,scene:0,text:'Giulia gli scrive.',cast:'Giulia: striped shirt, left. Marco: plain shirt, right.',subject:'fs',object:'ms',explain:'Giulia scrive a Marco. «Gli» means to him; Giulia writes and Marco receives the letter.'},
 {row:4,scene:1,text:'Marco le scrive.',cast:'Giulia: striped shirt, left. Marco: plain shirt, right.',subject:'ms',object:'fs',explain:'Marco scrive a Giulia. Indirect «le» means to her; Marco writes and Giulia receives the letter.'},
 {row:5,scene:0,text:'Le telefona Marco.',cast:'Marco: striped shirt, left. Anna: plain shirt, right. The caller taps the phone; the other person listens.',subject:'ms',object:'fs',explain:'Marco telefona ad Anna. «Le» means to her; Marco makes the call and Anna receives it.'},
 {row:5,scene:1,text:'Gli telefona Anna.',cast:'Marco: striped shirt, left. Anna: plain shirt, right. The caller taps the phone; the other person listens.',subject:'fs',object:'ms',explain:'Anna telefona a Marco. «Gli» means to him; Anna makes the call and Marco receives it.'}
];
const sceneAlts = [
 ['The striped woman hugs the plain-shirt man.','The plain-shirt man hugs the striped woman.'],
 ['Two striped women wave hello to one plain-shirt woman.','One plain-shirt woman waves hello to two striped women.'],
 ['The striped woman chases two plain-shirt men.','Two plain-shirt men chase the striped woman.'],
 ['The striped man photographs two plain-shirt women.','Two plain-shirt women take a photograph of the striped man.'],
 ['The striped woman writes a letter to the plain-shirt man.','The plain-shirt man writes a letter to the striped woman.'],
 ['The striped man initiates a phone call to the plain-shirt woman.','The plain-shirt woman initiates a phone call to the striped man.']
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
