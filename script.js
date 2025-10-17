// Global Variables
let selectedPlan = 'free';
let isProjectsOpen = false;
let isModalOpen = false;

// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const mainContainer = document.querySelector('.main-container');
const projectsBtn = document.getElementById('projectsBtn');
const projectsSidebar = document.getElementById('projectsSidebar');
const closeSidebar = document.getElementById('closeSidebar');
const overlay = document.getElementById('overlay');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const closeLoginModal = document.getElementById('closeLoginModal');
const closeRegisterModal = document.getElementById('closeRegisterModal');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const chatMessages = document.getElementById('chatMessages');
const fileUploadArea = document.getElementById('fileUploadArea');
const fileInput = document.getElementById('fileInput');
const urlInput = document.getElementById('urlInput');
const planCards = document.querySelectorAll('.plan-card');

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    simulateLoading();
});

// Initialize App Function
function initializeApp() {
    // Add initial animations
    addInitialAnimations();
    
    // Setup chat functionality
    setupChat();
    
    // Setup file upload
    setupFileUpload();
    
    // Setup plan selection
    setupPlanSelection();
}

// Setup Event Listeners
function setupEventListeners() {
    // Projects sidebar
    projectsBtn.addEventListener('click', toggleProjectsSidebar);
    closeSidebar.addEventListener('click', closeProjectsSidebar);
    overlay.addEventListener('click', closeProjectsSidebar);
    
    // Modals
    loginBtn.addEventListener('click', () => openModal('login'));
    registerBtn.addEventListener('click', () => openModal('register'));
    closeLoginModal.addEventListener('click', () => closeModal('login'));
    closeRegisterModal.addEventListener('click', () => closeModal('register'));
    
    // Chat
    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // File upload
    fileUploadArea.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileUpload);
    urlInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleUrlUpload();
        }
    });
    
    // Plan selection
    planCards.forEach(card => {
        card.addEventListener('click', () => selectPlan(card));
    });
    
    // Forms
    document.querySelector('.login-form').addEventListener('submit', handleLogin);
    document.querySelector('.register-form').addEventListener('submit', handleRegister);
    
    // Close modals on escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (isProjectsOpen) closeProjectsSidebar();
            if (isModalOpen) closeAllModals();
        }
    });
}

// Simulate Loading
function simulateLoading() {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 3500);
}

// Add Initial Animations
function addInitialAnimations() {
    // Animate elements on load
    const elements = document.querySelectorAll('.chat-box, .projects-btn, .header');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 1000 + (index * 200));
    });
}

// Projects Sidebar Functions
function toggleProjectsSidebar() {
    if (isProjectsOpen) {
        closeProjectsSidebar();
    } else {
        openProjectsSidebar();
    }
}

function openProjectsSidebar() {
    isProjectsOpen = true;
    projectsSidebar.classList.add('open');
    overlay.classList.add('active');
    projectsBtn.style.transform = 'translateY(-50%) rotate(45deg)';
    
    // Animate project items
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(50px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease-out';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 200 + (index * 100));
    });
}

function closeProjectsSidebar() {
    isProjectsOpen = false;
    projectsSidebar.classList.remove('open');
    overlay.classList.remove('active');
    projectsBtn.style.transform = 'translateY(-50%) rotate(0deg)';
}

// Modal Functions
function openModal(type) {
    isModalOpen = true;
    const modal = type === 'login' ? loginModal : registerModal;
    modal.classList.add('active');
    overlay.classList.add('active');
    
    // Animate modal content
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.transform = 'scale(0.9)';
    setTimeout(() => {
        modalContent.style.transform = 'scale(1)';
    }, 10);
}

function closeModal(type) {
    const modal = type === 'login' ? loginModal : registerModal;
    modal.classList.remove('active');
    overlay.classList.remove('active');
    isModalOpen = false;
}

function closeAllModals() {
    loginModal.classList.remove('active');
    registerModal.classList.remove('active');
    overlay.classList.remove('active');
    isModalOpen = false;
}

