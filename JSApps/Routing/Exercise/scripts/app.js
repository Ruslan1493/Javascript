$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        this.get('index.html', displayHome);
        this.get('#/home', displayHome);
        this.get('#/about', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
            }).then(function () {
                this.partial('./templates/about/about.hbs',)
            })
        });

        //LOGIN
        this.get('#/login', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                loginForm: './templates/login/addForm.hbs',
            }).then(function () {
                this.partial('./templates/login/addPage.hbs',)
            })
        });
        this.post('#/login', function (ctx) {
            let username = ctx.params.username;
            let pass = ctx.params.password;

            auth.login(username, pass)
                .then(function (userInfo) {
                auth.saveSession(userInfo);
                auth.showInfo('You are now logged in!');
                displayHome(ctx);
            }).catch(auth.handleError);
        });

        //LOGIN
        this.get('#/logout', function (ctx) {
            auth.logout()
                .then(function (userInfo) {
                    sessionStorage.clear();
                    auth.showInfo('You are now logged out!');
                    displayHome(ctx);
                }).catch(auth.handleError);
        });

        // REGISTER GET, POST
        this.get('#/register', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                registerForm: './templates/register/registerForm.hbs',
            }).then(function () {
                this.partial('./templates/register/registerPage.hbs',)
            })
        });
        this.post('#/register', function (ctx) {
            let username = ctx.params.username;
            let password = ctx.params.password;
            let repeatPass = ctx.params.repeatPassword;

            if(password !== repeatPass){
                auth.showError('Passwords do not match!');
            }else{
                auth.register(username, password)
                    .then(function (userInfo) {
                    auth.saveSession(userInfo);
                    auth.showInfo('You have successfully registered!');
                    displayHome(ctx);
                }).catch(auth.handleError);
            }
        });
        
        this.get('#/catalog', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            
            teamsService.loadTeams()
                .then(function (teams) {
                    console.log(teams);
                    ctx.hasNoTeam = sessionStorage.getItem('teamId') === 'undefined' || sessionStorage.getItem('teamId') === null;
                    ctx.teams = {
                        teams:teams
                    };
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        team: './templates/catalog/team.hbs',
                    }).then(function () {
                        this.partial('./templates/catalog/teamCatalog.hbs',)
                    });
                })
        });
    });

    // DISPLAY ABOUT


    // DISPLAY HOME
    function displayHome(context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');
        context.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
        }).then(function () {
            this.partial('./templates/home/home.hbs');
        })
    }
    app.run();
});