require "application_system_test_case"

class MealPlansTest < ApplicationSystemTestCase
  test "visiting the index" do
    login_as users(:alice)
    visit meal_plans_url

    save_and_open_screenshot
    assert_selector "h1", text: "Your meal plans"
  end
end
