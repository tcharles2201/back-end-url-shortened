const Links = require("../lib/models/links_model");
const LinkService = require("../lib/services/links_service");
const jwtMiddleware = require("../middleware/jwtMiddleware");

exports.save = async (req, res) => {
    try {
        const service = new LinkService();
        const args = req.body;

        console.log(args);
        if (await service.getLink(args.base_url) !== null || 
                args.base_url.startsWith(`${process.env.SCHEME}://${process.env.HOST}/redirect`)){
            res.status(400).end();
        }
        if (args.is_anonymous === 0){
            const token = jwtMiddleware.decode_token(req, res);

            args.user_id = token.id;
        }
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
        console.log(e.message);
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
        const id = args.id;
        const token = jwtMiddleware.decode_token(req, res);
        const link = await service.findById(id);

        if (!link){
            res.status(400).end();
            return;
        }
        if (link.user_id !== token.id){
            res.status(403).json({
                message: "forbidden"
            });
        }
        args.is_anonymous = link.is_anonymous;
        args.user_id = link.user_id;
        if (args.shortened_url) {
            if (link.shortened_url !== args.shortened_url 
                && await service.hasLink(args.shortened_url)) {
                throw new Error("Unique Id");
            }
            const saved = await service.updateOne(args);

            if (!saved){
                res.status(400).end();
                return;
            }
            const ret = await service.findById(id);

            res.status(200).json(ret);
        } else {
            const saved = await service.refreshLink(args);
            const ret = await service.findById(id);

            res.status(200).json(ret);
        }
    } catch (e) {
        console.log(e.message);
        res.status(400).end();
    }
};

exports.listByUser = async (req, res) => {
    const service = new LinkService();

    try {
        const token = jwtMiddleware.decode_token(req, res);
        const list = await service.findByUserId(token.id);

        res.json(list);
    } catch (e) {
        res.status(400).end();
    }
};
