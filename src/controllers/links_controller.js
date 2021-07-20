const LinkService = require("../lib/services/links_service");

exports.save = async (req, res) => {
    try {
        const service = new LinkService();
        const saved = await service.save(req.body);
    
        res.json(saved);
    }
    catch(e){
        res.status(400).end();
    }
};

exports.findAll = async (req, res) => {
    const service = new LinkService();
    const list = await service.getAll();

    res.json(list);
};
