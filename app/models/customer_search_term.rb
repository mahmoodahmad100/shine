class CustomerSearchTerm

	attr_reader :where_clause, :where_args, :order

	def initialize(search_term)
		search_term = search_term.downcase
		@where_clause = ''
		@where_args = {}
		if @where_args =~ /@/
			build_for_email_search(search_term)
		else
			build_for_name_search(search_term)
		end
	end

end