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
    let infoCompany = document.getElementById("infoCompany");
    infoCompany.innerHTML = `
    <p><b>Dirección de la sede: </b>${company.headquarters.address}, ${company.headquarters.city}, ${company.headquarters.state}</p>
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
