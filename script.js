/* =========================================================
   NAVODAYA FOREVER DOWNLOAD WEBSITE
========================================================= */


/* =========================================================
   WEBSITE CONFIGURATION
   CHANGE THESE VALUES WHEN YOU RELEASE A NEW VERSION
========================================================= */

const APP_CONFIG = {

    version: "1.0",

    apkFile: "NavodayaForever.apk",

    updateDescription:
        "Latest Android release is available.",

    playStoreAvailable: false,

    playStoreUrl:
        "https://play.google.com/store/apps/details?id=com.navodayaforever.app"

};


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeWebsite();

    }
);


/* =========================================================
   INITIALIZE WEBSITE
========================================================= */

function initializeWebsite() {

    updateVersionInformation();

    updateCurrentYear();

    generateQRCode();

    calculateAPKSize();

}


/* =========================================================
   VERSION INFORMATION
========================================================= */

function updateVersionInformation() {

    const versionText =
        document.getElementById(
            "versionText"
        );

    const updateVersion =
        document.getElementById(
            "updateVersion"
        );

    const versionBadge =
        document.querySelector(
            ".version-badge"
        );

    const description =
        document.getElementById(
            "updateDescription"
        );


    if (versionText) {

        versionText.textContent =
            APP_CONFIG.version;

    }


    if (updateVersion) {

        updateVersion.textContent =
            "v" + APP_CONFIG.version;

    }


    if (versionBadge) {

        versionBadge.textContent =
            "v" + APP_CONFIG.version;

    }


    if (description) {

        description.textContent =
            APP_CONFIG.updateDescription;

    }


    const playStoreButton =
        document.getElementById(
            "playStoreButton"
        );


    if (
        APP_CONFIG.playStoreAvailable &&
        playStoreButton
    ) {

        playStoreButton.style.display =
            "block";

    }

}


/* =========================================================
   CURRENT YEAR
========================================================= */

function updateCurrentYear() {

    const year =
        document.getElementById(
            "currentYear"
        );

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

}


/* =========================================================
   APK DOWNLOAD
========================================================= */

function downloadApp() {

    const message =
        document.getElementById(
            "downloadMessage"
        );


    if (message) {

        message.textContent =
            "Preparing your download...";

    }


    /*
       Create a temporary link.

       This works when the APK is hosted
       in the same folder as this website.
    */

    const link =
        document.createElement("a");


    link.href =
        APP_CONFIG.apkFile;

    link.download =
        APP_CONFIG.apkFile;


    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);


    /*
       Save local download count.

       This is only a browser-local counter.
       It does NOT count everybody's downloads.
    */

    let count =
        Number(
            localStorage.getItem(
                "navodayaDownloadCount"
            )
        ) || 0;


    count++;

    localStorage.setItem(
        "navodayaDownloadCount",
        count
    );


    setTimeout(
        function () {

            if (message) {

                message.textContent =
                    "✅ Download started. Thank you for joining Navodaya Forever! 💙";

            }

        },
        700
    );

}


/* =========================================================
   CALCULATE APK SIZE
========================================================= */

async function calculateAPKSize() {

    const sizeElement =
        document.getElementById(
            "apkSize"
        );


    if (!sizeElement) {
        return;
    }


    try {

        const response =
            await fetch(
                APP_CONFIG.apkFile,
                {
                    method: "HEAD"
                }
            );


        const size =
            response.headers.get(
                "content-length"
            );


        if (!size) {

            sizeElement.textContent =
                "Available";

            return;

        }


        sizeElement.textContent =
            formatFileSize(
                Number(size)
            );

    }

    catch (error) {

        console.log(
            "Could not calculate APK size."
        );


        sizeElement.textContent =
            "Available";

    }

}


/* =========================================================
   FILE SIZE FORMAT
========================================================= */

function formatFileSize(bytes) {

    if (bytes === 0) {
        return "0 Bytes";
    }


    const units = [
        "Bytes",
        "KB",
        "MB",
        "GB"
    ];


    const index =
        Math.floor(
            Math.log(bytes) /
            Math.log(1024)
        );


    return (
        parseFloat(
            (
                bytes /
                Math.pow(
                    1024,
                    index
                )
            ).toFixed(2)
        )
        +
        " "
        +
        units[index]
    );

}


