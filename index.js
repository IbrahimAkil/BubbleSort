// This code swaps two elements!
const quad1 = document.querySelector(".quad-no-1");
const quad2 = document.querySelector(".quad-no-2");
const goBtn = document.querySelector(".btn-go");
const sortAlgo = document.querySelector(".sort-algo");
const sectionThree = document.querySelector(".main-visu-section-no-3");
const sizeOfTest = document.querySelector(".size-of-testdata");
const speedOfAnimation = document.querySelector(".speed-of-animation");
let array;
let myTimeout;

// This number is the size of the data that we want to pass to the sorting algo
let defaultVal = parseInt(document.querySelector(".size-of-testdata").value);

// This number is the speed of which the bubblesort algorithm is animated
let defaultSpeedVal = parseInt(
    document.querySelector(".speed-of-animation").value
);

// The speed on which the bubblesort waits after each iteration
const constantAwait = 300;

// Sample arrays, 5 sizes from small to big
const arrSmallOne = [7, 2, 20];
const arrSmallTwo = [12, 3, 7, 18, 9];
const arrSmallThree = [5, 12, 4, 22, 18, 11, 9, 13];
const arrSmallFour = [16, 22, 4, 7, 13, 24, 19, 19, 14, 3, 4, 15];
const arrSmallFive = [
    12, 3, 7, 18, 7, 2, 20, 5, 12, 4, 22, 18, 11, 9, 13, 21, 31, 13, 17, 27, 29,
    33, 14, 15, 6, 32, 1, 16,
];

// Removes the elements on the page
function elementRemover() {
    const elemOfThirdSection = document.querySelectorAll(
        ".main-visu-section-no-3"
    );
    if (elemOfThirdSection) {
        elemOfThirdSection[0].innerHTML = "";
    }
}

// Renders the array on the page
function renderArray(arr) {
    elementRemover();

    // creates html elements which are the blocks that have to be sorted
    // For better appereance of the page, the height gets bigger
    for (let i = 0; i < arr.length; i++) {
        const text = `<div class="quad quad-no-${i}"></div>`;
        sectionThree.insertAdjacentHTML("beforeend", text);
        const selec = document.querySelector(`.quad-no-${i}`);
        const temp = (arr[i] + 10) * 7;
        selec.style.height = temp + "px";
    }
}

// the array gets loaded
function loadArray() {
    array = arrayGetter();
    renderArray(array);
}

// the array gets initialized, here does the program start
function init() {
    loadArray();
}
init();

// Value of the size array gets passed so that equivilent array gets selected
document.querySelector(".size-of-testdata").oninput = function () {
    defaultVal = parseInt(this.value);
};
// If the value on the size-slider gets changed the algorithm stops (if its is running),
// the boxes get removed and a new array gets rendered on the page
sizeOfTest.onchange = function () {
    clearTimeout(myTimeout);
    elementRemover();
    loadArray();
};

// Value of the speed in which the bubblesort algorithm gets animated
speedOfAnimation.oninput = function () {
    defaultSpeedVal = parseInt(this.value);
};
// If the value on the speed-slider gets changed the algorithm stops (if its is running),
// and the new speed can be used on the array
speedOfAnimation.onchange = function () {
    clearTimeout(myTimeout);
    elementRemover();
    loadArray();
};

// swaps to boxes
function swapThatSheet(j, k, a1, a2) {
    const quadJ = document.querySelector(`.quad-no-${j}`);
    const quadK = document.querySelector(`.quad-no-${k}`);

    quadJ.style.height = (a2 + 10) * 7 + "px";
    quadK.style.height = (a1 + 10) * 7 + "px";
}

// highlights two boxes next to eachother
function highlighter(j, k) {
    const quadJ = document.querySelector(`.quad-no-${j}`);
    const quadK = document.querySelector(`.quad-no-${k}`);

    quadJ.style.backgroundColor = "yellow";
    quadK.style.backgroundColor = "brown";
}
// sets the highlighted boxes back to their initial blue color
function normalo(j, k) {
    const quadJ = document.querySelector(`.quad-no-${j}`);
    const quadK = document.querySelector(`.quad-no-${k}`);

    quadJ.style.backgroundColor = "blue";
    quadK.style.backgroundColor = "blue";
}

// Sleep function that the program waits until the promise is fullfilled (it gets called with await)
// function parameter ms - milliseconds, thats how long the algorithm waits until it goes to the next step
function sleep(ms) {
    return new Promise((resolve) => {
        myTimeout = setTimeout(resolve, ms);
        return myTimeout;
    });
}

// An asyn function that is the actual bubblesort algorithm
// function parameters: arr, speedVar
// arr: This parameter is the array that needs to be sorted
// speedVar: is the speed variable that is responsible for the speed
// of the bubblesort animation
async function bubblesort(arr, speedVar) {
    // deep copy of the array so that its not sorted when jumping from one size to another
    const array = [...arr];
    let len = array.length;

    // bubble sort algorithm
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1; j++) {
            highlighter(j, j + 1);
            await sleep(speedVar);

            // if the left element is bigger than the right then swap them
            if (array[j] > array[j + 1]) {
                swapThatSheet(j, j + 1, array[j], array[j + 1]);

                let tmp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = tmp;
            }
            await sleep(speedVar);

            // Set the color to normal again
            normalo(j, j + 1);
            await sleep(speedVar);
        }
        await sleep(constantAwait); // Wait after each iteration for 300ms
    }
    return array;
}

// Returns the array depending on the value of the size-slider
function arrayGetter() {
    if (defaultVal === 1) {
        return arrSmallOne;
    } else if (defaultVal === 2) {
        return arrSmallTwo;
    } else if (defaultVal === 3) {
        return arrSmallThree;
    } else if (defaultVal === 4) {
        return arrSmallFour;
    } else {
        return arrSmallFive;
    }
}

// Returns the a speed 500ms, 300ms, or 150ms, depending on the speed-slider
function speedSetter() {
    if (defaultSpeedVal === 1) {
        return 500;
    } else if (defaultSpeedVal === 2) {
        return 300;
    } else {
        return 150;
    }
}

// sets the speedVar and calls the bubblesort algorithm
function sortingAlgo() {
    const speedVar = speedSetter();
    bubblesort(array, speedVar);
}

// When the Go-Btn is clicked the actual animation starts
goBtn.addEventListener("click", function () {
    loadArray();
    sortingAlgo();
});
