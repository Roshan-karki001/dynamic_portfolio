export default function checkSortedArraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    arr1.sort((a, b) => a - b);
    arr2.sort((a, b) => a - b);
    return arr1.every((val, index) => val === arr2[index]);
}
