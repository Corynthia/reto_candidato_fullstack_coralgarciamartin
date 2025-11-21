package com.savinco.financiero.modelo;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * Entidad JPA que representa un tipo de cambio entre USD y una moneda
 * específica. Cada registro corresponde a una moneda distinta.
 */
@Entity
@Table(name = "exchange_rates")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TipoCambio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "currency", nullable = false, unique = true, length = 10)
    private String moneda;

    @NotNull
    @Column(name = "usd_to_currency_rate", nullable = false, precision = 18, scale = 6)
    private BigDecimal tasaUsdAMoneda;
}
