"use strict";
const JSCCommon = {
	modalCall() {
		const link = '[data-fancybox="modal"], .link-modal-js';

		Fancybox.bind(link, {
			arrows: false,
			// infobar: false,
			touch: false,
			trapFocus: false,
			placeFocusBack: false,
			infinite: false,
			dragToClose: false,
			type: 'inline',
			autoFocus: false,
			groupAll: false,
			groupAttr: false,
			// showClass: "fancybox-throwOutUp",
			// hideClass: "fancybox-throwOutDown",
			l10n: {
				Escape: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад",
			},
		});
		document.querySelectorAll(".modal-close-js").forEach(el => {
			el.addEventListener("click", () => {
				Fancybox.close();
			})
		})
		Fancybox.bind('[data-fancybox]', {
			placeFocusBack: false,
		});
		document.addEventListener('click', (event) => {
			let element = event.target.closest(link)
			if (!element) return;
			let modal = document.querySelector("#" + element.dataset.src);
			const data = element.dataset;

			function setValue(val, elem) {
				if (elem && val) {
					const el = modal.querySelector(elem)
					el.tagName == "INPUT"
						? el.value = val
						: el.innerHTML = val;
					// console.log(modal.querySelector(elem).tagName)
				}
			}
			setValue(data.title, '.ttu');
			setValue(data.text, '.after-headline');
			setValue(data.btn, '.btn');
			setValue(data.order, '.order');
		})
	},
	// /modalCall
	toggleMenu() {
		document.addEventListener("click", function (event) {
			const toggle = document.querySelectorAll(".toggle-menu-mobile--js");
			const menu = document.querySelector(".menu-mobile--js");
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed"));
		}, { passive: true });
	},
	closeMenu() {
		const toggle = document.querySelectorAll(".toggle-menu-mobile--js");
		const menu = document.querySelector(".menu-mobile--js");
		if (!menu) return;
		if (menu.classList.contains("active")) {
			toggle.forEach(element => element.classList.remove("on"));
			menu.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed"));
		}

	},
	mobileMenu() {
		const menu = document.querySelector(".menu-mobile--js");
		if (!menu) return;
		this.toggleMenu();
		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)
			let link = event.target.closest(".menu-mobile .menu a"); // (1)
			let toggle = event.target.closest('.toggle-menu-mobile--js.on'); // (1)
			const catalogMenu = document.querySelector(".catalog-menu--js.active");
			if (!container && !toggle && !catalogMenu) this.closeMenu();
		}, { passive: true });

		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 992px)").matches) this.closeMenu();
		}, { passive: true });
	},

	// tabs  .
	tabscostume(tab) {
		// const tabs = document.querySelectorAll(tab);
		// const indexOf = element => Array.from(element.parentNode.children).indexOf(element);
		// tabs.forEach(element => {
		// 	let tabs = element;
		// 	const tabsCaption = tabs.querySelector(".tabs__caption");
		// 	const tabsBtn = tabsCaption.querySelectorAll(".tabs__btn");
		// 	const tabsWrap = tabs.querySelector(".tabs__wrap");
		// 	const tabsContent = tabsWrap.querySelectorAll(".tabs__content");
		// 	const random = Math.trunc(Math.random() * 1000);
		// 	tabsBtn.forEach((el, index) => {
		// 		const data = `tab-content-${random}-${index}`;
		// 		el.dataset.tabBtn = data;
		// 		const content = tabsContent[index];
		// 		content.dataset.tabContent = data;
		// 		if (!content.dataset.tabContent == data) return;

		// 		const active = content.classList.contains('active') ? 'active' : '';
		// 		// console.log(el.innerHTML);
		// 		content.insertAdjacentHTML("beforebegin", `<div class="tabs__btn-accordion  btn btn-primary  mb-1 ${active}" data-tab-btn="${data}">${el.innerHTML}</div>`)
		// 	})


		// 	tabs.addEventListener('click', function (element) {
		// 		const btn = element.target.closest(`[data-tab-btn]:not(.active)`);
		// 		if (!btn) return;
		// 		const data = btn.dataset.tabBtn;
		// 		const tabsAllBtn = this.querySelectorAll(`[data-tab-btn`);
		// 		const content = this.querySelectorAll(`[data-tab-content]`);
		// 		tabsAllBtn.forEach(element => {
		// 			element.dataset.tabBtn == data
		// 				? element.classList.add('active')
		// 				: element.classList.remove('active')
		// 		});
		// 		content.forEach(element => {
		// 			element.dataset.tabContent == data
		// 				? (element.classList.add('active'), element.previousSibling.classList.add('active'))
		// 				: element.classList.remove('active')
		// 		});
		// 	})
		// })

		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
				.eq($(this).index()).fadeIn().addClass('active');
		});

	},
	// /tabs

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask({ "mask": "(999)999-99-99", showMaskOnHover: false }).mask(InputTel);
	},
	// /inputMask
	sendForm() {
		var gets = (function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");
			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}
			return b;
		})();
		// form
		$(document).on('submit', "form", function (e) {
			e.preventDefault();
			const th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data,
			}).done(function (data) {

				Fancybox.close();
				Fancybox.show([{ src: "#modal-thanks", type: "inline" }]);
				// window.location.replace("/thanks.html");
				setTimeout(function () {
					// Done Functions
					th.trigger("reset");
					// $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () { });

		});
	},
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {
		$(document).on('click', " .menu li a, .scroll-link", function () {
			const elementClick = $(this).attr("href");
			if (!document.querySelector(elementClick)) {
				$(this).attr("href", '/' + elementClick)
			}
			else {
				let destination = $(elementClick).offset().top;
				$('html, body').animate({ scrollTop: destination - 80 }, 0);
				return false;
			}
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	},
	toggleShow(toggle, drop) {

		let catalogDrop = drop;
		let catalogToggle = toggle;

		$(document).on('click', catalogToggle, function () {
			$(this).toggleClass('active').next().fadeToggle('fast', function () {
				$(this).toggleClass("active")
			});
		})

		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(catalogDrop + ".active"); // (1)
			let link = event.target.closest(catalogToggle); // (1)
			if (!container || !catalogToggle) {
				$(catalogDrop).removeClass('active').fadeOut();
				$(catalogToggle).removeClass('active');
			};
		}, { passive: true });
	},
	makeDDGroup() {
		let parents = document.querySelectorAll('.dd-group-js');
		for (let parent of parents) {
			if (parent) {
				// childHeads, kind of funny))
				let ChildHeads = parent.querySelectorAll('.dd-head-js:not(.disabled)');
				$(ChildHeads).click(function () {
					let clickedHead = this;

					$(ChildHeads).each(function () {
						if (this === clickedHead) {
							//parent element gain toggle class, style head change via parent
							$(this.parentElement).toggleClass('active');
							$(this.parentElement).find('.dd-content-js').slideToggle(function () {
								$(this).toggleClass('active');
							});
						}
						// else {
						// 	$(this.parentElement).removeClass('active');
						// 	$(this.parentElement).find('.dd-content-js').slideUp(function () {
						// 		$(this).removeClass('active');
						// 	});
						// }
					});

				});
			}
		}
	},
	imgToSVG() {
		const convertImages = (query, callback) => {
			const images = document.querySelectorAll(query);

			images.forEach(image => {
				fetch(image.src)
					.then(res => res.text())
					.then(data => {
						const parser = new DOMParser();
						const svg = parser.parseFromString(data, 'image/svg+xml').querySelector('svg');

						if (image.id) svg.id = image.id;
						if (image.className) svg.classList = image.classList;

						image.parentNode.replaceChild(svg, image);
					})
					.then(callback)
					.catch(error => console.error(error))
			});
		};


		convertImages('.img-svg-js');
	},
	reviewsMore: function reviewsMore() {
		// const reviewsParent = document.querySelector('.sProductCard__reviews-row');
		const reviewsLength = document.querySelectorAll('.sProductCard__review-col').length;
		let shownItems = 10; // количество нескрываемых элементов
		$(`.sProductCard__review-col:nth-child(-n + ${shownItems})`).addClass('is-visible')
		if (shownItems < reviewsLength) {
			const buttonMoreWrap = document.querySelector('.sProductCard__col-more');
			const buttonMore = document.querySelector('.sProductCard__col-more .btn-more-lg');
			buttonMoreWrap.style.display = 'block';
			buttonMore.addEventListener('click', function () {
				shownItems += 6; // количество добавляемых элементов за клик по кнопке
				const array = Array.from(document.querySelector('.sProductCard__reviews-row').children);
				const visibleItems = array.slice(0, shownItems);
				visibleItems.forEach(el => el.classList.add('is-visible'));
				if (visibleItems.length >= reviewsLength) {
					buttonMoreWrap.style.display = 'none';
				}
			});
		};
	},
};
const $ = jQuery;

