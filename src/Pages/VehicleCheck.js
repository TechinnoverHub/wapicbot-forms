import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import Container from '../components/Container';
import logo from '../assets/logo.jpeg';
import loader from '../assets/loader.gif';
import {
  manufacturers as mfc,
  carModels as cmds,
} from '../components/Form/helpers.js';
import { useParams } from 'react-router-dom';
const manufacturers = mfc.map((t) => t.value);
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const VehicleCheck = ({ history }) => {
  const [retrivedValues, setRetrievedValues] = useState({
    manufacturer: null,
    model: null,
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const { type, userId } = useParams();
  const checkImage = async (e) => {
    e.preventDefault();
    setLoading(true);
    let formData = new FormData(e.target);
    try {
      const { data } = await axios.post(
        'http://localhost:4500/api/vision',
        // 'https://wapicbot-api.herokuapp.com/api/vision',
        // 'https://00feae9c9803.ngrok.io/api/vision',
        formData
      );
      setLoading(false);
      console.log(data);
      let model, foundModel, foundManufacturer;
      for (let index = 0; index < data.data.length; index++) {
        const tt = data.data[index].description;
        console.log(tt);
        for (let index = 0; index < manufacturers.length; index++) {
          const ty = manufacturers[index];
          if (tt.toLowerCase().includes(ty.toLowerCase())) {
            model = tt;
            foundManufacturer = ty;
            break;
          }
        }
        if (model) {
          break;
        }
      }
      if (model) {
        const carModels = cmds[foundManufacturer].map((r) => r.value);
        console.log(carModels);
        for (let index = 0; index < carModels.length; index++) {
          const el = carModels[index];
          if (model.toLowerCase().includes(el.toLowerCase())) {
            foundModel = el;
            break;
          }
        }
      }
      console.log(model, foundManufacturer, foundModel);
      setRetrievedValues({
        model: foundModel,
        manufacturer: foundManufacturer,
      });
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
              <div>choose image</div>
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
        {!retrivedValues.manufacturer ? (
          <div className='main' style={{ alignItems: 'center' }}>
            <h1>Select vehicle</h1>
          </div>
        ) : (
          <>
            <div className='main'>
              <div className='oneCard'>
                <h4>Manufacturer</h4>
                <h3>{retrivedValues.manufacturer}</h3>
              </div>
              <div className='oneCard'>
                <h4>Model</h4>
                <h3>{retrivedValues.model}</h3>
              </div>
            </div>
            <div className='main' style={{ alignItems: 'center' }}>
              <Button
                variant='contained'
                color='primary'
                onClick={() => {
                  history.push(`/product/${type}/${userId}`, retrivedValues);
                }}
              >
                Proceed
              </Button>
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default VehicleCheck;
