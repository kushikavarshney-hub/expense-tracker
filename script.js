const form=document.getElementById("transaction-form");
const descriptionInput=document.getElementById("description");
const amountInput=document.getElementById("amount");
const typeInput=document.getElementById("type");
const balanceElement=document.getElementById("balance");
const transactionList=document.getElementById("transaction-list");

let transactions=JSON.parse(localStorage.getItem("transactions"))||[];
function updateUI(){
    transactionList.innerHTML="";
    let balance=0;
    transactions.forEach((transaction)=>{
        const li=document.createElement("li");
        li.classList.add(transaction.type);
        li.innerHTML=`${transaction.description}-${transaction.amount}`;
        transactionList.appendChild(li);
        if(transaction.type==="income"){
            balance+=transaction.amount;
        }else{
            balance-=transaction.amount;
        }
    });
    balanceElement.textContent=balance;
    localStorage.setItem("transactions",JSON.stringify(transactions));
}
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const transaction={
        description:descriptionInput.value,
        amount:Number(amountInput.value),
        type:typeInput.value
    };
    transactions.push(transaction);
    form.reset();
    updateUI();
});
updateUI();