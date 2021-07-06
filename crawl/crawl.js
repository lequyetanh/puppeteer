const puppeteer = require('puppeteer');
const download = require('image-downloader');

(async() => {
    const browser = await puppeteer.launch();
    console.log('Browser openned');
    const page = await browser.newPage();
    const url = 'https://truyenkinhdien.com/comic/doraemon-truyen-dai-tap-1-tham-cong-vien-khung-long';
    await page.goto(url);
    console.log('Page loaded');

    const imgLinks = await page.evaluate(() => {
        let imgElements = document.querySelectorAll('.sgdg-gallery > .sgdg-grid-a > img');// tất cả các thẻ img
        imgElements = [...imgElements];
        let imgLinks = imgElements.map(i => i.getAttribute('src'));//array string thuộc tính src của thẻ img
        return imgLinks;
    });
    console.log(imgLinks);

    // Tải các ảnh này về thư mục hiện tại
    await Promise.all(imgLinks.map(imgUrl => download.image({
        url: imgUrl,
        dest: __dirname
    })));

    await browser.close();
})();

// ===========================successfully================================