const Table = require("./table_model");
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class Links extends Table{
    constructor(args){
        this.id = args["id"];
        this.base_url = args["base_url"];
        this.shortened_url = args["shortened_url"];
        this.is_anonymous = args["is_anonymous"];
        this.expired_at = args["expired_at"];
        this.user_id = args["user_id"];
        this.created_at = args["created_at"];
        this.updated_at = args["updated_at"];
    }

    isAnonymous(){
        return (this.is_anonymous);
    }

    ifAnonymous(callback, params){
        if (this.isAnonymous()){
            callback(...params);
        }
    }

    hasExpired(){
        const date = new Date();
        
        return (date.getTime() > this.expired_at.getTime());
    }

    ifExpired(callback, params){
        if (this.hasExpired()){
            callback(...params);
        }
    }

}

Links.init({
    id: DataTypes.NUMBER,
    base_url: DataTypes.STRING,
    shortened_url: DataTypes.STRING,
    is_anonymous: DataTypes.NUMBER,
    expired_at: DataTypes.DATE,
}, {
    tableName: "links",
    modelName: "links",
    sequelize,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [
        {
            unique: true,
            fields: ["shortened_url"]
        }
    ]
});
