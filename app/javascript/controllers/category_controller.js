import { Controller } from "@hotwired/stimulus"

const FILTERURL = "https://www.themealdb.com/api/json/v1/1/filter.php"

const mealPlanCard = (meal) => {

  return `

  <a href="/recipes/${meal.idMeal}" class="recipe-link">
    <div>

      <div class="card mb-5">
        <button class="favourite-btn" type="button"
        data-action="click->save-recipes#toggleSave">
          <i class="fa-regular fa-heart" data-save-recipes-target="heartIcon" data-meal-id="${meal.idMeal}"></i>
        </button>
        <img src="${meal.strMealThumb}">

        <div class="card-body">
          <h2> ${meal.strMeal}</h2>

          <div class="footer d-flex justify-content-between align-items-center">
          <span class="recipe-area">${meal.strArea}</span>
            <button class="add-recipe-btn btn rounded-pill"
            data-action="click->category#selectMeal click->meal-plan-review#review"
            data-category-target="addBtn" >
            <div class="add-btn-div d-flex gap-3" >
              <i class="fa-solid fa-plus toggle-icon"
                data-meal-id="${meal.idMeal}"
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
  static targets = ["mealCards", "category", "selectedMeals", "icon","selectedCount", "reviewMealPlan", "card", "recipe", "addBtn"]

  connect() {
    this.fetchCategories()
  }

  fetchCategories() {
    this.categoryTargets.forEach((categoryElement) => {
      const categoryName = categoryElement.dataset.categoryName

      const section = document.createElement("div")
      section.classList.add("category-section")
      section.insertAdjacentHTML("beforeend", `<h2 class="category-name">${categoryName}</h2>`)

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

          const savedMealId = JSON.parse(sessionStorage.getItem("iconId"))
          console.log("saved", savedMealId)

          this.iconTargets.forEach((icon)=> {
            if (savedMealId.includes((icon.dataset.mealId))) {
              icon.classList.replace("fa-plus", "fa-check")
              icon.style.color ="white"
              icon.style.background = "#3D5645"
            }
          })
        })
    })

  }

  selectMeal(event){
    console.log("addMeal controller")
    event.preventDefault()

    let count = parseInt(this.selectedCountTarget.innerHTML, 10) || 0
    const icon = event.currentTarget.querySelector("i")

    if (icon.classList.contains("fa-plus")) {
      icon.classList.replace('fa-plus', 'fa-check')
      icon.style.color ="white"
      icon.style.background ="#3D5645"
      this.selectedCountTarget.innerHTML = count += 1
    } else if (icon.classList.contains("fa-check")) {
      icon.classList.replace('fa-check', 'fa-plus')
      icon.style.color ="black"
      icon.style.background ="white"
      this.selectedCountTarget.innerHTML = count -= 1
    }

    let ids = []
    this.iconTargets.forEach((icon)=>{
      if (icon.classList.contains("fa-check")) {
          ids.push(icon.dataset.mealId)
      }
    })
    sessionStorage.setItem("iconId", JSON.stringify(ids))
  }
}
