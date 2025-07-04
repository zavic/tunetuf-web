const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileSidebar = document.getElementById('mobile-sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const closeSidebar = document.getElementById('close-sidebar');

const sidebarNav = document.querySelector('#mobile-sidebar nav');

// Fungsi untuk membuka sidebar
function openSidebar() {
    mobileSidebar.classList.remove('translate-x-full');
    mobileSidebar.classList.add('translate-x-0');
    sidebarOverlay.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
}

// Fungsi untuk menutup sidebar
function closeSidebarFunc() {
    mobileSidebar.classList.remove('translate-x-0');
    mobileSidebar.classList.add('translate-x-full');
    sidebarOverlay.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
}

// Event listeners
mobileMenuButton.addEventListener('click', openSidebar);
closeSidebar.addEventListener('click', closeSidebarFunc);
sidebarOverlay.addEventListener('click', closeSidebarFunc);

// Menutup sidebar ketika menekan tombol Escape
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeSidebarFunc();
    }
});

// Menutup sidebar ketika ukuran layar berubah ke desktop
window.addEventListener('resize', function () {
    if (window.innerWidth >= 768) {
        closeSidebarFunc();
    }
});


// Menutup sidebar ketika link di sidebar diklik
sidebarNav.addEventListener('click', function () {
    closeSidebarFunc();
});
