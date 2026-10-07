const foto = localStorage.getItem("FtoP");

if (foto) {
    document.getElementById("ImgPNav").src = foto;
} else {
    document.getElementById("ImgPNav").src = "../../assets/logo.png";
}