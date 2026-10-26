import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["icon", "selectedCount", "addBtn"]

  connect() {

    const saved = JSON.parse(sessionStorage.getItem("iconId")) || []
      this.iconTargets.forEach((icon) => {
      if (saved.includes(icon.dataset.mealId)) {
        icon.classList.replace("fa-plus", "fa-check")
        icon.style.color = "white"
        icon.style.background = "#3D5645"
      }
    })
  }

  selectMeal(event){
      console.log("addMeal controller")
      event.preventDefault()

      let count = parseInt(this.selectedCountTarget.innerHTML, 10) || 0
      const icon = event.currentTarget.querySelector("i")

      if (icon.classList.contains("fa-plus")) {
        icon.classList.replace('fa-plus', 'fa-check')
        icon.style.color ="white"
        icon.style.background ="#3D5645"
        this.selectedCountTarget.innerHTML = count += 1
      } else if (icon.classList.contains("fa-check")) {
        icon.classList.replace('fa-check', 'fa-plus')
        icon.style.color ="black"
        icon.style.background ="white"
        this.selectedCountTarget.innerHTML = count -= 1
      }

      const ids = []
      const selectedIds = []

      this.iconTargets.forEach((icon) => {
        ids.push(icon.dataset.mealId)

        if (icon.classList.contains("fa-check"))
          selectedIds.push(icon.dataset.mealId)
      })

      const savedIds = JSON.parse(sessionStorage.getItem("iconId")) || []
      const keepIds = savedIds.filter(function (id) {
        return !ids.includes(id);
      });
      const mergedIds = [...new Set([...keepIds, ...selectedIds])]

      sessionStorage.setItem("iconId", JSON.stringify(mergedIds))

    }

}
