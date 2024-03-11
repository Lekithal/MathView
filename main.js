class Fraction
{
    constructor(numerator, denominator)
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
        this.operation = operation;
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