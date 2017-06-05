const app = require('./config/server');

const server = app.listen(3001, () => {
    console.log('Servidor rodando na porta... 3001');
});

const io = require('socket.io').listen(server);
app.set('io', io);

io.on('connection', (socket) => {
    console.log("usuário conectou");

    socket.on("disconnect", () => {
        console.log("usuário desconectou");
    });

    socket.on("msgParaServidor", (data) => {
        //Dialogo
        socket.emit(
            'msgParaCliente',
            {
                apelido: data.apelido,
                mensagem: data.mensagem
            }
        );
        socket.broadcast.emit(
            'msgParaCliente',
            {
                apelido: data.apelido,
                mensagem: data.mensagem
            }
        );
        //Participantes
        if (parseInt(data.apelidoAtualizadoNosClientes) === 0) {
            socket.emit(
                'participantesParaCliente',
                {
                    apelido: data.apelido
                }
            );
            socket.broadcast.emit(
                'participantesParaCliente',
                {
                    apelido: data.apelido
                }
            );
        }

    });

});
