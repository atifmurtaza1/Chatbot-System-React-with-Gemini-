import { useState } from "react"
import { URL } from "./constants"

function App() {
  const[ques,setQues] = useState('')
  const[result,setResult] = useState(undefined)
   const payload = {
     "contents": [{
    "parts": [{
      "text": ques
    }]
  }]
  }
  const handleQues = async ()=> {
    let response = await fetch(URL,{
      method:"POST",
      body: JSON.stringify(payload)

    })
    
    response = await response.json()
    let dataString = response.candidates[0].content.parts[0].text
    dataString = dataString.split("* ")
    // dataString = dataString.map((item)=> item.trim())
    console.log(dataString)
    setResult(response.candidates[0].content.parts[0].text)

    

  }

  return (
    <>
      <div className="grid grid-cols-5 h-screen text-center">
        <div className="col-span-1 bg-zinc-800 " >
          

        </div>
        <div className="col-span-4">
           <div className="h-130 overflow-y-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
            <div className="text-white ">
              {result}
            </div>

          </div>
          <div className="flex bg-zinc-800 text-white w-1/2 m-auto rounded-4xl p-1 h-16 border border-zinc-400">
            <input type="text" value={ques} onChange={(e) => setQues(e.target.value)} className="w-full h-full p-3 outline-none" placeholder="Ask Me Anything" />
            <button onClick={handleQues} className="pr-5">Ask</button>
          </div>


        </div>
      </div>
    </>
  )
}

export default App
