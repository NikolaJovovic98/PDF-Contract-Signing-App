import express from 'express';
const router = express.Router();
import multer from 'multer';
const upload_pdf = multer();


import { admin_add_new_user, login, check_cookie, logout, get_users,admin_remove_user,uploadPdf } from '../controllers/users_controller.js';
import { check_admin } from '../middlewares/check_admin_middleware.js';

router.get('/',(req,res)=>{
    res.json('working!');
});

router.post('/admin/add-user',check_admin,admin_add_new_user);
router.post('/admin/remove-user/:id',check_admin,admin_remove_user);
router.post('/login',login);
router.post('/logout',logout);
router.post('/auth/check-cookie',check_cookie);
router.get('/get-users',check_admin,get_users);


router.post('/upload-pdf',check_admin,upload_pdf.single('pdf_file'),uploadPdf);

export default router;