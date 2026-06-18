import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('phieu_muon')
export class PhieuMuon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'doc_gia_id' })
  doc_gia_id: number;

  @Column({ name: 'sach_id' })
  sach_id: number;

  @Column({ type: 'date', name: 'ngay_muon' })
  ngay_muon: string;

  @Column({ type: 'date', name: 'ngay_tra', nullable: true })
  ngay_tra: string;

  @Column({ name: 'trang_thai', default: 'Đang mượn' })
  trang_thai: string;
}