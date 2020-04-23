
const url ='https://geoportal.valencia.es/arcgis/rest/services/OCI/Covid19_Map/MapServer/1/query?f=json'
  + '&where=(provincia%3D%27Castellon%27%20OR%20provincia%3D%27Castell%C3%B3%27%20OR%20provincia%3D%27Valencia%27%20OR%20provincia%3D%27Alicante%27%20OR%20provincia%3D%27Alacant%27%20OR%20provincia%3D%27València%27)'
  + '&returnGeometry=false&spatialRel=esriSpatialRelIntersects'
  + '&outFields=altas%2Ccasos%2Cfallecidos%2Cprovincia%2Cfecha'
  + '&orderByFields=fecha%20asc&resultOffset=0&resultRecordCount=10000'

fetch(url)
.then(function(response) {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
})
.then(function(json) {
  processData(json.features)
});

function extractActiveCasesOfCity(data, cityInSpanish, cityInCatalonian) {
  const items = data.filter(item => item.attributes.provincia === cityInSpanish || item.attributes.provincia === cityInCatalonian)

  const cases = items.map(item => {
    const { attributes } = item
    return attributes.casos
  })

  return cases
}

function extractDeadCasesOfCity(data, cityInSpanish, cityInCatalonian) {
  const items = data.filter(item => item.attributes.provincia === cityInSpanish || item.attributes.provincia === cityInCatalonian)

  const cases = items.map(item => {
    const { attributes } = item
    return attributes.fallecidos
  })

  return cases
}

function extractRecoveredCasesOfCity(data, cityInSpanish, cityInCatalonian) {
  const items = data.filter(item => item.attributes.provincia === cityInSpanish || item.attributes.provincia === cityInCatalonian)

  const cases = items.map(item => {
    const { attributes } = item
    return attributes.altas
  })

  return cases
}

function extractLabels(data) {
  const items = data.filter(item => item.attributes.provincia === 'Alicante' || item.attributes.provincia === 'Alacant')

  const labels = items.map(item => {
    const { attributes } = item
    const date = new Date(attributes.fecha)

    return date.getDate() + '-' + (date.getMonth() + 1)
  })

  return labels
}

function processData(data) {
  const labels = extractLabels(data)

  const valenciaActiveCases = extractActiveCasesOfCity(data, 'Valencia', 'València')
  const alicanteActiveCases = extractActiveCasesOfCity(data, 'Alicante', 'Alacant')
  const castellonActiveCases = extractActiveCasesOfCity(data, 'Castellon', 'Castelló')
  const valenciaDeadCases = extractDeadCasesOfCity(data, 'Valencia', 'València')
  const alicanteDeadCases = extractDeadCasesOfCity(data, 'Alicante', 'Alacant')
  const castellonDeadCases = extractDeadCasesOfCity(data, 'Castellon', 'Castelló')
  const valenciaRecoveredCases = extractRecoveredCasesOfCity(data, 'Valencia', 'València')
  const alicanteRecoveredCases = extractRecoveredCasesOfCity(data, 'Alicante', 'Alacant')
  const castellonRecoveredCases = extractRecoveredCasesOfCity(data, 'Castellon', 'Castelló')

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

  drawGraph(datasets, labels)
}

function drawGraph(datasets, labels) {
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
}
