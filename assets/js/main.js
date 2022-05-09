const toggleSwitch = document.querySelector('#theme-toggle input[type="checkbox"]');
toggleSwitch.addEventListener('change', switchTheme, false);

if(localStorage.getItem('theme') == "colorscheme-light") {
  toggleSwitch.checked = false;
  switchTheme()
}

function switchTheme(event) {
  let body = document.getElementsByTagName("body")[0];
  let theme = body.className == "colorscheme-dark" ? "colorscheme-light" : "colorscheme-dark";
  body.className = ''
  if (event) { // Means button was pressed by user - prevents flash of incorrect theme on page load
    body.style.transition = "0.5s";
    {{ if not .Site.IsServer }}
      fetch("https://app.piratepx.com/ship?p=4a819009-8828-4b89-8dc7-b0a547406820&i=darkmode")
    {{ end }}
  }
  body.classList.add(theme);
  localStorage.setItem('theme', theme);
}

const menuToggle = document.getElementById("menu-toggle");
menuToggle.addEventListener('change', function() {
  if(this.checked) {
    document.addEventListener('click', detect);
  } else {
    document.removeEventListener('click', detect);
  }
});
function detect(event) {
  let navigationList = document.getElementById('navigation-list');
  let label = document.querySelector('#menu-toggle + label svg');
  let isClickInsideElement = navigationList.contains(event.target) || label.contains(event.target);
  if (!isClickInsideElement) {
    menuToggle.checked = false;
    document.removeEventListener('click', detect);
  }
}