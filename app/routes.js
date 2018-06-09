var AuthenticationController = require('./controllers/authentication'),  
    TodoController = require('./controllers/todos'),  
    ContractorController = require('./controllers/contractor'),  
    TransactionController = require('./controllers/transaction'),  
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport');

var requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});

module.exports = function(app){

    var apiRoutes = express.Router(),
        authRoutes = express.Router(),
        todoRoutes = express.Router();
        contractorRoutes = express.Router();
        transactionRoutes = express.Router();

    // Auth Routes
    apiRoutes.use('/auth', authRoutes);
    apiRoutes.use('/contractor', contractorRoutes);

    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login', requireLogin, AuthenticationController.login);

    authRoutes.get('/protected', requireAuth, function(req, res){
        res.send({ content: 'Success'});
    });

    // Todo Routes
    apiRoutes.use('/todos', todoRoutes);

    todoRoutes.get('/', requireAuth, AuthenticationController.roleAuthorization(['reader','creator','editor']), TodoController.getTodos);
    todoRoutes.post('/', requireAuth, AuthenticationController.roleAuthorization(['creator','editor']), TodoController.createTodo);
    todoRoutes.delete('/:todo_id', requireAuth, AuthenticationController.roleAuthorization(['editor']), TodoController.deleteTodo);

    apiRoutes.use('/transaction', transactionRoutes);

    transactionRoutes.get('/getTransaction',  TransactionController.getTransaction);



    apiRoutes.use('/contractor', contractorRoutes);
    contractorRoutes.get('/getContracts',  ContractorController.getContracts);
    contractorRoutes.post('/createContract',  ContractorController.createContract);
    contractorRoutes.get('/delete/:contract_id',  ContractorController.deleteContract);

    contractorRoutes.post('/getContract/:contract_id',  ContractorController.getContract);

    // Set up routes
    app.use('/api', apiRoutes);

}
