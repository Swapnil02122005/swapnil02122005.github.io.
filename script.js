// Global Variables
let currentUser = null;
let currentPage = 'events';
let conversations = [];
let currentConversation = null;

// Sample Data
const sampleEvents = [
    {
        id: 1,
        title: "Tech Career Workshop",
        details: "Learn about latest trends in technology and career opportunities in the tech industry.",
        date: "2024-02-15",
        eligibility: "All Students & Alumni",
        coordinator: "Dr. Sarah Johnson",
        coordinatorEmail: "sarah.johnson@university.edu"
    },
    {
        id: 2,
        title: "Alumni Networking Event",
        details: "Connect with fellow alumni and expand your professional network.",
        date: "2024-02-20",
        eligibility: "Alumni Only",
        coordinator: "Mike Chen",
        coordinatorEmail: "mike.chen@university.edu"
    },
    {
        id: 3,
        title: "Startup Pitch Competition",
        details: "Present your innovative ideas and win funding for your startup.",
        date: "2024-03-01",
        eligibility: "Current Students",
        coordinator: "Prof. David Lee",
        coordinatorEmail: "david.lee@university.edu"
    }
];

const sampleAchievements = [
    {
        id: 1,
        title: "Google Cloud Certification",
        description: "Successfully completed Google Cloud Professional Data Engineer certification.",
        date: "2024-01-15",
        author: "John Doe",
        likes: 15,
        comments: 3
    },
    {
        id: 2,
        title: "Best Project Award",
        description: "Won the best project award for innovative mobile application development.",
        date: "2024-01-10",
        author: "Jane Smith",
        likes: 22,
        comments: 5
    }
];

const sampleAlumni = [
    {
        id: 1,
        name: "John Doe",
        role: "Software Engineer",
        batch: "2020",
        company: "Google",
        email: "john.doe@gmail.com",
        achievements: ["Google Cloud Certification", "Best Project Award"]
    },
    {
        id: 2,
        name: "Jane Smith",
        role: "Product Manager",
        batch: "2019",
        company: "Microsoft",
        email: "jane.smith@gmail.com",
        achievements: ["AWS Certification", "Leadership Award"]
    },
    {
        id: 3,
        name: "Mike Chen",
        role: "Data Scientist",
        batch: "2021",
        company: "Amazon",
        email: "mike.chen@gmail.com",
        achievements: ["Machine Learning Certification"]
    }
];

// Authentication Functions
function showTab(tabName) {
    // Hide all forms
    document.querySelectorAll('.auth-form').forEach(form => {
        form.classList.remove('active');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected form and activate tab
    document.getElementById(tabName + '-form').classList.add('active');
    event.target.classList.add('active');
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Simple validation
    if (!email || !password) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    // Simulate login
    currentUser = {
        name: email.split('@')[0],
        email: email,
        role: 'student',
        batch: '2020'
    };
    
    showMessage('Login successful!', 'success');
    setTimeout(() => {
        showDashboard();
    }, 1000);
}

function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const role = document.getElementById('reg-role').value;
    const batch = document.getElementById('reg-batch').value;
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;
    
    // Validation
    if (!name || !email || !role || !batch || !password || !confirmPassword) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showMessage('Passwords do not match', 'error');
        return;
    }
    
    // Simulate registration
    currentUser = {
        name: name,
        email: email,
        role: role,
        batch: batch
    };
    
    showMessage('Registration successful!', 'success');
    setTimeout(() => {
        showDashboard();
    }, 1000);
}

function showDashboard() {
    document.getElementById('auth-page').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    
    // Update user info
    document.getElementById('user-name').textContent = `Welcome, ${currentUser.name}!`;
    
    // Load initial page
    showPage('events');
}

function logout() {
    currentUser = null;
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('auth-page').classList.remove('hidden');
    
    // Clear forms
    document.querySelectorAll('form').forEach(form => form.reset());
}

