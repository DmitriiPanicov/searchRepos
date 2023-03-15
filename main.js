async function searchRepos() {

    let repositories = [];
    let searchRequest = document.getElementById('searchRequest').value;
    let response = await fetch(`https://api.github.com/search/repositories?q=${searchRequest}&per_page=10`);

    if (response.status === 200) {

        let searchResult = await response.json();

        if (searchResult.total_count !== 0) {

            searchResult.items.forEach(item => {
                let repository = {
                    name: item.name,
                    html_url: item.html_url,
                    created_at: new Date(item.created_at),
                    language: item.language,
                    watchers_count: item.watchers_count,
                    description: item.description,
                }

                repositories.push(repository);
            })
            showRepositories();

        } else {
            showFailureMessage();
        }

    } else {
        showServerResponse(response.status);
    }

    function showRepositories() {

        let repositoriesField = document.getElementsByClassName('repositories-field')[0];
        repositoriesField.replaceChildren();
        let out = '';

        repositories.forEach(function (item) {
            out += `
            <div class="repository-item">
                <p><b>Репозиторий:</b> <a href=${item.html_url} target="_blank">${item.name}</a></p>
                <p><b>Дата создания:</b> ${item.created_at.getFullYear()}</p>
                <p><b>Описание:</b> ${item.description !== null ? item.description : 'описание отсутствует'}</p>
                <p><b>Используемый язык:</b> ${item.language !== null ? item.language : 'не знаем мы таких языкаф'}</p>
                <p><b>Количество просмотров:</b> ${item.watchers_count}</p>
            </div>
        `;
        });
        repositoriesField.innerHTML = out;
    }

    function showServerResponse(response) {

        let repositoriesField = document.getElementsByClassName('repositories-field')[0];
        repositoriesField.replaceChildren();
        let out = '';

        out += `
            <div class="repository-item">
                <p><b>Ответ сервера:</b> ${response}</p>
            </div>
        `;

        repositoriesField.innerHTML = out;
    }

    function showFailureMessage() {

        let repositoriesField = document.getElementsByClassName('repositories-field')[0];
        repositoriesField.replaceChildren();
        let out = '';

        out += `
            <div class="repository-item">
                <p>Упс!</p>
                <p>По запросу <b>${searchRequest}</b> ничего не найдено</p>
            </div>
        `;

        repositoriesField.innerHTML = out;
    }
    


}