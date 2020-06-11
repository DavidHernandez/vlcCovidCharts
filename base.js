
const url = "https://services6.arcgis.com/POowwbv4rcaNpUgV/arcgis/rest/services/acumulados_comunitatvalenciana/FeatureServer/0/query?"
  + "f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Data%20asc&resultOffset=0"
  + "&resultRecordCount=32000&resultType=standard&cacheHint=true"
//const url ='https://geoportal.valencia.es/arcgis/rest/services/OCI/Covid19_Map/MapServer/1/query?f=json'
  //+ '&where=(provincia%3D%27Castellon%27%20OR%20provincia%3D%27Castell%C3%B3%27%20OR%20provincia%3D%27Valencia%27%20OR%20provincia%3D%27Alicante%27%20OR%20provincia%3D%27Alacant%27%20OR%20provincia%3D%27València%27)'
  //+ '&returnGeometry=false&spatialRel=esriSpatialRelIntersects'
  //+ '&outFields=altas%2Ccasos%2Cfallecidos%2Cprovincia%2Cfecha'
  //+ '&orderByFields=fecha%20asc&resultOffset=0&resultRecordCount=10000'

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

function extractLabels(data) {
  const labels = data.map(item => {
    const { attributes } = item
    const date = new Date(attributes.Data)

    return date.getDate() + '-' + (date.getMonth() + 1)
  })

  return labels
}

function processData(data) {
  const labels = extractLabels(data)

  const activeCases = data.map(item => {
    const { attributes } = item
    return attributes.Casos_Actius
  })

  const deadCases = data.map(item => {
    const { attributes } = item
    return attributes.Morts
  })

  const recoveredCases = data.map(item => {
    const { attributes } = item
    return attributes.Recuperats
  })

  const datasets = [
    {
      label: 'Casos activos',
      data: activeCases,
      fill: false,
      backgroundColor: '#EDBB1A',
      borderColor: '#EDBB1A',
    },
    {
      label: 'Fallecidos',
      data: deadCases,
      fill: false,
      backgroundColor: '#f49999',
      borderColor: '#f49999',
    },
    {
      label: 'Recuperados',
      data: recoveredCases,
      fill: false,
      backgroundColor: '#009999',
      borderColor: '#009999',
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
