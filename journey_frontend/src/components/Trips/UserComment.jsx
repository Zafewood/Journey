import React from 'react'
import defaultUser from '../../assets/default_user.jpeg'
import '../../styles/Trips/UserComment.css'

function UserComment({comment}) {
  return (
    <div className='comment-content'>
        <div className='comment-left'>
            <img src={defaultUser} alt="" className='default-user-img'/>
        </div>
        <div className='comment-right'>
            <h3>Name</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Neque deserunt delectus placeat quo non veritatis accusamus 
                tempore distinctio nostrum odio molestiae, voluptatum commodi? 
                Labore dolores est beatae aliquam velit vitae?
            </p>
        </div>
    </div>
  )
}

export default UserComment