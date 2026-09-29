const form = document.getElementById("waitlist-form");
const note = document.getElementById("form-note");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  note.hidden = false;
  form.reset();
});
