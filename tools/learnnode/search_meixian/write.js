/**
 * Created by mefisto on 2016/10/31.
 */
var fs = require('fs');


var resultLength = '123456'

fs.writeFile('./test.txt',resultLength,function(err){
    if(err) throw err;
    console.log('it is ok!');
});

