function FunctionHide() {

    var mydivs = document.getElementsByName("toHide");

    for (var i = 0; i < mydivs.length; i++) {

        mydivs[i].hidden = false;
    }
}

function FunctionShow() {

    var mydivs = document.getElementsByName("toHide");

    for (var i = 0; i < mydivs.length; i++) {

        mydivs[i].hidden = true;
    }
}