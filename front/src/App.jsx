import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="bg-black min-h-screen m-0 p-0 flex items-center flex-col pt-10">
      <h1 className="text-green text-3xl font-bold ">
      Spotidata
    </h1>
    </div>
  )
}


export default App
