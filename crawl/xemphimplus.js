const puppeteer = require("puppeteer");
const download = require("image-downloader");
for (let x = 1; x <= 1; x++) {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = `https://movie.xemphim.one/?page=${x}`;
    await page.goto(url);

    const imgLinks = await page.evaluate(() => {
      let hrefElements = document.querySelectorAll(".is-one-fifth-fullhd > a");
      hrefElements = [...hrefElements];
      let imgLinks = hrefElements.map((i) => i.getAttribute("href"));
      for (let i = 0; i < imgLinks.length; i++) {
        imgLinks[i] = "https://movie.xemphim.one" + imgLinks[i];
      }
      return imgLinks;
    });

    for (let i = 0; i <= imgLinks.length; i++) {
      // var count = 0;
      // (async () => {
      // const browser = await puppeteer.launch();
      const newPage = await browser.newPage();
      await newPage.goto(imgLinks[i]);

      const information = await newPage.evaluate(() => {
        let allMovie = [];
        let eachMovie = {

        };
        let detail_Movie = document.querySelectorAll('.tt-details')[0];
        try {
          eachMovie['main_photo'] = detail_Movie.querySelector('.has-text-centered > img').src;
          eachMovie['ten_tieng_anh'] = detail_Movie.querySelector('.main > .title').innerText;
          eachMovie['ten_tieng_viet'] = detail_Movie.querySelector('.main .subtitle').innerText;
          eachMovie['thoi_gian'] = detail_Movie.querySelector('.meta span').innerText;
          eachMovie['dao_dien'] = detail_Movie.querySelector('.csv').innerText;
          eachMovie['content'] = detail_Movie.querySelector('.intro ').innerText;
          eachMovie['country'] = document.querySelectorAll('.csv a').innerText;
        } catch (err) {
          console.log(err)
        }
        allMovie.push(eachMovie);
        return eachMovie;
      });
      // count++;
      console.log(x + ": " + i);
      // break;
      // console.log(count);
      // })();
    }
    await browser.close();
  })();
}


// ===========================successfully================================