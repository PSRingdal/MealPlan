import { Controller } from "@hotwired/stimulus"

const ENDPOINTURL = "https://www.themealdb.com/api/json/v1/1/search.php"

const mealPlanCard = (meal) => {
  return `
  <a href="/recipes/${meal.idMeal}" class="recipe-link">

    <div class="col-lg-3 col-md-4 col-sm-6 col-12" >
      <div class="card mb-2">
        <img src="${meal.strMealThumb}">
        <div class="card-body">
          <h2> ${meal.strMeal}</h2>
          <div class="footer d-flex justify-content-between align-items-center">
          <span class="recipe-area">${meal.strArea}</span>
            <button class="add-recipe-btn btn rounded-pill"
            data-action="click->meal-selection#selectMeal click->meal-plan-review#review"
            data-category-target="addBtn" >
            <div class="add-btn-div d-flex gap-3" >
              <i class="fa-solid fa-plus toggle-icon"
                data-meal-id="${meal.idMeal}"
                data-meal-selection-target="icon"
                data-category-target="icon"
                data-meal-plan-review-target="addIcon"></i>
                <span> Add to plan </span>
            </div>
            </button>
          </div>
        </div>
      </div>
    </div>
    </a>
  `
}

export default class extends Controller {
  static targets = ["form", "inputField", "mealCards"]
  connect() {
    console.log("hello")
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

        const grid = document.createElement("div")
        grid.classList.add("search-grid")

        data.meals.forEach((meal) => {
          const cardHTML = mealPlanCard(meal)
          grid.insertAdjacentHTML("beforeend", cardHTML);
        })

        mealCardsCointaner.appendChild(grid)
      })
  }

  submit(event) {
    event.preventDefault();
    this.fetchMeals()
  }

}
