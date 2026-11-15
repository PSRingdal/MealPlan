require "test_helper"

class MealPlanTest < ActiveSupport::TestCase
  test "plan date must be present" do
    mealplan = MealPlan.new
    assert_not mealplan.save
  end

  test "a user cannot create two meal plans for the same date" do
    MealPlan.create(plan_date: Date.new(2026, 11, 13), user_id: 2)
    mealplan = MealPlan.new(plan_date: Date.new(2026, 11, 13), user_id: 2)
    assert_not mealplan.save
  end
end
