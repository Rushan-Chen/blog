(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? (module.exports = factory())
        : typeof define === 'function' && define.amd
            ? define(factory)
            : (global.Smile = factory(global));
  })(this, function () {
    function Smile({ el, data, methods }) {
        if (!el) el = '#app';
        if (!data) data = {};
        if (!methods) methods = {};
  
        return new Vue({
            el: el,
            data: Object.assign(data, {
                activeMenu: '',
                postsList: [],
                title: '',
                content: '',
                name: '',
                pass: '',
                email: '',
                rePass: '',
            }),
            methods: Object.assign(methods, {
                parse(response) {
                    return response.data;
                },
                isActive(menuItem){
                    return this.activeMenu === menuItem;
                },
                setActive(menuItem){
                    this.activeMenu = menuItem;
                },
                create() {
                    axios.post('/api/v1/posts',
                        {
                            title: this.title,
                            content: this.content
                        })
                        .then(this.parse)
                        .then(function (data) {
                            window.location = '/posts/show?id=' + data.post._id;
                        })
                        .catch(function (err) {
                            alert(err.response.data.error);
                        });
                },
                getPost (postId) {
                    axios.get ('/api/v1/posts/' + postId)
                        .then(this.parse)
                        .then(function(data) {
                            vm.title = data.post.title;
                            vm.content = data.post.content;
                        })
                        .catch(function (err) {
                            alert(err.response.data.error);
                        })
                },
                edit (postId) {
                    axios.patch('/api/v1/posts/' + postId,
                        {
                            title: this.title,
                            content: this.content
                        })
                        .then(this.parse)
                        .then(function (data) {
                            // 修改文章后，用既有的postId来跳转到文章页面
                            window.location = '/posts/show?id=' + postId;
                        })
                        .catch(function(err) {
                            alert(err.response.data.error);
                        });
                },
                cancelEdit (postId) {
                    window.location = '/posts/show?id=' + postId;
                },
                getPosts () {
                    const that = this;
                    console.log('--getPosts---');
                    axios.get('/api/v1/posts')
                        .then(that.parse)
                        .then(function (data) {
                            console.log(this); // window, TODO:问题在这里，this指向不对
                            console.log(that.postsList); //array(0)
                            console.log(data.postsList); // array(10)
                            smile.postsList = data.postsList;
                            smile.postsList.forEach((element) => element.url = '/posts/show?id=' + element._id);
                            console.log(that.postsList); // array(10)
                            console.log(smile.postsList.length); // array(10)，但是在posts页面smile.postsList长度为0！？
                            console.log(that === smile); // true
                            console.log(this === window); // true
                        })
                        .catch(function (err) {
                            alert(err.response.data.error);
                        });
                },
                deleteOne(id) {
                    axios.delete ('/api/v1/posts/' + id)
                        .then(this.parse)
                        .then(function (data) {
                            window.location = '/posts';
                        })
                        .catch(function (err) {
                            alert(err.response.data.error);
                        });
                },
                signin () {
                    console.log('---signin---');
                    console.log(this.name);
                    axios.post('/api/v1/signin',
                    {
                        name: this.name,
                        pass: this.pass
                    })
                    .then(this.parse)
                    .then(function(data){
                        window.location = '/';
                    })
                    .catch(function(err){
                        alert(err.response.data.error);
                    });
                },
                signup(){
                    axios.post('/api/v1/signup', 
                    {
                        name: this.name,
                        email: this.email,
                        pass: this.pass,
                        rePass: this.rePass
                    })
                    .then(this.parse)
                    .catch(function(err){
                        alert(err.response.data.error);
                    });
                },
            })
        });
    }
    return Smile;
});