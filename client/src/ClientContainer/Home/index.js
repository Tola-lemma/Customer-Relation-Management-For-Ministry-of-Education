import { useState } from 'react'
import {useForm} from  'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

import './index.css'

function Dashboard() {
    const [name, setName]=useState("");
    const [phone, setPhone]=useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");

    const schema=yup.object().shape({
      fullName:yup.string().required("Enter your Full Name"),
      phone:yup.number().positive().integer().required("Enter your phone number"),
      email:yup.string().email().required("Write working email"),
      password:yup.string().min(4).max(40).required("Your password must be 4 character")
    })
    const {register, handleSubmit, formState:{errors}} = useForm({
      resolver:yupResolver(schema),
    });
    

    return (
        
          <div className="signup_container w-100 d-flex justify-content-center ">
            
            <div className='signup-form mt-5 w-50'>
              <h1>Ask New Question</h1>
             <strong>Please fill in this form to create an account.</strong>
              <div className="form mt-3">   
                <hr/>
                <form className='border p-3 ' onSubmit={handleSubmit((data)=>console.log(data))}>
                <label for="fname">Full Name
                <input  className="form-control" type="text" id="fname" placeholder="Your name.."
                   {...register('fullName')} value={name} onChange={(e)=>setName(e.target.value)} />
                   <p>{errors.fullName?.message}</p>
                </label>
                
            
             
                <label for="phone-number">Phone Number
                <input className="form-control" type="tel" id="phone-number" placeholder="Your phone number.."
                   {...register('phone')} value={phone}
                   onChange={(e)=>setPhone(e.target.value)}/>
                   <p>{errors.phone?.message}</p>
                  </label>

                 <label for="email">Email
                 <input className="form-control" type="email" id="email"  placeholder="Your Email.."
                   {...register('email')} value={email} onChange={(e)=>setEmail(e.target.value)}/>
                   <p>{errors.email?.message}</p>
                  </label>
            
                  <label for="password">Password
                  <input className="form-control" type="password"  id="password"  placeholder="Your Password.."
                  {...register('password')} value={password} onChange={(e)=>setPassword(e.target.value)} />
                   <p>{errors.password?.message}</p>
                   </label>
                  <hr/>
                  <h1 className="jumbotron">Help Topic</h1>

            <div className='col-md-8'>
            <label for="help-page" className='form-label'>Select Help Topic</label>
            <select id="help-page" name="help-page" className='form-select'>
                <option value="scholarship">Select your help topic</option>
                <option value="scholarship">Student transfer request</option>
                <option value="abroadd">Teacher transfer request</option>
                <option value="studentandteacher">Scholarship Question</option>
                <option value="studentandteacher">Request to return to work after studing abroad</option>
                <option value="studentandteacher">Varios acadamic and adiminstrative complaints</option>
             </select>
            </div>
             <label for="email">Summery
              <input className="form-control" type="text" id="summary" placeholder="Write your summerised idea here.."
              value={email} onChange={(e)=>setEmail(e.target.value)} />
            </label>
             <div className="mb-3 mt-3">
                <label for="comment">Comments:</label>
                <textarea className="form-control" rows="5" id="comment" name="text"></textarea>
            </div>
            <div>
              <label for="formFileLg" class="form-label">Upload your file</label>
              <input class="form-control form-control-lg" id="formFileLg" type="file"  />
               </div>
               <div className="clearfix mt-3 ">
               <button type="submit" className="btn btn-success signupbtn">Create Ticket</button>
               <button type="reset" className=" btn btn-success resetbtn">Reset</button>
               <button type="cancel" className=" btn btn-success cancelbtn">Reset</button>

             </div>
            </form>
              </div>
            </div>

        </div>
    )
    
}

export default Dashboard