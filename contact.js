/*
  ====================================================================
  FORMULARIO DE CONTACTO — envío real de correo (EmailJS, gratis)
  ====================================================================
  Este sitio es estático (GitHub Pages), por lo que no existe un
  servidor propio que pueda enviar correos. Para cumplir con el
  requisito del profesor ("formulario de contacto con envío de
  respuesta automática al cliente") se usa EmailJS, un servicio
  gratuito que envía el correo directamente desde el navegador.

  PASOS PARA ACTIVARLO (una sola vez, dura ~5 min):
  1. Crea una cuenta gratis en https://www.emailjs.com
  2. Conecta tu correo (Gmail, Outlook, etc.) como "Email Service"
     y copia el "Service ID".
  3. Crea un "Email Template" con variables {{name}}, {{email}}
     y {{message}} — este es el correo que TÚ recibes.
     Copia el "Template ID".
  4. (Opcional, para autorespuesta) crea un segundo template dirigido
     a {{email}} que diga algo como "Gracias por tu mensaje, {{name}}"
     y copia ese "Template ID" en AUTOREPLY_TEMPLATE_ID.
  5. En "Account" copia tu "Public Key".
  6. Reemplaza los 4 valores de abajo con los tuyos.

  Mientras no configures tus claves, el formulario seguirá
  funcionando: mostrará el mensaje de confirmación en pantalla,
  pero no llegará ningún correo real.
  ====================================================================
*/

const EMAILJS_PUBLIC_KEY = "TU_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "TU_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "TU_TEMPLATE_ID";          // correo que te llega a ti
const AUTOREPLY_TEMPLATE_ID = "";                       // opcional: correo de confirmación al remitente

(function () {
  const isConfigured =
    typeof emailjs !== "undefined" &&
    EMAILJS_PUBLIC_KEY !== "TU_PUBLIC_KEY" &&
    EMAILJS_SERVICE_ID !== "TU_SERVICE_ID" &&
    EMAILJS_TEMPLATE_ID !== "TU_TEMPLATE_ID";

  if (typeof emailjs !== "undefined" && EMAILJS_PUBLIC_KEY !== "TU_PUBLIC_KEY") {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  const form = document.getElementById("contactForm");
  if (!form) return;

  const statusEl = document.getElementById("c-status");
  const submitBtn = document.getElementById("c-submit");

  function showStatus(kind, text) {
    statusEl.className = "form-status " + kind;
    statusEl.textContent = text;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("c-name").value.trim();
    const email = document.getElementById("c-email").value.trim();
    const message = document.getElementById("c-msg").value.trim();

    if (!name || !email || !message) {
      showStatus("err", "✕ Completa todos los campos antes de enviar.");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Enviando...';

    const params = { name: name, email: email, message: message };

    const finish = function (ok) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar mensaje';
      if (ok) {
        showStatus("ok", "✓ Mensaje enviado. ¡Gracias por escribirme, " + name + "!");
        form.reset();
      } else {
        showStatus("err", "✕ No se pudo enviar el mensaje. Intenta de nuevo más tarde.");
      }
    };

    if (!isConfigured) {
      // Sin claves configuradas: solo confirmación visual (no se envía correo real).
      setTimeout(function () { finish(true); }, 600);
      return;
    }

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)
      .then(function () {
        if (AUTOREPLY_TEMPLATE_ID) {
          return emailjs.send(EMAILJS_SERVICE_ID, AUTOREPLY_TEMPLATE_ID, params);
        }
      })
      .then(function () { finish(true); })
      .catch(function () { finish(false); });
  });
})();
