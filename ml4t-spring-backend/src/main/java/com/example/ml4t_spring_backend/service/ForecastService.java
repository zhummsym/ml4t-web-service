package com.example.ml4t_spring_backend.service;
import com.example.ml4t_spring_backend.model.ForecastResult;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
@Service
@AllArgsConstructor
public class ForecastService {

    private RestTemplate restTemplate;
    private final static String localForecastUrl = "http://192.168.1.154:5432/forecast?ticker=";
    private final static String ec2ForecastUrl = "http://localhost:8000/forecast/?ticker=";

    public ForecastResult getStockData(String ticker) {
        try {
            String url = ec2ForecastUrl + ticker;
            ForecastResult forecastResult = restTemplate.getForObject(url, ForecastResult.class);
            return forecastResult;
        } catch (HttpServerErrorException e) {
            throw new IllegalStateException("Stock symbol not found: " + ticker, e);

        }  catch (Exception e) {
            throw new RuntimeException("Unexpected error while getting stock forecast result. ", e);
        }


    }
}