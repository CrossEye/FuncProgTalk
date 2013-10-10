var propMatches = use(pipe).over(get, eq);

var getIncompleteTaskSummariesForMemberFunctional = function(memberName) {
    return fetchData()
        .then(get('tasks'))
        .then(filter(propMatches('member', memberName)))
        .then(reject(propMatches('complete', true)))
        .then(map(pick(['id', 'dueDate', 'title', 'priority'])))
        .then(sortBy(prop('dueDate')));
};


var getIncompleteTaskSummariesForMemberImperative = function(memberName) {
    return fetchData()
        .then(function(data) {
            return data.tasks;
        })
        .then(function(tasks) {
            var results = [];
            for (var i = 0, len = tasks.length; i < len; i++) {
                if (tasks[i].member === memberName) {
                    results.push(tasks[i]);
                }
            }
            return results;
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

var TaskList = (function() {
    var TaskList = function(/*Task[]*/ tasks) {
        this.tasks = tasks;
    };
    TaskList.prototype.chooseByMember = function(memberName) {
        var results = [];
        for (var i = 0, len = this.tasks.length; i < len; i++) {
            if (this.tasks[i].member === memberName) {
                results.push(this.tasks[i]);
            }
        }
        this.tasks = results;
    };
    TaskList.prototype.chooseByCompletion = function(completion) {
        var results = [];
        for (var i = 0, len = this.tasks.length; i < len; i++) {
            if (this.tasks[i].complete == completion) {
                results.push(this.tasks[i]);
            }
        }
        this.tasks = results;
    };
    TaskList.prototype.getSummaries = function() {
        var results = [], task;
        for (var i = 0, len = this.tasks.length; i < len; i++) {
            task = this.tasks[i];
            results.push({
                id: task.id,
                dueDate: task.dueDate,
                title: task.title,
                priority: task.priority
            })
        }
        return new TaskList(results);
    };

    TaskList.prototype.sort = function(/*TaskListSorter*/ sorter) {
        this.tasks.sort(sorter.getSortFunction());
    };

    return TaskList;
}());

var TaskListSorter = (function()  {
    var TaskListSorter = function(propName) {
        this.propName = propName;
    };
    TaskListSorter.prototype.getSortFunction = function() {
        var propName = this.propName;
        return function(first, second) {
            return first[propName] < second[propName] ? -1 : first[propName] > second[propName] ? +1 : 0;
        }
    };

    return TaskListSorter;
}());

var getIncompleteTaskSummariesForMember_objectOriented = function(memberName) {
    return fetchData()
        .then(function(data) {
            var taskList = new TaskList(data.tasks);
            taskList.chooseByMember(memberName);
            taskList.chooseByCompletion(false);
            var newTaskList = taskList.getSummaries();
            newTaskList.sort(new TaskListSorter("dueDate"));
            return newTaskList.tasks;
        });
};
