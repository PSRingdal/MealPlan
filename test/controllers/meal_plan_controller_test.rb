require "test_helper"

class MealPlanControllerTest < ActionDispatch::IntegrationTest
test "should create meal plan" do
  login_as users(:bob)

  assert_difference("MealPlan.count", 1) do
    post meal_plans_url, params: { plan_date: "2026-11-21" }
  end

    assert_redirected_to meal_plans_url
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
