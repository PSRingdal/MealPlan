import { Controller } from "@hotwired/stimulus"

const FILTERURL = "https://www.themealdb.com/api/json/v1/1/filter.php"

const mealPlanCard = (meal) => {

  return `

  <a href="/recipes/${meal.idMeal}" class="recipe-link">
    <div>
      <div class="card mb-2">
        <i class="fa-solid fa-plus toggle-icon" data-action="click->category#selectMeal"  data-category-target="addIcon"></i>
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
  static targets = ["mealCards", "category", "selectedMeals", "addIcon","selectedCount"]
  connect() {
    this.fetchCategories()
  }

  fetchCategories() {
    this.categoryTargets.forEach((categoryElement) => {
      const categoryName = categoryElement.dataset.categoryName

      const section = document.createElement("div")
      section.classList.add("category-section")
      section.insertAdjacentHTML("beforeend", `<h2>${categoryName}</h2>`)

      const row = document.createElement("div")
      row.classList.add("meal-row")

      const url = `${FILTERURL}?c=${categoryName}`

      fetch(url)
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
  }

  selectMeal(event){
    console.log("addMeal controller")
    event.preventDefault()

    let count = parseInt(this.selectedCountTarget.innerHTML)

    if (event.currentTarget.classList.contains("fa-plus")) {
      event.currentTarget.classList.replace('fa-plus', 'fa-check')
      this.selectedCountTarget.innerHTML = count += 1
    } else if (event.currentTarget.classList.contains("fa-check")) {
      event.currentTarget.classList.replace('fa-check', 'fa-plus')
      this.selectedCountTarget.innerHTML = count -= 1
    }


    if (count > 0) {
      this.selectedMealsTarget.classList.remove("d-none")
    } else {
      this.selectedMealsTarget.classList.add("d-none")
    }
  }
}
