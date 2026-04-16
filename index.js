const TelegramBot = require('node-telegram-bot-api');
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Bot is Resting!\n');
});
server.listen(process.env.PORT || 3000);

const token = process.env.TOKEN;
const bot = new TelegramBot(token, {polling: true});

// ==========================================
// --- DATABASE (Safe rakha hai kal ke liye) ---
// ==========================================
const botData = {
    // ENGLISH
    e_f1: "*The Last Lesson:* M. Hamel's last French class due to Prussian order. Shows linguistic chauvinism. Franz realizes the value of his mother tongue.",
    // PHYSICS
    p_1: "*Ch 1-2: Electrostatics & Potential*\n• Coulomb's Law: F = (1/4πε₀)(q₁q₂/r²)\n• Gauss Law: Φ = q/ε₀",
    // CHEMISTRY
    c_1: "*Physical Chem (Sol & Elec):*\n• Raoult's Law: P = P°x\n• ΔTb = iKbm",
    // MATHS (FIXED)
    m_ch3: "*Matrices & Determinants:*\n1. Transpose: (A')' = A\n2. A(adj A) = |A|I\n3. Inverse: A⁻¹ = (adj A)/|A|",
    m_ch7: "*Integrals:*\n1. ∫xⁿ dx = xⁿ⁺¹/(n+1)\n2. ∫1/x dx = log|x|\n3. ∫eˣ dx = eˣ"
};

// ==========================================
// --- UNDER CONSTRUCTION MODE 🚧 ---
// ==========================================

// Koi kuch bhi type karega toh yeh jayega:
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Bot is under construction! 🛠️\nAbhi aaram kar raha hai bhai, baad mein aana 😂😭");
});

// Koi dheet dost purane buttons dabayega toh yeh jayega:
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    bot.sendMessage(chatId, "Arey bhai bola na, Bot is under construction! 😂😭");
});
