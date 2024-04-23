import handleFeedback from "./handleFooter.js"
import { $ } from "../../utils/base.js"

const Footer = (element) => {
    const hmtls = `
        <div class="footer-item">
            <h3 class="footer-title">Giới thiệu</h3>
            <p class="footer-content">
                PHOFLIX - Được thực hiện bởi Nhan Quốc Việt, sinh viên đang theo học Công nghệ thông tin tại trường Đại học Sư phạm Kỹ thuật Vĩnh Long. Trang web đem đến trải nghiệm xem phim mượt mà, không quảng cáo làm phiền. Tận hưởng bộ sưu tập phong phú từ mọi thể loại, không giới hạn, không gò bó. Chỉ cần tập trung vào việc thưởng thức và khám phá, PHOFLIX sẽ lo phần còn lại.</p>  
        </div>
        <div class="footer-item">
            <h3 class="footer-title">Liên hệ</h3>
            <div class="footer-contact">
                <div class="contact-item">
                    <a href="tel:0789648381">
                        <i class="fa-light fa-phone-volume"></i>
                        <span class="contact-content">0789648381</span>
                    </a>
                </div>
                <div class="contact-item">
                    <a target="_blank" href="https://www.facebook.com/PHODEV.2004/">
                        <i class="fa-brands fa-square-facebook"></i>
                        <span class="contact-content">Theo dõi tôi qua Facebook</span>
                    </a>
                </div>
                <div class="contact-item">
                    <a target="_blank" href="https://www.instagram.com/phodziet.04/">
                        <i class="fa-brands fa-instagram"></i>
                        <span class="contact-content">Theo dõi tôi qua Instagram</span>
                    </a>
                </div>
                <div class="contact-item">
                    <a target="_blank" href="https://github.com/phohoccode/">
                        <i class="fa-brands fa-square-github"></i>
                        <span class="contact-content">Theo dõi tôi qua Github</span>
                    </a>
                </div>
                <div class="contact-item">
                    <a target="_blank" href="https://www.tiktok.com/@phohoccode.04/">
                        <i class="fa-brands fa-tiktok"></i>
                        <span class="contact-content">Theo dõi tôi qua Tiktok</span>
                    </a>    
                </div> 
            </div>
        </div>
        <div class="footer-item">
            <h3 class="footer-title">Phản hồi</h3>
            <form action="">
                <div class="form-input">
                    <label>
                    <i class="fa-light fa-message-lines"></i>
                        Lời nhắn
                    </label>
                    <textarea placeholder="Hãy phản hồi một cách tích cực nhé!"></textarea>
                </div>
                <button
                    onclick="handleFeedback(event, $('form textarea'))"
                    class="send-mail"
                >
                    Gửi
                </button>
            </form>
        </div>
    `
    element.innerHTML = hmtls
}
export default Footer