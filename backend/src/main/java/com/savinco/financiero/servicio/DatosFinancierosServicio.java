package com.savinco.financiero.servicio;

import com.savinco.financiero.dto.CrearDatosFinancierosDTO;
import com.savinco.financiero.dto.DatosFinancierosDTO;
import com.savinco.financiero.dto.TotalesConsolidadosDTO;
import com.savinco.financiero.modelo.DatosFinancierosPais;
import com.savinco.financiero.repositorio.DatosFinancierosPaisRepositorio;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Servicio que encapsula la lógica de negocio relacionada con los datos
 * financieros por país: consultas, creación, actualización, eliminación
 * y cálculo de totales consolidados.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class DatosFinancierosServicio {

    /** Repositorio JPA para acceder a la tabla de datos financieros por país. */
    private final DatosFinancierosPaisRepositorio datosFinancierosPaisRepositorio;

    private final ConversionMonedaServicio conversionMonedaServicio;

    public List<DatosFinancierosDTO> obtenerTodosDatos() {
        List<DatosFinancierosPais> datos = datosFinancierosPaisRepositorio.findAll();
        return datos.stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    public DatosFinancierosDTO obtenerDatosPorId(Long id) {
        DatosFinancierosPais datos = datosFinancierosPaisRepositorio.findById(id)
                .orElseThrow(() -> new RuntimeException("Datos no encontrados para el ID: " + id));
        return convertirADTO(datos);
    }

    public TotalesConsolidadosDTO obtenerTotalesConsolidados() {
        List<DatosFinancierosDTO> datosPorPais = obtenerTodosDatos();

        BigDecimal totalCapitalAhorrado = datosPorPais.stream()
                .map(DatosFinancierosDTO::getCapitalAhorradoUsd)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalCapitalPrestado = datosPorPais.stream()
                .map(DatosFinancierosDTO::getCapitalPrestadoUsd)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalUtilidades = datosPorPais.stream()
                .map(DatosFinancierosDTO::getUtilidadesUsd)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return new TotalesConsolidadosDTO(
                datosPorPais,
                totalCapitalAhorrado,
                totalCapitalPrestado,
                totalUtilidades
        );
    }

    public DatosFinancierosDTO crearDatos(CrearDatosFinancierosDTO dto) {
        DatosFinancierosPais datos = new DatosFinancierosPais();
        datos.setNombrePais(dto.getNombrePais());
        datos.setMoneda(dto.getMoneda());
        datos.setCapitalAhorradoOriginal(dto.getCapitalAhorradoOriginal());
        datos.setCapitalPrestadoOriginal(dto.getCapitalPrestadoOriginal());
        datos.setUtilidadesOriginal(dto.getUtilidadesOriginal());

        DatosFinancierosPais guardado = datosFinancierosPaisRepositorio.save(datos);
        return convertirADTO(guardado);
    }

    public DatosFinancierosDTO actualizarDatos(Long id, CrearDatosFinancierosDTO dto) {
        DatosFinancierosPais datos = datosFinancierosPaisRepositorio.findById(id)
                .orElseThrow(() -> new RuntimeException("Datos no encontrados para el ID: " + id));

        datos.setNombrePais(dto.getNombrePais());
        datos.setMoneda(dto.getMoneda());
        datos.setCapitalAhorradoOriginal(dto.getCapitalAhorradoOriginal());
        datos.setCapitalPrestadoOriginal(dto.getCapitalPrestadoOriginal());
        datos.setUtilidadesOriginal(dto.getUtilidadesOriginal());

        DatosFinancierosPais actualizado = datosFinancierosPaisRepositorio.save(datos);
        return convertirADTO(actualizado);
    }

    public void eliminarDatos(Long id) {
        if (!datosFinancierosPaisRepositorio.existsById(id)) {
            throw new RuntimeException("Datos no encontrados para el ID: " + id);
        }
        datosFinancierosPaisRepositorio.deleteById(id);
    }

    private DatosFinancierosDTO convertirADTO(DatosFinancierosPais datos) {
        DatosFinancierosDTO dto = new DatosFinancierosDTO();
        dto.setId(datos.getId());
        dto.setNombrePais(datos.getNombrePais());
        dto.setMoneda(datos.getMoneda());

        // Valores originales
        dto.setCapitalAhorradoOriginal(datos.getCapitalAhorradoOriginal());
        dto.setCapitalPrestadoOriginal(datos.getCapitalPrestadoOriginal());
        dto.setUtilidadesOriginal(datos.getUtilidadesOriginal());


        dto.setCapitalAhorradoUsd(
                conversionMonedaServicio.convertirAUsd(datos.getCapitalAhorradoOriginal(), datos.getMoneda())
        );
        dto.setCapitalPrestadoUsd(
                conversionMonedaServicio.convertirAUsd(datos.getCapitalPrestadoOriginal(), datos.getMoneda())
        );
        dto.setUtilidadesUsd(
                conversionMonedaServicio.convertirAUsd(datos.getUtilidadesOriginal(), datos.getMoneda())
        );

        return dto;
    }
}