// Chat Functions
function setupChat() {
    // Add typing indicator functionality
    messageInput.addEventListener('input', function() {
        if (this.value.trim()) {
            sendBtn.style.transform = 'scale(1.1)';
            sendBtn.style.boxShadow = '0 0 30px rgba(255, 0, 0, 0.5)';
        } else {
            sendBtn.style.transform = 'scale(1)';
            sendBtn.style.boxShadow = '0 0 20px rgba(255, 0, 0, 0.3)';
        }
    });
}

function sendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;
    
    // Add user message
    addMessage(message, 'user');
    messageInput.value = '';
    
    // Simulate AI response
    setTimeout(() => {
        const aiResponse = generateAIResponse(message);
        addMessage(aiResponse, 'ai');
    }, 1000 + Math.random() * 2000);
}

function addMessage(content, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = type === 'ai' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.innerHTML = `<p>${content}</p>`;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Add glow effect
    messageDiv.classList.add('glow');
    setTimeout(() => {
        messageDiv.classList.remove('glow');
    }, 2000);
}

function generateAIResponse(userMessage) {
    const responses = [
        "Suprantu! Galiu padėti su video redagavimu. Kokį tipą redagavimo norėtumėte?",
        "Puiku! Aš galiu apkarpyti video, pridėti subtitrus, arba sukurti perėjimus. Ką norėtumėte daryti?",
        "Įdomu! Ar turite video failą, kurį norėtumėte redaguoti?",
        "Galiu padėti su highlight'ų išrinkimu ir muzikos pridėjimu. Koks jūsų tikslas?",
        "Supratau! Aš galiu sukurti profesionalų video su visais efektais. Pradėkime!",
        "Puiku! Kokį stilių norėtumėte - dinamišką ar ramų?",
        "Suprantu jūsų poreikius! Aš galiu padėti sukurti puikų video turinį.",
        "Įdomu! Ar norėtumėte pridėti specialių efektų ar išlaikyti natūralų vaizdą?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
}

// File Upload Functions
function setupFileUpload() {
    // Drag and drop functionality
    fileUploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.borderColor = '#ff0000';
        this.style.boxShadow = '0 0 20px rgba(255, 0, 0, 0.3)';
    });
    
    fileUploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.style.borderColor = 'rgba(255, 0, 0, 0.3)';
        this.style.boxShadow = 'none';
    });
    
    fileUploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.borderColor = 'rgba(255, 0, 0, 0.3)';
        this.style.boxShadow = 'none';
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileUpload({ target: { files: files } });
        }
    });
}

function handleFileUpload(event) {
    const files = event.target.files;
    if (files.length === 0) return;
    
    Array.from(files).forEach(file => {
        if (file.type.startsWith('video/') || file.type.startsWith('image/')) {
            addMessage(`📁 Įkeltas failas: ${file.name} (${formatFileSize(file.size)})`, 'system');
            
            // Simulate processing
            setTimeout(() => {
                addMessage(`✅ Failas "${file.name}" sėkmingai apdorotas! Galite pradėti redagavimą.`, 'ai');
            }, 2000);
        } else {
            addMessage(`❌ Netinkamas failo tipas: ${file.name}. Prašome įkelti video arba paveikslėlį.`, 'system');
        }
    });
}

function handleUrlUpload() {
    const url = urlInput.value.trim();
    if (!url) return;
    
    if (isValidUrl(url)) {
        addMessage(`🔗 URL įkeltas: ${url}`, 'system');
        urlInput.value = '';
        
        // Simulate processing
        setTimeout(() => {
            addMessage(`✅ URL sėkmingai apdorotas! Galite pradėti redagavimą.`, 'ai');
        }, 2000);
    } else {
        addMessage(`❌ Netinkamas URL formatas. Prašome įvesti teisingą URL.`, 'system');
    }
}

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Plan Selection Functions
function setupPlanSelection() {
    // Set default selection
    selectPlan(document.querySelector('[data-plan="free"]'));
}

