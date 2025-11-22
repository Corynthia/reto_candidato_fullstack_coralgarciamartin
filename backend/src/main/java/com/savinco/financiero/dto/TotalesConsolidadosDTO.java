package com.savinco.financiero.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

/**
 * DTO que agrupa la lista de datos financieros por país junto con los
 * totales consolidados en USD para capital ahorrado, capital prestado
 * y utilidades.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TotalesConsolidadosDTO {

    private List<DatosFinancierosDTO> datosPorPais;

    private BigDecimal totalCapitalAhorradoUsd;

    private BigDecimal totalCapitalPrestadoUsd;

    private BigDecimal totalUtilidadesUsd;
}
