package com.savinco.financiero;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Clase principal de la aplicación Spring Boot.
 *
 * El método main arranca el contexto de Spring y levanta el servidor
 * embebido (por defecto, Tomcat) en el puerto configurado.
 */
@SpringBootApplication
public class FinancieroApplication {

    /**
     * Punto de entrada de la aplicación.
     *
     * @param args argumentos de línea de comandos (no utilizados).
     */
    public static void main(String[] args) {
        // Lanza la aplicación Spring Boot usando esta clase como configuración base
        SpringApplication.run(FinancieroApplication.class, args);
    }
}
