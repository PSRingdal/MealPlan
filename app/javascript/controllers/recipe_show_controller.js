import { Controller } from "@hotwired/stimulus"



export default class extends Controller {
  static targets = ["ingredientList", "instructions"]
  connect() {
    console.log("hello from show controller")
  }

  ingredients() {
    this.ingredientListTarget.classList.remove("d-none")
    this.instructionsTarget.classList.add("d-none")
  }

  instructions() {
    console.log("hello from inst")
    this.ingredientListTarget.classList.add("d-none")
    this.instructionsTarget.classList.remove("d-none")
  }
}
