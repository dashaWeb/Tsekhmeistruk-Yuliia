

var clock= document.querySelector('#clock');
var text=  document.querySelector('#text');
var image= document.querySelector('#image');            

var n=false;

function time(){
    var date = new Date();  
    var h = date.getHours();   
    var m = date.getMinutes();  
    var s = date.getSeconds(); 
    
 
    if(s<10)
    { s='0'+s;}
    if(m<10)
    { m='0'+m;}
    if(h<10)
    { h='0'+h;}
    

    if (n==false)
    {clock.innerHTML=h+":"+m+":"+s;
    n=true;}
    else {clock.innerHTML= h+" "+m+" "+s;
    n=false; }

    hello()
}
setInterval('time()',500);



var a=false;
function hello(){
    var date = new Date();  
    var h = date.getHours();   
   
  if( h<=6&&h>=0){
    text.innerHTML='Доброї ночі,шановні гості. Наш сайт до Ваших послуг.';
  }
  else if(h<12&&h>6){
    text.innerHTML='Доброго ранку, шановний гостю!! Наш сайт до Ваших послуг';}
    else if(h<=18&&h>=12){
    text.innerHTML='Доброго дня! Наш сайт до Ваших послуг!';}
    else if(h<24&&h>18){
     text.innerHTML='Доброго вечора! Наш сайт до Ваших послуг!';}
}

// function gettingJSON(){
//   getJSON("http://api.openweathermap.org/data/2.5/weather?q=London&APPID=ee6596241130f193adf1ba90e625cc10",function(json){
//       document.write(JSON.stringify(json));
//   });
// }













/*-------------------------------------------------------------------------------*/ 










var $tempMode = $("#tempMode");
var $tempText = $("#temp-text");
var $windText = $("#wind-text");
var $windText2 = $("#wind-text2");
var $windText3 = $("#wind-text3");
var $windText4 = $("#wind-text4");
var $windText5 = $("#wind-text5");

