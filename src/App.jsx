import { useCallback, useState, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [length, setlength] = useState(8);
  const [numallowed,setnumallowed] = useState(false);
  const [charallowed,setcharallowed] = useState(false);
  const [password,setpassword] = useState("");  

  const PassWordref = useRef(null)
  const password_Generator = useCallback(()=>{
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    let pass = ""
    if(numallowed){
      str += "0123456789"
    }
    if(charallowed){
      str += "!@#$%^&*()_+-=[]{};':',./<>?"
    }
    for(let i = 1; i<=length;i++){
      let random = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(random);
    }
    setpassword(pass);
  },[setnumallowed,charallowed,length,setpassword])

  const CopyToClipBoard = useCallback(()=>{
    PassWordref.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password]) 

  useEffect(()=>{
    password_Generator()
  },[password_Generator,numallowed,charallowed,length])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-500'>
        <h1 className='text-4xl text-center text-white'>PassWord Generator</h1>
        <div  className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
           type="text"
           value = {password}
          className='outline-none w-full py-1 px-3 my-2'
          placeholder='Password'
          readOnly
          ref = {PassWordref}
          />
          <button onClick={CopyToClipBoard}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className='flex items-center gap-x-3'>
          <input 
          type="range"
          min="8"
          max="100"
          value={length}
          onChange={(e)=>setlength(e.target.value)}
          className='w- h-2 rounded-lg bg-gray-400'
          />
          <label>length({length})</label>

          <input
            type = "checkbox"
            value={numallowed}
            onChange={(e)=>setnumallowed((prev) => !prev)}
            className='w-4 h-4 rounded-lg bg-gray-400'
          />
          <label>Numbers</label>

          <input
            type = "checkbox"
            value={charallowed}
            onChange={(e)=>setcharallowed((prev) => !prev)}
            className='w-4 h-4 rounded-lg bg-gray-400'
          />
          <label>character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
