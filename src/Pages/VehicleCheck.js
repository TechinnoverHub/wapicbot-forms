import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import Container from '../components/Container';
import logo from '../assets/logo.jpeg';
import loader from '../assets/loader.gif';

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const VehicleCheck = () => {
  const [annotation, setAnnotation] = useState([]);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkImage = async (e) => {
    e.preventDefault();
    setLoading(true);
    let formData = new FormData(e.target);
    try {
      const { data } = await axios.post(
        'https://wapicbot-api.herokuapp.com/api/vision',
        formData
      );
      setLoading(false);
      console.log(data);
      setAnnotation(data.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Container>
      <form
        className='vehicle-form'
        encType='multipart/form-data'
        onSubmit={checkImage}
      >
        <img src={logo} alt='logo' />
        <div className='group2'>
          <h1>Check vehicle</h1>
        </div>
        <div className='selector'>
          <input
            id='file'
            name='file'
            type='file'
            onChange={async (e) => {
              if (e.target.value) {
                const base64 = await toBase64(e.target.files[0]);
                setPreview(base64);
              } else {
                setPreview(null);
              }
            }}
          />
          <label htmlFor='file'>
            {preview ? (
              <img alt='preview' className='preview' src={preview} />
            ) : (
              'choose image'
            )}
          </label>
        </div>
        {loading ? (
          <img src={loader} alt='loader' />
        ) : (
          <Button variant='contained' color='primary' type='submit'>
            check
          </Button>
        )}
      </form>
      <div>
        {!annotation.length ? (
          <div className='main' style={{ alignItems: 'center' }}>
            <h1>Select vehicle</h1>
          </div>
        ) : (
          <div className='main'>
            {annotation.map((ann, i) => (
              <div key={i} className='oneCard'>
                <h3>{ann.description}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default VehicleCheck;
