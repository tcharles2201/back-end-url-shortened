const Links = require("../models/links_model");


class LinkServices {

    constructor(){

    }

    async getAll(){
        return (await Links.findAll({
            order: [["id", "ASC"]]
        }));
    }

    async save(args){
        const link = new Links(args);
        const saved = await link.save();

        return (saved);
    }

    deleteOne(link){

    }

    updateOne(link){

    }

    async findById(id){
        return (await Links.findByPk(id));
    }

    async findByAnonymous(isAnonymous){
        return (await Links.findAll({
            where: {
                is_anonymous: isAnonymous
            },
            order: [["id", "ASC"]]
        }));
    }

    async findByUserId(userId){
        return (await Links.findAll({
            where: {
                user_id: userId
            },
            order: [["id", "ASC"]]
        }));
    }
}

module.exports = LinkServices;
