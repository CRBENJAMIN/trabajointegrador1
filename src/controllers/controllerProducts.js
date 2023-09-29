const path = require ('path');
const fs = require ('fs');
const ruta = path.resolve(__dirname, ' ..');
const jsProducts = fs.readFileSync(ruta, {encoding: 'utf-8'});
const products = JSON.parse(jsProducts)

const controllers = {
    crear:(req, res) => { // post
        const nuevoProducto = req.body;
        products.push(nuevoProducto);
        res.status(200).json(nuevoProducto);
    },
    listar:(req, res) => { // get
        res.json(products);
    },
    detalle:(req, res) => { //get
        const {id}= req.params; 
        console.log("esto es products", products)
    const product = products.filter((product) =>{ return product.id == id});

    res.status(200).json({product});

    },
    actualizar: async (id, nombre, precio, descripcion) => {
        try {
          const response = await fetch(`/api/productos/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              nombre,
              precio,
              descripcion,
            }),
          });
      
          if (!response.ok) {
            throw new Error('No se pudo actualizar el producto.');
          }
      
          const data = await response.json();
          return data;
        } catch (error) {
          console.error(error);
          return null;
        }
      }
};


module.exports = {
    controllers: controllers,
    products: products,
  };
