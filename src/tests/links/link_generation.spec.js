const MaxAttempsError = require("../../lib/errors/max_attempts_error");
const UniqueId = require("../../lib/services/id_managment").UniqueId;
const tab = [];
const checkId = (id) => {
    for (let item of tab) {
        if (item === id) {
            return (false);
        }
    }
    return (true);
};

describe("Links", () => {
    test('ID Generation', () => {
        const param = 100
        try {
            for (let i = 0; i < param; i++) {
                const id = UniqueId(checkId);

                tab.push(id);
            }
            expect(tab.length).toBe(param);
        } catch (e) {
            expect(e).toBeInstanceOf(MaxAttempsError);
        }
    });
});