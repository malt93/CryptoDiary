/**
 * Created by zhogu on 5/20/2018.
 */



function myclick(){
    var src = "my story a kdjask asdidkjf LSdjf a oss[asp[asdgkasdlpasop oao o20 oiqwe 094 a ow340 0sdvmy story a kdjask asdidkjf LSdjf a oss[asp[asdgkasdlpasop oao o20 oiqwe 094 a ow340 0sdvmy story a kdjask asdidkjf LSdjf a oss[asp[asdgkasdlpasop oao o20 oiqwe 094 a ow340 0sdvmy story a kdjask asdidkjf LSdjf a oss[asp[asdgkasdlpasop oao o20 oiqwe 094 a ow340 0sdvmy story a kdjask asdidkjf LSdjf a oss[asp[asdgkasdlpasop oao o20 oiqwe 094 a ow340 0sdvmy story a kdjask asdidkjf LSdjf a oss[asp[asdgkasdlpasop oao o20 oiqwe 094 a ow340 0sdvmy story a kdjask asdidkjf LSdjf a oss[asp[asdgkasdlpasop oao o20 oiqwe 094 a ow340 0sdvmy story a kdjask asdidkjf LSdjf a oss[asp[asdgkasdlpasop oao o20 oiqwe 094 a ow340 0sdv";
    var key = " story a kdjask asdidkjf LSdjf a oss[asp[asdgkasdlpasop oao";
    var cryptoEngin = new AesCtr();
    var een = AesCtr.encrypt(src, key, 256);
    console.log(een);

    try {
        var deen = AesCtr.decrypt(een, key, 256);
    }
    catch(Error) {
        console.log("fail");
    }
    console.log(deen);

    var diaries = {"n1Sg27GHtTGzxPNqPX3asvVLag7yrvWBMaq":[{time:1526817696, content:"This is my first diary"}]} ;
    diaries["n1Sg27GHtTGzxPNqPX3asvVLag7yrvWBMaq"].push({time:111, content: "dfvijkqerfjoi poaerrgk "});
    console.log(diaries["n1Sg27GHtTGzxPNqPX3asvVLag7yrvWBMaq"]);
    diaries["1343"] = [{time:111, content: "dfvijkqerfjoi poaerrgk "}];

    console.log(diaries["1343"]);
}

function setDiaryItem(data){
    var address = "12";
    var content = "jQGH4sqiAlt/9AVjd6sVmJrcmFZdD0iYaBpz7pGyUFRMNtEH37i2+ReclEEdtDXbgLZQNcn/YKnpvztZdBsxTHdf6ZiIQUo2qT6vi48wAFSPUYnpJA046akJmBUwwdWrGvlgdVbdgIU9W8iuQ5QDs9ylINWzOgjWoYvZG84DO4D5xL42O+YBEUnhVzFB3WUTkuLJC8DP8inCM8azTmlTcREj3XrhhWubWFhMbXq4J5BfpwO4AjiOxD7irvnC3rlATREV0zLZCUE/M7+MLCvdIA/YN9OY53HKwMI2QtnlKJwndILRsE8hjVE0nWCrmeLHJcTs4CvqyhSU1Vpmc6OWWt4aZnoGeK3bdtlskZuiF2renEgnK27woxSpdzP7q8MFrw5SitwlTJenNw1UgHFp0k8aA+KsRs0H9MGfCzA1ZxF97z5G8RpKykQ/9mKUXtv/X1MmgGvCQH18wiOReBafux8QHlsIWr2ZD/ZCFLjhklRPFjsyt704INFd610u51bSrTvoWYdgnd9iXMJbsM+1LffciQrp6cDBulUjPOgX8aIYVhXbe+fBTmvB4HKFwsV5JCdz6V2oPIkqHJV45uXT442LdVKTATB31MIA58PsxJlYKpo+v1CQWngPCxEcvtIKbO9fnqpS/3GBrGeEOuYfzP3juLEeZjn00xKL7Nt16PtNW0mAJRyi2Or1wyYsX1Iw0LgExgxE6ieouauTLREQDXu0prskuFguICML1zYNsjE+B79oMkBZOMnwfhDQT7dAIcFgvQstTgX//mXLByFjNilcxiYPE3KXdT87PFe5se1n5ipzMOvzlTzFENuAUfXg5gFdLO/rFO7VGIgQQaBQhVoo1T/sTJiAFQbGVYeh+gboj0Rh1QYdIaCMhnMiQ01+6QZpLQNkfMJDe7exa4R/ABvIl6WHdQlcRoo7pqp8kWmR0D+Th+JrIg==";
    var date = new Date().toDateString();
    var isEncrypted = true;
    var isHidden = isEncrypted?(''):('hidden="true"');
    var div = '<div class="panel panel-default"><div class="panel-heading">'
                + address
                + '</div><div style="word-wrap:break-word" class="panel-body">'
                + content
                + '</div><div class="panel-footer"><div class="row"><div class="col-lg-6" >'
                + date
                + '</div><div class="col-lg-6" '
                + isHidden
                + '><form><div class="input-group"><input type="text" class="form-control" placeholder="密码"/>'
                + '<span class="input-group-btn"><a name="name_decrypt" class="btn btn-default">解密</a></span>'
                +'</div></form></div></div></div><div class="panel-body" style="word-wrap:break-word" hidden="true"></div></div>';
    return div;
}

function decryptDiary() {
    var thisDiv = $(this)[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    var diaryContent =  thisDiv.children[1].innerText;
    var key = $(this)[0].parentNode.parentNode.children[0].value;

    var decrypted ="";

    try{
        decrypted = AesCtr.decrypt(diaryContent,key,256);
        if (decrypted == ""){
            decrypted = "（解密结果为空）"
        }
    }catch (Error){
        decrypted = "解密失败，请检查密码是否正确（Decryption failed, please check the correction of the Key）";
    }

    thisDiv.children[3].innerText = decrypted;
    $(thisDiv.children[3]).show();
}

function showDiary() {
    for (var i = 0; i< 10; i++){
        $("#id_div_diarylist").append(setDiaryItem());
    }
}