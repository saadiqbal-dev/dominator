$(document).ready(function () {
  const $badgeContainer = $(".badge-container");
  const $grid = $("#documentGrid");
  const $noResults = $(".no-results");
  const $loading = $(".loading-spinner");

  let allCards = [];
  let $badges = null;

  function applyFilter(filter) {
    if ($badges && $badges.length > 0) {
      $badges.removeClass("active");
      $badges.filter(`[data-filter="${filter}"]`).addClass("active");
    }

    let visibleCount = 0;

    if (allCards && allCards.length > 0) {
      allCards.each(function () {
        const $col = $(this);
        const categories = $col.data("category").toString().split(" ");

        if (filter === "all" || categories.includes(filter)) {
          $col.show();
          visibleCount++;
        } else {
          $col.hide();
        }
      });
    }

    $noResults.toggle(visibleCount === 0);
  }

  function init() {
    $badges = $(".filter-badge");
    allCards = $grid.find(".col-auto");

    // Hide loading spinner
    $loading.hide();

    // Apply default filter
    applyFilter("all");
  }

  $badgeContainer.on("click", ".filter-badge", function () {
    const filter = $(this).data("filter");
    applyFilter(filter);
  });

  init();
});
