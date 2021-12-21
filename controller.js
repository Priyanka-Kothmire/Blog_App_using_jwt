const bcrypt = require('bcrypt');
const { text } = require('body-parser');
// const { text } = require('body-parser');
const jwt = require('jsonwebtoken');
// const { id } = require('tedious/lib/data-types/null');
const knex = require("knex")({
    client: "mysql",
    connection: {
        host: "127.0.0.1",
        user: "root",
        password: "Priya@123",
        database: "Blog_App",
    },
});


create_id = (req, res) => {
    const user = req.body;
    bcrypt.hash(user.password, 10)
    .then((hash) => {
        knex("registration").insert({
            username: user.username,
            password: hash,
        })
            .then((result) => {
                res.send({ sucess: result })
            })
            .catch((err) => {
                if (err) {
                    console.log(err);
                    res.status(400).send({ error: err })
                }
            })
    })
}



login_id = (req, res) => {
    const user = req.body;
    knex.from("registration").select("*").where("username", user.username)
        .then((data) => {
            if (data.length > 0) {
                for (j of data)
                    userPassword = j['password']
                const verified = bcrypt.compare(user.password, userPassword.toString());
                if (verified) {
                    jwt.sign({username:user.username ,id:j.id }, "secret", (err, token) => {
                        if (token) {
                            res.json({ message: "LOGGED IN", token: token })
                        }
                    })
                }
                else {
                    res.send("password is failed")
                }
            } else {
                res.status(403).send("user doen't exists")
            }

        })
}

verifyAcessToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        var decoded = jwt.decode(bearerToken);
        req.data=decoded
        next();
    } else {
        res.status(403).send("user is not authenticated")
    }
}

create_Posts = (req, res) => {
    newdata = req.body
    jwt.verify(req.token,'secret', (err, authData) => {
        console.log(authData)
        if (authData) {
            knex("POST").insert({
                id:authData.id,
                title : newdata.title,
                text : newdata.text
            })
                .then((result) => {
                    console.log(result);
                    res.send({ sucess: "your posts is succesfuly." })
                })
                .catch((err) => {
                    if (err) {
                        console.log(err);
                        res.status(400).send({ error: err })
                    }
                })

        }else{
            console.log(err);
        }
    })

}

post_by_registrationId=(req,res)=>{
    knex("POST").select("id","title","text").where("id",req.params.id)
    .then((rows)=>{
        if(rows.length>0){
            var title = 0
            var text = 0
            for(i of rows){
                title += i["title"]
                text += i["text"]
            }
            // res.send({title:title,text:text,rows})
            res.send ({ rows })
        }else{
            res.status(403).send(`post with the ${req.params.id} id is not exist`)
        }

    })

}

likes_dislikes = (req, res) => {
knex.from('POST').select('title').where('post_id', req.body.post_id).then((info) => {
    if (info.length == 0) {
        res.status(403).send("post is not found")
    } else {
        jwt.verify(req.token, 'secret', (err, authData) => {
            if (authData) {
            knex("options").select("*").where({id:authData.id,post_id:req.body.post_id})
            .then((result)=>{
                console.log(result);
                if (result.length > 0) { 
                    
                    res.send('u have already liked/dislike post') }
                else {
                    knex('options').insert({id:authData.id ,post_id: req.body.post_id, likes: req.body.likes, dislikes: req.body.dislikes })
                        .then((result) => {
                            res.send({ sucess: "added" })
                        })
                        .catch((err) => {
                            if (err) throw err;
                            res.status(403).send({ error: err });
                        })
                }
                    })
                }else{
                    res.status(403).send("user is not authenticated")
                }
            })
            }
        })
    }



get_All_Posts = (req, res) => {
    knex.from('POST').select("*")
        .then((table) => {
            res.send(table)

        })
}


get_Likes_Dislikes_By_post_id = (req, res) => {
    knex('options').select("post_id","likes", "dislikes").where('post_id', req.params.post_id)
        .then((rows) => {
            if (rows.length > 0) {
                // var title= 0
                // var text =0 
                var likes = 0
                var dislikes = 0
                for (i of rows) {
                    // title += i["title"]
                    // text += i["text"]
                    likes += i['likes']
                    dislikes += i['dislikes']
                }
                res.send({ likes: likes, dislikes: dislikes, rows })
            } else {
                res.status(403).send(`post with the ${req.params.post_id} id is not exists`)
        }
    })
}

get_All_Likes_Dislike = (req, res) => {
    knex('POST').innerJoin('options', 'POST.post_id', '=', 'options.post_id').select('POST.title', 'options.likes', 'options.dislikes', 'options.username')
    knex("options").select("*")
        .then((rows) => {
            res.send(rows)
        }).catch((err) => {
            if (err){
                res.status(403).send(`post with the ${req.params.id} id is not exists`)}
            })
        }
    



module.exports = 
                {create_id,
                login_id ,
                verifyAcessToken ,
                create_Posts ,
                post_by_registrationId ,
                likes_dislikes,
                get_All_Posts,
                get_Likes_Dislikes_By_post_id,
                get_All_Likes_Dislike
                }





    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
     



















    