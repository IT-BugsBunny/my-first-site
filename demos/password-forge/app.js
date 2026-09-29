const passwordEl = document.getElementById("password");
const lengthInput = document.getElementById("length");
const lengthVal = document.getElementById("length-val");
const strengthBar = document.getElementById("strength-bar");
const strengthLabel = document.getElementById("strength-label");
const copyNote = document.getElementById("copy-note");

const sets = {
  upper: "ABCDEFGHJKLMNPQRSTUVWXYZ",
  lower: "abcdefghijkmnopqrstuvwxyz",
  digits: "23456789",
  symbols: "!@#$%^&*-_=+?",
};

function getCharset() {
  let chars = "";
  if (document.getElementById("upper").checked) chars += sets.upper;
  if (document.getElementById("lower").checked) chars += sets.lower;
  if (document.getElementById("digits").checked) chars += sets.digits;
  if (document.getElementById("symbols").checked) chars += sets.symbols;
  return chars;
}

function secureRandomIndex(max) {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

function generate() {
  const length = Number(lengthInput.value);
  let chars = getCharset();

  if (!chars) {
    document.getElementById("lower").checked = true;
    chars = sets.lower;
  }

  let result = "";
  for (let i = 0; i < length; i += 1) {
    result += chars[secureRandomIndex(chars.length)];
  }

  passwordEl.textContent = result;
  updateStrength(length, chars);
}

function updateStrength(length, chars) {
  let score = 0;
  if (length >= 12) score += 1;
  if (length >= 16) score += 1;
  if (length >= 24) score += 1;
  if (/[A-Z]/.test(chars) && /[a-z]/.test(chars)) score += 1;
  if (/\d/.test(chars)) score += 1;
  if (/[^A-Za-z0-9]/.test(chars)) score += 1;

  const levels = [
    { label: "Weak", width: "25%", color: "#ff6b6b" },
    { label: "Fair", width: "45%", color: "#f5c542" },
    { label: "Good", width: "65%", color: "#5ec8ff" },
    { label: "Strong", width: "85%", color: "#3dd68c" },
    { label: "Fortress", width: "100%", color: "#3dd68c" },
  ];

  const level = levels[Math.min(score, levels.length - 1)];
  strengthBar.style.width = level.width;
  strengthBar.style.background = level.color;
  strengthLabel.textContent = level.label;
}

async function copyPassword() {
  const text = passwordEl.textContent;
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const range = document.createRange();
    range.selectNodeContents(passwordEl);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("copy");
    selection.removeAllRanges();
  }

  copyNote.hidden = false;
  setTimeout(() => {
    copyNote.hidden = true;
  }, 1600);
}

lengthInput.addEventListener("input", () => {
  lengthVal.textContent = lengthInput.value;
  generate();
});

["upper", "lower", "digits", "symbols"].forEach((id) => {
  document.getElementById(id).addEventListener("change", generate);
});

document.getElementById("generate-btn").addEventListener("click", generate);
document.getElementById("regen-btn").addEventListener("click", generate);
document.getElementById("copy-btn").addEventListener("click", copyPassword);

generate();
