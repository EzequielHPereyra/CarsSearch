const brand = document.querySelector ('#marca');
const year = document.querySelector ('#year');
const minimo = document.querySelector ('#minimo');
const maximum = document.querySelector ('#maximo');
const dors = document.querySelector ('#puertas');
const transmision = document.querySelector ('#transmision');
const color = document.querySelector ('#color');

const resultado = document.querySelector('#resultado');

const max = new Date ().getFullYear()
const min = max - 10;

const searchDate = {
    marca : '',
    year : '',
    minimo : '',
    maximo : '',
    puertas : '',
    transmision : '',
    color : '',
}

document.addEventListener('DOMContentLoaded', () => {
    showCars(autos);
    fillSelection();
})

brand.addEventListener('change', e => {
    searchDate.marca = e.target.value;

    carfilter();
})
year.addEventListener('change', e => {
    searchDate.year = parseInt(e.target.value);

    carfilter();
})
minimo.addEventListener('change', e => {
    searchDate.minimo = e.target.value;

    carfilter();
})
maximum.addEventListener('change', e => {
    searchDate.maximo = e.target.value;

    carfilter();
})
dors.addEventListener('change', e => {
    searchDate.puertas = parseInt(e.target.value);
    carfilter();
})
transmision.addEventListener('change', e => {
    searchDate.transmision = e.target.value;
    carfilter();
})
color.addEventListener('change', e => {
    searchDate.color = e.target.value;
    carfilter();
})

function showCars(autos) {
    clearHtml();
    autos.forEach( auto => {
        const autoHtml = document.createElement('p')
        const {marca, modelo, year, puertas, transmision, precio, color} = auto;
        autoHtml.textContent = `
        ${marca} - ${modelo} -  ${year} - ${puertas} - ${transmision} - $ ${precio} - ${color}`;

        resultado.appendChild(autoHtml);
    })
}

function clearHtml() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}

function fillSelection() {
    for ( let i = max; i >= min; i-- ) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        year.appendChild(option);
    }
}

function carfilter() {
    const result = autos.filter( brandFilter ).filter (yearFilter).filter (minFilter).filter (maxFilter).filter (dorsFilter).filter (transmisionFilter).filter (colorFilter)

    

    if (result.length) {
        showCars (result);
    } else {
        noResults();
    }
}

function noResults() {
    clearHtml();
    const noResults = document.createElement('div');
    noResults.classList.add ('alerta','error');
    noResults.textContent = 'No Existen autos con esas caracteristicas';
    resultado.appendChild (noResults);
}

function brandFilter(auto) {
    const {marca} = searchDate;
   if ( marca ) {
       return auto.marca === marca;
   }
   return auto;
}

function yearFilter(auto) {
    const {year} = searchDate;
   if ( year ) {
       return auto.year === year;
   }
   return auto;
}

function minFilter(auto) {
    const {minimo} = searchDate;
   if ( minimo ) {
       return auto.precio >= minimo;
   }
   return auto;
}

function maxFilter(auto) {
    const {maximo} = searchDate;
   if ( maximo ) {
       return auto.precio <= maximo;
   }
   return auto;
}

function dorsFilter(auto) {
    const {puertas} = searchDate;
    if ( puertas ) {
        return auto.puertas === puertas;
    }
    return auto;
}

function transmisionFilter(auto) {
    const {transmision} = searchDate;
   if ( transmision ) {
       return auto.transmision === transmision;
   }
   return auto;
}

function colorFilter(auto) {
    const {color} = searchDate;
   if ( color ) {
       return auto.color === color;
   }
   return auto;
}