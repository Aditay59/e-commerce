export const displayINRCurrency = (num) =>{
    // This function is used to format the price according to the indian format
    const formatter = new Intl.NumberFormat('en-IN',{
        style: "currency",
        currency: 'INR',
        minimumFractionDigits: 0
    });

    return formatter.format(num);
}