fetch("../components/navbar.html")

.then(response => response.text())

.then(data => {

    document.getElementById(
        "navbar"
    ).innerHTML = data;

});

const themeToggle =
    document.getElementById(
        "themeToggle"
    );

if (
    localStorage.getItem(
        "theme"
    ) === "light"
) {

    document.body.classList.add(
        "light"
    );

}

document.addEventListener(
    "click",
    event => {

        if (
            event.target.id ===
            "themeToggle"
        ) {

            document.body.classList.toggle(
                "light"
            );

            if (
                document.body.classList.contains(
                    "light"
                )
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

        }

    }
);