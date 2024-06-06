package com.example.ml4t_spring_backend.model;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.io.Serializable;
import java.util.Map;

@Getter
@AllArgsConstructor
public class ForecastResult  implements Serializable {
    private JsonNode orders;
    private JsonNode normed;
    private JsonNode normed_benchmark;
    private double strategy_cr;
    private double strategy_sdr;
    private double strategy_adr;
    private double benchmark_cr;
    private double benchmark_sdr;
    private double benchmark_adr;
}
