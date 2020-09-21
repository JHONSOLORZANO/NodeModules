/* Este es el archivo de */

const User = require ('../models/User');
const { param } = require('../routes/userRoutes');

/**
 * 
 * @param {*} req => Son todos los parametros que recibimos.
 * @param {*} res => Respuesta. 
 */

 //Insertar

function create (rew, res){
    var user = new User() ;
    var params = rew.body;

    user.firstName = params.firstName;
    user.lastName = params.lastName;
    user.email = params.email;
    user.age = params.age;

    user.save( (error, userCreated) => {
        if (error) {
            res.status(500).send({
                statusCode: 500,
                message: "Error en el servidor"
            })
        } else{
            if(!userCreated){
                res.statur(400).send({
                    statusCode: 400,
                    message:"Error al insertar el usuario"
                })
            }else{
                res.status(200).send({
                    statusCode: 200,
                    message: "Usuario almacenado correctamente",
                    dataUser: userCreated
                })
            }
        }
    } )
}

//Mostrar Usuario por id

function show(req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err)
            res.send(err);
        res.json({
            message: 'User details loading..',
            data: user
        });
    });
}

//Listar
function list(req, res){
    console.log(req.body);
    User.find(function (err, users) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Contacts retrieved successfully",
            data: users
        });
    });

}

//Modificar
function update(req, res){

    User.findById(req.params.id, function (err, user) {
        if (err)
            res.send(err);
        user.firstName = req.body.firstName ? req.body.firstName : user.firstName;
        user.email = req.body.email ? req.body.email : user.email;
        user.age = req.body.age ? req.body.age : user.age;
       // save the contact and check for errors
        user.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'User Info updated',
                data: user
            });
        });
    });
     
} 

//Eliminar
function deletUser(req, res){

    User.remove({_id: req.params.id}, function (err, user) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'User deleted',
            data: user
        });
    });
}


module.exports = {
    create,
    list,
    update,
    deletUser,
    show
}