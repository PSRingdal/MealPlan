class RemoveCheckFromRecipes < ActiveRecord::Migration[8.1]
  def change
    remove_column :recipes, :check, :boolean
  end
end
