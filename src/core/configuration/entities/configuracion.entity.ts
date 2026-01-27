import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Configuraciones', schema: 'dbo' })
export class Configuracion {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column({ type: 'nvarchar', length: 50 })
    Nombre: string;

    @Column({ type: 'nvarchar', length: 500, nullable: true })
    Descripcion: string;

    @Column({ type: 'int', nullable: true })
    IdAgente: number;

    @Column({ type: 'nvarchar', length: 1000 })
    Valor: string;
}
