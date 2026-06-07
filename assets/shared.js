document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadNavbar();

        initializeTheme();

    }
);

function loadNavbar() {

    const navbar =
        document.getElementById(
            "navbar"
        );

    if (!navbar) return;

    fetch("../components/navbar.html")

    .then(response => response.text())

    .then(data => {

        navbar.innerHTML = data;

    });

}

function initializeTheme() {

    const savedTheme =
        localStorage.getItem(
            "theme"
        );

    if (savedTheme === "light") {

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

                    showToast(
                        "Light mode enabled"
                    );

                } else {

                    localStorage.setItem(
                        "theme",
                        "dark"
                    );

                    showToast(
                        "Dark mode enabled"
                    );

                }

            }

        }
    );

}

function showToast(message) {

    const toast =
        document.createElement(
            "div"
        );

    toast.classList.add(
        "toast"
    );

    toast.textContent =
        message;

    document.body.appendChild(
        toast
    );

    setTimeout(() => {

        toast.classList.add(
            "show"
        );

    }, 100);

    setTimeout(() => {

        toast.remove();

    }, 3000);

}

function exportDataCSV(
    filename,
    rows
) {

    let csvContent =
        "data:text/csv;charset=utf-8,";

    rows.forEach(row => {

        csvContent +=
            row.join(",") + "\n";

    });

    const encodedUri =
        encodeURI(csvContent);

    const link =
        document.createElement(
            "a"
        );

    link.setAttribute(
        "href",
        encodedUri
    );

    link.setAttribute(
        "download",
        filename
    );

    document.body.appendChild(
        link
    );

    link.click();

    link.remove();

}

function saveHistory(
    key,
    data
) {

    localStorage.setItem(
        key,
        JSON.stringify(data)
    );

}

function loadHistory(key) {

    const data =
        localStorage.getItem(
            key
        );

    return data
        ? JSON.parse(data)
        : [];

}