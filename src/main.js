/* Manejo del DOM */
const goToAverageButton = document.getElementById("goToAverage");
const clearInfo = document.getElementById("clearInfoChamp");
const championImgDiv = document.getElementById("championImg");
const orderChange = document.getElementById("userSelectedOrder");
const selectChange = document.getElementById("userSelectedTag");
const championInfoDiv = document.getElementById("championInfoA");
const championInfoDivB = document.getElementById("championInfoB");
let isChampionSelected = false;

goToAverageButton.addEventListener('click', () => {
  window.location.href="average.html"
})


//funcion para mostrar informacion de cada champ
 const championInfo = (infoImg,infoName,infoHp,infoHpLvl,infoHpRegen,infoHpRegenLvl,infoMp,infoMpLvl,
  infoAttack,infoAttackRange,infoMs,infoArmor,infoArmorLvl,infoSpellBlock,infoSpellBlockLvl) => {

    isChampionSelected = true;
    championInfoDiv.innerHTML += 
         
      `<div class="div-text-compare-info">
        <div class="image-and-name-compare-info">
          <img src="https://www.masterypoints.com/assets/img/lol/champion_icons/${infoImg}">
          <h4>${infoName}</h4>
        </div>
        <p class="all-info-champ-text">
          <strong>Vida</strong><br>
          ${infoHp} (+${infoHpLvl} por nivel)
        </p>
        <p class="all-info-champ-text">
          <strong>Mana</strong> <br>
          ${infoMp} (+${infoMpLvl} por nivel)
        </p>
        <p class="all-info-champ-text">
          <strong>Regeneración de vida</strong><br>
          ${infoHpRegen} (+${infoHpRegenLvl} por nivel)
        </p>
        <p class="all-info-champ-text">
          <strong>Ataque</strong><br>
          ${infoAttack}
        </p>
        <p class="all-info-champ-text">
         <strong>Rango de ataque</strong><br>
         ${infoAttackRange}
        </p>
        <p class="all-info-champ-text">
         <strong>Velocidad de movimiento</strong><br>
          ${infoMs}
        </p>
        <p class="all-info-champ-text">
         <strong>Armadura</strong><br>
         ${infoArmor} (+${infoArmorLvl} por nivel)
        </p>
        <p class="all-info-champ-text">
         <strong>Resistencia mágica</strong><br>
         ${infoSpellBlock} (+${infoSpellBlockLvl} por nivel)<br>
         </p>
       </div>`
    
      if (championInfoDivB.hasChildNodes()) {
       championInfoDivB.removeChild(championInfoDivB.childNodes[0])
      }
      
      championInfoDivB.appendChild(championInfoDiv.childNodes[1])
 }

 fetch('https://ddragon.leagueoflegends.com/cdn/9.16.1/data/es_MX/champion.json?fbclid=IwAR3T5Vq3DPW17KzxXSNcNvtrKdFdPVJHp5NhZ-XL-csVp23VUs87lR3Rerk')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    showAllOnload(data.data)
  });


  function showAllOnload(dataLol) {  // mostrar todos al inicio
    championInfo;
    let selectedTag = document.getElementById('userSelectedTag').value;
    let allResultFilter = window.filteringResult(selectedTag,dataLol)
      allResultFilter.forEach(e => {
      championImgDiv.innerHTML += 
        `
          <div class="champion-card">
            <div class="champion-card-content" style="cursor: pointer;" id="${e.id}" onclick=championInfo(${JSON.stringify(e.image.full)},${JSON.stringify(e.id)},${e.stats.hp},${e.stats.hpperlevel},${e.stats.hpregen},${e.stats.hpregenperlevel},${e.stats.mp},${e.stats.mpperlevel},${e.stats.attackdamage},${e.stats.attackrange},${e.stats.movespeed},${e.stats.armor},${e.stats.armorperlevel},${e.stats.spellblock},${e.stats.spellblockperlevel})>
              <div class="card-content-img">
                <img src="https://www.masterypoints.com/assets/img/lol/champion_icons/${e.image.full}">
              </div>
              <div class="card-content-p">
                <p>${e.name}</p>
              </div>
            </div>  
          </div>
        `    
      });

    selectChange.addEventListener('change', () => { //mostrar filtro
      let selectedTag = document.getElementById('userSelectedTag').value;
      document.getElementById('userSelectedOrder').value= 0;
      championImgDiv.innerHTML = ""; 
      let allResultFilter = window.filteringResult(selectedTag,dataLol);
      allResultFilter.forEach(e => {
        championImgDiv.innerHTML += 
        `
          <div class="champion-card">
            <div class="champion-card-content" style="cursor: pointer;" id="${e.id}" onclick=championInfo(${JSON.stringify(e.image.full)},${JSON.stringify(e.id)},${e.stats.hp},${e.stats.hpperlevel},${e.stats.hpregen},${e.stats.hpregenperlevel},${e.stats.mp},${e.stats.mpperlevel},${e.stats.attackdamage},${e.stats.attackrange},${e.stats.movespeed},${e.stats.armor},${e.stats.armorperlevel},${e.stats.spellblock},${e.stats.spellblockperlevel})>
              <div class="card-content-img">
                <img src="https://www.masterypoints.com/assets/img/lol/champion_icons/${e.image.full}">
              </div>
              <div class="card-content-p">
                <p>${e.name}</p>
              </div>
            </div>  
          </div>
        `  
      }) 
    })

    orderChange.addEventListener('change', () => { //ordenar segun filtro
      let selectedOrder = document.getElementById('userSelectedOrder').value;
      let selectedTag = document.getElementById('userSelectedTag').value;
      championImgDiv.innerHTML = ""; 
      let champData = window.filteringResult(selectedTag,dataLol)
      let allResultOrder = window.orderData(selectedOrder,champData)
      allResultOrder.forEach(e => {
        if (selectedOrder === 'difficultyEasiestFirst' || selectedOrder === 'difficultyHardestFirst'){//agrega p con dificultad
          championImgDiv.innerHTML +=
          `
          <div class="champion-card">
            <div class="champion-card-content" style="cursor: pointer;" id="${e.id}" onclick=championInfo(${JSON.stringify(e.image.full)},${JSON.stringify(e.id)},${e.stats.hp},${e.stats.hpperlevel},${e.stats.hpregen},${e.stats.hpregenperlevel},${e.stats.mp},${e.stats.mpperlevel},${e.stats.attackdamage},${e.stats.attackrange},${e.stats.movespeed},${e.stats.armor},${e.stats.armorperlevel},${e.stats.spellblock},${e.stats.spellblockperlevel})>
              <div class="card-content-img-difficulty">
                <img src="https://www.masterypoints.com/assets/img/lol/champion_icons/${e.image.full}">
              </div>
              <div class="card-content-p">
                <p class="p-champion-name-difficulty">${e.name}</p>
                <p class="p-champion-difficulty">Dificultad ${e.info.difficulty}</p>
              </div>
            </div>  
          </div>
          `  
        }else{ 
          championImgDiv.innerHTML += 
            `
            <div class="champion-card">
              <div class="champion-card-content" style="cursor: pointer;" id="${e.id}" onclick=championInfo(${JSON.stringify(e.image.full)},${JSON.stringify(e.id)},${e.stats.hp},${e.stats.hpperlevel},${e.stats.hpregen},${e.stats.hpregenperlevel},${e.stats.mp},${e.stats.mpperlevel},${e.stats.attackdamage},${e.stats.attackrange},${e.stats.movespeed},${e.stats.armor},${e.stats.armorperlevel},${e.stats.spellblock},${e.stats.spellblockperlevel})>
                <div class="card-content-img">
                  <img src="https://www.masterypoints.com/assets/img/lol/champion_icons/${e.image.full}">
                </div>
                <div class="card-content-p">
                  <p>${e.name}<p>
                </div>
              </div>  
            </div>
          `     
        }  
      }) 
    })

    clearInfo.addEventListener('click', () => { //BOTON LIMPIAR
        if (isChampionSelected){
          championInfoDiv.removeChild(championInfoDiv.childNodes[1])
          championInfoDivB.removeChild(championInfoDivB.childNodes[0])
          championInfoDiv.innerHTML+=
          `
            <p class="main-info-tex">
              <i>Selecciona un campeón para ver su información aquí</i>
            </p>
          `
        }
        isChampionSelected = false;
    })
  }







