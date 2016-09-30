global.DATABASE_URL = 'mongodb://localhost/shopping-list-test';

var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server.js');
var Item = require('../models/item');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

describe('Shopping List', function() {
    before(function(done) {
        server.runServer(function() {
            Item.create({
                name: 'Broad beans'
            }, {
                name: 'Tomatoes'
            }, {
                name: 'Peppers'
            }, function() {
                done();
            });
        });
    });
    it('should list items on GET', function(done) {
        // Chai Http makes request to app.
        chai.request(app)
        // Make a GET Request to the endpoint /items.
            .get('/items')
        // When request is complete do the following code.
            .end(function(err, res) {
            should.equal(err, null);
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body.should.have.length(3);
            res.body[0].should.be.a('object');
            res.body[0].should.have.property('id');
            res.body[0].should.have.property('name');
            res.body[0].id.should.be.a('number');
            res.body[0].name.should.be.a('string');
            res.body[0].name.should.equal('Broad beans');
            res.body[1].name.should.equal('Tomatoes');
            res.body[2].name.should.equal('Peppers');
            done();
        });
    });
    it.only('should add an item on POST', function(done) {
        chai.request(app).post('/items').send({'name': 'Kale'}).end(function(err, res) {
            should.equal(err, null);
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('object');
            // res.body.should.have.property('id');
            // res.body.should.have.property('name');
            // res.body.name.should.be.a('string');
            // res.body.id.should.be.a('number');
            // res.body.name.should.equal('Kale');
            // Once using Mongo no longer have 'storage'
            // chai.request(app).get(items)...end(function(err, resp){....done();})
            chai.request(app).get('/items').end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.should.have.length(4);
                // res.body.should.be.a('object');
                // res.body.should.have.property('id');
                // res.body.should.have.property('name');
                // res.body.id.should.be.a('number');
                // res.body.name.should.be.a('string');
                // res.body.name.should.equal('Kale');
                res.body[3].name.should.equal('Kale');
                done();
            });
        });
    });
    it('should edit an item on PUT', function(done) {
        chai.request(app).put('/items/1/Pickles').send({"name": "Pickles"}).end(function(err, res) {
            res.should.have.status(200);
            storage.items.should.be.a('array');
            storage.items[1].should.be.a('object');
            storage.items[1].should.have.property('name');
            storage.items[1].should.have.property('id');
            storage.items[1].name.should.be.a('string');
            storage.items[1].id.should.be.a('number');
            storage.items[1].name.should.equal("Pickles");
            done();
        });
    });
    it('should delete an item on DELETE', function(done) {
        chai.request(app).delete('/items/1').end(function(err, res) {
            should.equal(err, null);
            res.should.have.status(200);
            done();
        });
    });
    it('should return error when body not present POST', function(done) {
        chai.request(app).post('/items').end(function(err, res) {
            should.not.equal(err, null);
            res.should.have.status(400);
            done();
        });
    });
    after(function(done) {
        Item.remove(function() {
            done();
        });
    });
});
