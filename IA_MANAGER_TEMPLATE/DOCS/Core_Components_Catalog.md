# Catálogo de componentes Core (Frontend)

Este documento es una **referencia** de los componentes disponibles en la carpeta Core del Frontend del proyecto (`ventas-core-front/src/app/core/components`). Sirve de ayuda al agente Frontend y al Manager para la **Fase 1** del protocolo "Core primero": identificar qué elementos de UI (botones, KPIs, tablas, filtros, gráficas, etc.) tienen ya un componente reutilizable.

**Fuente de verdad:** La carpeta del proyecto en el workspace. Este catálogo puede desactualizarse; en caso de duda, listar o explorar `ventas-core-front/src/app/core/components` directamente. Se recomienda actualizar este documento en auditorías del template (p. ej. con el agente Jardinero).

---

## Botones

| Selector | Ruta relativa (desde core/components) |
|----------|----------------------------------------|
| mobentis-btn-export | buttons/btn-export |
| mobentis-btn-facturar | buttons/btn-facturar |
| mobentis-btn-icon-copy | buttons/btn-icons/btn-icon-copy |
| mobentis-btn-icon-delete | buttons/btn-icons/btn-icon-delete |
| mobentis-btn-icon-edit | buttons/btn-icons/btn-icon-edit |
| mobentis-btn-icon-expand | buttons/btn-icons/btn-icon-expand |
| mobentis-btn-icon-file | buttons/btn-icons/btn-icon-file |

## KPIs

| Selector | Ruta relativa (desde core/components) |
|----------|----------------------------------------|
| mobentis-kpi | kpi |

## Tablas

| Selector | Ruta relativa (desde core/components) |
|----------|----------------------------------------|
| mobentis-table | table |
| mobentis-entity-table-manager | entity-table-manager |
| mobentis-table-header | table-header |
| mobentis-table-popup | table-popup |

## Filtros

| Selector | Ruta relativa (desde core/components) |
|----------|----------------------------------------|
| mobentis-filter-container | filters/filter-container |
| mobentis-date-filter | filters/date-filter |
| mobentis-multi-select-filter | filters/multi-select-filter |
| mobentis-search-filter | filters/search-filter |
| mobentis-range-filter | filters/range-filter |

## Búsqueda y paginación

| Selector | Ruta relativa (desde core/components) |
|----------|----------------------------------------|
| mobentis-search-input | search-input |
| mobentis-pagination | pagination |

## Gráficas

| Selector | Ruta relativa (desde core/components) |
|----------|----------------------------------------|
| mobentis-grafica-barra-vertical | graficas/grafica-barra-vertical |
| mobentis-grafica-barra-horizontal | graficas/grafica-barra-horizontal |
| mobentis-grafica-barras-apiladas | graficas/grafica-barras-apiladas |
| mobentis-grafica-pastel | graficas/grafica-pastel |
| mobentis-grafica-semi-circulo | graficas/grafica-semi-circulo |

## Inputs y formularios

| Selector | Ruta relativa (desde core/components) |
|----------|----------------------------------------|
| mobentis-input-bootstrap | input-bootstrap |
| mobentis-input-select | inputs/input-select |
| mobentis-modern-form-section | modern-form-design |
| mobentis-modern-form-field | modern-form-design |

## Diálogos y popups

| Selector | Ruta relativa (desde core/components) |
|----------|----------------------------------------|
| mobentis-confirm-dialog | confirm-dialog |
| mobentis-popup-header | popup-header |

## Etiquetas y valores (label-value)

| Selector | Ruta relativa (desde core/components) |
|----------|----------------------------------------|
| mobentis-etiqueta-valor | etiqueta-valor |
| mobentis-etiqueta-valor-vertical | etiqueta-valor-vertical |

## Otros

| Selector | Ruta relativa (desde core/components) |
|----------|----------------------------------------|
| mobentis-page-title | page-title |
| mobentis-progress-circle | progress-circle |
| mobentis-group-by | group-by |
| mobentis-list-item | list-item |
| mobentis-menu-item | menu-item |
| mobentis-message-update | message-update |
| mobentis-company-dropdown | company-dropdown |
| mobentis-empresa-dropdown | empresa-dropdown |
| mobentis-change-image | change-image |
| mobentis-map | map |
| mobentis-license-badge | license-badge |
| mobentis-configuration-list-item-container | configuration-list-item-container |
| mobentis-cliente-contactos | cliente-contactos |
| mobentis-cliente-datos-generales | cliente-datos-generales |
| mobentis-cliente-direcciones | cliente-direcciones |
| mobentis-cliente-economicos | cliente-economicos |
| mobentis-cliente-mas-info | cliente-mas-info |

---

**Uso:** En la Fase 1 del protocolo (ver `02_AGENTS_REGISTRY/02_FRONTEND.md`), el agente puede consultar este catálogo para mapear "necesito un botón exportar" → `mobentis-btn-export`, "necesito KPIs" → `mobentis-kpi`, etc. Si un elemento no aparece o no encaja con ningún componente listado, debe indicar "No existe en Core" y detenerse hasta confirmación del usuario (regla 1.2 en `Reglas_Generales.md`).
