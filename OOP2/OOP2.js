//Script for the tasks to be delivered in week 4

class BankAccount {
    constructor ( clientNumber, clientName, amount ) {
        this.clientNumber = clientNumber;
        this.clientName = clientName
        this.amount  = parseInt(amount) 
    }
    amountNow() {
        return this.amount
    }
    withdraw(withdrawAmount) {
        this.withdrawAmount = withdrawAmount
        if (this.amount < this.withdrawAmount) {
                return console.log(this.clientName + " does not have enough money to withdraw this amount")
        }
        else {
            this.amount = (this.amount - withdrawAmount)
        }
        return console.log("New amount: " + this.amountNow())
    }
    deposit(depositAmount) {
        this.depositAmount = depositAmount
        this.amount = (this.amount + depositAmount)
        return console.log("New amount: " + this.amountNow()) // We have no way of verifying if the person has the equity to deposit
    }
    accountInfo() {
        return console.log(this.clientName + " with client number " + this.clientNumber + " has " + this.amount + "$ available")
    }
}
class ChildAccount extends BankAccount {
    constructor ( clientNumber, clientName, age) {
        super( clientNumber, clientName)
        this.age = age
        this.amount = 200        
        this.age = age

        if (age > 3) {
            console.log("error, cannot make child account, age to high")
            this.amount = 0
        }
    }
}

let jens = new ChildAccount(4, "Jens", 6)
let kari = new BankAccount(92349, "Kari", 600)