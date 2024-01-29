import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';


function App() {

    const [advice, setAdvice] = useState();

    useEffect(() => {
      fetchAdvice()
    }, [])


    const fetchAdvice = () => {
        axios.get('https://api.adviceslip.com/advice')
        .then((res) => {
            setAdvice(res.data.slip.advice)
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
    const translate = async () => {
        if (advice.includes('a') || advice.includes('e') || advice.includes('u')) {
        const options = {
            method: 'POST',
            url: 'https://rapid-translate-multi-traduction.p.rapidapi.com/t',
            headers: {
              'content-type': 'application/json',
              'X-RapidAPI-Key': 'dbc9a9236bmsh739de702e5fe09ep1e57eejsn90ea05c93668',
              'X-RapidAPI-Host': 'rapid-translate-multi-traduction.p.rapidapi.com'
            },
            data: {
              from: 'en',
              to: 'ar',
              q: advice
            }
          };
          
          try {
              const response = await axios.request(options);
                setAdvice(response.data[0])
            } catch (error) {
                console.error(error);
            }
        }
    }





  return (
    <div className="App">
        <div className='container con'>
            <div className="card">
            <h2 className='title'>Quote of the day</h2>
                <h1 className="heading">{advice}</h1>
                <p className='translate' onClick={translate}>Translate</p>
            </div>
        </div>
        <p className='copyright'>Created by <a href='https://facebook.com/YasSer.0726' rel='noreferrer' target='_blank' >YasSer</a></p>
    </div>
  );
}

export default App;
