 // Oyaage links tika me widiyatama thiyala, e e batch ekata adala videos update kala
    const batchData = {
        2026: {
            playlist: "https://www.youtube.com/watch?v=CCUKbKbY3jQ&list=PLdHbjsDuybaH4-jX9sX94rTQYdAy6enHn",
            videos: [
                { id: "CCUKbKbY3jQ", title: "2026 A/L Theory - Lesson 04", desc: "Operating system" },
                { id: "GP4IWp4UMHQ", title: "2026 A/L Theory - Lesson 07", desc: "information system" },
                { id: "8GMoJ8PnXuQ", title: "2026 A/L Theory - Lesson 09", desc: "Python" },
 		{ id: "WAQdPG7DcK8", title: "2026 A/L Theory - Lesson 06", desc: "Networking" },
 		{ id: "IRDTOA9kGjo", title: "2026 A/L Theory - Lesson 08", desc: "Database" },
		{ id: "uxycGR34JYU", title: "2026 A/L Theory - Lesson 04", desc: "Logic gate" },
 		{ id: "loKYNuKWDlg", title: "2026 A/L Theory - Lesson 03", desc: "Number systems" },
 		            ]
        },
        2027: {
            playlist: "https://www.youtube.com/watch?v=8GMoJ8PnXuQ&list=PLdHbjsDuybaFq8LTBvjhoOwDslDKfgDmI",
            videos: [
                { id: "p8N1LMcJN34", title: "2027 A/L - First Session", desc: "Batch Introduction & Subject Overview" }
            ]
        },
        2028: {
            playlist: "https://www.youtube.com/watch?v=GP4IWp4UMHQ&list=PLdHbjsDuybaHxoNCixIcqFwyfvZHoZ7Po",
            videos: [
                { id: "737ZPeaZvU8", title: "2028 A/L - Intro Video", desc: "Getting Started with 2028 New batch" }




            ]
        }
    };

    function switchBatch(year, btn) {
        // UI Updates
        document.getElementById('classTitle').innerText = year + " A/L Class Portal";
        document.querySelectorAll('.batch-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const data = batchData[year];
        const container = document.getElementById('videoContainer');
        container.innerHTML = ""; // Parana list eka clear kireema

        // Video list eka hadanna
        data.videos.forEach(vid => {
            const videoHtml = `
                <a href="https://www.youtube.com/watch?v=${vid.id}&list=${data.playlist.split('list=')[1]}" target="_blank" class="video-item">
                    <img class="video-thumb" src="https://img.youtube.com/vi/${vid.id}/mqdefault.jpg" alt="thumb">
                    <div class="video-info">
                        <h4>${vid.title}</h4>
                        <p>${vid.desc}</p>
                    </div>
                    <div class="play-icon-mini">▶</div>
                </a>
            `;
            container.innerHTML += videoHtml;
        });

        // Main playlist link update
        document.getElementById('mainPlaylistLink').href = data.playlist;
    }

    // Default load (2026)
    window.addEventListener('DOMContentLoaded', () => {
        const activeBtn = document.querySelector('.batch-btn.active');
        if(activeBtn) switchBatch(2026, activeBtn);
    });

let marksArray = []; // මේක script එක උඩින්ම තියෙන්න ඕනේ

function calculateProgress() {
    const nameInput = document.getElementById('student-name').value;
    const markInput = document.getElementById('user-mark-input');
    const markValue = parseFloat(markInput.value);

    // Validation
    if (isNaN(markValue) || markValue < 0 || markValue > 100) {
        alert("Please enter a valid mark (0-100)");
        return;
    }

    // නම Update කිරීම
    document.getElementById('display-name').innerText = nameInput ? nameInput + "'s Progress Report" : "Student Progress Report";

    marksArray.push(markValue);
    const date = new Date().toLocaleDateString();
    
    // Average Calculation
    const totalSum = marksArray.reduce((acc, curr) => acc + curr, 0);
    const average = (totalSum / marksArray.length).toFixed(1);

    // Table එකට අලුත් පේළියක් දානවා
    const tableBody = document.getElementById('table-body');
    const row = `<tr style="border-bottom: 1px solid #f1f5f9;">
        <td style="padding:12px; font-size:0.9rem;">${date}</td>
        <td style="padding:12px; font-size:0.9rem; font-weight:bold;">${markValue}</td>
        <td style="padding:12px; font-size:0.9rem;">
            <span style="color:${markValue >= 40 ? '#22c55e' : '#ef4444'}; font-weight:bold;">
                ${markValue >= 40 ? 'PASS' : 'WEAK'}
            </span>
        </td>
    </tr>`;
    tableBody.innerHTML += row;

    // උඩ තියෙන Card වල දත්ත update කිරීම
    document.getElementById('avg-display').innerText = average + "%";
    document.getElementById('test-count').innerText = marksArray.length;

    markInput.value = ""; // Input එක clear කරනවා
}

function downloadProfessionalPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // 1. නම ගන්න විදිහ (ඔයාගේ HTML එකේ නම දාන input එකේ ID එක මෙතනට දාන්න)
    // උදාහරණයක් විදිහට id="student-name" කියලා මම ගත්තා
    const nameField = document.getElementById('student-name');
    const studentName = nameField ? nameField.value : "STUDENT NAME";

    // 2. Title එක (Header) - ශිෂ්‍යයාගේ නම විතරයි
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(41, 128, 185); // නිල් පාට
    doc.text(studentName.toUpperCase(), 105, 20, { align: "center" });

    // 3. Table එකට දත්ත සකස් කිරීම
    const today = new Date().toLocaleDateString();
    let totalSum = 0;
    const tableRows = [];

    marksArray.forEach((mark, index) => {
        totalSum += mark;
        tableRows.push([
            `Test ${index + 1}`, // Test Number
            today,               // Date
            `${mark}%`           // Marks
        ]);
    });

    // Average එක ගණනය කිරීම
    const average = marksArray.length > 0 ? (totalSum / marksArray.length).toFixed(2) : "0.00";

    // 4. Table එක ඇඳීම (AutoTable)
    doc.autoTable({
        startY: 30,
        head: [['Test No', 'Date', 'Marks Obtained']],
        body: tableRows,
        theme: 'grid',
        headStyles: { fillColor: [41, 128, 185], halign: 'center' },
        styles: { halign: 'center' },
    });

    // 5. Average එක Table එකට පල්ලෙහයින් දාමු
    const finalY = doc.lastAutoTable.finalY + 15;
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`Overall Average Score: ${average}%`, 20, finalY);

    // 6. Save PDF
    doc.save(`${studentName}_Report.pdf`);
}


