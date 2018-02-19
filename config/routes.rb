Rails.application.routes.draw do
  devise_for :users
  root to: "dashboard#index"
  resources :customers, only: [ :index ]
  get "ng_test" => "ng_test#index"
end
