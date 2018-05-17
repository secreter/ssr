
var fs = require('fs');
var path = require('path');

// var assets,assetsData = {};

const assetsPath = path.join(__dirname,'../../dist/assets.json');

let assets = JSON.parse(fs.readFileSync(assetsPath));
// updateAssets();

// function updateAssets(){
//     assets = JSON.parse(fs.readFileSync(assetsPath));
//     loger.info("update assets.json",JSON.stringify(assets));
//     assetsData = {
//         manifest : assets.manifest.js,
//         vendor : assets.vendor.js,
//         pb_args : assets.pb_args.js
//     };
// }

// loger.info('Start timing update assets.json');
// schedule.scheduleJob('*/5 * * * *', updateAssets);
//
// exports.mergeAssets = function(name,options = {}){
//     assetsData.page = !assets[name]? {} : assets[name];
//     return _.assign(options,{assetsData});
// };
//
// exports.updateAssets = updateAssets;

module.exports = assets;