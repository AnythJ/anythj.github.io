function showProjects() {
    document.getElementById("projectsContainer").style.transform = "translateX(0)";
    document.getElementById("projectsContainer").style.visibility = "visible";
    document.getElementById("projectsContainer").style.opacity = "1";
    document.getElementById("projectsContainer").style.width = "100%";

    document.getElementById("frontContainer").style.transform = "translateX(-100vw)";

    document.getElementById("frontContainer").style.visibility = "hidden";

    document.getElementById("frontContainer").style.opacity = "0";

    setFrontTabIndexes(true);
    setProjectsTabIndexes(false);
};

function showFrontPageFromRight() {
    document.getElementById("projectsContainer").style.transform = "translateX(100vw)";

    document.getElementById("projectsContainer").style.visibility = "hidden";
    setTimeout(() => {
    document.getElementById("projectsContainer").style.width = "0";
    }, 800);

    document.getElementById("frontContainer").style.transform = "translateX(0)";
    document.getElementById("frontContainer").style.visibility = "visible";

    document.getElementById("frontContainer").style.opacity = "1";
    document.getElementById("projectsContainer").style.opacity = "0";

    setProjectsTabIndexes(true);
    setFrontTabIndexes(false);
};

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

function setProjectsTabIndexes(remove) {
    let i = 1;
    var container = document.getElementById("projectsContainer");


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

    form.addEventListener("submit", function (e) {
        const formData = new FormData(form);
        e.preventDefault();
        var object = {};
        formData.forEach((value, key) => {
            object[key] = value;
        });
        var json = JSON.stringify(object);

        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: json
        })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    var inputs = document.getElementsByClassName("form-input");
                    inputs[0].value = "";
                    inputs[1].value = "";
                    var notification = document.getElementById("successNotification");
                    notification.style.opacity = "1";
                    notification.style.visibility = "visible";
                    setTimeout(function () {
                        notification.style.opacity = "0";
                        notification.style.visibility = "hidden";
                    }, 3000);
                } else {
                    console.log(response);
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .then(function () {
                form.reset();
                
            });
    });

    
}