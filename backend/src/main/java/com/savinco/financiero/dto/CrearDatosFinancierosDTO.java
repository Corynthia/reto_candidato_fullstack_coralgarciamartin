package com.savinco.financiero.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * DTO de entrada utilizado para crear o actualizar datos financieros
 * de un país desde las peticiones HTTP (POST y PUT).
 *
 * Incluye anotaciones de validación para garantizar que los valores
 * enviados por el cliente sean correctos.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CrearDatosFinancierosDTO {
    
    @NotBlank(message = "El nombre del país es obligatorio")
    private String nombrePais;
    
    @NotBlank(message = "La moneda es obligatoria")
    private String moneda;
    
    @NotNull(message = "El capital ahorrado es obligatorio")
    @Positive(message = "El capital ahorrado debe ser positivo")
    private BigDecimal capitalAhorradoOriginal;
    
    @NotNull(message = "El capital prestado es obligatorio")
    @Positive(message = "El capital prestado debe ser positivo")
    private BigDecimal capitalPrestadoOriginal;
    
    @NotNull(message = "Las utilidades son obligatorias")
    @Positive(message = "Las utilidades deben ser positivas")
    private BigDecimal utilidadesOriginal;
}
