function parse(stringTech){
    var arrayTechs = [];
    if(!stringTech || typeof stringTech == undefined || typeof stringTech == null) {
        return arrayTechs;
    }
    if(stringTech.indexOf(',') < 0) {
        arrayTechs[0] = stringTech;
    }
    else{
        arrayTechs = stringTech.split(',').map(tech => tech.trim());
    }

    return arrayTechs;
}

module.exports = parse;