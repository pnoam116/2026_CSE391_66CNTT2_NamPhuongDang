let students = []
let filteredStudents = []
let sortAsc = true

function getRank(score){
    if(score >= 8.5) return "Giỏi"
    if(score >= 7) return "Khá"
    if(score >= 5) return "Trung bình"
    return "Yếu"
}

function applyFilters(){

    const keyword = document.getElementById("search").value.toLowerCase()
    const filter = document.getElementById("filter").value

    filteredStudents = students.filter(sv => {

        let matchName = sv.name.toLowerCase().includes(keyword)

        let rank = getRank(sv.score)

        let matchRank = (filter === "all" || rank === filter)

        return matchName && matchRank
    })

    filteredStudents.sort((a,b)=>{
        return sortAsc ? a.score - b.score : b.score - a.score
    })

    renderTable()
}

function renderTable(){

    const tbody = document.getElementById("tableBody")
    tbody.innerHTML = ""

    if(filteredStudents.length === 0){
        tbody.innerHTML = `<tr><td colspan="5">Không có kết quả</td></tr>`
        return
    }

    let totalScore = 0

    filteredStudents.forEach((sv, index)=>{

        totalScore += sv.score

        let tr = document.createElement("tr")

        if(sv.score < 5){
            tr.classList.add("yeu")
        }

        tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${sv.name}</td>
        <td>${sv.score}</td>
        <td>${getRank(sv.score)}</td>
        <td><button data-index="${index}">Xóa</button></td>
        `

        tbody.appendChild(tr)
    })

    let avg = filteredStudents.length ? (totalScore / filteredStudents.length).toFixed(2) : 0

    document.getElementById("stats").innerText =
        `Tổng SV: ${filteredStudents.length} | Điểm trung bình: ${avg}`
}

function addStudent(){

    const nameInput = document.getElementById("name")
    const scoreInput = document.getElementById("score")

    const name = nameInput.value.trim()
    const score = parseFloat(scoreInput.value)

    if(name === ""){
        alert("Họ tên không được để trống")
        return
    }

    if(isNaN(score) || score < 0 || score > 10){
        alert("Điểm phải từ 0 đến 10")
        return
    }

    students.push({ name, score })

    nameInput.value = ""
    scoreInput.value = ""

    nameInput.focus()

    applyFilters()
}

document.getElementById("addBtn").addEventListener("click", addStudent)

document.getElementById("score").addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        addStudent()
    }
})

document.getElementById("search").addEventListener("input", applyFilters)

document.getElementById("filter").addEventListener("change", applyFilters)

document.getElementById("scoreHeader").addEventListener("click", function(){

    sortAsc = !sortAsc

    this.innerHTML = sortAsc ? "Điểm ▲" : "Điểm ▼"

    applyFilters()
})

document.getElementById("tableBody").addEventListener("click", function(e){

    if(e.target.tagName === "BUTTON"){

        const index = e.target.dataset.index

        students.splice(index,1)

        applyFilters()
    }

})