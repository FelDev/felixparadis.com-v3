function filterList(tag) {
  let lis = document.querySelectorAll("[data-tags]");

  if (tag == "all") {
    lis.forEach(li => {
      li.classList.remove("hide")
    })
  } else {
    lis.forEach(li => {
      if (li.attributes["data-tags"].nodeValue.includes(tag)) {
        return li.classList.remove("hide")
      }
      li.classList.add("hide")
    })
  }
  
}