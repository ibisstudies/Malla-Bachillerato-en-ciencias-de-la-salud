function toggleCourse(el) {
  if (el.classList.contains("disabled")) return;
  el.classList.toggle("done");

  if (el.classList.contains("done")) {
    for (let i = 0; i < 8; i++) {
      const sparkle = document.createElement("span");
      sparkle.className = "sparkle";
      sparkle.style.left = `${Math.random() * 100}%`;
      sparkle.style.top = `${Math.random() * 100}%`;
      el.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 600);
    }
  }

  saveProgress();
  checkPrerequisites();
}

function checkPrerequisites() {
  const allCourses = document.querySelectorAll(".course");
  allCourses.forEach(course => {
    const prereq = course.dataset.prereq;
    if (prereq) {
      const prereqCourse = document.getElementById(prereq);
      if (prereqCourse && prereqCourse.classList.contains("done")) {
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
    if (el && done) el.classList.add("done");
  });
  checkPrerequisites();
}

window.onload = loadProgress;
