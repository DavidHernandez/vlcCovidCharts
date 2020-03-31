const labels = Object.keys(data)

let valenciaActiveCases = [];
let alicanteActiveCases = [];
let castellonActiveCases = [];
let valenciaDeadCases = [];
let alicanteDeadCases = [];
let castellonDeadCases = [];
let valenciaRecoveredCases = [];
let alicanteRecoveredCases = [];
let castellonRecoveredCases = [];
let vlcTotalActive = 0
let alcTotalActive = 0
let castellonTotalActive = 0
let vlcTotalDeads = 0
let alcTotalDeads = 0
let castellonTotalDeads = 0
let vlcTotalRecovered = 0
let alcTotalRecovered = 0
let castellonTotalRecovered = 0

for (const day in data) {
  vlcTotalActive += parseInt(data[day]['valencia']) - parseInt(data[day]['valenciaR']) - parseInt(data[day]['valenciaM'])
  valenciaActiveCases.push(vlcTotalActive)

  alcTotalActive += parseInt(data[day]['alicante']) - parseInt(data[day]['alicanteR']) - parseInt(data[day]['alicanteR'])
  alicanteActiveCases.push(alcTotalActive)

  castellonTotalActive += parseInt(data[day]['castellon']) - parseInt(data[day]['castellonR']) - parseInt(data[day]['castellonM'])
  castellonActiveCases.push(castellonTotalActive)

  vlcTotalDeads += parseInt(data[day]['valenciaM'])
  valenciaDeadCases.push(vlcTotalDeads)

  alcTotalDeads += parseInt(data[day]['alicanteM'])
  alicanteDeadCases.push(alcTotalDeads)

  castellonTotalDeads += parseInt(data[day]['castellonM'])
  castellonDeadCases.push(castellonTotalDeads)

  vlcTotalRecovered += parseInt(data[day]['valenciaR'])
  valenciaRecoveredCases.push(vlcTotalRecovered)

  alcTotalRecovered += parseInt(data[day]['alicanteR'])
  alicanteRecoveredCases.push(alcTotalRecovered)

  castellonTotalRecovered += parseInt(data[day]['castellonR'])
  castellonRecoveredCases.push(castellonTotalRecovered)
}

const datasets = [
  {
    label: 'Casos activos Valencia',
    data: valenciaActiveCases,
    fill: false,
    backgroundColor: '#EDBB1A',
    borderColor: '#EDBB1A',
  },
  {
    label: 'Casos activos alicante',
    data: alicanteActiveCases,
    fill: false,
    backgroundColor: '#ffd557',
    borderColor: '#ffd557',
  },
  {
    label: 'Casos activos castellon',
    data: castellonActiveCases,
    fill: false,
    backgroundColor: '#f3dc95',
    borderColor: '#f3dc95',
  },
  {
    label: 'Fallecidos Valencia',
    data: valenciaDeadCases,
    fill: false,
    backgroundColor: '#f60c0c',
    borderColor: '#f60c0c',
  },
  {
    label: 'Fallecidos Alicante',
    data: alicanteDeadCases,
    fill: false,
    backgroundColor: '#ff6666',
    borderColor: '#ff6666',
  },
  {
    label: 'Fallecidos castellon',
    data: castellonDeadCases,
    fill: false,
    backgroundColor: '#f49999',
    borderColor: '#f49999',
  },
  {
    label: 'Recuperados Valencia',
    data: valenciaRecoveredCases,
    fill: false,
    backgroundColor: '#009999',
    borderColor: '#009999',
  },
  {
    label: 'Recuperados Alicante',
    data: alicanteRecoveredCases,
    fill: false,
    backgroundColor: '#2bc1c3',
    borderColor: '#2bc1c3',
  },
  {
    label: 'Recuperados castellon',
    data: castellonRecoveredCases,
    fill: false,
    backgroundColor: '#81eced',
    borderColor: '#81eced',
  },
]

var ctx = document.getElementById('chart').getContext('2d');
var chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels,
        datasets,
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Coronavirus Comunitat Valenciana',
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Dia'
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Numero'
          }
        }]
      },
      plugins: {
        zoom: {
          zoom: {
            enabled: true,
            mode: 'x',
            sensitivity: 3,
          }
        }
      }

    },
});
