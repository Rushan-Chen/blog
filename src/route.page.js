import express from 'express';
import * as page from './controllers/page';
import * as auth from './middlewares/auth';

const router = express.Router();

/* GET home page. */
router.get('/', page.homePage);

/* GET posts page. */
router.get('/posts', page.postsPage);

/* GET posts create page. */
router.get('/posts/create', auth.adminRequired, page.createPage);

/* GET posts edit page. */
router.get('/posts/edit', auth.adminRequired, page.editPage);

/* GET posts show page. */
router.get('/posts/show', page.showPage);

/* GET signup page. */
router.get('/signup', page.signupPage);

/* GET signin page. */
router.get('/signin', page.signinPage);

export default router;