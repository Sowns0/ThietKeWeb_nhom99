import { PartialType } from '@nestjs/mapped-types';
import { CreatePhieuMuonDto } from './create-phieu-muon.dto';

export class UpdatePhieuMuonDto extends PartialType(CreatePhieuMuonDto) {}
