var Usuario = require('./usuario.model');


function retornaUsuarios(req, res) {
  var query = Usuario.find({});
  query.exec(function (error, usuarios) {
    if (error)
      res.send(error);
    res.json(usuarios);
  });
};

function retornaUsuario(req, res) {
  Usuario.findById(req.params.id, function (error, usuario) {
    if (error)
      res.send(error);
    res.json(usuario);
  });
};

function adicionaUsuario(req, res) {
  var novoUsuario = new Usuario(req.body);
  novoUsuario.save(function (error, usuario) {
    if (error) {
      res.status(400).json('Usuario nao criado.');
    } else {
      res.status(201).json('Usuario criado.');
    }
  });
};

function atualizaUsuario(req, res) {
  const usuarioId = req.params.id;
  Usuario.findById({ _id: usuarioId }, function (error, usuario) {
    if (error)
      res.send(error);
    Object.assign(usuario, req.body).save(function (error, usuario) {
      if (error)
        res.send(error);
      res.json({ message: "Usuário atualizado.", usuario });
    });
  });
};

function deletaUsuario(req, res) {
  const usuarioId = req.params.id;
  Usuario.remove({ _id: usuarioId }, function (error, resultado) {
    if(error)
      res.send(error)
    res.json({ message: "Usuário deletado.", resultado});
  });
};

function retornaUsuarioPorEmail(emailUsuario) {
  return Usuario.findOne({'email': emailUsuario});
}

module.exports = {retornaUsuario, 
  retornaUsuarios, adicionaUsuario, 
  atualizaUsuario, deletaUsuario, retornaUsuarioPorEmail};

/**
 * 
 
exports.retornaUsuarioPorEmail(emailUsuario) = {
  return: Usuario.findOne({ 'email': emailUsuario })
};
*/