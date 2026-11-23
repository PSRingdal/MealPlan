require "test_helper"

class MealPlanRecipesControllerTest < ActionDispatch::IntegrationTest
  test "should delete meal plan recipe" do
    login_as users(:bob)
    meal_plan_recipe = meal_plan_recipes(:bob_beef)
    meal_plan = meal_plans(:bob_plan)

    assert_difference("MealPlanRecipe.count", -1) do
      delete meal_plan_meal_plan_recipe_url(meal_plan, meal_plan_recipe)
    end
     assert_redirected_to meal_plans_url
  end
end
