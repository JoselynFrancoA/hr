const app = require('./app');
const PORT = process.env.PORT || 3000;
const cors = require('cors');
app.use(cors());
app.listen(PORT, () => {
console.log(`Servidor escuchando en el puerto ${PORT}`);
});
