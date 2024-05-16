function fetchHistory(index) {
    let url = 'https://api.spacexdata.com/v4/history/';
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (index >= 0 && index < data.length) {
                const event = data[index];
                displayInfoHistory(event);
            } else {
                console.log('Índice de evento histórico fuera de rango.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function displayInfoHistory(history) {

    let name = document.getElementById('item1');

    name.innerHTML = `
    <p id="title">${history.title.toUpperCase()}</p>
    `;

    let details = document.getElementById('item2')

    details.innerHTML = `

    <div class="descriptionContainer">

        <div>
            <img id="check" src="./storage/img/check.svg" alt="check">
        </div>

        <div style="margin-left:15px;">
            <p><b>Details</b> </p> 
            ${history.details}
        </div>

    </div>

    <div class="descriptionContainer">

        <div>
            <img id="check" src="./storage/img/check.svg" alt="check">
        </div>

        <div style="margin-left:15px;">
            <p><b>Links</b> </p> 
            <ul>
                <li><a href="${history.links.article}" target="_blank">Artículo</a></li>
            </ul>
        </div>

    </div>
    `

    let date = document.getElementById('item4')

    date.innerHTML = `

    <div class="descriptionContainer">

        <div>
            <img id="check" src="./storage/img/check.svg" alt="check">
        </div>

        <div style="margin-left:15px;">
            <p><b>Event date (UTC)</b> </p> 
            ${history.event_date_utc}
        </div>

    </div>

    <div class="descriptionContainer">

        <div>
            <img id="check" src="./storage/img/check.svg" alt="check">
        </div>

        <div style="margin-left:15px;">
            <p><b>Event date (Unix)</b> </p> 
            ${history.event_date_unix}
        </div>

    </div>

    `

    let infoHistory = document.getElementById("infoHistory");
    infoHistory.innerHTML = `

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



/*-------------------------------------------------------- */

