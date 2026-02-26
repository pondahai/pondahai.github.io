// 游戏常量
const GRID_SIZE = 15; // 网格大小
const GAME_SPEED_INITIAL = 150; // 初始游戏速度（毫秒）
const GAME_SPEED_DECREMENT = 2; // 每吃一个食物加快的速度
const GAME_SPEED_MIN = 50; // 最小游戏速度（最快）
const FOOD_SCORE = 10; // 每个食物的分数

// 赛博朋克颜色
const COLORS = {
    snakeHead: '#ff00ff', // 霓虹粉
    snakeBody: ['#00ffff', '#ff00ff', '#ffff00', '#00ff00'], // 霓虹青、粉、黄、绿
    food: '#ff0080', // 霓虹红
    gridLines: 'rgba(0, 255, 255, 0.1)', // 淡青色网格线
    background: 'rgba(0, 0, 0, 0.8)', // 深黑背景
    particles: ['#00ffff', '#ff00ff', '#ffff00', '#00ff00', '#ff0080'] // 粒子颜色
};

// 游戏状态
let canvas, ctx;
let snake, food;
let direction, nextDirection;
let gameSpeed;
let gameLoop;
let score;
let gameActive = false;
let gamePaused = false;
let particles = [];

// DOM 元素
let scoreElement, highScoreElement, finalScoreElement;
let gameOverModal;
let startBtn, pauseBtn, restartBtn;
let particlesContainer;

// 初始化游戏
function init() {
    // 获取 Canvas 和上下文
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    
    // 计算单元格大小
    cellSize = canvas.width / GRID_SIZE;
    
    // 获取 DOM 元素
    scoreElement = document.getElementById('score');
    highScoreElement = document.getElementById('highScore');
    finalScoreElement = document.getElementById('finalScore');
    gameOverModal = document.getElementById('gameOverModal');
    startBtn = document.getElementById('startBtn');
    pauseBtn = document.getElementById('pauseBtn');
    restartBtn = document.getElementById('restartBtn');
    particlesContainer = document.getElementById('particles');
    
    // 设置最高分
    const highScore = localStorage.getItem('highScore') || 0;
    highScoreElement.textContent = highScore;
    
    // 添加事件监听器
    document.addEventListener('keydown', handleKeyDown);
    startBtn.addEventListener('click', startGame);
    pauseBtn.addEventListener('click', togglePause);
    restartBtn.addEventListener('click', startGame);
    
    // 添加触摸控制
    const controlButtons = document.querySelectorAll('.control-btn');
    controlButtons.forEach(button => {
        button.addEventListener('click', () => {
            const dir = button.getAttribute('data-direction');
            handleDirectionChange(dir);
        });
    });
    
    // 绘制初始画面
    drawGrid();
    drawInstructions();
}

// 开始游戏
function startGame() {
    // 重置游戏状态
    snake = [
        {x: Math.floor(GRID_SIZE / 2), y: Math.floor(GRID_SIZE / 2)}
    ];
    generateFood();
    direction = 'right';
    nextDirection = 'right';
    gameSpeed = GAME_SPEED_INITIAL;
    score = 0;
    gameActive = true;
    gamePaused = false;
    particles = [];
    
    // 更新 UI
    scoreElement.textContent = score;
    gameOverModal.style.display = 'none';
    startBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-block';
    pauseBtn.textContent = '暂停';
    
    // 清除之前的游戏循环
    if (gameLoop) clearInterval(gameLoop);
    
    // 开始新的游戏循环
    gameLoop = setInterval(gameStep, gameSpeed);
    
    // 添加视觉效果
    addGridGlitchEffect();
}

// 游戏单步
function gameStep() {
    if (!gameActive || gamePaused) return;
    
    // 更新方向
    direction = nextDirection;
    
    // 移动蛇
    const head = {...snake[0]};
    
    // 根据方向移动头部
    switch(direction) {
        case 'up': head.y--; break;
        case 'down': head.y++; break;
        case 'left': head.x--; break;
        case 'right': head.x++; break;
    }
    
    // 检查游戏结束条件
    if (isGameOver(head)) {
        endGame();
        return;
    }
    
    // 添加新头部
    snake.unshift(head);
    
    // 检查是否吃到食物
    if (head.x === food.x && head.y === food.y) {
        // 吃到食物，不移除尾部
        eatFood();
    } else {
        // 没吃到食物，移除尾部
        snake.pop();
    }
    
    // 更新粒子
    updateParticles();
    
    // 重绘游戏
    draw();
}

// 检查游戏是否结束
function isGameOver(head) {
    // 检查是否撞墙
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        return true;
    }
    
    // 检查是否撞到自己
    for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }
    
    return false;
}

