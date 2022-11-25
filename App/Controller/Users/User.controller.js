const db            = require("../../Model");
const modelUsers    = db.modelUsuarios;
const Op            = db.Sequelize.Op;
const bcrypt        = require("bcryptjs");

exports.create = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Os campos não pode estar vazios!"
        });
        return;
    }

    const hash = await bcrypt.hash(req.body.senha, 10);
    const login= req.body.login;

    const users = {
        login: login.toLowerCase(),
        senha: hash,
        nome_completo: req.body.nome_completo,
        grupo: req.body.grupo
    };

    modelUsers.create(users)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocorreu um erro ao criar o usuário."
            });
        });
};

exports.findAll = (req, res) => {
    const login = req.query.login;
    var condition = login ? { login: { [Op.like]: `%${login}%` } } : null;

    modelUsers.findAll({ where: condition })
            .then(data => {
                res.send(data);
            })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Um erro ocorreu enquanto pesquisava."
            });
        });
};

exports.findOne = (req, res) => {
    const login = req.params.login;

    modelUsers.findOne({login})
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message: "Erro ao encontrar o login=" + login
                    });
                });
};