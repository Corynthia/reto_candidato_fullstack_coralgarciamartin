package com.savinco.financiero.controlador;

import com.savinco.financiero.dto.CrearDatosFinancierosDTO;
import com.savinco.financiero.dto.DatosFinancierosDTO;
import com.savinco.financiero.dto.TotalesConsolidadosDTO;
import com.savinco.financiero.servicio.DatosFinancierosServicio;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST que expone los endpoints relacionados con los datos
 * financieros por país.
 *
 * Se encarga únicamente de recibir peticiones HTTP, delegar en el servicio
 * de negocio y devolver respuestas adecuadas.
 */
@RestController
@RequestMapping("/api/datos-financieros")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class DatosFinancierosControlador {

   
    private final DatosFinancierosServicio datosFinancierosServicio;

    @GetMapping
    public ResponseEntity<List<DatosFinancierosDTO>> obtenerTodosDatos() {
        return ResponseEntity.ok(datosFinancierosServicio.obtenerTodosDatos());
    }

   
    @GetMapping("/{id}")
    public ResponseEntity<DatosFinancierosDTO> obtenerDatosPorId(@PathVariable Long id) {
        return ResponseEntity.ok(datosFinancierosServicio.obtenerDatosPorId(id));
    }

    
    @GetMapping("/consolidados")
    public ResponseEntity<TotalesConsolidadosDTO> obtenerTotalesConsolidados() {
        return ResponseEntity.ok(datosFinancierosServicio.obtenerTotalesConsolidados());
    }

    
    @PostMapping
    public ResponseEntity<DatosFinancierosDTO> crearDatos(@Valid @RequestBody CrearDatosFinancierosDTO dto) {
        DatosFinancierosDTO creado = datosFinancierosServicio.crearDatos(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    
    @PutMapping("/{id}")
    public ResponseEntity<DatosFinancierosDTO> actualizarDatos(
            @PathVariable Long id,
            @Valid @RequestBody CrearDatosFinancierosDTO dto) {
        return ResponseEntity.ok(datosFinancierosServicio.actualizarDatos(id, dto));
    }

    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarDatos(@PathVariable Long id) {
        datosFinancierosServicio.eliminarDatos(id);
        return ResponseEntity.noContent().build();
    }
}
