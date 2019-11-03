document.addEventListener("DOMContentLoaded", function() {
  $(document).ready(function() {});

  $("#select").on("change", function() {
    // $("header").css("height", "50vh");
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

    //console.log(data);

    $.ajax({
      method: "GET", // gets the api json file from nyt
      url:
        "https://api.nytimes.com/svc/topstories/v2/" +
        section +
        ".json?api-key=4rt1RlE8LASv1wwdEoifJb3PweJksFgk", //api pth to the json file
      dataType: "json"
    })
      .done(function(data) {
        //once above ajax is done, pass the data to this 'done' function
        const results = data.results
          .filter(function(items) {
            if (items.multimedia[4] !== undefined) {
              return true;
            } else {
              return false;
            }
          })
          .slice(0, 12);

        //const results = data.results.slice(0, 12); //get 12 items from my data array

        $("#articles").empty(); //clear out old articles

        $.each(results, function(index, value) {
          //for each 12 'results' find key and value
          //console.log(value);
          //make variable for each value needed
          const link = value.url;
          const img = value.multimedia[4].url;
          const abstract = value.abstract;
          console.log(img);

          //append a template block to html target container
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
      }); //close fail function!
  }); //close event listner
});
