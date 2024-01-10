// Variables Globales

const cardPropiedades = document.querySelector('.propiedades');
const contadorBusqueda = document.querySelector('#contador');
const btnAgregarPropiedad = document.querySelector('#btnAgregarPropiedad');


/* ------ Objetos a través de clases ------ */

// Propiedades 

class Propiedad {
  constructor(nombre, descripcion, src, habitaciones, metros) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.src = src;
    this.habitaciones = habitaciones;
    this.metros = metros;
  }
}

// Usuarios 

class Usuario {
  constructor(nombre, email, telefono) {
    this.nombre = nombre;
    this.email = email;
    this.telefono = telefono;
  }
}

/* ------ Array ------ */

// Propiedades 

const propiedades = [

  new Propiedad('Casa de campo', 'Un lugar ideal para descansar de la ciudad', './assets/img/casa_01.jpg', '2', 170),
  new Propiedad('Casa de playa', 'Despierta tus días oyendo el oceano', './assets/img/casa_02.jpg', '2', 130),
  new Propiedad('Casa en el centro', 'Ten cerca de ti todo lo que necesitas', './assets/img/casa_03.jpg', '1', 80),
  new Propiedad('Casa rodante', 'Conviertete en un nómada del mundo sin salir de tu casa', './assets/img/casa_04.jpg', '1', 6),
  new Propiedad('Departamento', 'Desde las alturas todo se ve mejor', './assets/img/casa_05.jpg', '3', 200),
  new Propiedad('Mansión', 'Vive una vida lujosa en la mansión de tus sueños', './assets/img/casa_06.jpg', '5', 500)

]

// Usuarios 

const usuarios = [
  new Usuario('Adminitrador', 'administrador@mail.com', '12345678')
]


// Función flecha - Mostrar propiedades

const mostrarPropiedades = () => {
  // Vacío  
  cardPropiedades.textContent = '';
  // ForEach - Ciclo
  propiedades.forEach((propiedad) => {
    cardPropiedades.innerHTML += `
      <div class="col py-2">
        <div class="card">
          <img src="${propiedad.src}" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">${propiedad.nombre}</h5>
            <p class="card-text">Cuartos: ${propiedad.habitaciones}</p>
            <p class="card-text">Metros: ${propiedad.metros}</p>
            <button class="btn-secundario" onclick="mostrarInfoCompleta('${propiedad.nombre}', '${propiedad.descripcion}', '${propiedad.src}', ${propiedad.habitaciones}, ${propiedad.metros})">Ver Detalles</button>
          </div>
        </div>
      </div>
    `;
  });


  // Mostrar cantidad 
  contadorBusqueda.innerHTML = (propiedades.length)
}
// Llamada a la función mostrar propiedades

mostrarPropiedades();


/* ------ Agregar nueva propiedad ------ */


document.querySelector('#formNuevaPropiedad').addEventListener('submit', function (event) {
  event.preventDefault();
  agregarPropiedad(event);
});

const agregarPropiedad = (event) => {
  event.preventDefault(); // Evita la recarga de la página

  // Obtener valores del formulario
  const nombre = document.querySelector('#nombre').value;
  const descripcion = document.querySelector('#descripcion').value;
  const src = document.querySelector('#src').value;
  const habitaciones = document.querySelector('#habitaciones').value;
  const metros = document.querySelector('#metros').value;

  // Validar que todos los campos estén llenos
  if (!nombre || !descripcion || !src || !habitaciones || !metros) {
    alert('Debes llenar todos los campos');
    return;
  }

  // Crear una nueva instancia de Propiedad y agregarla al array de propiedades
  const nuevaPropiedad = new Propiedad(nombre, descripcion, src, habitaciones, metros);
  propiedades.push(nuevaPropiedad);

  // Actualizar la visualización de propiedades
  mostrarPropiedades();

  // Guardar en el localStorage
  guardarPropiedades();

  // Cerrar el pop-up
  document.querySelector('#popUpFormulario').classList.remove('show');
  document.body.classList.remove('modal-open');
  document.querySelector('.modal-backdrop').remove();
};


/* ------ Guardar las propiedades en el localStorage ------ */


const guardarPropiedades = () => {
  // Convertir el array de propiedades a cadena JSON
  const propiedadesJSON = JSON.stringify(propiedades);

  // Guardar en el localStorage
  localStorage.setItem('propiedades', propiedadesJSON);
};

// Función flecha - Mostrar propiedades desde el localStorage
const mostrarPropiedadesNuevas = () => {

  // Obtener las propiedades desde el localStorage
  const propiedadesGuardadas = localStorage.getItem('propiedades');

  // Verificar si hay propiedades guardadas
  if (propiedadesGuardadas) {
    // Parsear la cadena JSON a un array
    const propiedadesParseadas = JSON.parse(propiedadesGuardadas);

    // Reemplazar el array actual con las propiedades del localStorage
    propiedades.length = 0;
    propiedades.push(...propiedadesParseadas);

    // Mostrar propiedades en el HTML
    mostrarPropiedades();
  }
};