// Navigation Functions
function showPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Remove active class from nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageName + '-page').classList.add('active');
    
    // Activate nav link
    document.querySelector(`[onclick="showPage('${pageName}')"]`).classList.add('active');
    
    currentPage = pageName;
    
    // Load page-specific content
    switch(pageName) {
        case 'events':
            loadEvents();
            break;
        case 'fund':
            loadFundData();
            break;
        case 'achievements':
            loadAchievements();
            break;
        case 'messages':
            loadMessages();
            break;
        case 'alumni':
            loadAlumni();
            break;
        case 'profile':
            loadProfile();
            break;
    }
}

// Events Functions
function loadEvents() {
    const eventsGrid = document.getElementById('events-grid');
    eventsGrid.innerHTML = '';
    
    sampleEvents.forEach(event => {
        const eventCard = createEventCard(event);
        eventsGrid.appendChild(eventCard);
    });
}

function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.innerHTML = `
        <div class="event-header">
            <div>
                <h3 class="event-title">${event.title}</h3>
                <div class="event-date">${formatDate(event.date)}</div>
            </div>
        </div>
        <div class="event-details">${event.details}</div>
        <div class="event-meta">
            <div class="event-eligibility">${event.eligibility}</div>
            <div class="event-coordinator">
                <i class="fas fa-user"></i>
                <span>${event.coordinator}</span>
            </div>
        </div>
        <button class="fund-btn" onclick="fundEvent(${event.id})">
            <i class="fas fa-donate"></i> Fund This Event
        </button>
    `;
    return card;
}

function fundEvent(eventId) {
    showMessage('Redirecting to fund page...', 'success');
    setTimeout(() => {
        showPage('fund');
    }, 1000);
}

// Fund Functions
function loadFundData() {
    // Update stats
    document.getElementById('total-funds').textContent = '$12,450';
    document.getElementById('total-donors').textContent = '45';
    document.getElementById('active-campaigns').textContent = '3';
    
    // Load campaigns
    const campaignsGrid = document.getElementById('fund-campaigns');
    campaignsGrid.innerHTML = '';
    
    const campaigns = [
        {
            title: "Scholarship Fund",
            description: "Support deserving students with financial aid for their education.",
            target: 50000,
            raised: 25000,
            donors: 25
        },
        {
            title: "Campus Infrastructure",
            description: "Help improve campus facilities and infrastructure.",
            target: 100000,
            raised: 45000,
            donors: 15
        },
        {
            title: "Research Grant",
            description: "Fund innovative research projects by faculty and students.",
            target: 75000,
            raised: 30000,
            donors: 20
        }
    ];
    
    campaigns.forEach(campaign => {
        const campaignCard = createCampaignCard(campaign);
        campaignsGrid.appendChild(campaignCard);
    });
}

function createCampaignCard(campaign) {
    const progress = (campaign.raised / campaign.target) * 100;
    
    const card = document.createElement('div');
    card.className = 'campaign-card';
    card.innerHTML = `
        <div class="campaign-header">
            <h3 class="campaign-title">${campaign.title}</h3>
            <div class="campaign-amount">$${campaign.raised.toLocaleString()}</div>
        </div>
        <div class="campaign-description">${campaign.description}</div>
        <div class="campaign-progress">
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progress}%"></div>
            </div>
            <div class="progress-text">
                <span>$${campaign.raised.toLocaleString()} raised</span>
                <span>${campaign.donors} donors</span>
            </div>
        </div>
        <button class="donate-btn" onclick="donateToCampaign('${campaign.title}')">
            <i class="fas fa-heart"></i> Donate Now
        </button>
    `;
    return card;
}

function donateToCampaign(campaignTitle) {
    showMessage(`Thank you for your interest in donating to ${campaignTitle}!`, 'success');
}

// Achievements Functions
function loadAchievements() {
    const achievementsGrid = document.getElementById('achievements-grid');
    achievementsGrid.innerHTML = '';
    
    sampleAchievements.forEach(achievement => {
        const achievementCard = createAchievementCard(achievement);
        achievementsGrid.appendChild(achievementCard);
    });
}

