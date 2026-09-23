Rails.application.routes.draw do
  get "pages/home"
  devise_for :users
  root to: "pages#home"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  # root "posts#index"

  get "settings", to: "profile#settings"


  resources :meal_plans, only: [ :index, :show, :create, :destroy ] do
    resources :meal_plan_recipes, only: [ :create, :destroy ]
  end

  post "recipes/review", to: "recipes#review"
  post "recipes/:id/save", to: "recipes#save", as: :save_recipe
  post "recipes/:id/unsave", to: "recipes#unsave", as: :unsave_recipe

  resources :recipes, only: [ :index, :show, :destroy ]
end
