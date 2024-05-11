function buscar(name) {
    fetchRockets(name);
}

function showRockets(){
    document.getElementById('rockets').style.display = 'block'; 
    document.getElementById('ships').style.display = 'none'; 
    document.getElementById('history').style.display = 'none'; 
}
function showShips(){
    document.getElementById('rockets').style.display = 'none'; 
    document.getElementById('ships').style.display = 'block'; 
    document.getElementById('history').style.display = 'none'; 
}
function showHistory(){
    document.getElementById('rockets').style.display = 'none'; 
    document.getElementById('ships').style.display = 'none'; 
    document.getElementById('history').style.display = 'block'; 
}

function fetchRockets(name) {
    let url = 'https://api.spacexdata.com/v4/rockets/';
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (name) {
                const rocket = data.find(rocket => rocket.name === name);
                if (rocket) {
                    
                    displayInfoRockets(rocket);
                }
            } else {
                console.log(data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function displayInfoRockets(rocket) {
    let generalInfo = document.getElementById("infoRockets");
    generalInfo.innerHTML = `
        <p><b>Nombre: </b>${rocket.name}</p>
        <p><b>Altura: </b>${rocket.height.feet} feet (${rocket.height.meters} meters)</p>
        
        <p><b>Masa: </b>${rocket.mass.lb} lb (${rocket.mass.kg} kg)</p>
        <p><b>Primera Etapa:</b></p>
        <ul>
            <li>Empuje al nivel del mar: ${rocket.first_stage.thrust_sea_level.lbf} lbf (${rocket.first_stage.thrust_sea_level.kN} kN)</li>
            <li>Empuje al vacío: ${rocket.first_stage.thrust_vacuum.lbf} lbf (${rocket.first_stage.thrust_vacuum.kN} kN)</li>
            <li>Reutilizable: ${rocket.first_stage.reusable ? 'Sí' : 'No'}</li>
            <li>Número de motores: ${rocket.first_stage.engines}</li>
            <li>Cantidad de combustible: ${rocket.first_stage.fuel_amount_tons} tons</li>
            <li>Tiempo de combustión: ${rocket.first_stage.burn_time_sec} sec</li>
        </ul>
        <p><b>Segunda Etapa:</b></p>
        <ul>
            <li>Empuje: ${rocket.second_stage.thrust.lbf} lbf (${rocket.second_stage.thrust.kN} kN)</li>
            <li>Reutilizable: ${rocket.second_stage.reusable ? 'Sí' : 'No'}</li>
            <li>Número de motores: ${rocket.second_stage.engines}</li>
            <li>Cantidad de combustible: ${rocket.second_stage.fuel_amount_tons} tons</li>
            <li>Tiempo de combustión: ${rocket.second_stage.burn_time_sec} sec</li>
            <li>Carga útil:</li>
            <ul>
                <li>Altura del carenado compuesto: ${rocket.second_stage.payloads.composite_fairing.height.feet} feet (${rocket.second_stage.payloads.composite_fairing.height.meters} meters)</li>
                <li>Diámetro del carenado compuesto: ${rocket.second_stage.payloads.composite_fairing.diameter.feet} feet (${rocket.second_stage.payloads.composite_fairing.diameter.meters} meters)</li>
            </ul>
        </ul>
        <p><b>Motores:</b></p>
        <ul>
            <li>Tipo: ${rocket.engines.type}</li>
            <li>Versión: ${rocket.engines.version}</li>
            <li>Diseño: ${rocket.engines.layout}</li>
            <li>Rendimiento específico de impulso (ISP):</li>
            <ul>
                <li>Nivel del mar: ${rocket.engines.isp.sea_level} s</li>
                <li>Vacío: ${rocket.engines.isp.vacuum} s</li>
            </ul>
            <li>Empuje al nivel del mar: ${rocket.engines.thrust_sea_level.lbf} lbf (${rocket.engines.thrust_sea_level.kN} kN)</li>
            <li>Empuje al vacío: ${rocket.engines.thrust_vacuum.lbf} lbf (${rocket.engines.thrust_vacuum.kN} kN)</li>
            <li>Número de motores: ${rocket.engines.number}</li>
            <li>Pérdida máxima del motor: ${rocket.engines.engine_loss_max}</li>
            <li>Propelentes: ${rocket.engines.propellant_1}, ${rocket.engines.propellant_2}</li>
            <li>Razón de empuje-peso: ${rocket.engines.thrust_to_weight}</li>
        </ul>
        <p><b>Pesos de la carga útil:</b></p>
        <ul>
            ${rocket.payload_weights.map(payload => `<li>${payload.name}: ${payload.lb} lb (${payload.kg} kg)</li>`).join('')}
        </ul>
        <p><b>Imágenes:</b></p>
        <ul>
            ${rocket.flickr_images.map(image => `<li><img src="${image}" alt="Rocket Image" style="max-width: 300px;"></li>`).join('')}
        </ul>
        <p><b>Enlace a Wikipedia: </b><a href="${rocket.wikipedia}" target="_blank">Link</a></p>
    `;
}


fetchRockets();
