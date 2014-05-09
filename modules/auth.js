module.exports.run = function(app, db) {

    var config = require('./../config/config_heroku');

    app.post('/register', function(req, res) {
        var User = new db.UserModel({
            login: req.body.login,
            pass: req.body.pass
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
        console.log(req.body);
        return db.UserModel.validateUser(req.body.login, function(err, user){
            if (err) {
                console.log(err)
            } else {
                if (user === undefined) {
                    res.send({status: 'OK'}, {success: false});
                } else {
                    if (user[0].pass == req.body.pass) {
                        res.send({status: 'OK'}, {success: true});
                    } else {
                        res.send({status: 'OK'}, {success: false});
                    }
                }
            }
        })
    });
}

