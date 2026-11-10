
(function(){
const ids=['shop','breeding','guide','base','quests'];
ids.forEach(id=>{const section=document.getElementById(id);if(!section||section.querySelector('.vkReturnHome'))return;const btn=document.createElement('button');btn.type='button';btn.className='vkReturnHome';btn.id='vkHomeBack';btn.textContent='← Zur Startseite';section.prepend(btn);btn.addEventListener('click',()=>document.querySelector('#fusionNav [data-vkmain="home"]')?.click());});
const adventure=document.getElementById('vkAdventurePanel');if(adventure&&!adventure.querySelector('.vkReturnHome')){const btn=document.createElement('button');btn.className='vkReturnHome';btn.id='vkHomeBack';btn.textContent='← Zur Startseite';adventure.prepend(btn);btn.addEventListener('click',()=>{window.scrollTo(0,0)});}
})();
