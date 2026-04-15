const TelegramBot = require('node-telegram-bot-api');
const http = require('http');

// 1. Anti-Sleep Server (Error 503 se bachane ke liye)
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('FormulaBOT is Perfectly Running 24/7!\n');
});
server.listen(process.env.PORT || 3000, () => {
    console.log("Anti-sleep server is running...");
});

// 2. Bot Setup
const token = process.env.TOKEN;
const bot = new TelegramBot(token, {polling: true});

// 3. Class 12 Maths - All 13 Chapters Formula Dictionary
const mathFormulas = {
    ch1: "*Ch 1: Relations & Functions*\n1. Reflexive: (a,a) ∈ R\n2. Symmetric: (a,b) ∈ R ⇒ (b,a) ∈ R\n3. Transitive: (a,b) & (b,c) ∈ R ⇒ (a,c) ∈ R\n4. Equivalence: Reflexive + Symmetric + Transitive",
    
    ch2: "*Ch 2: Inverse Trigonometric Functions*\n1. sin⁻¹x + cos⁻¹x = π/2\n2. tan⁻¹x + cot⁻¹x = π/2\n3. sec⁻¹x + cosec⁻¹x = π/2\n4. tan⁻¹x + tan⁻¹y = tan⁻¹[(x+y)/(1-xy)]",
    
    ch3: "*Ch 3: Matrices*\n1. Transpose: (A')' = A\n2. Symmetric: A' = A\n3. Skew-Symmetric: A' = -A\n4. Matrix addition is commutative & associative.",
    
    ch4: "*Ch 4: Determinants*\n1. |AB| = |A||B|\n2. Area of Triangle = 1/2 * |x1(y2-y3) + x2(y3-y1) + x3(y1-y2)|\n3. A(adj A) = |A|I\n4. A⁻¹ = (1/|A|) * (adj A)",
    
    ch5: "*Ch 5: Continuity & Differentiability*\n1. Product Rule: d/dx(uv) = u.v' + v.u'\n2. Quotient Rule: d/dx(u/v) = (v.u' - u.v')/v²\n3. d/dx(sin x) = cos x, d/dx(cos x) = -sin x\n4. d/dx(e^x) = e^x, d/dx(log x) = 1/x",
    
    ch6: "*Ch 6: Application of Derivatives*\n1. Increasing: f'(x) > 0\n2. Decreasing: f'(x) < 0\n3. Local Maxima: f'(c) = 0 and f''(c) < 0\n4. Local Minima: f'(c) = 0 and f''(c) > 0",
    
    ch7: "*Ch 7: Integrals*\n1. ∫xⁿ dx = xⁿ⁺¹/(n+1) + C\n2. ∫(1/x) dx = log|x| + C\n3. ∫eˣ dx = eˣ + C\n4. ∫u.v dx = u∫v dx - ∫(u'∫v dx)dx (BY PARTS)",
    
    ch8: "*Ch 8: Application of Integrals*\n1. Area under curve (x-axis): A = ∫y dx (from a to b)\n2. Area under curve (y-axis): A = ∫x dy (from c to d)",
    
    ch9: "*Ch 9: Differential Equations*\n1. Linear D.E: dy/dx + Py = Q\n2. Integrating Factor (I.F) = e^(∫P dx)\n3. Solution: y * (I.F) = ∫(Q * I.F) dx + C",
    
    ch10: "*Ch 10: Vector Algebra*\n1. Dot Product: a.b = |ab|cosθ\n2. Cross Product: a×b = |ab|sinθ n̂\n3. Unit Vector: â = a/|a|\n4. Projection of a on b = (a.b)/|b|",
    
    ch11: "*Ch 11: 3D Geometry*\n1. Direction Cosines: l² + m² + n² = 1\n2. Eq of line: (r - a) = λb\n3. Cartesian Eq: (x-x₁)/a = (y-y₁)/b = (z-z₁)/c\n4. Distance between parallel lines = |(b × (a₂-a₁))| / |b|",
    
    ch12: "*Ch 12: Linear Programming*\n1. Objective Function: Z = ax + by (To be maximized/minimized)\n2. Constraints: Linear inequalities like x+y ≤ c\n3. Feasible Region: Common region determined by all constraints.",
    
    ch13: "*Ch 13: Probability*\n1. Conditional: P(A|B) = P(A∩B)/P(B)\n2. Independent Events: P(A∩B) = P(A)*P(B)\n3. Bayes' Theorem: P(Eᵢ|A) = [P(Eᵢ)P(A|Eᵢ)] / [Σ P(Eⱼ)P(A|Eⱼ)]"
};

// 4. Start Command (With 13 Buttons aligned neatly)
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const options = {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Ch 1: Relations', callback_data: 'ch1' }, { text: 'Ch 2: Inv Trig', callback_data: 'ch2' }],
                [{ text: 'Ch 3: Matrices', callback_data: 'ch3' }, { text: 'Ch 4: Determinants', callback_data: 'ch4' }],
                [{ text: 'Ch 5: Differentiation', callback_data: 'ch5' }, { text: 'Ch 6: AOD', callback_data: 'ch6' }],
                [{ text: 'Ch 7: Integrals', callback_data: 'ch7' }, { text: 'Ch 8: AOI', callback_data: 'ch8' }],
                [{ text: 'Ch 9: Diff. Equations', callback_data: 'ch9' }, { text: 'Ch 10: Vectors', callback_data: 'ch10' }],
[{ text: 'Ch 11: 3D Geometry', callback_data: 'ch11' }, { text: 'Ch 12: LPP', callback_data: 'ch12' }],
                [{ text: 'Ch 13: Probability', callback_data: 'ch13' }]
            ]
        }
    };
    bot.sendMessage(chatId, "Bhai ka 12th Maths FormulaBOT chal gaya! 🚀\nNCERT ke saare chapters yahan hain, kisi par bhi click karo:", options);
});

// 5. Button Click System (Callback Query - Smart Logic)
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const chapterId = query.data; // Yeh 'ch1', 'ch2' wagarah pakad lega
    
    // Dictionary se sahi formula nikal kar bhej dega
    bot.sendMessage(chatId, mathFormulas[chapterId], {parse_mode: "Markdown"});
});
