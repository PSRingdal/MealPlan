class Recipe < ApplicationRecord
  belongs_to :user
  has_many :meal_plan_recipes, dependent: :destroy
  has_many :meal_plans, through: :meal_plan_recipes

  def self.save_from_api(recipe)
    existing_recipe = find_by(external_id: recipe["idMeal"])
    if existing_recipe.blank?
      new_recipe = new(
        title: recipe["strMeal"],
        category: recipe["strCategory"],
        image_url: recipe["strMealThumb"],
        external_id: recipe["idMeal"],
        saved: true
      )
      new_recipe.save
    else
      existing_recipe.update(saved: true)
    end
  end

  scope :saved, -> { where(saved: true) }


  def self.unsave_from_api(recipe)
    existing_recipe = find_by(external_id: recipe["idMeal"])
    existing_recipe&.update(saved: false)
  end

  def unsave
    update(saved: false)
  end
end
