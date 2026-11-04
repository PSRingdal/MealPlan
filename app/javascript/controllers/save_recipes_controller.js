import { Controller } from "@hotwired/stimulus"



export default class extends Controller {
  static targets = ["heartIcon"]
  connect() {
  }

  toggleSave(event) {
    console.log("toggle")
    event.preventDefault()
    const heartIcon = event.currentTarget.querySelector("i")

    if (!heartIcon.classList.contains("save-fav")) {
        heartIcon.classList.add("save-fav")
        heartIcon.classList.replace("fa-regular", "fa-solid")
        this.saveRecipe(event)
      } else if (heartIcon.classList.contains("save-fav")) {
        heartIcon.classList.remove("save-fav")
        heartIcon.classList.replace("fa-solid", "fa-regular")
        this.unsaveRecipe(event)
      }
  }

   async saveRecipe(event){
    console.log("saved")
    const heartIcon = event.currentTarget.querySelector("i")

    const id = heartIcon.dataset.mealId

    const currentSession = sessionStorage.getItem("savedMealIds")
    const array = JSON.parse(currentSession) || []
    array.push(id)
    sessionStorage.setItem("savedMealIds", JSON.stringify(array))

    const response = await fetch(`/recipes/${id}/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
      },
    });

      if (response.ok) {
        console.log(response.status)
      }

  }

  async unsaveRecipe(event){
    const card = event.currentTarget.closest(".favourite-card-link")

    console.log("unsaved")
    const heartIcon = event.currentTarget.querySelector("i")

    const id = heartIcon.dataset.mealId

    const currentSession = sessionStorage.getItem("savedMealIds")
    const array = JSON.parse(currentSession) || []
    const updatedSession = array.filter(function (ids) {
      return ids !== id
    })
    sessionStorage.setItem("savedMealIds", JSON.stringify(updatedSession))



    const response = await fetch(`/recipes/${id}/unsave`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
      },
    });

      if (response.ok) {
        console.log(response.status)
        card.remove()
      }
  }


}
