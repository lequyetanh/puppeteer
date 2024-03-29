const puppeteer = require("puppeteer");
const download = require("image-downloader");

const bookName = [
    'https://dtruyen.com/nhat-niem-truong-khanh/',
    'https://dtruyen.com/lao-dai-la-nu-lang/',
    'https://dtruyen.com/phien-toai/',
    'https://dtruyen.com/vuong-phi-that-sung-lo-lo-nang-dam/',
    'https://dtruyen.com/thap-nien-60-cuoc-song-tot-dep-sau-khi-trong-sinh/',
    'https://dtruyen.com/danh-mon-ac-nu/',
    'https://dtruyen.com/trung-sinh-nong-phu/',
    'https://dtruyen.com/hoan-phi-thien-ha/',
    'https://dtruyen.com/than-trom-cuong-phi/',
    'https://dtruyen.com/vinh-hoa-phu-quy-phu-thien/',
    'https://dtruyen.com/ga-cho-nhan-vien-cong-vu-thoi-bac-tong/',
    'https://dtruyen.com/lam-dau-nha-giau/',
    'https://dtruyen.com/hoang-dau-chi-dich-nu-muu-cung/',
    'https://dtruyen.com/thien-tai-khi-phi/',
    'https://dtruyen.com/ai-yeu-ai/',
    'https://dtruyen.com/cuoc-song-dien-vien-sau-khi-xuyen-qua/',
    'https://dtruyen.com/co-vo-duoc-mua/',
    'https://dtruyen.com/co-vo-moi-cuoi-cua-luc-thieu/',
    'https://dtruyen.com/vo-yeu-tong-giam-doc-phong-ngua-toi-day/',
    'https://dtruyen.com/lao-ba-nguoi-that-bong/',
    'https://dtruyen.com/cuoc-song-o-bac-tong/',
    'https://dtruyen.com/ki-mi-day-chong-tuong-cong-dung-nhu-vay/',
    'https://dtruyen.com/tam-thap-nhi-thu-ba-muoi-tuoi-lam-thu/',
    'https://dtruyen.com/chien-than-tai-the/',
    'https://dtruyen.com/ninh-than-an-choi-trac-tang-hoang-thuong-khong-the-duoc/',
    'https://dtruyen.com/con-re/',
    'https://dtruyen.com/vuong-gia-ngoc-nghech-treu-choc-vuong-phi-ngay-ngo/',
    'https://dtruyen.com/cuoc-song-kho-khan-cua-thu-nu/',
    'https://dtruyen.com/nhan-vat-phan-dien-tong-dang-hoai-nghi-nhan-sinh/',
    'https://dtruyen.com/trong-sinh-hau-cung-sam-quan-ky/',
    'https://dtruyen.com/cuu-menh-hoang-tu-phi/',
    'https://dtruyen.com/danh-gia-vong-toc/',
    'https://dtruyen.com/hoang-tu-yeu-nghiet-doc-sung-thu-nu-ta-phi/',
    'https://dtruyen.com/am-duyen-ket/',
    'https://dtruyen.com/ma-ngan/',
    'https://dtruyen.com/kiem-dao-doc-than/',
    'https://dtruyen.com/hac-am-than-de/',
    'https://dtruyen.com/bat-hu-kiem-than/',
    'https://dtruyen.com/he-thong-ke-phan-dien/',
    'https://dtruyen.com/the-gioi-hoan-my/',
    'https://dtruyen.com/de-ton/',
    'https://dtruyen.com/ma-thien-ky/',
    'https://dtruyen.com/thieu-nien-ca-hanh/',
    'https://dtruyen.com/chua-te-chi-vuong/',
    'https://dtruyen.com/khi-trung-tinh-ha/',
    'https://dtruyen.com/hoanh-tao-hoang-vu-wt1/',
    'https://dtruyen.com/kiem-dong-cuu-thien/',
    'https://dtruyen.com/long-phu/',
    'https://dtruyen.com/kiem-dao-doc-ton/',
    'https://dtruyen.com/cao-thu-thau-huong/',
    'https://dtruyen.com/vu-luyen-dien-phong/',
    'https://dtruyen.com/dai-phung-da-canh-nhan/',
    'https://dtruyen.com/ngao-the-cuu-trong-thien/',
    'https://dtruyen.com/thien-ton-trung-sinh/',
    'https://dtruyen.com/tam-quoc-dien-nghia/',
    'https://dtruyen.com/tien-ha-phong-bao/',
    'https://dtruyen.com/thong-thien-dai-thanh/',
    'https://dtruyen.com/dan-chi-than-cong/',
    'https://dtruyen.com/tien-nghich/',
    'https://dtruyen.com/toan-chuc-cao-thu/',
    'https://dtruyen.com/nghich-thien-ta-than/',
    'https://dtruyen.com/phuong-truong/',
    'https://dtruyen.com/vo-dich-thien-ha/',
    'https://dtruyen.com/dao-kiem-than-hoang/',
    'https://dtruyen.com/dam-ma/',
    'https://dtruyen.com/tinh-than-bien/',
    'https://dtruyen.com/chien-than-bien/',
    'https://dtruyen.com/cong-pham-tien-co-bon-vuong-an-sach-nang/',
    'https://dtruyen.com/cong-pham-tien-co-bon-vuong-an-sach-nang/',
    'https://dtruyen.com/bat-diet-kiem-the/',
    'https://dtruyen.com/dai-ma-vuong-wt1/',
    'https://dtruyen.com/thien-long-bat-bo-ban-moi/',
    'https://dtruyen.com/he-thong-ke-phan-dien/',
    'https://dtruyen.com/duong-chuyen/',
    'https://dtruyen.com/ban-long/',
    'https://dtruyen.com/giang-son-my-sac/',
    'https://dtruyen.com/cuc-pham-gia-dinh-wt1/',
    'https://dtruyen.com/loc-dinh-ky/',
    'https://dtruyen.com/thu-kiem-truong-an/',
    'https://dtruyen.com/hon-nguyen-vo-ton/',
    'https://dtruyen.com/ngao-thien-cuong-ton/',
    'https://dtruyen.com/ma-dao-le-anh/',
    'https://dtruyen.com/hac-thanh-than-tieu/',
    'https://dtruyen.com/tuyet-the-duong-mon/',
    'https://dtruyen.com/hon-tai-tam-quoc-lam-quan-phiet/',
    'https://dtruyen.com/dai-phung-da-canh-nhan/',
    'https://dtruyen.com/hua-tien-chi/',
    'https://dtruyen.com/than-dieu-dai-hiep/',
    'https://dtruyen.com/ta-thuc-su-khong-phai-la-con-trai-cua-khi-van/',
    'https://dtruyen.com/dai-duong-song-long-truyen/',
    'https://dtruyen.com/y-thien-do-long-ky/',
    'https://dtruyen.com/he-thong-ke-phan-dien/',
    'https://dtruyen.com/truyen-kiem/',
    'https://dtruyen.com/tieu-ngao-giang-ho/',
    'https://dtruyen.com/vo-lam-ngu-ba/',
    'https://dtruyen.com/ba-y-thien-ha/',
    'https://dtruyen.com/dai-phung-da-canh-nhan/',
    'https://dtruyen.com/ta-co-the-lay-ra-thuoc-tinh/',
    'https://dtruyen.com/so-luu-huong/',
    'https://dtruyen.com/quan-mon-wt1/',
    'https://dtruyen.com/con-luan/',
    'https://dtruyen.com/sat-nhan-dien/',
    'https://dtruyen.com/hoan-nghenh-den-voi-tro-choi-ac-mong/',
    'https://dtruyen.com/ket-hon-am-duong-wt3/',
    'https://dtruyen.com/mao-son-troc-quy-nhan/',
    'https://dtruyen.com/chong-yeu-la-quy-wt1/',
    'https://dtruyen.com/nha-bao-tang-tran-yeu/',
    'https://dtruyen.com/ta-khong-phai-la-dai-su-bat-quy/',
    'https://dtruyen.com/livestream-sieu-kinh-di/',
    'https://dtruyen.com/con-ma-bien-thai/',
    'https://dtruyen.com/xong-vao-ngo-am-duong/',
    'https://dtruyen.com/van-phong-tinh-duc-thien-su/',
    'https://dtruyen.com/luc-gia-cung-chieu-bao-boi/',
    'https://dtruyen.com/thien-quan-tu-phuc-quan-troi-ban-phuc/',
    'https://dtruyen.com/dao-mo-but-ky/',
    'https://dtruyen.com/am-hon-luc-nua-dem/',
    'https://dtruyen.com/vo-a-dia-nguc-cho-em/',
    'https://dtruyen.com/co-dau-thu-bay-wt1/',
    'https://dtruyen.com/hoai-thai-mang-xa-thai-ran/',
    'https://dtruyen.com/dai-chu-tien-lai-dich/',
    'https://dtruyen.com/nha-tro-dia-nguc/',
    'https://dtruyen.com/tu-than-go-cua-diem-vuong/',
    'https://dtruyen.com/huong-dan-duong-thai-cua-tien-ton-bach-tho/',
    'https://dtruyen.com/sau-khi-truc-ma-chet-toi-lai-gap-mong-xuan/',
    'https://dtruyen.com/co-dau-bay-tuoi-lam-dau-am-phu/',
    'https://dtruyen.com/chong-toi-la-diem-vuong-wt1/',
    'https://dtruyen.com/le-quy-lai-xin-chut-duong-khi/',
    'https://dtruyen.com/moi-tinh-am-duong-vinh-cuu-chong-ta-la-quy-vuong/',
    'https://dtruyen.com/truyen-ma-nguyen-ngoc-ngan/',
    'https://dtruyen.com/ma-thoi-den/',
    'https://dtruyen.com/truyen-nhan-tru-ma-ban-trai-toi-la-cuong-thi/',
    'https://dtruyen.com/chia-tay-di-em-muon-ve-nha-lam-ruong/',
    'https://dtruyen.com/cuong-manh-minh-phu-dung-lam-bay/',
    'https://dtruyen.com/nha-ho-co-ma/',
    'https://dtruyen.com/thay-phong-thuy/',
    'https://dtruyen.com/nhat-ky-tim-vo-cua-thieu-gia-ma-em-dung-hong-tron/',
    'https://dtruyen.com/quy-thoai-lien-thien/',
    'https://dtruyen.com/vung-dat-vo-hinh/',
    'https://dtruyen.com/xuyen-nhanh-nu-phu-co-mot-doi-hoi-tiec/',
    'https://dtruyen.com/tiem-banh-bao-am-duong/',
    'https://dtruyen.com/nha-bao-tang-tran-yeu/',
    'https://dtruyen.com/hom-nay-toi-lai-bi-ep-song-lai/',
    'https://dtruyen.com/o-trong-game-than-quai-sinh-banh-bao/',
    'https://dtruyen.com/rap-chieu-phim-kinh-di/',
    'https://dtruyen.com/tat-ca-ban-gai-cua-toi-deu-la-le-quy/',
    'https://dtruyen.com/sau-khi-xuyen-ve-moi-ngay-deu-o-tu-la-trang/',
    'https://dtruyen.com/to-dieu-tra-va-nhung-vu-an-bi-hiem/',
    'https://dtruyen.com/dao-mot-hoang-de-lam-vo/',
    'https://dtruyen.com/quy-vuc-phat-song-truc-tiep/',
    'https://dtruyen.com/tan-an-quy-su/',
    'https://dtruyen.com/chong-toi-la-ke-sat-nhan-hang-loat-18/',
    'https://dtruyen.com/chong-toi-la-quy/',
    'https://dtruyen.com/ta-co-the-xoat-thuoc-tinh/',
    'https://dtruyen.com/dai-chu-tien-lai-dich/',
    'https://dtruyen.com/cam-noi-chuyen-phong-nguyet-ga-cho-ac-quy/',
    'https://dtruyen.com/cuoi-chong-ma/',
    'https://dtruyen.com/do-ach/',
    'https://dtruyen.com/tron-thoat-mat-that-vo-han/',
    'https://dtruyen.com/dai-chu-tien-lai-dich/',
    'https://dtruyen.com/tan-nuong-cua-quy/',
    'https://dtruyen.com/tu-mat-the-den-co-dai/',
    'https://dtruyen.com/hoe-an-khach-diem-quai-su-dam/',
    'https://dtruyen.com/nhung-nam-toi-dung-phi-nhan-loai-lam-dien-vien/',
    'https://dtruyen.com/oan-hon-tan-nuong/',
    'https://dtruyen.com/lam-dau-am-phu/',
    'https://dtruyen.com/nguoi-2d-ong-trum-nuoi-ba-nam-chay-roi/',
    'https://dtruyen.com/doat-mong/',
    'https://dtruyen.com/cam-ky-su/',
    'https://dtruyen.com/nha-bao-tang-tran-yeu/',
    'https://dtruyen.com/nguoi-roi-tuong-cong/',
    'https://dtruyen.com/ban-trai-luon-thanh-boss-phim-kinh-di/',
    'https://dtruyen.com/doc-chiem-chi-ay/',
    'https://dtruyen.com/do-co-xuong-nui/',
    'https://dtruyen.com/tieu-my-nhan-toi-tung-choc-gheo-day-thi-thanh-cong-roi/',
    'https://dtruyen.com/nha-bao-tang-tran-yeu/',
    'https://dtruyen.com/quy-con-ngan-toi/',
    'https://dtruyen.com/linh-moi-trinh-tham-xa/',
    'https://dtruyen.com/hai-nguoi-chong-ma-that-kho-chieu/',
    'https://dtruyen.com/hung-trach/',
    'https://dtruyen.com/xa-dai-nhan/',
    'https://dtruyen.com/binh-ta-chi-duc-niem/',
    'https://dtruyen.com/co-dau-cua-diem-vuong/',
    'https://dtruyen.com/bao-dong-phia-truoc-co-nang-luong-cao/',
    'https://dtruyen.com/cuop-di-vi-hon-phu-kiep-truoc-cua-ca-ca/',
    'https://dtruyen.com/dia-nguc-nhan-gian/',
    'https://dtruyen.com/da-dang-sac-tinh/',
    'https://dtruyen.com/ho-so-bi-mat-ve-chu-nghia-duy-vat-khong-khoa-hoc/',
    'https://dtruyen.com/dai-chu-tien-lai-dich/',
    'https://dtruyen.com/lop-hoc-tuyet-vong-1/',
    'https://dtruyen.com/bac-chiendoan-ngon-hem-o-y/',
    'https://dtruyen.com/toi-phong-than-trong-tro-choi-kinh-di/',
    'https://dtruyen.com/yeu-duong-trong-the-gioi-than-quai/',
    'https://dtruyen.com/gia-chet-cung-khong-cuu-noi-the-gioi/',
    'https://dtruyen.com/lop-hoc-kinh-di/',
    'https://dtruyen.com/sau-khi-tot-nghiep-toi-lam-long-vuong/',
    'https://dtruyen.com/sau-khi-co-chung-than-the-voi-ta-than/',
    'https://dtruyen.com/thoat-khoi-con-ac-mong/',
    'https://dtruyen.com/thien-su-khong-xem-boi/',
    'https://dtruyen.com/nam-chu-hom-nay-cung-khong-tra/',
    'https://dtruyen.com/co-mot-ma-quan-rat-cung-chieu-ta/',
    'https://dtruyen.com/co-meo-trong-tay-muon-gi-duoc-nay/',
    'https://dtruyen.com/quai-ban-cua-toi-thanh-tinh-roi/',
    'https://dtruyen.com/quan-an-dem-ky-la/',
    'https://dtruyen.com/quay-le-tan-dia-phu/',
    'https://dtruyen.com/diem-bao-mat-the/',
    'https://dtruyen.com/mat-the-chi-phe-vat/',
    'https://dtruyen.com/phu-the-nha-ngheo/',
    'https://dtruyen.com/di-nang-trong-sinh-thieu-nu-boi-toan-thien-tai/',
    'https://dtruyen.com/tu-tan-the-ta-bat-dau-vo-dich/',
    'https://dtruyen.com/mat-the-chi-on-dao/',
    'https://dtruyen.com/thap-nien-80-con-duong-my-thuc/',
    'https://dtruyen.com/nhi-tu-di-nang-cua-mau-than-hoa-than/',
    'https://dtruyen.com/sieu-cap-than-co-nhan-dich/',
    'https://dtruyen.com/soi-vuong-bat-bai/',
    'https://dtruyen.com/sac-khi-tran-day/',
    'https://dtruyen.com/mat-the-trong-sinh-chi-thieu-chu-hoanh-hanh/',
    'https://dtruyen.com/mat-the-duong-oa-ban-chep-tay/',
    'https://dtruyen.com/dai-lao-chi-muon-nhan-nha/',
    'https://dtruyen.com/mat-the-trong-sinh-chi-vat-hy-sinh-phan-kich/',
    'https://dtruyen.com/trong-sinh-mat-the-nu-vuong-de-thieu-quy-xuong/',
    'https://dtruyen.com/am-hon-luc-nua-dem/',
    'https://dtruyen.com/dat-ten-cho-bong-dem/',
    'https://dtruyen.com/quan-hon-nich-sung/',
    'https://dtruyen.com/truyen-nhan-cua-than-y-than-y-tai-the/',
    'https://dtruyen.com/menh-phu-quy-troi-sinh/',
    'https://dtruyen.com/ngu-thu-nu-vuong/',
    'https://dtruyen.com/cung-ngay-ly-hon-voi-dai-lao-toi-bien-nho-wt2/',
    'https://dtruyen.com/xuyen-den-mat-the-trang-thanh-ngoc-tu/',
    'https://dtruyen.com/toan-cau-luan-hoi-chi-co-ta-biet-cot-truyen/',
    'https://dtruyen.com/con-duong-di-gioi-xinh-dep/',
    'https://dtruyen.com/nha-ho-co-ma/',
    'https://dtruyen.com/ta-than-vo-song/',
    'https://dtruyen.com/ta-co-he-thong-auto-tu-luyen/',
    'https://dtruyen.com/toi-dua-vao-ngheo-kho-quet-ngang-tro-choi-kinh-di/',
    'https://dtruyen.com/chau-gai-cua-sieu-sao/',
    'https://dtruyen.com/mat-the-trung-sinh-ban-gai-hung-tan/',
    'https://dtruyen.com/van-toc-chi-kiep/',
    'https://dtruyen.com/trung-sinh-chi-tac-hanh-thien-ha/',
    'https://dtruyen.com/chi-ton-dong-thuat-su-tuyet-the-dai-tieu-thu/',
    'https://dtruyen.com/dat-ten-cho-bong-dem/',
    'https://dtruyen.com/di-gioi-quan-doi/',
    'https://dtruyen.com/he-thong-game-tai-di-gioi-wt1/',
    'https://dtruyen.com/tu-tan-the-ta-bat-dau-vo-dich/',
    'https://dtruyen.com/tuyet-sac-dan-ton/',
    'https://dtruyen.com/cuoc-song-nao-nhiet-cua-nong-phu-di-nang/',
    'https://dtruyen.com/nuoi-em-thay-ma-ga-ru/',
    'https://dtruyen.com/can-ca-thien-ha/',
    'https://dtruyen.com/ke-thu-ho-vu-tru/',
    'https://dtruyen.com/om-chat-bap-dui-nhan-vat-phan-dien/',
    'https://dtruyen.com/nu-phu-khong-them-de-y-mi-hao-mon-vat-hi-sinh-nu-phu-cung-khong-nghi-de-y-nguoi/',
    'https://dtruyen.com/chap-chuong-than-quyen/',
    'https://dtruyen.com/ai-cho-anh-mang-em/',
    'https://dtruyen.com/nhan-thuat-tra-tron-di-gioi/',
    'https://dtruyen.com/tu-tan-the-ta-bat-dau-vo-dich/',
    'https://dtruyen.com/khi-ma-ca-rong-xuyen-thanh-vat-hy-sinh-phan-dien/',
    'https://dtruyen.com/dat-ten-cho-bong-dem/',
    'https://dtruyen.com/xuyen-viet-chi-boi-thuc-su/',
    'https://dtruyen.com/toi-bo-chay-sau-khi-nguoc-bon-ten-tra-cong/',
    'https://dtruyen.com/lang-thien-chien-than-wt5/',
    'https://dtruyen.com/tron-thoat-mat-that-vo-han/',
    'https://dtruyen.com/tu-mat-the-den-co-dai/',
    'https://dtruyen.com/nguoi-choi-hung-manh/',
    'https://dtruyen.com/quan-bang/',
    'https://dtruyen.com/van-thach-thien-hang/',
    'https://dtruyen.com/tinh-te-toi-cuong-van-chuong-su/',
    'https://dtruyen.com/gamer-xung-ba-di-gioi/',
    'https://dtruyen.com/mat-the-trong-sinh-quan-thieu-sung-trong-long-ban-tay/',
    'https://dtruyen.com/chau-dich-ton/',
    'https://dtruyen.com/di-nang-giao-su/',
    'https://dtruyen.com/ban-hoc-tham/',
    'https://dtruyen.com/ai-thay-con-rong-cua-toi-dau-khong/',
    'https://dtruyen.com/mat-the-trong-sinh-chi-doc-sung/',
    'https://dtruyen.com/mat-the-trung-sinh-thay-doi-thoi-cuoc/',
    'https://dtruyen.com/than-sung-tien-hoa/',
    'https://dtruyen.com/ky-thuat-trach-he-thong/',
    'https://dtruyen.com/ong-chong-bi-benh-nan-y/',
    'https://dtruyen.com/tu-tan-the-ta-bat-dau-vo-dich/',
    'https://dtruyen.com/mat-the-trong-sinh-chi-tieu-nhan-vat/',
    'https://dtruyen.com/moi-ngay-deu-bi-chinh-minh-cay-khoc/',
    'https://dtruyen.com/trong-sinh-thanh-nhan-vat-game-tai-di-gioi/',
    'https://dtruyen.com/nam-chinh-thinh-thang-lai/',
    'https://dtruyen.com/mat-the-trong-sinh-chi-trong-hoach-tan-sinh/',
    'https://dtruyen.com/tiem-hoa-cua-to-anh/',
    'https://dtruyen.com/than-y-khi-nu-quy-de-ngu-thu-cuong-phi/',
    'https://dtruyen.com/xuyen-viet-chi-ngoan-ngoan-tieu-phu-lang/',
    'https://dtruyen.com/lop-hoc-tuyet-vong-1/',
    'https://dtruyen.com/he-thong-huyet-toc/',
    'https://dtruyen.com/sau-khi-co-chung-than-the-voi-ta-than/',
    'https://dtruyen.com/nghich-thien-than-cham-quy-y-doc-vuong-phi/',
    'https://dtruyen.com/dat-ten-cho-bong-dem/',
    'https://dtruyen.com/hoang-long-chan-nhan-di-gioi-du/',
    'https://dtruyen.com/mat-the-chuong-thuong-that-tinh/',
    'https://dtruyen.com/so-uoc-luan-hoi/',
    'https://dtruyen.com/tinh-te-phat-song-truc-tiep-nu-than-dung-an-chi-nam/',
    'https://dtruyen.com/ban-an-nho-phu-khai-phong/',
    'https://dtruyen.com/xuyen-khong-mat-the-sinh-ton/',
    'https://dtruyen.com/quy-phi-dung-thuc-luc-chui-bay-ma-thuong-vi/',
    'https://dtruyen.com/tieu-hong-mao-va-dai-hoi-lang/',
    'https://dtruyen.com/dan-quoc-bat-quy-ky/',
    'https://dtruyen.com/khong-tin-ta/',
    'https://dtruyen.com/sevenknights-he-thong-di-gioi-du/',
    'https://dtruyen.com/khi-toi-co-the-noi-chuyen-voi-meo/',
    'https://dtruyen.com/con-dau-diem-gia/',
    'https://dtruyen.com/di-gioi-duoc-su/',
    'https://dtruyen.com/my-nhan-sao-choi/',
    'https://dtruyen.com/tan-nuong-la-nu-quy/'
]

