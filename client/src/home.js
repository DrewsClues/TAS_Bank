import React from 'react';
import './App.css';
import { UserContext } from './App';
import { Carousel, Item, Caption } from 'react-bootstrap'

function Home() {
    const ctx = React.useContext(UserContext)
    

    function CarouselForm(){
        return(
            
            <Carousel className="my_carousel">
            <Carousel.Item interval={5000}>
               <img src="bank.png"/> 
              <Carousel.Caption>
                <h1>Welcome to T.A.S. Bank </h1>
                <p>Whatever your plans, we've got you covered!</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={5000}>
               <img src="car.png"/> 
              <Carousel.Caption>
                <h3>Saving up for a sweet new ride?</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={5000}>
                <img src="plane.png"/>
              <Carousel.Caption>
                <h3>Planning for your dream vacation?</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={5000}>
               <img src="house.png"/> 
              <Carousel.Caption>
                <h1>Getting ready to buy your dream home? </h1>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={5000}>
               <img src="university.png"/> 
              <Carousel.Caption>
                <h1>Sending kids off to school?</h1>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={5000}>
                <img src="gold.png"/>
              <Carousel.Caption>
                <h3>Putting away for retirement?</h3>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
            
        )
    }

    return(
        <div>
            <h1 className="Home_Welcome"></h1>
            <div className="Carousel_box">
                <CarouselForm></CarouselForm>
            </div>
        </div>
    )
}

export default Home;