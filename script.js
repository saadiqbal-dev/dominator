$(document).ready(function () {
  // DOM Elements
  const $grid = $("#documentGrid");
  const $cards = $(".document-card");
  const $badges = $(".filter-badge");
  const $noResults = $(".no-results");

  // Filter Handler
  function applyFilter(filter) {
    // Update badge states
    $badges.removeClass("active");
    $badges.filter(`[data-filter="${filter}"]`).addClass("active");

    // Filter cards
    let visibleCount = 0;

    $cards.each(function () {
      const $card = $(this);
      const categories = $card.data("category").toString().split(" ");

      if (filter === "all" || categories.includes(filter)) {
        $card.show();
        visibleCount++;
      } else {
        $card.hide();
      }
    });

    // Show/hide no results message
    if (visibleCount === 0) {
      $noResults.addClass("active");
    } else {
      $noResults.removeClass("active");
    }
  }

  // Badge click handler
  $badges.on("click", function () {
    const filter = $(this).data("filter");
    applyFilter(filter);
  });

  // Initialize - show all cards
  applyFilter("all");
});
