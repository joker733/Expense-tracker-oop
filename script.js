"use strict";

// Class representing a single expense
class Expense {
  constructor(name, amount) {
    this.name = name;
    this.amount = parseFloat(amount);
    this.id = Date.now(); // Unique ID for each expense
  }
}

// Class to handle the expense tracker logic
class ExpenseTracker {
  constructor() {
    this.expenses = [];
    this.total = 0;
    this.loadFromLocalStorage(); // Load saved expenses
  }

  // Add new expense
  addExpense(name, amount) {
    if (name === "" || amount <= 0) {
      alert("Please enter a valid name and amount!");
      return;
    }

    const expense = new Expense(name, amount);
    this.expenses.push(expense);
    this.updateTotal();
    this.saveToLocalStorage();
    this.renderExpenses();
  }

  // Remove an expense
  removeExpense(id) {
    this.expenses = this.expenses.filter((expense) => expense.id !== id);
    this.updateTotal();
    this.saveToLocalStorage();
    this.renderExpenses();
  }

  // Update the total amount
  updateTotal() {
    this.total = this.expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
  }

  // Save to LocalStorage
  saveToLocalStorage() {
    localStorage.setItem("expenses", JSON.stringify(this.expenses));
  }

  // Load from LocalStorage
  loadFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem("expenses"));
    if (data) {
      this.expenses = data;
      this.updateTotal();
    }
  }

  // Render expenses in the UI
  renderExpenses() {
    const expenseList = document.getElementById("expense-list");
    const totalAmount = document.getElementById("total-amount");

    // Clear list before re-rendering
    expenseList.innerHTML = "";

    this.expenses.forEach((expense) => {
      const li = document.createElement("li");
      li.classList.add("expense-item");
      li.innerHTML = `${expense.name}: $${expense.amount} 
                <button onclick="tracker.removeExpense(${expense.id})">X</button>`;
      expenseList.appendChild(li);
    });

    // Update total amount display
    totalAmount.textContent = this.total;
  }
}

// Initialize ExpenseTracker instance
const tracker = new ExpenseTracker();
console.log(tracker);
tracker.renderExpenses(); // Render saved expenses on page load

// Handle button click event
document.getElementById("add-expense").addEventListener("click", function () {
  const name = document.getElementById("expense-name").value;
  const amount = document.getElementById("expense-amount").value;

  tracker.addExpense(name, amount);

  // Clear input fields
  document.getElementById("expense-name").value = "";
  document.getElementById("expense-amount").value = "";
});
