package com.savinco.financiero.repositorio;

import com.savinco.financiero.modelo.DatosFinancierosPais;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repositorio Spring Data JPA para la entidad {@link DatosFinancierosPais}.
 *
 * Hereda {@link JpaRepository} operaciones CRUD
 */

@Repository
public interface DatosFinancierosPaisRepositorio extends JpaRepository<DatosFinancierosPais, Long> {

    /**
     * Busca un registro por nombre de país.
     *
     * @param nombrePais
     * @return un {@link Optional}
     */

    Optional<DatosFinancierosPais> findByNombrePais(String nombrePais);
}
