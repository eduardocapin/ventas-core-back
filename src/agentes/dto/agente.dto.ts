import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AgenteDto {
  @ApiProperty({ description: 'ID del agente' })
  id: number;

  @ApiPropertyOptional({ description: 'ID de la empresa' })
  idEmpresa?: number;

  @ApiPropertyOptional({ description: 'Código del agente en el fabricante', maxLength: 50 })
  codigoAgenteFabricante?: string;

  @ApiPropertyOptional({ description: 'Nombre del agente', maxLength: 100 })
  nombre?: string;

  @ApiPropertyOptional({ description: 'Indica si el agente está dado de baja temporalmente' })
  bajaTemporal?: boolean;

  @ApiPropertyOptional({ description: 'Indica si el agente está dado de baja definitivamente' })
  bajaDefinitiva?: boolean;

  @ApiPropertyOptional({ description: 'Fecha de inicio de desactivación' })
  fechaInicioDesactivado?: Date;

  @ApiPropertyOptional({ description: 'Fecha de fin de desactivación' })
  fechaFinDesactivado?: Date;

  @ApiPropertyOptional({ description: 'Fecha de inicio de optimización' })
  fechaInicioOptimiza?: Date;

  @ApiPropertyOptional({ description: 'Fecha de última recarga' })
  fechaUltimaRecarga?: Date;

  @ApiPropertyOptional({ description: 'Código del agente en el ERP', maxLength: 50 })
  codigoAgenteERP?: string;

  @ApiPropertyOptional({ description: 'Categoría del agente' })
  categoria?: number;

  @ApiPropertyOptional({ description: 'ID de empresa en el ERP', maxLength: 50 })
  idEmpresaERP?: string;

  @ApiPropertyOptional({ description: 'Fecha de fin de optimización' })
  fechaFinOptimiza?: Date;

  @ApiPropertyOptional({ description: 'Fecha de inserción' })
  fechaInsert?: Date;

  @ApiPropertyOptional({ description: 'Fecha de actualización' })
  fechaUpdate?: Date;

  @ApiPropertyOptional({ description: 'ID del agente propietario' })
  idAgentePropietario?: number;

  @ApiPropertyOptional({ description: 'ID del registro PDA' })
  idRegistroPDA?: number;

  @ApiPropertyOptional({ description: 'ID del agente que realizó la actualización' })
  idAgenteUpdate?: number;

  @ApiPropertyOptional({ description: 'Contador de pedidos' })
  contadorPedidos?: number;

  @ApiPropertyOptional({ description: 'Contador de albaranes' })
  contadorAlbaranes?: number;

  @ApiPropertyOptional({ description: 'Contador de facturas' })
  contadorFacturas?: number;

  @ApiPropertyOptional({ description: 'Contador de cierres de caja' })
  contadorCierresCaja?: number;

  @ApiPropertyOptional({ description: 'Contraseña (legacy)', maxLength: 10 })
  pass?: string;

  @ApiPropertyOptional({ description: 'Contraseña', maxLength: 10 })
  password?: string;

  @ApiPropertyOptional({ description: 'Indica si tiene todos los permisos' })
  tieneTodos?: boolean;

  @ApiPropertyOptional({ description: 'Fecha del último stock' })
  fechaUltimoStock?: Date;

  @ApiPropertyOptional({ description: 'Email del agente', maxLength: 250 })
  email?: string;

  @ApiPropertyOptional({ description: 'Código PDA' })
  cod_PDA?: number;

  @ApiPropertyOptional({ description: 'Contador de auto pedidos' })
  contadorAutoPedidos?: number;

  @ApiPropertyOptional({ description: 'Modo de venta', maxLength: 20 })
  modoVenta?: string;

  @ApiPropertyOptional({ description: 'Fecha de envío de imágenes' })
  fechaEnvioImagenes?: Date;

  @ApiPropertyOptional({ description: 'ID del almacén origen OPT' })
  idAlmacenOrigenOPT?: number;

  @ApiPropertyOptional({ description: 'ID del almacén destino OPT' })
  idAlmacenDestinoOPT?: number;

  @ApiPropertyOptional({ description: 'ID del almacén origen ERP', maxLength: 50 })
  idAlmacenOrigenERP?: string;

  @ApiPropertyOptional({ description: 'ID del almacén destino ERP', maxLength: 50 })
  idAlmacenDestinoERP?: string;

  @ApiPropertyOptional({ description: 'Modo de carga' })
  modoCarga?: number;

  @ApiPropertyOptional({ description: 'Serie de pedido', maxLength: 50 })
  seriePedido?: string;

  @ApiPropertyOptional({ description: 'Serie de albarán', maxLength: 50 })
  serieAlbaran?: string;

  @ApiPropertyOptional({ description: 'Serie de factura', maxLength: 50 })
  serieFactura?: string;

  @ApiPropertyOptional({ description: 'Serie de auto pedido', maxLength: 50 })
  serieAutoPedido?: string;

  @ApiPropertyOptional({ description: 'Contador de cajas' })
  contadorCajas?: number;

  @ApiPropertyOptional({ description: 'Indica si está dado de baja en el ERP' })
  bajaEnERP?: boolean;

  @ApiPropertyOptional({ description: 'Serie de recibos', maxLength: 50 })
  serieRecibos?: string;

  @ApiPropertyOptional({ description: 'Serie de recibo', maxLength: 50 })
  serieRecibo?: string;

  @ApiPropertyOptional({ description: 'Puerto de impresión' })
  puertoImpresion?: number;

  @ApiPropertyOptional({ description: 'Indica si tiene impresión' })
  tieneImpresion?: boolean;

  @ApiPropertyOptional({ description: 'Puerto GPS' })
  puertoGPS?: number;

  @ApiPropertyOptional({ description: 'Baudios' })
  baudios?: number;

  @ApiPropertyOptional({ description: 'Indica si tiene GPS' })
  tieneGPS?: boolean;

  @ApiPropertyOptional({ description: 'Indica si tiene GPV' })
  tieneGPV?: boolean;

  @ApiPropertyOptional({ description: 'Forzar contadores' })
  forzarContadores?: boolean;

  @ApiPropertyOptional({ description: 'Fecha de reinicio de stock' })
  fechaReinicioStock?: Date;

  @ApiPropertyOptional({ description: 'Indica si es capacitiva' })
  capacitiva?: boolean;

  @ApiPropertyOptional({ description: 'Resolución GPS' })
  resolucionGPS?: boolean;

  @ApiPropertyOptional({ description: 'Unidad de GPS para visitas', maxLength: 1 })
  gpsVisitasUnidad?: string;

  @ApiPropertyOptional({ description: 'Tiempo de GPS para visitas' })
  gpsVisitasTiempo?: number;

  @ApiPropertyOptional({ description: 'Unidad de GPS para clientes', maxLength: 1 })
  gpsClientesUnidad?: string;

  @ApiPropertyOptional({ description: 'Tiempo de GPS para clientes' })
  gpsClientesTiempo?: number;

  @ApiPropertyOptional({ description: 'Segundos para comprobar satélites GPS' })
  gpsSegComprobarSatelites?: number;

  @ApiPropertyOptional({ description: 'Segundos para comprobar posición GPS' })
  gpsSegComprobarPosicion?: number;

  @ApiPropertyOptional({ description: 'Indica si tiene teclado' })
  tieneTeclado?: boolean;

  @ApiPropertyOptional({ description: 'Ejercicio' })
  ejercicio?: number;

  @ApiPropertyOptional({ description: 'Indica si usa lector' })
  usarLector?: boolean;

  @ApiPropertyOptional({ description: 'Código de cuenta de caja', maxLength: 50 })
  codigoCuentaCaja?: string;

  @ApiPropertyOptional({ description: 'Indica si usa Motorola ES 400' })
  motorolaES_400?: boolean;

  @ApiPropertyOptional({ description: 'ID del tipo de PDA' })
  idTipoPDA?: number;

  @ApiPropertyOptional({ description: 'Indica si tiene Android' })
  tieneAndroid?: boolean;

  @ApiPropertyOptional({ description: 'Activar encriptación' })
  activarEncript?: boolean;

  @ApiPropertyOptional({ description: 'Horas de encriptación lunes' })
  horasEncriptLunes?: number;

  @ApiPropertyOptional({ description: 'Horas de encriptación resto de días' })
  horasEncriptResto?: number;

  @ApiPropertyOptional({ description: 'Modo GPS', maxLength: 2 })
  modoGPS?: string;

  @ApiPropertyOptional({ description: 'Log GPS en minutos' })
  logGPSMinutos?: number;

  @ApiPropertyOptional({ description: 'Teléfono', maxLength: 50 })
  telefono?: string;

  @ApiPropertyOptional({ description: 'Móvil', maxLength: 50 })
  movil?: string;

  @ApiPropertyOptional({ description: 'ID de delegación OPT' })
  idDelegacionOPT?: number;

  @ApiPropertyOptional({ description: 'ID de delegación ERP', maxLength: 50 })
  idDelegacionERP?: string;

  @ApiPropertyOptional({ description: 'IMEI del dispositivo', maxLength: 250 })
  imeiDispositivo?: string;

  @ApiPropertyOptional({ description: 'ID del dispositivo' })
  idDispositivo?: number;

  @ApiPropertyOptional({ description: 'Actividad', maxLength: 1 })
  actividad?: string;

  @ApiPropertyOptional({ description: 'Indica si es inspector' })
  esInspector?: boolean;

  @ApiPropertyOptional({ description: 'Permite crear inspecciones desde PDA' })
  creacionInspeccionesPDA?: boolean;

  @ApiPropertyOptional({ description: 'Permite crear hojas desde PDA' })
  creacionHojasPDA?: boolean;

  @ApiPropertyOptional({ description: 'ID de plantillas OPT', maxLength: 4000 })
  idplantillasopt?: string;

  @ApiPropertyOptional({ description: 'GUID en el ERP' })
  guiderp?: string;

  @ApiPropertyOptional({ description: 'Permite modificar precio' })
  permitirmodificarprecio?: boolean;

  @ApiPropertyOptional({ description: 'Permite modificar descuento 1' })
  permitirmodificardto1?: boolean;

  @ApiPropertyOptional({ description: 'Permite modificar descuento 2' })
  permitirmodificardto2?: boolean;

  @ApiPropertyOptional({ description: 'ID de idioma predeterminado ERP', maxLength: 50 })
  ididiomapredeterminadoerp?: string;

  @ApiPropertyOptional({ description: 'ID de idioma predeterminado OPT' })
  ididiomapredeterminadoopt?: number;

  @ApiPropertyOptional({ description: 'ID del agente web', maxLength: 50 })
  idagenteweb?: string;

  @ApiPropertyOptional({ description: 'ID del almacén general OPT' })
  idalmacengeneralopt?: number;

  @ApiPropertyOptional({ description: 'ID del almacén tránsito OPT' })
  idalmacentransitoopt?: number;

  @ApiPropertyOptional({ description: 'ID del almacén general ERP', maxLength: 50 })
  idalmacengeneralerp?: string;

  @ApiPropertyOptional({ description: 'ID del almacén tránsito ERP', maxLength: 50 })
  idalmacentransitoerp?: string;

  @ApiPropertyOptional({ description: 'Versión de dispositivos', maxLength: 10 })
  versiondispositivos?: string;

  @ApiPropertyOptional({ description: 'Permite editar fecha de reparto' })
  permitireditarfechareparto?: boolean;

  @ApiPropertyOptional({ description: 'Fecha de envío de documentos' })
  fechaenviodocumentos?: Date;

  @ApiPropertyOptional({ description: 'Indica si corre rutas' })
  corerutas?: boolean;

  @ApiPropertyOptional({ description: 'Indica si es jefe de grupo' })
  jefedegrupo?: boolean;

  @ApiPropertyOptional({ description: 'Indica si está libre' })
  libre?: boolean;

  @ApiPropertyOptional({ description: 'Indica si es especialista' })
  especialista?: boolean;

  @ApiPropertyOptional({ description: 'Imprimir página completa' })
  imprimirpaginacompleta?: boolean;

  @ApiPropertyOptional({ description: 'MAC de la impresora', maxLength: 255 })
  macimpresora?: string;

  @ApiPropertyOptional({ description: 'Controlar cierre del día' })
  controlarcierredia?: boolean;

  @ApiPropertyOptional({ description: 'ID de subcontrata OPT' })
  idsubcontrataopt?: number;

  @ApiPropertyOptional({ description: 'Extensión de centralita' })
  extensioncentralita?: number;

  @ApiPropertyOptional({ description: 'Fecha de entrada TV' })
  fechaentradatv?: Date;

  @ApiPropertyOptional({ description: 'Tipo de ruta', maxLength: 50 })
  tiporuta?: string;

  @ApiPropertyOptional({ description: 'Código de cobro del agente', maxLength: 50 })
  codigocobroagente?: string;

  @ApiPropertyOptional({ description: 'Puede saltar E5' })
  puedesaltare5?: boolean;

  @ApiPropertyOptional({ description: 'ID del tipo de agente ERP', maxLength: 50 })
  idtipoagenteerp?: string;

  @ApiPropertyOptional({ description: 'Orden GPS' })
  ordengps?: number;

  @ApiPropertyOptional({ description: 'Servidor SMTP', maxLength: 100 })
  servidorsmtp?: string;

  @ApiPropertyOptional({ description: 'Usuario SMTP', maxLength: 100 })
  usuariosmtp?: string;

  @ApiPropertyOptional({ description: 'Contraseña SMTP', maxLength: 100 })
  passwordsmtp?: string;

  @ApiPropertyOptional({ description: 'Puerto SMTP' })
  puertosmtp?: number;

  @ApiPropertyOptional({ description: 'Permisos para crear contactos' })
  crearcontactos?: number;

  @ApiPropertyOptional({ description: 'Permisos para editar contactos' })
  editarcontactos?: number;

  @ApiPropertyOptional({ description: 'Categoría del agente' })
  categoriaagente?: number;

  @ApiPropertyOptional({ description: 'Contador de recibos' })
  contadorrecibos?: number;

  @ApiPropertyOptional({ description: 'Contador de facturas autónomo' })
  contadorfacturasautonomo?: number;

  @ApiPropertyOptional({ description: 'Serie de factura autónomo', maxLength: 50 })
  seriefacturaautonomo?: string;

  @ApiPropertyOptional({ description: 'Control de acceso' })
  controlacceso?: boolean;

  @ApiPropertyOptional({ description: 'Número de intentos' })
  numerointentos?: number;

  @ApiPropertyOptional({ description: 'Días de vigencia de la clave' })
  diasvigenciaclave?: number;

  @ApiPropertyOptional({ description: 'Días de clave sin uso' })
  diasclavesinuso?: number;

  @ApiPropertyOptional({ description: 'Indica si tiene control de stock' })
  tienectrlstock?: boolean;

  @ApiPropertyOptional({ description: 'Controlar riesgo' })
  controlarriesgo?: boolean;

  @ApiPropertyOptional({ description: 'Bloquear si supera el riesgo' })
  bloquearsisuperarriesgo?: boolean;

  @ApiPropertyOptional({ description: 'Alertar por porcentaje de riesgo' })
  alertarporcentajeriesgo?: boolean;

  @ApiPropertyOptional({ description: 'Porcentaje de riesgo', type: 'number', format: 'decimal' })
  porcentajeriesgo?: number;

  @ApiPropertyOptional({ description: 'Serie de abono', maxLength: 50 })
  serieabono?: string;

  @ApiPropertyOptional({ description: 'Contador de abonos' })
  contadorabonos?: number;

  @ApiPropertyOptional({ description: 'Permite vender bajo mínimo' })
  permitirvenderbajominimo?: boolean;

  @ApiPropertyOptional({ description: 'Permite recibir caja abierta' })
  permitirrecibircajaabierta?: boolean;

  @ApiPropertyOptional({ description: 'Contador de presupuestos' })
  contadorpresupuestos?: number;

  @ApiPropertyOptional({ description: 'Contador de clientes' })
  contadorclientes?: number;

  @ApiPropertyOptional({ description: 'Permite pedido en cliente bloqueado' })
  permitirpedidoenclientebloqueado?: number;

  @ApiPropertyOptional({ description: 'Contador de pedidos alternativa' })
  contadorpedidosalternativa?: number;

  @ApiPropertyOptional({ description: 'Serie de pedido alternativa', maxLength: 50 })
  seriepedidoalternativa?: string;

  @ApiPropertyOptional({ description: 'Hora de cierre del día automático' })
  horacierrediaautomatico?: Date;

  @ApiPropertyOptional({ description: 'Tiene resumen de cierre del día' })
  tieneresumencierredia?: boolean;

  @ApiPropertyOptional({ description: 'ID de cliente de regularización OPT' })
  idclienteregularizacionopt?: number;

  @ApiPropertyOptional({ description: 'Permite descuento especial' })
  permitedescuentoespecial?: boolean;

  @ApiPropertyOptional({ description: 'Permite vale' })
  permitevale?: boolean;

  @ApiPropertyOptional({ description: 'ID del tipo de artículo OPT' })
  idtipoarticuloopt?: number;

  @ApiPropertyOptional({ description: 'Fecha del último envío' })
  fechaultimoenvio?: Date;

  @ApiPropertyOptional({ description: 'Tipo de impresora', maxLength: 50 })
  tipoimpresora?: string;

  @ApiPropertyOptional({ description: 'Permite listar clientes' })
  permitelistarclientes?: boolean;

  @ApiPropertyOptional({ description: 'Número de clientes listados' })
  numclienteslistados?: number;

  @ApiPropertyOptional({ description: 'Número máximo de clientes listados' })
  nummaxclienteslistados?: number;

  @ApiPropertyOptional({ description: 'ID de tarea del dispositivo', maxLength: 50 })
  idtareadispositivo?: string;

  @ApiPropertyOptional({ description: 'Serie de presupuesto', maxLength: 100 })
  seriepresupuesto?: string;

  @ApiPropertyOptional({ description: 'Contador de facturas alternativa' })
  contadorfacturasalternativa?: number;

  @ApiPropertyOptional({ description: 'Serie de factura alternativa', maxLength: 50 })
  seriefacturaalternativa?: string;

  @ApiPropertyOptional({ description: 'Contador de albaranes alternativa' })
  contadoralbaranesalternativa?: number;

  @ApiPropertyOptional({ description: 'Serie de albarán alternativa', maxLength: 50 })
  seriealbaranalternativa?: string;

  @ApiPropertyOptional({ description: 'Permite informe' })
  permiteinforme?: number;

  @ApiPropertyOptional({ description: 'ID de cliente promoción OPT', maxLength: 50 })
  idclientepromoopt?: string;

  @ApiPropertyOptional({ description: 'ID de cliente promoción ERP', maxLength: 50 })
  idclientepromoerp?: string;

  @ApiPropertyOptional({ description: 'Permite protección de datos temporal' })
  permiteprotecciondatostemporal?: boolean;

  @ApiPropertyOptional({ description: 'Permite venta bajo coste' })
  permiteventabajocoste?: boolean;

  @ApiProperty({ description: 'Cargar en terminal' })
  cargarenterminal: number;

  @ApiPropertyOptional({ description: 'Cuenta de cobros', maxLength: 50 })
  cuentacobros?: string;

  @ApiPropertyOptional({ description: 'ID de empleado ERP', maxLength: 50 })
  idempleadoerp?: string;

  @ApiPropertyOptional({ description: 'Contador de albaranes de abono' })
  contadoralbaranesabono?: number;

  @ApiPropertyOptional({ description: 'ID del subtipo de agente' })
  idsubtipoagente?: number;

  @ApiPropertyOptional({ description: 'ID del vehículo' })
  idvehiculo?: number;

  @ApiPropertyOptional({ description: 'ID del vehículo ERP', maxLength: 50 })
  idvehiculoerp?: string;

  @ApiPropertyOptional({ description: 'Matrícula', maxLength: 50 })
  matricula?: string;

  @ApiPropertyOptional({ description: 'ID del transportista ERP', maxLength: 50 })
  idtransportistaerp?: string;

  @ApiPropertyOptional({ description: 'Días hábiles' })
  diashabiles?: number;

  @ApiPropertyOptional({ description: 'Número de días a aplazar' })
  numerodiasaplazar?: number;

  @ApiPropertyOptional({ description: 'Registrar GPS en bitácora' })
  registrargpsbitacora?: boolean;

  @ApiPropertyOptional({ description: 'ID de tarea de recarga desde ERP', maxLength: 50 })
  idtarearecargadesdeerp?: string;

  @ApiPropertyOptional({ description: 'ID de recarga ERP', maxLength: 50 })
  idrecargaerp?: string;
}
