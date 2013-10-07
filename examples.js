var propMatches = execute(pipe).upon(prop, eq);

var getIncompleteTaskSummariesForMemberFunctional = function(memberName) {
    return fetchData()
        .then(prop('tasks'))
        .then(reject(propMatches('complete', true)))
        .then(filter(propMatches('member', memberName)))
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
                if (!tasks[i].complete) {
                    results.push(tasks[i]);
                }
            }
            return results;
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
    var TaskList = function(tasks) {
        this.tasks = tasks;
    };
    TaskList.prototype.chooseByComplettion = function(completion) {
        var results = [];
        for (var i = 0, len = this.tasks.length; i < len; i++) {
            if (this.tasks[i].complete == completion) {
                results.push(this.tasks[i]);
            }
        }
        this.tasks = results;
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

    TaskList.Sorter = function(propName) {
        this.propName = propName;
    };
    TaskList.Sorter.prototype.sort = function(taskList) {
        var propName = this.propName;
        taskList.tasks.sort(function(first, second) {
            return first[propName] < second[propName] ? -1 : first[propName] > second[propName] ? +1 : 0;
        })
    }

    return TaskList;

}());
var getIncompleteTaskSummariesForMember_objectOriented = function(memberName) {
    return fetchData()
        .then(function(data) {
            var taskList = new TaskList(data.tasks);
            taskList.chooseByCompletion(false);
            taskList.chooseByMember(memberName);
            var newTaskList = taskList.getSummaries();
            new TaskList.Sorter("dueDate").sort(newTaskList);
            return newTaskList.tasks;
        });
};