// 结束游戏
function endGame() {
    gameActive = false;
    clearInterval(gameLoop);
    
    // 检查最高分
    const highScore = localStorage.getItem('highScore') || 0;
    if (score > highScore) {
        localStorage.setItem('highScore', score);
        highScoreElement.textContent = score;
    }
    
    // 显示游戏结束模态框
    finalScoreElement.textContent = score;
    gameOverModal.style.display = 'flex';
    startBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
    
    // 添加爆炸效果
    createExplosionEffect();
}

// 生成食物
function generateFood() {
    // 随机位置
    let newFood;
    do {
        newFood = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE)
        };
    } while (isOnSnake(newFood)); // 确保食物不在蛇身上
    
    food = newFood;
    
    // 添加食物出现的粒子效果
    createFoodParticles();
}

// 检查位置是否在蛇身上
function isOnSnake(position) {
    return snake.some(segment => segment.x === position.x && segment.y === position.y);
}

// 处理吃到食物
function eatFood() {
    // 增加分数
    score += FOOD_SCORE;
    scoreElement.textContent = score;
    
    // 生成新食物
    generateFood();
    
    // 加快游戏速度
    if (gameSpeed > GAME_SPEED_MIN) {
        gameSpeed -= GAME_SPEED_DECREMENT;
        clearInterval(gameLoop);
        gameLoop = setInterval(gameStep, gameSpeed);
    }
    
    // 添加吃食物的粒子效果
    createEatEffectParticles(snake[0]);
    
    // 添加屏幕闪烁效果
    addScreenFlashEffect();
}

// 处理按键
function handleKeyDown(e) {
    if (!gameActive) return;
    
    switch(e.key) {
        case 'ArrowUp':
            handleDirectionChange('up');
            break;
        case 'ArrowDown':
            handleDirectionChange('down');
            break;
        case 'ArrowLeft':
            handleDirectionChange('left');
            break;
        case 'ArrowRight':
            handleDirectionChange('right');
            break;
        case ' ': // 空格键
            togglePause();
            break;
    }
}

// 处理方向变化
function handleDirectionChange(newDirection) {
    // 防止180度转弯
    if (
        (direction === 'up' && newDirection === 'down') ||
        (direction === 'down' && newDirection === 'up') ||
        (direction === 'left' && newDirection === 'right') ||
        (direction === 'right' && newDirection === 'left')
    ) {
        return;
    }
    
    nextDirection = newDirection;
    
    // 添加方向变化的粒子效果
    if (gameActive && !gamePaused) {
        createDirectionChangeParticles(snake[0]);
    }
}

// 切换暂停状态
function togglePause() {
    if (!gameActive) return;
    
    gamePaused = !gamePaused;
    pauseBtn.textContent = gamePaused ? '继续' : '暂停';
    
    if (gamePaused) {
        clearInterval(gameLoop);
        drawPausedText();
    } else {
        gameLoop = setInterval(gameStep, gameSpeed);
    }
}

// 绘制游戏
function draw() {
    // 清除画布
    ctx.fillStyle = COLORS.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 绘制网格
    drawGrid();
    
    // 绘制食物
    drawFood();
    
    // 绘制蛇
    drawSnake();
    
    // 绘制粒子
    drawParticles();
}

// 绘制网格
function drawGrid() {
    ctx.strokeStyle = COLORS.gridLines;
    ctx.lineWidth = 0.5;
    
    // 垂直线
    for (let x = 0; x <= GRID_SIZE; x++) {
        ctx.beginPath();
        ctx.moveTo(x * cellSize, 0);
        ctx.lineTo(x * cellSize, canvas.height);
        ctx.stroke();
    }
    
    // 水平线
    for (let y = 0; y <= GRID_SIZE; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * cellSize);
        ctx.lineTo(canvas.width, y * cellSize);
        ctx.stroke();
    }
}

// 绘制蛇
function drawSnake() {
    snake.forEach((segment, index) => {
        // 为蛇身选择颜色
        if (index === 0) {
            // 蛇头
            ctx.fillStyle = COLORS.snakeHead;
        } else {
            // 蛇身 - 使用循环颜色
            const colorIndex = (index % COLORS.snakeBody.length);
            ctx.fillStyle = COLORS.snakeBody[colorIndex];
        }
        
        // 绘制蛇的段落
        const x = segment.x * cellSize;
        const y = segment.y * cellSize;
        
        // 添加发光效果
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 15;
        
        // 绘制圆角矩形
        const padding = 1;
        const radius = cellSize / 4;
        roundRect(
            ctx, 
            x + padding, 
            y + padding, 
            cellSize - padding * 2, 
            cellSize - padding * 2, 
            radius
        );
        
        // 重置阴影
        ctx.shadowBlur = 0;
        
        // 为蛇头添加眼睛
        if (index === 0) {
            drawSnakeEyes(segment);
        }
    });
}

