import './Footer.css'

export default function Footer() {
  return (
    <>
   
<div class=" containerFooter">
    <div class=" rowFooter">
        <div class="textDownload">
            <h3 class="downloadaApp"> Download TARGET App </h3>
            <p> Stay Tuned! </p>
            <div class="footerImg">
                <div class="rowImg">
                    <img src="https://cdn-icons-png.flaticon.com/512/888/888857.png" class="androidImg"/>
                    <div class="downloadOnStore">
                        <p class='downloadOn'>Download on </p>
                        <p class="store"> Google Play Store </p>
                    </div>
                </div>
                <div class="rowImg">
                    <img src="https://cdn-icons-png.flaticon.com/512/888/888841.png" class="androidImg"/>
                    <div class="downloadOnStore">
                        <p class='downloadOn'>Download on </p>
                        <p class="store"> Apple Store </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="copyRights">
            <p class="copyRightText"> &copy; Cobyright, 2024. </p>
            <div class="details">
                <span class="about">About us</span>
                <span class="contact">Contact us</span>
                <span class="privacy">Privacy Policy</span>
            </div>
        </div>
    </div>
</div>
    
    </>
  )
}
