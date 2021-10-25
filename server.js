const { host, port, secure, user, pass, rejectUnauthorized, from, text } = require('./src/config/mailConfig.json')
const JSONTransport = require('nodemailer/lib/json-transport');
const { Server } = require('http');

let express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    nodemailer = require('nodemailer'),
    server = require('http').Server(app);


const transport = nodemailer.createTransport({
host,
    port,
    secure,
    auth: { user, pass, },
    tls: { rejectUnauthorized },
});


function verificarIntegracao(statusIntegracao) {
    statusIntegracao = transport.verify(function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log("== Integração de e-mail ok! ==");
        }
    });
    return statusIntegracao
};

app.use(express.static(__dirname + '/src'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',function(req,res){
    res.send('Servidor online')
})

app.post('/sendemail', function(req, res){
    console.log('===Resquest:', req.body);

    var mailOptions = {
        from,
        text,
        to: req.body.to,
        subject: "Teste de termo condiminio",
        html: "<p>HTML version of the message</p>"
    };

    enviar = transport.sendMail(mailOptions);
    verificarIntegracao()
    res.status(200).send('E-mail enviado com sucesso. ');
})
  

server.listen(3000, function(){
    console.log('Servidor iniciado na porta 3000')
})