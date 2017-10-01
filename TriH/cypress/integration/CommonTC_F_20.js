describe('CommonTC_F_20', function() {
	it('CommonTC_F_20 xoa ban ghi khong co rang buoc',function(){

		cy

			.visit(Cypress.env('sign'))

			.get("input[name='email']").clear().type("admin@gmail.com")

			.get("input[name='password']").type("Methadone@2017").type("{enter}")

			.wait(4000)

			.visit(Cypress.env('administrators'))

			.get("td[class='ng-binding']").contains("1").parent().within(function(){

					cy.root().get("i[class='fa fa-trash-o']").click()
			})

			.get("button[data-bb-handler='confirm']").click()

			it("Kiem tra",function(){
				cy
					.get("div [class='toast-mesage']")
					.should('have.text','Xóa tài khoản thành công') 
			})

	}) 
})
