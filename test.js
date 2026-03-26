const lastPaidDate = new Date("2026-04-15T00:00:00.000+00:00");
console.log(lastPaidDate+1)
const currentdate = new Date()

let expiraydate = new Date(lastPaidDate)
expiraydate.setDate(expiraydate.getDate()+30)

if(expiraydate > currentdate){
    console.log("has paid ")

}
else{
    console.log("has't paid")
}