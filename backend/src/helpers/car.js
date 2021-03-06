const db = require('../utils/db');
const queries = require('../utils/queries');

const createCar = async  (req, res) => {
    try{
    await db.query('BEGIN');
    const id = req.params.id;
    const product = await db.query(queries.GET_PRODUCTBYID,[id]);

    if(product.rows != ''){

    console.log('Product Found!');
    console.log(req.session)
    car = req.session.car;
    car.push({id: product.rows[0].product_id, name: product.rows[0].product_name, price: product.rows[0].product_price});
    req.session.car = car

    res.status(200).send(req.session);
    }else{

        console.log(`Product not Found ${id}`);
        res.status(400).send('Product Not found!');
    }
    }catch(err){
        res.status(500).send('Server Error!')
        throw err;
    }
}

const deleteItem = async (req, res) => {
    const id = req.params.id;
    try{
        await db.query('BEGIN');
        const checkId = await db.query(queries.CHECKPRODUCTID, [id]);

        if(checkId.rows != ''){
            console.log('Product Found!');

            car = req.session.car;
            const itemIndex = car.findIndex((element, itemIndex) => {
                console.log(element.id)
                if (element.id === checkId.rows[0].product_id) {
                  return element.id;
                }
              });
            console.log("el index: " + itemIndex);
            if(itemIndex != -1){
            car.splice(itemIndex, 1);
            console.log(req.session);
            res.status(200).send('Product Deleted!')
        }else{
            console.log('Product not found in the car!')
            res.status(400).send('Product not Found in the car!')
        }

        }else{
            console.log(`Item not found!`);
            res.status(400).send('Item not found!')
        }
    }catch(err){
        res.status(500).send('Server Error!')
        throw err;
    }
}

module.exports = {
    createCar,
    deleteItem
}