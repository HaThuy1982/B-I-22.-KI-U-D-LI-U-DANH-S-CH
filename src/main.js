document.addEventListener("DOMContentLoaded", () => {
    const listData = [7, "Lan", 3.5, true, "Tin"];
    const container = document.getElementById("train-container");
    const checkBtn = document.getElementById("check-btn");
    const input = document.getElementById("index-input");
    const message = document.getElementById("feedback-message");

    // Tạo các toa tàu
    listData.forEach((item, index) => {
        const box = document.createElement("div");
        box.className = "train-car";
        box.style.border = "2px solid #333";
        box.style.padding = "20px";
        box.style.margin = "10px";
        box.style.display = "inline-block";
        box.style.textAlign = "center";
        
        box.innerHTML = `
            <div style="font-size: 24px; font-weight: bold;">${item}</div>
            <div style="color: red; margin-top: 10px; font-size: 14px;">Index: ?</div>
        `;
        box.id = `car-${index}`;
        container.appendChild(box);
    });

    // Xử lý sự kiện click
    checkBtn.addEventListener("click", () => {
        const indexVal = parseInt(input.value);
        
        // Reset trạng thái
        document.querySelectorAll('.train-car').forEach(car => {
            car.style.backgroundColor = "transparent";
            car.querySelector('div:last-child').innerText = "Index: ?";
        });
        message.classList.add("hidden");

        if (isNaN(indexVal) || indexVal < 0 || indexVal > 4) {
            message.innerText = "Vui lòng nhập số từ 0 đến 4!";
            message.style.color = "red";
            message.classList.remove("hidden");
            return;
        }

        // Bật mí index
        const selectedCar = document.getElementById(`car-${indexVal}`);
        selectedCar.style.backgroundColor = "#ffeb3b";
        
        // Hiện index thật của tất cả toa tàu
        document.querySelectorAll('.train-car').forEach((car, idx) => {
            car.querySelector('div:last-child').innerText = `Index: ${idx}`;
        });

        message.innerHTML = `Chính xác! Toa số <strong>${indexVal + 1}</strong> trong thực tế chính là <strong>Index ${indexVal}</strong> trong Python. Giá trị là: <strong>${listData[indexVal]}</strong>`;
        message.style.color = "green";
        message.classList.remove("hidden");
    });
});
