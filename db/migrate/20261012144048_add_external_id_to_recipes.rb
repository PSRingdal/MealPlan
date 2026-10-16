class AddExternalIdToRecipes < ActiveRecord::Migration[8.1]
  def change
    add_column :recipes, :external_id, :integer
  end
end
