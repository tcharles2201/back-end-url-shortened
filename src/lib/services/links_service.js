const Links = require("../models/links_model");
const UniqueId = require("./id_managment").UniqueId;

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

    async newLink(args){
        const id = UniqueId(this.checkId);
        console.log(id);
        const url = `${process.env.SCHEME}://${process.env.HOST}/${id}`;

        args.shortened_url = url;
        return (await this.save(args));
    }

    deleteOne(link){

    }

    async updateOne(args){
        const link = new Links(args);
        const saved = await link.save();

        return (saved);
    }


    async refreshLink(args){
        const id = UniqueId(this.checkId);
        const url = `${process.env.SCHEME}://${process.env.HOST}/${id}`;

        args.shortened_url = url;
        return (await this.updateOne(args));
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

    async checkId(id){
        const url = `${process.env.SCHEME}://${process.env.HOST}/${id}`;
        const list = await Links.findAll({
            where: {
                shortened_url: url
            }
        });

        console.log(url);
        return (list.length === 0);
    }

    async getLink(link){
        const list = await Links.findAll({
            where: {
                shortened_url: link
            }
        });

        if (list.length){
            return (list[0]);
        }
        return (null);
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
