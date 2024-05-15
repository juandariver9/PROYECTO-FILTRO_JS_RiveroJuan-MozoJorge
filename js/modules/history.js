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

    name.innerHTML = `<p>${history.title}</p>`;

    let infoHistory = document.getElementById("infoHistory");
    infoHistory.innerHTML = `
    <p><b>Fecha del evento (UTC): </b>${history.event_date_utc}</p>
    <p><b>Fecha del evento (Unix): </b>${history.event_date_unix}</p>
    <p><b>Detalles: </b>${history.details}</p>
    <p><b>Enlaces:</b></p>
    <ul>
        <li><a href="${history.links.article}" target="_blank">Artículo</a></li>
    </ul>
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

