package com.example.ml4t_spring_backend.service;

import com.example.ml4t_spring_backend.model.Transaction;
import com.example.ml4t_spring_backend.model.TransactionType;
import com.example.ml4t_spring_backend.model.User;
import com.example.ml4t_spring_backend.repository.TransactionRepository;
import com.example.ml4t_spring_backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final StockService stockService;
    private final UserRepository userRepository;
    public Transaction addTransaction(String ticker, Integer quantity, TransactionType type, Long id) {

        try {
            BigDecimal price = stockService.getRealTimeStockPrice(ticker);
            Optional<User> userOptional = userRepository.findById(id);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                Transaction transaction = new Transaction(LocalDateTime.now(), ticker, quantity, type, price, price, user);
                return transactionRepository.save(transaction);
            } else {
                throw new IllegalStateException("User does not exist");
            }

        } catch (IllegalStateException e) {
            throw new IllegalStateException("Failed to fetch stock price", e);
        }
    }

    public Optional<List<Transaction>> getTransactionsByUserId (Long userId) {

        Optional<List<Transaction>> transactionsOptional = transactionRepository.findByUserId(userId);
        if (transactionsOptional.isPresent()) {
            List<Transaction> transactions = transactionsOptional.get();
            Map<String, BigDecimal> prices = new HashMap<>();
            for (Transaction transaction : transactions) {
                if (!prices.containsKey(transaction.getTicker())) {
                    prices.put(transaction.getTicker(), stockService.getRealTimeStockPrice(transaction.getTicker()));
                }
                transaction.setCurrentPrice(prices.get(transaction.getTicker()));
            }
            return Optional.of(transactions);
        }
        else{
            return Optional.empty();
        }

    }

}
