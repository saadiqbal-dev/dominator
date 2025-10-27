$(document).ready(function () {
  const config = {
    dataSource: "manuals-data.json",
    assetsPath: "assets/img/",
  };

  const $badgeContainer = $(".badge-container");
  const $grid = $("#documentGrid");
  const $noResults = $(".no-results");
  const $loading = $(".loading-spinner");

  let allCards = [];
  let $badges = null;

  function createBadge(data) {
    const $badge = $("<div>", {
      class: data.active ? "filter-badge active" : "filter-badge",
      "data-filter": data.filter,
    });

    const $label = $("<p>", {
      text: data.label,
    });

    $badge.append($label);
    return $badge;
  }

  function renderBadges(badges) {
    $badgeContainer.empty();
    badges.forEach((badgeData) => {
      const $badge = createBadge(badgeData);
      $badgeContainer.append($badge);
    });
    $badges = $(".filter-badge");
  }

  function createCard(data) {
    const categoryString = data.categories.join(" ");

    const $col = $("<div>", {
      class: "col-auto",
      "data-category": categoryString,
    });

    const $card = $("<a>", {
      href: data.url,
      class: "document-card",
    });

    const $cardImage = $("<div>", {
      class: "card-image",
    });

    const $img = $("<img>", {
      src: config.assetsPath + data.image,
      alt: data.title,
      loading: "lazy",
    });

    $cardImage.append($img);
    $card.append($cardImage);

    const $title = $("<h3>", {
      class: "card-title",
      text: data.title,
    });

    $card.append($title);

    if (data.description) {
      const $description = $("<p>", {
        class: "card-body-text",
        text: data.description,
      });
      $card.append($description);
    }

    $col.append($card);
    return $col;
  }

  function renderCards(cards) {
    $grid.empty();
    cards.forEach((cardData) => {
      const $col = createCard(cardData);
      $grid.append($col);
    });
    allCards = $grid.find(".col-auto");
  }

  function applyFilter(filter) {
    $badges.removeClass("active");
    $badges.filter(`[data-filter="${filter}"]`).addClass("active");

    let visibleCount = 0;

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

    $noResults.toggle(visibleCount === 0);
  }

  function loadData() {
    $loading.addClass("active");

    $.ajax({
      url: config.dataSource,
      method: "GET",
      dataType: "json",
      success: function (response) {
        renderBadges(response.badges);
        renderCards(response.cards);
        applyFilter("all");
        $loading.removeClass("active");
      },
      error: function (error) {
        console.error("Error loading data:", error);
        $loading.removeClass("active");
        $noResults.addClass("active");
      },
    });
  }

  $badgeContainer.on("click", ".filter-badge", function () {
    const filter = $(this).data("filter");
    applyFilter(filter);
  });

  loadData();
});
