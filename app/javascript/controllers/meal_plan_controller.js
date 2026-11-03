import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["removeBtn"]


  connect() {
    console.log("hello from meal plan")
  }

  removeBtn(event) {
  event.preventDefault()

  const meallink = event.currentTarget.closest(".navigation-link")
  const wrapper = meallink.closest(".meal-plan-card-wrapper")
  const cards = wrapper.querySelectorAll(".meal-plan-card")

    if (cards.length === 1) {
      wrapper.remove()
    } else {
      meallink.remove()
    }

  }

}
