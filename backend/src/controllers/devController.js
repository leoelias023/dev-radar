const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringToArray = require('../utils/ParseStringAsArray');
// index(lista), show(mostrarUm) , store(criar) , update (atualizar) , destroy (deletar)
module.exports = {
    async destroy(req,res) {
        const { github_username } = req.body;
        Dev.deleteOne({github_user: github_username}).then( (mensagem) => {
            return res.json(mensagem);
        }).catch( (errMen) => {
            return res.json(errMen);
        })
    },

    async destroyTotal(req,res) {
        Dev.deleteMany().then( (mensagem) => {
            return res.json(mensagem);
        }).catch( (errMen) => {
            return res.json(errMen);
        })
    },

    async update(req,res) {
        const { github_username, new_techs, new_bio } = req.body;
        // Tratando techs
            const new_techsArray = parseStringToArray(new_techs);
        Dev.updateOne({github_user: github_username} , {
            $set: {
                bio: new_bio,
                techs: new_techsArray
            }
        }).then( (cara) => {
            return res.json(cara);
        }).catch( (errCara) => {
            return res.json({mensagem: "Deu errro :: "+errCara});
        });
    },

    async index(req,res) {
        Dev.find().sort('1').then( (devs) => {
            res.json(devs);
        }).catch( (errList) => {
            console.log(errList);
        })
    },

    async store(req,res) {
        // Requisicoes do front
            const { github_username, techs, latitude, longitude } = req.body;
        // Tratando techs
            const techsArray = parseStringToArray(techs);
        // Getting data of github API
            const temDev = await Dev.findOne({github_user: github_username});
            if(!temDev) {
                try {
                    const respApi = await axios.get(`https://api.github.com/users/${github_username}`);
                    const { avatar_url, bio, name } = respApi.data;
                    // Tratando as coordenadas
                        const location = {
                            type: 'Point',
                            coordinates: [longitude,latitude],
                        }
                    // Creating a new instance of DEV
                        const newDev = new Dev({
                            nomeCompleto: name,
                            github_user: github_username,
                            techs: techsArray,
                            avatar_url: avatar_url,
                            bio: bio,
                            location
                        });
                    // Save in DB
                        newDev.save().then(() => {
                            return res.json(newDev);
                        }).catch((erroCadastro) => {
                            return res.json({ mensagem: "Erro ao cadastrar no banco de dados... tente novamente mais tarde"+erroCadastro });
                        })
                } catch (errApi) {
                    return res.json({ mensagem: "Erro ao cadastrar... Tente outro Usuário"});
                }
            } else{
                return res.json({ mensagem: "Usuario ja existe! Tente novamente..."});
            }
    }
}