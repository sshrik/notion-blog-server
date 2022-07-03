import { Router } from 'express';
import {
  retrieveBlockController,
  retrievePageController,
  getPageMetadataController,
} from 'src/controllers/block';
import errorBoundary from 'src/utils/errorBoundary';

const blockRouter = Router();

// 블록 하나 가져오기
blockRouter.get('/:id', errorBoundary(retrieveBlockController));

// 페이지 안의 모든 블록 가져오기
blockRouter.get('/page/:id', errorBoundary(retrievePageController));

// 위에껀 사라져야함 ( Controller 만 있으면 될듯? )

// 페이지의 메타데이터 가져오기 ( 블록의 메타데이터 )
blockRouter.get('/metadata/:id', errorBoundary(getPageMetadataController));

// Blog 제일 최상단 정보 가져오기
blockRouter.get('/blog/:id');

// Blog Folder 정보 가져오기
blockRouter.get('/folder/:id');

// Folder의 피드들 모두 가져오기
blockRouter.get('/feeds/:folderId');

export default blockRouter;