let d = 3;
// for(let indexBookName = 0; indexBookName< bookName.length; i++){
    (async () => {
        for (let x = 9; x <= 10; x++) {
          const browser = await puppeteer.launch();
          const page = await browser.newPage();
          const url = `https://dtruyen.com/truyen-ma/${x}/`;
          await page.goto(url);
      
          const imgLinks = await page.evaluate(() => {
              let hrefElements = document.querySelectorAll(".main-col > .card-box > .list-stories > ul > li");
              hrefElements = [...hrefElements];
              let imgLinks = hrefElements.map((i) => i.querySelector("a").getAttribute("href"));;
              return imgLinks;
            });
      
        //   console.log(imgLinks); //danh sách url trang 1
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
                        // book['id'] = 3;
                        // book['bookName'] = book_infor.querySelector('.col2 > .title').innerText;
                        // book['bookCover'] = book_infor.querySelector('.col1 > .thumb > img').src;
                        // book['rating'] = book_infor.querySelector('.col2').querySelector('em').querySelector('span').innerText;
                        // book['language'] = "Việt Nam"
                        // book['pageNo'] = Math.floor(Math.random() * 1000) + 500;
                        // book['author'] = book_infor.querySelector('.col1 > .infos').querySelector('span').innerText;
                        // book['genre'] = "Kiếm hiệp"
                        // book['content'] = ""
                        // book['readed'] = Math.floor(Math.random() * 100);
                        // book['description'] = book_infor.querySelector('.col2 > .description').innerText;
                        // book['view'] = book_infor.querySelector('.col1 > .infos').querySelectorAll('p')[3].innerText;
                        // book['date'] = book_infor.querySelector('.col1 > .infos').querySelectorAll('p')[5].innerText;
                        // book['backgroundColor'] = "rgba(247,239,219,0.9) hiệp";
                        // book['navTintColor'] = "#000";
                        // book['chaptertest'] = book_infor.querySelector('#chapters').querySelectorAll('ul > li')[1].innerText;

                        let chapter1 = book_infor.querySelector('#chapters').querySelector('ul').querySelectorAll('li');
                        chapter1 = [...chapter1];
                        let chapter2 = chapter1.map((i) => i.innerText);
                        book['chapter'] = chapter2;


                    } catch (err) {
                      console.log(err)
                    }
                    // allMovie.push(eachMovie);
                    return book;
                  });
                  // count++;
                //   information['id'] = d++;
                  console.log(information['chapter']);
                  console.log(",")
            
                  await newPage.close();
                }
          await browser.close();
        }
      })();
//       break;
// }