import React from 'react'

const Button = ({setReqType}) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
        <button 
          type='button'
          onClick={() => setReqType('users')} 
        > 
          Users
        </button>
        <button 
          type='button'
          onClick={() => setReqType('posts')} 
        >
          Posts
        </button>
        <button 
          type='button'
          onClick={() => setReqType('comments')} 
        > 
          Comments
        </button>
    </form>
  )
} 

export default Button;