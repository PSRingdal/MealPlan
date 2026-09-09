class RecipesController < ApplicationController
  def index
    url = "https://www.themealdb.com/api/json/v1/1/categories.php"
    response = URI.open(url).read
    data = JSON.parse(response)
    @categories = data["categories"].map { |category| category["strCategory"] }
  end

  def create
  end

  def show
    @recipe = fetch_recipe(params[:id])
  end

  def destroy
    @recipe = Recipe.find(params[:id])
    @recipe.destroy
  end

  private

  def fetch_recipe(id)
    url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=#{id}"
    response = URI.open(url).read
    data = JSON.parse(response)
    data["meals"][0]
  end
end
