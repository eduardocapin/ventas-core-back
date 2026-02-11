# Mapeo DTO → Título en pantalla

Este documento proporciona el **mapeo DTO.propiedad → clave i18n → título en pantalla** para cada propiedad de los DTOs principales usados en la UI. La fuente de i18n es `ventas-core-front/src/app/services/i18n/translations.es.ts` y `translations.en.ts`.

**Relación con Tablas_Columnas_Alias:** Los **alias base** (nombres de visualización de campos) provienen de `Tablas_Columnas_Alias.md` (columna «Alias en pantalla»). Este documento añade la capa de mapeo al DTO y a las claves i18n, permitiendo al Frontend mostrar etiquetas consistentes. Al añadir nuevos campos, mantener coherencia con los alias definidos en Tablas_Columnas_Alias.

**Mantenimiento:** El agente **AG-VC-02-FRONTEND** debe actualizar este fichero al crear o modificar columnas, títulos o secciones de UI, y las traducciones correspondientes. Ver `02_AGENTS_REGISTRY/02_FRONTEND.md`.

Para la estructura completa de DTOs, ver [DTOs_Estructura.md](./DTOs_Estructura.md). Para columnas BD y alias por tabla (fuente de verdad de nombres), ver [Tablas_Columnas_Alias.md](./Tablas_Columnas_Alias.md).

---

## Títulos de sección / pantalla

| Sección | Clave i18n | Título ES | Título EN |
| :--- | :--- | :--- | :--- |
| Importador de Documentos | importadorDocumentos.title | Importador de Documentos | Document Importer |
| Pedidos por estado de integración | importadorDocumentos.kpisEstados | Pedidos por estado de integración | Orders by integration status |
| Documento de venta (visor modal) | importadorDocumentos.visor.title | Documento de venta | Sales document |
| Datos cliente (visor) | importadorDocumentos.visor.datosCliente | Datos cliente | Client data |
| Datos dirección (visor) | importadorDocumentos.visor.datosDireccion | Datos dirección | Address data |
| Datos documento (visor) | importadorDocumentos.visor.datosDocumento | Datos documento | Document data |
| Líneas (visor) | importadorDocumentos.visor.lineas | Líneas | Lines |
| Totales (visor) | importadorDocumentos.visor.totales | Totales | Totals |
| Contactos (cliente) | clientContacts.title | Contactos | Contacts |
| Direcciones (cliente) | clientAddresses.title | Direcciones | Addresses |

---

## Importador de Documentos – Tabla listado (PedidoListDto)

| DTO.Propiedad | Clave i18n | Título ES | Título EN |
| :--- | :--- | :--- | :--- |
| PedidoListDto.idDocumentoPDA | importadorDocumentos.col.codigoPda | Código Documento | Document code |
| PedidoListDto.estadoImportacion | importadorDocumentos.col.estadoImportacion | Estado de importación | Import status |
| PedidoListDto.tipoPedido | importadorDocumentos.col.tipoPedido | Tipo de pedido | Order type |
| PedidoListDto.codigoDocumento | importadorDocumentos.col.codigoDocumento | Código del documento | Document code |
| PedidoListDto.fechaDocumento | importadorDocumentos.col.fechaDocumento | Fecha del documento | Document date |
| PedidoListDto.horaConsolidacion | importadorDocumentos.col.horaConsolidacion | Hora de consolidación del pedido | Order consolidation time |
| PedidoListDto.fechaEntrega | importadorDocumentos.col.fechaEntrega | Fecha de entrega | Delivery date |
| PedidoListDto.codigoCliente | importadorDocumentos.col.codigoCliente | Código del cliente | Client code |
| PedidoListDto.nombreCliente | importadorDocumentos.col.nombreCliente | Nombre del cliente | Client name |
| PedidoListDto.nombreAgente | importadorDocumentos.col.nombreAgente | Nombre del agente | Agent name |
| PedidoListDto.codigoAgente | importadorDocumentos.col.codigoAgente | Código del agente | Agent code |
| PedidoListDto.importeDescuento1 | importadorDocumentos.col.importeDescuento1 | Importe del descuento 1 | Discount 1 amount |
| PedidoListDto.importeDescuento2 | importadorDocumentos.col.importeDescuento2 | Importe del descuento 2 | Discount 2 amount |
| PedidoListDto.importeDescuentoDToPP | importadorDocumentos.col.importeDescuentoDToPP | Importe del descuento DToPP | Discount DToPP amount |
| PedidoListDto.importe | importadorDocumentos.col.importe | Importe | Amount |
| PedidoListDto.total | importadorDocumentos.col.total | Total | Total |
| PedidoListDto.tieneFirma | importadorDocumentos.col.tieneFirma | Tiene firma | Has signature |
| PedidoListDto.nota | importadorDocumentos.col.nota | Nota | Note |
| PedidoListDto.origen | importadorDocumentos.col.origen | Origen | Origin |
| PedidoListDto.errorIntegracion | importadorDocumentos.col.errorIntegracion | Error de integración | Integration error |

---

## Importador de Documentos – Tabla líneas (PedidoDetalleLineaDto)

