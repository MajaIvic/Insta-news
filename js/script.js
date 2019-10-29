//listen to the select menu to change(whatching value)
//send a request to the NYT API for data based on the value of the select menu

//.append the data (abstract, multimedia[4].url, url) into the empty div in your HTML(.articles)

$(document).ready(function() {
  $("#select").on("change", function() {
    const section = $(this).val();
    console.log(section);

    $.ajax({
      method: "GET",
      url:
        "https://api.nytimes.com/svc/topstories/v2/" +
        section +
        ".json?api-key=4rt1RlE8LASv1wwdEoifJb3PweJksFgk",
      dataType: "json"
    }).done(function(data) {
      for (let i = 0; i < 12; i++) {
        console.log(data.results[i].title);
        let p = document.createElement("p");
        p.innerHTML = data.results[i].title;
        // $(".articles").append(p);
      }
    });
  });
});
