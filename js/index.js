
const electron = require("electron"); 
const osinfo = require('systeminformation');
const BrowserWindow = electron.remote.BrowserWindow; 
const path = require("path"); 
const fs = require("fs"); 

var platform = process.platform;
// Importing dialog module using remote 
const dialog = electron.remote.dialog; 

// let win = BrowserWindow.getAllWindows()[0]; 
let win = BrowserWindow.getFocusedWindow(); 
var usbDetect = require('usb-detection');
 
usbDetect.startMonitoring();

// usbDetect.on('add', function(device) {
//     console.log(device);
// });
 
usbDetect.find(function(err, devices) {
    console.log(devices);
    for(var i=1;i<=devices.length;i++){
        alert(devices[i].deviceName+" is attached");
    }
});

var screenshot = document.getElementById("screenshot"); 
screenshot.addEventListener("click", (event) => { 
	win.webContents 
		.capturePage({ 
			x: 0, 
			y: 0, 
			width: 800, 
			height: 600, 
		}) 
		.then((img) => { 
			dialog 
				.showSaveDialog({ 
					title: "Select the File Path to save", 
				
					// Default path to assets folder 
					defaultPath: path.join(__dirname, 
										"./assets/image.png"), 
				
					// defaultPath: path.join(__dirname, 
					// '../assets/image.jpeg'), 
					buttonLabel: "Save", 
				
					// Restricting the user to only Image Files. 
					filters: [ 
						{ 
							name: "Image Files", 
							extensions: ["png", "jpeg", "jpg"], 
						}, 
					], 
					properties: [], 
				}) 
				.then((file) => { 
                    
					// Stating whether dialog operation was 
					// cancelled or not. 
					console.log(file.canceled); 
					if (!file.canceled) { 
						console.log(file.filePath.toString()); 

						// Creating and Writing to the image.png file 
						// Can save the File as a jpeg file as well, 
						// by simply using img.toJPEG(100); 
						fs.writeFile(file.filePath.toString(), 
									img.toPNG(), "base64", function (err) { 
							if (err) throw err; 
							console.log("Saved!"); 
                        }); 
                        console.log(file.filePath.toString())
                        window.localStorage.setItem('detail',file.filePath.toString())
                        var savedDetail=localStorage.getItem('detail');
                        console.log("Saved in localstorage",savedDetail)
					} 
				}) 
				.catch((err) => { 
					console.log(err); 
				}); 
		}) 
		.catch((err) => { 
			console.log(err); 
        }); 
        
});


var arch=osinfo.osInfo()
  .then(data =>{document.getElementById("arch").innerHTML=data.arch,
                document.getElementById("osname").innerHTML=data.platform,
                console.log(data)
})
   
  .catch(error => console.error(error)); 

var ramAvailable = osinfo.mem()
  .then(data =>{document.getElementById("available").innerHTML=(data.available/1073741824).toFixed(2)+"GB",
  document.getElementById("total").innerHTML=(data.total/1073741824).toFixed(2)+"GB"
})
   
  .catch(error => console.error(error));

var diskInformation=osinfo.diskLayout()
    .then(data =>document.getElementById("size").innerHTML=(data[0].size/1073741824).toFixed(2)+"GB")
   
  .catch(error => console.error(error));



 
