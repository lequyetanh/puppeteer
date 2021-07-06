const puppeteer = require('puppeteer');
const download = require('image-downloader');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = "https://dongphym.net/movie/tap-1-dac-cong-hoang-phi-so-kieu-truyen-princess-agents_zA6yXwh0.html";
    await page.goto(url);

    const imgLinks = await page.evaluate(() => {
        let hrefElements = document.querySelectorAll(".movie-eps-wrapper > a");
        hrefElements = [...hrefElements];
        let imgLinks = hrefElements.map((i) => i.getAttribute("href"));
        return imgLinks;
    });
    // for(let index=0; index<imgLinks.length; index++){
    //     imgLinks[index] = "https://dongphym.net" + imgLinks[index];
    // }
    console.log(imgLinks)
    // for (let i = 0; i <= imgLinks.length; i++) {
    for (let i = imgLinks.length -1; i > -1; i--) {
        // var count = 0;
        // (async () => {
        // const browser = await puppeteer.launch();
        const newPage = await browser.newPage();
        await newPage.goto(imgLinks[i]); //vào trang detail

        const information = await newPage.evaluate(() => {
            try {
                eachVideo = {
                    video: '',
                    episode: '',
                    subtitle: ''
                };
                eachVideo['episode'] = document.querySelector(".movie-eps-item.active").innerText;

                // let vice_image = document.querySelector(".send-message > h2").innerText.toLowerCase();
                // if (vice_image.search('vietsub') == -1) {
                //     eachVideo['subtitle'] = 'Thuyết Minh';
                // } else {
                    eachVideo['subtitle'] = 'VIETSUB';
                // }
                eachVideo['video'] = document.querySelectorAll("iframe")[0].src;

            } catch (err) {
                console.log(err)
            }
            return eachVideo;
        });
        // count++;
        console.log(information);
        console.log(",")
    }
    await browser.close();
})();