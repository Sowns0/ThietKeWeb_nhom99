import { Request, Response } from 'express';
import { DocGiaService } from './doc-gia.service';
export declare function createDocGiaController(service: DocGiaService): {
    create: (req: Request, res: Response) => Response<any, Record<string, any>>;
    findAll: (req: Request, res: Response) => Response<any, Record<string, any>>;
    update: (req: Request, res: Response) => Response<any, Record<string, any>>;
    remove: (req: Request, res: Response) => Response<any, Record<string, any>>;
};
