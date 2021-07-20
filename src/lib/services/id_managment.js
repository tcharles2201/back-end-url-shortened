const MaxAttempsError = require("../errors/max_attempts_error");

function IdGenerator() {
    return 'xxxx4xxyxx4xx'.replace(/[xy]/g, function (c) {
        var r = Math.floor(Math.random() * 16);

        return r.toString(16);
    });
}

const MAX_ATTEMPTS = 1000;

function UniqueId(checkId){
    let i = 0;

    while (i < MAX_ATTEMPTS){
        const id = IdGenerator();

        if (!checkId(id)){
            return (id);
        }
    }
    throw new MaxAttempsError("Failed to generate an unique Id");
}

module.exports = {
    UniqueId
};
