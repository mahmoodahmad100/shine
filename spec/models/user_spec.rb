require "rails_helper"
require 'support/violate_check_constraint_matcher'

describe User do
	describe "email" do

		let(:user){
			User.create!("email": "hello@example.com", "password": "fdfdfdfd530", "password_confirmation": "fdfdfdfd530")
		}

		it "prevents invalid email addresses" do
			expect{
				user.update_attribute(:email, "hello@test.com")
			}.to violate_check_constraint(:email_must_be_company_email)
		end
	end
end