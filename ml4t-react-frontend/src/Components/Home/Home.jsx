import { React, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      navigate('/portfolio');
    }
  }, [navigate]);
  
  return (

<div>
      <h1>Welcome to My Stock Management and Forecast Website Demo!</h1>
      <Button href="/login-signup">Get Started</Button> 
      <h2>About this page</h2>
      <p>
        This project serves as a practical demonstration of web development skills and the integration of various technologies to create a functional and interactive financial application. It is intended for learning and showcasing purposes only, and does not involve any real financial transactions.
      </p>
      <div>
        <h4>Features</h4>
                        <p>Simulated Stock Trading: Buy and sell stocks virtually with real-time stock price.</p>
                        <p>Portfolio Management: Track and manage your investment portfolio.</p>
                        <p>Forecasting Tools: Make informed trading decisions utilizing advanced Mahine Learning.</p>
                        <h4>Technologies</h4>
                        <p>Spring Boot: The back-end services are powered by Spring Boot, providing a robust and scalable framework for building the server-side application. </p>
                        <p>Flask: Flask is used to develop the microservice responsible for stock forecasting. </p>
                        <p>React.js: The front-end of this demo is built using React.js, which provides a fast, dynamic, and interactive user experience. </p>
                        <p>Chart.js: Chart.js is used for creating interactive and visually appealing data visualizations for displaying portfolio performance. </p>
                        <p>Python & Machine Learning: Python is used for implementing the classification-based machine learning strategy for stock forecasting. Libraries such as pandas, numpy, and scipy are utilized to build the models from scratch. The strategy leverages financial indicators like Price/SMA, BBP, and MACD. </p>
                        <p>PostgreSQL: PostgreSQL is used for storing user data, transaction histories, and portfolio information.</p>
                        <p>RESTful APIs: The application uses RESTful APIs to facilitate seamless communication between the front-end and back-end, ensuring smooth data flow and real-time updates.</p>
      </div>
      
    </div>

    
  )
}
