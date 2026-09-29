const output = document.getElementById("output");
const form = document.getElementById("cli-form");
const input = document.getElementById("cli");

const history = [];
let historyIndex = -1;

function print(text, className = "out") {
  const line = document.createElement("div");
  line.className = `line ${className}`;
  line.textContent = text;
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}

function printHtml(html, className = "out") {
  const line = document.createElement("div");
  line.className = `line ${className}`;
  line.innerHTML = html;
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}

const commands = {
  help() {
    print("Доступные команды:", "info");
    print("  help       — список команд");
    print("  whoami     — кто я");
    print("  skills     — стек и навыки");
    print("  stack      — чем собираю продукты");
    print("  contact    — как связаться");
    print("  neofetch   — системный баннер");
    print("  clear      — очистить экран");
    print("  hire       — почему стоит работать вместе");
  },

  whoami() {
    print("anton · IT_BugsBunny", "ok");
    print("Веб + Linux/DevOps · собираю рабочие демо с ИИ");
  },

  skills() {
    print("• Linux / администрирование серверов", "ok");
    print("• HTML / CSS / JavaScript");
    print("• AI-инструменты для ускорения разработки");
    print("• Быстрые прототипы с живыми демо");
  },

  stack() {
    print("Frontend: HTML, CSS, vanilla JS", "info");
    print("Ops: Linux, shell, серверный быт");
    print("Workflow: Cursor + AI-агенты");
  },

  contact() {
    print("Email: Anton.Kraynik@gmail.com", "info");
    print("Telegram: @IT_BugsBunny");
    print("WhatsApp / Instagram: см. портфолио");
  },

  neofetch() {
    printHtml(
      `<span style="color:#3dd68c">        .--.
       |o_o |
       |:_/ |
      //   \\ \\
     (|     | )
    /'\\_   _/\`\\
    \\___)=(___/</span>`,
      "ok"
    );
    print("OS: Portfolio Linux x86_64");
    print("Host: vibe-coder.local");
    print("Shell: bash 5.x · Theme: dark-ops");
    print("Uptime: building cool stuff");
  },

  hire() {
    print("Что получите:", "ok");
    print("• Живые демо, а не только скриншоты");
    print("• Понятный код и быстрые итерации");
    print("• Связку веб-интерфейса и серверного мышления");
    print("Напишите в Telegram — обсудим задачу.", "info");
  },

  clear() {
    output.innerHTML = "";
  },
};

function boot() {
  print("Command Deck v1.0 — interactive portfolio shell", "muted");
  print('Введите "help" для списка команд.', "muted");
  print("");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const raw = input.value.trim();
  if (!raw) return;

  print(`➜ ${raw}`, "cmd");
  history.unshift(raw);
  historyIndex = -1;

  const [name, ...args] = raw.toLowerCase().split(/\s+/);
  const fn = commands[name];

  if (fn) {
    fn(args);
  } else {
    print(`command not found: ${name}`, "err");
    print('Подсказка: наберите "help"', "muted");
  }

  input.value = "";
});

input.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    event.preventDefault();
    if (historyIndex < history.length - 1) {
      historyIndex += 1;
      input.value = history[historyIndex] || "";
    }
  }
  if (event.key === "ArrowDown") {
    event.preventDefault();
    if (historyIndex > 0) {
      historyIndex -= 1;
      input.value = history[historyIndex] || "";
    } else {
      historyIndex = -1;
      input.value = "";
    }
  }
});

boot();
input.focus();
document.getElementById("terminal").addEventListener("click", () => input.focus());
