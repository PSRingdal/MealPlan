import { Controller } from "@hotwired/stimulus"



export default class extends Controller {
  static targets = ["heartIcon"]
  connect() {
    console.log("hello from save recipe controller")
  }

  toggleSave(event) {
    console.log("toggle")
    event.preventDefault()
    const heartIcon = event.currentTarget.querySelector("i")

    if (!heartIcon.classList.contains("save-fav")) {
        heartIcon.classList.add("save-fav")
        this.saveRecipe(event)
      } else if (heartIcon.classList.contains("save-fav")) {
        heartIcon.classList.remove("save-fav")
        this.unsaveRecipe(event)
      }
  }

   async saveRecipe(event){
    console.log("saved")
    const heartIcon = event.currentTarget.querySelector("i")


    const id = heartIcon.dataset.mealId

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
    console.log("unsaved")
    const heartIcon = event.currentTarget.querySelector("i")


    const id = heartIcon.dataset.mealId

    const response = await fetch(`/recipes/${id}/unsave`, {
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
}
