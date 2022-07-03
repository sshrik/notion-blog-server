import { Request, Response } from 'express';
import { BaseResponse } from 'src/models/response';

export async function blogHomeController(
  _req: Request,
  res: Response<BaseResponse<undefined>>
) {
  res.send({ message: 'ok' });
}
