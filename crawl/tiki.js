const puppeteer = require("puppeteer");
const download = require("image-downloader");

let d = 2456;
(async () => {
  for (let x = 5; x <= 5; x++) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = `https://tiki.vn/the-thao/c1975?page=${x}`;
    await page.goto(url);

    const imgLinks = await page.evaluate(() => {
      let hrefElements = document.querySelectorAll(".product-item");
      hrefElements = [...hrefElements];
      let imgLinks = hrefElements.map((i) => i.getAttribute("href"));
      for (let i = 0; i < imgLinks.length; i++) {
        imgLinks[i] = "https://tiki.vn" + imgLinks[i]
      }
      return imgLinks;
    });

    // console.log(imgLinks); //danh sách url trang 1

    for (let i = 0; i <= imgLinks.length; i++) {
      // var count = 0;
      // (async () => {
      // const browser = await puppeteer.launch();
      const newPage = await browser.newPage();
      await newPage.goto(imgLinks[i]); //vào trang detail

      const information = await newPage.evaluate(() => {
        var Thong_tin_san_pham = {

        };
        let san_pham = document.querySelectorAll('main')[0];
        // let info = document.querySelectorAll('.info-y > li');
        try {
          // Thong_tin_san_pham['id'] = d++;
          Thong_tin_san_pham['name'] = san_pham.querySelector('.header > h1').innerText;
          Thong_tin_san_pham['type'] = "Thể Thao - Dã Ngoại";
          Thong_tin_san_pham['status'] = "Còn Hàng";

          // Thong_tin_san_pham['image'] = san_pham.querySelectorAll('.pdp_main_view_photo');

          let eachtag = san_pham.querySelectorAll('.PictureV2__StyledWrapImage-tfuu67-0 > img');
          itemtag = [...eachtag];
          let arraytag = itemtag.map((i) => i.src);
          Thong_tin_san_pham['image'] = arraytag;


          Thong_tin_san_pham['quatity'] = Math.floor(Math.random() * (100 - 20 + 1)) + 20;
          Thong_tin_san_pham['rate'] = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
          Thong_tin_san_pham['rate_vote'] = Math.floor(Math.random() * (10000 - 200 + 1)) + 200;
          Thong_tin_san_pham['content'] = san_pham.querySelector('.ToggleContent__View-sc-1hm81e2-0').innerText;
          Thong_tin_san_pham['new_price'] = (Math.floor(Math.random() * (500 - 400 + 1)) + 400) * 1000;
          Thong_tin_san_pham['old_price'] = (Math.floor(Math.random() * (390 - 200 + 1)) + 200) * 1000;

          Thong_tin_san_pham['information'] = san_pham.querySelector('table').innerText;

        } catch (err) {
          console.log(err)
        }
        // allMovie.push(Thong_tin_san_pham);
        return Thong_tin_san_pham;
      });
      // count++;
      information['id'] = d++;
      console.log(information);
      console.log(",")

      await newPage.close();
    }

    await browser.close();
  }
})();