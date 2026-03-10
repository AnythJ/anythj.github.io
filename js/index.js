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
    setProjectsTabIndexes(true);
    setFrontTabIndexes(false);
    submitContactMe();
};

function submitContactMe() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    form.onsubmit = async function (e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const object = Object.fromEntries(formData); 
        const json = JSON.stringify(object);

        const notification = document.getElementById("successNotification");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: json
            });

            if (response.status === 200) {
                notification.style.visibility = "visible";
                notification.style.opacity = "1";
                form.reset();
                setTimeout(function () {
                    notification.style.opacity = "0";
                    notification.style.visibility = "hidden";
                }, 3000);
            } else {
                const result = await response.json();
                console.log("Submission Error:", result);
                alert("Something went wrong. Please check the console.");
            }
        } catch (error) {
            console.log("Network/CORS Error:", error);
            alert("Network error. Is your internet okay?");
        }
    };
}
