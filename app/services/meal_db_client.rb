require "open-uri"

class MealDbClient
  def self.find(id)
    url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=#{id}"
    response = URI.open(url).read
    data = JSON.parse(response)
    data["meals"][0]
  end

  def self.categories
    url = "https://www.themealdb.com/api/json/v1/1/categories.php"
    response = URI.open(url).read
    data = JSON.parse(response)
    data["categories"].map { |category| category["strCategory"] }
  end

  def self.ingredients_with_measurements(id)
    recipe_data = find(id)

    ingredients = []

    (1..20).each do |i|
      ingredient = recipe_data["strIngredient#{i}"]
      measurement = recipe_data["strMeasure#{i}"]

      next if ingredient.blank? || measurement.blank?

      ingredients << {
        ingredient: ingredient,
        measurement: measurement
      }
    end
    ingredients
  end
end
