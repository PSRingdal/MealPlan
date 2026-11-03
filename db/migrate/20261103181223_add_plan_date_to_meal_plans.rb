class AddPlanDateToMealPlans < ActiveRecord::Migration[8.1]
  def change
    add_column :meal_plans, :plan_date, :date
  end
end
