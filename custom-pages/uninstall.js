define((require) => {
    const r = {};

    r.uninstall = function(observableHolder, project, callback) {
        // TODO: any functions that you want to run on uninstall

        callback();
    };
    return r;
});
