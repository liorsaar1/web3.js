    
    //=======================================
    // web3
    //=======================================
    var Web3 = require('web3');
    var web3 = new Web3();
    var providerUrl = 'http://lior.ide.tmp.ether.camp:8555/sandbox/5c23221f01afdce32f42427138e05e277cd30347'
    web3.setProvider(new web3.providers.HttpProvider(providerUrl));
    web3.eth.defaultAccount = "0x4ed0c969c46e1240173679183a31cf4d104c232c";
    
    //=======================================
    // namereg
    //=======================================
    var NameReg = require('./namereg');
    var namereg = NameReg.getInstance(web3);
    namereg.addressOf('Wallet', function(err, address) {
        var TAG = "namereg.addressOf('Wallet'): ";
        if (err) {
            console.log(TAG, "ERROR", err);
            return;
        }
        if (address == 0x0) {
            console.log(TAG, "NOT FOUND");
            return;
        }
        console.log(TAG, address);
    });
    
    namereg.addressOf('Oracle', function(err, address) {
        var TAG = "namereg.addressOf('Oracle'): ";
        if (err) {
            console.log(TAG, "ERROR", err);
            return;
        }
        if (address == 0x0) {
            console.log(TAG, "NOT FOUND");
            return;
        }
        console.log(TAG, address);
        setOracle(address);
    });
    
    //=======================================
    // Oracle
    //=======================================
    var Oracle = require('./oracleDef');
    var oracleInstance;
    function setOracle(address) {
        oracleInstance = Oracle.getInstance(web3, address);
        
        var oracleNotify = oracleInstance.Notify();
        
        // watch for changes
        oracleNotify.watch( function(err, result) {
            var TAG = "oracleNotify.watch: ";
            if (err) {
                console.log(TAG, "ERROR", err);
                return;
            }
            console.log(TAG, "Notify", result.args);
        });
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