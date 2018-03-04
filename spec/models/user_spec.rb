require "rails_helper"

describe User do
	describe "email" do

		let(:user){
			User.create!("email": "hello@example.com", "password": "fdfdfdfd5", "password_confirmation": "fdfdfdfd5")
		}

		it "prevents invalid email addresses" do
			expect{
				user.update_attribute(:email, "hello@test.com")
			}.to raise_error(ActiveRecord::StatementInvalid,/email_must_be_company_email/i)
		end
	end
end