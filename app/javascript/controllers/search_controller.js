import { Controller } from "@hotwired/stimulus"

const ENDPOINTURL = "https://www.themealdb.com/api/json/v1/1/search.php"

const mealPlanCard = (meal) => {
  return `
    <div class="col-lg-3 col-md-4 col-sm-6 col-12">
      <div class="card mb-2">
        <img src="${meal.strMealThumb}">
        <div class="card-body">
          <h2> ${meal.strMeal}</h2>
        </div>
      </div>
    </div>
  `
}

export default class extends Controller {
  static targets = ["form", "inputField", "mealCards"]
  connect() {
  }

  fetchMeals() {
    const userInput = this.inputFieldTarget.value
    const url = `${ENDPOINTURL}?s=${userInput}`
    fetch(url)
      .then (respond => respond.json())
      .then((data) => {
        console.log(data)
        const mealCardsCointaner = this.mealCardsTarget
        mealCardsCointaner.innerHTML = ""
        data.meals.forEach((meal) => {
          const cardHTML = mealPlanCard(meal)
          mealCardsCointaner.insertAdjacentHTML("beforeend", cardHTML);
        })
      })
  }

  submit(event) {
    event.preventDefault();
    this.fetchMeals()
  }
}
