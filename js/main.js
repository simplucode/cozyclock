$(function () {
  $("#year").text(new Date().getFullYear());

  var $nav = $("#siteNav");
  var $toggle = $("#navToggle");
  var $links = $("#navLinks");

  $(window).on("scroll", function () {
    $nav.toggleClass("is-scrolled", $(window).scrollTop() > 8);
  });

  $toggle.on("click", function () {
    var open = !$links.hasClass("is-open");
    $links.toggleClass("is-open", open);
    $toggle.toggleClass("is-open", open);
    $toggle.attr("aria-expanded", open ? "true" : "false");
    $toggle.attr("aria-label", open ? "Close menu" : "Open menu");
  });

  $links.on("click", "a", function () {
    $links.removeClass("is-open");
    $toggle.removeClass("is-open").attr("aria-expanded", "false");
  });

  var $reveals = $(".reveal");
  if ("IntersectionObserver" in window && $reveals.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            $(entry.target).addClass("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    $reveals.each(function () {
      observer.observe(this);
    });
  } else {
    $reveals.addClass("is-visible");
  }

  $('a[href^="#"]').on("click", function (e) {
    var id = $(this).attr("href");
    if (id.length > 1 && $(id).length) {
      e.preventDefault();
      $("html, body").animate({ scrollTop: $(id).offset().top - 72 }, 420);
    }
  });
});
