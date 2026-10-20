class RemoveCheckedFromRecipes < ActiveRecord::Migration[8.1]
  def change
    remove_column :recipes, :checked, :boolean
  end
end
