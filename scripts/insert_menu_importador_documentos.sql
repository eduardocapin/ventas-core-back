-- =============================================================================
-- Script: Añadir ítem "Importador de Documentos" al menú principal
-- Base de datos: MOBENTIS_BOW (MSSQL)
-- Tabla: Converter_Menus
-- =============================================================================
-- Uso: Ejecutar en SQL Server Management Studio, Azure Data Studio o sqlcmd
--      para que aparezca "Importador Documentos" en el menú lateral de la app.
--
-- Previamente: Backend y Frontend deben estar corriendo.
-- Tras ejecutar: Recargar la app en el navegador o cerrar sesión y volver a entrar.
-- =============================================================================

-- Español
INSERT INTO Converter_Menus (IdMenu, IdMenuPadre, Icono, Etiqueta, Ruta, TineSubMenu, Idioma, BajaEnERP)
VALUES (1, NULL, 'bi bi-file-earmark-arrow-up', 'Importador Documentos', '/mobentis/importador-documentos/global', 0, 'es', 0);

-- Inglés (si aplica)
INSERT INTO Converter_Menus (IdMenu, IdMenuPadre, Icono, Etiqueta, Ruta, TineSubMenu, Idioma, BajaEnERP)
VALUES (1, NULL, 'bi bi-file-earmark-arrow-up', 'Document Importer', '/mobentis/importador-documentos/global', 0, 'en', 0);
