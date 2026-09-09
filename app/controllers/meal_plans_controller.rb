class MealPlansController < ApplicationController
  def index
    @meal_plans = MealPlan.all
  end

  def create
    @meal_plan = MealPlan.new
    @meal_plan.save
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
      url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=#{id}"
      response = URI.open(url).read
      data = JSON.parse(response)
      @recipes << data["meals"][0]
      end
    end
  end

  def destroy
    @meal_plan = MealPlan.find(params[:id])
    @meal_plan.destroy
  end
end
