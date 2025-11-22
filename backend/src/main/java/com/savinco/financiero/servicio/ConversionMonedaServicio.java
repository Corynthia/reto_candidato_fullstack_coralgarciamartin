package com.savinco.financiero.servicio;

import com.savinco.financiero.modelo.TipoCambio;
import com.savinco.financiero.repositorio.TipoCambioRepositorio;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

/**
 * Servicio de dominio responsable de convertir importes monetarios desde
 * una moneda de origen hacia dólares estadounidenses (USD).
 * 
 * Utiliza las tasas de cambio almacenadas en la base de datos.
 * 
 * 
 */
@Service
@RequiredArgsConstructor
public class ConversionMonedaServicio {

    /** Repositorio para recuperar las tasas de cambio almacenadas en BD. */
    private final TipoCambioRepositorio tipoCambioRepositorio;

    /**
     * Convierte un monto de una moneda específica a USD.
     *
     * @param monto         importe original en la moneda de origen.
     * @param monedaOrigen  código de la moneda de origen (USD, EUR, PEN, etc.).
     * @return importe equivalente en USD.
     */
    
    public BigDecimal convertirAUsd(BigDecimal monto, String monedaOrigen) {
        // Si ya viene en USD no es necesario hacer ninguna conversión.
        if (monedaOrigen.equals("USD")) {
            return monto;
        }

        // Buscamos en BD la tasa de cambio para la moneda indicada.
        TipoCambio tipoCambio = tipoCambioRepositorio.findByMoneda(monedaOrigen)
                .orElseThrow(() -> new RuntimeException("Tipo de cambio no encontrado para: " + monedaOrigen));

        // Fórmula: monto_usd = monto_original / tasa_usd_a_moneda, con redondeo a 2 decimales.
        return monto.divide(tipoCambio.getTasaUsdAMoneda(), 2, RoundingMode.HALF_UP);
    }
}
