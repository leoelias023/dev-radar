// Initials configurations
    const PORT = 3333;

// External MODULES
    // Express
        const express = require('express');
        const app = express();
    // Cors
        const cors = require('cors');
        app.use(cors());
    // Mongoose
        const mongoose = require('mongoose');
        mongoose.connect('mongodb+srv://leoelias02:l10o15p3@cluster0-xllre.mongodb.net/test?retryWrites=true&w=majority' , {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }).then( () => {
            console.log('Bank Conected');
        }).catch((err) => {
            console.log('Erro: '+err);
        }) 
        // BodyParser
            app.use(express.json());
// Internal MODULES
    // ROUTES
        // Dev
            const devRt = require('./routes/dev/main');
            app.use('/dev' , devRt);
        // Search
            const searchRt = require('./routes/search/main');
            app.use('/search' , searchRt);

// Main configs
    app.use(express.json());

// Routes
    app.get('/' , (req,res) => {
        return res.json({mensagem: 'ola mundo!'});
    })

app.listen(PORT , () => {
    console.log('Server is opened!');
});