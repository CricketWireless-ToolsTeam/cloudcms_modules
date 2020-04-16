define((require, exports, module) => {
    const $ = require('jquery');

    const NOTIFICATION_PROJECT = 'development';
    const { Ratchet } = window;

    function getRepositoryForProject(projectName, fn) {
        Ratchet.observable('platform')
            .get()
            .listRepositories()
            .then(function () {
                const listOfRepos = this.asArray();

                const desiredRepo = listOfRepos.find((repo) => {
                    return repo.getTitle()
                        .toLocaleLowerCase()
                        .includes(projectName);
                });

                if (desiredRepo) {
                    fn(null, desiredRepo);
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
                    repository.getBranch('master');
                    console.log('got a branch');
                }
            });

        });

});
