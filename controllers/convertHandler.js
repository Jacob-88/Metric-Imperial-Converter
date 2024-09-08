function ConvertHandler() {
  
  this.getNum = function(input) {
    let result = input.match(/[.\d\/]+/g) || ['1']; // Default to "1" if no number is provided
    let num = result[0];
  
    // Check for multiple fractions
    if (num.includes('/')) {
      let fractions = num.split('/');
      if (fractions.length > 2) {
        return 'invalid number'; // Error for multiple slashes
      }
      num = parseFloat(fractions[0]) / parseFloat(fractions[1]); // Convert fraction to decimal
    }
  
    return isNaN(num) ? 'invalid number' : parseFloat(num); // Return number or 'invalid number'
  };

  this.getUnit = function(input) {
    let result = input.match(/[a-zA-Z]+/g)[0]; // Извлечение единицы измерения

    const unit = result.toLowerCase();    
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];

    // Возвращаем 'L' для литров, иначе возвращаем введенную единицу
    if (validUnits.includes(unit)) {
      return unit === 'l' ? 'L' : unit;
    }
    
    return 'invalid unit'; // Если недействительная единица
  };

  this.getReturnUnit = function(initUnit) {
    const returnUnits = {
      'gal': 'L',
      'L': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
    return returnUnits[initUnit];
  };

  this.spellOutUnit = function(unit) {
    const unitsFullName = {
      'gal': 'gallons',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    return unitsFullName[unit];
  };

  this.convert = function(initNum, initUnit) {
    const conversionRates = {
      'gal': 3.78541,
      'L': 1 / 3.78541,
      'mi': 1.60934,
      'km': 1 / 1.60934,
      'lbs': 0.453592,
      'kg': 1 / 0.453592
    };

    // Возвращаем результат как число, округленное до 5 знаков
    const convertedNum = initNum * conversionRates[initUnit];
    return parseFloat(convertedNum.toFixed(5)); // Убедимся, что возвращаем число
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    // Round returnNum to 5 decimal places before displaying
    return `${parseFloat(initNum)} ${this.spellOutUnit(initUnit)} converts to ${returnNum.toFixed(5)} ${this.spellOutUnit(returnUnit)}`;
  };

}

module.exports = ConvertHandler;