//credits - http://ip-api.com/json and https://newsapi.org/
var gCountry = "";
var NewsApi = `https://newsapi.org/v2/top-headlines?country=${getCountryCode()}&apiKey=ada12e66ea014d1c823a24576f340654`;
var NewsCat = ""

function getCountryCode(dropdownCountry) {

  if (dropdownCountry == undefined) {
    gCountry = "";

  } else {
    gCountry = dropdownCountry;

  };
  GetNewsData('general');

};

$(".dropdown-menu a").click(function () {
  $(this).parents(".dropdown").find('.btn').html($(this).text());
  $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
});

function getCountry() {
  if (gCountry == "") {

    $.getJSON('http://ip-api.com/json', function (data) {
      gCountry = data.countryCode;

    });
  };

};

function GetNewsData(cat) {
  // console.log('first country'+ gCountry);

  $.getJSON('http://ip-api.com/json', function (data) {

    if (gCountry == "") {
      gCountry = data.countryCode;
    };

  });

  // console.log('Second'+ gCountry);

  newsApi = `https://newsapi.org/v2/top-headlines?country=${gCountry}&category=${cat}&apiKey=ada12e66ea014d1c823a24576f340654`;

  $.getJSON(newsApi, function (data) {
    let output = '<div class="container">';
    output += '<div class="row">';

    data.articles.forEach(post => {

      let image = post.urlToImage ?
        post.urlToImage :
        './No_Image_Available.jpg';

      var postDescription = ""
      if (post.description !== null) {
        postDescription = post.description;
      };

      output += `
          <div class="col-sm-4 col-lg-3">
          <div class="card" style="background-color: #1b2836;">
          <img class="card-img-top" src="${image}" alt="News Image Preview">
          <div  class="card-body">
            <h5 class="card-title" style="color: white">${post.title}</h5>
            <p class="card-text" style="color: white">${postDescription}</p>
            <hr style=>
            <span class="badge badge-dark"><a href="${post.url}" target="_blank"> ${post.source.name}</a></span>
          </div>
          s</div>
        </div>
          `;
    });
    output += '</div>';
    output += '</div>';

    document.getElementById('results').innerHTML = output;

  });



};
