let isNumber = str => !isNaN(parseFloat(str))

class Expression
{
    constructor(string)
    {
        
        function Valuefy(string)
        {
            let delimiters = ["+", "-", "*", "^"]

            let regex = new RegExp(delimiters.map(d => d.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g');
            let parts = string.split(regex);
            let result = [];
            
            parts.forEach
            (
                (part, index) =>
                {
                    result.push(part);
                    if (index < parts.length - 1)
                    {
                        result.push(string.match(regex)[index]);
                    }
                }
            );
            
            result = result.map(char => 
            {
                if (char.includes("/"))
                {
                    let fraction = char.split("/");
                    let numerator = Number(fraction[0]);
                    let denominator = Number(fraction[1]);

                    return new Fraction(numerator, denominator);
                }
                
                return isNumber(char) ? new Fraction(Number(char), 1) : new Operation(char)
            })
                        
            return result
        }

        

        let regex = /([^(]+)|\(([^)]+)\)/g;
        let matches = string.match(regex).filter(Boolean); // Filter out undefined matches
      
        let result = [];

        for (let i = 0; i < matches.length; i++)
        {
            if (matches[i][0] == "(")
            {
                let text = matches[i];
                text = text.substring(1, text.length - 1);

                result = result.concat(new Expression(text));
            }
            else
            {
                result = result.concat(Valuefy(matches[i]));
            }
        }

        result = result.filter(el => !(el instanceof Operation) || el.operation !== null)

        this.value = result
    }

    nextOperation()
    {
        let index = -1

        //Parenthesis
        index = this.value.findIndex(term => term instanceof Expression);
        if (index != -1) {
            return [index].concat(this.value[index].nextOperation())
        }

        //Exponent
        index = this.value.findIndex(term => term instanceof Operation && term.operation == "^");
        if (index != -1) { return [index]; }

        //Multiplication
        index = this.value.findIndex(term => term instanceof Operation && term.operation == "*");
        if (index != -1) { return [index]; }

        //Addition / Subtraction
        index = this.value.findIndex(term => term instanceof Operation && ["+", "-"].includes(term.operation));
        if (index != -1) { return [index]; }
    }

    html()
    {
        
    }
}

class Fraction
{
    constructor(numerator, denominator = null)
    {
        this.numerator = numerator;
        this.denominator = denominator;
    }

    negate()
    {
        return new Fraction(this.numerator * -1, this.denominator);
    }

    inverse()
    {
        return new Fraction(this.denominator, this.numerator)
    }
}

class Operation
{
    constructor(operation)
    {
        this.operation = "+-*^".includes(operation) && operation != "" ? operation : null;
    }
}


function addition(num1, num2)
{
    if(num1.constructor.name !== "Fraction" || num2.constructor.name !== "Fraction")
    {
        return false;
    }

    let X1 = num1.numerator;
    let X2 = num1.denominator;
    
    let Y1 = num2.numerator;
    let Y2 = num2.denominator;

    return new Fraction(X1 * Y2 + X2 * Y1, X2 * Y2);
}

function subtract(num1, num2)
{
    if(num1.constructor.name !== "Fraction" || num2.constructor.name !== "Fraction")
    {
        return false;
    }

    return addition(num1, num2.negate());
}

function multiply(num1, num2)
{
    if(num1.constructor.name !== "Fraction" || num2.constructor.name !== "Fraction")
    {
        return false;
    }

    let X1 = num1.numerator
    let X2 = num1.denominator
    
    let Y1 = num2.numerator
    let Y2 = num2.denominator

    return new Fraction(X1 * Y1, X2 * Y2)
}

function divide(num1, num2)
{
    if(num1.constructor.name !== "Fraction" || num2.constructor.name !== "Fraction")
    {
        return false;
    }

    return multiply(num2, num2.inverse())
}