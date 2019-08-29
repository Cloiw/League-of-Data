const errorMsgA = document.getElementById('errorMsgA');
const errorMsgB = document.getElementById('errorMsgB');

const calculateBtnA = document.getElementById('btnCalculateAverageA');
const calculateBtnB = document.getElementById('btnCalculateAverageB');

const chartDivDamageA= document.getElementById('piechartDamageA');
const chartDivMagicA= document.getElementById('piechartMagicA');
const chartDivDefenseA= document.getElementById('piechartDefenseA');
const chartDivDamageB= document.getElementById('piechartDamageB');
const chartDivMagicB= document.getElementById('piechartMagicB');
const chartDivDefenseB= document.getElementById('piechartDefenseB');

let showMyTeamTotalA = document.getElementById("averageTeamA");
let showMyTeamTotalB = document.getElementById('averageTeamB');

const topSelectA = document.getElementById('topFirstTeam');
const jungleSelectA = document.getElementById('jungleFirstTeam');
const midSelectA = document.getElementById('midFirstTeam');
const adcSelectA = document.getElementById('adcFirstTeam');
const supportSelectA = document.getElementById('supportFirstTeam');
const topSelectB = document.getElementById('topSecondTeam');
const jungleSelectB = document.getElementById('jungleSecondTeam');
const midSelectB = document.getElementById('midSecondTeam');
const adcSelectB = document.getElementById('adcSecondTeam');
const supportSelectB = document.getElementById('supportSecondTeam');
const goToIndexButton = document.getElementById('btnBackAvg');
const clearButton = document.getElementById('btnClearAvg');
google.charts.load('current', {'packages':['corechart']});

goToIndexButton.addEventListener('click', () => {
  window.location.href='index.html'
});

clearButton.addEventListener('click', () => {
  chartDivDamageA.innerHTML = ""
  chartDivDefenseA.innerHTML = ""
  chartDivMagicA.innerHTML = ""
  chartDivDamageB.innerHTML = ""
  chartDivDefenseB.innerHTML = ""
  chartDivMagicB.innerHTML = ""
  showMyTeamTotalA.innerHTML=""
  showMyTeamTotalA.innerHTML+= 
  `<p class="textCalculated average"><br>
    <i>Selecciona un campeón para cada linea</i><br><br>
  </p>
  `
  showMyTeamTotalB.innerHTML="";
  showMyTeamTotalB.innerHTML+= 
  `<p class="textCalculated average"><br>
    <i>Selecciona un campeón para cada linea</i><br><br>
  </p>
  `
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 50;
});

//CREAR OPCIONES PARA SELECT
const createSelectOptions = (select,data) => {
  const dataNames = Object.values(data).map(x => x.id);
  dataNames.forEach(e => {
    select.options[select.options.length] = new Option(e, e);
  });
}

//FUNCIÓN DE CHART
const drawChart = (champion, info, top, jungle, mid, adc, support, dataTop, dataJungle, dataMid, dataAdc,
dataSupport, chartDiv) => {
  let data = google.visualization.arrayToDataTable([
    [champion, info],
    [top, dataTop],
    [jungle, dataJungle],
    [mid, dataMid],
    [adc, dataAdc],
    [support, dataSupport],]);

  let options = {
    width: 300,
    height: 300,
    pieSliceText:'label',
    fontName:'Scada',
    title:info, 
    slices: {
      0: {color: 'red'}, 
      1:{color: 'green'}, 
      2:{color: '#19407f'}, 
      3: {color: '#d1a434'},
      4:{color: '#f442e5'}
    },
    pieSliceTextStyle: {
      fontName: 'Scada',
      fontSize: 15
    },
    backgroundColor: {
      fill: 'transparent'
    },
    legend: {
      textStyle: {
        color: 'white',
        fontSize: 15,
        bold: true
      },
      position: 'none'
    },
    titleTextStyle: {
      color: 'white',
      fontSize: 20,
      bold: true
    }
  }
let chart = new google.visualization.PieChart(chartDiv);
  chart.draw(data, options);
}

