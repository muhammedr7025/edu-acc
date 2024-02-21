
import { Link } from 'react-router-dom'
const Register = () => {
  return (
    <div  className='text-white h-[100vh] flex justify-center items-center bg-cover'
    style={{
      backgroundImage: `url('https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`, 
      backgroundRepeat:'no-repeat',
     
      
    }}>
     <div className='Container'>
      <div>
        <h1 className='text-4xl text-white text-center font-bold mb-8'>Register</h1>
        <form action="POST">
        <div className='relative my-4'>
        <input type="text" placeholder='Name' className='TextField peer'/>
        <label htmlFor="Your Name">Your Name </label>
        </div>
        <div className='relative my-4'>
        <input type="email"  placeholder='email' className='TextField  peer'/>
        
        <label htmlFor="Your Email">Your Email</label>
        </div> 
        <div className='relative my-4'>
        <input type="password"  placeholder='passwod' className='TextField  peer'/>
        
        <label htmlFor="Your Email">Your Password</label>
        </div>
        <div>
          <div className=''>
            <input className='TextField peer' type="checkout" name='' id='' />
            <label htmlFor="">Remembe me</label>
          </div>
          <span>Forgot Passwrod</span>
        </div>
        <button type='submit'>Register</button>
        <div>
          <span>Already Member? <Link to='/login'>Login in </Link></span>
        </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Register
