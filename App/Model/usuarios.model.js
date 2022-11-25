const bcrypt = require("bcrypt");

module.exports = (sequelize, Sequelize) => {
    const Usuarios = sequelize.define("Usuarios", {
        login: {
            type: Sequelize.STRING
        },
        nome_completo: {
            type: Sequelize.STRING
        },
        grupo: {
            type: Sequelize.STRING
        },
        senha: {
            type: Sequelize.STRING
        },
    },
        {
            hooks: {
                beforeCreate: async (user) => {
                    if (user.password) {
                        const salt = await bcrypt.genSaltSync(10, 'a');
                        user.password = bcrypt.hashSync(user.password, salt);
                    }
                },
                beforeUpdate: async (user) => {
                    if (user.password) {
                        const salt = await bcrypt.genSaltSync(10, 'a');
                        user.password = bcrypt.hashSync(user.password, salt);
                    }
                }
            },
            instanceMethods: {
                validPassword: (password) => {
                    return bcrypt.compareSync(password, this.password);
                }
            }
        });
        Usuarios.prototype.validPassword = async (password, hash) => {
            return await bcrypt.compareSync(password, hash);
        }

        return Usuarios;
};