function selectPlan(card) {
    // Remove previous selection
    planCards.forEach(c => c.classList.remove('selected'));
    
    // Add selection to clicked card
    card.classList.add('selected');
    selectedPlan = card.dataset.plan;
    
    // Add glow effect
    card.classList.add('glow');
    setTimeout(() => {
        card.classList.remove('glow');
    }, 1000);
}

// Form Handlers
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simulate login
    addMessage(`🔐 Bandote prisijungti su: ${email}`, 'system');
    
    setTimeout(() => {
        addMessage(`✅ Sėkmingai prisijungėte! Sveiki atvykę į Aeret!`, 'ai');
        closeModal('login');
    }, 2000);
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    // Simulate registration
    addMessage(`📝 Registruojate vartotoją: ${name} (${email})`, 'system');
    addMessage(`💳 Pasirinktas planas: ${selectedPlan.toUpperCase()}`, 'system');
    
    setTimeout(() => {
        addMessage(`🎉 Registracija sėkminga! Dabar galite naudoti visus Aeret funkcijas!`, 'ai');
        closeModal('register');
    }, 3000);
}

// Utility Functions
function addGlowEffect(element) {
    element.classList.add('glow');
    setTimeout(() => {
        element.classList.remove('glow');
    }, 2000);
}

function createParticleEffect(x, y) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = '#ff0000';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';
    particle.style.boxShadow = '0 0 10px #ff0000';
    
    document.body.appendChild(particle);
    
    // Animate particle
    const animation = particle.animate([
        { transform: 'scale(0) translateY(0)', opacity: 1 },
        { transform: 'scale(1) translateY(-50px)', opacity: 0 }
    ], {
        duration: 1000,
        easing: 'ease-out'
    });
    
    animation.onfinish = () => {
        particle.remove();
    };
}

// Add click effects to buttons
document.addEventListener('click', function(e) {
    if (e.target.matches('button, .nav-btn, .send-btn, .projects-btn')) {
        createParticleEffect(e.clientX, e.clientY);
        addGlowEffect(e.target);
    }
});

// Add hover effects
document.addEventListener('mouseover', function(e) {
    if (e.target.matches('.project-item, .plan-card, .nav-btn')) {
        e.target.style.transform = 'translateY(-2px)';
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.matches('.project-item, .plan-card, .nav-btn')) {
        e.target.style.transform = 'translateY(0)';
    }
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to send message
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        sendMessage();
    }
    
    // Ctrl/Cmd + P to open projects
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        toggleProjectsSidebar();
    }
});

// Add system message type
const originalAddMessage = addMessage;
addMessage = function(content, type) {
    if (type === 'system') {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message system-message';
        messageDiv.style.opacity = '0.7';
        messageDiv.style.fontStyle = 'italic';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = `<p>${content}</p>`;
        
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return;
    }
    
    originalAddMessage(content, type);
};

// Initialize tooltips and additional effects
document.addEventListener('DOMContentLoaded', function() {
    // Add tooltips
    const tooltips = {
        'projectsBtn': 'Atidaryti projektus (Ctrl+P)',
        'sendBtn': 'Siųsti žinutę (Ctrl+Enter)',
        'fileUploadArea': 'Įkelti failą arba įklijuoti URL'
    };
    
    Object.entries(tooltips).forEach(([selector, text]) => {
        const element = document.getElementById(selector);
        if (element) {
            element.title = text;
        }
    });
    
    // Add welcome message after loading
    setTimeout(() => {
        addMessage("🎬 Sveiki atvykę į Aeret! Aš esu jūsų AI asistentas video redagavimui. Kaip galiu padėti?", 'ai');
    }, 5000);
});

// Performance optimization
let animationFrameId;
function optimizeAnimations() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    
    animationFrameId = requestAnimationFrame(() => {
        // Smooth animations here
    });
}

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
});