let userRating = 0;

// තරු පාලනය කරන Function එක
function updateRating(n) {
    userRating = n;
    const stars = document.querySelectorAll('.star-btn');
    const statusText = document.getElementById('rating-text');
    
    stars.forEach(star => {
        const val = parseInt(star.getAttribute('data-value'));
        star.style.color = val <= n ? '#f1c40f' : '#ddd';
    });
    statusText.innerText = `You rated: ${n} Star${n > 1 ? 's' : ''}`;
}

// Review එක Post කරන Function එක
function postNewReview() {
    const name = document.getElementById('rev-name').value;
    const message = document.getElementById('rev-msg').value;
    const fileInput = document.getElementById('rev-file');
    const wall = document.getElementById('reviews-wall');

    if (!name || !message || userRating === 0) {
        alert("ඔක්කොම විස්තර ටිකයි තරුවල ප්‍රමාණයයි ඇතුළත් කරන්න මචං!");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const imgData = fileInput.files[0] ? e.target.result : null;
        
        const reviewBox = `
            <div style="background:#ffffff; border:1px solid #e2e8f0; padding:20px; border-radius:15px; margin-bottom:15px; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <h4 style="margin:0; color:#0f172a;">${name}</h4>
                    <span style="color:#f1c40f; font-size:1.2rem;">${"★".repeat(userRating)}</span>
                </div>
                <p style="color:#475569; margin:10px 0;">${message}</p>
                ${imgData ? `<img src="${imgData}" style="width:100%; border-radius:10px; margin-top:10px;">` : ''}
            </div>
        `;
        
        wall.innerHTML = reviewBox + wall.innerHTML;

        // Reset inputs
        document.getElementById('rev-name').value = '';
        document.getElementById('rev-msg').value = '';
        document.getElementById('rev-file').value = '';
        updateRating(0);
        document.getElementById('rating-text').innerText = "Select stars";
    };

    if (fileInput.files[0]) {
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        reader.onload({target: {result: null}});
    }
}


