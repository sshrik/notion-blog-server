import { Router } from 'express';
import {
  retrieveBlockController,
  retrievePageController,
  getPageMetadataController,
} from 'src/controllers/block';
import errorBoundary from 'src/utils/errorBoundary';

const blockRouter = Router();

blockRouter.get('/:id', errorBoundary(retrieveBlockController));
blockRouter.get('/page/:id', errorBoundary(retrievePageController));
blockRouter.get('/page/metadata/:id', errorBoundary(getPageMetadataController));

export default blockRouter;
