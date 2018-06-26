const fs = require('fs');
const versionId = '2.0.5';
const suite = process.argv[2];
const replace = require("replace-in-file");
const options = {
	files: [
		".circleci/config.yml",
        ".circleci/jenkinsconfig.yml",
        "com.visualbi.vdt/META-INF/MANIFEST.MF",
        "com.visualbi.vdt/pom.xml",
        "com.visualbi.vdt/res/additional_properties_sheet/js/vdt-aps.js",
        "com.visualbi.vdt/res/additional_properties_sheet/vdt-aps.html",
        "com.visualbi.vdt/res/config/shim.js",
        "com.visualbi.vdt/res/js/input-component.js",
        "com.visualbi.vdt/res/js/nav-component.js",
        "com.visualbi.vdt/res/js/output-component.js",
        "com.visualbi.vdt/res/js/input-component.js",
        "com.visualbi.vdt/res/js/vdt-component.js",
        "feature/category.xml",
        "feature/feature.xml",
        "feature/pom.xml",
        "pom.xml",
        "processTrial.js",
        "README.md",
        "updatesite/category.xml",
        "updatesite/pom.xml",
        "updatesite/site.xml"
	],
	from: /2.0.4/g,
	to: versionId
};
const suiteOptions = {
	files: [ 
	"com.visualbi.vdt/contribution.xml"
	],
	from: /2.0.4/g,
	to: versionId
};
function replaceFn(jsFolder) { 
	fs.readdir(jsFolder, function (err, items) {
    if (err) {
        console.log(err);
        return;
    }
    for (var i = 0; i < items.length; i++) {
        fs.rename(jsFolder+items[i], jsFolder+items[i].replace('2.0.4',versionId+'.0'), function (err) {
            if (err) console.log('ERROR: ' + err);
        });
        console.log(i+1 + " : " + items[i] + ' Renamed Successfully');
    }
	});
}

try {
	let changes;
	let change;
	var folderList=["com.visualbi.vdt/res/js/"];
	
	if(suite==='mod'){
	    change= replace.sync(suiteOptions);
		console.log("Modified file:", change);
	}else{
		changes = replace.sync(options);
		for(var f=0; f<folderList.length; f++){
			replaceFn(folderList[f]);
		}	
		console.log("Modified files:", changes.join(", "));
	}
} catch (error) {
	console.error("Error occurred:", error);
}
