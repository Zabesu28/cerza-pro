import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/encyclopedie.css'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Description = () => {
      let location = useLocation();

      const [data, setData] = useState([]);

      const [images, setImages] = useState([]);

      const nbSlide = window.innerWidth < 1200 ? 2 : 3;

      const settings = {
            dots: true,
            autoplay: true,
            infinite: true,
            speed: 500,
            slidesToShow: nbSlide,
            slidesToScroll: 1
      };

      useEffect(() => {
            axios.get("http://localhost:4000/getEspeces/"+location.state).then((response) => {
                  setData(response.data);
            })
            axios.get("http://localhost:4000/getImages/"+location.state).then((response) => {
                  setImages(response.data);
            })
      }, []);

      return (
            <div>
                  <Navbar></Navbar>
                  <Slider {...settings} className='slider'>
                        {images.map((image, index) => (
                              <div key={index}>
                                    <img className="imageSlider" src={image.lienImage} alt={`Slide ${index}`} />
                              </div>
                        ))}
                  </Slider>
                  {data.map((espece) => (
                        <div key={espece.idEspece}>
                              <h1 className='titre'>{espece.libelleEspece}</h1>
                              <p className='texte'>{espece.description}</p>
                              <p className='texte'>Régime alimentaire : {espece.regime}</p>
                              <p className='texte'>Poids : entre {espece.poidsMin} et {espece.poidsMax} kg</p>
                        </div>
                  ))}
            </div>
      );
};

export default Description;