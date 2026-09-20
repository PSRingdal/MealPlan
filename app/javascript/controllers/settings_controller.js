import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["account", "privacy"]


  connect() {
    console.log("connected")
  }

  showAccount() {
    this.accountTarget.classList.remove("d-none")
    this.privacyTarget.classList.add("d-none")
  }

  showPrivacy() {
    this.privacyTarget.classList.remove("d-none")
    this.accountTarget.classList.add("d-none")
  }
}
