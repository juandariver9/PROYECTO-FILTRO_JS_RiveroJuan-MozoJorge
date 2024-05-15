function showRockets() {
    document.getElementById('rockets').style.display = 'block';
    document.getElementById('capsules').style.display = 'none';
    document.getElementById('history').style.display = 'none';
}
function showCapsules() {
    document.getElementById('rockets').style.display = 'none';
    document.getElementById('capsules').style.display = 'block';
    document.getElementById('history').style.display = 'none';

}
function showHistory() {
    document.getElementById('rockets').style.display = 'none';
    document.getElementById('capsules').style.display = 'none';
    document.getElementById('history').style.display = 'block';
}

function fetchRockets(index) {
    let url = 'https://api.spacexdata.com/v4/rockets/';
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (index >= 0 && index < data.length) {
                const rocket = data[index];
                displayInfoRockets(rocket);

            } else {
                console.log('Índice de cohete fuera de rango.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}




//------

function displayInfoRockets(rocket) {
    let namerocket = document.getElementById("item3");
    namerocket.innerHTML = `${rocket.name}`;

    let infoExtra = document.getElementById("containerInfoExtra");
    infoExtra.innerHTML = ''; // Limpiar el contenido existente

    // Función para crear contenedores de información comunes
    function createCommonInfoContainer(title, value1, value2, progressId, percentage) {
        let container = document.createElement("div");
        container.classList.add("conteinersInfoExtra");

        let leftDiv = document.createElement("div");
        leftDiv.classList.add("izquierda");
        let leftText = document.createElement("p");
        leftText.textContent = title;
        let progressContainer = document.createElement("div");
        progressContainer.classList.add("progress-container");
        let progressBar = document.createElement("div");
        progressBar.classList.add("progress-bar");
        progressBar.id = progressId;

        progressContainer.appendChild(progressBar);
        leftDiv.appendChild(leftText);
        leftDiv.appendChild(progressContainer);

        let rightDiv = document.createElement("div");
        rightDiv.classList.add("derecha");
        let value1Element = document.createElement("p");
        value1Element.textContent = value1;
        let value2Element = document.createElement("p");
        value2Element.textContent = value2;

        rightDiv.appendChild(value1Element);
        rightDiv.appendChild(value2Element);

        container.appendChild(leftDiv);
        container.appendChild(rightDiv);

        infoExtra.appendChild(container);

        setTimeout(() => {
            fillProgressBar(progressId, percentage);
        }, 0);
    }

    // Mostrar información común para todos los cohetes
    createCommonInfoContainer("Rocket weight :", `${rocket.mass.kg} kg`, `${rocket.mass.lb} lb`, "myBar1", 90);
    createCommonInfoContainer("Rocket Height :", `${rocket.height.meters} meters`, `${rocket.height.feet} feet`, "myBar2", 90);
    createCommonInfoContainer("Rocket diameter :", `${rocket.diameter.meters} meters`, `${rocket.diameter.feet} feet`, "myBar3", 90);
    createCommonInfoContainer("Diameter rocket shield :", `${rocket.second_stage.payloads.composite_fairing.diameter.meters} meters`, `${rocket.second_stage.payloads.composite_fairing.diameter.feet} feet`, "myBar4", 50);
    createCommonInfoContainer("Height rocket shield :", `${rocket.second_stage.payloads.composite_fairing.height.meters} meters`, `${rocket.second_stage.payloads.composite_fairing.height.feet} feet`, "myBar5", 40);

    // Mostrar información específica de carga útil para cada cohete
    rocket.payload_weights.forEach((payload, index) => {
        let payloadContainer = document.createElement("div");
        payloadContainer.classList.add("conteinersInfoExtra");

        let leftDiv = document.createElement("div");
        leftDiv.classList.add("izquierda");
        let leftText = document.createElement("p");
        leftText.textContent = payload.name + " :";
        let progressBarContainer = document.createElement("div");
        progressBarContainer.classList.add("progress-container");
        let progressBar = document.createElement("div");
        progressBar.classList.add("progress-bar");
        progressBar.id = `myBar_${index}`;

        progressBarContainer.appendChild(progressBar);
        leftDiv.appendChild(leftText);
        leftDiv.appendChild(progressBarContainer);

        let rightDiv = document.createElement("div");
        rightDiv.classList.add("derecha");
        let weightKg = document.createElement("p");
        weightKg.textContent = `${payload.kg} kg`;
        let weightLb = document.createElement("p");
        weightLb.textContent = `${payload.lb} lb`;

        rightDiv.appendChild(weightKg);
        rightDiv.appendChild(weightLb);

        payloadContainer.appendChild(leftDiv);
        payloadContainer.appendChild(rightDiv);

        infoExtra.appendChild(payloadContainer);

        setTimeout(() => {
            fillProgressBar(`myBar_${index}`, 50); // Cambiar 100 al porcentaje deseado
        }, 0);
    });


function fillProgressBar(barId, percentage) {
    var elem = document.getElementById(barId);
    var width = 0;
    var id = setInterval(frame, 2);
    function frame() {
        if (width >= percentage) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
        }
    }
}


    /*-----------------------------------------------------*/ 

    let imagenes = document.getElementById("carrusel");

    imagenes.innerHTML = `
        ${rocket.flickr_images.map(image => `<img src="${image}" alt="Rocket Image" style="max-width: 17vw; max-height: 20vw;">`).join('')}
    `;
    let etapa1 = document.getElementById("infoEtapa1");
    etapa1.innerHTML = `
    <div class="descriptionContainer">

        <div>
            <img id="check" src="./storage/img/check.svg" alt="check">
        </div>

        <div style="margin-left:15px;">
            <p><b>${rocket.country}</b> </p> 
            ${rocket.description}
        </div>

    </div>

    <div class="descriptionContainer">

        <div>
            <img id="check" src="./storage/img/check.svg" alt="check">
        </div>

        <div style="margin-left:15px;">
            <p><b>The estimated cost per rocket launch</b> </p> 
            $${rocket.cost_per_launch}
        </div>

    </div>

    <div class="descriptionContainer">

        <div>
            <img id="check" src="./storage/img/check.svg" alt="check">
        </div>

        <div style="margin-left:15px;">
            <p><b>The date of the first flight of the rocket</b> </p> 
            $${rocket.first_flight}
        </div>
        
    </div>

    <div class="descriptionContainer">

        <div>
            <img id="check" src="./storage/img/check.svg" alt="check">
        </div>

        <div style="margin-left:15px;">
            <p><b>Read more about the coete</b> </p> 
            <a href="${rocket.wikipedia}" target="_blank">Here</a>
        </div>
        
    </div>
    
    `
    let infoRocket = document.getElementById('item13')


    infoRocket.innerHTML = `

    <div class="containerInfoEngine">
        <div> 
            <p style="display:flex;justify-content:center;"><b>INFORMATION ROCKET</b></p>
            <hr>
        </div>

        <div id="contentEngine">
            <div class="left">
                <p><span>Type</span></p> 
                <p><span>Rocket in service</span></p>
                <p><span>Number of stages</span></p>
                <p><span>Number of propellants</span></p>
                <p><span>Landing legs</span></p>
                <p><span>Leg material</span></p>
            </div>
            <div class="right">
                <p>${rocket.type}</p>
                <p>${rocket.active ? 'Active' : 'Disable'}</p>
                <p>${rocket.stages}</p>
                <p>${rocket.boosters}</p>
                <p>${rocket.landing_legs.number}</p>
                <p>${rocket.landing_legs.material}</p>
            </div>
        </div>

    </div>
`

    let engines = document.getElementById('item14')

    engines.innerHTML = `

    <div class="containerInfoEngine">
        <div> 
            <p style="display:flex;justify-content:center;"><b>ENGINE INFORMATION:</b></p>
            <hr>
        </div>

        <div id="contentEngine">
            <div class="left">
                <p><span>Type</span></p>
                <p><span>Maximum power loss</span></p>
                <p><span>Engine Availability</span></p>
                <p><span>Number of engines</span></p>
                <p><span>Stage 1 fuel</span></p>
                <p><span>Stage 2 fuel</span></p>
            </div>
            <div class="right">
                <p>${rocket.engines.type}</p>
                <p>${rocket.engines.engine_loss_max}</p>
                <p>${rocket.engines.layout}</p>
                <p>${rocket.first_stage.engines}</p>
                <p>${rocket.engines.propellant_1}</p>
                <p>${rocket.engines.propellant_2}</p>
            </div>
        </div>

    </div>
    
    </div>
`

    let generalInfo = document.getElementById("infoRockets");

    generalInfo.innerHTML = `
        <p><b>Altura: </b>${rocket.height.feet} feet (${rocket.height.meters} meters)</p>
        
        <p><b>Masa: </b>${rocket.mass.lb} lb (${rocket.mass.kg} kg)</p>

                <li>Altura del carenado compuesto: ${rocket.second_stage.payloads.composite_fairing.height.feet} feet (${rocket.second_stage.payloads.composite_fairing.height.meters} meters)</li>
                <li>Diámetro del carenado compuesto: ${rocket.second_stage.payloads.composite_fairing.diameter.feet} feet (${rocket.second_stage.payloads.composite_fairing.diameter.meters} meters)</li>
            </ul>
        </ul>

        <p><b>Pesos de la carga útil:</b></p>
        <ul>
            ${rocket.payload_weights.map(payload => `<li>${payload.name}: ${payload.lb} lb (${payload.kg} kg)</li>`).join('')}
        </ul>
        <p><b>Enlace a Wikipedia: </b><a href="${rocket.wikipedia}" target="_blank">Link</a></p>
    `;

}
/*------------------------------Carrusel---------------------------------------*/

let imagenes = document.getElementById("carrusel");
let currentIndex = 0;

// Función para actualizar el carrusel con nuevas imágenes
function actualizarCarrusel(images) {
    imagenes.innerHTML = images.map(image => `<img src="${image}" alt="Rocket Image">`).join('');
}

// Funciones para navegar por el carrusel
function mostrarSiguiente() {
    if (currentIndex < imagenes.children.length - 1) {
        currentIndex++;
        actualizarTransform();
    }
}

function mostrarAnterior() {
    if (currentIndex > 0) {
        currentIndex--;
        actualizarTransform();
    }
}

function actualizarTransform() {
    const slideWidth = imagenes.children[0].clientWidth;
    imagenes.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

// Asignar eventos a los botones
document.getElementById("prevBtn").addEventListener("click", mostrarAnterior);
document.getElementById("nextBtn").addEventListener("click", mostrarSiguiente);

// Ejemplo de uso: Suponiendo que tienes un array de imágenes 'rocket.flickr_images'
let images = rocket.flickr_images;
actualizarCarrusel(images);


/*---------------------------------------------------------------------*/






function updateBar() {
    var input = document.getElementById("velocityInput").value;
    var progressBar = document.getElementById("progressBar");
    progressBar.style.width = (input * 10) + "%";
}
