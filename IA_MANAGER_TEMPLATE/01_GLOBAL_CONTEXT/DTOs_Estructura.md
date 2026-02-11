# Estructura de DTOs del proyecto

Este documento cataloga **todos los DTOs** del backend. Sirve como referencia para agentes y desarrolladores. Para tipos de dato y alias de pantalla, ver [Tablas_Columnas_Alias.md](./Tablas_Columnas_Alias.md). Para mapeo DTO → título web, ver [DTOs_Titulos_Web.md](./DTOs_Titulos_Web.md).

**Mantenimiento:** El agente **AG-VC-04-DB** debe actualizar este fichero al añadir un nuevo DTO o entidad al sistema de control. Ver `02_AGENTS_REGISTRY/04_DATABASE.md`.

---

## Módulo pedidos

| DTO | Fichero | Propiedades (resumen) |
| :--- | :--- | :--- |
| PedidoListDto | src/pedidos/dto/pedido-list.dto.ts | id: number, estadoImportacion?: string, tipoPedido?: string, codigoDocumento?: string, fechaDocumento?: Date, horaConsolidacion?: string, fechaEntrega?: Date, codigoCliente?: string, nombreCliente?: string, idDocumentoPDA?: string, codigoPda?: number, nombreAgente?: string, codigoAgente?: string, importeDescuento1/2/DToPP?: number, importe?: number, total?: number, tieneFirma?: boolean, nota?: string, origen?: string, errorIntegracion?: string, agenteDatos?: PedidoAgenteDto, totales?: PedidoTotalesDto, tipoDocumento?, numero?, cliente?, agente?, fecha?, delegacion?, estadoIntegracion?, mensajeErrorIntegracion?, observaciones? |
| PedidoDetalleDto | src/pedidos/dto/pedido-detalle.dto.ts | id: number, tipoDocumento?, numero?, cliente?, agente?, agenteDatos?: PedidoAgenteDto, clienteDatos?: PedidoClienteDto, datosDireccion?: PedidoDireccionDto, fecha?, delegacion?, estadoIntegracion?, mensajeErrorIntegracion?, observaciones?, totales?: PedidoTotalesDto, lineas: PedidoDetalleLineaDto[] |
| PedidoAgenteDto | src/pedidos/dto/pedido-agente.dto.ts | (anidado) id?: number, nombre?: string, codigoAgenteFabricante?: string, codigoAgenteERP?: string |
| PedidoClienteDto | src/pedidos/dto/pedido-cliente.dto.ts | (anidado) codigo?, nombreComercial?, nombreFiscal?, cif?, direccion?, poblacion?, provincia?, telefono?, fax?, email?, banco?, cuenta? |
| PedidoDireccionDto | src/pedidos/dto/pedido-direccion.dto.ts | (anidado) nombre?, direccion?, contacto?, poblacion?, provincia?, cp?, tfno? |
| PedidoTotalesDto | src/pedidos/dto/pedido-totales.dto.ts | (anidado) idPedidosTotalOPT?: number, subtotal?, dtos?, baseImp?, ivaPor?, ivaCuota?, rePor?, reCuota?, impuestosTotal?, total? |
| PedidoDetalleLineaDto | src/pedidos/dto/pedido-detalle-linea.dto.ts | id: number, comboIntegracion?, codigoArticulo?, descripcionArticulo?, codigoPromocion?, unidadesVendidas?, descripcionUnidadVendida?, importe?, descuento1-5?, total?, motivoDevolucion?, comboAdjunto?, notaLinea?, errorIntegracion?, referencia?, descripcion?, unidades?, precio?, descuento?, estadoIntegracion?, mensajeErrorIntegracion? |
| PaginatedPedidosDto | src/pedidos/dto/paginated-pedidos.dto.ts | selectedFilters?: any[], searchTerm?: string, currentPage: number, itemsPerPage: number, sortColumn?: string, sortDirection?: string |
| PedidosTotalDto | src/pedidos/dto/pedidos-total.dto.ts | idPedidosTotalOPT: number, idPedidosTotalERP?, idPedidoOPT?, idPedidoPDA?, idPedidoERP?, idIvaOPT?, idIvaPDA?, idIvaERP?, subtotal?, dtos?, baseImp?, ivaPor?, ivaCuota?, rePor?, reCuota?, impuestosTotal?, total?, fechaInsert?, fechaUpdate?, idAgentePropietario?, idRegistroPDA?, idAgenteUpdate?, tipoDocumento?, estadoImportacion?, bajaEnERP?, guiderp?, idTareaIntegracion?, idUnicoTablet?, idUnicoVentaTablet?, idTareaDispositivo?, erroresIntegracion? |

