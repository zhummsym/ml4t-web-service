package com.example.ml4t_spring_backend.service;
import com.example.ml4t_spring_backend.model.ForecastResult;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
@Service
@AllArgsConstructor
public class ForecastService {

    private RestTemplate restTemplate;

    public ForecastResult getStockData(String ticker) {
        String url = "http://192.168.1.154:5432/forecast/?ticker=" + ticker;
        ForecastResult res = restTemplate.getForObject(url, ForecastResult.class);
        System.out.println(res);
        return res;

    }

}
