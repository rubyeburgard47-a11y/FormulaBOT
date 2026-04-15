const TelegramBot = require('node-telegram-bot-api');
const http = require('http');

// 1. Render Server ko jagane ke liye Dummy Web Server (Is se Error 503 nahi aayega)
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('FormulaBOT is perfectly running 24/7!\n');
});
server.listen(process.env.PORT || 3000, () => {
    console.log("Anti-sleep server is running...");
});

// 2. Bot Setup (GitHub par token chupane ke liye process.env use kiya hai)
const token = process.env.TOKEN;
const bot = new TelegramBot(token, {polling: true});

// 3. PCM Formulas ka data (Jo tumhare buttons ke liye tha)
const formulas = {
    physics: "⚡ Electrostatics:\nF = (1/4π\u03B5₀) * (q₁q₂/r²)",
    maths: "📐 Quadratic Formula:\nx = [-b ± √(b² - 4ac)] / 2a",
    chemistry: "🧪 Ideal Gas Equation:\nPV = nRT"
};

// 4. Start Command (Buttons ke sath)
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const options = {
        reply_markup: {
            inline_keyboard: [
                [{ text: '📘 Physics Formula', callback_data: 'physics' }],
                [{ text: '📐 Maths Formula', callback_data: 'maths' }],
                [{ text: '🧪 Chemistry Formula', callback_data: 'chemistry' }]
            ]
        }
    };
    bot.sendMessage(chatId, "Bhai ka FormulaBOT chal gaya! 🚀\nNiche button dabao ya seedha type karo:\n/matrices - Class 12 Matrices\n/calculus - Class 12 Calculus", options);
});

// 5. Button Click System (Callback Query)
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const subject = query.data;
    bot.sendMessage(chatId, `Yeh lo tumhara formula:\n\n${formulas[subject]}`);
});

// 6. Class 12 Matrices Command
bot.onText(/\/matrices/, (msg) => {
    const chatId = msg.chat.id;
    const matricesFormulas =`
*Class 12 - Matrices & Determinants:*
1. Transpose: (A')' = A
2. Symmetric Matrix: A' = A
3. Skew-Symmetric: A' = -A
4. Adjoint Property: A(adj A) = (adj A)A = |A|I
5. Inverse of Matrix: A⁻¹ = 1/|A| * (adj A)
6. Area of Triangle = 1/2 * |x1(y2-y3) + x2(y3-y1) + x3(y1-y2)|
    `;
    bot.sendMessage(chatId, matricesFormulas, {parse_mode: "Markdown"});
});

// 7. Class 12 Calculus Command
bot.onText(/\/calculus/, (msg) => {
    const chatId = msg.chat.id;
    const calculusFormulas = `
*Class 12 - Differentiation Basics:*
1. d/dx (x^n) = n * x^(n-1)
2. d/dx (sin x) = cos x
3. d/dx (cos x) = -sin x
4. d/dx (e^x) = e^x
5. d/dx (log x) = 1/x
6. Product Rule: d/dx(uv) = u(dv/dx) + v(du/dx)
    `;
    bot.sendMessage(chatId, calculusFormulas, {parse_mode: "Markdown"});
});
