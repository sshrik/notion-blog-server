import { Router } from 'express';
import { blogHomeController } from 'src/controllers/blog';
import errorBoundary from 'src/utils/errorBoundary';

const blogRouter = Router();

// Blog 홈 화면 정보 불러오기
// Blog 자기소개 및 블로그 폴더 정보와 각 폴더별 첫 N개 글
blogRouter.get('/', errorBoundary(blogHomeController));

// Blog 폴더 정보 불러오기 with pagination
// pagination page / size / sort
blogRouter.get('/folder/:id', errorBoundary(blogHomeController));

// Blog 피드 정보 불러오기 ( 블로그 글 정보 )
blogRouter.get('/feed/:id', errorBoundary(blogHomeController));
export default blogRouter;
