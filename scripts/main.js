const personagensContador = document.getElementById("personagens");
const luasContador = document.getElementById("luas");
const planetasContador = document.getElementById("planetas");
const navesContador = document.getElementById("naves");

preencherContadores();
preencherTabela();


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
}

function swapiGet(param) {
    return axios.get(`https://swapi.dev/api/${param}`);
}