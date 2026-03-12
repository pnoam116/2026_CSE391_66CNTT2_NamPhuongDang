function showError(id,message){
document.getElementById(id+"Error").innerText=message
}

function clearError(id){
document.getElementById(id+"Error").innerText=""
}

function validateFullname(){

let value=document.getElementById("fullname").value.trim()

let regex=/^[A-Za-zÀ-ỹ\s]{3,}$/

if(value===""){
showError("fullname","Không được để trống")
return false
}

if(!regex.test(value)){
showError("fullname","Ít nhất 3 ký tự và chỉ chứa chữ")
return false
}

clearError("fullname")
return true
}

function validateEmail(){

let value=document.getElementById("email").value.trim()

let regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/

if(value===""){
showError("email","Email không được trống")
return false
}

if(!regex.test(value)){
showError("email","Email không đúng định dạng")
return false
}

clearError("email")
return true
}

function validatePhone(){

let value=document.getElementById("phone").value.trim()

let regex=/^0\d{9}$/

if(value===""){
showError("phone","Số điện thoại không được trống")
return false
}

if(!regex.test(value)){
showError("phone","Số điện thoại phải 10 số và bắt đầu bằng 0")
return false
}

clearError("phone")
return true
}

function validatePassword(){

let value=document.getElementById("password").value

let regex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

if(value===""){
showError("password","Mật khẩu không được trống")
return false
}

if(!regex.test(value)){
showError("password","≥8 ký tự, có chữ hoa, chữ thường và số")
return false
}

clearError("password")
return true
}

function validateConfirmPassword(){

let password=document.getElementById("password").value
let confirm=document.getElementById("confirmPassword").value

if(confirm!==password){
showError("confirmPassword","Mật khẩu không khớp")
return false
}

clearError("confirmPassword")
return true
}

function validateGender(){

let gender=document.querySelector("input[name='gender']:checked")

if(!gender){
showError("gender","Hãy chọn giới tính")
return false
}

clearError("gender")
return true
}

function validateTerms(){

let checked=document.getElementById("terms").checked

if(!checked){
showError("terms","Bạn phải đồng ý điều khoản")
return false
}

clearError("terms")
return true
}

document.getElementById("registerForm").addEventListener("submit",function(e){

e.preventDefault()

let valid=
validateFullname() &
validateEmail() &
validatePhone() &
validatePassword() &
validateConfirmPassword() &
validateGender() &
validateTerms()

if(valid){

let name=document.getElementById("fullname").value

document.getElementById("registerForm").style.display="none"

document.getElementById("successMessage").innerText=
"Đăng ký thành công! 🎉 Xin chào "+name

}

})

document.getElementById("fullname").addEventListener("blur",validateFullname)
document.getElementById("email").addEventListener("blur",validateEmail)
document.getElementById("phone").addEventListener("blur",validatePhone)
document.getElementById("password").addEventListener("blur",validatePassword)
document.getElementById("confirmPassword").addEventListener("blur",validateConfirmPassword)

document.querySelectorAll("input").forEach(input=>{
input.addEventListener("input",function(){
let id=this.id
if(id) clearError(id)
})
})