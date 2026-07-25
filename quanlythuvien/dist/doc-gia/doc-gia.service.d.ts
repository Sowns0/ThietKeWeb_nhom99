import { DocGia, CreateDocGiaDto, UpdateDocGiaDto } from './doc-gia.entity';
export declare class DocGiaService {
    private items;
    private nextId;
    create(dto: CreateDocGiaDto): DocGia;
    findAll(): DocGia[];
    findOne(id: number): DocGia | undefined;
    update(id: number, dto: UpdateDocGiaDto): DocGia | undefined;
    remove(id: number): boolean;
}
export declare const defaultDocGiaService: DocGiaService;
