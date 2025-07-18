document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  const estado = JSON.parse(localStorage.getItem("estadoRamos")) || {};

  function guardarEstado() {
    localStorage.setItem("estadoRamos", JSON.stringify(estado));
  }

  function mostrarCorazones(x, y) {
    for (let i = 0; i < 3; i++) {
      const heart = document.createElement("div");
      heart.classList.add("heart");
      heart.innerText = "♥";
      heart.style.left = `${x + Math.random() * 30 - 15}px`;
      heart.style.top = `${y + Math.random() * 30 - 15}px`;
      heart.style.position = "absolute";
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 1000);
    }
  }

  function actualizarEstado() {
    ramos.forEach(ramo => {
      const id = ramo.dataset.id;
      const dep = ramo.dataset.dep;
      const aprobado = estado[id];

      ramo.classList.remove("bloqueado", "aprobado");

      if (aprobado) {
        ramo.classList.add("aprobado");
      } else if (dep === "bio1" && !estado["bio1"]) {
        ramo.classList.add("bloqueado");
      } else if (
        dep === "all1" &&
        !["bio1", "mate1", "quim1", "com1", "voc1"].every(r => estado[r])
      ) {
        ramo.classList.add("bloqueado");
      }
    });
  }

  ramos.forEach(ramo => {
    ramo.addEventListener("click", () => {
      const id = ramo.dataset.id;
      if (ramo.classList.contains("bloqueado")) return;

      estado[id] = !estado[id];
      guardarEstado();
      actualizarEstado();

      if (estado[id]) {
        const rect = ramo.getBoundingClientRect();
        mostrarCorazones(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
    });
  });

  actualizarEstado();
});
