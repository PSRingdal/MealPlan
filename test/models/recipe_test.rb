require "test_helper"

class RecipeTest < ActiveSupport::TestCase
  test "title must be present" do
    recipe = Recipe.new(title: "", external_id: 287, user_id: 1)
    assert_not recipe.save
  end

  test "a user cannot save the same recipe twice" do
    Recipe.create(title: "Lasanga", external_id: 287, user_id: 1)
    recipe = Recipe.new(title: "Lasanga", external_id: 287, user_id: 1)
    assert_not recipe.save
  end
end
