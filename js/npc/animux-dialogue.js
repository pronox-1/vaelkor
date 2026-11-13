/* Animux's chapel role, told in brief hints rather than a revealed solution. */
(function(r,f){const a=f();if(typeof module==='object'&&module.exports)module.exports=a;else r.VaelkorAnimux135=a;})(globalThis,()=>{
 const de=['Die Kerzen stehen wieder im Kreis.','Der letzte Priester stellte zu viele Fragen.','Manche Gebete brauchen keinen Zeugen.','Sein Schlüssel lag noch auf dem Altar.','Die Magie im Keller bleibt versiegelt.','Ich habe seinen Platz übernommen. Nur seinen Platz.','Bei meinem letzten Ritual blieb es auffallend still.','Die Spuren unter dem Teppich? Ältere Runen.'];
 const en=['The candles form a circle again.','The last priest asked too many questions.','Some prayers need no witness.','His key was still on the altar.','The magic in the cellar stays sealed.','I took his place. Only his place.','My last ritual ended in unusual silence.','The marks beneath the carpet? Older runes.'];
 function line(elapsed=0,language='de',visit=null){const lines=language==='en'?en:de,index=visit===null?Math.floor(Math.max(0,Number(elapsed)||0)/12000):Math.max(0,Math.floor(Number(visit)||1)-1);return lines[index%lines.length];}
 function intro(language='de'){return language==='en'?'The last priest vanished. I tend this church now.':'Der letzte Priester ist verschwunden. Ich hüte nun diese Kirche.';}
 return{line,intro,lines:{de,en}};
});
