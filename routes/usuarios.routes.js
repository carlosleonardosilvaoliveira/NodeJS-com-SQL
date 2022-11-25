const Auth = require("../App/Controller/Autenticacao/Auth.controller");
module.exports = app => {
    const Auth      = require("../App/Controller/Autenticacao/Auth.controller");
    const Users     = require("../App/Controller/Users/User.controller");

    var router = require("express").Router();

    router.post("/users/create", Users.create);
    /*router.get("/users", Users.findAll);
    router.get("/users/:login", Users.findOne);*/

    //ROTAS DE LOGIN
    router.post("/auth/logar", Auth.logar);
    router.get("/auth/deslogar", Auth.deslogar);
    router.get("/auth/logado", Auth.logado,  (req,res) => res.sendFile(process.cwd()+'/src/Index/painel.html'));

    app.use("/api", router);
};