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
        const link = await Links.create(args);

        return (link);
    }

    async newLink(args){
        const id = UniqueId(this.checkId);
        console.log(id);
        const url = Links.fromId(id);

        console.log(url);
        args.shortened_url = url;
        return (await this.save(args));
    }

    async deleteOne(link){
        await link.destroy();
    }

    async updateOne(args){
        const id = args.id;
        args.id = undefined;
        const ret = await Links.update(args, {
            where: {
                id
            }
        });

        if (ret){
            return (ret);
        }
        return (null);
    }

    async refreshLink(args){
        const id = UniqueId(this.checkId);
        const url = Links.fromId(id);

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
        const url = Links.fromId(id);
        const list = await Links.findAll({
            where: {
                shortened_url: url
            }
        });

        return (list.length === 0);
    }

    async getLink(link){
        const list = await Links.findAll({
            where: {
                shortened_url: link
            }
        });

        console.log(link);
        if (list.length){
            return (list[0]);
        }
        return (null);
    }

    async hasLink(link){
        const list = await Links.findAll({
            where: {
                shortened_url: link
            }
        });

        console.log(list);
        return (list && list.length);
    }

    async findByUserId(userId){
        return (await Links.findAll({
            where: {
                user_id: userId
            },
            order: [["id", "DESC"]]
        }));
    }
}

module.exports = LinkServices;
