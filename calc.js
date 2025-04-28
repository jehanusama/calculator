class Calculator {
    constructor( previousoperandButton,currentoperandButton){
        this.previousoperandButton = previousoperandButton
        this.currentoperandButton = currentoperandButton
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }
    appendNumber(number){
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    chooseOperation(operation){
        if(this.currentOperand === '')return
        if(this.previousOperand !==''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case '+':
            computation = prev + current
            break
            case '-':
            computation = prev - current
            break
            case 'x':
            computation = prev * current
            break
            case '÷':
            computation = prev / current
            break
            default:
            return
        }
        this.currentOperand = computation
        this.operation=undefined
        this.previousOperand =''
    }
    getDisplay(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay 
        if (isNaN(integerDigits)){
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en',{
                maximumFractionDigits:0
            })
        }
        if (decimalDigits != null){
            return `${integerDisplay}${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay(){
        this.currentoperandButton.innerText = this.getDisplay(this.currentOperand) 
        if (this.operation != null){
            this.previousoperandButton.innerText = `${this.getDisplay(this.previousOperand)} ${this.operation}`
        } else{
            this.previousoperandButton.innerText = ''
        }
    }
}





const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const allclearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalButton = document.querySelector('[data-equal]');
const previousoperandButton = document.querySelector('[data-previous-operand]');
const currentoperandButton = document.querySelector('[data-current-operand]');


const calculator = new Calculator(previousoperandButton,currentoperandButton)
numberButtons.forEach(button =>{
    button.addEventListener('click',()=> {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button =>{
    button.addEventListener('click',()=> {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click',button=>{
    calculator.compute()
    calculator.updateDisplay()
})

allclearButton.addEventListener('click',button=>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click',button=>{
    calculator.delete()
    calculator.updateDisplay()
})