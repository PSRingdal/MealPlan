class RecipesController < ApplicationController
  def index
    url = "https://www.themealdb.com/api/json/v1/1/categories.php"
    response = URI.open(url).read
    data = JSON.parse(response)
    @categories = data["categories"].map { |category| category["strCategory"] }
  end

  def create
    @recipe = Recipe.new
    @recipe.save
  end

  def show
    id = params[:id]
    url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=#{id}"
    response = URI.open(url).read
    data = JSON.parse(response)
    @recipe = data["meals"][0]
  end

  def destroy
    @recipe = Recipe.find(params[:id])
    @recipe.destroy
  end
end
