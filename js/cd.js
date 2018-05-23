/**
 * Created by zhogu on 5/20/2018.
 */

let NebPay = require("nebpay");
let nebPay = new NebPay();
let serialNumber;
let mainnetUrl = "https://pay.nebulas.io/api/mainnet/pay",
    testnetUrl = "https://pay.nebulas.io/api/pay";

let callbackUrl = testnetUrl;


let contractAdd = "n1osXytr88dCmDiDtPTW3GU85PsgVSvjKA5";
let scGetLastDiaries = "getLastDiaries";
let scGetSelf = "getSelf";
let scGetByWriter = "getByWriter";
let scGetDiarybyIndex = "getDiaryByIndex";
let scGetUserDiaryCount = "getUserDiaryCount";
let scGetAllUsers = "getAllUsers";
let scGetAllUsersDiaryCount = "getAllUsersDiaryCount";
let scGetUserCount = "getUserCount";
let scGetDiaryCount = "getDiaryCount";
let scAddDiary = "addDiary";

// the minimum diary index shown in the page
let oldestDiaryIndex = Number.MAX_VALUE;
// the max number of diaries each loading
let numberEachLoad = 5;


function myclick() {
    let src = "my story a kdjask asdidkjf LSdjf a oss[asp[asdgkasdlpasop oao o20 oiqwe 094 a ow340 0sdvmy story a kdjask asdidkjf LSdjf a oss[asp[asdgkasdlpasop oao o20 oiqwe 094 a ow340 0sdvmy story a kdjask asdidkjf LSdjf a oss[asp[asdgkasdlpasop oao o20 oiqwe 094 a ow340 0sdvmy story a kdjask asdidkjf LSdjf a oss[asp[asdgkasdlpasop oao o20 oiqwe 094 a ow340 0sdvmy story a kdjask asdidkjf LSdjf a oss[asp[asdgkasdlpasop oao o20 oiqwe 094 a ow340 0sdvmy story a kdjask asdidkjf LSdjf a oss[asp[asdgkasdlpasop oao o20 oiqwe 094 a ow340 0sdvmy story a kdjask asdidkjf LSdjf a oss[asp[asdgkasdlpasop oao o20 oiqwe 094 a ow340 0sdvmy story a kdjask asdidkjf LSdjf a oss[asp[asdgkasdlpasop oao o20 oiqwe 094 a ow340 0sdv";
    let key = " story a kdjask asdidkjf LSdjf a oss[asp[asdgkasdlpasop oao";
    let cryptoEngin = new AesCtr();
    let een = AesCtr.encrypt(src, key, 256);
    console.log(een);
    let deen = "";
    try {
        deen = AesCtr.decrypt(een, key, 256);
    }
    catch (Error) {
        console.log("fail");
    }
    console.log(deen);

    let diaries = {"n1Sg27GHtTGzxPNqPX3asvVLag7yrvWBMaq": [{time: 1526817696, content: "This is my first diary"}]};
    diaries["n1Sg27GHtTGzxPNqPX3asvVLag7yrvWBMaq"].push({time: 111, content: "dfvijkqerfjoi poaerrgk "});
    console.log(diaries["n1Sg27GHtTGzxPNqPX3asvVLag7yrvWBMaq"]);
    diaries["1343"] = [{time: 111, content: "dfvijkqerfjoi poaerrgk "}];

    console.log(diaries["1343"]);
}


let userKey = 'curUser';

$(window).ready(function () {
    let currentUser = localStorage.getItem(userKey);
    if (currentUser != undefined) {
        setAddress(currentUser);
    }
});

function logout() {
    localStorage.removeItem(userKey);
    $("#id_form_login").css("margin", "8px");
    $("#id_div_login").show();
    $("#id_div_creator").hide();

}

function setAddress(addr) {
    localStorage.setItem(userKey, addr);
    $("#id_p_creator").html(addr + "   ");
    $("#id_div_login").hide();
    $("#id_form_login").css("margin", "0");
    $("#id_div_creator").show();
}


function setDiaryItem(address, content, time, isEncrypted) {
    const date = new Date(time);
    const dateString = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours()
        + ":" + date.getMinutes() + ":" + date.getSeconds();

    const isHidden = ( isEncrypted) ? ('') : ('hidden="true"');
    const panelStyle = isEncrypted ? "panel-danger" : "panel-success";
    const header = (address === "") ? ('<div class="panel-heading address"></div>')
        : ('<div class="panel-heading address">作者： ' + address + '</div>');
    const div = '<div class="panel '
        + panelStyle
        + '">' + header
        + '<div style="word-wrap:break-word" class="panel-body">'
        + content
        + '</div><div class="panel-footer"><div class="row"><div class="col-lg-6" >'
        + dateString
        + '</div><div class="col-lg-6" '
        + isHidden
        + '><form><div class="input-group"><input type="text" class="form-control" placeholder="密码"/>'
        + '<span class="input-group-btn"><a name="name_decrypt" class="btn btn-default">解密</a></span>'
        + '</div></form></div></div></div><div class="panel-body" style="word-wrap:break-word" hidden="true"></div></div>';
    return div;
}

