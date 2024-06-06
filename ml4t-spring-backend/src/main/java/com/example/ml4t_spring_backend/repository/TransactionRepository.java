package com.example.ml4t_spring_backend.repository;

import com.example.ml4t_spring_backend.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    Optional<List<Transaction>> findByUserId(Long id);
}
