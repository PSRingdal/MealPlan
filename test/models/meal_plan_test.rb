require "test_helper"

class MealPlanTest < ActiveSupport::TestCase
  test "plan date must be present" do
    mealplan = MealPlan.new
    assert_not mealplan.save
  end

  test "a user cannot create two meal plans for the same date" do
    bob = users(:bob)
    MealPlan.create(plan_date: Date.new(2026, 11, 13), user_id: bob.id)
    mealplan = MealPlan.new(plan_date: Date.new(2026, 11, 13), user_id: bob.id)
    assert_not mealplan.save
  end

  test "returns recipes from meal plans on a given date" do
    bob = users(:bob)
    meal_plan = MealPlan.create(plan_date: Date.new(2026, 3, 10), user_id: bob.id)
    recipe = Recipe.create(title: "Lasanga", external_id: 287, user_id: bob.id)
    puts recipe.errors.full_messages
    MealPlanRecipe.create(meal_plan_id: meal_plan.id, recipe_id: recipe.id)

    returned_recipes = MealPlan.recipes_on(Date.new(2026, 3, 10))
    assert_includes(returned_recipes, recipe)
  end

  test "a recipe is associated with a meal plan" do
    bob = users(:bob)
    ids = [ "53092", "53150" ]

    meal_plan = MealPlan.create(plan_date: Date.new(2026, 4, 8), user_id: bob.id)

    meal_plan.add_recipes_from_ids(ids)
    recipe = Recipe.find_by(external_id: 53092)
    meal_plan_recipe = MealPlanRecipe.find_by(meal_plan_id: meal_plan.id, recipe_id: recipe.id)
    assert_not_nil(meal_plan_recipe)
  end
end
