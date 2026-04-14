require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

// Cloud Server Setup
const app = express();
app.get('/', (req, res) => res.send('Bot is running securely!'));
app.listen(process.env.PORT || 3000, () => console.log('Web server is ready'));

// Bot Setup
const token = process.env.TOKEN;
const bot = new TelegramBot(token, {polling: true});

// PCM Formulas
const formulas = {
    physics: "⚡ Electrostatics:\nF = (1/4πε₀) * (q₁q₂/r²)",
    maths: "📐 Quadratic Formula:\nx = [-b ± √(b² - 4ac)] / 2a",
    chemistry: "🧪 Ideal Gas Equation:\nPV = nRT"
};

// Start Command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const options = {
        reply_markup: {
            inline_keyboard: [
                [{ text: '📘 Physics Formula', callback_data: 'physics' }],
                [{ text: '📗 Maths Formula', callback_data: 'maths' }],
                [{ text: '📙 Chemistry Formula', callback_data: 'chemistry' }]
            ]
        }
    };
    bot.sendMessage(chatId, "Bhai, kaunse subject ka formula revise karna hai? Niche click karo:", options);
});

// Button Click Handling
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const subject = query.data; 
    bot.sendMessage(chatId, `Yeh lo tumhara formula:\n\n${formulas[subject]}`);
});
