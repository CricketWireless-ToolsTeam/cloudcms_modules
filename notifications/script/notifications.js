define((require, exports, module) => {
    const $ = require('jquery');

    const NOTIFICATION_PROJECT = 'development';
    const { Ratchet } = window;
    // Since the classes tend to change depending
    // where in the system you are
    // we have to rely on the ID
    const headerSelector = '#gadget19';

    function getRepositoryForProject(projectName, fn) {
        Ratchet.observable('platform')
            .get()
            .listRepositories()
            .then(function () {
                const listOfRepos = this.asArray();

                const desiredRepo = listOfRepos.find((repo) => {
                    const title = repo.getTitle();

                    if (title) {
                        return title.toLocaleLowerCase()
                            .includes(projectName);
                    }
                });

                if (desiredRepo) {
                    fn(null, Chain(desiredRepo));
                } else {
                    fn(new Error(`Could not find a repo with the name: ${projectName}`));
                }
            });
    }


    $(document)
        .on('cloudcms-ready', (event) => {

            getRepositoryForProject(NOTIFICATION_PROJECT, (error, repository) => {
                if (error) {
                    console.error(error);
                } else {
                    const notificationProjectBranch = repository.readBranch('master');

                    notificationProjectBranch.queryNodes({
                        _type: `${NOTIFICATION_PROJECT}:notification`,
                        activeStatus: true
                    }, {
                        limit: 1
                    })
                        .then(function () {
                            const nodesArr = this.asArray();
                            if (nodesArr.length) {
                                $(headerSelector)
                                    .remove('#cms-notification');
                                $(headerSelector)
                                    .after(`<div id ="cms-notification" style='background-color: rgb(192, 57, 43);color: white;text-align: center;width: 50%;margin: 0 auto;display: flex;justify-content: center;' >${nodesArr[0].cmsNotificationHTML}</div>`);
                            }
                        });

                }
            });

        });

});
