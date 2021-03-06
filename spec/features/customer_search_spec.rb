require "rails_helper"

feature "Customer Search" do

  def create_address
    state = State.find_or_create_by!(
      code: Faker::Address.state_abbr,
      name: Faker::Address.state)

    Address.create!(
       street: Faker::Address.street_address,
         city: Faker::Address.city,
        state: state,
      zipcode: Faker::Address.zip)
  end

  def create_customer(first_name:,
                      last_name:,
                      email: nil)

    username = "#{Faker::Internet.user_name}#{rand(1000)}"
    email  ||= "#{username}#{rand(1000)}@" +
               "#{Faker::Internet.domain_name}"

    Customer.create!(
      first_name: first_name,
       last_name: last_name,
        username: username,
           email: email
    )

    customer.create_customers_billing_address(address: create_address)
    customer.customers_shipping_address.create!(address: create_address, primary: true)
    customer
  end

  let(:email)    { "pat@example.com" }
  let(:password) { "password123" }

  before do
    User.create!(email: email,
                 password: password,
                 password_confirmation: password)

    create_customer first_name: "Chris",
                    last_name: "Aaron"

    create_customer first_name: "Pat",
                    last_name: "Johnson"

    create_customer first_name: "I.T.",
                    last_name: "Pat"

    create_customer first_name: "Patricia",
                    last_name: "Dobbs"

    create_customer first_name: "Pat",
                    last_name: "Jones",
                    email: "pat123@somewhere.net"
    visit "/customers"
    fill_in      "Email",    with: email
    fill_in      "Password", with: password
    click_button "Log in"
  end

  scenario "Search by Name" do
    within "section.search-form" do
      fill_in "keywords", with: "pat"
    end
    within "section.search-results" do
      expect(page).to have_content("Results")
      expect(page.all("ol li.list-group-item").count).to eq(4)

      expect(page.all("ol li.list-group-item")[0]).to have_content("Patricia")
      expect(page.all("ol li.list-group-item")[0]).to have_content("Dobbs")

      expect(page.all("ol li.list-group-item")[3]).to have_content("I.T.")
      expect(page.all("ol li.list-group-item")[3]).to have_content("Pat")
    end
  end
  
  scenario "Search by Email" do
    within "section.search-form" do
      fill_in "keywords", with: "pat123@somewhere.net"
    end
    within "section.search-results" do
      expect(page).to have_content("Results")
      expect(page.all("ol li.list-group-item").count).to eq(4)

      expect(page.all("ol li.list-group-item")[0]).to have_content("Pat")
      expect(page.all("ol li.list-group-item")[0]).to have_content("Jones")

      expect(page.all("ol li.list-group-item")[1]).to have_content("Patricia")
      expect(page.all("ol li.list-group-item")[1]).to have_content("Dobbs")

      expect(page.all("ol li.list-group-item")[3]).to have_content("I.T.")
      expect(page.all("ol li.list-group-item")[3]).to have_content("Pat")
    end

    click_on "more", match: :first
    customer = Customer.find_by!(email: "pat123@somewhere.net")
    within "section.customer-details" do
      expect(page).to have_content(customer.id)
      expect(page).to have_content(customer.first_name)
      expect(page).to have_content(customer.last_name)
      expect(page).to have_content(customer.email)
      expect(page).to have_content(customer.username)
    end
  end
end