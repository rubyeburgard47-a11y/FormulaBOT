const TelegramBot = require('node-telegram-bot-api');
const http = require('http');

// 1. Anti-Sleep Server
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('FormulaBOT Master Version is Running 24/7!\n');
});
server.listen(process.env.PORT || 3000, () => {
    console.log("Anti-sleep server is running...");
});

// 2. Bot Setup
const token = process.env.TOKEN;
const bot = new TelegramBot(token, {polling: true});

// 3. All Subjects Data Dictionary
const studyData = {
    // 📐 MATHS CHAPTERS
    math_ch3: "*Ch 3: Matrices*\n1. Transpose: (A')' = A\n2. Symmetric: A' = A\n3. Skew-Symmetric: A' = -A",
    math_ch7: "*Ch 7: Integrals*\n1. ∫xⁿ dx = xⁿ⁺¹/(n+1) + C\n2. ∫(1/x) dx = log|x| + C",
    
    // ⚡ PHYSICS CHAPTERS
    phy_rayoptics: "*Ray Optics:*\n1. Mirror Formula: 1/f = 1/v + 1/u\n2. Lens Maker: 1/f = (μ-1)(1/R1 - 1/R2)\n3. Snell's Law: sin(i)/sin(r) = constant",
    phy_thermal: "*Thermal Expansion:*\n1. Linear: ΔL = LαΔT\n2. Areal: ΔA = AβΔT\n3. Volume: ΔV = VγΔT",

    // 🧪 CHEMISTRY CHAPTERS
    chem_equi: "*Chemical Equilibrium:*\n1. Kp = Kc(RT)^Δn\n2. pH = -log[H+]\n3. Le Chatelier's Principle: System shifts to minimize stress.",
    chem_kinetics: "*Chemical Kinetics:*\n1. Zero Order: [A] = [A]₀ - kt\n2. First Order: k = (2.303/t) log([A]₀/[A])",

    // 📚 ENGLISH CHAPTERS (Summaries/Themes)
    eng_lastlesson: "*The Last Lesson (Flamingo):*\nTheme: Linguistic chauvinism and the pain of losing one's language and freedom. \nKey Characters: M. Hamel (strict but dedicated teacher), Franz (student who realizes the value of French too late).",
    eng_thirdlevel: "*The Third Level (Vistas):*\nTheme: Escapism from the harsh realities of the modern world.\nKey Characters: Charley (protagonist), Louisa (wife), Sam (psychiatrist friend)."
};

// 4. Main Menu Command (4 Subject Buttons)
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const options = {
        reply_markup: {
            inline_keyboard: [
                [{ text: '📐 Maths', callback_data: 'menu_maths' }, { text: '⚡ Physics', callback_data: 'menu_physics' }],
                [{ text: '🧪 Chemistry', callback_data: 'menu_chem' }, { text: '📚 English', callback_data: 'menu_eng' }]
            ]
        }
    };
    bot.sendMessage(chatId, "Welcome to the Ultimate Class 12 Study Bot! 🚀\nApna subject choose karo:", options);
});

// 5. Button Click System (Menus and Chapters)
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;

    // --- SUB-MENUS (Jab koi subject dabaye) ---
    if (data === 'menu_maths') {
        bot.sendMessage(chatId, "📐 *Maths Chapters:*", {
            parse_mode: "Markdown",
            reply_markup: { inline_keyboard: [ 
                [{ text: 'Matrices', callback_data: 'math_ch3' }, { text: 'Integrals', callback_data: 'math_ch7' }] 
            ] }
        });
    } 
    else if (data === 'menu_physics') {
        bot.sendMessage(chatId, "⚡ *Physics Chapters:*", {
            parse_mode: "Markdown",
            reply_markup: { inline_keyboard: [ 
                [{ text: 'Ray Optics', callback_data: 'phy_rayoptics' }, { text: 'Thermal Expansion', callback_data: 'phy_thermal' }] 
            ] }
        });
    }
    else if (data === 'menu_chem') {
        bot.sendMessage(chatId, "🧪 *Chemistry Chapters:*", {
            parse_mode: "Markdown",
            reply_markup: { inline_keyboard: [ 
                [{ text: 'Chemical Equilibrium', callback_data: 'chem_equi' }, { text: 'Chemical Kinetics', callback_data: 'chem_kinetics' }] 
            ] }
        });
    }
    else if (data === 'menu_eng') {
        bot.sendMessage(chatId, "📚 *English Chapters:*", {
            parse_mode: "Markdown",
reply_markup: { inline_keyboard: [ 
                [{ text: 'The Last Lesson', callback_data: 'eng_lastlesson' }, { text: 'The Third Level', callback_data: 'eng_thirdlevel' }] 
            ] }
        });
    }
    // --- FINAL CONTENT (Jab koi chapter dabaye) ---
    else if (studyData[data]) {
        bot.sendMessage(chatId, studyData[data], {parse_mode: "Markdown"});
    }
});