function formatTemperature(kelvin) {
    
    
    var clicked = false;
    var fahr = ((kelvin * 9 / 5) - 459.67).toFixed(0);
    var cels = (kelvin - 273.15).toFixed(1);
    //инициация индикации температуры
    $tempText.html(cels);

    var firstClick = false;
    //щелкните обработчик, чтобы обновить единицу измерения температуры.
    $tempMode.off("click").on("click", function() {
      firstClick = true;
      console.log(clicked);
      clicked === false ? clicked = true : clicked = false;
      clicked === true ? $tempMode.html("F&deg") : $tempMode.html("C&deg") ;
      if (clicked) {
	  $tempText.html(fahr);
        
      } else
        $tempText.html(cels);
    });

    if (cels > 24) {
      $("#temp-text").css("color", "red");
    } else if (cels < 18) {
      $("#temp-text").css("color", "blue");
    }
  }
  //обрабатывает данные ответа и форматирует их соответствующим образом, поскольку это асинхронный объект ответа, вся обработка и форматирование данных должны выполняться в этой функции.
  
  function dataHandler(data) {
    dataString = JSON.stringify(data);
    console.log(data.main.temp);
    formatTemperature(data.main.temp);
    if (data.main.temp && data.sys) {
      // отображение иконки
      if (data.weather) {
        var imgURL = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
        $("#weatherImg").attr("src", imgURL);
        $("#weather-text").html(data.weather[0].description);
      }
      // скорость ветра
      if (data.wind) {
        var knots = data.wind.speed;
        $windText.html(knots.toFixed(1) + " М/С");
        var knots2 = data.wind.speed * 1.9438445;
	    $windText2.html(knots2.toFixed(1) + " Узлов");
      }
	  if (data.main) {
        var hum2 = data.main.pressure;
		var mm = (data.main.pressure * 0.75006).toFixed(0);
        $windText3.html(mm + " мм.рт.ст.");
    }
if (data.main) {
        var hum3 = data.main.humidity;
        $windText4.html(hum3 + " %");
    }
//определяем направление ветра
 if (data.main) {
        var hum4 = data.wind.deg;
           if (hum4=>0 && hum4<22.5) {
               $windText5.html("N (North)");
               }
           if (hum4=>22.5 && hum4<67.5) {
               $windText5.html("N-E (Northeastern)");
               }
           if (hum4=>67.5 && hum4<112.5) {
               $windText5.html("E (Eastern)");
               }
           if (hum4=>112.5 && hum4<157.5) {
               $windText5.html("S-E (Southeastern)");
               }
           if (hum4=>157.5 && hum4<202.5) {
               $windText5.html("S (South)");
               }
           if (hum4=>202.5 && hum4<247.5) {
               $windText5.html("S-W (Southwest)");
               }
           if (hum4=>247.5 && hum4<292.5) {
               $windText5.html("W (West)");
               }
           if (hum4=>292.5 && hum4<337.5) {
               $windText5.html("N-W (Northwest)");
               }
           if (hum4=>337.5) {
               $windText5.html("N (North)");
               }			   
    }  console.log(hum4); 	
  }
}
  function getWeather(locdata) {
    console.log("getWeather has been called.")
    var lat = locdata.latitude;
    var lon = locdata.longitude;
	
    var apiURI = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=5b58aee62c41eb64fcab16edce2e5cc1";
//выводим данные IP
    if (locdata){ 
      console.log("success");
      $("#city-text").html(locdata.city );
      $("#city-text2").html(locdata.country_name);
      $("#city-text3").html(" Индекс: " + locdata.postal);
      $("#city-text4").html(" Широта: " + locdata.latitude + " Долгота: " + locdata.longitude);
      $("#city-text5").html(" IP: " + locdata.ip);
      $("#city-text6").html(" Провайдер: " + locdata.org);
    } else {
    console.log("fail");
    }

    //делаем запрос на данные о погоде
    console.log("success getWeather");
    console.log(apiURI);
    return $.ajax({
      url: apiURI,
      dataType: "jsonp",
      type: "GET",
      async: "true",
    }).done(dataHandler);

  }

  var counter = 0;

  function getLocation() {
   console.log("Update# " + counter++);
    
    //делаем запрос на локализацию устройства
    return $.ajax({
      url: "https://ipapi.co/jsonp/",
      dataType: "jsonp",
      type: "GET",
      async: "true",
    });
  }

    
  var updateInterval = setInterval(getLocation().done(getWeather), 300000);
