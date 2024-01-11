const express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const app = express();

// Substitua as seguintes linhas com suas informações do aplicativo do Facebook
const clientID = '1049691619339239';
const clientSecret = '0f63fe4bbc21fbcb2dc4e6523d8c8c91';
const callbackURL = 'http://localhost:5500/auth/facebook/callback';

passport.use(new FacebookStrategy({
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: callbackURL
}, (accessToken, refreshToken, profile, done) => {
    // Função de callback após a autenticação do Facebook
    // Aqui você pode implementar a lógica para lidar com os dados do usuário autenticado
    // O acesso ao accessToken, refreshToken e profile está disponível nesta função
}));

// Rota para iniciar o processo de autenticação do Facebook
app.get('/auth/facebook', passport.authenticate('facebook'));

// Rota para lidar com o retorno de chamada após a autenticação do Facebook
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/login'
}));

// Rota para exibir o perfil do usuário autenticado
app.get('/profile', (req, res) => {
    res.send('Perfil do usuário');
});

// Rota para exibir a página de login
app.get('/login', (req, res) => {
    res.send('Página de login');
});

// Iniciar o servidor
app.listen(5500, () => {
    console.log('Servidor rodando em http://localhost:5500');
});
