$(() => {
    attachButtonsEvents();
    const app = Sammy('#main', function () {

        this.use('Handlebars', 'hbs');

        this.get('index.html', displayHome);
        this.get('#/home', displayHome);
        this.get('#/about', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authToken') !== null;
            ctx.username = sessionStorage.getItem('username');
            ctx.loadPartials({
                header: './common/header.hbs',
                footer: './common/footer.hbs',
            }).then(function () {
                this.partial('./about/about.hbs')
            })
        });
        this.get('#/login', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authToken') !== null;
            ctx.username = sessionStorage.getItem('username');
            ctx.loadPartials({
                header: './common/header.hbs',
                footer: './common/footer.hbs',
                loginForm: './login/loginForm.hbs',
            }).then(function () {
                this.partial('./login/loginPage.hbs');
            })
        });
        this.post('#/login', function (ctx) {
            let username = ctx.params.username;
            let password = ctx.params.password;
            if (username && password) {
                requester.login(username, password).then(function () {
                    displayHome(ctx);
                });
            } else {
                // TODO notification error
            }

        });

        this.get('#/register', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authToken') !== null;
            ctx.username = sessionStorage.getItem('username');
            ctx.loadPartials({
                header: './common/header.hbs',
                footer: './common/footer.hbs',
                registerForm: './register/registerForm.hbs',
            }).then(function () {
                this.partial('./register/registerPage.hbs');
            })
        });

        this.post('#/register', function (ctx) {
            let username = ctx.params.username;
            let password = ctx.params.password;
            let repeatPass = ctx.params.repeatPass;
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            if (username && password && password === repeatPass) {
                requester.register(username, password)
            } else {
                // TODO notification error
            }

        });
        this.get('#/logout', function (ctx) {
            requester.logout().then(function () {
                displayHome(ctx);
            });
        });
        this.get('#/addTraining', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authToken') !== null;
            ctx.username = sessionStorage.getItem('username');
            ctx.loadPartials({
                header: './common/header.hbs',
                footer: './common/footer.hbs',
                addForm: './add/addForm.hbs',
            }).then(function () {
                this.partial('./add/addPage.hbs');
            })
        });
        this.post('#/add', function (ctx) {
            let type = ctx.params.type;
            let description = ctx.params.description;
            let date = ctx.params.date;
            ctx.loggedIn = sessionStorage.getItem('authToken') !== null;
            ctx.username = sessionStorage.getItem('username');
            if (type && description && date) {
                requester.addTraining(type, description, date)
            } else {
                // TODO notification error
            }
        });
        this.get('#/trainings', async function (ctx) {
            $('#table').empty();
            ctx.loggedIn = sessionStorage.getItem('authToken') !== null;
            ctx.username = sessionStorage.getItem('username');

            let trainings = await requester.getAllTrainings();
            for (let tr of trainings) {
                if(sessionStorage.getItem('userId') === tr._acl.creator){
                    tr.isCreator = true;
                }
            }
            ctx.tr = trainings;
            console.log(trainings);
            ctx.loadPartials({
                header: './common/header.hbs',
                footer: './common/footer.hbs',
            }).then(function () {
                this.partial('./renderData/showTrainings.hbs');
                console.log(ctx.tr);
            })

        });
        this.post('#/remove', function (ctx) {
            requester.deleteTraining(ctx._id);
        });
    });
    app.run();
});

function displayHome(ctx) {
    ctx.loggedIn = sessionStorage.getItem('authToken') !== null;
    ctx.username = sessionStorage.getItem('username');
    ctx.loadPartials({
        header: './common/header.hbs',
        footer: './common/footer.hbs',
    }).then(function () {
        this.partial('./home/home.hbs')
    })
}