//});

 function showDateTime() {
            var now = new Date();
            date.textContent = `${now.toLocaleDateString("ua-ua", { day: "numeric", month: "long" })} ${now.getFullYear()} року, `
                + now.toLocaleDateString("ua-ua", { weekday: "long" });
            time.textContent = correctTime(now);
        }
        showDateTime();
        setInterval(showDateTime, 1000);
 
        let stopwatchId, stopwatch_ms,
            timerId, timer_ms;
                                 
        // Общая функция корректного отображения времени. 
        function correctTime(time) {
            let h = time.getHours(),
                m = time.getMinutes(),
                s = time.getSeconds();
            return `${(h < 10 ? "0" : "") + h}:${(m < 10 ? "0" : "") + m}:${(s < 10 ? "0" : "") + s}`;
        } 
        // В Opera отображение ведущего нуля часов глючит в Intl.
        function correctTimeIntl(time) {
            let format = Intl.DateTimeFormat("ua", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
            return format.format(time);
        }  







//--------------------------------------------------------------------




var ul = document.querySelector('ul');
var land = localStorage.getItem('id');
var main_news = document.querySelector('.main_news')
var country = document.querySelector('.country h5')

if (land == null) {
    land = 'ua'
}
var lab = localStorage.getItem('type');

function change(params) {
    localStorage.setItem('type', params);
    location.reload()
}
if (lab == 'NEWS') {
    x = 0;
} else if (lab == 'HEALTH') {
    x = 1;
} else if (lab == 'Technology') {
    x = 2;
} else if (lab == 'FILMS') {
    x = 3;
} else if (lab == 'SPORT') {
    x = 4;
} else {
    x = 0;
}
var papa_sendwich = document.querySelector('.papa_sendwich')
var sandwich_panel = document.querySelector('.sandwich_panel')
var arr = [`https://newsapi.org/v2/top-headlines?country=${land}&apiKey=e9a1b84513034c50ba27c412f5a7cc6a`, `https://newsapi.org/v2/top-headlines?country=${land}&category=health&apiKey=e9a1b84513034c50ba27c412f5a7cc6a`, `https://newsapi.org/v2/top-headlines?country=${land}&category=technology&apiKey=e9a1b84513034c50ba27c412f5a7cc6a`, `https://newsapi.org/v2/top-headlines?country=${land}&category=entertainment&apiKey=e9a1b84513034c50ba27c412f5a7cc6a`, `https://newsapi.org/v2/top-headlines?country=${land}&category=sports&apiKey=e9a1b84513034c50ba27c412f5a7cc6a`];
var show_block = document.querySelector('.show_block')
var li = document.querySelectorAll('li')
var x;
var urlType = arr[x];
if (urlType == null) {
    urlType = `https://newsapi.org/v2/top-headlines?country=${land}&apiKey=e9a1b84513034c50ba27c412f5a7cc6a`
}

document.addEventListener('DOMContentLoaded', loadTypes);
main_news.textContent = localStorage.getItem('type')
country.textContent = localStorage.getItem('id')
var line = [];

function loadTypes() {
    var req = new Request(urlType);
    fetch(req)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            object = data.articles;
            for (var key in object) {
                let title = object[key].title
                let urlImage = object[key].urlToImage
                let url = object[key].url
                let name = object[key].author
                let date = object[key].publishedAt
                line = object[key].urlToImage
                if (name == null) {
                    name = 'Anonymous'
                }
                if (urlImage == null) {
                    urlImage = 'img/oops-знамя-вектора-91620593.jpg'
                }

                document.querySelector('.content').insertAdjacentHTML('afterbegin', `<div class='col3 lg-4 md-6 sm-12 card'><img src="${urlImage}" alt="NOT FOUND COMMING SOON" class='card-img'><h3>${title}</h3><span>Автор: ${name}<br><small>${date}</small></span><a href='${url}'><button type="button" class="btn btn-info">ПОДРОБНЕЕ</button></a></div>`)

                document.querySelector('.img_list').insertAdjacentHTML('afterbegin', `<img src="${urlImage}" class='galery_img' alt="NOT FOUND COMMING SOON">`)
                var galery_img = document.querySelectorAll('.galery_img');
            }
            return galery_img.length;
        })
        .then((numb) => {

            var img_list = document.querySelector('.img_list');


            var z = 0;
            setInterval(function swype() {
                img_list.style.left = `-${z}px`;
                z++
                if (z >= 355 * numb) {
                    z = 0;
                }
                
            }
                , 20)
            //             galery.addEventListener('mouseenter', stop);
            //             function stop() {
            //             clearInterval(sw)
            // }
        })

    var pan = true;
    papa_sendwich.addEventListener('click', () => {
        if (pan == true) {

            sandwich_panel.style.left = '0px';
            pan = false;
        } else {
            sandwich_panel.style.left = '-2500px';
            pan = true;
        }
    })
}
class Dropdown {
    constructor(selector, options) {
        this.el = document.querySelector(selector);
        this.items = options.items;
        this.el.querySelector('.dropdown_label').textContent = this.items[0].label;
        this.el.addEventListener('click', event => {
            if (event.target.classList.contains('dropdown_label')) {
                if (this.el.classList.contains('open')) {
                    this.hide();
                } else {
                    this.show();
                }
            } else if (event.target.tagName.toLowerCase() === 'li') {
                this.select(event.target.dataset.id);
            }
        })
        const itemsHTML = this.items.map(i => {
            return `<li data-id="${i.id}">${i.label}</li>`
        }).join('<hr>')
        this.el.querySelector('.dropdown_menu').insertAdjacentHTML('afterbegin', itemsHTML)
    }
    select(id) {
        const item = this.items.find(i => i.id === id);
        this.el.querySelector('.dropdown_label').textContent = item.label;
        this.hide();
        localStorage.setItem('id', id);

        location.reload()
    }
    show() {
        this.el.classList.add('open');
    }
    hide() {
        this.el.classList.remove('open')
    }
}

