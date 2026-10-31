(function(root){'use strict';
const rates={13:2000,14:2200,15:2500,16:3000,17:3500,18:4000,19:4500,20:5000,21:5500,22:6000};
const labels={fitting:'Шиномонтаж',balancing:'Балансировка',repair:'Ремонт прокола',storage:'Хранение на сезон'};
function calculate({diameter,vehicle,quantity,service,runflat=false}){
 if(!rates[diameter]||!['sedan','suv'].includes(vehicle)||![1,2,4].includes(quantity)||!labels[service])throw new Error('Некорректные параметры расчёта');
 let unit=service==='fitting'?rates[diameter]:service==='balancing'?Math.round(rates[diameter]*.4/100)*100:service==='repair'?2500:3000;
 if(vehicle==='suv'&&service!=='storage')unit=Math.ceil(unit*1.25/100)*100;
 if(runflat&&service==='fitting')unit+=1000;
 return {unit,total:unit*quantity,label:labels[service]};
}
const api={calculate,rates,labels};root.PitCalculator=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
