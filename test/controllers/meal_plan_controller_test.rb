require "test_helper"

class MealPlanControllerTest < ActionDispatch::IntegrationTest
  test "should create meal plan" do
  login_as users(:bob)

  assert_difference("MealPlan.count", 1) do
    post meal_plans_url, params: { plan_date: "2026-11-21" }
  end

    assert_redirected_to meal_plans_url
  end

  test "should create a meal plan with selected recipes" do
    login_as users(:bob)

    assert_difference("MealPlan.count", 1) do
      assert_difference("MealPlanRecipe.count", 1) do
        post recipes_review_url, params: { meal_ids: [ "53334" ] }, xhr: true
        post meal_plans_url, params: { plan_date: "2026-10-4"  }
      end
    end
    recipe = Recipe.find_by(external_id: 53334)
    meal_plan = MealPlan.find_by(plan_date: "2026-10-4")
    meal_plan_recipe = MealPlanRecipe.find_by(meal_plan_id: meal_plan.id, recipe_id: recipe.id)

    assert_redirected_to meal_plans_url
    assert_not_nil(meal_plan_recipe)
  end

  test "should delete meal plan" do
  login_as users(:bob)
    meal_plan = meal_plans(:bob_plan)

    assert_difference("MealPlan.count", -1) do
      delete meal_plan_url(meal_plan)
    end
     assert_redirected_to meal_plans_url
  end
end
