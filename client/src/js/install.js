const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
    console.log("beforeinstallprompt called");
    deferredPrompt = event;
    butInstall.classList.toggle("hidden", false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
    console.log("butInstall called");
    const promptEvent = deferredPrompt;
    if (!promptEvent) {
        return;
    }
    promptEvent.prompt();
    deferredPrompt = null;
    butInstall.classList.toggle("hidden", true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
    console.log("appinstalled called");
    deferredPrompt = null;
});