/* =========================================================
   GENERATE QR CODE
========================================================= */

function generateQRCode() {

    const qrContainer =
        document.getElementById(
            "qrCode"
        );


    if (!qrContainer) {
        return;
    }


    /*
       The QR code points to the current
       website URL.

       Therefore, wherever you host this page,
       the QR automatically points there.
    */

    const websiteUrl =
        window.location.href;


    if (
        typeof QRCode ===
        "undefined"
    ) {

        qrContainer.textContent =
            "QR unavailable";

        return;

    }


    qrContainer.innerHTML = "";


    new QRCode(
        qrContainer,
        {
            text: websiteUrl,
            width: 160,
            height: 160,
            correctLevel:
                QRCode.CorrectLevel.H
        }
    );

}


/* =========================================================
   INVITE MESSAGE
========================================================= */

function getInviteMessage() {

    const link =
        window.location.href;


    return (
        "💙 I just joined Navodaya Forever!\n\n" +

        "Remember our hostel days, " +
        "friends, teachers, houses and all " +
        "those crazy memories? 🥹\n\n" +

        "I found an app made specially " +
        "for Navodayans — Navodaya Forever ❤️\n\n" +

        "📱 Join here:\n" +

        link +
        "\n\n" +

        "It's completely free. 💙"
    );

}


/* =========================================================
   WHATSAPP
========================================================= */

function shareWhatsApp() {

    const message =
        getInviteMessage();


    const url =
        "https://wa.me/?text=" +
        encodeURIComponent(
            message
        );


    window.open(
        url,
        "_blank"
    );

}


/* =========================================================
   TELEGRAM
========================================================= */

function shareTelegram() {

    const link =
        window.location.href;


    const text =
        "💙 I just joined Navodaya Forever!\n\n" +
        "Come join our Navodaya community ❤️";


    const url =
        "https://t.me/share/url?" +
        "url=" +
        encodeURIComponent(link) +
        "&text=" +
        encodeURIComponent(text);


    window.open(
        url,
        "_blank"
    );

}


/* =========================================================
   COPY LINK
========================================================= */

async function copyLink() {

    const link =
        window.location.href;


    const message =
        document.getElementById(
            "copyMessage"
        );


    try {

        await navigator.clipboard.writeText(
            link
        );


        if (message) {

            message.textContent =
                "✅ Download link copied! Share it with your Navodaya friends. 💙";

        }

    }

    catch (error) {

        /*
           Fallback for older browsers.
        */

        const input =
            document.createElement(
                "input"
            );


        input.value =
            link;


        document.body.appendChild(
            input
        );


        input.select();


        document.execCommand(
            "copy"
        );


        document.body.removeChild(
            input
        );


        if (message) {

            message.textContent =
                "✅ Link copied!";

        }

    }


    setTimeout(
        function () {

            if (message) {

                message.textContent =
                    "";

            }

        },
        4000
    );

}


/* =========================================================
   SCROLL TO INVITE
========================================================= */

function scrollToInvite() {

    const section =
        document.getElementById(
            "inviteSection"
        );


    if (section) {

        section.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* =========================================================
   SCROLL TO TOP
========================================================= */

function scrollToTop() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   PLAY STORE
========================================================= */

function openPlayStore() {

    if (
        !APP_CONFIG.playStoreAvailable
    ) {

        return;

    }


    window.open(
        APP_CONFIG.playStoreUrl,
        "_blank"
    );

}


/* =========================================================
   OPTIONAL: SHARE USING NATIVE PHONE SHARE
========================================================= */

async function nativeShare() {

    if (
        !navigator.share
    ) {

        return false;

    }


    try {

        await navigator.share({

            title:
                "Navodaya Forever 💙",

            text:
                "Join Navodaya Forever — Friends, memories & moments that stay forever ❤️",

            url:
                window.location.href

        });


        return true;

    }

    catch (error) {

        return false;

    }

}