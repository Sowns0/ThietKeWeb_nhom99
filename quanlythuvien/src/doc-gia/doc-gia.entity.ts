import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('doc_gia')
export class DocGia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ho_ten: string;

  @Column({ nullable: true })
  email: string;

  @Column({ name: 'so_dien_thoai', nullable: true })
  so_dien_thoai: string;
}
