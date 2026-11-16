require "test_helper"

class MealPlanRecipeTest < ActiveSupport::TestCase
  test "a user cannot add the same recipe twice to a meal plan" do
   MealPlanRecipe.create(meal_plan_id: 458, recipe_id: 782)

   meal_plan_recipe = MealPlanRecipe.new(meal_plan_id: 458, recipe_id: 782)
   assert_not meal_plan_recipe.save
  end
end
