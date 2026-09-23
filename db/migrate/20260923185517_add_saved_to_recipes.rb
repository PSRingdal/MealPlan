class AddSavedToRecipes < ActiveRecord::Migration[8.1]
  def change
    add_column :recipes, :saved, :boolean, default: false
  end
end
