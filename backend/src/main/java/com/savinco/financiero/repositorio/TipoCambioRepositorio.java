package com.savinco.financiero.repositorio;

import com.savinco.financiero.modelo.TipoCambio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repositorio Spring Data JPA para la entidad {@link TipoCambio}.
 */

@Repository
public interface TipoCambioRepositorio extends JpaRepository<TipoCambio, Long> {

    /**
     * Recupera un tipo de cambio a partir del código de moneda.
     *
     * @param moneda
     * @return {@link Optional} 
     */

    Optional<TipoCambio> findByMoneda(String moneda);
}
