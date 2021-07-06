const puppeteer = require("puppeteer");
const download = require("image-downloader");



let d = 2085;
(async () => {
  for (let x = 160; x <= 165; x++) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = `https://bilutvzz.net/phim-le//trang-${x}`;
    await page.goto(url);

    const imgLinks = await page.evaluate(() => {
      let hrefElements = document.querySelectorAll(".list-film > li");
      hrefElements = [...hrefElements];
      let imgLinks = hrefElements.map((i) => i.querySelector("a").getAttribute("href"));;
      return imgLinks;
    });

    // console.log(imgLinks); //danh sách url trang 1
    var allAllMovie = [];
    // for (let i = 0; i <= imgLinks.length; i++) {
    for (let i = 0; i <= 35; i++) {
      // var count = 0;
      // (async () => {
      // const browser = await puppeteer.launch();
      const newPage = await browser.newPage();
      await newPage.goto(imgLinks[i]); //vào trang detail

      const information = await newPage.evaluate(() => {
        var allMovie = [];
        var eachMovie = {

        };
        let detail_Movie = document.querySelectorAll('.film-info')[0];
        // let info = document.querySelectorAll('.info-y > li');
        try {
          eachMovie['id'] = i;
          eachMovie['name'] = detail_Movie.querySelector('.film-info-right > .name').innerText;
          eachMovie['category'] = "phim lẻ";
          eachMovie['rate'] = parseFloat(detail_Movie.querySelector('.average').innerText, 10);
          eachMovie['name_image'] = detail_Movie.querySelector('.poster-img > img').src;
          eachMovie['vice_name_image'] = detail_Movie.querySelector('.dynamic-page-header').getAttribute("style");


          let vice_image = detail_Movie.querySelector('.dynamic-page-header').getAttribute("style");
          let tmp_vice_image = vice_image.split('');
          let newArrayViceImage = '';
          var head, tail;
          for (var a5 = 0; a5 < tmp_vice_image.length; a5++) {
            // console.log(s.charCodeAt(i));
            if (vice_image.charCodeAt(a5) == 40) {
              head = a5;
            }
            if (vice_image.charCodeAt(a5) == 41) {
              tail = a5;
            }
          }
          for (var a5 = 0; a5 < tmp_vice_image.length; a5++) {
            // console.log(s.charCodeAt(i));
            if (a5 > head && a5 < tail) {
              newArrayViceImage = newArrayViceImage.concat(vice_image.charAt(a5));
            }
          }
          eachMovie['vice_name_image'] = newArrayViceImage;




          eachMovie['real_name'] = detail_Movie.querySelector('.film-info-right > .real-name').innerText;

          eachMovie['content'] = document.querySelector('.content-h').innerText;

          let eachcontainer = document.querySelectorAll('.info-y > li');
          itemcontainer = [...eachcontainer];




          itemcontainer.map((i) => {
            if (i.querySelector('label').innerText == "Đang phát:") {

              if (i.querySelector('strong').innerText) {
                eachMovie['status'] = i.querySelector('strong').innerText
              } else {
                eachMovie['status'] = "N/A";
              }
            }


            if (i.querySelector('label').innerText == "Điểm IMDb:") {
              eachMovie['IMDb'] = parseFloat(i.querySelector('span').innerText, 10);

              let imdb = i.innerText;
              let tmp_imdb = imdb.split('');
              let newArrayImdb = "";
              for (var a4 = 0; a4 < tmp_imdb.length; a4++) {
                if (imdb.charCodeAt(a4) >= 48 && imdb.charCodeAt(a4) <= 57) {
                  newArrayImdb = newArrayImdb.concat(imdb.charAt(a4));
                }
              }
              eachMovie['IMDb_vote'] = parseFloat(newArrayImdb, 10);

            } else {
              eachMovie['IMDb'] = null;
              eachMovie['IMDb_vote'] = null;
            }


            if (i.querySelector('label').innerText == "Đạo diễn:") {
              if (i.querySelector('a')) {
                eachMovie['director'] = i.querySelector('a').innerText;
              } else {
                eachMovie['director'] = "N/A";
              }

            }
            if (i.querySelector('label').innerText == "Diễn viên:") {
              let eachActor = i.querySelectorAll('a');

              if (i.querySelectorAll('a')) {
                itemActor = [...eachActor];
                let arrayActor = itemActor.map((i) => i.innerText);
                eachMovie['actor'] = arrayActor;
              } else {
                eachMovie['actor'] = ["N/A"];
              }

            }
            if (i.querySelector('label').innerText == "Thể loại:") {
              let eachGenre = i.querySelectorAll('a');
              itemGenre = [...eachGenre];
              let arrayGenre = itemGenre.map((i) => i.innerText);
              eachMovie['genre'] = arrayGenre;
            }
            if (i.querySelector('label').innerText == "Quốc gia:") {
              let eachCountry = i.querySelectorAll('a');
              itemCountry = [...eachCountry];
              let arrayCountry = itemCountry.map((i) => i.innerText);
              eachMovie['country'] = arrayCountry;
            }
            if (i.querySelector('label').innerText == "Thời lượng:") {


              if (i.querySelector('span').innerText) {
                let run_time = i.querySelector('span').innerText;
                let tmp_run_time = run_time.split('');
                let newArrayRunTime = "";
                for (var a3 = 0; a3 < tmp_run_time.length; a3++) {
                  // console.log(s.charCodeAt(i));
                  if (run_time.charCodeAt(a3) >= 48 && run_time.charCodeAt(a3) <= 57) {
                    newArrayRunTime = newArrayRunTime.concat(run_time.charAt(a3));
                  }
                }
                eachMovie['run_time'] = parseFloat(newArrayRunTime, 10);
              } else {
                eachMovie['run_time'] = "N/A";
              }
            }

            if (i.querySelector('label').innerText == "Lượt xem:") {
              let views = i.querySelector('span').innerText;
              let tmp_views = views.split('');
              let newArrayViews = "";
              for (var a2 = 0; a2 < tmp_views.length; a2++) {
                // console.log(s.charCodeAt(i));
                if (views.charCodeAt(a2) >= 48 && views.charCodeAt(a2) <= 57) {
                  newArrayViews = newArrayViews.concat(views.charAt(a2));
                }
              }
              eachMovie['views'] = parseFloat(newArrayViews, 10);
            }
            if (i.querySelector('label').innerText == "Năm xuất bản:") {
              eachMovie['release_year'] = parseFloat(i.querySelector('a').innerText, 10)
            }
          });

          let tag = document.querySelector('.tags');
          let eachtag = tag.querySelectorAll('a');
          itemtag = [...eachtag];
          let arraytag = itemtag.map((i) => i.innerText);
          eachMovie['tags'] = arraytag;

          let tags_vote = document.querySelector('.rate_count').innerText;
          if (tags_vote) {
            let tmp_tags_vote = tags_vote.split('');
            let newArray = "";
            for (var a1 = 0; a1 < tmp_tags_vote.length; a1++) {
              // console.log(s.charCodeAt(i));
              if (tags_vote.charCodeAt(a1) >= 48 && tags_vote.charCodeAt(a1) <= 57) {
                newArray = newArray.concat(tags_vote.charAt(a1));
              }
            }
            if (newArray[0] == undefined) {
              newArray = 0;
            } else {
              eachMovie['rate_vote'] = parseFloat(newArray, 10);
            }
          } else {
            eachMovie['rate_vote'] = 0;
          }



          eachMovie['hrefLink'] = detail_Movie.querySelector('.btn-danger').getAttribute("href");
          eachMovie['trailer'] = document.querySelector('iframe').src;
          eachMovie['movie'] = [{
            video: '',
            episode: '1',
            subtitle: 'VIETSUB'
          }];






          // ++id;
        } catch (err) {
          console.log(err)
        }
        // allMovie.push(eachMovie);
        return eachMovie;
      });
      // count++;
      information['id'] = --d;
      console.log(information);
      console.log(",")

      await newPage.close();


      // ==============================================================================



      // const newBrowser = await puppeteer.launch();
      // const new2Page = await newBrowser.newPage();
      // const newUrl = information['hrefLink'];
      // await new2Page.goto(newUrl);
      // // console.log(newUrl);

      // var linkMovie = await new2Page.evaluate(() => {
      //   let arrayUrlMovie = [];
      //   var urlMovie = {};
      //   urlMovie['video'] = document.querySelector('.jw-media > video').src;
      //   urlMovie['episode'] = 1;
      //   arrayUrlMovie.push(urlMovie);
      //   return arrayUrlMovie;
      // });
      // // console.log(linkMovie);
      // information['movie'] = linkMovie;
      // information['id'] = ++d;
      // console.log(information);
      // // console.log(information['movie']);
      // // }   
      // await newBrowser.close();

      // allAllMovie.push(information);
      // console.log("hello mother fucker: "+i);







      // var downloadImage = [];
      // downloadImage.push(information['name_image']);
      // downloadImage.push(information['vice_name_image']);
      // await Promise.all(downloadImage.map(imgUrl => download.image({
      //   url: imgUrl,
      //   dest: __dirname
      // })));








      // console.log(allAllMovie[0]['movie']);
      // ==============================================================================

      // console.log(information);

      // break;
      // console.log(count);
      // })();
    }
    await browser.close();
  }
})();