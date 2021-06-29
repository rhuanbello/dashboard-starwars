const personagensContador = document.getElementById("personagens");
const luasContador = document.getElementById("luas");
const planetasContador = document.getElementById("planetas");
const navesContador = document.getElementById("naves");

preencherContadores();
preencherTabela();

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(desenharGrafico);

async function desenharGrafico() {
  const response = await swapiGet("planets/");
  const planetsArray = response.data.results;

  const dataArray = [];
  dataArray.push(["Planetas", "População"]);
  planetsArray.forEach((planets) => {
    dataArray.push([planets.name, Number(planets.diameter)]);
  });

  console.log(dataArray);

  var data = google.visualization.arrayToDataTable(dataArray);

  var options = {
    title: "Maiores Planetas em Diâmetro",
    legend: {position: 'bottom', textStyle: {color: 'black', fontSize: 16}},
    pieSliceTextStyle: {fontSize: 12, bold: 'true'},
    is3D: "true",
    fontSize: "16",
    colors:['#786fa6','#c44569', '#e15f41', '#546de5', '#f19066', '#cf6a87', '#e77f67', '#778beb', '#f7d794', '#f3a683']
  };

  var chart = new google.visualization.PieChart(
    document.getElementById("piechart")
  );

  chart.draw(data, options);
}


function preencherContadores() {
    Promise.all([
        swapiGet("people/"),
        swapiGet("species/"),
        swapiGet("planets/"),
        swapiGet("vehicles/"),
    ]).then(function(results) {
        console.log(results);
        personagensContador.innerHTML = results[0].data.count;
        luasContador.innerHTML = results[1].data.count;
        planetasContador.innerHTML = results[2].data.count;
        navesContador.innerHTML = results[3].data.count;
    });
}

async function preencherTabela() {
    const response = await swapiGet('planets/');
    const tableData = response.data.results;
    tableData.forEach(planets => {
        $('#planetsTable').append(`<tr>
        <td>${planets.name}</td>
        <td>${planets.population}</td>
        <td>${planets.climate}</td>
        <td>${planets.terrain}</td>
        </tr>`)
    })
    
}

function swapiGet(param) {
    return axios.get(`https://swapi.dev/api/${param}`);
}