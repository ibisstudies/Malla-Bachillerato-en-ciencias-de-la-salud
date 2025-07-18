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
  for (let i = 0; i < 8; i++) {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.top = `${Math.random() * 100}%`;
    el.appendChild(heart);
    setTimeout(() => heart.remove(), 800);
  }
}

function checkPrerequisites() {
  const allCourses = document.querySelectorAll(".course");
  const firstSemesterDone = [...document.querySelectorAll("#bio1, #mate1, #quim1, #habcom, #orient")]
    .every(c => c.classList.contains("done"));

  allCourses.forEach(course => {
    const prereq = course.dataset.prereq;
    const group = course.dataset.group;

    if (prereq) {
      const prereqCourse = document.getElementById(prereq);
      if (prereqCourse && prereqCourse.classList.contains("done")) {
        course.classList.remove("disabled");
      } else {
        course.classList.add("disabled");
        course.classList.remove("done");
      }
    }

    if (group === "second") {
      if (firstSemesterDone) {
        course.classList.remove("disabled");
      } else {
        course.classList.add("disabled");
        course.classList.remove("done");
      }
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
      if (!el.classList.contains("disabled")) {
        createHearts(el);
      }
    }
  });
  checkPrerequisites();
}

window.onload = loadProgress;
