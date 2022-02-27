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
    if(form.checkValidity()){
        steps[steps.length - 1].classList.add("active");
        setTimeout(() => {
            form.submit();
        }, 500);
    }
});

/* Input handling */
const inputs = document.querySelectorAll(".field input");

inputs.forEach(input => {
    input.onchange = e => {
        className = e.target.id;
        inputConfirmation = document.getElementById(`_${className}`);
        console.log(inputConfirmation);
        inputConfirmation.textContent = e.target.value;
    };
});
