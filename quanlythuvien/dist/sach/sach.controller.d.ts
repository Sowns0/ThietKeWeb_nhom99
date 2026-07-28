import { SachService } from './sach.service';
import { CreateSachDto } from './dto/create-sach.dto';
import { UpdateSachDto } from './dto/update-sach.dto';
export declare class SachController {
    private readonly sachService;
    constructor(sachService: SachService);
    findAll(): Promise<import("./sach.entity").Sach[]>;
    scrapePinterest(q: string): Promise<{
        url: string;
    }>;
    findOne(id: string): Promise<import("./sach.entity").Sach | null>;
    create(body: CreateSachDto): Promise<Partial<import("./sach.entity").Sach> & import("./sach.entity").Sach>;
    update(id: string, body: UpdateSachDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
