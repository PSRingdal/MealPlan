class MealPlanRecipesController < ApplicationController
  def destroy
    meal_plan = MealPlan.find(params[:meal_plan_id])
    meal_plan.meal_plan_recipes.find(params[:id]).destroy

    meal_plan.destroy if meal_plan.meal_plan_recipes.reload.empty?

    redirect_to meal_plans_path, status: :see_other
  end
end
