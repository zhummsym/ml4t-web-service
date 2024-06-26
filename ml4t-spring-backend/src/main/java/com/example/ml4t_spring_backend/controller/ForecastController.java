package com.example.ml4t_spring_backend.controller;

import com.example.ml4t_spring_backend.model.ForecastResult;
import com.example.ml4t_spring_backend.service.ForecastService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.AccessType;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping(path = "ml4t/forecast")
public class ForecastController {

    private ForecastService forecastService;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping("")
    public ResponseEntity<ForecastResult> forecast(@RequestParam String ticker) {

        ForecastResult response = forecastService.getStockData(ticker);
        return new ResponseEntity<>(response, HttpStatus.OK);

    }
}

