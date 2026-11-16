require "test_helper"

class RecipeTest < ActiveSupport::TestCase
  test "title must be present" do
    bob = users(:bob)
    recipe = Recipe.new(title: "", external_id: 287, user_id: bob.id)
    assert_not recipe.save
  end

  test "a user cannot save the same recipe twice" do
    bob = users(:bob)
    Recipe.create(title: "Lasanga", external_id: 287, user_id: bob.id)
    recipe = Recipe.new(title: "Lasanga", external_id: 287, user_id: bob.id)
    assert_not recipe.save
  end

  test "creates a saved recipe when it does not exist" do
     bob = users(:bob)
     api_data = {
        "strMeal" => "Pizza",
        "idMeal" =>"584"
        }

      bob.recipes.save_from_api(api_data)
      recipe = Recipe.find_by(external_id: 584)
      assert_equal(1, Recipe.where(external_id: 584).count)
      assert_equal(true, recipe.saved)
  end

  test "updates an existing recipe instead of creating a duplicate" do
    bob = users(:bob)
    api_data = {
        "strMeal" => "Roast Chicken",
        "idMeal" =>"493"
        }
    Recipe.create(title: api_data["strMeal"], external_id: api_data["idMeal"], user_id: bob.id, saved: false)


    bob.recipes.save_from_api(api_data)
    recipe = Recipe.find_by(external_id: 493)
    assert_equal(true, recipe.saved)
    assert_equal(1, Recipe.where(external_id: 493).count)
  end

  test "marks a saved recipe as unsaved" do
    bob = users(:bob)
    api_data = {
      "strMeal" => "Omelette",
      "idMeal" =>"293"
    }
    Recipe.create(title: api_data["strMeal"], external_id: api_data["idMeal"], user_id: bob.id, saved: true)

    bob.recipes.unsave_from_api(api_data)
    recipe = Recipe.find_by(external_id: 293)
    assert_equal(false, recipe.saved)
  end
end
