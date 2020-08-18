  function filterList(checkbox, tag) {
    let lis = document.querySelectorAll("[data-tags*="+tag+"]");
    
    if (checkbox.checked) {
      lis.forEach(li => {
          li.classList.remove("hide")
      })
      return;
    }


    let checkboxes = document.getElementsByClassName("filter");
    checkboxes = Array.from(checkboxes).filter(c => c.checked)
    let visibleTags = checkboxes.map(c => c.id)
    console.log('@visibleTags: ', visibleTags);
    
    lis.forEach(li => {
      let hideLi = true;
      visibleTags.forEach(vt => {
        if (li.attributes["data-tags"].nodeValue.includes(vt)) {
          return hideLi = false
        }
      })
      
      if (hideLi) {
        li.classList.add("hide")
      }
      
    })

  }