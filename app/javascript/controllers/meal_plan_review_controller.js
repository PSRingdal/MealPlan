import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["addIcon"]


  connect() {
    console.log("connected")
  }

  async review(event) {
    event.preventDefault();

    const ids = [];

    this.addIconTargets.forEach((icon) => {
      if (icon.classList.contains("fa-check")) {
        ids.push(icon.dataset.mealId);
      }
    });

    await fetch("/meal_plans/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
      },
      body: JSON.stringify({ meal_ids: ids })
    });
      window.location.href = "/meal_plans/review";
  }
}
