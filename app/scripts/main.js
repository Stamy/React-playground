function parseJSON(response) {
    return response.json()
}

var ids = fetch('https://hacker-news.firebaseio.com/v0/newstories.json')
    .then(parseJSON)
    .then(function (json) {
        //take first 50 items and then load all the relevant data about other items
        return _.take(json, 50).map(function (id) {
            return fetch('https://hacker-news.firebaseio.com/v0/item/' + id + '.json')
                .then(parseJSON);
        })
    }).then(function (promises) {
        return Promise.all(promises);
    }).then(function (allData) {
        return allData
    });