const dropdown = new Dropdown('#dropdown', {
    items: [{
        label: 'Ukraine',
        id: 'ua'
    },
    {
        label: 'Russian',
        id: 'ru'
    },
    {
        label: 'USA',
        id: 'us'
    },
    {
        label: 'Poland',
        id: 'pl'
    },
    ]
})


































///------------------------------------------------------------------------
// window.addEventListener("load", Init);
// function Init() {
//     console.log("Init");
//     var apiKey = "ac4c1819fc814b4da5f6a7d81ecc1596";
//     var category = ["sport", "entertainment", "science", "business", "technology"];
//     var callbackFunction = [
//         { news: sportNews },
//         { news: entertainmentNews },
//         { news: scienceNews },
//         { news: businessNews },
//         { news: technologyNews }
//     ];
  
//   for (var i = 0; i < category.length; i++) {
//     Request(category[i], apiKey, callbackFunction[i].news);
//   }

//   var weatherAPIKey = "d663677633bd6cb690bbdea66fe5a981";
//   var city = "Rivne";
//   WeatherRequest(city, weatherAPIKey, RenderWeather);
// }
// function WeatherRequest(city, weatherAPIKey, callback) {
//   var url = `http://api.openweathermap.org/data/2.5/forecast?id=7046809&APPID=${weatherAPIKey}`;
//   //api.openweathermap.org/data/2.5/forecast?id=707860&APPID=eb1eee072bb055a6ebad977afce5902f
//   http: https: var xhr = new XMLHttpRequest();
//   xhr.open("GET", url, true);
//   xhr.send();

//   xhr.onreadystatechange = function() {

// var weatherAPIKey = "d663677633bd6cb690bbdea66fe5a981";
// var city = "Rivne";
// WeatherRequest(city, weatherAPIKey, RenderWeather);
// }

// function WeatherRequest(city, weatherAPIKey, callback) {
// var url = `http://api.openweathermap.org/data/2.5/forecast?id=7046809&&APPID=${weatherAPIKey}`;
// //api.openweathermap.org/data/2.5/forecast?id=707860&APPID=eb1eee072bb055a6ebad977afce5902f
// var xhr = new XMLHttpRequest();
// xhr.open("GET", url, true);
// xhr.send();

// xhr.onreadystatechange = function () {
//     if (xhr.readyState != 4) return;
//     if (xhr.status != 200) {
//       var errStatus = xhr.status;
//       var errText = xhr.statusText;
//       console.log(errStatus + ": " + errText);
//         var errStatus = xhr.status;
//         var errText = xhr.statusText;
//         console.log(errStatus + ": " + errText);
//     } else {
//       var data = JSON.parse(xhr.responseText);
//       callback(data);
//         var data = JSON.parse(xhr.responseText);
//         callback(data);
//     }
//   };
// }
 
// function Request(category, apiKey, callback) {
//   var url = `https://newsapi.org/v2/top-headlines?country=ua&category=${category}&apiKey=${apiKey}`;
//   var xhr = new XMLHttpRequest();
//   xhr.open("GET", url, true);
//   xhr.send();

//   xhr.onreadystatechange = function() {
// };
// }

// function Request(category, apiKey, callback) {
// var url = `https://newsapi.org/v2/top-headlines?country=ua&category=${category}&apiKey=${apiKey}`;
// var xhr = new XMLHttpRequest();
// xhr.open("GET", url, true);
// xhr.send();

// xhr.onreadystatechange = function () {
//     if (xhr.readyState != 4) return;

//     if (xhr.status != 200) {
//       var errStatus = xhr.status;
//       var errText = xhr.statusText;
//       console.log(errStatus + ": " + errText);
//         var errStatus = xhr.status;
//         var errText = xhr.statusText;
//         console.log(errStatus + ": " + errText);
//     } else {
//       var data = JSON.parse(xhr.responseText);
//       callback(data);
//         var data = JSON.parse(xhr.responseText);
//         callback(data);
//     }
//   };
// }
// function RenderWeather(weather){
//   console.log(weather);
// }
// };


