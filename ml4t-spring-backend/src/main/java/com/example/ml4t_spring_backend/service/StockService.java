package com.example.ml4t_spring_backend.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import yahoofinance.Stock;
import yahoofinance.YahooFinance;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.Optional;
import java.time.Instant;

@Service
@AllArgsConstructor
public class StockService {
    private final RestTemplate restTemplate;
    public BigDecimal getRealTimeStockPrice(String symbol) {
        try {
            long period1 = Instant.now().minusSeconds(86400 * 7).getEpochSecond(); // 24 hours ago
            long period2 = Instant.now().getEpochSecond();
            String interval = "1d";
            String url = String.format("https://query1.finance.yahoo.com/v7/finance/download/%s?period1=%d&period2=%d&interval=%s&events=history&includeAdjustedClose=true",
                    symbol, period1, period2, interval);

            String csvData = restTemplate.getForObject(url, String.class);
                String[] lines = csvData.split("\n");
                String[] lastLine = lines[lines.length - 1].split(",");
                return new BigDecimal(lastLine[4]);

        } catch (HttpClientErrorException.NotFound e) {
            throw new IllegalStateException("Stock symbol not found: " + symbol, e);
        } catch (HttpClientErrorException e) {
            throw new IllegalStateException("HTTP error occurred while fetching stock price: " + e.getStatusCode(), e);
        } catch (Exception e) {
            throw new IllegalStateException("Failed to fetch stock price", e);
        }
    }
}
