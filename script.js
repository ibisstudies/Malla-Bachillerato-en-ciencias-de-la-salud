document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  // Cargar estado guardado
  const estado = JSON.parse(localStorage.getItem("estadoRamos")) || {};

  function guardarEstado() {
    localStorage.setItem("estadoRamos", JSON.stringify(estado));
  }

  function mostrarCorazones(x, y) {
    for (let i = 0; i < 3; i++) {
      const heart = document.createElement("div");
      heart.classList.add("heart");
      heart.innerText = "💖";
      heart.style.left = `${x + Math.random() * 30 - 15}px`;
      heart.style.top = `${y + Math.random() * 30 - 15}px`;
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 1000);
    }
  }

  function actualizarEstado() {
    ramos.forEach(ramo => {
      const id = ramo.dataset.id;
      ramo.classList.remove("bloqueado", "aprobado");

      const dep = ramo.dataset.dep;
      const aprobado = estado[id];

      if (aprobado) {
        ramo.classList.add("aprobado");
      } else if (dep === "bio1" && !estado["bio1"]) {
        ramo.classList.add("bloqueado");
!["bio1", "mate1", "quim1", "com1", "voc1"].every(r => estado[r])) {
        ramo.classList.add("bloqueado");
      }
    });
  }

  ramos.forEach(ramo => {
    ramo.addEventListener("click", (e) => {
      const id = ramo.dataset.id;
      if (ramo.classList.contains("bloqueado")) return;

      estado[id] = !estado[id]; // alterna entre aprobado y no aprobado
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
