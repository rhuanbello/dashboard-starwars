const personagensContador = document.getElementById("personagens");
const luasContador = document.getElementById("luas");
const planetasContador = document.getElementById("planetas");
const navesContador = document.getElementById("naves");

preencherContadores();
preencherTabela();

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(desenharGrafico);

async function desenharGrafico() {
  const response = await swapiGet("vehicles/");
  const vehiclesArray = response.data.results;

  const dataArray = [];
  dataArray.push(["Planetas", "População"]);
  vehiclesArray.forEach((vehicles) => {
    dataArray.push([vehicles.name, Number(vehicles.max_atmosphering_speed)]);
  });

  console.log(dataArray);

  var data = google.visualization.arrayToDataTable(dataArray);

  var options = {
    title: "Veículos mais utilizados na Saga",
    legend: {position: 'bottom', textStyle: {color: 'black', fontSize: 16}},
    

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
    const response = await swapiGet('films/');
    const tableData = response.data.results;
    tableData.forEach(film => {
        $('#filmsTable').append(`<tr>
        <td>${film.title}</td>
        <td>${moment(film.release_date).format("DD/MM/YYYY")}</td>
        <td>${film.director}</td>
        <td>${film.episode_id}</td>
        </tr>`)
    })
    
}

function swapiGet(param) {
    return axios.get(`https://swapi.dev/api/${param}`);
}

console.log(swapiGet("species/"));