---

## Módulo clients

| DTO | Fichero | Propiedades (resumen) |
| :--- | :--- | :--- |
| ClienteDto | src/clients/dto/cliente.dto.ts | id: number; ~250 campos opcionales alineados con [dbo].[Clientes]: idEmpresa, idClienteFabricante, idCategoria, nombre, nombreFiscal, cif, telefono, fax, mail, direccion, provincia, poblacion, banco, cuenta, fechaInsert, fechaUpdate, etc. Ver Tablas_Columnas_Alias.md y entidad Client. |

---

## Módulo agentes

| DTO | Fichero | Propiedades (resumen) |
| :--- | :--- | :--- |
| AgenteDto | src/agentes/dto/agente.dto.ts | id: number, idEmpresa?, codigoAgenteFabricante?, nombre?, bajaTemporal?, bajaDefinitiva?, fechaInicioDesactivado?, fechaFinDesactivado?, fechaInicioOptimiza?, fechaUltimaRecarga?, codigoAgenteERP?, categoria?, idEmpresaERP?, fechaFinOptimiza?, fechaInsert?, fechaUpdate?, idAgentePropietario?, idRegistroPDA?, idAgenteUpdate?, contadorPedidos?, contadorAlbaranes?, contadorFacturas?, contadorCierresCaja?, pass?, password?, tieneTodos?, y campos adicionales de relaciones/equipos |

---

## Módulo filters

| DTO | Fichero | Propiedades (resumen) |
| :--- | :--- | :--- |
| FilterDto | src/filters/dto/filter.dto.ts | id: string, valor?: any, tipo: string |
| CreateFilterDto | src/filters/dto/create-filter.dto.ts | filtros: any, nombre: string |
| UpdateFilterDto | src/filters/dto/update-filter.dto.ts | PartialType(CreateFilterDto) |
| SelectedFilterDto | src/filters/dto/selected-filters.dto.ts | selectedFilters?: FilterDto[], idioma?: string |

---

## Módulo menus

| DTO | Fichero | Propiedades (resumen) |
| :--- | :--- | :--- |
| CreateMenuDto | src/menus/dto/create-menu.dto.ts | (vacío; por implementar) |
| UpdateMenuDto | src/menus/dto/update-menu.dto.ts | PartialType(CreateMenuDto) |

---

## Módulo nav-lists

| DTO | Fichero | Propiedades (resumen) |
| :--- | :--- | :--- |
| CreateNavListDto | src/nav-lists/dto/create-nav-list.dto.ts | (vacío; por implementar) |
| UpdateNavListDto | src/nav-lists/dto/update-nav-list.dto.ts | PartialType(CreateNavListDto) |

---

## Módulo Core (solo referencia, no modificar)

Los DTOs bajo `src/core/` son parte de la carpeta Core inviolable. Se documentan aquí como referencia únicamente.

| DTO | Fichero | Uso |
| :--- | :--- | :--- |
| CreateRoleDto | src/core/authorization/dto/create-role.dto.ts | Crear rol |
| CreatePermissionDto | src/core/authorization/dto/create-permission.dto.ts | Crear permiso |
| AssignRolesDto | src/core/authorization/dto/assign-roles.dto.ts | Asignar roles |
| AssignPermissionsDto | src/core/authorization/dto/assign-permissions.dto.ts | Asignar permisos |
| LanguageDto | src/core/configuration/dto/language.dto.ts | Idioma |
| CreateUserDto | src/core/users/dto/create-user.dto.ts | Crear usuario |
| UpdateUserDto | src/core/users/dto/update-user.dto.ts | Actualizar usuario |
| AdminUpdateUserDto | src/core/users/dto/admin-update-user.dto.ts | Actualizar usuario (admin) |
| LoginDto | src/core/users/dto/login.dto.ts | Login |
| AssignRoleDto | src/core/users/dto/assign-role.dto.ts | Asignar rol |
| AssignPermissionDto | src/core/users/dto/assign-permission.dto.ts | Asignar permiso |
| UpdateLanguageDto | src/core/users/dto/update-language.dto.ts | Actualizar idioma |
| PaginatedUsersDto | src/core/users/dto/paginated-users.dto.ts | Paginación usuarios |
| NewPasswordDto | src/core/users/dto/new-password.dto.ts | Nueva contraseña |
| ResetPasswordDto | src/core/users/dto/reset-password.dto.ts | Reset contraseña |
