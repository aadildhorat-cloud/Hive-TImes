// js/include.js
function includeHTML(url, targetId) {
  fetch(url)
    .then(response => response.text())
    .then(html => {
      document.getElementById(targetId).outerHTML = html;
    })
    .catch(err => {
      console.error("Failed to load menu:", err);
      document.getElementById(targetId).textContent = "Business menu failed to load.";
    });
}