// AI එකේ දැනුම (Train කරපු තැන)
const aiKnowledge = {
    "ict": [
        "ICT කියන්නේ Information and Communication Technology. අපේ පෝටල් එකේ මේ ගැන වීඩියෝ ගොඩක් තියෙනවා.",
        "ඔයා ICT ගැනද අහන්නේ? Jude Sir ගේ පන්තියේදී ඒ ගැන අපි ගැඹුරින් ඉගෙන ගන්නවා.",
        "ICT කියන්නේ අනාගතය! මට පුළුවන් ඔයාට ICT පාඩම් වල තියෙන ගැටළු විසඳන්න උදව් කරන්න."
    ],
    "python": [
        "Python කියන්නේ හරිම ලේසි programming language එකක්. Jude Hub එකේ Python ගැන මූලික පාඩම් තියෙනවා.",
        "ඔයා code කරන්න ඉගෙන ගන්නවා නම් Python තමයි හොඳම ආරම්භය.",
        "Python ගැන Jude Sir ගේ 08 වෙනි ටියුට් එකේ සවිස්තරාත්මකව තියෙනවා."
    ],
    "hello": [
        "Hello! මම XOYEL AI. ඔයාට අද කොහොමද උදව් කරන්න ඕනේ?",
        "Hi there! ICT Jude Hub එකට සාදරයෙන් පිළිගන්නවා. මම ඔයාගේ සහායකයා.",
        "ආයුබෝවන්! මම XOYEL AI. මොකක්ද අද දැනගන්න ඕනේ?"
    ],
    "marks": [
        "ඔයාගේ ලකුණු බලන්න Sidebar එකේ තියෙන 'Progress Report' එකට යන්න.",
        "Marks ගැන විස්තර ඔක්කොම ඔයාගේ Profile එකේ අප්ඩේට් වෙලා තියෙන්නේ.",
        "Exams වල Marks දැන් පෝටල් එකේ තියෙනවා. ගිහින් බලන්න!"
    ],
    "default": [
        "හ්ම්... ඒ ගැන මම තාම ඉගෙන ගන්නවා. හැබැයි ICT ගැන ඕනෑම දෙයක් ඇහුවොත් මට උත්තර දෙන්න පුළුවන්.",
        "ඒක මරු ප්‍රශ්නයක්! මම ඒක Jude Sir ගේ අවධානයට යොමු කරන්නම්.",
        "මට ඒක හරියටම තේරුණේ නැහැ. ඔයාට පුළුවන්ද ඒක වෙනස් විදිහකට අහන්න?",
        "මම තාම පුහුණු වෙන AI කෙනෙක්. ඔයා පෝටල් එකේ වැඩ ගැන අහනවා නම් මට උදව් කරන්න ලේසියි."


      
    ]
};

