const restify = require('restify');

var server = restify.createServer({
    name: 'pratica-3-MatheusJulidori',
});
server.use(restify.plugins.bodyParser());

/*-----------------------------Alunos-----------------------------*/
let alunos = [];


server.post('/api/v1/aluno/inserir', (req, res, next) => {
    const { nome, curso, dataNascimento } = req.body;

    const novoAluno = {
        id: alunos.length + 1, 
        nome,
        curso,
        dataNascimento
    };

    alunos.push(novoAluno);

    res.send(201, novoAluno);
    return next();
});

server.get('/api/v1/aluno/listar', (req, res, next) => {
    res.send(alunos);
    return next();
});

server.post('/api/v1/aluno/atualizar', (req, res, next) => {
    const { id, nome, curso, dataNascimento } = req.body;

    const alunoIndex = alunos.findIndex(aluno => aluno.id === id);
    if (alunoIndex === -1) {
        res.send(404, { message: 'Aluno não encontrado' });
    } else {
        alunos[alunoIndex] = { id, nome, curso, dataNascimento };
        res.send(200, alunos[alunoIndex]);
    }

    return next();
});

server.post('/api/v1/aluno/excluir', (req, res, next) => {
    const { id } = req.body;

    const alunoIndex = alunos.findIndex(aluno => aluno.id === id);
    if (alunoIndex === -1) {
        res.send(404, { message: 'Aluno não encontrado' });
    } else {
        alunos.splice(alunoIndex, 1);
        res.send(200, { message: 'Aluno excluído com sucesso' });
    }

    return next();
});

/*-----------------------------Professor-----------------------------*/
let professores = [];

server.post('/api/v1/professor/inserir', (req, res, next) => {
    const { nome, disciplina, email } = req.body;

    const novoProfessor = {
        id: professores.length + 1, 
        nome,
        disciplina,
        email
    };

    professores.push(novoProfessor);

    res.send(201, novoProfessor);
    return next();
});

server.get('/api/v1/professor/listar', (req, res, next) => {
    res.send(professores);
    return next();
});

server.post('/api/v1/professor/atualizar', (req, res, next) => {
    const { id, nome, disciplina, email } = req.body;

    const professorIndex = professores.findIndex(professor => professor.id === id);
    if (professorIndex === -1) {
        res.send(404, { message: 'Professor não encontrado' });
    } else {
        professores[professorIndex] = { id, nome, disciplina, email };
        res.send(200, professores[professorIndex]);
    }

    return next();
});

server.post('/api/v1/professor/excluir', (req, res, next) => {
    const { id } = req.body;

    const professorIndex = professores.findIndex(professor => professor.id === id);
    if (professorIndex === -1) {
        res.send(404, { message: 'Professor não encontrado' });
    } else {
        professores.splice(professorIndex, 1);
        res.send(200, { message: 'Professor excluído com sucesso' });
    }

    return next();
});




// iniciar o servidor
var port = process.env.PORT || 5000;
server.listen(port, function() {
    console.log('Servidor iniciado', server.name, ' na url http://localhost:' + port);
})