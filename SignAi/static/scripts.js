/*Funcion para la busqueda*/
async function enviarPregunta() {
  const mensaje = document.getElementById("mensaje").value;
  const chatlog = document.getElementById("chatlog");

  if (!mensaje.trim()) return;

  chatlog.innerHTML += `<div class="chat-user">
  <p>${mensaje} : <i class="fa-solid fa-user"></i></p>
  </div>`;

  try {
    const res = await fetch(`http://localhost:2414/chat/search?q=${mensaje}`);
    const data = await res.json();

    if (data && typeof data === 'object') {
      const respuestas = Object.entries(data).map(([clave, item]) => {
        // Si tiene "descripcion"
        if (item.descripcion) {
          return `<div class="chat-bot">
          <p><i class="fa-solid fa-hands-praying"></i>: ${item.descripcion}</p>
          </div>`;
        }
        // Si tiene "como_se_hace"
        else if (item.como_se_hace) {
          return `<div class="chat-bot">
          <p><i class="fa-solid fa-hands-praying"></i>: ${item.como_se_hace}</p>
          <div class="imagen"><img src="${item.imagen_referencia}"></div>
          </div>
          `;
        }
        // Si solo tiene "salida"
        else if (item.salida) {
          return `<div class="chat-bot">
          <p><i class="fa-solid fa-hands-praying"></i>: ${item.salida}</p>
          </div>`;
        }
        return `<div class="chat-bot">
          <p><i class="fa-solid fa-hands-praying"></i>: No hay una respuesta clara.</p>
          </div>`;
      }).join("");

      chatlog.innerHTML += respuestas;
    } else if (data.message) {
      chatlog.innerHTML += `<div class="chat-bot">
          <p><i class="fa-solid fa-hands-praying"></i>: ${data.message}</p>
          </div>`;
    } else {
      chatlog.innerHTML += `<div class="chat-bot">
          <p><i class="fa-solid fa-hands-praying"></i>: No entendí eso.</p>
          </div>`;
    }
    document.getElementById("mensaje").value = "";

  } catch (err) {
    chatlog.innerHTML += `<div class="chat-bot">
          <p><i class="fa-solid fa-hands-praying"></i>: Error al conectar con el servidor.</p>
          </div>`;
    console.error(err);
  }
}

/*funcion del historial*/
async function cargarHistorial() {
  try {
    const res = await fetch("http://localhost:2414/chat/historial"); 
    const data = await res.json();
    const contenedor = document.getElementById("historial");

    if (data.length === 0) {
      contenedor.innerHTML = "<p>No hay historial aún.</p>";
      return;
    }

    data.forEach(item => {
      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
        <p class="fecha"><i class="fa-solid fa-calendar"></i>  ${new Date(item.fecha).toLocaleString()}</p>
        <p class="concepto">${item.mensaje}</p>`;
        contenedor.appendChild(div);
      });

    }catch (err) {
      console.error("Error al cargar historial:", err);
    }
  }