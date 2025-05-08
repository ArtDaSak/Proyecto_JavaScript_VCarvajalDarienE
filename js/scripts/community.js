const API_URL = 'https://67fc6c5d1f8b41c816866d84.mockapi.io/api/v1/community';
const CACHE_KEY = 'community_posts';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const postForm = document.getElementById('post-form');
const nameInput = document.getElementById('name');
const messageInput = document.getElementById('message');
const postsContainer = document.getElementById('posts-container');
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('error-message');
const submitButton = document.getElementById('submit-btn');

function formatDate(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}

function showError(message) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    setTimeout(() => {
        errorElement.style.display = 'none';
    }, 5000);
}

function getCachedPosts() {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    const { posts, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_DURATION) {
        localStorage.removeItem(CACHE_KEY);
        return null;
    }
    return posts;
}

function setCachedPosts(posts) {
    localStorage.setItem(CACHE_KEY, JSON.stringify({
        posts,
        timestamp: Date.now()
    }));
}

async function fetchWithRetry(url, options = {}, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`Error de red: ${response.status}`);
            return response;
        } catch (error) {
            if (i === retries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

async function loadPosts() {
    loadingElement.style.display = 'block';
    postsContainer.innerHTML = '';

    const cachedPosts = getCachedPosts();
    if (cachedPosts) {
        renderPosts(cachedPosts);
        loadingElement.style.display = 'none';
        return;
    }

    try {
        const response = await fetchWithRetry(API_URL);
        const posts = await response.json();
        posts.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
        setCachedPosts(posts);
        renderPosts(posts);
        loadingElement.style.display = 'none';
    } catch (error) {
        loadingElement.style.display = 'none';
        showError(`Error al cargar los mensajes: ${error.message}`);
        console.error('Error al cargar posts:', error);
    }
}

function renderPosts(posts) {
    if (posts.length === 0) {
        postsContainer.innerHTML = '<p class="no-posts">No hay mensajes para mostrar.</p>';
        return;
    }

    const fragment = document.createDocumentFragment();
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <div class="post-header">
                <span class="post-author">${sanitizeHTML(post.name)}</span>
                <span class="post-date">${post.date ? formatDate(post.date) : 'Fecha no disponible'}</span>
            </div>
            <div class="post-content">
                ${sanitizeHTML(post.message)}
            </div>
        `;
        fragment.appendChild(postElement);
    });
    postsContainer.appendChild(fragment);
}

function sanitizeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

async function createPost(name, message) {
    submitButton.disabled = true;
    submitButton.textContent = 'Publicando...';

    try {
        const response = await fetchWithRetry(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name.trim(),
                message: message.trim(),
                date: new Date().toISOString()
            })
        });

        localStorage.removeItem(CACHE_KEY);
        await loadPosts();
    } catch (error) {
        showError(`Error al publicar el mensaje: ${error.message}`);
        console.error('Error al crear post:', error);
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Publicar';
    }
}

postForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !message) {
        showError('Por favor, completa todos los campos');
        return;
    }

    if (name.length > 50 || message.length > 500) {
        showError('El nombre o mensaje excede el límite de caracteres');
        return;
    }

    createPost(name, message);
    nameInput.value = '';
    messageInput.value = '';
});

document.addEventListener('DOMContentLoaded', loadPosts);