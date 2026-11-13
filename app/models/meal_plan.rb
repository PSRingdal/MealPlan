class MealPlan < ApplicationRecord
  belongs_to :user
  has_many :meal_plan_recipes, dependent: :destroy
  has_many :recipes, through: :meal_plan_recipes

  validates :plan_date, presence: true, uniqueness: { scope: :user_id }


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

    recipe = user.recipes.find_or_create_by(
      external_id: data["idMeal"]
    ) do |r|
      r.title = data["strMeal"]
      r.category = data["strCategory"]
      r.image_url = data["strMealThumb"]
    end

    meal_plan_recipes.find_or_create_by(recipe: recipe)
  end
  end
end