function eventHandler() {
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	JSCCommon.tabscostume('deliveryTabs');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	// JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.makeDDGroup();
	JSCCommon.getCurrentYear('.footer__copyright span');
	JSCCommon.reviewsMore();
	// JSCCommon.toggleShow(".catalog-block__toggle--desctop", '.catalog-block__dropdown');
	// JSCCommon.animateScroll();

	// JSCCommon.CustomInputFile(); 
	var x = window.location.host;
	let screenName;
	screenName = 'screen/' + document.body.dataset.bg;
	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(${screenName});"></div>`);
	}


	function setFixedNav() {
		let topNav = document.querySelector('.top-nav  ');
		if (!topNav) return;
		window.scrollY > 0
			? topNav.classList.add('fixed')
			: topNav.classList.remove('fixed');
	}

	function whenResize() {
		setFixedNav();
	}

	window.addEventListener('scroll', () => {
		setFixedNav();

	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
	}, { passive: true });

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}

	const swiperbreadcrumb = new Swiper('.breadcrumb-slider--js', {
		slidesPerView: 'auto',
		freeMode: true,
		watchOverflow: true
	});


	let compareBlock = document.querySelector('.sCompare');
	if(compareBlock) {
		const swiperCompare = new Swiper('.section-title__head-slider--js', {
			slidesPerView: 'auto',
			freeMode: true,
			watchOverflow: true,
			navigation: {
				nextEl: document.querySelector('.section-title').querySelector('.swiper-button-next'),
				prevEl: document.querySelector('.section-title').querySelector('.swiper-button-prev'),
			},
		});
	}

	let defaultSliders = document.querySelectorAll('.default-slider-js');
	if (defaultSliders) {
		for (const defaultSlider of defaultSliders) {
			const defaultSwiper = new Swiper(defaultSlider, {
				slidesPerView: 'auto',
				observer: true,
				navigation: {
					nextEl: defaultSlider.closest('.controls-wrap-js').querySelector('.swiper-button-next'),
					prevEl: defaultSlider.closest('.controls-wrap-js').querySelector('.swiper-button-prev'),
				},
				pagination: {
					el: defaultSlider.closest('.controls-wrap-js').querySelector('.deafult-swiper-pagination'),
					type: 'bullets',
					clickable: true,
				},
			});
		}
	}

	let innerCardSliders = document.querySelectorAll('.card__slider--js');
	if (innerCardSliders) {
		for (const innerCardSlider of innerCardSliders) {
			const innerCardSwiper = new Swiper(innerCardSlider, {
				slidesPerView: 'auto',
				observer: true,
				pagination: {
					el: '.swiper-pagination',
					type: 'bullets',
					clickable: true,
				},
			});
		};
		$('.card__slider--js .swiper-pagination-bullet').hover(function () {
			$(this).trigger("click");
		});
	}

	var sProductCardThumbSlider = new Swiper(".sProductCard__thumb-slider--js", {
		spaceBetween: 10,
		slidesPerView: 5,
		freeMode: true,
		// watchSlidesProgress: true,
		breakpoints: {
			// when window width is >= 320px
			768: {
				spaceBetween: 16
			},
			992: {
				spaceBetween: 10
			},
			1200: {
				spaceBetween: 16
			},

		}
	});
	var sProductCardSlider = new Swiper(".sProductCard__slider--js", {
		spaceBetween: 0,
		thumbs: {
			swiper: sProductCardThumbSlider,
		},
	});

	const swiperTabs = new Swiper('.tabs-swiper', {
		slidesPerView: 'auto',
		freeMode: true,
		watchOverflow: true,
		slideToClickedSlide: true
	});

	// modal window

	let catalogMainBtns = document.querySelectorAll('.catalog-toggle--js');
	let catalogMenus = document.querySelectorAll('.catalog-menu--js');
	if (catalogMenus) {
		catalogMainBtns.forEach(catalogMainBtn => {
			catalogMainBtn.addEventListener('click', function (event) {
				catalogMainBtns.forEach(catalogMainBtn => {
					catalogMainBtn.classList.toggle('active');
				})
				catalogMenus.forEach(catalogMenu => {
					catalogMenu.classList.toggle('active');
				})
			});
		});

		document.addEventListener('click', function (event) {
			let catalogTargeWrapper = event.target.closest('.catalog-menu__wrap');
			let catalogTargetBtnActive = event.target.closest('.catalog-toggle--js.active');
			if (!catalogTargeWrapper && !catalogTargetBtnActive) {
				catalogMainBtns.forEach(catalogMainBtn => {
					catalogMainBtn.classList.remove('active');
				});
				catalogMenus.forEach(catalogMenu => {
					catalogMenu.classList.remove('active');
				})
			}
			window.addEventListener('resize', () => {
				if (window.matchMedia("(max-width: 992px)").matches) {
					catalogMainBtns.forEach(catalogMainBtn => {
						catalogMainBtn.classList.remove('active');
					});
					catalogMenus.forEach(catalogMenu => {
						catalogMenu.classList.remove('active');
					})
				};
			}, { passive: true });
		})

		let catalogMenuItems = document.querySelectorAll('.catalog-menu__item');
		if (catalogMenuItems) {
			catalogMenuItems.forEach(catalogMenuItem => {
				catalogMenuItem.addEventListener('click', function () {
					catalogMenuItem.nextElementSibling.classList.add('active');
				})
				window.addEventListener('resize', () => {
					if (window.matchMedia("(min-width: 992px)").matches) {
						catalogMenuItem.nextElementSibling.classList.remove('active');
					};
				}, { passive: true });
			})
		};

		let catalogBackBtns = document.querySelectorAll('.catalog-menu__back-btn');
		for (const catalogBackBtn of catalogBackBtns) {
			catalogBackBtn.addEventListener('click', function () {
				catalogBackBtn.parentElement.classList.remove('active');
			})
		}
	}

	let searchContent = document.querySelector('.top-nav__search-wrap--js');
	if (searchContent) {
		let searchContentInput = searchContent.querySelector('input');
		let mobileSearchBtn = document.querySelector('.topLine__link--search-js');
		searchContent.addEventListener('click', function () {
			searchContent.classList.add('active');
		});

		searchContent.addEventListener('input', function () {
			if (String(searchContentInput.value.split('')).length >= 1) {
				searchContent.classList.add('shown');
			};
			if (String(searchContentInput.value.split('')).length < 1) {
				searchContent.classList.remove('shown');
			};
		});

		mobileSearchBtn.addEventListener('click', function () {
			mobileSearchBtn.classList.toggle('active');
			searchContent.classList.toggle('active');
		});

		document.addEventListener('click', (event) => {
			let searchTargetContent = event.target.closest('.top-nav__search-wrap--js.active');
			let searchTargetBtn = event.target.closest('.topLine__link--search-js.active');
			if (!searchTargetContent && !searchTargetBtn) {
				searchContent.classList.remove('active');
				mobileSearchBtn.classList.remove('active');
			}
		})
	}

	let sortDropDown = document.querySelector('.sort-dropdown-wrap--js');
	if (sortDropDown) {
		let sortBtn = sortDropDown.querySelector('.sort-dropdown-wrap__sort-item');
		let sortDropDownContainer = sortDropDown.querySelector('.sort-dropdown-wrap__sort-dropdown');
		let sortDropDownElements = sortDropDown.querySelectorAll('ul li a');

		sortBtn.addEventListener('click', () => {
			sortDropDownContainer.classList.toggle('active');
		})

		sortDropDownElements.forEach(sortDropDownElement => {
			sortDropDownElement.addEventListener('click', function (event) {
				event.preventDefault();
				sortBtn.innerHTML = this.innerHTML;
				sortDropDownContainer.classList.remove('active');
			})
		})

		document.addEventListener('click', (event) => {
			let sortTargetBtn = event.target.closest('.sort-dropdown-wrap__sort-item');
			let sortDropDownTargetContainer = event.target.closest('.sort-dropdown-wrap__sort-dropdown.active');
			if (!sortTargetBtn && !sortDropDownTargetContainer) {
				sortDropDownContainer.classList.remove('active');
			}
		})
	}

	let filterWrap = document.querySelector('.filter--js');
	if (filterWrap) {
		filterWrap.querySelector('.filter__btn').addEventListener('click', function () {
			// filterWrap.querySelector('.filter__close--js').classList.add('hidden');
			filterWrap.querySelector('.filter__body').classList.toggle('active');
			document.querySelector('body').classList.toggle('fixed2');
		})
		filterWrap.querySelector('.filter__close--js').addEventListener('click', function () {
			filterWrap.querySelector('.filter__body').classList.remove('active');
			document.querySelector('body').classList.remove('fixed2');
		})
		let catalogItems = document.querySelectorAll('.catalog-menu__wrap');
		if (catalogItems) {
			catalogItems.forEach(catalogItem => {
				catalogItem.querySelector('.catalog-menu__item').addEventListener('click', () => {
					filterWrap.querySelector('.filter__close--js').classList.add('hidden');
					$('.filter__body').addClass('fixed2');
				});
				catalogItem.querySelector('.catalog-menu__back-btn').addEventListener('click', function () {
					filterWrap.querySelector('.filter__close--js').classList.remove('hidden');
					$('.filter__body').removeClass('fixed2');
				})
			})
		};
		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 992px)").matches) {
				filterWrap.querySelector('.filter__close--js').classList.remove('hidden');
			};
		}, { passive: true });
	}

	// Range Slider
	var $range = $(".js-range-slider");
	var $inputFrom = $(".js-input-from");
	var $inputTo = $(".js-input-to");
	var instance;
	var min = 0;
	var max = 20000;
	var from = 0;
	var to = 0;

	$range.ionRangeSlider({
		skin: "round",
		type: "double",
		min: min,
		max: max,
		from: 890,
		to: 18090,
		onStart: updateInputs,
		onChange: updateInputs,
		onFinish: updateInputs
	});
	instance = $range.data("ionRangeSlider");

	function updateInputs(data) {
		from = data.from;
		to = data.to;

		$inputFrom.prop("value", from);
		$inputTo.prop("value", to);
	}

	$inputFrom.on("change", function () {
		var val = $(this).prop("value");
		console.log(val);
		// validate
		if (val < min) {
			val = min;
		} else if (val > to) {
			val = to;
		}
		instance.update({
			from: val
		});
		$(this).prop("value", val);
	});

	$inputTo.on("change", function () {
		var val = $(this).prop("value");
		// validate
		if (val < from) {
			val = from;
		} else if (val > max) {
			val = max;
		}
		instance.update({
			to: val
		});
		$(this).prop("value", val);
	});

	let customSelects = document.querySelectorAll('.custom-select');
	for (let customSelect of customSelects) {
		$(customSelect.querySelector('.custom-select-js')).select2({
			// tags: true,
			// tokenSeparators: [',', ' ']
			language: "ru",
			dropdownParent: customSelect,
			dropdownCssClass: 'custom-select__dropdown',
			// closeOnSelect: false
			// allowClear: true
		});
	}

	let sCompareMainSlider = new Swiper('.sCompare-main-slider-js', {
    slidesPerView: 'auto',
  });


  // let allSlides = document.querySelectorAll('.sCompare-sub-slider-js .swiper-slide');
  let compareCard = document.querySelector('.compare-card--js');
	// let headlines = document.querySelectorAll('.c-item-js');
  let lines = []; //

  // for (let [headLineIndex, line] of Object.entries(headlines)) {
  //   lines[headLineIndex] = [line];

  //   for (let slide of allSlides) {
  //     let slideLine = slide.querySelectorAll(".slide-char-js")[headLineIndex];
  //     lines[headLineIndex].push(slideLine);
  //   }
  // }

  function compareCardResize() {
    if (compareCard) {
      document.documentElement.style.setProperty('--comp-card-h', "".concat(compareCard.offsetHeight, "px"));
    }

    if (window.matchMedia("(max-width: 992px)").matches) return;

    for (let line of lines) {
      let minH = 0;

      for (let item of line) {
        if (minH < item.offsetHeight) {
          minH = item.offsetHeight;
        }
      }

      $(line).each(function () {
        this.style.minHeight = minH + 'px';
      });
    }
  }

  window.addEventListener('resize', compareCardResize, {
    passive: true
  }); //-window.addEventListener('scroll', compareCardResize, {passive: true});

  compareCardResize();

	let compareDropDowns = document.querySelectorAll('.sCompare__c-title');
	if(compareDropDowns) {
		for (let i = 0; i < compareDropDowns.length; i++) {
			compareDropDowns[i].addEventListener('click', () => {
				compareDropDowns[i].classList.toggle('active');
				compareDropDowns[i].nextElementSibling.classList.toggle('active')
				$(compareDropDowns[i].nextElementSibling).slideToggle();
				let subSliders = document.querySelectorAll('.sCompare-sub-slider');
				subSliders.forEach(subSlider => {
					$(subSlider.querySelectorAll('.sCompare__slider-chars')[i]).slideToggle(function() {
					});
					subSlider.querySelectorAll('.sCompare__slider-chars')[i].classList.toggle('hidden');
				})
			})
		}
	}

};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }