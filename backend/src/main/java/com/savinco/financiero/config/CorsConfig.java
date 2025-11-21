/*
 * Configuración global de CORS para la API.
 * Permite que los frontends en desarrollo (por ejemplo React/Vite)
 * consuman esta API evitando errores de Cross-Origin (CORS).
 *
 * Esta clase declara un bean `CorsFilter`.
 *
 * Colocar esta configuración en el backend facilita el desarrollo local
 */
package com.savinco.financiero.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;


@Configuration
public class CorsConfig {

    /**
     * @return instancia configurada de {@link CorsFilter}.
     */

    @Bean
    public CorsFilter corsFilter() {

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        CorsConfiguration config = new CorsConfiguration();
        
        config.setAllowCredentials(true);
        config.setAllowedOrigins(Arrays.asList("http://localhost:3000", "http://localhost:5173"));
        config.setAllowedHeaders(Arrays.asList("*"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}
