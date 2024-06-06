package com.example.ml4t_spring_backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "Transaction")
@Table(name = "transactions")
public class Transaction {
    @Id
    @SequenceGenerator(
            name = "transaction_sequence",
            sequenceName = "transaction_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "transaction_sequence"
    )
    private Long id;
    private LocalDateTime date;
    private String ticker;
    private Integer quantity;
    @Enumerated(EnumType.STRING)
    private TransactionType type;
    @Column(
            name = "purchase_price",
            nullable = false
    )
    private BigDecimal purchasePrice;
    @Column(
            name = "current_price",
            nullable = false
    )
    private BigDecimal currentPrice;
    @ManyToOne
    @JoinColumn(
            nullable = false,
            name = "user_id"
    )
    private User user;

    public Transaction(LocalDateTime date, String ticker, Integer quantity, TransactionType type, BigDecimal purchasePrice, BigDecimal currentPrice, User user) {
        this.date = date;
        this.ticker = ticker;
        this.quantity = quantity;
        this.type = type;
        this.purchasePrice = purchasePrice;
        this.currentPrice = currentPrice;
        this.user = user;
    }
}
