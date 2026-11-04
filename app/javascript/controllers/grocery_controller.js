import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["ingredient", "checkbox"]

  connect() {
    const checkedIngredients =
      JSON.parse(sessionStorage.getItem("checkedIngredients")) || []

    const ingredient =
      this.ingredientTarget.textContent.trim()

    if (checkedIngredients.includes(ingredient)) {
      this.ingredientTarget.classList.add("checked")
      this.checkboxTarget.checked = true
    }
  }

  toggle() {
    const ingredient =
      this.ingredientTarget.textContent.trim()

    let checkedIngredients =
      JSON.parse(sessionStorage.getItem("checkedIngredients")) || []

    this.ingredientTarget.classList.toggle("checked")

    if (this.ingredientTarget.classList.contains("checked")) {
      this.checkboxTarget.checked = true
      checkedIngredients.push(ingredient)
    } else {
      this.checkboxTarget.checked = false

      checkedIngredients = checkedIngredients.filter(
        (item) => item !== ingredient
      )
    }

    sessionStorage.setItem(
      "checkedIngredients",
      JSON.stringify(checkedIngredients)
    )
  }
}
