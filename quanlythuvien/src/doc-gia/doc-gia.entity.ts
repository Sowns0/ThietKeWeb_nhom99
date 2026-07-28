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

  @Column({ nullable: true })
  ma_doc_gia: string;

  @Column({ nullable: true })
  ngay_sinh: string;

  @Column({ nullable: true })
  avatar_url: string;

  @Column({ default: 'ACTIVE' })
  trang_thai: string; // ACTIVE, LOCKED

  @Column({ default: 'SINH_VIEN' })
  loai_doc_gia: string; // SINH_VIEN, GIANG_VIEN, KHACH
}
