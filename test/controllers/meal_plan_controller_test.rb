require "test_helper"

class MealPlanControllerTest < ActionDispatch::IntegrationTest
test "should create meal plan" do
  login_as users(:bob)

  assert_difference("MealPlan.count", 1) do
    post meal_plans_path, params: { plan_date: "2026-11-21" }
  end

    assert_redirected_to meal_plans_url
  end
end
