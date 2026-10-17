import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["sidebar", "addIcon", "recipeCount"]


  connect() {
    console.log("connected")
    console.log(this.element)
  console.log(this.hasRecipeCountTarget)
  }

  async review() {

    const ids = [];

    this.addIconTargets.forEach((icon) => {
      if (icon.classList.contains("fa-check")) {
        ids.push(icon.dataset.mealId);
      }
    });


   const response = await fetch("/recipes/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "text/vnd.turbo-stream.html",
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
      },
      body: JSON.stringify({ meal_ids: ids })
    });
    const html = await response.text()
    Turbo.renderStreamMessage(html)
  }

  async removeBtn(event){
    event.preventDefault()

    let count = parseInt(this.recipeCountTarget.innerHTML)
    const recipe = event.currentTarget.closest(".review-card")

    this.addIconTargets.forEach((icon) => {
      if (icon.dataset.mealId === recipe.dataset.recipeId) {
        icon.classList.replace('fa-check', 'fa-plus')
        icon.style.color ="black"
        icon.style.background ="white"

        const currentSession = sessionStorage.getItem("iconId")
        const array = JSON.parse(currentSession)
        const updatedSession = array.filter(function (ids) {
          return ids !== icon.dataset.mealId
        })
          sessionStorage.setItem("iconId", JSON.stringify(updatedSession))
      }
    });

    const updatedMealIds = JSON.parse(sessionStorage.getItem("iconId"))

     const response = await fetch("/recipes/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "text/vnd.turbo-stream.html",
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
      },
        body: JSON.stringify({ meal_ids: updatedMealIds })
      });
        const html = await response.text()
        Turbo.renderStreamMessage(html)

    recipe.remove()

    this.recipeCountTarget.innerHTML = count -= 1

  }




  openSidebar() {
   this.sidebarTarget.classList.toggle("open");
  }


}
