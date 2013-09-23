var getGlossOnIncompleteTasksForUser = function(userName) {
    return fetchData()
        .then(get('tasks'))
        .then(remove(propMatches('complete', true)))
        .then(filter(propMatches('user', userName)))
        .then(pluck(['id', 'dueDate', 'title', 'priority']))
        .then(orderBy('dueDate'));
};