function handleUserChat() {
    const inputField = document.getElementById('bot-input');
    const chatBox = document.getElementById('chat-box');
    
    if (!inputField || !chatBox) return;

    const userText = inputField.value.trim();
    if (userText === "") return;

    // 1. User Message
    chatBox.innerHTML += `<div style="background: #0f172a; color: white; padding: 12px 16px; border-radius: 15px 15px 5px 15px; align-self: flex-end; max-width: 85%; font-size: 0.9rem; margin-bottom: 5px;">${userText}</div>`;
    inputField.value = ""; 
    chatBox.scrollTop = chatBox.scrollHeight;

    // 2. Local Thinking (Internet ඕනෙ නැහැ)
    const lowerQ = userText.toLowerCase();
    let responseCategory = "default";

    // Keyword එක අනුව Category එක තෝරාගැනීම
    if (lowerQ.includes("hi") || lowerQ.includes("hello") || lowerQ.includes("ආයුබෝවන්")) responseCategory = "hello";
    else if (lowerQ.includes("ict") || lowerQ.includes("it")) responseCategory = "ict";
    else if (lowerQ.includes("python") || lowerQ.includes("code")) responseCategory = "python";
    else if (lowerQ.includes("mark") || lowerQ.includes("results") || lowerQ.includes("ලකුණු")) responseCategory = "marks";

    // තෝරාගත් Category එකෙන් random උත්තරයක් ගැනීම
    const replies = aiKnowledge[responseCategory];
    const finalAnswer = replies[Math.floor(Math.random() * replies.length)];

    // 3. Display Result
    setTimeout(() => {
        chatBox.innerHTML += `
            <div style="background: white; padding: 12px 16px; border-radius: 15px 15px 15px 5px; align-self: flex-start; max-width: 85%; box-shadow: 0 4px 10px rgba(0,0,0,0.05); font-size: 0.9rem; border-left: 5px solid #3498db; line-height: 1.5; color: #1e293b; margin-bottom: 5px;">
                ${finalAnswer}
            </div>
        `;
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 600); // පොඩි වෙලාවක් යනවා වගේ පෙන්වන්න
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const sendBtn = document.getElementById('send-btn');
    const inputField = document.getElementById('bot-input');
    if (sendBtn) sendBtn.onclick = handleUserChat;
    if (inputField) inputField.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleUserChat(); });
});


  // Slider Logic
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 5000);

    // Tab Switching
    function switchTab(tabId) {
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');
    }

    // Auth Toggle
    function toggleAuth(mode) {
        document.getElementById('loginForm').style.display = mode === 'reg' ? 'none' : 'block';
        document.getElementById('registerForm').style.display = mode === 'reg' ? 'block' : 'none';
    }

    // Password Evaluation
    function evaluatePassword(pass) {
        const prog = document.getElementById('strengthProgress');
        let score = (pass.length > 6) + (/[A-Z]/.test(pass)) + (/[0-9]/.test(pass));
        prog.style.width = (score * 33) + '%';
        prog.style.background = score < 2 ? 'var(--danger)' : 'var(--success)';
    }

    // Alerts
    function showAlert(msg, type) {
        const box = document.getElementById('customAlert');
        box.innerText = msg;
        box.style.background = type === 'error' ? 'var(--danger)' : 'var(--success)';
        box.style.display = "block";
        setTimeout(() => box.style.display = "none", 3000);
    }

    function handleLogin(e) { e.preventDefault(); showAlert("Welcome back!", "success"); }
    function toggleHelp(id) { const el = document.getElementById(id); el.style.display = el.style.display === "none" ? "block" : "none"; }

 // වෙබ් පිටුව සම්පූර්ණයෙන්ම ලෝඩ් වුණාම මේක වැඩ කරනවා
        window.addEventListener("load", function() {
            // තත්පර 2ක් (මිලි තත්පර 2000ක්) ගියාම ලෝඩර් එක අයින් කරන්න
            setTimeout(function() {
                var loader = document.getElementById("loader-wrapper");
                if(loader) {
                    loader.style.display = "none";
                }
            }, 2000); 
        });

function toggleMenu() {
    const sidebar = document.querySelector(".sidebar");
    
    if (sidebar) {
        sidebar.classList.toggle("active");
        console.log("Sidebar status: ", sidebar.classList.contains("active"));
    } else {
        console.error("Sidebar එක සොයාගත නොහැක! HTML එකේ class='sidebar' තිබේදැයි බලන්න.");
    }
}

document.addEventListener('click', function(e) {
    // 1. අර CSS වලින් හදපු Hamburger අයිකන් එක ක්ලික් කළොත්
    if (window.innerWidth <= 768 && e.clientX < 70 && e.clientY < 60) {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) sidebar.classList.toggle('active');
    }

    // 2. Sidebar එකෙන් පිට එබුවොත් හෝ ලිංක් එකක් එබුවොත් Sidebar එක වහන්න
    const sidebar = document.querySelector('.sidebar');
    if (sidebar && sidebar.classList.contains('active')) {
        // Sidebar එක ඇතුළේ නැති තැනක් ක්ලික් කළොත්
        if (!sidebar.contains(e.target) && e.clientX > (window.innerWidth * 0.4)) {
            sidebar.classList.remove('active');
        }
        // ලිංක් එකක් ක්ලික් කළොත් (Tab එක මාරු වුණාම වහන්න)
        if (e.target.closest('.nav-link')) {
            sidebar.classList.remove('active');
        }
    }
});




