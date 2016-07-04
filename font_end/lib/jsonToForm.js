function jsonToForm(jsonObject) {
    /*
     * 依赖jQury
     * params:
     *  -jsonObject: json对象
     *  return: string
     * */

    var formStr = "";
    $.each(jsonObject, function(key, value) {
        formStr += key + "=" + value + "&";
    });

    return formStr.slice(0, -1);
}

function testJsonToForm() {
    var textJson = { "one": "1", "two": 2 },
        formStr = jsonToForm(textJson);

    console.log(formStr);
}

$(function() {
    testJsonToForm();
});
