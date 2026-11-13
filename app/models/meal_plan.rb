class MealPlan < ApplicationRecord
  belongs_to :user
  has_many :meal_plan_recipes, dependent: :destroy
  has_many :recipes, through: :meal_plan_recipes

  def self.recipes_on(date)
    recipes = []
    meal_plans = where(plan_date: date)

    meal_plans.each do |meal_plan|
      recipes += meal_plan.recipes
    end
    recipes
  end

  def add_recipes_from_ids(ids)
    ids.each do |id|
      data = MealDbClient.find(id)
      recipe = recipes.new(
        title: data["strMeal"],
        category: data["strCategory"],
        image_url: data["strMealThumb"],
        external_id: data["idMeal"]
      )
      recipe.user = user
      recipe.save
      join = meal_plan_recipes.new(recipe: recipe)
      join.save
    end
  end
end
