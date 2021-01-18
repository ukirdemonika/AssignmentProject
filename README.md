1.npm install
2.npm start

For Mac(dmg) add following code in package.json:
 "build": {
    "appId": "com.projectAssignment",
    "productName": "projectAssignment",
    "target":"dmg",
    "directories":{
        "output":"build"
    }
    
  },

For Windows(exe) add following code in package.json:
 "build": {
    "appId": "com.projectAssignment",
    "productName": "projectAssignment",
    "win": {
      "target": "nsis"
    },
    "directories": {
      "output": "build"
    },
    "nsis": {
      "oneClick": true,
      "perMachine": true,
      "createStartMenuShortcut": true,
      "createDesktopShortcut": true,
      "runAfterFinish": true
    }
  },


