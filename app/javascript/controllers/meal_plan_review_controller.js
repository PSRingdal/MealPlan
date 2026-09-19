import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["addIcon", "sidebar"]


  connect() {
    console.log("connected")
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

  openSidebar() {
   this.sidebarTarget.classList.toggle("open");
  }
}
