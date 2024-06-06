package com.example.ml4t_spring_backend.controller;

import com.example.ml4t_spring_backend.model.Transaction;
import com.example.ml4t_spring_backend.model.TransactionType;
import com.example.ml4t_spring_backend.model.User;
import com.example.ml4t_spring_backend.service.TransactionService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping(path = "ml4t/transaction")
public class TransactionController {
    private final TransactionService transactionService;

    @PostMapping(path = "add")
    public ResponseEntity<Transaction> trade(@RequestParam String ticker,
                                             @RequestParam Integer quantity,
                                             @RequestParam TransactionType type,
                                             @RequestParam Long id) {
        Transaction transaction = transactionService.addTransaction(ticker, quantity, type, id);
        return new ResponseEntity<>(transaction, HttpStatus.CREATED);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Optional<List<Transaction>>> getTransactionsById (@PathVariable("id") Long userId) {
        Optional<List<Transaction>> transactionsOptional = transactionService.getTransactionsByUserId(userId);
        return new ResponseEntity<>(transactionsOptional, HttpStatus.OK);
    }
}
