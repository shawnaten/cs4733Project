/**
 * Created by Sohail on 11/2/15.
 */

function pinGenerator()
{
    var code = '';
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 6; i++) {
        code += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return code;

}
module.exports.pinGenerator = pinGenerator();