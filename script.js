async function loadFile(file)
{
    // count of characters to be removed (string to remove like "31.03.2022 18:06:23")
    var countSymbols = 20;

    // the first element to start searching
    var findFirst = 'User:';

    // the second element where the search will end
    var findSecond = 'Bot: Request not recognized';

    var pos;
    var newPos;
    var array = [];

    // get text from file
    let str = await file.text();

    // remove empty lines
    str = str.replace(/(^[ \t]*\n)/gm, "");

    // convert string to array by line translation
    str = str.split("\n");

    str.forEach(function(element, index) {
        // trim the beginning of the string if there is extra data
        element = element.substring(countSymbols);

        // looking for the first value in the string to start parsing
        pos = element.indexOf(findFirst);

        // if the first value to search is found in the string
        if (pos != -1) {
            // getting the next value for in search in it
            newElment = str[index + 1];

            // looking for the second value in the string to end parsing
            newPos = newElment.indexOf(findSecond);

            // select the found substring that was between the two search values
            if (newPos != -1) {
                array.push(element);
            }
        }
    });

    // convert array to string
    str = array.join("\n");

    // removal of the first element from which the search
    // begins from the string for correct output
    str = str.replaceAll(findFirst, '');

    // display on page
    document.getElementById('output').textContent = str;
}