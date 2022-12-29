/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


var jpdbBaseURL ="http://api.login2explore.com:5577";
var jpdbIRL ="/api/irl";
var jpdbIML = "/api/iml";
var sDBName ="STUDENT-TABLE";
var sRelationName ="SCHOOL-DB";
var connToken = "90938248|-31949273433742504|90952564";

$("stRoll").focus();

function saveRecNo2LS(jsonobj){
    var lvData =JSON.parse(jsonobj.data);
    localStorage.setItem("recno",lvData.rec_no);
}

function getStRollAsJsonobj(){
    var stRoll = $("stRoll").val();
    var jsonStr ={
        id:stRoll
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonobj){
    saveRecNo2Ls(jsonobj);
    var record =JSON.parse(jsonobj.record).record;
    $("#sName").val(record.Name);
    $("#sClass").val(record.Class);
    $("#dob").val(record.DOB);
    $("#sAdd").val(record.Address);
    $("#enrDate").val(record.Enrollment);
}

function resetForm(){
    $("#stRoll").val("");
    $("#sName").val("");
    $("#sClass").val("");
    $("#dob").val("");
    $("#sAdd").val("");
    $("#enrDate").val("");
    $("#stRoll").prop("disabled",false);
    $("#save").prop("disabled",true);
    $("#change").prop("disabled",true);
    $("#reset").prop("disabled",true);
    $("#stRoll").focus();
}

function validateData(){
    var stRoll,SName,sClass,dob,sAdd,enrDate;
    stRoll =$("#stRoll").val();
    sName =$("#sName").val();
    sClass =$("#sClass").val();
    dob =$("#dob").val();
    sAdd =$("#sAdd").val();
    enrDate =$("#enrDate").val();
    
    if(stRoll===""){
        alert("Roll No missing");
        $("#stRoll").focus();
        return "";
    }
    if(sName===""){
        alert("Name missing");
        $("#sName").focus();
        return "";
    }
    if(sClass===""){
        alert("Class missing");
        $("#sClass").focus();
        return "";
    }
    if(dob===""){
        alert("DOB missing");
        $("#dob").focus();
        return "";
    }
    if(sAdd===""){
        alert("Address missing");
        $("#sAdd").focus();
        return "";
    }
    if(enrDate===""){
        alert("Enrollment date missing");
        $("#enrDate").focus();
        return "";
    }
    
    var jsonStrobj={
        id:stRoll,
        name: sName,
        Class: sClass,
        DOB:dob,
        Address:sAdd,
        Enrollment:enrDate        
    };
    return JSON.stringify(jsonStrobj);
}

function getst(){
    var stIdJsonObj = getstIdAsJsonObj();
    var getRequest = createGET_BY_KEYREQUEST(connToken,sDBName,sRelationName,stIdJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest,jpdbBaseURL,jpdbIRL);
    jQuery.ajaxSetup({async: true});
    if(resJsonObj.status===400){
        $("#save").prop("disabled",false);
        $("#change").prop("disabled",false);
        $("#sName").focus();
    }else if(resJsonObj.status===200){
        $("#stRoll").prop("disabled",true);
        fillData(resJsonObj);
        
        $("#change").prop("disabled",false);
        $("#reset").prop("disabled",false);
        $("#sName").focus();
    }
  }




function saveData(){
    var jsonStrobj=validate();
    if(jsonStrobj===""){
        return "";
    }
    var putRequest = createPUTRequest(connToken,jsonStrobj,sDBName,sRelationName);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest,jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({async: true});
    restForm();
    $("#stRoll").focus();
}

function changeDate(){
    $("#change").prop("disabled",true);
    jsonchg =validateDate();
    var updateRequest = createUPDATERecordRequest(connToken,jsonchg,sDBName,sRelationName,localstorage.getItem());
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest,jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({async: true});
    restForm();
    $("#stRoll").focus();
}