// Llamada a la función mostrar propiedades desde localStorage
mostrarPropiedadesNuevas();


// Función flecha - Filtro

const filtro = () => {

  let dormitorios = (document.querySelector('#dormitorios').value);
  let desde = (document.querySelector('#desde').value);
  let hasta = (document.querySelector('#hasta').value);

  let FiltroPropiedades = propiedades.filter(
    (propiedad) =>
      propiedad.habitaciones == dormitorios &&
      propiedad.metros >= desde &&
      propiedad.metros <= hasta
  );


  if (dormitorios == '' || desde == '' || hasta == '') {

    //ALERT

    alert('Debes llenar todos los campos');
    return;

  } else if (FiltroPropiedades.length == 0) {
    alert('No se encontró ninguna propiedad en base a los filtros');
    return;

  } else {

    // Vacío
    cardPropiedades.innerHTML = '';

    //ForEach - Mostrar propiedades filtradas 

    FiltroPropiedades.forEach((propiedad) => {
      cardPropiedades.innerHTML += `
      <div class="col py-2">
        <div class="card">
          <img src="${propiedad.src}" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">${propiedad.nombre}</h5>
            <p class="card-text">Cuartos: ${propiedad.habitaciones}</p>
            <p class="card-text">Metros: ${propiedad.metros}</p>
            <button class="btn-secundario" onclick="mostrarInfoCompleta('${propiedad.nombre}', '${propiedad.descripcion}', '${propiedad.src}', ${propiedad.habitaciones}, ${propiedad.metros})">Ver Detalles</button>
          </div>
        </div>
      </div>
    `;
    });

    // Actualizar la propiedad LENGTH
    contadorBusqueda.innerHTML = FiltroPropiedades.length;
    console.log(FiltroPropiedades);
  }
}

/* ------ Mostrar y reservar  ------ */


const mostrarInfoCompleta = (nombre, descripcion, src, habitaciones, metros) => {
  const popUpPropiedad = document.createElement('div');
  const propiedad = propiedades.find(propiedad => propiedad.nombre === nombre);

  // Validar que la propiedad existe - CHAT
  if (!propiedad) {
    console.error('La propiedad no se encontró.');
    return;
  }

  const modalId = `popUpPropiedad_${propiedad.nombre.replace(/\s+/g, '_')}`;

  popUpPropiedad.innerHTML = `
    <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="${modalId}Label" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="${modalId}Label">${nombre}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p><strong>Descripción:</strong> ${descripcion}</p>
            <p><strong>Cuartos:</strong> ${habitaciones}</p>
            <p><strong>Metros:</strong> ${metros}</p>
            <img src="${src}" class="img-fluid" alt="${nombre}">
            <form id="formReserva">
            <div class="mb-3">
                <label for="nombreUsuario" class="form-label">Nombre Completo</label>
                <input type="text" class="form-control" id="nombreUsuario" required>
            </div>
            <div class="mb-3">
                <label for="emailUsuario" class="form-label">Correo Electrónico</label>
                <input type="email" class="form-control" id="emailUsuario" required>
            </div>
            <div class="mb-3">
                <label for="telefonoUsuario" class="form-label">Teléfono de contacto</label>
                <input type="tel" class="form-control" id="telefonoUsuario" required>
            </div>
            <!-- Agrega más campos según sea necesario -->
            <button class="btn-secundario" onclick="realizarReserva('${modalId}', '${nombre}')">Reservar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(popUpPropiedad);

  // Activar el modal
  const modal = new bootstrap.Modal(document.querySelector(`#${modalId}`));
  modal.show();
};

const realizarReserva = (modalId, nombrePropiedad) => {
  const nombreUsuario = document.querySelector(`#${modalId} #nombreUsuario`).value;
  const emailUsuario = document.querySelector(`#${modalId} #emailUsuario`).value;
  const telefonoUsuario = document.querySelector(`#${modalId} #telefonoUsuario`).value;

  // Validar que se hayan ingresado todos los datos
  if (!nombreUsuario || !emailUsuario || !telefonoUsuario) {
    alert('Por favor, completa todos los campos para realizar la reserva.');
    return;
  }

  const nuevaReserva = new Usuario(nombreUsuario, emailUsuario, telefonoUsuario);

  const mensajeReserva = document.createElement('div');
  mensajeReserva.innerHTML = `
      <div class="alert alert-success mt-3" role="alert">
          Muchas gracias, pronto nos pondremos en contacto para gestionar tu reserva.
      </div>
  `;

  // Agregar el mensaje de reserva al cuerpo del modal
  document.querySelector(`#${modalId} .modal-body`).appendChild(mensajeReserva);

  // Obtener el índice de la propiedad actual en el array
  const indicePropiedad = propiedades.findIndex(propiedad => propiedad.nombre === nombrePropiedad);

  // Eliminar la propiedad del array
  if (indicePropiedad !== -1) {
    propiedades.splice(indicePropiedad, 1);
    // Actualizar la visualización de propiedades
    mostrarPropiedades();
    // Guardar en el localStorage
    guardarPropiedades();
  }
};



