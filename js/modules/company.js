function fetchCompany() {
    let url = 'https://api.spacexdata.com/v4/company/';
    fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      displayInfoCompany(data); // Llama a displayInfoCompany con los datos recibidos
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

function displayInfoCompany(company) {

    let address = document.getElementById('item3')

    address.innerHTML = `<p style="font-size:3vw;">${company.headquarters.state} ${company.headquarters.city} ${company.headquarters.address}  </p>`;

    let redes = document.getElementById('item15');

    redes.innerHTML = `
    <div id="containerLinks">
        <a href="${company.links.flickr}"><img id="icon" src="./storage/img/flickrIcon.svg" alt="xd"></a>
        <a href="${company.links.twitter}"><img id="icon" src="./storage/img/twitterIcon.svg" alt="xd"></a>
        <a href="${company.links.website}"><img id="icon" src="./storage/img/spaceXIcon.svg" alt="xd"></a>
    </div>`

    let infoCompany = document.getElementById("infoCompany");
    infoCompany.innerHTML = `
    <p><b>Enlaces:</b></p>
    <ul>
        <li><a href="${company.links.website}" target="_blank">Sitio web</a></li>
        <li><a href="${company.links.flickr}" target="_blank">Galería de Flickr</a></li>
        <li><a href="${company.links.twitter}" target="_blank">Twitter de SpaceX</a></li>
        <li><a href="${company.links.elon_twitter}" target="_blank">Twitter de Elon Musk</a></li>
    </ul>
    <p><b>Fundador: </b>${company.founder}</p>
    <p><b>Año de fundación: </b>${company.founded}</p>
    <p><b>Número de empleados: </b>${company.employees}</p>
    <p><b>Vehículos: </b>${company.vehicles}</p>
    <p><b>Sitios de lanzamiento: </b>${company.launch_sites}</p>
    <p><b>Sitios de prueba: </b>${company.test_sites}</p>
    <p><b>CEO: </b>${company.ceo}</p>
    <p><b>CTO: </b>${company.cto}</p>
    <p><b>COO: </b>${company.coo}</p>
    <p><b>CTO de Propulsión: </b>${company.cto_propulsion}</p>
    <p><b>Valoración: </b>${company.valuation}</p>
    <p><b>Resumen: </b>${company.summary}</p>
    `;

    let info = document.getElementById("infoCompany");
    info.innerHTML = `
    <div class="descriptionContainer">

        <div>
            <img id="check" src="./storage/img/check.svg" alt="check">
        </div>

        <div style="margin-left:15px;">
            <p><b>${rocket.country}</b> </p> 
            ${rocket.description}
        </div>

    </div>`



}

fetchCompany();




let currentGroup = 1;

function showGroup(groupNumber) {
    const groups = document.querySelectorAll('.group');
    groups.forEach(group => {
        group.style.display = 'none';
    });
    document.getElementById(`group${groupNumber}`).style.display = 'flex';
}

function nextGroup() {
    if (currentGroup < 5) {
        currentGroup++;
        showGroup(currentGroup);
    }
}

function prevGroup() {
    if (currentGroup > 1) {
        currentGroup--;
        showGroup(currentGroup);
    }
}

showGroup(currentGroup);
