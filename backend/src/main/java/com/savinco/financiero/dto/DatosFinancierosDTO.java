package com.savinco.financiero.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * DTO de salida que agrupa toda la información financiera de un país,
 * tanto en moneda original como convertida a USD.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DatosFinancierosDTO {

    private Long id;

    private String nombrePais;

    private String moneda;
    
    // Valores originales en moneda local

    private BigDecimal capitalAhorradoOriginal;

    private BigDecimal capitalPrestadoOriginal;

    private BigDecimal utilidadesOriginal;
    
    // Valores convertidos a USD

    private BigDecimal capitalAhorradoUsd;

    private BigDecimal capitalPrestadoUsd;

    private BigDecimal utilidadesUsd;
}
