class MealPlansController < ApplicationController
  skip_before_action :authenticate_user!, only: :index

  def index
     @meal_plans = current_user.meal_plans
  end

  def create
    @meal_plan = current_user.meal_plans.new
    @meal_plan.save

    meal_ids = session[:meal_ids]

    meal_ids.each do |id|
      recipe = fetch_recipe(id)
      @recipe = @meal_plan.recipes.new(title: recipe["strMeal"], image_url: recipe["strMealThumb"])
      @recipe.user = current_user
      @recipe.save
      @join = @meal_plan.meal_plan_recipes.new(recipe: @recipe)
      @join.save
    end
  end


  def show
  end

  def review
    if request.post?
      session[:meal_ids] = params[:meal_ids]
      head :ok
    else
      @recipes = []
      meal_ids = session[:meal_ids]
      meal_ids.each do |id|
        @recipes << fetch_recipe(id)
      end
    end
  end

  def destroy
    @meal_plan = MealPlan.find(params[:id])
    @meal_plan.destroy
  end

  private

  def fetch_recipe(id)
    url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=#{id}"
    response = URI.open(url).read
    data = JSON.parse(response)
    data["meals"][0]
  end
end
