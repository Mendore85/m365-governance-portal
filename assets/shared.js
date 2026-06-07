document.addEventListener("DOMContentLoaded", () => {

    // Load navbar
    const navbar = document.getElementById("navbar");

    if (navbar) {

        fetch("../components/navbar.html")
        .then(response => response.text())
        .then(data => {

            navbar.innerHTML = data;

            initializeTheme();

        });

    } else {

        initializeTheme();

    }

});

function initializeTheme() {

    const themeButtons =
        document.querySelectorAll("#themeToggle");

    // Load saved theme
    const savedTheme =
        localStorage.getItem("theme");

    if (savedTheme === "light") {

        document.body.classList.add("light");

    }

    themeButtons.forEach(button => {

        button.addEventListener("click", () => {

            document.body.classList.toggle("light");

            if (
                document.body.classList.contains("light")
            ) {

                localStorage.setItem(
                    "theme",
                    "light"
                );

            } else {

                localStorage.setItem(
                    "theme",
                    "dark"
                );

            }

        });

    });

}