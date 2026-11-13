class MealPlansController < ApplicationController
  def index
    @meal_plans = current_user.meal_plans
    @meal_plans_by_date = @meal_plans.group_by { |meal_plan| meal_plan.plan_date }
    @selected_date = params[:date].present? ? Date.parse(params[:date]) : Date.current

    @recipes = @meal_plans.recipes_on(@selected_date)

    @ingredients = []

    @recipes.each do |recipe|
    @ingredients += MealDbClient.ingredients(recipe.external_id)
      end
    @ingredients = @ingredients.tally
  end

  def create
    @meal_plan = current_user.meal_plans.new(plan_date: params[:plan_date])
    @meal_plan.save

    @meal_plan.add_recipes_from_ids(session[:meal_ids])

      session[:meal_ids] = []
      redirect_to meal_plans_path, status: :see_other
  end

  def show
  end

  def destroy
    @meal_plan = current_user.meal_plans.find(params[:id])
    @meal_plan.destroy
    redirect_to meal_plans_path, status: :see_other
  end
end
