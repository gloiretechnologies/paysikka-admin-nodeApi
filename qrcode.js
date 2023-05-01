const QRCode = require('qrcode')
const { writeFile } = require("fs")

let data = 
    "upi://pay?pa=ipay.94.198784.8341554859@icici&pn=HARI DATTA CHALAMURI&am=0"   
// let stringdata = JSON.stringify(data) 
QRCode.toString(data,{type:'terminal'},
  function (err, QRcode) {
       if(err) return console.log("error occurred")
       console.log(QRcode)
})   
QRCode.toDataURL(data, function (err, code) {
      if(err) return console.log("error occurred")
      console.log(code)
})
const base64 = "code"
writeFile('image.png', base64, {encoding: 'base64'}, function(err) {
    console.log('File created');
});