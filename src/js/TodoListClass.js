export default class TodoListClass {

    constructor(page) {
        this.page = page;
    }

    loadPage() {
        if(this.page.search(/^listTaskId=[1-9]+[0-9]+$/) !== -1) {
            console.log('ddd');
        }
    }

    goRight() {

    }

    goLeft() {

    }

    goToListTasks() {

    }

    addListTask() {

    }

    deleteListTask() {

    }
}