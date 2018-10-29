$(function(){
	"use strict";

	createSticky($(".header"));
	function createSticky(sticky) {
		if (typeof sticky !== "undefined") {
			var	pos = sticky.offset().top+80,
			win = $(window);
			win.on("scroll", function() {
				win.scrollTop() >= pos ? sticky.addClass("affix") : sticky.removeClass("affix");
			});
		}
	}


	/* Create summernote function */
	function summernotefx(){
		$('.content-block').summernote({
			toolbar: [
			['color', ['color']],
			['style', ['bold', 'italic', 'underline','strikethrough','paragraph']],
			['Insert',['table']],
			['fontsize', ['fontname']],
			['style', ['clear']],
			],
			colors: [['#4897e2','#f26665','#e8c648']],
			defaultFontName: ['Lora'],
			/*fontNamesIgnoreCheck: ['Lora'],*/
			fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New','Lora','Open Sans'],
			disableDragAndDrop: true,
		});
		//$('.content-block').summernote({airMode: true});
	} summernotefx();

	/* Show note-toolbar on select */
	$(document).on('mouseup','.note-editable', function(e){
		var selection;
		if(window.getSelection) {
			selection = window.getSelection();
		} else if (document.selection) {
			selection = document.selection.createRange();
		}
		if(selection.toString() !== '') {
			var posX = $(this).offset().left,
			posY = $(this).offset().top;
			var getX = (e.pageX - posX),
			getY = (e.pageY - posY)-40;
			$(".note-toolbar").hide();
			$(this).parent().parent().find(".note-toolbar").css({"left": getX, "top": getY}).show();
		} else {
			$(".note-toolbar").hide();
		}
	});

	$(document).on('tap','.note-editable', function(e){
		var selection;
		if(window.getSelection) {
			selection = window.getSelection();
		} else if (document.selection) {
			selection = document.selection.createRange();
		}
		if(selection.toString() !== '') {
			var posX = $(this).offset().left,
			posY = $(this).offset().top;
			var getX = (e.pageX - posX),
			getY = (e.pageY - posY);
			$(".note-toolbar").hide();
			$(this).parent().parent().find(".note-toolbar").css({"left": getX, "top": getY}).show();
		} else {
			$(".note-toolbar").hide();
		}
	});

	/* Hide note-toolbar outer Click */
	/*$(document).click(function (e) {
		if ($(e.target).parents(".note-editable").length === 0) {
			$(".note-toolbar-wrapper").hide();
		}
	});*/

	/* Create navbar dropdown function */
	// function navbardropdownfx(){
	// 	$('.navbar-fixed-side .dropdown-toggle').on('click', function(e){
	// 		$(this).parent().siblings('li').find('ul').css('display','none');
	// 		$(this).siblings('ul').toggle();
	// 		$(this).parent().siblings('li').find('a').removeClass('active');
	// 		$(this).toggleClass ('active');
	// 		e.stopPropagation();
	// 		e.preventDefault();
	// 	});
	// } navbardropdownfx();

	/* Toggle Sidebar */
	$('.sidebar-toggle').click(function(){
		if ($(window).width() >= 992) {
			$('.container-fluid > .row > div:nth-child(2)').toggleClass('col-lg-10 col-lg-12');
			$('.container-fluid > .row > div:nth-child(1)').not(':eq(1)').toggleClass('col-lg-2 col-lg-0');
			$('.header .sidebar-toggle').toggleClass('hidden');
		}
		else if (($(window).width() <= 991) && ($(window).width() >= 768) ) {
			$('.container-fluid > .row > div:nth-child(2)').toggleClass('col-md-9 col-md-12');
			$('.container-fluid > .row > div:nth-child(1)').not(':eq(1)').toggleClass('col-md-3 col-md-0');
			$('.header .sidebar-toggle').toggleClass('hidden');
		}
	});

	/* Add New Chapter in Block */
	$(document).on('click','.add-chapter',function(e){
		e.preventDefault();
		$(this).parent().after($('<div class="block"><h3 class="heading">New Chapter<ul class="option-heading"><li>1.0</li><li><a class="ksc-modal2"><i class="fa fa-bars" aria-hidden="true"></i></a></li><li><i class="fa fa-ellipsis-v" aria-hidden="true"></i></li></ul></h3><div class="block"><div class="inner-heading"><h4>New Scene</h4><div class="pull-left"><span></span> <span>0 Words</span> <span class="badge">Opening Scene</span> </div><div class="pull-right"> <span><i class="fa fa-bolt" aria-hidden="true"></i> Idea</span> <span><i class="fa fa-map-marker" aria-hidden="true"></i> Home</span><span><i class="fa fa-meh-o" aria-hidden="true"></i> Santiago</span><ul class="option-heading"><li>1.1</li><li><i class="fa fa-bars" aria-hidden="true"></i></li><li><i class="fa fa-ellipsis-v" aria-hidden="true"></i></li></ul></div></div><div class="content-block" contenteditable="true"> Enter Some Content-------------------------------------</div><a href="#" class="add-scene more-btn">+ SCENE</a> </div><a href="#" class="add-scene more-btn">+ CHAPTER</a> </div>'));
		summernotefx();
	});

	/* Add New Scene in Block */
	$(document).on('click','.add-scene',function(e){
		e.preventDefault();
		$(this).parent().after($('<div class="block"><div class="inner-heading"><h4>New Scene</h4><div class="pull-left"><span></span><span>0 Words</span><span class="badge">Opening Scene</span></div><div class="pull-right"><span><i class="fa fa-bolt" aria-hidden="true"></i> Idea</span><span><i class="fa fa-map-marker" aria-hidden="true"></i> Home</span><span><i class="fa fa-meh-o" aria-hidden="true"></i> Santiago</span><ul class="option-heading"><li>1.1</li><li><i class="fa fa-bars" aria-hidden="true"></i></li><li><i class="fa fa-ellipsis-v" aria-hidden="true"></i></li></ul></div></div><div class="content-block" contenteditable="true">Enter Some Content-------------------------------------</div><a href="#" class="add-scene more-btn">+ SCENE</a> </div>'));
		summernotefx();
	});

	/* Add New Act in Navbar */
	// $(document).on('click','.act-add',function(e){
	// 	e.preventDefault();
	// 	$('.navbar-nav').find('.scname').parent().remove();
	// 	// $(this).parent().after($('<li class="dropdown"><ul class="option-heading" style=""><li>0.0</li><li><img class="img-fluid rotate-img svg-img ksc-modal2" src="assets/svg/menu.svg" alt="menu"></li><li><img class="img-fluid svg-img" src="assets/svg/threedots.svg" alt="threedots"></li></ul><a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-angle-right" aria-hidden="true"></i>New Act</a><span class="add act-add">+ Act</span><ul class="dropdown-menu" style="display: none;"><li><a class="" href="#"><i class="fa fa-circle" aria-hidden="true"></i>New Scene</a> <span class="add scene-add">+ SCENE</span> </li></ul></li>'));
	// 	$(this).parent().after($('<li class="dropdown act-dropdown"><a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="false" aria-expanded="false"><i class="fa fa-angle-right" aria-hidden="true"></i>New Act</a><span class="add act-add">+ ACT</span><ul class="dropdown-menu"><li><ul class="option-heading"><li>1.0</li><li><img class="img-fluid rotate-img svg-img ksc-modal2" src="assets/svg/menu.svg" alt="menu"/></li><li><img class="img-fluid svg-img" src="assets/svg/threedots.svg" alt="threedots"/></li></ul><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-angle-right" aria-hidden="true"></i>Chapter 1 </a> <span class="add chapter-add">+ CHAPTER</span> <ul class="dropdown-menu"> <li><a class="active" href="#"><i class="fa fa-circle" aria-hidden="true"></i>Scene 1</a> <span class="add scene-add">+ SCENE</span> </li><li><a href="#"><i class="fa fa-circle" aria-hidden="true"></i>Scene 2</a> <span class="add scene-add">+ SCENE</span></li><li><a href="#"><i class="fa fa-circle" aria-hidden="true"></i>Scene 3</a> <span class="add scene-add">+ SCENE</span></li></ul> </li><li class="dropdown"><ul class="option-heading"><li>2.0</li> <li><img class="img-fluid rotate-img svg-img ksc-modal2" src="assets/svg/menu.svg" alt="menu"/></li><li><img class="img-fluid svg-img" src="assets/svg/threedots.svg" alt="threedots"/></li></ul>                        <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-angle-right" aria-hidden="true"></i>Chapter 2</a><span class="add chapter-add">+ CHAPTER</span><ul class="dropdown-menu"><li><a href="#"><i class="fa fa-circle" aria-hidden="true"></i>Scene 2</a> <span class="add scene-add">+ SCENE</span></li><li><a href="#"><i class="fa fa-circle" aria-hidden="true"></i>Scene 3</a> <span class="add scene-add">+ SCENE</span></li></ul> </li></ul></li>'));
	// 	//navbardropdownfx();
	// });

	/* Add New Chapter in Navbar */
	// $(document).on('click','.dropdown-menu .chapter-add',function(e){
	// 	e.preventDefault();
	// 	$('.navbar-nav').find('.scname').parent().remove();
	// 	$(this).parent().after($('<li class="dropdown"><ul class="option-heading" style=""><li>0.0</li><li><img class="img-fluid rotate-img svg-img ksc-modal2" src="assets/svg/menu.svg" alt="menu"></li><li><img class="img-fluid svg-img" src="assets/svg/threedots.svg" alt="threedots"></li></ul><a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-angle-right" aria-hidden="true"></i>New Chapter</a><span class="add chapter-add">+ CHAPTER</span><ul class="dropdown-menu" style="display: none;"><li><a class="" href="#"><i class="fa fa-circle" aria-hidden="true"></i>New Scene</a> <span class="add scene-add">+ SCENE</span> </li></ul></li>'));
	// 	//navbardropdownfx();
	// });

	/* Add New Scene in Navbar */
	// $(document).on('click','.dropdown-menu .scene-add',function(e){
	// 	e.preventDefault();
	// 	$('.navbar-nav').find('.scname').parent().remove();
	// 	$(this).parent().after($('<li><a class="" href="#"><i class="fa fa-circle" aria-hidden="true"></i>New Scene</a> <span class="add scene-add">+ SCENE</span> </li>'));
	// 	//navbardropdownfx();
	// });

	/* Remove New Scene in Navbar */
	$(document).on('click','.remove-nm',function(e){
		e.preventDefault();
		$(this).parent().parent().remove();
	});

	/* Save New Scene in Navbar */
	$(document).on('click','.save-nm',function(e){
		e.preventDefault();
		var intxt = $(this).parent().find('input').val();
		var icon = $(this).parent().next('a').html();
		if (intxt !== null && intxt !== '') {
			$(this).parent().next('a').text(intxt).append(icon);
			$(this).parent().remove();
			//navbardropdownfx();
		}else{
			alert("Please Enter some text..");
		}
	});

	/* Show Right-bar on Click Titel */
	$(document).on('click','.ksc-modal1',function(e){
		e.preventDefault();
		$(".right-modal").removeClass("show").hide();
		$("#right-modal2").toggleClass("show").toggle();
	});

	/* Show Right-bar on Click Scene */
	$(document).on('click','.ksc-modal2',function(e){
		e.preventDefault();
		$(".right-modal").removeClass("show").hide();
		$("#right-modal1").toggleClass("show").toggle();
	});

	$(document).on('click','.ksc-modal3',function(e){
		e.preventDefault();
		$(".right-modal").removeClass("show").hide();
		$("#right-modal3").toggleClass("show").toggle();
	});

	$(document).on('click','.ksc-modal4',function(e){
		e.preventDefault();
		$(".right-modal").removeClass("show").hide();
		$("#right-modal4").toggleClass("show").toggle();
	});

	$(document).on('click','.ksc-modal5',function(e){
		e.preventDefault();
		$(".right-modal").removeClass("show").hide();
		$("#right-modal5").toggleClass("show").toggle();
	});

	$(document).on('click','.ksc-modal6',function(e){
		e.preventDefault();
		$(".right-modal").removeClass("show").hide();
		$("#right-modal6").toggleClass("show").toggle();
	});

	/* Close Right-bar */
	$(".right-modal .mheader .close").on('click',function(e){
		e.preventDefault();
		$(".right-modal").removeClass("show").hide();
	});

	/* Call Datepicker */

	$('.date').datepicker();

	// Plus Icon Click
	

	// $(".plus-icon").click(function () {
	// 	//alert(345);
	// 	$(".plus-submenu").toggle();
	// });

	// Masonary
	
	// external js: isotope.pkgd.js

	// $('.card-block').isotope({
	// 	itemSelector: '.grid-item',
	// 	masonry: {
	// 		columnWidth: 100
	// 	}
	// });

	// Sortable & draggable item

	$( init2 );
	$( init3 );

	function init2() {
		$( ".chapter-sortable" ).sortable({
			connectWith: ".chapter-sortable"
		}).disableSelection();
	}

	function init3() {
		$( ".sceen-sortable" ).sortable({
			connectWith: ".chapter-sortable",
			stack: '.chapter-sortable ul li'
		}).disableSelection();
	}

// Label dropdown

$(".right-modal .tag.label").click(function() {
	$(".tags-block-dropdown").toggle();
});

// Right Panel Click

// $(".right-panel-click").click(function() {
// 	// alert(123);
// 	// $(".common-modal-wrapper").toggleClass("open");
// 	$(".outer-block").toggleClass("reduce-workspace-width");
// });

// $(document).click(function() {
// 	$(".common-modal-wrapper").toggleClass("open");
// });

// $(".common-modal-wrapper").click(function(e) {
// 	e.stopPropagation();
// });


// Click Chapter Title

// $('.chapter-tile').each(function (index, value) { 
	// alert('div' + index ); 
	// $(this).parent(".col-md-4").siblings(".col-md-4")addClass("chapter" + index);

	// $(".lbls").click(function() {
	// 	// alert($(this).parent().parent().html());
	// 	//$(".col-md-4").addClass("cha" + index).not(":first").hide();
	// 	$(this).parent().parent().siblings(".col-md-4").hide();
	// });
// });

$('a.rightmodalanchor').click(function(){
	$('.common-modal-wrapper').removeClass('open');
});

  

});
