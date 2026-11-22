class PagesController < ApplicationController
    skip_before_action :authenticate_user!, only: :home

  def home
    if user_signed_in?
      redirect_to meal_plans_path
    end
     recipe_ids = [ 53227, 52904, 53513, 53482, 52907, 53100, 53205 ]
     @recipes = recipe_ids.map { |id| MealDbClient.find(id) }
  end
end
