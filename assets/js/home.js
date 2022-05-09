let portrait = document.querySelector('.avatar');
portrait.addEventListener('click', () => {
  portrait.classList.toggle("flip")
  {{ if not .Site.IsServer }}
    fetch("https://app.piratepx.com/ship?p=4a819009-8828-4b89-8dc7-b0a547406820&i=lookingAtMyFace")
  {{ end }}
})
