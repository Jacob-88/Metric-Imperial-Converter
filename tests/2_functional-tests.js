const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  test('Convert a valid input such as 10L: GET request to /api/convert', function(done) {
    chai.request(server)
      .get('/api/convert?input=10L')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, 'L');
        assert.equal(res.body.returnNum, 2.64172);
        assert.equal(res.body.returnUnit, 'gal');
        done();
      });
  });

  test('Convert an invalid input such as 32g: GET request to /api/convert', function(done) {
    chai.request(server)
      .get('/api/convert?input=32g')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body, 'invalid unit');
        done();
      });
  });

  test('Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert', function(done) {
    chai.request(server)
      .get('/api/convert?input=3/7.2/4kg')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body, 'invalid number');
        done();
      });
  });

  test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert', function(done) {
    chai.request(server)
      .get('/api/convert?input=3/7.2/4kilomegagram')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body, 'invalid number and unit');
        done();
      });
  });

  test('Convert with no number such as kg: GET request to /api/convert', function(done) {
    chai.request(server)
      .get('/api/convert?input=kg')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, 'kg');
        assert.equal(res.body.returnNum, 2.20462);
        assert.equal(res.body.returnUnit, 'lbs');
        done();
      });
  });

  test('Convert a fractional input (e.g., 1/2mi)', function(done) {
    chai.request(server)
      .get('/api/convert?input=1/2mi')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 0.5);
        assert.equal(res.body.initUnit, 'mi');
        assert.approximately(res.body.returnNum, 0.80467, 0.00001); // Should round to 5 decimals
        assert.equal(res.body.returnUnit, 'km');
        done();
      });
  });

  test('Convert a fractional input with a decimal (e.g., 2.5/5km)', function(done) {
    chai.request(server)
      .get('/api/convert?input=2.5/5km')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 0.5);
        assert.equal(res.body.initUnit, 'km');
        assert.approximately(res.body.returnNum, 0.31069, 0.00001); // Should round to 5 decimals
        assert.equal(res.body.returnUnit, 'mi');
        done();
      });
  });

});
