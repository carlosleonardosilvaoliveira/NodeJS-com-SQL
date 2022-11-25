const db        = require('../../Model');
const logg      = db.modelUsuarios;
const jwt       = require('jsonwebtoken');
const bcrypt    = require("bcryptjs");

exports.logar = (req, res) => {
    const login = req.body.login;
    const senha = req.body.senha;

    if (login && senha) {
        logg.findOne({
            where: {
                login: login
            },
        }).then(response => {

            if (response == null) return res.status(401).json({ error: "Usuário e/ou senha incorretos!" });

            bcrypt.compare(senha, response.senha, (err, data) => {
                if (err) {
                    return res.status(500).json({ error: "Ocorreu um erro ao verificar o login" });
                }

                if (data) {
                    const Token = jwt.sign(
                        {
                            isAuth: true,
                            id: response.id,
                            login: response.login,
                            nome_completo: response.nome_completo,
                            grupo: response.grupo,
                        },
                        process.env.JWT_SECRET,
                        { expiresIn: '1h'}
                    );

                    const nome = response.nome_completo;

                    res.cookie('Token', Token, {maxAge: 5*60*1000, httpOnly: true, sameSite: 'strict'});
                    res.status(200).json({ data: nome });

                } else {
                    return res.status(401).json({ error: "Usuário e/ou senha incorretos!" });
                }
            })

        }).catch(erro => {
            return { erro: erro }
        });
    } else {
        return { erro: 'Campos vazios!' };
    }
};

exports.logado = async (req, res, next) => {
    //PEGA OS COOKIES DO NAVEGADOR
    const Auth = req.cookies.Token;

    //console.log(Auth);

    //VERIFICA SE O COOKIE EXISTE
    if (typeof (Auth) == 'undefined' || Auth == '' || Auth == null) {
        return res.send({ erro: { login: 'Não autorizado!' } });
    } else {
        //TENTA TRADUZIR O TOKEN
        try{
            //SE CONSEGUIR, AUTORIZA O ACESSO
            const Token = await jwt.verify(Auth, process.env.JWT_SECRET);
            next();
        } catch(err) {
            //SE NÃO CONSEGUIR, BLOQUEIA O ACESSO
            return res.send({ erro: {login: 'Não autorizado'}})
        }
    }
}


exports.deslogar = (req, res) => {

    res.clearCookie('Token');
    res.status(200).redirect('/');
}