// 绘制蛇的眼睛
function drawSnakeEyes(head) {
    const eyeSize = cellSize / 6;
    const eyeOffset = cellSize / 4;
    const x = head.x * cellSize;
    const y = head.y * cellSize;
    
    // 设置眼睛样式
    ctx.fillStyle = '#000';
    ctx.shadowColor = '#00ffff';
    ctx.shadowBlur = 10;
    
    // 根据方向调整眼睛位置
    let leftEyeX, leftEyeY, rightEyeX, rightEyeY;
    
    switch(direction) {
        case 'up':
            leftEyeX = x + eyeOffset;
            leftEyeY = y + eyeOffset;
            rightEyeX = x + cellSize - eyeOffset - eyeSize;
            rightEyeY = y + eyeOffset;
            break;
        case 'down':
            leftEyeX = x + eyeOffset;
            leftEyeY = y + cellSize - eyeOffset - eyeSize;
            rightEyeX = x + cellSize - eyeOffset - eyeSize;
            rightEyeY = y + cellSize - eyeOffset - eyeSize;
            break;
        case 'left':
            leftEyeX = x + eyeOffset;
            leftEyeY = y + eyeOffset;
            rightEyeX = x + eyeOffset;
            rightEyeY = y + cellSize - eyeOffset - eyeSize;
            break;
        case 'right':
            leftEyeX = x + cellSize - eyeOffset - eyeSize;
            leftEyeY = y + eyeOffset;
            rightEyeX = x + cellSize - eyeOffset - eyeSize;
            rightEyeY = y + cellSize - eyeOffset - eyeSize;
            break;
    }
    
    // 绘制眼睛
    ctx.beginPath();
    ctx.arc(leftEyeX + eyeSize/2, leftEyeY + eyeSize/2, eyeSize/2, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(rightEyeX + eyeSize/2, rightEyeY + eyeSize/2, eyeSize/2, 0, Math.PI * 2);
    ctx.fill();
    
    // 重置阴影
    ctx.shadowBlur = 0;
}

// 绘制食物
function drawFood() {
    const x = food.x * cellSize;
    const y = food.y * cellSize;
    
    // 脉动效果
    const time = new Date().getTime();
    const pulseFactor = 1 + 0.2 * Math.sin(time / 200);
    const size = cellSize * 0.8 * pulseFactor;
    const offset = (cellSize - size) / 2;
    
    // 设置样式
    ctx.fillStyle = COLORS.food;
    ctx.shadowColor = COLORS.food;
    ctx.shadowBlur = 20;
    
    // 绘制食物
    ctx.beginPath();
    ctx.arc(x + cellSize/2, y + cellSize/2, size/2, 0, Math.PI * 2);
    ctx.fill();
    
    // 重置阴影
    ctx.shadowBlur = 0;
    
    // 添加内部发光
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x + cellSize/2, y + cellSize/2, size/4, 0, Math.PI * 2);
    ctx.stroke();
}

// 绘制暂停文本
function drawPausedText() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = 'bold 40px Orbitron';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // 文本阴影
    ctx.shadowColor = '#ff00ff';
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#00ffff';
    
    // 绘制文本
    ctx.fillText('已暂停', canvas.width / 2, canvas.height / 2);
    
    // 重置阴影
    ctx.shadowBlur = 0;
}

// 绘制初始指令
function drawInstructions() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = 'bold 40px Orbitron';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // 文本阴影
    ctx.shadowColor = '#ff00ff';
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#00ffff';
    
    // 绘制文本
    ctx.fillText('CYBER SNAKE', canvas.width / 2, canvas.height / 3);
    
    ctx.font = '20px Orbitron';
    ctx.fillText('点击开始按钮开始游戏', canvas.width / 2, canvas.height / 2);
    
    // 重置阴影
    ctx.shadowBlur = 0;
}

// 粒子系统
function createParticle(x, y, color, speedFactor = 1) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.backgroundColor = color;
    particle.style.boxShadow = `0 0 10px ${color}`;
    
    // 随机速度和方向
    const angle = Math.random() * Math.PI * 2;
    const speed = (Math.random() * 3 + 2) * speedFactor;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;
    
    // 随机大小
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // 随机生命周期
    const life = Math.random() * 1000 + 500;
    
    particlesContainer.appendChild(particle);
    
    particles.push({
        element: particle,
        x, y,
        vx, vy,
        life,
        createdAt: Date.now()
    });
}

