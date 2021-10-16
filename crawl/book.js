const puppeteer = require("puppeteer");
const download = require("image-downloader");



let d = 631;
(async () => {
  for (let x = 1; x <= 3; x++) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = `https://dtruyen.com/khoa-hoc/2/`;
    await page.goto(url);

    const imgLinks = await page.evaluate(() => {
      let hrefElements = document.querySelectorAll(".main-col > .card-box > .list-stories > ul > li");
      hrefElements = [...hrefElements];
      let imgLinks = hrefElements.map((i) => i.querySelector("a").getAttribute("href"));;
      return imgLinks;
    });

    // console.log(imgLinks); //danh sách url trang 1
    var allAllMovie = [];
    // for (let i = 0; i <= imgLinks.length; i++) {
    for (let i = 0; i <= imgLinks.length; i++) {
      // var count = 0;
      // (async () => {
      // const browser = await puppeteer.launch();
      const newPage = await browser.newPage();
      await newPage.goto(imgLinks[i]); //vào trang detail

      const information = await newPage.evaluate(() => {
        var allMovie = [];
        let book = {};
        let book_infor = document.querySelectorAll('.main-col')[0];
        // let info = document.querySelectorAll('.info-y > li');
        try{
            book['id'] = 3;
            book['bookName'] = book_infor.querySelector('.col2 > .title').innerText;
            book['bookCover'] = book_infor.querySelector('.col1 > .thumb > img').src;
            book['rating'] = book_infor.querySelector('.col2').querySelector('em').querySelector('span').innerText;
            book['language'] = "Việt Nam"
            book['pageNo'] = Math.floor(Math.random() * 1000) + 500;
            book['author'] = book_infor.querySelector('.col1 > .infos').querySelector('span').innerText;
            book['genre'] = "Kiếm hiệp"
            book['content'] = ""
            book['readed'] = Math.floor(Math.random() * 100);
            book['description'] = book_infor.querySelector('.col2 > .description').innerText;
            book['view'] = book_infor.querySelector('.col1 > .infos').querySelectorAll('p')[3].innerText;
            book['date'] = book_infor.querySelector('.col1 > .infos').querySelectorAll('p')[5].innerText;
            book['backgroundColor'] = "rgba(247,239,219,0.9) hiệp"
            book['navTintColor'] = "#000"
        } catch (err) {
          console.log(err)
        }
        // allMovie.push(eachMovie);
        return book;
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