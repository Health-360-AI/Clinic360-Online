require('dotenv').config();
const { notarize } = require('electron-notarize-dmg');
const config = require("./package.json");

async function notarizing() {
    // const { electronPlatformName, appOutDir } = context;
    // if (electronPlatformName !== 'darwin') {
    //     return;
    // }
    const dmgPath = `release-builds/${config.build.productName}.Setup.${config.version}.dmg`;
    console.log(dmgPath)
    if (!dmgPath)
        return;


    return await notarize({
        appBundleId: 'com.app.Clinic360',
        dmgPath: dmgPath,
        appleId: "saj1999jad@icloud.com",
        appleIdPassword: "miyw-gdyg-edbk-ftqx",
    });
};
notarizing()