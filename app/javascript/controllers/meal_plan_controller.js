import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["removeBtn"]


  connect() {
    console.log("hello from meal plan")
  }

}
