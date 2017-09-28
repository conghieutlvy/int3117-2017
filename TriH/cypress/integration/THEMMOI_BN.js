describe('THEMMOI_BN', function() {
	context("Kiểm tra trường 'Ngày cấp'", function(){
		// Đăng nhập và chuyển tới trang thêm bệnh nhân
		beforeEach(function(){ 
			
			cy			
				.visit(Cypress.env('sign'))

				.fixture("users").then(user=>{

					cy.doLoginAs(user.agency)
				
				})		

				.visit(Cypress.env('newPatient'))

		})

		// Kiểm tra xem Calendar có focus đúng ngày đã nhập không
		it("THEMMOI_BN_132_Kiểm tra Calendar", function(){ 

			cy
				.get("input[name='identification_issued_date']")

				.type("25/12/2012").type("{enter}")
				// Mở Calendar
				.getElUseLabel("Ngày cấp").within(function(){

					cy.root().get("span.btn").click()

				})
				// Kiểm tra tháng năm
				.get("th.datepicker-switch").should("contain","December 2012") 
				// Kiểm tra ngày
				.get("td.active.day").should("contain","25") 

		})

		// Kiểm tra chọn từ Calendar có đúng không
		it("THEMMOI_BN_133_Chọn ngày", function(){

			cy
				// Mở Calendar
				.getElUseLabel("Ngày cấp").as("ngayCap").within(function(){

					cy.root().get("span.btn").click()

				})
				// Chọn ngày
				.get("div.datepicker-days").find("td.today.day").prev().click()
				// Kiểm tra Calendar đã đóng chưa
				.get("div").should("not.have.class","datepicker-days") 
				// Kiểm tra ngày có đúng như đã chọn không
				.get("@ngayCap").within(function(){

					var now = new Date();

					var date = now.getDate()-1;

					var month = now.getMonth() + 1;

					var st_date = date.toString();

					var st_month = month.toString();

					if(date < 10) st_date = "0" + st_date;

 					if(month < 10) st_month = "0" + st_month;

					var date_pick = st_date + "/" + st_month + "/" + now.getFullYear().toString();

					cy.root().get("input.ng-not-empty").should("have.value",date_pick);

				})



		})

		// Kiểm tra thông báo khi nhập ngày sai định dạng
		it("THEMMOI_BN_134_Nhập ngày sai định dạng", function(){

			cy
				// Nhập ngày sai định dạng
				.getElUseLabel("Ngày cấp").as("ngayCap").within(function(){

					cy.root().get(".ng-empty").focus().type("12/12/122")

				})
				.get("button").contains("Lưu").click()
				.wait(1000)
				// Kiểm tra thông báo lỗi có hiển thị không
				.get("@ngayCap").within(function(){

					cy.get(".text-error").should("not.have.css","display","none")

				})
				// Kiểm tra thông báo lỗi đã đúng chưa
				.get("@ngayCap").within(function(){

					cy.get(".text-error").should("contain","Ngày tháng không đúng định dạng")
				})
				

		})
		
		// Kiểm tra khi nhập đủ các truong mà không nhập ngày cấp
		it("THEMMOI_BN_135_Nhập đủ các trường nhưng không nhập 'Ngày cấp'", function(){

			cy
				// Nhập các trường bắt buộc
				
					.getElUseLabel("Họ và tên").within(function(){

						cy.get("input").type("Nguyen Van A")

					})

					.get("input[name='birth_date']").focus().type("01/01/1999{enter}")

					.getElUseLabel("Giới tính").within(function(){

						cy.doSelect()					

					})	

					.get("input[name='admission_date']").focus().type("01/11/1999{enter}")

					.getElUseLabel("Tỉnh/Thành phố thường trú").within(function(){

						cy.doSelect()					

					})	

					.getElUseLabel("Huyện/Quận thường trú").within(function(){

						cy.doSelect()					

					})	

					.getElUseLabel("Xã/Thị Trấn thường trú").within(function(){

						cy.doSelect()					

					})	

					.getElUseLabel("Tỉnh/Thành phố tạm trú").within(function(){

						cy.doSelect()					

					})

					.getElUseLabel("Huyện/Quận tạm trú").within(function(){

						cy.doSelect()					

					})

					.getElUseLabel("Xã/Thị Trấn tạm trú").within(function(){

						cy.doSelect()					

					})	

					.getElUseLabel("Loại giấy tờ").within(function(){

						cy.doSelect()					

					})	

					.getElUseLabel("Số").within(function(){

						cy.get("input").focus().type("111111111")

					})

					.get("input[name='identification_issued_by']").focus().type("HN")

					.get(".general-item-list").within(function(){

						cy.getElUseLabel("Họ và tên").within(function(){

							cy.get("input").focus().type("Nguyen Van B")

						})	

					})

					.getElUseLabel("Mối quan hệ").within(function(){

							cy.doSelect()

						})

				
				// Lưu
				.get("button").contains("Lưu").click()
				.wait(3000)
				// Kiểm tra thông báo lỗi có hiển thị không
				.getElUseLabel("Ngày cấp").as("ngayCap").within(function(){

					cy.get(".text-error").should("not.have.css","display","none")

				})
				// Kiểm tra thông báo lỗi đã đúng chưa
				.get("@ngayCap").within(function(){

						cy.get(".text-error").should("contain","Trường này không được để trống.")

				})

		})	
		// Kiểm tra thông báo khi ngày cấp > ngày hiện tại
		it("THEMMOI_BN_136_Ngày cấp > Ngày hiện tại",function(){

			cy
				// Nhập ngày cấp > hiện tại 1 ngày
				.getElUseLabel("Ngày cấp").as("ngayCap").within(function(){

					var now = new Date();

					var date = now.getDate() + 1;

					var month = now.getMonth() + 1;

					var st_date = date.toString();

					var st_month = month.toString();

					if(date < 10) st_date = "0" + st_date;

 					if(month < 10) st_month = "0" + st_month;

					var date_pick = st_date + "/" + st_month + "/" + now.getFullYear().toString();

					cy.root().get(".ng-empty").focus().type(date_pick)// ko co lenh {tab}		

				})
				// Lưu
				.get("button").contains("Lưu").click()

				.wait(3000)
				// Kiểm tra thông báo lỗi có hiển thị không
				.get("@ngayCap").within(function(){

					cy.get(".text-error").should("not.have.css","display","none")

				})
				// Kiểm tra thông báo lỗi đã đúng chưa
				.get("@ngayCap").within(function(){

						cy.get(".text-error").should("contain","Vui lòng nhập ngày nhỏ hơn ngày hiện tại")

					})

		})
		// Kiểm tra thông báo khi ngày cấp nhỏ hơn ngày sinh
		it("THEMMOI_BN_137_Ngày cấp < Ngày sinh", function(){

			cy
				// Nhập ngày cấp
				.getElUseLabel("Ngày cấp").as("ngayCap").within(function(){

					cy.root().get(".ng-empty").focus().type("01/01/2012")

				})
				// Nhập ngày sinh
				.get("input[name='birth_date']").focus().type("01/01/2013")
				// Lưu
				.get("button").contains("Lưu").click()

				.wait(3000)

				// Kiểm tra thông báo lỗi có hiển thị không
				.get("@ngayCap").within(function(){

					cy.get(".text-error").should("not.have.css","display","none")

				})
				// Kiểm tra thông báo lỗi đã đúng chưa
				.get("@ngayCap").within(function(){

						cy.get(".text-error").should("contain","Vui lòng nhập ngày lớn hơn ngày sinh")

				})

		})


	})



})