// function sportNews(news) {
//     console.log("sportNews", news.articles);
//     var sportElem = document.querySelector("#sport");
//     console.log(sportElem);

//     for (var i = 0; i < 5; i++) {

//         var h3 = document.createElement('h3');
//         h3.className = "news_title";
//         h3.innerHTML = news.articles[i].title;
//         sportElem.appendChild(h3);

//         var img = document.createElement('img');
//         img.setAttribute("src", news.articles[i].urlToImage);
//         img.setAttribute("alt", news.articles[i].title);
//         img.className = "news_img";
//         sportElem.appendChild(img);

//         var desc = document.createElement('p');
//         desc.className = "news_description";
//         desc.innerHTML = news.articles[i].description;
//         sportElem.appendChild(desc);

//         var author = document.createElement('span');
//         author.className = "news_author";
//         author.innerHTML = news.articles[i].author;
//         sportElem.appendChild(author);

//         var publishedAt = document.createElement('span');
//         publishedAt.className = "news_publishedAt";
//         publishedAt.innerHTML = news.articles[i].publishedAt;
//         sportElem.appendChild(publishedAt);
//     }
// }
// function RenderWeather(weather) {
// console.log(weather);
// function entertainmentNews(news) {
//   console.log("entertainmentNews", news.articles);
//   var entertainmentElem = document.querySelector("#entertainment");
//   console.log(entertainmentElem);

//   for (var i = 0; i < 5; i++) {

//       var h3 = document.createElement('h3');
//       h3.className = "news_title";
//       h3.innerHTML = news.articles[i].title;
//       entertainmentElem.appendChild(h3);

//       var img = document.createElement('img');
//       img.setAttribute("src", news.articles[i].urlToImage);
//       img.setAttribute("alt", news.articles[i].title);
//       img.className = "news_img";
//       entertainmentElem.appendChild(img);

//       var desc = document.createElement('p');
//       desc.className = "news_description";
//       desc.innerHTML = news.articles[i].description;
//       entertainmentElem.appendChild(desc);

//       var author = document.createElement('span');
//       author.className = "news_author";
//       author.innerHTML = news.articles[i].author;
//       entertainmentElem.appendChild(author);

//       var publishedAt = document.createElement('span');
//       publishedAt.className = "news_publishedAt";
//       publishedAt.innerHTML = news.articles[i].publishedAt;
//       entertainmentElem.appendChild(publishedAt);
//   }
// var weatherElem = document.querySelector("#weather");
// // console.log(weatherElem);

// for (var i = 0; i < 40; i+=8) {

//   var weatherDiv = document.createElement("div");
//   weatherDiv.className = "weather";

//   var city = document.createElement("div");
//   city.className = "city";
//   city.innerHTML = `${weather.city.name} ${weather.city.country}`;

//   var weatherBody = document.createElement("div");
//   weatherBody.className = "weatherList";
//   weatherBody.innerHTML = `${weather.list[i].dt_txt} </br> ${weather.list[i].weather[0].description}`;

//   var img = document.createElement("img");
//   img.className = "icon";
//   img.setAttribute("src", "https://openweathermap.org/img/w/" + weather.list[i].weather[0].icon +".png");

//   var weatherTemp = document.createElement("div");
//   weatherTemp.className = "temperature";
//   weatherTemp.innerHTML = `Temperature: ${weather.list[i].main.temp}`;

//   weatherElem.appendChild(weatherDiv);
//   weatherDiv.appendChild(city);
//   weatherDiv.appendChild(weatherBody);
//   weatherDiv.appendChild(img);
//   weatherDiv.appendChild(weatherTemp);

// }
// }

// function sportNews(news) {
// console.log("sportNews", news.articles);
// var sportElem = document.querySelector("#sport");
// console.log(sportElem);

