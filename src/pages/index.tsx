import Image from 'next/image'
import ReactDOM from "react-dom/client";
import { Inter } from 'next/font/google'
import { useState } from 'react'
import { generateCode } from '@/ts/helpers/codeGenerator'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [url, setUrl] = useState("");

  let handleSubmit = async (e:React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    
    try {
      const code = generateCode()
      let res = await fetch("http://127.0.0.1:8000/shorten_url", {
        method: "Post",
        body: JSON.stringify({
          code: code,
          path: url
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (res.status === 200) {
        let shorten_url = `http://127.0.0.1:8000/${code}`;
        const modal = await ReactDOM.createRoot(document.getElementById("_form") as HTMLElement)
        await modal.render(
          <div className='container'>
            <a href={shorten_url}><h2 className='success-message'>shrtur.ly/{code}</h2></a>
          </div>
        );

      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <div>
        <h2 className="header"><b>/Shrturly</b></h2>
      </div>
      <div className="container" id='_form'>
        <form onSubmit={handleSubmit}>
          <input className="input" type="text" id="url" name="url" value={url} placeholder="Enter a URL to shorten"  onChange={(e) => setUrl(e.target.value)}/>
          <div className="action">
            <button className="button" type="submit" value="Submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}
