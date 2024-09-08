const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {

  test('convertHandler should correctly read a whole number input', function(done) {
    assert.equal(convertHandler.getNum('32L'), 32);
    done();
  });

  test('convertHandler should correctly read a decimal number input', function(done) {
    assert.equal(convertHandler.getNum('3.2L'), 3.2);
    done();
  });

  test('convertHandler should correctly read a fractional input', function(done) {
    assert.equal(convertHandler.getNum('1/2L'), 0.5);
    done();
  });

  test('convertHandler should correctly read a fractional input with a decimal', function(done) {
    assert.equal(convertHandler.getNum('2.5/5L'), 0.5);
    done();
  });

  test('convertHandler should return an error on a double-fraction (i.e. 3/2/3)', function(done) {
    assert.equal(convertHandler.getNum('3/2/3L'), 'invalid number');
    done();
  });

  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function(done) {
    assert.equal(convertHandler.getNum('L'), 1);
    done();
  });

  test('convertHandler should correctly read each valid input unit', function(done) {
    const input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    input.forEach(function(ele) {
      assert.equal(convertHandler.getUnit(ele), ele);
    });
    done();
  });

  test('convertHandler should return an error for an invalid input unit', function(done) {
    assert.equal(convertHandler.getUnit('32g'), 'invalid unit');
    done();
  });

  test('convertHandler should return the correct return unit for each valid input unit', function(done) {
    const input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    const expect = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
    input.forEach(function(ele, i) {
      assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
    });
    done();
  });

  test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function(done) {
    const input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    const expect = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
    input.forEach(function(ele, i) {
      assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
    });
    done();
  });

  test('convertHandler should correctly convert gal to L', function(done) {
    assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.00001);
    done();
  });

  test('convertHandler should correctly convert L to gal', function(done) {
    assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.00001);
    done();
  });

  test('convertHandler should correctly convert mi to km', function(done) {
    assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.00001);
    done();
  });

  test('convertHandler should correctly convert km to mi', function(done) {
    assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.00001);
    done();
  });

  test('convertHandler should correctly convert lbs to kg', function(done) {
    assert.approximately(convertHandler.convert(1, 'lbs'), 0.45359, 0.00001);
    done();
  });

  test('convertHandler should correctly convert kg to lbs', function(done) {
    assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.00001);
    done();
  });
  test('convertHandler should correctly read a fractional input', function() {
    assert.equal(convertHandler.getNum('1/2mi'), 0.5);
  });

  test('convertHandler should correctly read a fractional input with a decimal', function() {
    assert.equal(convertHandler.getNum('2.5/5km'), 0.5);
  });

  test('convertHandler should correctly return an error on a double-fraction', function() {
    assert.equal(convertHandler.getNum('3/2/3kg'), 'invalid number');
  });

  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function() {
    assert.equal(convertHandler.getNum('kg'), 1);
  });

  test('convertHandler should round the returnNum to 5 decimal places', function() {
    const initNum = 5;
    const initUnit = 'gal';
    const returnNum = convertHandler.convert(initNum, initUnit);
    assert.approximately(returnNum, 18.92705, 0.00001); // Rounding to 5 decimals
  });

});
