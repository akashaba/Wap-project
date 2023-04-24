let db = [];
let counter = 0;

class Product {
    constructor(id, title, description, price) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
    }

    save(){
        this.id = ++counter; //start with 1;
        db.push(this);
        return this;
    }

    edit(){
        const index = db.findIndex(prod => prod.id == this.id);
        db.splice(index, 1, this);
        return this;
    }

    

    static getAll(){
        return db;
    }

    static deleteById(prodId){
        const index = db.findIndex(prod => prod.id == prodId);
        const deletedProd = db[index];
        db.splice(index, 1);
        return deletedProd;
    }
}

let prod1 = new Product( 1,'iphone', 50, 'Durable');

prod1.save();

// db.push(prod1);

module.exports = Product;