// for (var i = 0; i < 5; i++) {

//   var h3 = document.createElement('h3');
//   h3.className = "news_title";
//   h3.innerHTML = news.articles[i].title;
//   sportElem.appendChild(h3);

//   var img = document.createElement('img');
//   img.setAttribute("src", news.articles[i].urlToImage);
//   img.setAttribute("alt", news.articles[i].title);
//   img.className = "news_img";
//   sportElem.appendChild(img);

//   var desc = document.createElement('p');
//   desc.className = "news_description";
//   desc.innerHTML = news.articles[i].description;
//   sportElem.appendChild(desc);

//   var author = document.createElement('span');
//   author.className = "news_author";
//   author.innerHTML = news.articles[i].author;
//   sportElem.appendChild(author);

//   var publishedAt = document.createElement('span');
//   publishedAt.className = "news_publishedAt";
//   publishedAt.innerHTML = news.articles[i].publishedAt;
//   sportElem.appendChild(publishedAt);
// }
// }function entertainmentNews(news) {
//   console.log("entertainmentNews", news.articles);
//   var entertainmentElem = document.querySelector("#entertainment");
//   console.log(entertainmentElem);

//   for (var i = 0; i < 5; i++) {

//       var h3 = document.createElement('h3');
//       h3.className = "news_title";
//       h3.innerHTML = news.articles[i].title;
//       entertainmentElem.appendChild(h3);

//       var img = document.createElement('img');
//       img.setAttribute("src", news.articles[i].urlToImage);
//       img.setAttribute("alt", news.articles[i].title);
//       img.className = "news_img";
//       entertainmentElem.appendChild(img);

//       var desc = document.createElement('p');
//       desc.className = "news_description";
//       desc.innerHTML = news.articles[i].description;
//       entertainmentElem.appendChild(desc);

//       var author = document.createElement('span');
//       author.className = "news_author";
//       author.innerHTML = news.articles[i].author;
//       entertainmentElem.appendChild(author);

//       var publishedAt = document.createElement('span');
//       publishedAt.className = "news_publishedAt";
//       publishedAt.innerHTML = news.articles[i].publishedAt;
//       entertainmentElem.appendChild(publishedAt);
//   }
// }

//   // function scienceNews(news) {
//   //     console.log("scienceNews", news.articles);
// function scienceNews(news) {
//   console.log("scienceNews", news.articles);

//       // var scienceElem = document.querySelector("#science");
//       // console.log(scienceElem);
//   var scienceElem = document.querySelector("#science");
//   console.log(scienceElem);

//       // for (var i = 0; i < 5; i++) {
//   for (var i = 0; i < 5; i++) {

//           // var h3 = document.createElement('h3');
//           // h3.className = "news_title";
//           // h3.innerHTML = news.articles[i].title;
//           // scienceElem.appendChild(h3);
//       var h3 = document.createElement('h3');
//       h3.className = "news_title";
//       h3.innerHTML = news.articles[i].title;
//       scienceElem.appendChild(h3);

//           var img = document.createElement('img');
//           img.setAttribute("src", news.articles[i].urlToImage);
//           img.setAttribute("alt", news.articles[i].title);
//           img.className = "news_img";
//           scienceElem.appendChild(img);
//       var img = document.createElement('img');
//       img.setAttribute("src", news.articles[i].urlToImage);
//       img.setAttribute("alt", news.articles[i].title);
//       img.className = "news_img";
//       scienceElem.appendChild(img);

//           var desc = document.createElement('p');
//           desc.className = "news_description";
//           desc.innerHTML = news.articles[i].description;
//           scienceElem.appendChild(desc);
//       var desc = document.createElement('p');
//       desc.className = "news_description";
//       desc.innerHTML = news.articles[i].description;
//       scienceElem.appendChild(desc);

//           var author = document.createElement('span');
//           author.className = "news_author";
//           author.innerHTML = news.articles[i].author;
//           scienceElem.appendChild(author);
//       var author = document.createElement('span');
//       author.className = "news_author";
//       author.innerHTML = news.articles[i].author;
//       scienceElem.appendChild(author);

