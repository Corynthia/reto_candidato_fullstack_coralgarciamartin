package com.savinco.financiero.modelo;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Entidad JPA que representa los datos financieros de un país en la base
 * de datos.
 *
 * Se mapea a la tabla {@code country_financial_data} y almacena los valores
 * originales en la moneda local.
 */
@Entity
@Table(name = "country_financial_data")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DatosFinancierosPais {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "country_name", nullable = false, length = 50)
    private String nombrePais;

    @NotNull
    @Column(name = "currency", nullable = false, length = 10)
    private String moneda;

    @NotNull
    @Column(name = "capital_ahorrado_original", nullable = false, precision = 18, scale = 2)
    private BigDecimal capitalAhorradoOriginal;

    @NotNull
    @Column(name = "capital_prestado_original", nullable = false, precision = 18, scale = 2)
    private BigDecimal capitalPrestadoOriginal;

    @NotNull
    @Column(name = "utilidades_original", nullable = false, precision = 18, scale = 2)
    private BigDecimal utilidadesOriginal;


    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime creadoEn;
}
