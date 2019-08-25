/* Manejo del DOM */

const clearInfo = document.getElementById("clearInfoChamp");
const championImgDiv = document.getElementById("championImg");
const orderChange = document.getElementById("userSelectedOrder");
const selectChange = document.getElementById("userSelectedTag");
const championInfoDiv = document.getElementById("championInfoA");
const championInfoDivB = document.getElementById("championInfoB");
let isChampionSelected = false;



//funcion para mostrar informacion de cada champ
 const championInfo = (infoImg,infoName,infoHp,infoHpLvl,infoHpRegen,infoHpRegenLvl,infoMp,infoMpLvl,infoAttack,infoAttackRange,infoMs,infoArmor,infoArmorLvl,infoSpellBlock,infoSpellBlockLvl) =>{

    isChampionSelected = true;
    championInfoDiv.innerHTML += 
         
      `<div align="center" style="margin-top: 7px;">
        <img src="https://www.masterypoints.com/assets/img/lol/champion_icons/${infoImg}">
         <p class="info-champ-name{">${infoName}</p>
         <p class="all-info-champ">
         <strong>Vida</strong><br>
         ${infoHp} (+${infoHpLvl} por nivel) <br> 
         <strong>Mana</strong> <br>
         ${infoMp} (+${infoMpLvl} por nivel) <br>
         <strong>Regeneración de vida</strong><br>
          ${infoHpRegen} (+${infoHpRegenLvl} por nivel)<br>
         <strong>Ataque</strong><br>
         ${infoAttack} <br>
         <strong>Rango de ataque</strong><br>
         ${infoAttackRange}<br>
         <strong>Velocidad de movimiento</strong><br>
          ${infoMs} <br>
         <strong>Armadura</strong><br>
         ${infoArmor} (+${infoArmorLvl} por nivel)<br>
         <strong>Resistencia mágica</strong><br>
         ${infoSpellBlock} (+${infoSpellBlockLvl} por nivel)<br>
         </p>
       </div>`;
    
       if (championInfoDivB.hasChildNodes()) {
       championInfoDivB.removeChild(championInfoDivB.childNodes[0]);}

      championInfoDivB.appendChild(championInfoDiv.childNodes[1])  //mover children :)
      
 }

 fetch('http://ddragon.leagueoflegends.com/cdn/9.16.1/data/es_MX/champion.json?fbclid=IwAR3T5Vq3DPW17KzxXSNcNvtrKdFdPVJHp5NhZ-XL-csVp23VUs87lR3Rerk')
  .then(function(response) {
    
    return response.json();
  })
  .then(function(data) {
    showAllOnload(data.data)
  
  });


  function showAllOnload(dataLol) {  // mostrar todos al inicio
  championInfo;
  let selectedTag = document.getElementById("userSelectedTag").value;
  let allResultFilter = window.filteringResult(selectedTag,dataLol)
    allResultFilter.forEach(element => {
    championImgDiv.innerHTML += 
    
   `
    <div class="card mt-3" style="background-color: #e2e2e2";>
    <div style="cursor: pointer;" id="${element.id}" onclick=championInfo(${JSON.stringify(element.image.full)},${JSON.stringify(element.id)},${element.stats.hp},${element.stats.hpperlevel},${element.stats.hpregen},${element.stats.hpregenperlevel},${element.stats.mp},${element.stats.mpperlevel},${element.stats.attackdamage},${element.stats.attackrange},${element.stats.movespeed},${element.stats.armor},${element.stats.armorperlevel},${element.stats.spellblock},${element.stats.spellblockperlevel})>
        <div class="champion-card-header">
        <img src="https://www.masterypoints.com/assets/img/lol/champion_icons/${element.image.full}">
        <div class="champion-card-content>
        <p class="p-champion-info-name">${element.name}<p></div>
        
           </div>
       </div> 
    </div>
 `    
  });

selectChange.addEventListener('change', () =>{ //mostrar filtro
  let selectedTag = document.getElementById("userSelectedTag").value;
  document.getElementById("userSelectedOrder").value= 0;
  championImgDiv.innerHTML = ""; 
  let allResultFilter = window.filteringResult(selectedTag,dataLol);
  allResultFilter.forEach(element =>{
    championImgDiv.innerHTML += 
    `<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
    <div class="card mt-3" style="background-color: #e2e2e2";>
    <div style="cursor: pointer;" id="${element.id}" onclick=championInfo(${JSON.stringify(element.img)},${JSON.stringify(element.id)},${element.stats.hp},${element.stats.hpperlevel},${element.stats.hpregen},${element.stats.hpregenperlevel},${element.stats.mp},${element.stats.mpperlevel},${element.stats.attackdamage},${element.stats.attackrange},${element.stats.movespeed},${element.stats.armor},${element.stats.armorperlevel},${element.stats.spellblock},${element.stats.spellblockperlevel})
    )>
        <div class="card-header">
        <img src="${element.img}">
        <div class="card-content">
        <p class="p-champion-info-name">${element.name}<p></div>
        
           </div>
       </div> 
    </div>
  </div>`    
   }) })

orderChange.addEventListener('change', () =>{ //ordenar segun filtro
  let selectedOrder = document.getElementById("userSelectedOrder").value;
  let selectedTag = document.getElementById("userSelectedTag").value;
  championImgDiv.innerHTML = ""; 
  let champData = window.filteringResult(selectedTag,dataLol)
  let allResultOrder = window.orderData(selectedOrder,champData)
  allResultOrder.forEach(element =>{
  if (selectedOrder == "difficultyEasiestFirst" || selectedOrder == "difficultyHardestFirst"){//agrega p con dificultad
    championImgDiv.innerHTML += 
    `<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
    <div class="card mt-3" style="background-color: #e2e2e2";>
    <div style="cursor: pointer;" id="${element.id}" onclick=championInfo(${JSON.stringify(element.image.full)},${JSON.stringify(element.id)},${element.stats.hp},${element.stats.hpperlevel},${element.stats.hpregen},${element.stats.hpregenperlevel},${element.stats.mp},${element.stats.mpperlevel},${element.stats.attackdamage},${element.stats.attackrange},${element.stats.movespeed},${element.stats.armor},${element.stats.armorperlevel},${element.stats.spellblock},${element.stats.spellblockperlevel})
    )>
        <div class="card-header">
        <img src="https://www.masterypoints.com/assets/img/lol/champion_icons/${element.image.full}">
        <div class="card-content">
        <p class="p-champion-name">${element.name}<p></div>
        <p class="p-champion-difficulty">Dificultad ${element.info.difficulty}</p>
           </div>
       </div> 
    </div>
  </div>`    
}else{ 
  championImgDiv.innerHTML += 
    `<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
    <div class="card mt-3" style="background-color: #e2e2e2";>
    <div style="cursor: pointer;" id="${element.id}" onclick=championInfo(${JSON.stringify(element.image.full)},${JSON.stringify(element.id)},${element.stats.hp},${element.stats.hpperlevel},${element.stats.hpregen},${element.stats.hpregenperlevel},${element.stats.mp},${element.stats.mpperlevel},${element.stats.attackdamage},${element.stats.attackrange},${element.stats.movespeed},${element.stats.armor},${element.stats.armorperlevel},${element.stats.spellblock},${element.stats.spellblockperlevel})
    )>
        <div class="card-header">
        <img src="${element.img}">
        <div class="card-content">
        <p class="p-champion-name">${element.name}<p></div>
        
           </div>
       </div> 
    </div>
  </div>`    
}
    
}) 
})
;

clearInfo.addEventListener('click', () =>{ //BOTON LIMPIAR
  
    if(isChampionSelected){
    championInfoDiv.removeChild(championInfoDiv.childNodes[1])
    championInfoDivB.removeChild(championInfoDivB.childNodes[0])
    championInfoDiv.innerHTML+=`<p class="main-info-text"><i>Selecciona un campeón para ver su información aquí</i></p>`}
    isChampionSelected = false;
 })
  }