//           var publishedAt = document.createElement('span');
//           publishedAt.className = "news_publishedAt";
//           publishedAt.innerHTML = news.articles[i].publishedAt;
//           scienceElem.appendChild(publishedAt);
//       }
//       var publishedAt = document.createElement('span');
//       publishedAt.className = "news_publishedAt";
//       publishedAt.innerHTML = news.articles[i].publishedAt;
//       scienceElem.appendChild(publishedAt);
//   }
// }

//   // function businessNews(news) {
//   //     console.log("businessNews", news.articles);
// function businessNews(news) {
//   console.log("businessNews", news.articles);

//       // var businessElem = document.querySelector("#business");
//       // console.log(businessElem);
//   var businessElem = document.querySelector("#business");
//   console.log(businessElem);

//       // for (var i = 0; i < 5; i++) {
//   for (var i = 0; i < 5; i++) {

//           var h3 = document.createElement('h3');
//           h3.className = "news_title";
//           h3.innerHTML = news.articles[i].title;
//           businessElem.appendChild(h3);
//       var h3 = document.createElement('h3');
//       h3.className = "news_title";
//       h3.innerHTML = news.articles[i].title;
//       businessElem.appendChild(h3);

//           var img = document.createElement('img');
//           img.setAttribute("src", news.articles[i].urlToImage);
//           img.setAttribute("alt", news.articles[i].title);
//           img.className = "news_img";
//           businessElem.appendChild(img);
//       var img = document.createElement('img');
//       img.setAttribute("src", news.articles[i].urlToImage);
//       img.setAttribute("alt", news.articles[i].title);
//       img.className = "news_img";
//       businessElem.appendChild(img);

//           var desc = document.createElement('p');
//           desc.className = "news_description";
//           desc.innerHTML = news.articles[i].description;
//           businessElem.appendChild(desc);
//       var desc = document.createElement('p');
//       desc.className = "news_description";
//       desc.innerHTML = news.articles[i].description;
//       businessElem.appendChild(desc);

//           var author = document.createElement('span');
//           author.className = "news_author";
//           author.innerHTML = news.articles[i].author;
//           businessElem.appendChild(author);
//       var author = document.createElement('span');
//       author.className = "news_author";
//       author.innerHTML = news.articles[i].author;
//       businessElem.appendChild(author);

//           var publishedAt = document.createElement('span');
//           publishedAt.className = "news_publishedAt";
//           publishedAt.innerHTML = news.articles[i].publishedAt;
//           businessElem.appendChild(publishedAt);
//       }
//       var publishedAt = document.createElement('span');
//       publishedAt.className = "news_publishedAt";
//       publishedAt.innerHTML = news.articles[i].publishedAt;
//       businessElem.appendChild(publishedAt);
//   }


  
// function technologyNews(news) {
//   console.log("technologyNews", news.articles);

//       var technologyElem = document.querySelector("#technology");
//       console.log(technologyElem);
//   var technologyElem = document.querySelector("#technology");
//   console.log(technologyElem);

//   for (var i = 0; i < 5; i++) {

//       var h3 = document.createElement('h3');
//       h3.className = "news_title";
//       h3.innerHTML = news.articles[i].title;
//       technologyElem.appendChild(h3);

//       var img = document.createElement('img');
//       img.setAttribute("src", news.articles[i].urlToImage);
//       img.setAttribute("alt", news.articles[i].title);
//       img.className = "news_img";
//       technologyElem.appendChild(img);

//       var desc = document.createElement('p');
//       desc.className = "news_description";
//       desc.innerHTML = news.articles[i].description;
//       technologyElem.appendChild(desc);

          
//       var author = document.createElement('span');
//       author.className = "news_author";
//       author.innerHTML = news.articles[i].author;
//       technologyElem.appendChild(author);

    
//       var publishedAt = document.createElement('span');
//       publishedAt.className = "news_publishedAt";
//       publishedAt.innerHTML = news.articles[i].publishedAt;
//       technologyElem.appendChild(publishedAt);}}