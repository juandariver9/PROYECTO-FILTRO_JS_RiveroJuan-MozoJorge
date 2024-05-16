function fetchCapsules(index) {
    let url = 'https://api.spacexdata.com/v4/capsules/';
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (index >= 0 && index < data.length) {
                const capsule = data[index];

                const launchesURL = `https://api.spacexdata.com/v4/launches/${capsule.launches[0]}`;
                fetch(launchesURL)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(launchData => {

                        capsule.launchInfo = launchData;
                        displayInfoCapsules(capsule);
                    })
                    .catch(error => {
                        console.error('Error fetching launches:', error);
                    });
            } else {
                console.log("Índice fuera de rango");
            }
        })
        .catch(error => {
            console.error('Error fetching capsules:', error);
        });
}



function displayInfoCapsules(capsule) {

    let name = document.getElementById('name');

    name.innerHTML = `<p id="name">${capsule.launchInfo.name}</p>`;

    let infoCapsule = document.getElementById('item2');

    infoCapsule.innerHTML = `

    <ul style="margin-left:30px;">
        <li><b>Reuse: </b>${capsule.reuse_count}</li>
        <li><b>Landings in water: </b>${capsule.water_landings}</li>
        <li><b>Ground landings: </b>${capsule.land_landings}</li>
        <li><b>Last update: </b>${capsule.last_update}</li>
        <li><b>Serial Number: </b>${capsule.serial}</li>
        <li><b>Status: </b>${capsule.status}</li>
        <li><b>Type: </b>${capsule.type}</li>
    </ul>

    
    `

    let infoLaunch = document.getElementById('item4');

    infoLaunch.innerHTML = `

    <p><b>Release Information:</b></p>
    <br>
    <ul>
        <li><b>Date UTC:</b> ${capsule.launchInfo.date_utc}</li>
        <li><b>Success:</b> ${capsule.launchInfo.success ? 'Sí' : 'No'}</li>
        <li><b>Details:</b> ${capsule.launchInfo.details}</li>
        <li><b>Article:</b> <a href="${capsule.launchInfo.links.article}">Enlace</a></li>
        <li><b>Webcast:</b> <a href="${capsule.launchInfo.links.webcast}">Ver aquí</a></li>
        
    </ul>
    
    `

    let infoCapsules = document.getElementById("infoCapsules");
    infoCapsules.innerHTML = `

    <img id="imgPatch" src="${capsule.launchInfo.links.patch.large}" alt="Patch Image">

    `;
}


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
