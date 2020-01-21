const Dev = require('../models/Dev');
const parseStringToArray = require('../utils/ParseStringAsArray');

module.exports = {
    async index(req,res) {
        // QUERYS
            // Buscando querys
                const { techs , longitude, latitude} = req.query;
                const nLongitude = Number(longitude);
                const nLatitude = Number(latitude);
            // Treating techs ParseStringAsArray
                const arrayTechs = parseStringToArray(techs);

        // Finding devs per distance of map
        try{
            const devs = await Dev.find({
                techs: {
                    $in: arrayTechs,
                },
                location: {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [longitude, latitude],
                        },
                        $maxDistance: 10000,
                    }
                }
            });
            return res.json(devs);
        } catch(errBusca) {
            return res.json({mensagem: 'Erro! '+errBusca});
        }
    }
}