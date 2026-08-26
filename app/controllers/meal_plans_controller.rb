class MealPlansController < ApplicationController
  def index
    @meal_plans = MealPlan.all
  end

  def create
    @meal_plan = MealPlan.new
    @meal_plan.save
  end

  def show
    @meal_plan = MealPlan.find(params[:id])
    @recipes = @meal_plan.recipes
  end

  def destroy
    @meal_plan = MealPlan.find(params[:id])
    @meal_plan.destroy
  end
end
