class Timer {
    constructor() {
        this.hoursInput = document.getElementById('hours');
        this.minutesInput = document.getElementById('minutes');
        this.secondsInput = document.getElementById('seconds');
        this.startBtn = document.querySelector('.timer-start');
        this.pauseBtn = document.querySelector('.timer-pause');
        this.resetBtn = document.querySelector('.timer-reset');
        
        this.interval = null;
        this.isRunning = false;
        this.isPaused = false;
        
        this.init();
    }
    
    init() {
        this.startBtn.addEventListener('click', () => this.startTimer());
        this.pauseBtn.addEventListener('click', () => this.pauseTimer());
        this.resetBtn.addEventListener('click', () => this.resetTimer());
        
        [this.hoursInput, this.minutesInput, this.secondsInput].forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.startTimer();
                }
            });
            
            input.addEventListener('input', (e) => {
                this.validateInput(e.target);
            });
        });
        
        this.updateButtonStates();
    }
    
    validateInput(input) {
        let value = parseInt(input.value);
        const max = parseInt(input.max);
        const min = parseInt(input.min);
        
        if (isNaN(value) || value < min) {
            input.value = min;
        } else if (value > max) {
            input.value = max;
        }
        
    }
    
    startTimer() {
        if (this.isRunning) {
            return;
        }

        if (!this.isPaused) {
            const totalSeconds = this.getTotalSeconds();
            if (totalSeconds === 0) {
                alert('시간을 설정해주세요!');
                return;
            }
        }
        
        this.isRunning = true;
        this.isPaused = false;
        
        this.setInputsDisabled(true);
        
        this.updateButtonStates();
        
        this.interval = setInterval(() => {
            this.tick();
        }, 1000);
    }
    
    pauseTimer() {
        if (!this.isRunning) {
            return;
        }
        
        this.isRunning = false;
        this.isPaused = true;
        
        clearInterval(this.interval);
        this.interval = null;
        
        this.updateButtonStates();
    }
    
    resetTimer() {
        this.isRunning = false;
        this.isPaused = false;
        
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        
        this.hoursInput.value = '00';
        this.minutesInput.value = '00';
        this.secondsInput.value = '00';
        this.setInputsDisabled(false);
        
        this.updateButtonStates();
        
        console.log('타이머가 리셋되었습니다.');
    }
    
    tick() {
        let hours = parseInt(this.hoursInput.value) || 0;
        let minutes = parseInt(this.minutesInput.value) || 0;
        let seconds = parseInt(this.secondsInput.value) || 0;

        if (seconds > 0) {
            seconds--;
        } else if (minutes > 0) {
            minutes--;
            seconds = 59;
        } else if (hours > 0) {
            hours--;
            minutes = 59;
            seconds = 59;
        } else {
            this.timerFinished();
            return;
        }
        
        this.hoursInput.value = hours.toString().padStart(2, '0');
        this.minutesInput.value = minutes.toString().padStart(2, '0');
        this.secondsInput.value = seconds.toString().padStart(2, '0');
    }
    
    timerFinished() {
        console.log('시간 종료!');
        
        this.isRunning = false;
        this.isPaused = false;
        
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        
        alert('시간 종료!');
        
        setTimeout(() => {
            this.resetTimer();
        }, 1000);
    }
    
    getTotalSeconds() {
        const hours = parseInt(this.hoursInput.value) || 0;
        const minutes = parseInt(this.minutesInput.value) || 0;
        const seconds = parseInt(this.secondsInput.value) || 0;
        
        return hours * 3600 + minutes * 60 + seconds;
    }
    
    setInputsDisabled(disabled) {
        this.hoursInput.disabled = disabled;
        this.minutesInput.disabled = disabled;
        this.secondsInput.disabled = disabled;
    }
    
    updateButtonStates() {
        if (this.isRunning) {
            this.startBtn.disabled = true;
            this.pauseBtn.disabled = false;
            this.resetBtn.disabled = false;ㄴ
        } else if (this.isPaused) {
            this.startBtn.disabled = false;
            this.pauseBtn.disabled = true;
            this.resetBtn.disabled = false;
        } else {
            this.startBtn.disabled = false;
            this.pauseBtn.disabled = true;
            this.resetBtn.disabled = false;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const timer = new Timer();
});
ㅇㄴ