class RecipesController < ApplicationController
  def index
    @categories = MealDbClient.categories
    load_recipes
  end
  def save
    recipe = MealDbClient.find(params[:id])
    current_user.recipes.save_from_api(recipe)

    respond_to do |format|
      format.html { redirect_back fallback_location: recipes_path }
      format.json { head :ok }
    end
  end

  def saved
    @saved_recipes = current_user.recipes.saved
    load_recipes
  end

  def unsave
    respond_to do |format|
      format.json do
        recipe = MealDbClient.find(params[:id])
        current_user.recipes.unsave_from_api(recipe)
        head :ok
      end

      format.html do
        @recipe = current_user.recipes.find(params[:id])
        @recipe.unsave
        redirect_back fallback_location: recipes_path
      end
    end
  end

  def review
    session[:meal_ids] = params[:meal_ids]
    load_recipes

    respond_to do |format|
      format.turbo_stream
    end
  end

  def show
    @recipe = MealDbClient.find(params[:id])
    @existing_recipe = current_user.recipes.saved.find_by(external_id: @recipe["idMeal"])
    load_recipes
  end

  def destroy
    @recipe = current_user.recipes.find(params[:id])
    @recipe.destroy
  end

  private

  def load_recipes
    @recipes = []
    meal_ids = session[:meal_ids] || []
    meal_ids.each do |id|
    @recipes << MealDbClient.find(id)
    end
  end
end