| DTO.Propiedad | Clave i18n | Título ES | Título EN |
| :--- | :--- | :--- | :--- |
| PedidoDetalleLineaDto.comboIntegracion | importadorDocumentos.detail.comboIntegracion | Combo de integración | Integration combo |
| PedidoDetalleLineaDto.codigoArticulo | importadorDocumentos.detail.codigoArticulo | Código del artículo | Article code |
| PedidoDetalleLineaDto.descripcionArticulo | importadorDocumentos.detail.descripcionArticulo | Descripción del artículo | Article description |
| PedidoDetalleLineaDto.codigoPromocion | importadorDocumentos.detail.codigoPromocion | Código de la promoción | Promotion code |
| PedidoDetalleLineaDto.unidadesVendidas | importadorDocumentos.detail.unidadesVendidas | Unidades vendidas | Units sold |
| PedidoDetalleLineaDto.descripcionUnidadVendida | importadorDocumentos.detail.descripcionUnidadVendida | Descripción de la unidad vendida | Sold unit description |
| PedidoDetalleLineaDto.importe | importadorDocumentos.detail.importe | Importe | Amount |
| PedidoDetalleLineaDto.descuento1 | importadorDocumentos.detail.descuento1 | Descuento 1 | Discount 1 |
| PedidoDetalleLineaDto.descuento2 | importadorDocumentos.detail.descuento2 | Descuento 2 | Discount 2 |
| PedidoDetalleLineaDto.descuento3 | importadorDocumentos.detail.descuento3 | Descuento 3 | Discount 3 |
| PedidoDetalleLineaDto.descuento4 | importadorDocumentos.detail.descuento4 | Descuento 4 | Discount 4 |
| PedidoDetalleLineaDto.descuento5 | importadorDocumentos.detail.descuento5 | Descuento 5 | Discount 5 |
| PedidoDetalleLineaDto.total | importadorDocumentos.detail.total | Total | Total |
| PedidoDetalleLineaDto.motivoDevolucion | importadorDocumentos.detail.motivoDevolucion | Motivo devolución | Return reason |
| PedidoDetalleLineaDto.comboAdjunto | importadorDocumentos.detail.comboAdjunto | Combo de adjunto | Attachment combo |
| PedidoDetalleLineaDto.notaLinea | importadorDocumentos.detail.notaLinea | Nota de línea | Line note |
| PedidoDetalleLineaDto.errorIntegracion | importadorDocumentos.detail.errorIntegracion | Error de integración | Integration error |

---

## Visor documento – Datos cliente (PedidoClienteDto)

| DTO.Propiedad | Clave i18n | Título ES | Título EN |
| :--- | :--- | :--- | :--- |
| PedidoClienteDto.codigo | importadorDocumentos.visor.codigo | Código | Code |
| PedidoClienteDto.nombreComercial | importadorDocumentos.visor.nComercial | N. Comercial | Commercial name |
| PedidoClienteDto.nombreFiscal | importadorDocumentos.visor.nFiscal | N. Fiscal | Tax name |
| PedidoClienteDto.cif | importadorDocumentos.visor.cif | CIF | CIF |
| PedidoClienteDto.direccion | importadorDocumentos.visor.direccion | Dirección | Address |
| PedidoClienteDto.poblacion | importadorDocumentos.visor.poblacion | Población | City |
| PedidoClienteDto.provincia | importadorDocumentos.visor.provincia | Provincia | Province |
| PedidoClienteDto.telefono | importadorDocumentos.visor.tfno | Tfno. | Phone |
| PedidoClienteDto.fax | importadorDocumentos.visor.fax | Fax | Fax |
| PedidoClienteDto.email | importadorDocumentos.visor.email | Email | Email |
| PedidoClienteDto.banco | importadorDocumentos.visor.banco | Banco | Bank |
| PedidoClienteDto.cuenta | importadorDocumentos.visor.numCuenta | Num. Cuenta | Account no. |

---

## Visor documento – Datos dirección (PedidoDireccionDto)

| DTO.Propiedad | Clave i18n | Título ES | Título EN |
| :--- | :--- | :--- | :--- |
| PedidoDireccionDto.nombre | importadorDocumentos.visor.nombre | Nombre | Name |
| PedidoDireccionDto.contacto | importadorDocumentos.visor.contacto | Contacto | Contact |
| PedidoDireccionDto.direccion | importadorDocumentos.visor.direccion | Dirección | Address |
| PedidoDireccionDto.poblacion | importadorDocumentos.visor.poblacion | Población | City |
| PedidoDireccionDto.provincia | importadorDocumentos.visor.provincia | Provincia | Province |
| PedidoDireccionDto.cp | importadorDocumentos.visor.cp | C.P. | ZIP |
| PedidoDireccionDto.tfno | importadorDocumentos.visor.tfno | Tfno. | Phone |

---

## Visor documento – Totales (PedidoTotalesDto)

| DTO.Propiedad | Clave i18n | Título ES | Título EN |
| :--- | :--- | :--- | :--- |
| PedidoTotalesDto.baseImp | importadorDocumentos.visor.baseImponible | Base imponible | Taxable base |
| PedidoTotalesDto.ivaPor / ivaCuota | importadorDocumentos.visor.iva | IVA | VAT |
| PedidoTotalesDto.rePor / reCuota | importadorDocumentos.visor.reEquiv | R. equiv. | Equiv. surcharge |
| PedidoTotalesDto.total | importadorDocumentos.visor.total | Total | Total |
