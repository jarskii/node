module.exports.run = function(app, db) {

    var config = require('./../config/config');
    var crypto = require('crypto');

    app.post('/register', function(req, res) {
        console.log(crypto.createHash('md5').update(req.body.login).digest('hex'));
        var User = new db.UserModel({
            login: req.body.login,
            pass: req.body.pass,
            session: crypto.createHash('md5').update(req.body.login).digest('hex')
        });

        db.UserModel.validateUser(req.body.login, function(err, user) {
            if (err) {
                console.log(err)
            } else {
                if(user[0] === undefined) {
                    if (req.body.invait != 'ohoho') {
                        res.statusCode = 500;
                        res.send({error: 'not avalable invite'});
                    } else {
                        User.save(function(err) {
                            if (!err) {
                                res.send({
                                    status: "OK"
                                })
                            } else {
                                console.log(err);
                            }
                        })
                    }

                } else {
                    res.statusCode = 500;
                    res.send({error: 'already exist'});
                }
            }
        })
    });


    app.post('/auth', function(req, res) {
        return db.UserModel.validateUser(req.body.login, function(err, user){
            if (err) {
                console.log(err)
            } else {
                if (!user.length) {
                    res.send({success: false});
                } else {
                    if (user[0].pass == req.body.pass) {
                        req.session.login = req.body.login;
                        res.send({success: true, user: req.session.login});
                    } else {
                        res.send({success: false});
                    }
                }
            }
        })
    });
}

