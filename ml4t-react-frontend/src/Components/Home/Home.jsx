import { React, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

import "./Home.css";

export const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      navigate("/portfolio");
    }
  }, [navigate]);

  return (
    <div>
      <header className="bg-primary bg-gradient text-white">
        <div class="container px-4 text-center">
          <h1 className="fw-bolder">
            Welcome to My Stock Management and Forecast Website Demo!
          </h1>
          <a className="btn btn-lg btn-light" href="/login-signup">
            Get Started
          </a>
        </div>
      </header>
      <section>
        <div className="container px-4">
          <div className="row gx-4 justify-content-center">
            <div className="col-lg-8">
              <h2>About this page</h2>
              <p className="lead">
                This project serves as a practical demonstration of web
                development skills and the integration of various technologies
                to create a functional and interactive financial application. It
                is intended for learning and showcasing purposes only, and does
                not involve any real financial transactions.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-light">
        <div className="container px-4">
          <div className="row gx-4 justify-content-center">
            <div className="col-lg-8">
              <h2>Features</h2>
              <ul>
                <li>
                  Simulated Stock Trading: Buy and sell stocks with real-time
                  stock price.
                </li>
                <li>
                  Portfolio Management: Track and manage your investment
                  portfolio.
                </li>
                <li>
                  Forecasting Tools: Make informed trading decisions utilizing
                  advanced Mahine Learning.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container px-4">
          <div className="row gx-4 justify-content-center">
            <div className="col-lg-8">
              <h2>Technologies</h2>
              <ul>
                <li>
                  Spring Boot: The back-end services are powered by Spring Boot,
                  providing a robust and scalable framework for building the
                  server-side application.{" "}
                </li>
                <li>
                  Flask: Flask is used to develop the microservice responsible
                  for stock forecasting.{" "}
                </li>
                <li>
                  React.js: The front-end of this demo is built using React.js,
                  which provides a fast, dynamic, and interactive user
                  experience.{" "}
                </li>
                <li>
                  Chart.js: Chart.js is used for creating interactive and
                  visually appealing data visualizations for displaying
                  portfolio performance.{" "}
                </li>
                <li>
                  Python & Machine Learning: Python is used for implementing the
                  classification-based machine learning strategy for stock
                  forecasting. Libraries such as pandas, numpy, and scipy are
                  utilized to build the models from scratch. The strategy
                  leverages financial indicators like Price/SMA, BBP, and MACD.{" "}
                </li>
                <li>
                  PostgreSQL: PostgreSQL is used for storing user data,
                  transaction histories, and portfolio information.
                </li>
                <li>
                  RESTful APIs: The application uses RESTful APIs to facilitate
                  seamless communication between the front-end and back-end,
                  ensuring smooth data flow and real-time updates.
                </li>
                <li>AWS: The service is hosted on AWS ECS.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
