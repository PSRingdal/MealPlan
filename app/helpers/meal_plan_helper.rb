module MealPlanHelper
  # app/helpers/meal_plans_helper.rb
  def date_label(date)
    case date
    when Date.current then "Today "
    when Date.current + 1 then "Tomorrow"
    when Date.current - 1 then "Yesterday"
    end
  end
end
