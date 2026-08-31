import { Controller } from "@hotwired/stimulus"

const FILTERURL = "https://www.themealdb.com/api/json/v1/1/filter.php"
const LISTURL = "https://www.themealdb.com/api/json/v1/1/categories.php"

const mealPlanCard = (meal) => {
  return `
  <a href="/recipes/${meal.idMeal}" class="recipe-link">
    <div>
      <div class="card mb-2" data-id="${meal.idMeal}" data-action="click->recipe-show#showcard">
        <img src="${meal.strMealThumb}">
      </div>
      <div class="card-body">
        <h2> ${meal.strMeal}</h2>
      </div>
    </div>
  </a>
  `
}

export default class extends Controller {
  static targets = ["mealCards"]
  connect() {
    this.fetchCategories()
  }
fetchCategories() {
  const url = LISTURL

  fetch(url)
    .then(response => response.json())
    .then(data => {
      data.categories.forEach((category) => {

        const section = document.createElement("div")
        section.classList.add("category-section")

        section.insertAdjacentHTML("beforeend", `<h2>${category.strCategory}</h2>`)

        const row = document.createElement("div")
        row.classList.add("meal-row")

        const endpoint = `${FILTERURL}?c=${category.strCategory}`

        fetch(endpoint)
          .then(response => response.json())
          .then(data => {

            data.meals.forEach((meal) => {
              const cardHTML = mealPlanCard(meal)
              row.insertAdjacentHTML("beforeend", cardHTML)
            })

            section.appendChild(row)
            this.mealCardsTarget.appendChild(section)
          })
      })
    })
}




}
