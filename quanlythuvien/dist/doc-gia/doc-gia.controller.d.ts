import { DocGiaService } from './doc-gia.service';
import { CreateDocGiaDto } from './dto/create-doc-gia.dto';
import { UpdateDocGiaDto } from './dto/update-doc-gia.dto';
export declare class DocGiaController {
    private readonly docGiaService;
    constructor(docGiaService: DocGiaService);
    findAll(): Promise<import("./doc-gia.entity").DocGia[]>;
    findOne(id: string): Promise<import("./doc-gia.entity").DocGia>;
    create(body: CreateDocGiaDto): Promise<Partial<import("./doc-gia.entity").DocGia> & import("./doc-gia.entity").DocGia>;
    update(id: string, body: UpdateDocGiaDto): Promise<import("./doc-gia.entity").DocGia>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
