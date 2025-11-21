-- Base de datos Savinco Financiero
CREATE DATABASE IF NOT EXISTS savinco_db;
USE savinco_db;

-- Tabla de tipos de cambio
CREATE TABLE IF NOT EXISTS exchange_rates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    currency VARCHAR(10) NOT NULL UNIQUE,
    usd_to_currency_rate DECIMAL(18,6) NOT NULL
);

-- Tabla principal de datos financieros
CREATE TABLE IF NOT EXISTS country_financial_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    country_name VARCHAR(50) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    capital_ahorrado_original DECIMAL(18,2) NOT NULL,
    capital_prestado_original DECIMAL(18,2) NOT NULL,
    utilidades_original DECIMAL(18,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar tipos de cambio
INSERT INTO exchange_rates (currency, usd_to_currency_rate) VALUES
('USD', 1),
('EUR', 0.90),
('PEN', 3.3),
('NPR', 133)
ON DUPLICATE KEY UPDATE usd_to_currency_rate=VALUES(usd_to_currency_rate);

-- Insertar datos financieros de los países
-- Porcentajes: Ecuador 40%, España 30%, Perú 20%, Nepal 10%
-- Totales objetivo en USD: Capital Ahorrado $33,666,477, Capital Prestado $274,878,091, Utilidades $39,581,411
INSERT INTO country_financial_data 
(country_name, currency, capital_ahorrado_original, capital_prestado_original, utilidades_original)
VALUES
-- Ecuador (40% en USD) - Ya está en USD
('Ecuador', 'USD', 13466590.80, 109951236.40, 15832564.40),

-- España (30% en EUR) - Valores en EUR = USD * 0.90
('España', 'EUR', 9089948.79, 74217084.57, 10686980.97),

-- Perú (20% en PEN) - Valores en PEN = USD * 3.3
('Perú', 'PEN', 22227652.32, 181837218.73, 26138093.10),

-- Nepal (10% en NPR) - Valores en NPR = USD * 133
('Nepal', 'NPR', 447998754.94, 3656027214.10, 526705179.70)

ON DUPLICATE KEY UPDATE 
    capital_ahorrado_original=VALUES(capital_ahorrado_original),
    capital_prestado_original=VALUES(capital_prestado_original),
    utilidades_original=VALUES(utilidades_original);
