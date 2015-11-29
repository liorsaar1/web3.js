    
    //=======================================
    // web3
    //=======================================
    var Web3 = require('web3');
    var web3 = new Web3();
    var providerUrl = 'http://lior.ide.tmp.ether.camp:8555/sandbox/2607070ae2a42ba2b04c5511ec5a3cc51d63dc88'
    web3.setProvider(new web3.providers.HttpProvider(providerUrl));
    web3.eth.defaultAccount = "0x4ed0c969c46e1240173679183a31cf4d104c232c";
    
    //=======================================
    // namereg
    //=======================================
    var NameReg = require('./namereg');
    var namereg = NameReg.getInstance(web3);

    //=======================================
    // Oracle
    //=======================================
    var Oracle = require('./oracleDef');
    var oracleInstance;
    var oracleNotify;
    function setOracle(address) {
        console.log( "setOracle:" + address);
        oracleInstance = Oracle.getInstance(web3, address);
        
        // watch for Notify
        oracleNotify = oracleInstance.Notify();
        oracleNotify.watch( function(err, result) {
            var TAG = "oracleNotify.watch: ";
            if (err) {
                console.log(TAG, "ERROR", err);
                return;
            }
            console.log(TAG, "Notify", result.args);
        });
    }
    
    //=======================================
    // Wallet
    //=======================================
    var Wallet = require('./walletDef');
    var walletInstance;
    var walletText;
    function setWallet(address) {
        console.log( "setWallet:", address);
        walletInstance = Wallet.getInstance(web3, address);
        
        // watch for Text
        walletText = walletInstance.Text();
        walletText.watch( function(err, result) {
            var TAG = "Text.watch: ";
            if (err) {
                console.log(TAG, "ERROR", err);
                return;
            }
            console.log(TAG, "Text", result.args);
        });
        
        //console.log( "setWallet:walletInstance", walletInstance);
        walletInstance.setOracle(address);
        // walletInstance.setPhone("1234");
//        walletInstance.spend(5678);
    }
    
    
    
function getAddressOf(contractName) {
  return new Promise(function(resolve, reject) {
    namereg.addressOf(contractName, function(err, address) {
        var TAG = "namereg.addressOf:" + contractName + ":";
        if (err) {
            console.log(TAG, "ERROR", err);
            return reject(Error(err));
        }
        if (address == 0x0) {
            console.log(TAG, "NOT FOUND");
            return reject(Error("Not Found:" + TAG));
        }
        console.log(TAG, address);
        resolve(address);
    });
  });
}    

getAddressOf('Oracle').then(function(address) {
    setOracle(address);
    return getAddressOf('Wallet');
}, abort).then(function(address) {
    setWallet(address);
}, abort);
    

function abort(error) {
    console.log( "ABORT", error);
    process.exit();
}    
    

//     var Wallet = require('./wallet');
//     var walletInstance;
//     function setWallet(address) {
//         walletInstance = Wallet.getInstance(web3,address);
        
//         var walletNotify = walletInstance.Notify();
        
//         // watch for changes
//         walletNotify.watch(function(err, result){
//             if (err) {
//                 console.log("ERROR: walletNotify.watch", err);
//                 return;
//             }
//             console.log("Notify", result);
//             onWalletNotify(result.args);
//         });
        
//         testWallet();
//     }
    
//     function onWalletNotify(args) {
//         console.log("onWalletNotify", args);
//         var message = "Trying to spend " + args.value.toString(10);
//         sendSms(message);
//     }
    
//     function testWallet() {
//         walletInstance.setPhone("1234");
//         walletInstance.spend(5678);
//     }
    



// // Your accountSid and authToken from twilio.com/user/account
// var accountSid = 'AC4f6908d70926e4b46f7c392280a513fe';
// var authToken = "deeab5e8ac7bca2afdbef7098f425572";
// var fromPhoneNumber = "+15005550006";
// var toPhoneNumber = "+14158105251";

// var production = true;
// if (production) {
//     accountSid = 'AC84a35dc4f573efe9bb9e32e7c0cac63d';
//     authToken = "db322bdc75327a69decea7b89d1b441f";
//     fromPhoneNumber = "+16505420016";
// }


// var client = require('twilio')(accountSid, authToken);
 
// function sendSms(_body) {
//     console.log("sendSms", _body);
//     client.messages.create({
//         body: _body,
//         to: toPhoneNumber,
//         from: fromPhoneNumber
//     }, function(err, message) {
//         if (err) {
//             console.log("ERROR: sendSms", err);
//             return;
//         }
//         console.log(message);
//     });
// }