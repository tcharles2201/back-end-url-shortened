const LinkService = require("../lib/services/links_service");

exports.save = async (req, res) => {
    try {
        const service = new LinkService();
        const saved = await service.newLink(req.body);
    
        res.status(201).json(saved);
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

exports.redirectTo = async (req, res) => {
    const service = new LinkService();
    const code = req.params.code;
    const url = `${process.env.SCHEME}://${process.env.HOST}/${code}`;
    const link = await service.getLink(url);

    if (link.hasExpired()){
        res.status(400).json({
            message: "The link has expired"
        });
    }
    else {
        res.status(200).json({
            shortened_url: link.shortened_url
        });
    }
};
