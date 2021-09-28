const express = require('express');
const morgan = require('morgan');


class Server{
    constructor(){
        this.app = express();
        this.port = 3000;

        this.routes();
        this.middlewares();
    }

    routes(){
        this.app.use('/api/etl', require('./routes/etl.routes'));
    }

    middlewares(){  
        this.app.use(express.json());
        this.app.use(morgan('dev'));
    }

    listen() {
        
        this.app.listen(this.port, () => {
            console.log(`Aplicacion corriendo en el puerto ${this.port}`);
        });
    }
}

module.exports = Server;