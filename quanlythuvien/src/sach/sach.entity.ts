import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Sach {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ten_sach: string;

  @Column()
  tac_gia: string;

  @Column()
  the_loai: string;

  @Column()
  nam_xuat_ban: number;

  @Column()
  so_luong: number;
}