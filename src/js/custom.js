document.addEventListener("DOMContentLoaded", function() {

	$('.products-carousel').slick({
		slidesToShow: 4,
		prevArrow: '<i class="fas fa-angle-left"></i>',
 		nextArrow: '<i class="fas fa-angle-right"></i>',
 		responsive: [
    {
      breakpoint: 990,
      settings: {
        slidesToShow: 3,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 578,
      settings: {
        slidesToShow: 1,
        arrows: false
      }
    }

  ]
	})


	$(function(){
		$('.login-btn, .reg-btn').on('click', function(){
			$(".login-form-box").toggleClass('active');
			event.stopPropagation();
		})
		$('.login-form').on('click', function(){
			event.stopPropagation();
		})
		$(document.body).on('click', function(){
			$(".login-form-box").removeClass('active')
		})
	});
});