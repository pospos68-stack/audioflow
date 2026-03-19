export default async function handler(req, res) {

const { name } = req.body;

const response = await fetch("https://api.openai.com/v1/chat/completions", {
method: "POST",
headers: {
"Content-Type": "application/json",
"Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
},
body: JSON.stringify({
model: "gpt-4o-mini",
messages: [
{
role: "system",
content: "Zařaď audioknihu do jedné z kategorií: Román, Detektivka, Sci-fi, Fantasy, Osobní rozvoj, Historie, Thriller, Ostatní. Odpověz jen názvem kategorie."
},
{
role: "user",
content: name
}
]
})
});

const data = await response.json();
const category = data.choices[0].message.content;

res.status(200).json({ category });

}
