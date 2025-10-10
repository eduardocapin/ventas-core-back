import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Converter_Rechazos')
export class Rejection {
  @PrimaryGeneratedColumn({name:'Id'})
  id: number;

  @Column({name:'IdEstado', type: 'int' })
  status_id: number;

  @Column({name:'Estado', length: 45 })
  status: string;

  @Column({name:'IdPoblacion', type: 'int' })
  city_id: number;

  @Column({name:'Poblacion', length: 45 })
  city: string;

  @Column({name:'IdProvincia', type: 'int' })
  province_id: number;

  @Column({name:'Provincia', length: 45 })
  province: string;

  @Column({name:'IdCliente', type: 'int' })
  customer_id: number;

  @Column({name:'Cliente', length: 150 })
  customer_name: string;

  @Column({name:'IdArticulo', type: 'int' })
  product_id: number;

  @Column({name:'Articulo', length: 45 })
  product_name: string;

  @Column({name:'IdMotivoRechazo', type: 'int' })
  reason_rejection_id: number;

  @Column({name:'MotivoRechazo', length: 45 })
  reason_rejection: string;

  @Column({name:'PVP', type: 'decimal' })
  pvp: number;

  @Column({name:'TienePromo', type: 'bit', default: () => '0' })
  has_own_promo: boolean;

  @Column({ name:'Promo', length: 45, nullable: true })
  own_promo: string;

  @Column({name:'PVPCompetidor', type: 'decimal', nullable: true })
  pvp_competitor: number;

  @Column({name:'TienePromoCompetidor', type: 'bit', default: () => '0' })
  has_competitor_promo: boolean;

  @Column({name:'PromoCompetidor', length: 45, nullable: true })
  competitor_promo: string;

  @Column({name:'IdCompetidor', type: 'int', nullable: true })
  competitor_id: number;

  @Column({name:'Competidor', length: 45, nullable: true })
  competitor_name: string;

  @Column({name:'ValorAccionCorrectora', type: 'decimal', nullable: true })
  corrective_action_value: number;

  @Column({name:'IdSimboloAccionCorrectora', type: 'int', nullable: true })
  corrective_action_symbol_id: number;

  @Column({name:'SimboloAccionCorrectora', length: 45, nullable: true })
  corrective_action_symbol: string;

  @Column({name:'TextoAccionCorrectora', length: 45, nullable: true })
  corrective_action_text: string;

  @Column({name:'EstadoAccionCorrectora', length: 45, nullable: true })
  corrective_action_status: string;

  @Column({name:'IdEstadoAccionCorrectora', type: 'int', nullable: true })
  corrective_action_status_id: number;

  @Column({name:'PropuestaAgente', length: 45, nullable: true })
  salesman_proposal: string;

  @Column({name:'Notas', length: 45, nullable: true })
  notes: string;

  @Column({name:'FechaRechazo', type: 'date', nullable: true })
  rejection_date: Date;

  @Column({name:'FechaUltimoRechazo', type: 'date', nullable: true })
  last_rejection_date: Date;

  @Column({name:'FechaInteres', type: 'date', nullable: true })
  interest_date: Date;

  @Column({name:'IdAgente', type: 'int', nullable: true })
  salesman_id: number;

  @Column({name:'Latitud', type: 'decimal', precision: 10, scale: 8, nullable: true })
  latitude: number;

  @Column({name:'Longitud', type: 'decimal', precision: 10, scale: 8, nullable: true })
  longitude: number;

  @Column({name:'BajaEnERP',type: 'bit', default: () => '0'})
  deleted: boolean;

    @Column({name:'idEmpresa', type: 'int', nullable: true })
  empresa_id: number;

  @Column({name:'idEmpresaERP', length: 45, nullable: true })
  empresa_name: string;

}