// 更新粒子
function updateParticles() {
    const now = Date.now();
    const gravity = 0.05;
    
    particles = particles.filter(particle => {
        // 检查生命周期
        if (now - particle.createdAt > particle.life) {
            particlesContainer.removeChild(particle.element);
            return false;
        }
        
        // 更新位置
        particle.vy += gravity; // 添加重力
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // 更新DOM元素
        particle.element.style.left = `${particle.x}px`;
        particle.element.style.top = `${particle.y}px`;
        
        // 计算透明度
        const age = now - particle.createdAt;
        const opacity = 1 - (age / particle.life);
        particle.element.style.opacity = opacity;
        
        return true;
    });
}

// 绘制粒子
function drawParticles() {
    // 这个函数在DOM中处理粒子，不需要在Canvas中绘制
}

// 创建食物粒子效果
function createFoodParticles() {
    const x = food.x * cellSize + cellSize / 2;
    const y = food.y * cellSize + cellSize / 2;
    
    // 转换为相对于粒子容器的坐标
    const rect = canvas.getBoundingClientRect();
    const containerRect = particlesContainer.getBoundingClientRect();
    
    const relX = x + rect.left - containerRect.left;
    const relY = y + rect.top - containerRect.top;
    
    // 创建多个粒子
    for (let i = 0; i < 20; i++) {
        const colorIndex = Math.floor(Math.random() * COLORS.particles.length);
        createParticle(relX, relY, COLORS.particles[colorIndex], 0.5);
    }
}

// 创建吃食物效果粒子
function createEatEffectParticles(position) {
    const x = position.x * cellSize + cellSize / 2;
    const y = position.y * cellSize + cellSize / 2;
    
    // 转换为相对于粒子容器的坐标
    const rect = canvas.getBoundingClientRect();
    const containerRect = particlesContainer.getBoundingClientRect();
    
    const relX = x + rect.left - containerRect.left;
    const relY = y + rect.top - containerRect.top;
    
    // 创建多个粒子
    for (let i = 0; i < 30; i++) {
        const colorIndex = Math.floor(Math.random() * COLORS.particles.length);
        createParticle(relX, relY, COLORS.particles[colorIndex], 2);
    }
}

// 创建方向变化粒子
function createDirectionChangeParticles(position) {
    const x = position.x * cellSize + cellSize / 2;
    const y = position.y * cellSize + cellSize / 2;
    
    // 转换为相对于粒子容器的坐标
    const rect = canvas.getBoundingClientRect();
    const containerRect = particlesContainer.getBoundingClientRect();
    
    const relX = x + rect.left - containerRect.left;
    const relY = y + rect.top - containerRect.top;
    
    // 创建多个粒子
    for (let i = 0; i < 10; i++) {
        const colorIndex = Math.floor(Math.random() * COLORS.particles.length);
        createParticle(relX, relY, COLORS.particles[colorIndex], 1);
    }
}

// 创建爆炸效果
function createExplosionEffect() {
    // 获取蛇头位置
    if (!snake || snake.length === 0) return;
    
    const head = snake[0];
    const x = head.x * cellSize + cellSize / 2;
    const y = head.y * cellSize + cellSize / 2;
    
    // 转换为相对于粒子容器的坐标
    const rect = canvas.getBoundingClientRect();
    const containerRect = particlesContainer.getBoundingClientRect();
    
    const relX = x + rect.left - containerRect.left;
    const relY = y + rect.top - containerRect.top;
    
    // 创建大量粒子
    for (let i = 0; i < 100; i++) {
        const colorIndex = Math.floor(Math.random() * COLORS.particles.length);
        createParticle(relX, relY, COLORS.particles[colorIndex], 3);
    }
}

// 添加网格故障效果
function addGridGlitchEffect() {
    if (!gameActive) return;
    
    // 随机时间间隔触发故障效果
    const glitchInterval = Math.random() * 5000 + 3000;
    
    setTimeout(() => {
        if (gameActive) {
            // 创建故障效果
            const glitchDuration = Math.random() * 200 + 100;
            canvas.style.filter = 'hue-rotate(90deg) brightness(1.2)';
            
            setTimeout(() => {
                canvas.style.filter = 'none';
                addGridGlitchEffect(); // 递归调用以继续效果
            }, glitchDuration);
        }
    }, glitchInterval);
}

// 添加屏幕闪烁效果
function addScreenFlashEffect() {
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.backgroundColor = 'rgba(255, 0, 128, 0.2)';
    flash.style.pointerEvents = 'none';
    flash.style.zIndex = '9999';
    flash.style.transition = 'opacity 0.2s';
    
    document.body.appendChild(flash);
    
    setTimeout(() => {
        flash.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(flash);
        }, 200);
    }, 50);
}

// 辅助函数：绘制圆角矩形
function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
}

// 初始化游戏
document.addEventListener('DOMContentLoaded', init);