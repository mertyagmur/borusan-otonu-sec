import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';

function App() {
  const [link1, setLink1] = useState('');
  const [link2, setLink2] = useState('');
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);
  const [car1Photo, setCar1Photo] = useState("");
  const [car2Photo, setCar2Photo] = useState("");

  useEffect(() => {
    if (result.photo1) {
      setCar1Photo(result.photo1);
    }

    if (result.photo2) {
      setCar2Photo(result.photo2);
    }
  }, [result]);

  const handleConvert = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/process_data', {
        url1: link1,
        url2: link2
      });

      setResult(response.data.result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="header">
      <h1>Borusan Otonu Seç</h1>
      <h3 className="description"><a href="https://ikinciel.borusanotomotiv.com/">ikinciel.borusanotomotiv.com</a> adresinden seçeceğiniz 2 aracı aşağıdaki alanlara girip "Karşılaştır" butonuna basın.</h3>
      </div>
      <div className="container">
        <div className="inputs-container">
          <label htmlFor="car1_link">Araç 1</label>
          <input type="text" id="car1_link" value={link1} onChange={(e) => setLink1(e.target.value)} />
          <label htmlFor="car2_link">Araç 2</label>
          <input type="text" id="car2_link" value={link2} onChange={(e) => setLink2(e.target.value)} />
          {loading ? (
          <div className="loading-spinner"></div>
        ) : (
          <button onClick={handleConvert}>Compare</button>
        )}
        </div>
      </div>
      
      {result.text && (
        <div className="container-wrapper">
          <div className="photo-container">
            {car1Photo && (
              <div>
                <img src={car1Photo} alt="First Photo" />
              </div>
            )}
            <h1 className="versus">VS</h1>
            {car2Photo && (
              <div>
                <img src={car2Photo} alt="Second Photo" />
              </div>
            )}
          </div>
          <div className="article-container">{ReactHtmlParser(result.text)}</div>
        </div>
      )}
         
        </div>
  )}

export default App;
