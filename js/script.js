document.addEventListener("DOMContentLoaded", function() {
  $(document).ready(function() {});

  $("#select").on("change", function() {
    $("header").addClass("scale_header");
    if ($(this).val() === "sections") {
      $(".spin").hide();
    } else {
      $(".spin").show();
    }

    const section = $(this)
      .val()
      .toLowerCase();
    console.log($(this).val());

    $.ajax({
      method: "GET",
      url:
        "https://api.nytimes.com/svc/topstories/v2/" +
        section +
        ".json?api-key=4rt1RlE8LASv1wwdEoifJb3PweJksFgk",
      dataType: "json"
    })
      .done(function(data) {
        const results = data.results
          .filter(function(items) {
            if (items.multimedia[4] !== undefined) {
              return true;
            } else {
              return false;
            }
          })
          .slice(0, 12);

        $("#articles").empty();

        $.each(results, function(index, value) {
          const link = value.url;
          const img = value.multimedia[4].url;
          const abstract = value.abstract;
          console.log(img);

          $("#articles").append(
            `<li class='storys' style='background-image:url(${img});'>
              <a class = 'nysite' href= ${link}>  
                  <p class='story-text'> ${abstract}</p> 
              </a>
            </li> `
          );
        });
        $(".spin").hide();
      })
      .fail(function() {
        console.log("failed!");
        $("#articles").empty();
        $("#articles").append(
          "<p class='note'>Please choose a section on the button above.</p>"
        );
      });
  });
});
