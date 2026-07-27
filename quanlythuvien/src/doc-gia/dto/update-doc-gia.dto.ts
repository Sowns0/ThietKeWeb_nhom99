import { PartialType } from '@nestjs/mapped-types';
import { CreateDocGiaDto } from './create-doc-gia.dto';

export class UpdateDocGiaDto extends PartialType(CreateDocGiaDto) {}
