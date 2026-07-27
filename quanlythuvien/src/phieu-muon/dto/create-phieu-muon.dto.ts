import { IsInt, IsPositive, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreatePhieuMuonDto {
  @IsInt()
  @IsPositive()
  doc_gia_id: number;

  @IsInt()
  @IsPositive()
  sach_id: number;

  @IsDateString()
  ngay_muon: string;

  @IsDateString()
  @IsOptional()
  ngay_tra?: string;

  @IsString()
  @IsOptional()
  trang_thai?: string;
}
