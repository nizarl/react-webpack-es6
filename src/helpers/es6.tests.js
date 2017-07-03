//const x = 100;
//console.log('me',x);

// var topic = 'javascript';
// if (topic) {
//     let topic = 'React';
//     console.log('block', topic)
// }
// (function(){
//     var topic = '123'
//     console.log('func',topic);
// })()
// console.log('global', topic);

// var lastName = "Lakh";

// console.log(`${lastName}`);

// function name(lastName="Lakh") {
//     console.log(`${lastName}`)
// }

// name('abc');

// var lastName  = (lastName = "Test") => `sir ${lastName}`

// console.log(lastName());


var tahoe = {
    resorts: ["Kirkwood", "Squaw", "Alpine", "Heavenly", "Northstar"],
    print: function (delay = 1000) {
        setTimeout( () => {
            console.log(this.resorts.join(","))
        }, delay)
    }
}
tahoe.print(500);