const sql = require("mysql2/promise")

/*
Conexão ao MongoDB - Ainda com erros
const mongoose = require('mongoose');
const url = `mongodb+srv://leonardo:eoMjNwt3P93uyhPn@gymdb.7po6f.mongodb.net/GymDB?retryWrites=true&w=majority&appName=GymDB`;
*/

/*
// Esquema do usuário
const UserSchema = new mongoose.Schema({
  email: String,
  password: String
});
*/
// Modelo baseado no esquema
//const User = mongoose.model('User', UserSchema);

async function conectDB() {
  
  if(global.conection && global.conection.state !== 'disconnected') 
  {
      return global.conection;
  }

  const conection = await sql.createConnection(
    { 
        host     : 'localhost', 
        port     : 3306, 
        user     : 'root',
        password : '', 
        database : 'fitrack' 
    }); 
    
  console.log('Conectou no MySQL!'); 

  global.conection = conection; 
  return global.conection; 

  /*
  Conexão ao MongoDB - Ainda com erros 

  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('Conectado ao MongoDB com sucesso');
    } catch (err) {
      console.error('Erro ao conectar ao MongoDB:', err);
    }
  }
  */

}

async function searchUser(user) {

  const conect = await conectDB();
  const sql = "select * from user where email=? and password=?;";
  const [userSelected] = await conect.query(sql,[user.email, user.password]);
  console.log("!!!", user)
  return userSelected && userSelected.length>0 ? userSelected[0] : {};

  /*
  await conectDB();
  // Faz a busca usando o modelo do Mongoose
  const userDatabase = await User.findOne({
    email: user.email,
    password: user.password
  }).lean();

  return userDatabase || {};
  */
}

async function searchAdmin(admin) {

  const conect = await conectDB();
  const sql = "select * from admin where name=? and password=?;";
  const [adminSelected] = await conect.query(sql,[admin.name, admin.password]);
  return adminSelected && adminSelected.length>0 ? adminSelected[0] : {};

  /*
  await conectDB();
  // Faz a busca usando o modelo do Mongoose
  const userDatabase = await User.findOne({
    email: user.email,
    password: user.password
  }).lean();

  return userDatabase || {};
  */
}

async function userData(user) {
  await conectDB();

  const userFound = await User.find({ id: user }).lean();
  return userFound;
}

module.exports = {
  searchUser,
  userData,
  searchAdmin
};
