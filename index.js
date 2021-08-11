
const express = require('express');
const app = express();
const fs = require('fs');

let contadorItems = 0;
let contadorItemsRandom = 0;

const server = app.listen(8080, () =>{
    console.log('Escuchando en el puerto 8080.');
});

app.get('/items', async (req, res)=>{    
    try {
        const data = await fs.promises.readFile('./productos.json');
        const json = JSON.parse(data.toString('utf-8'));        
        let productos = {
            items: json,
            cantidad: 0
        }
        productos.cantidad = productos.items.length;
        contadorItems++;

        res.send(productos);
    } catch (err) {
    console.log('Error');
    }
});

app.get('/item-random', async (req, res)=>{    
    try {
        const data = await fs.promises.readFile('./productos.json');
        const json = JSON.parse(data.toString('utf-8'));    
        let numero = Math.floor(Math.random() * (json.length - 0)) + 0;    
        contadorItemsRandom++;
        
        res.send(json[numero]);
    } catch (err) {
    console.log('Error');
    }
});

app.get('/visitas', async (req, res)=>{    
    res.send(`<p>
        La ruta /items se visitio ${contadorItems} veces.<br>
        La ruta /item-random se visitio ${contadorItemsRandom} veces.
    </p>`)
});

