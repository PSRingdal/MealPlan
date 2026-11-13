import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["button", "form"]

  toggle() {
    this.buttonTarget.classList.toggle("d-none")
    this.formTarget.classList.toggle("d-none")
    this.element.classList.toggle("expanded")
  }

  clearSelection() {
  sessionStorage.setItem("iconId", JSON.stringify([]))
}
}