function decryptDiary() {
    console.log($(this));
    let thisDiv = $(this)[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    let diaryContent = thisDiv.children[1].innerText;
    let key = $(this)[0].parentNode.parentNode.children[0].value;

    let decrypted = "";

    try {
        decrypted = AesCtr.decrypt(diaryContent, key, 256);
        if (decrypted === "") {
            decrypted = "（解密结果为空）"
        }
    } catch (Error) {
        decrypted = "解密失败，请检查密码是否正确（Decryption failed, please check the correction of the Key）";
    }

    thisDiv.children[3].innerText = decrypted;
    $(thisDiv.children[3]).show();
}

function showDiaries(resp) {
    precheckResponse(resp);

    const result = JSON.parse(resp.result);

    for (let i = 0; i < result.length; i++) {
        const index = result[i].index;
        const user = result[i].user;
        const diaryConent = result[i].diary.content;
        const diaryTime = result[i].diary.time;
        const isEncoded = result[i].diary.en;
        if (index < oldestDiaryIndex) {
            oldestDiaryIndex = index;
        }
        $("#id_div_diarylist").append(setDiaryItem(user, diaryConent, diaryTime, isEncoded));
    }
    bindFun();
}

function showDiariesOfSomeone(resp) {
    precheckResponse(resp);

    const result = JSON.parse(resp.result);

    for (let i = result.length - 1; i >= 0; i--) {

        const diaryConent = result[i].content;
        const diaryTime = result[i].time;
        const isEncoded = result[i].en;

        $("#id_div_diarylist").append(setDiaryItem("", diaryConent, diaryTime, isEncoded));
    }

    bindFun();
    $("#id_div_diaryCount")[0].innerText = "共 " + result.length + " 篇日记. (绿色为未加密日记，红色为加密日记)";
}

function precheckResponse(resp) {
    console.log("resp: " + JSON.stringify(resp));
    return (resp.execute_err !== "");
}

function bindFun() {
    $("a[name='name_decrypt']").click(decryptDiary);
}

function onload() {
    oldestDiaryIndex = Number.MAX_VALUE;
    $("#id_div_diarylist")[0].innerText = "";
    getLastDiaries(numberEachLoad);

}

function refresh() {
    //TODO : only get new diaries
    onload();
}

function loadMore() {
    if (oldestDiaryIndex <= 0) {
        window.alert("没有更多了");
        return;
    }
    getDiariesByIndex(oldestDiaryIndex - 1, oldestDiaryIndex - numberEachLoad);

}

function onloadSelf() {
    let currentUser = localStorage.getItem(userKey);
    if (currentUser == undefined) {
        window.alert("请在右上角输入账户地址，之后刷新即可");
        return;
    }
    getDiariesByWriter(currentUser);

}

function refreshSelf() {
    //TODO : only get new diaries
    onloadSelf();
}

// publish diary without encoded
function publishDiaryWO() {
    const isEncoded = false;
    const content = $("#id_textarea_newdiary").val();
    publishDiary(content, isEncoded);
    $("#id_textarea_newdiary").val("");

}

function encodeDiary() {

    const srcContent = $("#id_textarea_newdiary").val();
    const key = $("#id_input_encodekey").val();
    const encodedContent = AesCtr.encrypt(srcContent, key, 256);
    $("#id_div_encoded")[0].innerText = encodedContent;
    $("#id_div_encoded").show();
    $("#id_btn_encodedPushlish").removeAttr("disabled");
}

function encodedPublish() {
    const isEncoded = true;
    const encodedContent = $("#id_div_encoded")[0].innerText;
    $("#id_div_encoded").hide();
    publishDiary(encodedContent, isEncoded);
    $("#id_textarea_newdiary").val("");
    $("#id_input_encodekey").val("");
    $('#id_div_noencode').show();
    $('#id_form_encode').hide();
}
function afterPublish(resp) {
    console.log("resp: " + JSON.stringify(resp));
    window.alert("日志已发送，正在等待进链，请稍后。");
}

function getLastDiaries(number) {
    const callArgs = '["' + number + '"]';
    simulateCall(contractAdd, 0, scGetLastDiaries, callArgs, showDiaries)
}

function getDiariesByIndex(start, end) {
    const callArgs = '["' + start + '","' + end + '"]';
    simulateCall(contractAdd, 0, scGetDiarybyIndex, callArgs, showDiaries)
}

// function getSelfDiaries() {
//     simulateCall(contractAdd, 0, scGetSelf, "[]", showDiaries)
// }

function getDiariesByWriter(writer) {
    const callArgs = '["' + writer + '"]';
    simulateCall(contractAdd, 0, scGetByWriter, callArgs, showDiariesOfSomeone)
}

function publishDiary(content, isEncoded) {
    const callArgs = '["' + content + '","' + isEncoded + '"]';
    callContract(contractAdd, 0, scAddDiary, callArgs, afterPublish)
}

function simulateCall(to, value, callFunction, callArgs, listener) {
    console.log("=======================" + to + value + callFunction + callArgs);
    nebPay.simulateCall(to, value, callFunction, callArgs, {
        //callback:callbackUrl, //don't need to set callback for simulateCall
        listener: listener  //set listener for extension transaction result
    });
}

function callContract(to, value, callFunction, callArgs, listener) {
    console.log("=======================" + to + value + callFunction + callArgs);
    serialNumber = nebPay.call(to, value, callFunction, callArgs, {

        callback: callbackUrl,
        listener: listener  //set listener for extension transaction result
    });
    // setTimeout(() => {
    //     onrefreshClick();
    // }, 1000);
}

// function onrefreshClick() {
//     nebPay.queryPayInfo(serialNumber,{callback: callbackUrl})   //search transaction result from server (result upload to server by app)
//         .then(function (resp) {
//             document.getElementById('result').value = resp;
//         })
//         .catch(function (err) {
//             console.log(err);
//         });
// }