var app = new Vue({
    el: '#app',
    data: {
        pageTitle: 'VueJS Simple App',
        msg: 'Hello There! This is Vue JS!',
        fullName: null,
        links: [
            {
                name: 'Google',
                url: 'https://www.google.com'
            },
            {
                name: 'Microsoft',
                url: 'https://www.microsoft.com'
            },
            {
                name: 'Amazon Web Service',
                url: 'https://aws.amazon.com'
            },
        ],
        currentTodo: [
            'Go to market',
            'Buy cheese',
            'Buy milk'
        ],
        todoItem: null
    },
    methods: {
        addTodo(){
            this.currentTodo.push(this.todoItem);
            this.todoItem = null;
        },
        greet(){
            alert('Hello ' + this.fullName + ', you are awesome!');
        },
        deleteItem(index){
            var isConfirmed = confirm('Are you sure about this?');
            if(isConfirmed){
                this.currentTodo.splice(index, 1);
            }
        }
    }
});