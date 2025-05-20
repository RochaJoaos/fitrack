const mongoose = require('mongoose')
const url = `mongodb+srv://leonardo:eoMjNwt3P93uyhPn@gymdb.7po6f.mongodb.net/GymDB?retryWrites=true&w=majority&appName=GymDB`


async function conectDB() {

    const conection = await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('✅ Conectado ao MongoDB com sucesso');
      })
      .catch((err) => {
        console.error('❌ Erro ao conectar ao MongoDB:', err);
      });

    global.conection = conection
    return global.conection
}

async function searchUser(user) {
    const conection = await conectDB()
    const collection = conection.collection('user');

    // Realiza a consulta para encontrar um documento que corresponda
    const userDatabase = await collection.findOne({
      email: user.email,
      password: user.password
    });
  
    // Retorna o usuário encontrado ou um objeto vazio, caso não exista
    return userDatabase || {};
}

conectDB

module.exports = {
    searchUser
}