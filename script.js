// Dashboard Application
class Dashboard {
    constructor() {
        this.currentDate = new Date();
        this.currentMonth = this.currentDate.getMonth();
        this.currentYear = this.currentDate.getFullYear();
        this.nationalHolidays = this.getNationalHolidays();
        
        this.init();
    }

    init() {
        this.loadTheme();
        this.setupEventListeners();
        this.updateDateTime();
        this.renderCalendar();
        this.updateGreeting();
        
        // Update time every second
        setInterval(() => this.updateDateTime(), 1000);
        
        // Update greeting every minute
        setInterval(() => this.updateGreeting(), 60000);
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.setAttribute('data-theme', savedTheme);
        document.getElementById('darkModeToggle').checked = savedTheme === 'dark';
    }

    setupEventListeners() {
        // Dark mode toggle
        document.getElementById('darkModeToggle').addEventListener('change', (e) => {
            const theme = e.target.checked ? 'dark' : 'light';
            document.body.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        });

        // Sidebar toggle
        document.getElementById('toggleSidebar').addEventListener('click', () => {
            const sidebar = document.getElementById('sidebar');
            const container = document.querySelector('.container');
            sidebar.classList.toggle('collapsed');
            container.classList.toggle('sidebar-collapsed');
        });

        // Calendar navigation
        document.getElementById('prevMonth').addEventListener('click', () => {
            this.navigateMonth(-1);
        });

        document.getElementById('nextMonth').addEventListener('click', () => {
            this.navigateMonth(1);
        });

        // Mobile menu (for responsive design)
        this.setupMobileMenu();
    }

    setupMobileMenu() {
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.addEventListener('click', () => {
            document.getElementById('sidebar').classList.toggle('mobile-open');
        });
        document.body.appendChild(mobileMenuBtn);
    }

    updateDateTime() {
        const now = new Date();
        
        // Update current date display
        const dateOptions = { 
            weekday: 'short', 
            day: 'numeric', 
            month: 'short' 
        };
        document.getElementById('currentDate').textContent = 
            now.toLocaleDateString('id-ID', dateOptions);
        
        // Update welcome section datetime
        const datetimeOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        document.getElementById('currentDateTime').textContent = 
            now.toLocaleDateString('id-ID', datetimeOptions);
    }

