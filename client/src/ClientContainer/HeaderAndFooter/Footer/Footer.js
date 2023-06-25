
import './footer.css'

export const  Footer=()=>{
  return(
    <footer style={{color:"white", marginTop:"30px"}}>
      <div className="container mt-2">
      <div className="row">
        <div className='col-lg-4 order-first justify-content-center  foot'>
        <ul className='foot'>
            <strong>Contact Us</strong>
            <li><i className="fa-solid fa-location-dot"></i> Arada Sub-City, Addis Ababa</li>
            <li><i className="fa-solid fa-phone"></i> Phone: +251-11-155-3133 </li>
            <li><i className="fa-solid fa-envelope"></i>   Email: info@moe.gov.et</li>
            <li><i className="fa-brands fa-facebook"></i> <a href="https://www.facebook.com/fdremoe/" className="">  Facebook</a></li> 
          </ul>
        </div>
        <div className='col-lg-4 order-center foot'>
        <ul className="d-flex foot mx-5 scl-mda ">
             <li ><a href='https://twitter.com/fdremoe' target='_blank' rel='noreferrer'><i className="fa-brands fa-twitter " ></i> </a></li>
             <li><a href='https://www.youtube.com/channel/UChrmtas-4cE6LdG1fGl91Cw' target='_blank' rel="noreferrer"><i className="fa-brands fa-youtube"></i></a></li>
             <li> <a href='https://www.linkedin.com/company/ministry-of-education-ethiopia' target='_blank' rel="noreferrer"><i className="fa-brands fa-linkedin"></i></a></li>
            </ul> 
        </div>

        <div className='col-lg-4 order-last'>
        <ul className='foot mx-5'>
          <strong>Menu</strong>
            <li><i className="fa-solid fa-house"></i><a href="/" className="">  Home</a></li>
            <li><i className="fa-solid fa-earth-americas"></i><a href="https://moe.gov.et/News" className="">  News</a> </li>
            <li><i className="fa-solid fa-signal"></i> <a href="/" className="" >  Statistics</a> </li>
              <li><i className="fa-solid fa-message"></i><a href="/contactUs" className=""> 
             Contact Us</a> </li>
            {/* <li><i className="fa-solid fa-p"></i> <a href="/" className="">  Publication</a></li> */}
            
          </ul>
        </div>
      </div>
      <hr/>
      <div className="text-center  ">
        <h6>&copy; Ministry of Education, {new Date().getFullYear()}</h6>
      </div>
    </div>
    </footer>

    
  )
  }