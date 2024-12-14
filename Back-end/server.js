const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');
const teamRoutes = require('./routes/teamRoutes');
const playersRoutes = require('./routes/playerRoutes');
const leagueRoutes = require('./routes/leagueRoutes');
const matchRoutes = require('./routes/matchRoutes');
const matchdayRoutes = require('./routes/matchdayRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



mongoose.connect('mongodb+srv://juradotrillosergio1207:sjurtri1207@clustertfg.xv2do.mongodb.net/voley-journal?retryWrites=true&w=majority&appName=ClusterTFG', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));


app.use('/api/users', userRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/players', playersRoutes);
app.use('/api/leagues', leagueRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/matchdays', matchdayRoutes);


app.get('/', (req, res) => {
    res.send('API funcionando correctamente');
    console.log("Funcionando correctamente")
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});