function createAchievementCard(achievement) {
    const card = document.createElement('div');
    card.className = 'achievement-card';
    card.innerHTML = `
        <div class="achievement-header">
            <h3 class="achievement-title">${achievement.title}</h3>
            <div class="achievement-date">${formatDate(achievement.date)}</div>
        </div>
        <div class="achievement-description">${achievement.description}</div>
        <div class="achievement-author">
            <strong>By:</strong> ${achievement.author}
        </div>
        <div class="achievement-actions">
            <button class="like-btn" onclick="likeAchievement(${achievement.id})">
                <i class="fas fa-heart"></i> ${achievement.likes}
            </button>
            <button class="comment-btn" onclick="commentAchievement(${achievement.id})">
                <i class="fas fa-comment"></i> ${achievement.comments} Comments
            </button>
        </div>
    `;
    return card;
}

function likeAchievement(achievementId) {
    showMessage('Achievement liked!', 'success');
}

function commentAchievement(achievementId) {
    showMessage('Comment feature coming soon!', 'success');
}

// Messages Functions
function loadMessages() {
    // Sample conversations
    conversations = [
        {
            id: 1,
            name: "Dr. Sarah Johnson",
            preview: "Thanks for reaching out!",
            lastMessage: "2024-01-15",
            unread: 2
        },
        {
            id: 2,
            name: "Mike Chen",
            preview: "Let's schedule a meeting",
            lastMessage: "2024-01-14",
            unread: 0
        },
        {
            id: 3,
            name: "Jane Smith",
            preview: "Great to hear from you!",
            lastMessage: "2024-01-13",
            unread: 1
        }
    ];
    
    const conversationsList = document.getElementById('conversations-list');
    conversationsList.innerHTML = '';
    
    conversations.forEach(conversation => {
        const conversationItem = createConversationItem(conversation);
        conversationsList.appendChild(conversationItem);
    });
}

function createConversationItem(conversation) {
    const item = document.createElement('div');
    item.className = 'conversation-item';
    item.innerHTML = `
        <div class="conversation-name">${conversation.name}</div>
        <div class="conversation-preview">${conversation.preview}</div>
    `;
    item.onclick = () => selectConversation(conversation.id);
    return item;
}

function selectConversation(conversationId) {
    currentConversation = conversationId;
    
    // Update active conversation
    document.querySelectorAll('.conversation-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.conversation-item').classList.add('active');
    
    // Show chat area
    document.getElementById('chat-header').innerHTML = `
        <h3>${conversations.find(c => c.id === conversationId).name}</h3>
    `;
    document.getElementById('chat-input').style.display = 'flex';
    
    // Load messages
    loadChatMessages(conversationId);
}

function loadChatMessages(conversationId) {
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML = '';
    
    // Sample messages
    const messages = [
        {
            text: "Hello! How can I help you today?",
            sent: false,
            time: "10:30 AM"
        },
        {
            text: "I'm interested in learning more about career opportunities in tech.",
            sent: true,
            time: "10:32 AM"
        },
        {
            text: "That's great! I'd be happy to share some insights. What specific area interests you most?",
            sent: false,
            time: "10:35 AM"
        }
    ];
    
    messages.forEach(message => {
        const messageElement = createMessageElement(message);
        chatMessages.appendChild(messageElement);
    });
}

