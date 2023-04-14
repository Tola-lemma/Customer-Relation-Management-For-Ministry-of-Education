import  pageNotFound  from "../../../.././assets/images/pageNotFound.png"
export const PageNotFound = () => {
  return (
    <div className="" style={{width:"100%", height:"100%",margin:"0",position:"absolute",top:"0" ,backgroundColor:"white"}}>
     <img style={{width:"70%" ,height:"600px",marginLeft:"200px" }} src={pageNotFound} alt="page not found"/>
    </div>
  )
}
