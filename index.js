const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db=mongoose.connect('mongodb://localhost:27017/customercli');

const Customer = require('./models/Customer');

const addCustomer = (customer) => {
    Customer.create(customer).then(customer => {
        console.info('New Customer Added');
        db.close();
    })
}

const findCustomer = (name) => {

    const search = new RegExp(name, 'i');
    Customer.find({$or: [{firstname: search}, {lastname: search}]})
    .then(customer => {
        console.info(customer);
        console.info(`${customer.length} matches.`);
        db.close();
    });
}

const updateCustomer = (_id, customer) =>{
    Customer.updateOne({_id}, customer)
    .then(customer => {
        console.info(' Customer updated');
        db.close();
    })
}

const removeCustomer = (_id) =>{
    Customer.deleteOne({_id})
    .then(() => {
        console.info(' Customer Removed');
        db.close();
    })
}

const listCustomers = () => {
    Customer.find()
    .then(customers => {
        console.info(customers);
        console.info(`${customers.length} customers.`);
        db.close();
    })
}

module.exports = {
    addCustomer,
    findCustomer,
    updateCustomer,
    removeCustomer,
    listCustomers
}