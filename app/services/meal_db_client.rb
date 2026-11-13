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
end
