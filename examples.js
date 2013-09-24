var propMatches = useWith(pipe, prop, eq);

var getIncompleteTaskSummariesForUser = function(userName) {
    return fetchData()
        .then(prop('tasks'))
        .then(remove(propMatches('complete', true)))
        .then(filter(propMatches('user', userName)))
        .then(pluck(['id', 'dueDate', 'title', 'priority']))
        .then(orderBy('dueDate'));
};


var getIncompleteTaskSummariesForUser = function(userName) {
    return fetchData()
        .then(function(data) {
            return data.tasks;
        })
        .then(function(tasks) {
            var results = [];
            for (var i = 0, len = tasks.length; i < len; i++) {
                if (!tasks[i].complete) {
                    results.push(tasks[i]);
                }
            }
            return results;
        })
        .then(function(tasks) {
            var results = [];
            for (var i = 0, len = tasks.length; i < len; i++) {
                if (tasks[i].user === userName) {
                    results.push(tasks[i]);
                }
            }
            return results;
        })
        .then(function(tasks) {
            var results = [], task;
            for (var i = 0, len = tasks.length; i < len; i++) {
                task = tasks[i];
                results.push({
                    id: task.id,
                    dueDate: task.dueDate,
                    title: task.title,
                    priority: task.priority
                })
            }
            return results;
        })
        .then(function(tasks) {
            tasks.sort(function(first, second) {
                return first.dueDate - second.dueDate;
            });
            return tasks;
        });
};