import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

/**
 * Entidad alineada con la tabla [dbo].[Clientes].
 * PK: id. Schema según SELECT proporcionado.
 */
@Entity('Clientes')
export class Client {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'IdEmpresa', type: 'int', nullable: true })
  idEmpresa: number | null;

  @Column({ name: 'IdClienteFabricante', type: 'nvarchar', length: 100, nullable: true })
  idClienteFabricante: string | null;

  @Column({ name: 'IdCategoria', type: 'int', nullable: true })
  idCategoria: number | null;

  @Column({ name: 'Nombre', type: 'nvarchar', length: 256, nullable: true })
  nombre: string | null;

  @Column({ name: 'NombreFiscal', type: 'nvarchar', length: 256, nullable: true })
  nombreFiscal: string | null;

  @Column({ name: 'Cif', type: 'nvarchar', length: 20, nullable: true })
  cif: string | null;

  @Column({ name: 'Telefono', type: 'nvarchar', length: 50, nullable: true })
  telefono: string | null;

  @Column({ name: 'Fax', type: 'nvarchar', length: 50, nullable: true })
  fax: string | null;

  @Column({ name: 'Mail', type: 'nvarchar', length: 256, nullable: true })
  mail: string | null;

  @Column({ name: 'Telefono2', type: 'nvarchar', length: 50, nullable: true })
  telefono2: string | null;

  @Column({ name: 'Direccion', type: 'nvarchar', length: 500, nullable: true })
  direccion: string | null;

  @Column({ name: 'Dp', type: 'nvarchar', length: 20, nullable: true })
  dp: string | null;

  @Column({ name: 'IdProvinciaERP', type: 'nvarchar', length: 50, nullable: true })
  idProvinciaERP: string | null;

  @Column({ name: 'IdProvinciaOPT', type: 'int', nullable: true })
  idProvinciaOPT: number | null;

  @Column({ name: 'Provincia', type: 'nvarchar', length: 100, nullable: true })
  provincia: string | null;

  @Column({ name: 'IdPoblacionOPT', type: 'int', nullable: true })
  idPoblacionOPT: number | null;

  @Column({ name: 'IdPoblacionERP', type: 'nvarchar', length: 50, nullable: true })
  idPoblacionERP: string | null;

  @Column({ name: 'Poblacion', type: 'nvarchar', length: 100, nullable: true })
  poblacion: string | null;

  @Column({ name: 'Nacion', type: 'nvarchar', length: 100, nullable: true })
  nacion: string | null;

  @Column({ name: 'Contacto', type: 'nvarchar', length: 256, nullable: true })
  contacto: string | null;

  @Column({ name: 'Observaciones', type: 'nvarchar', length: 4000, nullable: true })
  observaciones: string | null;

  @Column({ name: 'Equivalencia', type: 'nvarchar', length: 100, nullable: true })
  equivalencia: string | null;

  @Column({ name: 'Vencimientos', type: 'nvarchar', length: 100, nullable: true })
  vencimientos: string | null;

  @Column({ name: 'Fecha', type: 'datetime', nullable: true })
  fecha: Date | null;

  @Column({ name: 'IdPagoOPT', type: 'int', nullable: true })
  idPagoOPT: number | null;

  @Column({ name: 'IdPagoERP', type: 'nvarchar', length: 50, nullable: true })
  idPagoERP: string | null;

  @Column({ name: 'Pago', type: 'nvarchar', length: 100, nullable: true })
  pago: string | null;

  @Column({ name: 'Banco', type: 'nvarchar', length: 256, nullable: true })
  banco: string | null;

  @Column({ name: 'Cuenta', type: 'nvarchar', length: 50, nullable: true })
  cuenta: string | null;

  @Column({ name: 'CodigoBanco', type: 'nvarchar', length: 20, nullable: true })
  codigoBanco: string | null;

  @Column({ name: 'CodigoAgencia', type: 'nvarchar', length: 20, nullable: true })
  codigoAgencia: string | null;

  @Column({ name: 'DigitoControl', type: 'nvarchar', length: 10, nullable: true })
  digitoControl: string | null;

  @Column({ name: 'Anulado', type: 'bit', nullable: true })
  anulado: boolean | null;

  @Column({ name: 'IdTipoClienteOPT', type: 'int', nullable: true })
  idTipoClienteOPT: number | null;

  @Column({ name: 'IdTipoClienteERP', type: 'nvarchar', length: 50, nullable: true })
  idTipoClienteERP: string | null;

  @Column({ name: 'TipoCliente', type: 'nvarchar', length: 100, nullable: true })
  tipoCliente: string | null;

  @Column({ name: 'IdActividadOPT', type: 'int', nullable: true })
  idActividadOPT: number | null;

  @Column({ name: 'IdActividadERP', type: 'nvarchar', length: 50, nullable: true })
  idActividadERP: string | null;

  @Column({ name: 'Actividad', type: 'nvarchar', length: 100, nullable: true })
  actividad: string | null;

  @Column({ name: 'IdRutaOPT', type: 'int', nullable: true })
  idRutaOPT: number | null;

  @Column({ name: 'IdRutaERP', type: 'nvarchar', length: 50, nullable: true })
  idRutaERP: string | null;

  @Column({ name: 'Ruta', type: 'nvarchar', length: 100, nullable: true })
  ruta: string | null;

  @Column({ name: 'OrdenRuta', type: 'int', nullable: true })
  ordenRuta: number | null;

  @Column({ name: 'Zona', type: 'nvarchar', length: 100, nullable: true })
  zona: string | null;

  @Column({ name: 'Web', type: 'nvarchar', length: 256, nullable: true })
  web: string | null;

  @Column({ name: 'ExentoIva', type: 'bit', nullable: true })
  exentoIva: boolean | null;

  @Column({ name: 'CodigoGrupo', type: 'nvarchar', length: 50, nullable: true })
  codigoGrupo: string | null;

  @Column({ name: 'PlazoEntrega', type: 'int', nullable: true })
  plazoEntrega: number | null;

  @Column({ name: 'Potencial', type: 'float', nullable: true })
  potencial: number | null;

  @Column({ name: 'IdAgenciaOPT', type: 'int', nullable: true })
  idAgenciaOPT: number | null;

  @Column({ name: 'IdAgenciaERP', type: 'nvarchar', length: 50, nullable: true })
  idAgenciaERP: string | null;

  @Column({ name: 'Agencia', type: 'nvarchar', length: 100, nullable: true })
  agencia: string | null;

  @Column({ name: 'Privado', type: 'bit', nullable: true })
  privado: boolean | null;

  @Column({ name: 'Tarifa', type: 'nvarchar', length: 50, nullable: true })
  tarifa: string | null;

  @Column({ name: 'NotasPedido', type: 'nvarchar', length: 500, nullable: true })
  notasPedido: string | null;

  @Column({ name: 'Lunes', type: 'bit', nullable: true })
  lunes: boolean | null;

  @Column({ name: 'Martes', type: 'bit', nullable: true })
  martes: boolean | null;

  @Column({ name: 'Miercoles', type: 'bit', nullable: true })
  miercoles: boolean | null;

  @Column({ name: 'Jueves', type: 'bit', nullable: true })
  jueves: boolean | null;

  @Column({ name: 'Viernes', type: 'bit', nullable: true })
  viernes: boolean | null;

  @Column({ name: 'Sabado', type: 'bit', nullable: true })
  sabado: boolean | null;

  @Column({ name: 'LunesHorario', type: 'nvarchar', length: 50, nullable: true })
  lunesHorario: string | null;

  @Column({ name: 'MartesHorario', type: 'nvarchar', length: 50, nullable: true })
  martesHorario: string | null;

  @Column({ name: 'MiercolesHorario', type: 'nvarchar', length: 50, nullable: true })
  miercolesHorario: string | null;

  @Column({ name: 'JuevesHorario', type: 'nvarchar', length: 50, nullable: true })
  juevesHorario: string | null;

  @Column({ name: 'ViernesHorario', type: 'nvarchar', length: 50, nullable: true })
  viernesHorario: string | null;

  @Column({ name: 'SabadoHorario', type: 'nvarchar', length: 50, nullable: true })
  sabadoHorario: string | null;

  @Column({ name: 'LunesCierre', type: 'nvarchar', length: 50, nullable: true })
  lunesCierre: string | null;

  @Column({ name: 'MartesCierre', type: 'nvarchar', length: 50, nullable: true })
  martesCierre: string | null;

  @Column({ name: 'MiercolesCierre', type: 'nvarchar', length: 50, nullable: true })
  miercolesCierre: string | null;

  @Column({ name: 'JuevesCierre', type: 'nvarchar', length: 50, nullable: true })
  juevesCierre: string | null;

  @Column({ name: 'ViernesCierre', type: 'nvarchar', length: 50, nullable: true })
  viernesCierre: string | null;

  @Column({ name: 'SabadoCierre', type: 'nvarchar', length: 50, nullable: true })
  sabadoCierre: string | null;

  @Column({ name: 'Alerta', type: 'nvarchar', length: 500, nullable: true })
  alerta: string | null;

  @Column({ name: 'Periodicidad', type: 'nvarchar', length: 50, nullable: true })
  periodicidad: string | null;

  @Column({ name: 'Identificador', type: 'nvarchar', length: 100, nullable: true })
  identificador: string | null;

  @Column({ name: 'FechaModificacion', type: 'datetime', nullable: true })
  fechaModificacion: Date | null;

  @Column({ name: 'FechaSincronizacion', type: 'datetime', nullable: true })
  fechaSincronizacion: Date | null;

  @Column({ name: 'Latitud', type: 'float', nullable: true })
  latitud: number | null;

  @Column({ name: 'Longitud', type: 'float', nullable: true })
  longitud: number | null;

  @Column({ name: 'Numero', type: 'nvarchar', length: 20, nullable: true })
  numero: string | null;

  @Column({ name: 'Piso', type: 'nvarchar', length: 20, nullable: true })
  piso: string | null;

  @Column({ name: 'UltimaVisita', type: 'datetime', nullable: true })
  ultimaVisita: Date | null;

  @Column({ name: 'TieneClasificaciones', type: 'bit', nullable: true })
  tieneClasificaciones: boolean | null;

  @Column({ name: 'IdClienteERP', type: 'nvarchar', length: 100, nullable: true })
  idClienteERP: string | null;

  @Column({ name: 'IdTipoIva', type: 'int', nullable: true })
  idTipoIva: number | null;

  @Column({ name: 'IdTipoIvaERP', type: 'nvarchar', length: 50, nullable: true })
  idTipoIvaERP: string | null;

  @Column({ name: 'IdCategoriaERP', type: 'nvarchar', length: 50, nullable: true })
  idCategoriaERP: string | null;

  @Column({ name: 'RiesgoActual', type: 'float', nullable: true })
  riesgoActual: number | null;

  @Column({ name: 'RiesgoMaximo', type: 'float', nullable: true })
  riesgoMaximo: number | null;

  @Column({ name: 'RiesgoEstimado', type: 'float', nullable: true })
  riesgoEstimado: number | null;

  @Column({ name: 'IdEmpresaERP', type: 'nvarchar', length: 50, nullable: true })
  idEmpresaERP: string | null;

  @Column({ name: 'IdRegistroPDA', type: 'int', nullable: true })
  idRegistroPDA: number | null;

  @Column({ name: 'FechaInsert', type: 'datetime', nullable: true })
  fechaInsert: Date | null;

  @Column({ name: 'FechaUpdate', type: 'datetime', nullable: true })
  fechaUpdate: Date | null;

  @Column({ name: 'IdAgentePropietario', type: 'int', nullable: true })
  idAgentePropietario: number | null;

  @Column({ name: 'IdAgenteUpdate', type: 'int', nullable: true })
  idAgenteUpdate: number | null;

  @Column({ name: 'TipoDocumento', type: 'nvarchar', length: 10, nullable: true })
  tipoDocumento: string | null;

  @Column({ name: 'DocumentoValorado', type: 'bit', nullable: true })
  documentoValorado: boolean | null;

  @Column({ name: 'ImprimirLote', type: 'bit', nullable: true })
  imprimirLote: boolean | null;

  @Column({ name: 'DtoContado', type: 'float', nullable: true })
  dtoContado: number | null;

  @Column({ name: 'Busqueda', type: 'nvarchar', length: 500, nullable: true })
  busqueda: string | null;

  @Column({ name: 'DireccionEnv', type: 'nvarchar', length: 500, nullable: true })
  direccionEnv: string | null;

  @Column({ name: 'PoblacionEnv', type: 'nvarchar', length: 100, nullable: true })
  poblacionEnv: string | null;

  @Column({ name: 'DPEnv', type: 'nvarchar', length: 20, nullable: true })
  dpEnv: string | null;

  @Column({ name: 'Portes', type: 'nvarchar', length: 50, nullable: true })
  portes: string | null;

  @Column({ name: 'UsuarioSINLI', type: 'nvarchar', length: 100, nullable: true })
  usuarioSINLI: string | null;

  @Column({ name: 'CorreoSINLI', type: 'nvarchar', length: 256, nullable: true })
  correoSINLI: string | null;

  @Column({ name: 'TieneDeposito', type: 'bit', nullable: true })
  tieneDeposito: boolean | null;

  @Column({ name: 'Desactivado', type: 'bit', nullable: true })
  desactivado: boolean | null;

  @Column({ name: 'Sel', type: 'bit', nullable: true })
  sel: boolean | null;

  @Column({ name: 'IdMedioPagoOPT', type: 'int', nullable: true })
  idMedioPagoOPT: number | null;

  @Column({ name: 'IdMedioPagoERP', type: 'nvarchar', length: 50, nullable: true })
  idMedioPagoERP: string | null;

  @Column({ name: 'IdCentro_BAK', type: 'int', nullable: true })
  idCentro_BAK: number | null;

  @Column({ name: 'Dto1', type: 'float', nullable: true })
  dto1: number | null;

  @Column({ name: 'Dto2', type: 'float', nullable: true })
  dto2: number | null;

  @Column({ name: 'Dto3', type: 'float', nullable: true })
  dto3: number | null;

  @Column({ name: 'Dto4', type: 'float', nullable: true })
  dto4: number | null;

  @Column({ name: 'AplicacionDescuentos', type: 'nvarchar', length: 50, nullable: true })
  aplicacionDescuentos: string | null;

  @Column({ name: 'Dto1Tipo', type: 'nvarchar', length: 20, nullable: true })
  dto1Tipo: string | null;

  @Column({ name: 'Promocion', type: 'bit', nullable: true })
  promocion: boolean | null;

  @Column({ name: 'IdGrupoOPT', type: 'int', nullable: true })
  idGrupoOPT: number | null;

  @Column({ name: 'IdGrupoERP', type: 'nvarchar', length: 50, nullable: true })
  idGrupoERP: string | null;

  @Column({ name: 'TipoVenta', type: 'nvarchar', length: 50, nullable: true })
  tipoVenta: string | null;

  @Column({ name: 'IdTarifaOPT', type: 'int', nullable: true })
  idTarifaOPT: number | null;

  @Column({ name: 'IdTarifaERP', type: 'nvarchar', length: 50, nullable: true })
  idTarifaERP: string | null;

  @Column({ name: 'BajaEnERP', type: 'bit', nullable: true })
  bajaEnERP: boolean | null;

  @Column({ name: 'PeriodoCierreDesde', type: 'datetime', nullable: true })
  periodoCierreDesde: Date | null;

  @Column({ name: 'PeriodoCierreHasta', type: 'datetime', nullable: true })
  periodoCierreHasta: Date | null;

  @Column({ name: 'PermitirEntregaACuenta', type: 'bit', nullable: true })
  permitirEntregaACuenta: boolean | null;

  @Column({ name: 'Dto', type: 'float', nullable: true })
  dto: number | null;

  @Column({ name: 'DtoRappel', type: 'float', nullable: true })
  dtoRappel: number | null;

  @Column({ name: 'DtoPP', type: 'float', nullable: true })
  dtoPP: number | null;

  @Column({ name: 'LunesReparto', type: 'bit', nullable: true })
  lunesReparto: boolean | null;

  @Column({ name: 'MartesReparto', type: 'bit', nullable: true })
  martesReparto: boolean | null;

  @Column({ name: 'MiercolesReparto', type: 'bit', nullable: true })
  miercolesReparto: boolean | null;

  @Column({ name: 'JuevesReparto', type: 'bit', nullable: true })
  juevesReparto: boolean | null;

  @Column({ name: 'ViernesReparto', type: 'bit', nullable: true })
  viernesReparto: boolean | null;

  @Column({ name: 'SabadoReparto', type: 'bit', nullable: true })
  sabadoReparto: boolean | null;

  @Column({ name: 'DomingoReparto', type: 'bit', nullable: true })
  domingoReparto: boolean | null;

  @Column({ name: 'DomingoCierre', type: 'nvarchar', length: 50, nullable: true })
  domingoCierre: string | null;

  @Column({ name: 'Domingo', type: 'bit', nullable: true })
  domingo: boolean | null;

  @Column({ name: 'DomingoHorario', type: 'nvarchar', length: 50, nullable: true })
  domingoHorario: string | null;

  @Column({ name: 'HoraIniMan', type: 'nvarchar', length: 20, nullable: true })
  horaIniMan: string | null;

  @Column({ name: 'HoraFinMan', type: 'nvarchar', length: 20, nullable: true })
  horaFinMan: string | null;

  @Column({ name: 'HoraIniTarde', type: 'nvarchar', length: 20, nullable: true })
  horaIniTarde: string | null;

  @Column({ name: 'HoraFinTarde', type: 'nvarchar', length: 20, nullable: true })
  horaFinTarde: string | null;

  @Column({ name: 'IdSegmentoERP', type: 'nvarchar', length: 50, nullable: true })
  idSegmentoERP: string | null;

  @Column({ name: 'IdSegmentoOPT', type: 'int', nullable: true })
  idSegmentoOPT: number | null;

  @Column({ name: 'Segmento', type: 'nvarchar', length: 100, nullable: true })
  segmento: string | null;

  @Column({ name: 'IdPaisERP', type: 'nvarchar', length: 50, nullable: true })
  idPaisERP: string | null;

  @Column({ name: 'IdPaisOPT', type: 'int', nullable: true })
  idPaisOPT: number | null;

  @Column({ name: 'Pais', type: 'nvarchar', length: 100, nullable: true })
  pais: string | null;

  @Column({ name: 'Precision', type: 'float', nullable: true })
  precision: number | null;

  @Column({ name: 'FechaHoraGPS', type: 'datetime', nullable: true })
  fechaHoraGPS: Date | null;

  @Column({ name: 'PERMITEOFERTA', type: 'bit', nullable: true })
  permiteOferta: boolean | null;

  @Column({ name: 'DIASPAGO', type: 'int', nullable: true })
  diasPago: number | null;

  @Column({ name: 'CANTIDADCUENTA', type: 'int', nullable: true })
  cantidadCuenta: number | null;

  @Column({ name: 'TOTALPUNTOS', type: 'float', nullable: true })
  totalPuntos: number | null;

  @Column({ name: 'NOCARGOREPARTO', type: 'bit', nullable: true })
  noCargoReparto: boolean | null;

  @Column({ name: 'GuidERP', type: 'uniqueidentifier', nullable: true })
  guidERP: string | null;

  @Column({ name: 'TarifaPredefinida', type: 'nvarchar', length: 50, nullable: true })
  tarifaPredefinida: string | null;

  @Column({ name: 'EsContado', type: 'bit', nullable: true })
  esContado: boolean | null;

  @Column({ name: 'IdMotivoBajaOPT', type: 'int', nullable: true })
  idMotivoBajaOPT: number | null;

  @Column({ name: 'IdMotivoBajaERP', type: 'nvarchar', length: 50, nullable: true })
  idMotivoBajaERP: string | null;

  @Column({ name: 'SEXO', type: 'nvarchar', length: 10, nullable: true })
  sexo: string | null;

  @Column({ name: 'BLOQUEODTO', type: 'bit', nullable: true })
  bloqueoDto: boolean | null;

  @Column({ name: 'CLIENTEWEB', type: 'bit', nullable: true })
  clienteWeb: boolean | null;

  @Column({ name: 'DEUDAPREVISTA', type: 'float', nullable: true })
  deudaPrevista: number | null;

  @Column({ name: 'NOAPLICAECOTASA', type: 'bit', nullable: true })
  noAplicaEcotasa: boolean | null;

  @Column({ name: 'IDAGENTEERP', type: 'nvarchar', length: 50, nullable: true })
  idAgenteERP: string | null;

  @Column({ name: 'IDAGENTEOPT', type: 'int', nullable: true })
  idAgenteOPT: number | null;

  @Column({ name: 'FISCALDIRECCION', type: 'nvarchar', length: 500, nullable: true })
  fiscalDireccion: string | null;

  @Column({ name: 'FISCALPOBLACION', type: 'nvarchar', length: 100, nullable: true })
  fiscalPoblacion: string | null;

  @Column({ name: 'FISCALPROVINCIA', type: 'nvarchar', length: 100, nullable: true })
  fiscalProvincia: string | null;

  @Column({ name: 'FISCALDP', type: 'nvarchar', length: 20, nullable: true })
  fiscalDP: string | null;

  @Column({ name: 'FISCALPAIS', type: 'nvarchar', length: 100, nullable: true })
  fiscalPais: string | null;

  @Column({ name: 'IMPORTEPEDIDOMINIMO', type: 'float', nullable: true })
  importePedidoMinimo: number | null;

  @Column({ name: 'CARGOFINANCIERO', type: 'float', nullable: true })
  cargoFinanciero: number | null;

  @Column({ name: 'OBLIGATORIOCOBRAR', type: 'bit', nullable: true })
  obligatorioCobrar: boolean | null;

  @Column({ name: 'CODIGOCLIENTEANTERIOR', type: 'nvarchar', length: 50, nullable: true })
  codigoClienteAnterior: string | null;

  @Column({ name: 'IDCLIENTEWEB', type: 'int', nullable: true })
  idClienteWeb: number | null;

  @Column({ name: 'IDPAGOWEB', type: 'int', nullable: true })
  idPagoWeb: number | null;

  @Column({ name: 'IDPAISWEB', type: 'int', nullable: true })
  idPaisWeb: number | null;

  @Column({ name: 'IDSEGMENTOWEB', type: 'int', nullable: true })
  idSegmentoWeb: number | null;

  @Column({ name: 'IDTIPOIVAWEB', type: 'int', nullable: true })
  idTipoIvaWeb: number | null;

  @Column({ name: 'IDTIPOCLIENTEWEB', type: 'int', nullable: true })
  idTipoClienteWeb: number | null;

  @Column({ name: 'IDACTIVIDADWEB', type: 'int', nullable: true })
  idActividadWeb: number | null;

  @Column({ name: 'IDFACTURACIONOPT', type: 'int', nullable: true })
  idFacturacionOPT: number | null;

  @Column({ name: 'IDFACTURACIONERP', type: 'nvarchar', length: 50, nullable: true })
  idFacturacionERP: string | null;

  @Column({ name: 'HORAINIMANREPARTO', type: 'nvarchar', length: 20, nullable: true })
  horaIniManReparto: string | null;

  @Column({ name: 'HORAFINMANREPARTO', type: 'nvarchar', length: 20, nullable: true })
  horaFinManReparto: string | null;

  @Column({ name: 'HORAINITARDEREPARTO', type: 'nvarchar', length: 20, nullable: true })
  horaIniTardeReparto: string | null;

  @Column({ name: 'HORAFINTARDEREPARTO', type: 'nvarchar', length: 20, nullable: true })
  horaFinTardeReparto: string | null;

  @Column({ name: 'INTERVALOREPARTO', type: 'int', nullable: true })
  intervaloReparto: number | null;

  @Column({ name: 'DEUDACLIENTEERP', type: 'float', nullable: true })
  deudaClienteERP: number | null;

  @Column({ name: 'NOFUERARUTA', type: 'bit', nullable: true })
  noFueraRuta: boolean | null;

  @Column({ name: 'PUNTOVERDEINCLUIDO', type: 'bit', nullable: true })
  puntoVerdeIncluido: boolean | null;

  @Column({ name: 'IdClaseClienteOPT', type: 'int', nullable: true })
  idClaseClienteOPT: number | null;

  @Column({ name: 'HoraIniManPromo', type: 'nvarchar', length: 20, nullable: true })
  horaIniManPromo: string | null;

  @Column({ name: 'HoraFinManPromo', type: 'nvarchar', length: 20, nullable: true })
  horaFinManPromo: string | null;

  @Column({ name: 'HoraIniTardePromo', type: 'nvarchar', length: 20, nullable: true })
  horaIniTardePromo: string | null;

  @Column({ name: 'HoraFinTardePromo', type: 'nvarchar', length: 20, nullable: true })
  horaFinTardePromo: string | null;

  @Column({ name: 'HoraIniManTele', type: 'nvarchar', length: 20, nullable: true })
  horaIniManTele: string | null;

  @Column({ name: 'HoraFinManTele', type: 'nvarchar', length: 20, nullable: true })
  horaFinManTele: string | null;

  @Column({ name: 'HoraIniTardeTele', type: 'nvarchar', length: 20, nullable: true })
  horaIniTardeTele: string | null;

  @Column({ name: 'HoraFinTardeTele', type: 'nvarchar', length: 20, nullable: true })
  horaFinTardeTele: string | null;

  @Column({ name: 'EmailAlbaranes', type: 'nvarchar', length: 256, nullable: true })
  emailAlbaranes: string | null;

  @Column({ name: 'VecesVisitadas', type: 'int', nullable: true })
  vecesVisitadas: number | null;

  @Column({ name: 'ClienteAsignado', type: 'bit', nullable: true })
  clienteAsignado: boolean | null;

  @Column({ name: 'Brick', type: 'nvarchar', length: 100, nullable: true })
  brick: string | null;

  @Column({ name: 'HoraIniTar', type: 'nvarchar', length: 20, nullable: true })
  horaIniTar: string | null;

  @Column({ name: 'HoraFinTar', type: 'nvarchar', length: 20, nullable: true })
  horaFinTar: string | null;

  @Column({ name: 'TipoFactura', type: 'nvarchar', length: 50, nullable: true })
  tipoFactura: string | null;

  @Column({ name: 'IdDelegacionOPT', type: 'int', nullable: true })
  idDelegacionOPT: number | null;

  @Column({ name: 'IdDelegacionERP', type: 'nvarchar', length: 50, nullable: true })
  idDelegacionERP: string | null;

  @Column({ name: 'TieneCanales', type: 'bit', nullable: true })
  tieneCanales: boolean | null;

  @Column({ name: 'TieneDelegaciones', type: 'bit', nullable: true })
  tieneDelegaciones: boolean | null;

  @Column({ name: 'FrecuenciaCompra', type: 'nvarchar', length: 50, nullable: true })
  frecuenciaCompra: string | null;

  @Column({ name: 'IdCanalOPT', type: 'int', nullable: true })
  idCanalOPT: number | null;

  @Column({ name: 'IdCanalERP', type: 'nvarchar', length: 50, nullable: true })
  idCanalERP: string | null;

  @Column({ name: 'IdZonaOPT', type: 'int', nullable: true })
  idZonaOPT: number | null;

  @Column({ name: 'IdZonaERP', type: 'nvarchar', length: 50, nullable: true })
  idZonaERP: string | null;

  @Column({ name: 'ExentoEcotasa', type: 'bit', nullable: true })
  exentoEcotasa: boolean | null;

  @Column({ name: 'Canal', type: 'nvarchar', length: 100, nullable: true })
  canal: string | null;

  @Column({ name: 'ContactoTeleventa', type: 'nvarchar', length: 256, nullable: true })
  contactoTeleventa: string | null;

  @Column({ name: 'Bloqueado', type: 'bit', nullable: true })
  bloqueado: boolean | null;

  @Column({ name: 'ExentoPromos', type: 'bit', nullable: true })
  exentoPromos: boolean | null;

  @Column({ name: 'LlamarDesde', type: 'nvarchar', length: 20, nullable: true })
  llamarDesde: string | null;

  @Column({ name: 'LlamarHasta', type: 'nvarchar', length: 20, nullable: true })
  llamarHasta: string | null;

  @Column({ name: 'NoLlamarDesde', type: 'nvarchar', length: 20, nullable: true })
  noLlamarDesde: string | null;

  @Column({ name: 'NoLlamarHasta', type: 'nvarchar', length: 20, nullable: true })
  noLlamarHasta: string | null;

  @Column({ name: 'IdClaseClienteERP', type: 'nvarchar', length: 50, nullable: true })
  idClaseClienteERP: string | null;

  @Column({ name: 'TipoServicio', type: 'nvarchar', length: 50, nullable: true })
  tipoServicio: string | null;

  @Column({ name: 'MotivoNoSD', type: 'nvarchar', length: 500, nullable: true })
  motivoNoSD: string | null;

  @Column({ name: 'TipoLog', type: 'nvarchar', length: 50, nullable: true })
  tipoLog: string | null;

  @Column({ name: 'ClienteFinal', type: 'bit', nullable: true })
  clienteFinal: boolean | null;

  @Column({ name: 'OrdenFiltro', type: 'int', nullable: true })
  ordenFiltro: number | null;

  @Column({ name: 'IdTeleventaActiva', type: 'int', nullable: true })
  idTeleventaActiva: number | null;

  @Column({ name: 'Observaciones2', type: 'nvarchar', length: 4000, nullable: true })
  observaciones2: string | null;

  @Column({ name: 'TotalEconomico', type: 'float', nullable: true })
  totalEconomico: number | null;

  @Column({ name: 'Implantacion', type: 'nvarchar', length: 100, nullable: true })
  implantacion: string | null;

  @Column({ name: 'CodigoTienda', type: 'nvarchar', length: 50, nullable: true })
  codigoTienda: string | null;

  @Column({ name: 'CodigoImplantacion', type: 'nvarchar', length: 50, nullable: true })
  codigoImplantacion: string | null;

  @Column({ name: 'IdSuperCentralOPT', type: 'int', nullable: true })
  idSuperCentralOPT: number | null;

  @Column({ name: 'IdCentralOPT', type: 'int', nullable: true })
  idCentralOPT: number | null;

  @Column({ name: 'IdDescripcionCentroOPT', type: 'int', nullable: true })
  idDescripcionCentroOPT: number | null;

  @Column({ name: 'IdTipoClusterOPT', type: 'int', nullable: true })
  idTipoClusterOPT: number | null;

  @Column({ name: 'IdLineaNegocioOPT', type: 'int', nullable: true })
  idLineaNegocioOPT: number | null;

  @Column({ name: 'IdSuperCentralERP', type: 'nvarchar', length: 50, nullable: true })
  idSuperCentralERP: string | null;

  @Column({ name: 'IdCentralERP', type: 'nvarchar', length: 50, nullable: true })
  idCentralERP: string | null;

  @Column({ name: 'IdDescripcionCentroERP', type: 'nvarchar', length: 50, nullable: true })
  idDescripcionCentroERP: string | null;

  @Column({ name: 'IdTipoClusterERP', type: 'nvarchar', length: 50, nullable: true })
  idTipoClusterERP: string | null;

  @Column({ name: 'IdLineaNegocioERP', type: 'nvarchar', length: 50, nullable: true })
  idLineaNegocioERP: string | null;

  @Column({ name: 'GPV', type: 'float', nullable: true })
  gpv: number | null;

  @Column({ name: 'NroSalidasCaja', type: 'int', nullable: true })
  nroSalidasCaja: number | null;

  @Column({ name: 'EsPartner', type: 'bit', nullable: true })
  esPartner: boolean | null;

  @Column({ name: 'IdSegmentacion1ERP', type: 'nvarchar', length: 50, nullable: true })
  idSegmentacion1ERP: string | null;

  @Column({ name: 'IdSegmentacion2ERP', type: 'nvarchar', length: 50, nullable: true })
  idSegmentacion2ERP: string | null;

  @Column({ name: 'IdSegmentacion3ERP', type: 'nvarchar', length: 50, nullable: true })
  idSegmentacion3ERP: string | null;

  @Column({ name: 'IdSegmentacion4ERP', type: 'nvarchar', length: 50, nullable: true })
  idSegmentacion4ERP: string | null;

  @Column({ name: 'IdSegmentacion5ERP', type: 'nvarchar', length: 50, nullable: true })
  idSegmentacion5ERP: string | null;

  @Column({ name: 'IdSegmentacion6ERP', type: 'nvarchar', length: 50, nullable: true })
  idSegmentacion6ERP: string | null;

  @Column({ name: 'IdSegmentacion7ERP', type: 'nvarchar', length: 50, nullable: true })
  idSegmentacion7ERP: string | null;

  @Column({ name: 'IdSegmentacion8ERP', type: 'nvarchar', length: 50, nullable: true })
  idSegmentacion8ERP: string | null;

  @Column({ name: 'IdSegmentacion9ERP', type: 'nvarchar', length: 50, nullable: true })
  idSegmentacion9ERP: string | null;

  @Column({ name: 'IdSegmentacion10ERP', type: 'nvarchar', length: 50, nullable: true })
  idSegmentacion10ERP: string | null;

  @Column({ name: 'IdJerarquia1ERP', type: 'nvarchar', length: 50, nullable: true })
  idJerarquia1ERP: string | null;

  @Column({ name: 'IdJerarquia2ERP', type: 'nvarchar', length: 50, nullable: true })
  idJerarquia2ERP: string | null;

  @Column({ name: 'IdJerarquia3ERP', type: 'nvarchar', length: 50, nullable: true })
  idJerarquia3ERP: string | null;

  @Column({ name: 'IdSegmentacion1', type: 'int', nullable: true })
  idSegmentacion1: number | null;

  @Column({ name: 'IdSegmentacion2', type: 'int', nullable: true })
  idSegmentacion2: number | null;

  @Column({ name: 'IdSegmentacion3', type: 'int', nullable: true })
  idSegmentacion3: number | null;

  @Column({ name: 'IdSegmentacion4', type: 'int', nullable: true })
  idSegmentacion4: number | null;

  @Column({ name: 'IdSegmentacion5', type: 'int', nullable: true })
  idSegmentacion5: number | null;

  @Column({ name: 'IdSegmentacion6', type: 'int', nullable: true })
  idSegmentacion6: number | null;

  @Column({ name: 'IdSegmentacion7', type: 'int', nullable: true })
  idSegmentacion7: number | null;

  @Column({ name: 'IdSegmentacion8', type: 'int', nullable: true })
  idSegmentacion8: number | null;

  @Column({ name: 'IdSegmentacion9', type: 'int', nullable: true })
  idSegmentacion9: number | null;

  @Column({ name: 'IdSegmentacion10', type: 'int', nullable: true })
  idSegmentacion10: number | null;

  @Column({ name: 'IdJerarquia1', type: 'int', nullable: true })
  idJerarquia1: number | null;

  @Column({ name: 'IdJerarquia2', type: 'int', nullable: true })
  idJerarquia2: number | null;

  @Column({ name: 'IdJerarquia3', type: 'int', nullable: true })
  idJerarquia3: number | null;

  @Column({ name: 'EstaActivo', type: 'bit', nullable: true })
  estaActivo: boolean | null;

  @Column({ name: 'EspacioObjetivoLinealSecundario', type: 'float', nullable: true })
  espacioObjetivoLinealSecundario: number | null;

  @Column({ name: 'EspacioObjetivoLinealPrincipal', type: 'float', nullable: true })
  espacioObjetivoLinealPrincipal: number | null;

  @Column({ name: 'EspacioObjetivoFabricanteMarcaPrincipal', type: 'float', nullable: true })
  espacioObjetivoFabricanteMarcaPrincipal: number | null;

  @Column({ name: 'EspacioObjetivoMarcaPrincipal', type: 'float', nullable: true })
  espacioObjetivoMarcaPrincipal: number | null;

  @Column({ name: 'EspacioObjetivoFabricanteMarcaSecundaria', type: 'float', nullable: true })
  espacioObjetivoFabricanteMarcaSecundaria: number | null;

  @Column({ name: 'EspacioObjetivoMarcaSecundaria', type: 'float', nullable: true })
  espacioObjetivoMarcaSecundaria: number | null;

  @Column({ name: 'CodAgenteFab', type: 'nvarchar', length: 50, nullable: true })
  codAgenteFab: string | null;

  @Column({ name: 'IdClientePropuesto', type: 'int', nullable: true })
  idClientePropuesto: number | null;

  @Column({ name: 'IdLocalERP', type: 'nvarchar', length: 50, nullable: true })
  idLocalERP: string | null;

  @Column({ name: 'ImporteMinimoPedidos', type: 'float', nullable: true })
  importeMinimoPedidos: number | null;

  @Column({ name: 'RutaRepartoERP', type: 'nvarchar', length: 50, nullable: true })
  rutaRepartoERP: string | null;

  @Column({ name: 'DocumentosPendientesPermitidos', type: 'int', nullable: true })
  documentosPendientesPermitidos: number | null;

  @Column({ name: 'IdAltaMOB', type: 'int', nullable: true })
  idAltaMOB: number | null;

  @Column({ name: 'IdDispositivo', type: 'nvarchar', length: 50, nullable: true })
  idDispositivo: string | null;

  @Column({ name: 'IdRutaRepartoERP', type: 'nvarchar', length: 50, nullable: true })
  idRutaRepartoERP: string | null;

  @Column({ name: 'IdRutaReparto', type: 'int', nullable: true })
  idRutaReparto: number | null;

  @Column({ name: 'IdProceso', type: 'int', nullable: true })
  idProceso: number | null;

  @Column({ name: 'IdCargoVenta', type: 'int', nullable: true })
  idCargoVenta: number | null;

  @Column({ name: 'IdCargoVentaERP', type: 'nvarchar', length: 50, nullable: true })
  idCargoVentaERP: string | null;

  @Column({ name: 'TieneControlCredito', type: 'bit', nullable: true })
  tieneControlCredito: boolean | null;

  @Column({ name: 'Valoracion', type: 'nvarchar', length: 50, nullable: true })
  valoracion: string | null;

  @Column({ name: 'Categoria', type: 'nvarchar', length: 100, nullable: true })
  categoria: string | null;

  @Column({ name: 'IdCentro', type: 'int', nullable: true })
  idCentro: number | null;

  @Column({ name: 'IdCentroERP', type: 'nvarchar', length: 50, nullable: true })
  idCentroERP: string | null;

  @Column({ name: 'IdERP', type: 'int', nullable: true })
  idERP: number | null;

  @Column({ name: 'OrigenDatos', type: 'nvarchar', length: 100, nullable: true })
  origenDatos: string | null;

  @Column({ name: 'IdImportacion', type: 'int', nullable: true })
  idImportacion: number | null;

  @Column({ name: 'permitecambiodeimpuestos', type: 'bit', nullable: true })
  permiteCambioDeImpuestos: boolean | null;

  @Column({ name: 'FacturasPendientesPermitidas', type: 'int', nullable: true })
  facturasPendientesPermitidas: number | null;

  @Column({ name: 'AplicaRecargoEquivalencia', type: 'bit', nullable: true })
  aplicaRecargoEquivalencia: boolean | null;

  @Column({ name: 'OmitirPuntoVerde', type: 'bit', nullable: true })
  omitirPuntoVerde: boolean | null;

  @Column({ name: 'AplicaImpuestoEspecial', type: 'bit', nullable: true })
  aplicaImpuestoEspecial: boolean | null;

  @Column({ name: 'EnvaseAuto', type: 'bit', nullable: true })
  envaseAuto: boolean | null;

  @Column({ name: 'MostrarEnTV', type: 'bit', nullable: true })
  mostrarEnTV: boolean | null;

  @Column({ name: 'Eslead', type: 'bit', nullable: true })
  esLead: boolean | null;

  @Column({ name: 'IdLeads_Calificacion', type: 'int', nullable: true })
  idLeadsCalificacion: number | null;

  @Column({ name: 'EsCensable', type: 'bit', nullable: true })
  esCensable: boolean | null;

  @Column({ name: 'IdEstado', type: 'int', nullable: true })
  idEstado: number | null;

  @Column({ name: 'IdLeads_Categoria', type: 'int', nullable: true })
  idLeadsCategoria: number | null;

  @Column({ name: 'IdCobrador', type: 'int', nullable: true })
  idCobrador: number | null;

  @Column({ name: 'IdCobradorERP', type: 'nvarchar', length: 50, nullable: true })
  idCobradorERP: string | null;

  @Column({ name: 'IdClienteFacturacionERP', type: 'nvarchar', length: 100, nullable: true })
  idClienteFacturacionERP: string | null;

  @Column({ name: 'TipoBloqueo', type: 'nvarchar', length: 50, nullable: true })
  tipoBloqueo: string | null;

  @Column({ name: 'EsClienteDigital', type: 'bit', nullable: true })
  esClienteDigital: boolean | null;

  @Column({ name: 'EsclienteWeb', type: 'bit', nullable: true })
  esClienteWeb: boolean | null;

  @Column({ name: 'TieneAlbaranDigital', type: 'bit', nullable: true })
  tieneAlbaranDigital: boolean | null;

  @Column({ name: 'IdPrimeraRecargaERP', type: 'nvarchar', length: 50, nullable: true })
  idPrimeraRecargaERP: string | null;

  @Column({ name: 'IdRecargaERP', type: 'nvarchar', length: 50, nullable: true })
  idRecargaERP: string | null;

  @Column({ name: 'FiscalCodigo', type: 'nvarchar', length: 50, nullable: true })
  fiscalCodigo: string | null;

  @Column({ name: 'IdAyudante', type: 'int', nullable: true })
  idAyudante: number | null;

  @Column({ name: 'IdAyudanteERP', type: 'nvarchar', length: 50, nullable: true })
  idAyudanteERP: string | null;

  @Column({ name: 'IdTareaDispositivo', type: 'nvarchar', length: 50, nullable: true })
  idTareaDispositivo: string | null;

  @Column({ name: 'IdTareaRecargaDesdeERP', type: 'nvarchar', length: 50, nullable: true })
  idTareaRecargaDesdeERP: string | null;

  @Column({ name: 'CreadorLead', type: 'nvarchar', length: 100, nullable: true })
  creadorLead: string | null;

  @Column({ name: 'EsLEAD1', type: 'bit', nullable: true })
  esLead1: boolean | null;

  @Column({ name: 'OrigenDatos1', type: 'nvarchar', length: 100, nullable: true })
  origenDatos1: string | null;

  @Column({ name: 'IdLeads_Calificacion1', type: 'int', nullable: true })
  idLeadsCalificacion1: number | null;

  @Column({ name: 'IdLeads_Categoria1', type: 'int', nullable: true })
  idLeadsCategoria1: number | null;

  @Column({ name: 'ValoracionCategoria', type: 'nvarchar', length: 100, nullable: true })
  valoracionCategoria: string | null;

  @Column({ name: 'Atributo1', type: 'nvarchar', length: 255, nullable: true })
  atributo1: string | null;

  @Column({ name: 'Atributo2', type: 'nvarchar', length: 255, nullable: true })
  atributo2: string | null;

  @Column({ name: 'Atributo3', type: 'nvarchar', length: 255, nullable: true })
  atributo3: string | null;

  @Column({ name: 'Atributo4', type: 'nvarchar', length: 255, nullable: true })
  atributo4: string | null;

  @Column({ name: 'Atributo5', type: 'nvarchar', length: 255, nullable: true })
  atributo5: string | null;

  @Column({ name: 'Atributo6', type: 'nvarchar', length: 255, nullable: true })
  atributo6: string | null;

  @Column({ name: 'TieneForms', type: 'bit', nullable: true })
  tieneForms: boolean | null;

  @Column({ name: 'EsCredito', type: 'bit', nullable: true })
  esCredito: boolean | null;

  @Column({ name: 'CodTipoCliente', type: 'nvarchar', length: 20, nullable: true })
  codTipoCliente: string | null;

  @Column({ name: 'TieneCodigoPedidoObligatorio', type: 'bit', nullable: true })
  tieneCodigoPedidoObligatorio: boolean | null;
}
