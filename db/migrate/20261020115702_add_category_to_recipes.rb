class AddCategoryToRecipes < ActiveRecord::Migration[8.1]
  def change
    add_column :recipes, :category, :string
  end
end
