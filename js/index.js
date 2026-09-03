function showFrontPageFromLeft() {
    document.getElementById("contactContainer").style.transform = "translateX(-100vw)";

    document.getElementById("contactContainer").style.visibility = "hidden";
    document.getElementById("frontContainer").style.transform = "translateX(0)";
    document.getElementById("frontContainer").style.visibility = "visible";
    document.getElementById("frontContainer").style.opacity = "1";
    document.getElementById("contactContainer").style.opacity = "0";

    setContactTabIndexes(true);
    setFrontTabIndexes(false);
};

function showContact() {
    document.getElementById("contactContainer").style.transform = "translateX(0)";
    document.getElementById("contactContainer").style.visibility = "visible";

    document.getElementById("frontContainer").style.transform = "translateX(100vw)";

    document.getElementById("frontContainer").style.visibility = "hidden";

    document.getElementById("frontContainer").style.opacity = "0";
    document.getElementById("contactContainer").style.opacity = "1";

    setFrontTabIndexes(true);
    setContactTabIndexes(false);
};

function setFrontTabIndexes(remove) {
    let i = 1;
    var container = document.getElementById("frontContainer");
    Array.prototype.forEach.call(container
        .getElementsByClassName("btn"), function (element) {
            if (!remove) element.setAttribute("tabIndex", i.toString());
            else element.setAttribute("tabIndex", "-1");
            i++;
        });

    Array.prototype.forEach.call(container
        .getElementsByClassName("links")[0].getElementsByTagName("a"), function (element) {
            if (!remove) element.setAttribute("tabIndex", i.toString());
            else element.setAttribute("tabIndex", "-1");
            i++;
        });
}

function setContactTabIndexes(remove) {
    let i = 1;
    var container = document.getElementById("contactContainer");
    Array.prototype.forEach.call(container
        .getElementsByClassName("form-input"), function (element) {
            if (!remove) element.setAttribute("tabIndex", i.toString());
            else element.setAttribute("tabIndex", "-1");
            i++;
        });

    Array.prototype.forEach.call(container
        .getElementsByClassName("btn"), function (element) {
            if (!remove) element.setAttribute("tabIndex", i.toString());
            else element.setAttribute("tabIndex", "-1");
            i++;
        });
}

window.onload = function () {
    setContactTabIndexes(true);
    setFrontTabIndexes(false);
    submitContactMe();
};

function submitContactMe() {
    const form = document.getElementById("contactForm");
    if (!form) {
        console.error("contactForm not found");
        return;
    }

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const notification = document.getElementById("successNotification");
        const submitBtn = form.querySelector("button[type=submit]");

        const formData = new FormData(form);

        if (formData.get("botcheck")) {
            return;
        }

        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        if (submitBtn) submitBtn.disabled = true;

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: json
            });

            const result = await response.json();

            if (response.status === 200 && result.success) {
                notification.style.visibility = "visible";
                notification.style.opacity = "1";
                form.reset();
                setTimeout(function () {
                    notification.style.opacity = "0";
                    notification.style.visibility = "hidden";
                }, 3000);
            } else {
                console.error("Submission Error:", result);
                alert("Something went wrong: " + (result.message || "please try again."));
            }
        } catch (error) {
            console.error("Network/CORS Error:", error);
            alert("Network error. Is your internet okay?");
        } finally {
            if (submitBtn) submitBtn.disabled = false;
        }
    });
}

