class AddCheckedToRecipes < ActiveRecord::Migration[8.1]
  def change
    add_column :recipes, :checked, :boolean, default: false
  end
end
