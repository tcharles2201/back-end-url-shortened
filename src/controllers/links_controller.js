const Links = require("../lib/models/links_model");
const LinkService = require("../lib/services/links_service");

exports.save = async (req, res) => {
    try {
        const service = new LinkService();
        const args = req.body;

        if (args.shortened_url) {
            if (!service.checkId(args.shortened_url)) {
                throw new Error("Unique Id");
            }
            const saved = await service.save(args);

            res.status(201).json(saved);
        } else {
            const saved = await service.newLink(args);

            res.status(201).json(saved);
        }
    } catch (e) {
        res.status(400).end();
    }
};

exports.findAll = async (req, res) => {
    const service = new LinkService();
    const list = await service.getAll();

    res.json(list);
};

exports.deleteOne = async (req, res) => {
    const service = new LinkService();

    try {
        const link = await service.findById(req.params.id);
        await service.deleteOne(link);

        res.status(200).json({
            message: "the link is delete"
        });
    } catch (e) {
        res.status(400).end();
    }
}

exports.redirectTo = async (req, res) => {
    const service = new LinkService();
    const code = req.params.code;
    const url = Links.fromId(code);
    const link = await service.getLink(url);


    if (!link) {
        res.status(404).end();
    } else if (link.hasExpired()) {
        res.status(400).json({
            message: "The link has expired"
        });
    } else {
        res.json({
            url: link.base_url
        });
    }
};

exports.updateOne = async (req, res) => {
    const service = new LinkService();
    const args = req.body;

    try {
        if (args.shortened_url) {
            const link = await service.findById(args.id);

            console.log(link);
            if (link.shortened_url !== args.shortened_url 
                && !service.checkId(args.shortened_url)) {
                throw new Error("Unique Id");
            }
            console.log("passed !");
            const saved = await service.updateOne(args);

            if (!saved){
                res.status(400).end();
                return;
            }
            res.status(200).json(saved);
        } else {
            const saved = await service.refreshLink(req.body);

            res.status(200).json(saved);
        }
    } catch (e) {
        console.log(e.message);
        res.status(400).end();
    }
};

exports.listByUser = async (req, res) => {
    const service = new LinkService();

    try {
        const list = await service.findByUserId(req.params.user_id);

        res.json(list);
    } catch (e) {
        res.status(400).end();
    }
};