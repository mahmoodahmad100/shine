Rails.application.routes.draw do
  devise_for :users
  root to: "dashboard#index"
  get "customers/ng", to: "customers#ng"
  get "customers/ng/*ng_route", to: "customers#ng"
  resources :customers, only: [ :index, :show ]
  get "ng_test" => "ng_test#index"
end
