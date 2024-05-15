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

    let infos = document.getElementById('Company')

    infos.innerHTML = `

    <div class="descriptionContainer">

        <div>
            <img id="check" src="./storage/img/check.svg" alt="check">
        </div>

        <div style="margin-left:15px;">
            <p><b>Founded</b> </p> 
            ${company.founded}
        </div>

    </div>
    
        <div class="descriptionContainer">

        <div>
            <img id="check" src="./storage/img/check.svg" alt="check">
        </div>

        <div style="margin-left:15px;">
            <p><b>Number of Employees</b> </p> 
            ${company.employees}
        </div>

    </div>

    </div>
    
        <div class="descriptionContainer">

        <div>
            <img id="check" src="./storage/img/check.svg" alt="check">
        </div>

        <div style="margin-left:15px;">
            <p><b>Vehicles</b> </p> 
            ${company.vehicles}
        </div>

    </div>

    </div>
    
        <div class="descriptionContainer">

        <div>
            <img id="check" src="./storage/img/check.svg" alt="check">
        </div>

        <div style="margin-left:15px;">
            <p><b>Launch Sites</b> </p> 
            ${company.launch_sites}
        </div>

    </div>

    </div>
    
        <div class="descriptionContainer">

        <div>
            <img id="check" src="./storage/img/check.svg" alt="check">
        </div>

        <div style="margin-left:15px;">
            <p><b>Test Sites</b> </p> 
            ${company.test_sites}
        </div>

    </div>
    `;

    let description = document.getElementById('item3')

    description.innerHTML = `
    <center>
    <p>${company.summary}</p>
    <center>

    `;


    let creators = document.getElementById('item4')

    creators.innerHTML = `

    <div class="descriptionContainer">

        <div>
            <img id="check" src="./storage/img/check.svg" alt="check">
        </div>

        <div style="margin-left:15px;">
            <p><b>Fundador</b> </p> 
            ${company.founder}
        </div>

    </div>

    <div class="descriptionContainer">

        <div>
            <img id="check" src="./storage/img/check.svg" alt="check">
        </div>

        <div style="margin-left:15px;">
            <p><b>CEO</b> </p> 
            ${company.ceo}
        </div>

    </div>

    <div class="descriptionContainer">

        <div>
            <img id="check" src="./storage/img/check.svg" alt="check">
        </div>

        <div style="margin-left:15px;">
            <p><b>CTO</b> </p> 
            ${company.cto}
        </div>

    </div>

    <div class="descriptionContainer">

        <div>
            <img id="check" src="./storage/img/check.svg" alt="check">
        </div>

        <div style="margin-left:15px;">
            <p><b>COO</b> </p> 
            ${company.coo}
        </div>

    </div>

    <div class="descriptionContainer">

        <div>
            <img id="check" src="./storage/img/check.svg" alt="check">
        </div>

        <div style="margin-left:15px;">
            <p><b>Propulsion CTO</b> </p> 
            ${company.cto_propulsion}
        </div>

    </div>

    `

    let address = document.getElementById('item15')

    address.innerHTML = `<p style="font-size:3vw;">${company.headquarters.state} ${company.headquarters.city} ${company.headquarters.address}  </p>`;

    let redes = document.getElementById('item16');

    redes.innerHTML = `
        <a href="${company.links.flickr}"><img id="iconf" class="icon" src="./storage/img/flickrIcon.svg" alt="xd"></a>
        <a href="${company.links.twitter}"><img id="icont" class="icon" src="./storage/img/twitterIcon.svg" alt="xd"></a>
        <a href="${company.links.website}"><img id="icons" class="icon" src="./storage/img/spaceXIcon.svg" alt="xd"></a>
        
    `

    let infoCompany = document.getElementById("item11");
    infoCompany.innerHTML = `

    <p style="font-size: 2vw;"><b>Valoración: </b><br>$ ${company.valuation}</p>
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
