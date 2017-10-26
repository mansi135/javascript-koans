var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = [];

      /* solve using filter() & all() / any() */
      var noNuts = _(products).filter(function(p) { return p.containsNuts === false });

      var hasMush = function(ingredients){
        return  _(ingredients).any(function(ing) { return ing === 'mushrooms' });
      }

      _(noNuts).forEach(function(noNut) { 
        if (!hasMush(noNut.ingredients)){
          productsICanEat.push(noNut);
        }
      });

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var sum = 0;    /* try chaining range() and reduce() */
    sum = _.range(1000).reduce(
        function(tot,x) {
          if (x % 3 === 0 || x % 5 === 0) {
            tot += x;
          }
          return tot;
        },0

      );

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    var tt =  _(products).chain()
                   .map(function(p) { return p.ingredients })
                   .flatten()
                   .reduce(function(obj,ingr) { 
                      if(ingr in obj) { obj[ingr] +=1 ;}
                      else { obj[ingr] =1 ;}
                      return obj;
                    }, {})
                   .value();

    ingredientCount = tt;

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  
  function isPrime(n){
      
      if(n<=1){
        return false;
      }

      for(var j=2; j<n; j++){
        if (n%j === 0){
          return false;
        }
      }

      return true;
    }

  it("should find the largest prime factor of a composite number", function () {

    var prime = function largestPrime(num){
        if(isPrime(num)) { return "Please Enter a composite number first!!"; }
        
        var p =  _.range(num-1, 1, -1).filter(function(i) {
              if(num%i === 0 && isPrime(i)){
              return i;
            }
          });

        if (p.length !==0) return p[0];
        else return undefined;

      } 

    expect(prime(11)).toEqual('Please Enter a composite number first!!');
    expect(prime(10)).toBe(5);
    expect(prime(1)).toEqual(undefined);

  });

  
  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {

    function isPalindrome(num) {
      return num === Number(num.toString().split('').reverse().join('')) ;
    }

    var parry =[];

    for(var i = 100; i < 1000; i++) {
      for(var j = i; j < 1000; j++) {
        if(isPalindrome(i*j)) {
          parry.push(i*j);
        }
      }
    }

    var largest = _.reduce(parry,function(l,item) {
      if (item > l) {
        l = item;
      }
      return l;
    },0);

    expect(largest).toBe(906609);
    
  }); 

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
      
    function smallestDivisibleNumber(n){

      smallestNumb = n+1;
      flag = true;

      while (true) {
        
        for (var i=1; i<=n; i++){
          if (smallestNumb%i !== 0){
            flag = false;
            break;
          }
        } 

     /*   _.range(1,n+1).forEach(function(i) {    //This implementation worked, but makes it very slow!
          if (smallestNumb%i !== 0)
            flag = false;
        });   */                
        
        if(flag){
          return smallestNumb;
        }
        else {
          smallestNumb += 1 ;
          flag = true;
        }
      
      }
      
    }
    
    expect(smallestDivisibleNumber(20)).toBe(232792560);

  }); 

  it("should find the difference between the sum of the squares and the square of the sums", function () {

    function difference(n) {

      var sumOfSquares = _.range(1,n+1).reduce(function(tot,item) {
        return tot += item*item;
      },0);

      var sum = _.range(1,n+1).reduce(function(tot,item) {
        return tot += item;
      },0);

      return sumOfSquares - (sum*sum) ;
    }

    expect(difference(10)).toBe(-2640);
    
  });  

  it("should find the 10001st prime", function () {
      
      function nthPrime(n){
        var i = 2;
        var count = 0;
        while(true) {
          if (isPrime(i)){
            count += 1;
            if (count === n) {
              return i;
            }
          }
          i = i+1 ;
        }
      }
     
    expect(nthPrime(10001)).toBe(104743);
    
  }); 
  
});
