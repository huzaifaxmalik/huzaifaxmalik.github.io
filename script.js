/* ===== CONTENT HERE ===== */
// Add each Medium post manually: title, desc, tags and url
const posts = [
  {
    title: "SQHell: Manual SQL injection with detailed explanation",
    desc: "Practical guide to learn and implement the techniques of finding advanced SQL injections in web applications",
    tags: ["SQLi", "Web"],
    url: "https://medium.com/bugbountywriteup/sqhell-manually-hunting-sql-injection-with-detailed-explanation-8fd24360c65e",
  },
  {
    title: "Prioritise: Explore some less common SQL Injection techniques",
    desc: "Test your advance SQL injection techniques by finding SQLi on a to-do application",
    tags: ["SQLi", "Web"],
    url: "https://darkoffense.medium.com/prioritise-explore-some-less-common-sql-injection-techniques-229b751e9460?sharedUserId=darkoffense",
  },
  {
    title: "Cap: Easy Level HackTheBox Linux Machine",
    desc: "Learn enumeration, web hacking and privilege escalation by solving HackTheBox Linux machine",
    tags: ["IDOR", "Web", "Linux", "PrivEsc"],
    url: "https://medium.com/bugbountywriteup/cap-easy-level-hackthebox-linux-machine-feea61e860a5",
  },
];
const resources = [
  {
    title: "Web Pentest Checklist [Coming Soon]",
    desc: "A practical checklist for recon through reporting",
    price: "Free",
    url: "https://gumroad.com/",
  },
  {
    title: "Bug Bounty Recon Cheatsheet [Coming Soon]",
    desc: "Tools, one-liners and workflows for fast recon",
    price: "Free",
    url: "https://gumroad.com/",
  },
];
const skills = ["Web & API", "VAPT", "Bug Bounty"];
const links = [
  {
    label: " Medium",
    icon: "simple-icons:medium",
    url: "https://darkoffense.medium.com/",
  },
  {
    label: " GitHub",
    icon: "simple-icons:github",
    url: "https://github.com/huzaifaxmalik",
  },
  {
    label: " LinkedIn",
    icon: "fa6-brands:linkedin",
    url: "https://linkedin.com/in/huzaifa-x-malik",
  },
  // { label: "Email", icon: "simple-icons:gmail", url: "mailto:business@mail.com" },
];
/* =================================== */
const $ = (s) => document.querySelector(s);
const esc = (s) =>
  String(s).replace(
    /[&<>"]/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
      })[c],
  );
const store = {
  get(k) {
    try {
      return localStorage.getItem(k);
    } catch (e) {
      return null;
    }
  },
  set(k, v) {
    try {
      localStorage.setItem(k, v);
    } catch (e) {}
  },
};
/* Theme */
function applyTheme(mode) {
  const r = document.documentElement;
  mode === "system"
    ? r.removeAttribute("data-theme")
    : r.setAttribute("data-theme", mode);
  document
    .querySelectorAll("#theme button")
    .forEach((b) => b.setAttribute("aria-pressed", b.dataset.mode === mode));
  store.set("theme", mode);
}
$("#theme").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (b) applyTheme(b.dataset.mode);
});
applyTheme(store.get("theme") || "system");
/* Tabs */
const tabs = ["posts", "about", "resources"];

function show(id) {
  if (!tabs.includes(id)) id = "posts";
  tabs.forEach((t) => ($("#" + t).hidden = t !== id));
  document
    .querySelectorAll("nav button")
    .forEach((b) => b.setAttribute("aria-selected", b.dataset.tab === id));
  if (location.hash !== "#" + id) history.replaceState(null, "", "#" + id);
}
document.querySelector("nav").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (b) show(b.dataset.tab);
});
window.addEventListener("hashchange", () => show(location.hash.slice(1)));
/* Posts */
function renderPosts(list) {
  $("#postGrid").innerHTML = list
    .map(
      (p) => `
    <a class="card" href="${esc(p.url)}" target="_blank" rel="noopener">
      <div class="meta mono"><span>Medium &#8599;</span></div>
      <h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p>
      <div class="tags">${(p.tags || []).map((t) => `<span class="tag mono">${esc(t)}</span>`).join("")}</div>
    </a>`,
    )
    .join("");
}
renderPosts(posts);
/* Resources */
function renderRes(f) {
  $("#resGrid").innerHTML = resources
    .filter((r) => f === "all" || (f === "free") === /^free$/i.test(r.price))
    .map((r) => {
      const free = /^free$/i.test(r.price);
      return `<a class="card" href="${esc(r.url)}" target="_blank" rel="noopener">
      <div class="meta mono"><span>Gumroad &#8599;</span><span class="badge ${free ? "" : "paid"}">${esc(r.price)}</span></div>
      <h3>${esc(r.title)}</h3><p>${esc(r.desc)}</p></a>`;
    })
    .join("");
}
$("#filters").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  document
    .querySelectorAll("#filters button")
    .forEach((x) => x.setAttribute("aria-pressed", x === b));
  renderRes(b.dataset.f);
});
renderRes("all");
/* About */
$("#skills").innerHTML = skills
  .map((s) => `<span class="tag mono">${esc(s)}</span>`)
  .join("");
$("#links").innerHTML = links
  .map(
    (l) =>
      `<a class="btn" href="${esc(l.url)}" target="_blank" rel="noopener">${
        l.icon
          ? `<span class="iconify" data-icon="${esc(l.icon)}" aria-hidden="true"></span>`
          : ""
      }<span>${esc(l.label)}</span></a>`,
  )
  .join("");
if (window.Iconify && Iconify.scan) Iconify.scan();
$("#yr").textContent = new Date().getFullYear();
show(location.hash.slice(1));
