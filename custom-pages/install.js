define((require) => {
    const r = {};

    r.install = function(observableHolder, project, callback) {
        // TODO: any functions that you want to run on install

        callback();
    };

    return r;
});
