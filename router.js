const express = require('express')
const router = express.Router()
const blog_app = require('../controller/controller.js')



router.post("/register",blog_app.create_id)

router.post("/login",blog_app.login_id)

router.post("/post",blog_app.verifyAcessToken,blog_app.create_Posts)

router.get("/reg/:id",blog_app.post_by_registrationId)

router.post('/likes',blog_app.verifyAcessToken,blog_app.likes_dislikes)

router.get("/get",blog_app.get_All_Posts)

router.get("/post/:post_id",blog_app.get_Likes_Dislikes_By_post_id)

router.get("/",blog_app.get_All_Likes_Dislike)





module.exports = router











