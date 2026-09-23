class RecipesController < ApplicationController
  def index
    url = "https://www.themealdb.com/api/json/v1/1/categories.php"
    response = URI.open(url).read
    data = JSON.parse(response)
    @categories = data["categories"].map { |category| category["strCategory"] }
    load_recipes
  end

  def save
    recipe = fetch_recipe(params[:id])

    existing_recipe = current_user.recipes.find_by(title: recipe["strMeal"])

    if existing_recipe.blank?
      @recipe = current_user.recipes.new(
        title: recipe["strMeal"],
        image_url: recipe["strMealThumb"],
        saved: true
      )

      @recipe.save
    end

    redirect_back fallback_location: recipes_path
  end

  def unsave
    @recipe = current_user.recipes.find(params[:id])
    @recipe.destroy

    redirect_back fallback_location: recipes_path
  end

  def review
    session[:meal_ids] = params[:meal_ids]
    load_recipes

    respond_to do |format|
      format.turbo_stream
    end
  end

  def show
    @recipe = fetch_recipe(params[:id])
    @existing_recipe = current_user.recipes.find_by(title: @recipe["strMeal"])
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

  def load_recipes
    @recipes = []
    meal_ids = session[:meal_ids] || []

    meal_ids.each do |id|
    @recipes << fetch_recipe(id)
    end
  end
end
