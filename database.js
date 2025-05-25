const mongoose = require('mongoose');

const url = `mongodb+srv://leonardo:eoMjNwt3P93uyhPn@gymdb.7po6f.mongodb.net/GymDB?retryWrites=true&w=majority&appName=GymDB`;

// Esquema do usuário
const UserSchema = new mongoose.Schema({
  email: String,
  password: String
});

// Modelo baseado no esquema
const User = mongoose.model('User', UserSchema);

async function conectDB() {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('✅ Conectado ao MongoDB com sucesso');
    } catch (err) {
      console.error('❌ Erro ao conectar ao MongoDB:', err);
    }
  }
}

async function searchUser(user) {
  await conectDB();
  // Faz a busca usando o modelo do Mongoose
  const userDatabase = await User.findOne({
    email: user.email,
    password: user.password
  }).lean();

  return userDatabase || {};
}

module.exports = {
  searchUser
};
