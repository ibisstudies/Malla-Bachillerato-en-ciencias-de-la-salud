function toggleCourse(el) {
  if (el.classList.contains("disabled")) return;

  el.classList.toggle("done");

  if (el.classList.contains("done")) {
    createHearts(el);
  }

  saveProgress();
  checkPrerequisites();
}

function createHearts(el) {
  for (let i = 0; i < 6; i++) {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.top = `${Math.random() * 100}%`;
    el.appendChild(heart);
    setTimeout(() => heart.remove(), 800);
  }
}

function checkPrerequisites() {
  const bio1 = document.getElementById("bio1");
  const firstSemesterDone = [...document.querySelectorAll("#bio1, #mate1, #quim1, #habcom, #orient")]
    .every(btn => btn.classList.contains("done"));

  // Biología celular depende solo de Fund. Biología
  const bio2 = document.getElementById("bio2");
  if (bio1.classList.contains("done")) {
    bio2.classList.remove("disabled");
  } else {
    bio2.classList.add("disabled");
    bio2.classList.remove("done");
  }

  // El resto del segundo semestre depende de TODO el primer semestre aprobado
  document.querySelectorAll('[data-group="second"]').forEach(btn => {
    if (firstSemesterDone) {
      btn.classList.remove("disabled");
    } else {
      btn.classList.add("disabled");
      btn.classList.remove("done");
    }
  });
}

function saveProgress() {
  const courseStates = {};
  document.querySelectorAll(".course").forEach(course => {
    courseStates[course.id] = course.classList.contains("done");
  });
  localStorage.setItem("mallaProgress", JSON.stringify(courseStates));
}

function loadProgress() {
  const saved = JSON.parse(localStorage.getItem("mallaProgress") || "{}");

  Object.entries(saved).forEach(([id, done]) => {
    const el = document.getElementById(id);
    if (el && done) {
      el.classList.add("done");
    }
  });

  checkPrerequisites();
}

window.onload = loadProgress;