fetch('https://ddragon.leagueoflegends.com/cdn/9.16.1/data/es_MX/champion.json?fbclid=IwAR3T5Vq3DPW17KzxXSNcNvtrKdFdPVJHp5NhZ-XL-csVp23VUs87lR3Rerk')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    const dataLol = data.data
    createSelectOptions(topSelectA,dataLol);
    createSelectOptions(jungleSelectA,dataLol);
    createSelectOptions(midSelectA,dataLol);
    createSelectOptions(adcSelectA,dataLol);
    createSelectOptions(supportSelectA,dataLol);
    createSelectOptions(topSelectB,dataLol);
    createSelectOptions(jungleSelectB,dataLol);
    createSelectOptions(midSelectB,dataLol);
    createSelectOptions(adcSelectB,dataLol);
    createSelectOptions(supportSelectB,dataLol);


    calculateBtnA.addEventListener("click", () => {  //BOTON TEAM 1-A
      let topTotal = document.getElementById("topFirstTeam").value;
      let jungleTotal= document.getElementById("jungleFirstTeam").value;
      let midTotal = document.getElementById("midFirstTeam").value;
      let adcTotal = document.getElementById("adcFirstTeam").value;
      let supportTotal = document.getElementById("supportFirstTeam").value;

      let calculateAllAttacks = window.calculateAllAttacks(topTotal,jungleTotal,midTotal,adcTotal,supportTotal,dataLol);
      let calculateAttackRange = window.calculateAttackRange(topTotal,jungleTotal,midTotal,adcTotal,supportTotal,dataLol);
      let calculateDefense = window.calculateDefense(topTotal,jungleTotal,midTotal,adcTotal,supportTotal,dataLol);
      let calculateMagic = window.calculateMagic(topTotal,jungleTotal,midTotal,adcTotal,supportTotal,dataLol);
      errorMsgA.innerHTML="";

      if( topTotal == 0 || jungleTotal == 0 || midTotal == 0  || supportTotal == 0 ){
        errorMsgA.innerHTML += 
        `<p class="error-msg"><i>Por favor elige un campeón para cada posicion</i></p>`
        return
      }

      showMyTeamTotalA.innerHTML="";
      showMyTeamTotalA.innerHTML+= 
      ` <div class = "col-md-12 average">
          <p class = "textCalculated">
            ATAQUE<br>
            ${calculateAllAttacks}
          </p>
        </div>
        <div class = "col-md-12 average">
          <p class = "textCalculated"> 
            ATAQUE MÁGICO<br>
            ${calculateMagic}
          </p>
        </div>
        <div class = "col-md-12 average">
          <p class = "textCalculated"> 
            DEFENSA<br>
            ${calculateDefense}
          </p>
        </div>
        <div class="col-md-12 average">
          <p class="textCalculated"> 
            RANGO DE ATAQUE<br>
            ${calculateAttackRange}
          </p>
        </div>
      `
      drawChart('CAMPEÓN', 'ATAQUE', topTotal, jungleTotal, midTotal, adcTotal, supportTotal, dataLol[topTotal].info.attack,
      dataLol[jungleTotal].info.attack, dataLol[midTotal].info.attack, dataLol[adcTotal].info.attack, dataLol[supportTotal].info.attack, chartDivDamageA);

      drawChart('CAMPEÓN', 'ATAQUE MÁGICO', topTotal, jungleTotal, midTotal, adcTotal, supportTotal,dataLol[topTotal].info.magic,
      dataLol[jungleTotal].info.magic, dataLol[midTotal].info.magic, dataLol[adcTotal].info.magic, dataLol[supportTotal].info.magic, chartDivMagicA);

      drawChart('CAMPEÓN', 'DEFENSA', topTotal, jungleTotal, midTotal, adcTotal, supportTotal, dataLol[topTotal].info.defense,
      dataLol[jungleTotal].info.defense, dataLol[midTotal].info.defense, dataLol[adcTotal].info.defense, dataLol[supportTotal].info.defense, chartDivDefenseA);
    });

    calculateBtnB.addEventListener("click", () => {//BOTON TEAM 2-B
      let topTotal = document.getElementById('topSecondTeam').value;
      let jungleTotal = document.getElementById('jungleSecondTeam').value;
      let midTotal = document.getElementById('midSecondTeam').value;
      let adcTotal = document.getElementById('adcSecondTeam').value;
      let supportTotal=document.getElementById('supportSecondTeam').value;

      let calculateAllAttacks = window.calculateAllAttacks(topTotal, jungleTotal, midTotal, adcTotal, supportTotal, dataLol);
      let calculateAttackRange = window.calculateAttackRange(topTotal, jungleTotal, midTotal, adcTotal, supportTotal, dataLol);
      let calculateDefense = window.calculateDefense(topTotal, jungleTotal, midTotal, adcTotal, supportTotal, dataLol);
      let calculateMagic = window.calculateMagic(topTotal, jungleTotal, midTotal, adcTotal, supportTotal, dataLol);
      
      errorMsgB.innerHTML="";

      if( topTotal == 0 || jungleTotal == 0 || midTotal == 0  || supportTotal == 0 ){
        errorMsgB.innerHTML += 
        `<p class="error-msg"><i>Por favor elige un campeón para cada posicion</i></p>`
        return
      }

      showMyTeamTotalB.innerHTML="";
      showMyTeamTotalB.innerHTML+= 
      ` <div class = "col-md-12 average">
          <p class = "textCalculated">
            ATAQUE<br>
            ${calculateAllAttacks}
          </p>
        </div>
        <div class = "col-md-12 average">
          <p class = "textCalculated"> 
            ATAQUE MÁGICO<br>
            ${calculateMagic}
          </p>
        </div>
        <div class = "col-md-12 average">
          <p class = "textCalculated"> 
            DEFENSA<br>
            ${calculateDefense}
          </p>
        </div>
        <div class="col-md-12 average">
          <p class="textCalculated"> 
            RANGO DE ATAQUE<br>
            ${calculateAttackRange}
          </p>
        </div>
      `
      drawChart('CAMPEÓN', 'ATAQUE', topTotal, jungleTotal, midTotal, adcTotal, supportTotal, dataLol[topTotal].info.attack,
      dataLol[jungleTotal].info.attack, dataLol[midTotal].info.attack, dataLol[adcTotal].info.attack, dataLol[supportTotal].info.attack, chartDivDamageB);

      drawChart('CAMPEÓN', 'ATAQUE MÁGICO', topTotal, jungleTotal, midTotal, adcTotal, supportTotal,dataLol[topTotal].info.magic,
      dataLol[jungleTotal].info.magic, dataLol[midTotal].info.magic, dataLol[adcTotal].info.magic, dataLol[supportTotal].info.magic, chartDivMagicB);

      drawChart('CAMPEÓN', 'DEFENSA', topTotal, jungleTotal, midTotal, adcTotal, supportTotal, dataLol[topTotal].info.defense,
      dataLol[jungleTotal].info.defense, dataLol[midTotal].info.defense, dataLol[adcTotal].info.defense, dataLol[supportTotal].info.defense, chartDivDefenseB);
    });
  })

