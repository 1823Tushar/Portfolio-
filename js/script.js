// ---- Edit this array with your real projects ----
const projects = [
  { title: "Wanderlust ", short: "Travel Stays Platform",
    desc: "Full-stack property rental platform with user authentication, listing CRUD, and review management.",
    stack: ["MongoDB", "Express.js ","Node.js"," EJS" ," React"], live: "#", code: "https://github.com/1823Tushar/WanderLust" },
  { title: "Zerodha Trading Platform", short: "Holdings and Watchlists are Available Buy and sell Stocks.",
    desc: "Stock trading interface featuring real-time market watchlists, holdings analytics, and order placement UI.",
    stack: ["React" ,"JavaScript", "Tailwind CSS"], live: "https://zerodha-fo.vercel.app/", code: "https://github.com/1823Tushar/Zerodha-" },
  { title: "Spotify ", short: "Web Player UI.",
    desc: "Responsive music streaming interface with interactive playback controls, playlists, and library navigation.",
    stack: ["HTML5", "CSS3", "JavaScript"], live: "#", code: "https://github.com/1823Tushar/SPOTIFY-CLN" }
];

const $ = (s) => document.querySelector(s);

// ---- Render project cards ----
const grid = $("#projectsGrid");
projects.forEach((p, i) => {
  const card = document.createElement("button");
  card.className = "project-card";
  card.dataset.index = i;
  card.innerHTML = `<h3>${p.title}</h3><p>${p.short}</p>
    <div class="tag-row">${p.stack.map((t) => `<span class="tag">${t}</span>`).join("")}</div>`;
  grid.appendChild(card);
});

// ---- Project modal (native <dialog>) ----
const modal = $("#projectModal");
grid.addEventListener("click", (e) => {
  const card = e.target.closest(".project-card");
  if (!card) return;
  const p = projects[card.dataset.index];
  $("#modalTitle").textContent = p.title;
  $("#modalDesc").textContent = p.desc;
  $("#modalStack").textContent = p.stack.join(" · ");
  $("#modalLive").href = p.live;
  $("#modalCode").href = p.code;
  modal.showModal();
});
$("#closeModal").addEventListener("click", () => modal.close());
modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); }); // click backdrop

// ---- Mobile hamburger menu ----
const menuBtn = $("#menuBtn"), nav = $("#nav");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
nav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") { nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", false); }
});

// ---- Dark / light theme ----
const root = document.documentElement;
let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
root.dataset.theme = saved || (prefersDark ? "dark" : "light");
$("#themeBtn").addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
});

$("#year").textContent = new Date().getFullYear();
