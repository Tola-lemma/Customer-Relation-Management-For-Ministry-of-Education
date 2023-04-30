
import './footer.css'


function Footer(){
  return(
    <footer>
      <div className="container mt-5">
      <div className="row">
        
        <div className='col order-first col-lg-4   foot'>
          <a href="/" className="d-flex align-items-center p-0 ">
            <img alt='logo' src='https://moe.gov.et/fotlogo.png' style={{width:"100px" }}/>
          </a>
    
         <p className="mt-4">FDRE Ministry of Education is a governmental organization 
          headquartered in Addis Ababa, Arada sub-city.</p>

        </div>
        <div className='col  main'>
          <ul className='foot'>
            <strong>Contact Us</strong>
            <li><i class="fa-solid fa-location-dot"></i><a href="/" className="">  Arada Sub-City, Addis Ababa</a> </li>
            <li><i class="fa-solid fa-phone"></i><a href="/" className="">  Phone: +251-11-155-3133</a> </li>
            <li><i class="fa-solid fa-envelope"></i> <a href="/" className="">  Email: info@moe.gov.et</a></li>
            <li><i class="fa-brands fa-facebook"></i> <a href="/" className="">  Facebook</a></li>
            <li><i class="fa-brands fa-telegram"></i> <a href="/" className=""> Telegram</a></li>
          </ul>

        </div>
        <div className='col order-last  main'>
        <ul className='foot'>
          <strong>Menu</strong>
            <li><i class="fa-solid fa-house"></i><a href="/" className="">  Home</a></li>
            <li><i class="fa-solid fa-earth-americas"></i><a href="/" className="">  News</a> </li>
            <li><i class="fa-solid fa-signal"></i> <a href="/" className="">  Statistics</a> </li>
            <li><i class="fa-solid fa-message"></i><a href="/" className="">  Contact Us</a> </li>
            <li><i class="fa-solid fa-p"></i> <a href="/" className="">  Publication</a></li>
          </ul>

        </div>
      </div>
      <div className="text-center  sol">
       <a href="/" className="d-flex align-items-center p-0 center font">
        <ul className="d-flex ">
        <li><i class="fa-brands fa-facebook "></i></li>
        <li><i class="fa-brands fa-twitter "></i> </li>
        <li><i class="fa-brands fa-youtube"></i></li>
        <li> <i class="fa-brands fa-instagram"></i></li>

        </ul>
          </a>
      </div>
      <hr/>
      <div className="text-center mt-2 bg">
        <h4>&copy; Ministry of Education, {new Date().getFullYear()}</h4>
      </div>
    </div>
    </footer>
  )
}

export default Footer;