function createMessageElement(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${message.sent ? 'sent' : 'received'}`;
    messageDiv.innerHTML = `
        <div>${message.text}</div>
        <div class="message-time">${message.time}</div>
    `;
    return messageDiv;
}

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value.trim();
    
    if (!messageText) return;
    
    const chatMessages = document.getElementById('chat-messages');
    const messageElement = createMessageElement({
        text: messageText,
        sent: true,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    });
    
    chatMessages.appendChild(messageElement);
    messageInput.value = '';
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Alumni Functions
function loadAlumni() {
    const alumniGrid = document.getElementById('alumni-grid');
    alumniGrid.innerHTML = '';
    
    // Populate filters
    populateFilters();
    
    sampleAlumni.forEach(alumni => {
        const alumniCard = createAlumniCard(alumni);
        alumniGrid.appendChild(alumniCard);
    });
}

function createAlumniCard(alumni) {
    const card = document.createElement('div');
    card.className = 'alumni-card';
    card.innerHTML = `
        <div class="alumni-avatar">
            <i class="fas fa-user"></i>
        </div>
        <h3 class="alumni-name">${alumni.name}</h3>
        <p class="alumni-role">${alumni.role}</p>
        <div class="alumni-batch">Batch ${alumni.batch}</div>
        <p class="alumni-company">${alumni.company}</p>
        <a href="mailto:${alumni.email}" class="alumni-email">${alumni.email}</a>
    `;
    return card;
}

function populateFilters() {
    const batchFilter = document.getElementById('batch-filter');
    const companyFilter = document.getElementById('company-filter');
    
    // Get unique batches and companies
    const batches = [...new Set(sampleAlumni.map(alumni => alumni.batch))];
    const companies = [...new Set(sampleAlumni.map(alumni => alumni.company))];
    
    // Populate batch filter
    batches.forEach(batch => {
        const option = document.createElement('option');
        option.value = batch;
        option.textContent = `Batch ${batch}`;
        batchFilter.appendChild(option);
    });
    
    // Populate company filter
    companies.forEach(company => {
        const option = document.createElement('option');
        option.value = company;
        option.textContent = company;
        companyFilter.appendChild(option);
    });
}

function searchAlumni() {
    const searchTerm = document.getElementById('alumni-search').value.toLowerCase();
    const alumniCards = document.querySelectorAll('.alumni-card');
    
    alumniCards.forEach(card => {
        const name = card.querySelector('.alumni-name').textContent.toLowerCase();
        const company = card.querySelector('.alumni-company').textContent.toLowerCase();
        
        if (name.includes(searchTerm) || company.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterAlumni() {
    const batchFilter = document.getElementById('batch-filter').value;
    const companyFilter = document.getElementById('company-filter').value;
    
    const alumniCards = document.querySelectorAll('.alumni-card');
    
    alumniCards.forEach(card => {
        const batch = card.querySelector('.alumni-batch').textContent;
        const company = card.querySelector('.alumni-company').textContent;
        
        const batchMatch = !batchFilter || batch.includes(batchFilter);
        const companyMatch = !companyFilter || company.includes(companyFilter);
        
        if (batchMatch && companyMatch) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Profile Functions
function loadProfile() {
    if (!currentUser) return;
    
    // Update profile display
    document.getElementById('profile-name').textContent = currentUser.name;
    document.getElementById('profile-role').textContent = currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1);
    document.getElementById('profile-batch').textContent = `Batch ${currentUser.batch}`;
    
    // Populate form
    document.getElementById('profile-name-input').value = currentUser.name;
    document.getElementById('profile-email-input').value = currentUser.email;
    document.getElementById('profile-phone-input').value = currentUser.phone || '';
    document.getElementById('profile-company-input').value = currentUser.company || '';
    document.getElementById('profile-position-input').value = currentUser.position || '';
    document.getElementById('profile-bio-input').value = currentUser.bio || '';
}

function updateProfile(event) {
    event.preventDefault();
    
    // Update current user
    currentUser.name = document.getElementById('profile-name-input').value;
    currentUser.email = document.getElementById('profile-email-input').value;
    currentUser.phone = document.getElementById('profile-phone-input').value;
    currentUser.company = document.getElementById('profile-company-input').value;
    currentUser.position = document.getElementById('profile-position-input').value;
    currentUser.bio = document.getElementById('profile-bio-input').value;
    
    // Update display
    document.getElementById('profile-name').textContent = currentUser.name;
    document.getElementById('user-name').textContent = `Welcome, ${currentUser.name}!`;
    
    showMessage('Profile updated successfully!', 'success');
}

// Modal Functions
function showModal(title, content) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-body').innerHTML = content;
    document.getElementById('modal-overlay').classList.add('active');
}

function closeModal() {
    document.getElementById('modal-overlay').classList.remove('active');
}

function showAddEventModal() {
    const content = `
        <form onsubmit="addEvent(event)">
            <div class="form-group">
                <label>Event Title</label>
                <input type="text" id="event-title" required>
            </div>
            <div class="form-group">
                <label>Event Details</label>
                <textarea id="event-details" rows="4" required></textarea>
            </div>
            <div class="form-group">
                <label>Date</label>
                <input type="date" id="event-date" required>
            </div>
            <div class="form-group">
                <label>Eligibility</label>
                <input type="text" id="event-eligibility" required>
            </div>
            <div class="form-group">
                <label>Coordinator</label>
                <input type="text" id="event-coordinator" required>
            </div>
            <button type="submit" class="btn-primary">Add Event</button>
        </form>
    `;
    showModal('Add New Event', content);
}

function addEvent(event) {
    event.preventDefault();
    
    const newEvent = {
        id: Date.now(),
        title: document.getElementById('event-title').value,
        details: document.getElementById('event-details').value,
        date: document.getElementById('event-date').value,
        eligibility: document.getElementById('event-eligibility').value,
        coordinator: document.getElementById('event-coordinator').value,
        coordinatorEmail: 'coordinator@university.edu'
    };
    
    sampleEvents.push(newEvent);
    loadEvents();
    closeModal();
    showMessage('Event added successfully!', 'success');
}

function showAddAchievementModal() {
    const content = `
        <form onsubmit="addAchievement(event)">
            <div class="form-group">
                <label>Achievement Title</label>
                <input type="text" id="achievement-title" required>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea id="achievement-description" rows="4" required></textarea>
            </div>
            <div class="form-group">
                <label>Date</label>
                <input type="date" id="achievement-date" required>
            </div>
            <button type="submit" class="btn-primary">Add Achievement</button>
        </form>
    `;
    showModal('Add New Achievement', content);
}

function addAchievement(event) {
    event.preventDefault();
    
    const newAchievement = {
        id: Date.now(),
        title: document.getElementById('achievement-title').value,
        description: document.getElementById('achievement-description').value,
        date: document.getElementById('achievement-date').value,
        author: currentUser.name,
        likes: 0,
        comments: 0
    };
    
    sampleAchievements.push(newAchievement);
    loadAchievements();
    closeModal();
    showMessage('Achievement added successfully!', 'success');
}

function showNewMessageModal() {
    const content = `
        <form onsubmit="startNewConversation(event)">
            <div class="form-group">
                <label>Recipient</label>
                <select id="message-recipient" required>
                    <option value="">Select Recipient</option>
                    ${sampleAlumni.map(alumni => `<option value="${alumni.id}">${alumni.name}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label>Message</label>
                <textarea id="message-text" rows="4" required></textarea>
            </div>
            <button type="submit" class="btn-primary">Send Message</button>
        </form>
    `;
    showModal('New Message', content);
}

function startNewConversation(event) {
    event.preventDefault();
    
    const recipientId = document.getElementById('message-recipient').value;
    const messageText = document.getElementById('message-text').value;
    
    const recipient = sampleAlumni.find(alumni => alumni.id == recipientId);
    
    const newConversation = {
        id: Date.now(),
        name: recipient.name,
        preview: messageText,
        lastMessage: new Date().toISOString().split('T')[0],
        unread: 0
    };
    
    conversations.unshift(newConversation);
    loadMessages();
    closeModal();
    showMessage('Message sent successfully!', 'success');
}

// Utility Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function showMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-${type}`;
    messageDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        ${text}
    `;
    
    // Insert at the top of the main content
    const mainContent = document.querySelector('.main-content');
    mainContent.insertBefore(messageDiv, mainContent.firstChild);
    
    // Remove after 3 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    if (localStorage.getItem('currentUser')) {
        currentUser = JSON.parse(localStorage.getItem('currentUser'));
        showDashboard();
    }
    
    // Save user data on changes
    setInterval(() => {
        if (currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
    }, 1000);
});

// Handle Enter key in message input
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && event.target.id === 'message-input') {
        sendMessage();
    }
});
