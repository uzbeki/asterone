const form = document.querySelector(".form-outer form");
const slidePage = document.querySelector(".page:first-child");
const nextBtns = document.querySelectorAll(".next");
const prevBtns = document.querySelectorAll(".prev");
const submitBtn = document.querySelector(".field button[type=submit]");
const pages = form.querySelectorAll(".page");

const steps = document.querySelectorAll(".step");

let margins = [];

for (let i = 1; i <= pages.length; i++) {
    margins.push(parseFloat(100 / pages.length) * i);
}
let minusMargins = [0, ...margins];

nextBtns.forEach((btn, index) => {
    btn.addEventListener("click", e => {
        // form validation check
        const isValid = [...btn.closest(".page").querySelectorAll("input")].every(input => input.reportValidity());
        if (!isValid) return;

        slidePage.style.marginLeft = `-${margins[index]}%`;
        // bullet[index].classList.add("active");
        steps[index].classList.add("active");
    });
});

prevBtns.forEach((btn, index) => {
    btn.addEventListener("click", e => {
        slidePage.style.marginLeft = `-${minusMargins[index]}%`;
        // bullet[index].classList.remove("active");
        steps[index].classList.remove("active");
    });
});

submitBtn.addEventListener("click", e => {
    e.preventDefault();
    if (form.checkValidity()) {
        steps[steps.length - 1].classList.add("active");
        setTimeout(() => {
            form.submit();
        }, 500);
    }
});

/* Input handling */
const inputs = document.querySelectorAll(".field input");

inputs.forEach(input => {
    input.onchange = updateInputConfirmation;
});

// Interesting, arrow function does not work here
function updateInputConfirmation({ target }) {
    className = target.id;
    inputConfirmation = document.getElementById(`_${className}`);
    inputConfirmation.textContent = target.value;

    if (!target.files.length) {
        noFileSelected(target.closest(".drag-drop-area"));
    }
}

/*************** Drag & Drop ***************/
const dragDropAreas = document.querySelectorAll(".drag-drop-area");
const permitted_file_types = [
    "application/pdf",
    "doc",
    "docx",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
dragDropAreas.forEach(area => {
    area.addEventListener("dragover", e => {
        e.preventDefault();
        area.classList.add("drag-over");
        area.classList.remove("dropped");
        area.querySelector("i").className = "fas fa-paperclip";
        area.querySelector("p").textContent = "こちらにドロップしてください。";
    });

    area.addEventListener("dragleave", e => {
        e.preventDefault();
        noFileSelected(area);
    });

    area.addEventListener("drop", e => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (!permitted_file_types.includes(file.type)) {
            area.querySelector("p").textContent = "ファイル形式が正しくありません。";
            return;
        }
        console.log("dropped");
        area.querySelector("p").textContent = file.name;
        area.classList.add("dropped");
        area.classList.remove("drag-over");
        area.querySelector('input[type="file"]').files = e.dataTransfer.files;
        console.log("files", area.querySelector('input[type="file"]').files);
        updateInputConfirmation({ target: area.querySelector('input[type="file"]') });
    });

    area.querySelector('input[type="file"]').addEventListener("change", e => {
        const file = e.target.files[0];
        area.querySelector("p").textContent = file.name;
        area.classList.add("dropped");
        area.classList.remove("drag-over");
    });
});

const noFileSelected = area => {
    area.classList.remove("drag-over");
    area.classList.remove("dropped");
    area.querySelector("i").className = "fas fa-cloud-upload-alt";
    area.querySelector("p").textContent = "ファイルをこちらにドラッグ・ドロップするか、クリックで選択してください。";
};