    updateGreeting() {
        const now = new Date();
        const hour = now.getHours();
        const day = now.getDate();
        const month = now.getMonth() + 1;
        
        let greeting = "Selamat beraktivitas! Semoga hari Anda menyenangkan.";
        
        // Time-based greeting
        if (hour < 12) {
            greeting = "Selamat pagi! Semangat untuk hari ini! 🌅";
        } else if (hour < 15) {
            greeting = "Selamat siang! Semoga aktivitas berjalan lancar! ☀️";
        } else if (hour < 18) {
            greeting = "Selamat sore! Semoga hari Anda produktif! 🌇";
        } else {
            greeting = "Selamat malam! Istirahat yang cukup! 🌙";
        }
        
        // Check for national holidays
        const holidayKey = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}`;
        if (this.nationalHolidays[this.currentYear] && 
            this.nationalHolidays[this.currentYear][holidayKey]) {
            const holiday = this.nationalHolidays[this.currentYear][holidayKey];
            greeting = `🎉 ${holiday} 🎉`;
        }
        
        document.getElementById('greetingMessage').textContent = greeting;
    }

    getNationalHolidays() {
        return {
            "2024": {
                "01-01": "Tahun Baru 2024 Masehi",
                "08-02": "Tahun Baru Imlek 2575",
                "11-03": "Hari Raya Nyepi 1946 Saka",
                "29-03": "Wafat Isa Al-Masih",
                "10-04": "Hari Raya Idul Fitri 1445 H",
                "11-04": "Hari Raya Idul Fitri 1445 H",
                "01-05": "Hari Buruh Internasional",
                "09-05": "Kenaikan Isa Al-Masih",
                "23-05": "Hari Raya Waisak 2568 BE",
                "01-06": "Hari Lahir Pancasila",
                "17-06": "Hari Raya Idul Adha 1445 H",
                "07-07": "Tahun Baru Islam 1446 H",
                "17-08": "Hari Kemerdekaan RI",
                "16-09": "Maulid Nabi Muhammad SAW",
                "25-12": "Hari Natal"
            },
            "2025": {
                "01-01": "Tahun Baru 2025 Masehi",
                "29-01": "Tahun Baru Imlek 2576",
                "03-03": "Hari Raya Nyepi 1947 Saka",
                "31-03": "Maulid Nabi Muhammad SAW",
                "18-04": "Wafat Isa Al-Masih",
                "30-04": "Hari Raya Idul Fitri 1446 H",
                "01-05": "Hari Raya Idul Fitri 1446 H",
                "01-05": "Hari Buruh Internasional",
                "29-05": "Kenaikan Isa Al-Masih",
                "30-06": "Hari Raya Waisak 2569 BE",
                "01-06": "Hari Lahir Pancasila",
                "07-09": "Hari Raya Idul Adha 1446 H",
                "27-09": "Tahun Baru Islam 1447 H",
                "17-08": "Hari Kemerdekaan RI",
                "25-12": "Hari Natal"
            }
        };
    }

    navigateMonth(direction) {
        this.currentMonth += direction;
        
        if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        } else if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        }
        
        this.renderCalendar();
    }

    renderCalendar() {
        const calendarElement = document.getElementById('calendar');
        const monthYearElement = document.getElementById('currentMonth');
        
        // Update month year display
        const monthNames = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];
        monthYearElement.textContent = `${monthNames[this.currentMonth]} ${this.currentYear}`;
        
        // Get first day of month and days in month
        const firstDay = new Date(this.currentYear, this.currentMonth, 1);
        const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();
        
        // Create calendar grid
        let calendarHTML = '';
        
        // Day headers
        const dayNames = ['M', 'S', 'S', 'R', 'K', 'J', 'S'];
        dayNames.forEach(day => {
            calendarHTML += `<div class="calendar-day">${day}</div>`;
        });
        
        // Empty cells for days before first day of month
        for (let i = 0; i < startingDay; i++) {
            calendarHTML += `<div class="calendar-date other-month"></div>`;
        }
        
        // Days of the month
        const today = new Date();
        const isCurrentMonth = today.getMonth() === this.currentMonth && today.getFullYear() === this.currentYear;
        
        for (let day = 1; day <= daysInMonth; day++) {
            const dateKey = `${day.toString().padStart(2, '0')}-${(this.currentMonth + 1).toString().padStart(2, '0')}`;
            const isToday = isCurrentMonth && day === today.getDate();
            const isHoliday = this.nationalHolidays[this.currentYear] && 
                             this.nationalHolidays[this.currentYear][dateKey];
            
            let dateClass = 'calendar-date';
            if (isToday) dateClass += ' today';
            if (isHoliday) dateClass += ' event';
            
            calendarHTML += `<div class="${dateClass}" data-day="${day}">${day}</div>`;
        }
        
        calendarElement.innerHTML = calendarHTML;
        
        // Add click events to dates
        calendarElement.querySelectorAll('.calendar-date:not(.other-month)').forEach(dateElement => {
            dateElement.addEventListener('click', () => {
                const day = dateElement.dataset.day;
                this.showDateEvents(day);
            });
        });
    }

    showDateEvents(day) {
        const dateKey = `${day.toString().padStart(2, '0')}-${(this.currentMonth + 1).toString().padStart(2, '0')}`;
        const holiday = this.nationalHolidays[this.currentYear] && 
                       this.nationalHolidays[this.currentYear][dateKey];
        
        if (holiday) {
            alert(`📅 ${day} ${this.getMonthName(this.currentMonth)} ${this.currentYear}\n\n${holiday}`);
        } else {
            alert(`📅 ${day} ${this.getMonthName(this.currentMonth)} ${this.currentYear}\n\nTidak ada kegiatan khusus.`);
        }
    }

    getMonthName(month) {
        const monthNames = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];
        return monthNames[month];
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Dashboard();
    
    // Add loading animation
    document.body.classList.add('loading');
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 1000);
});

// Utility function for number formatting
function formatNumber(num) {
    return new Intl.NumberFormat('id-ID').format(num);
}