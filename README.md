Backend voor Varia chat app.

Om de app te gebruiken moet je zorgen dat Express, Node JS, Langchain/OpenAI geïnstalleerd zijn.
Ook moet je zorgen dat je de Node modules en een ENV file hebt waarin je API key zit voor OpenAI.

Om de front end met de backend te linken hoeft niet veel gedaan te worden (wanneer het lokaal is). De Fetch in de Front end gaat naar de localhost op poort 8000.

Om beide apps te runnen moet je 'npm run dev' doen in de back end, en 'npm run start' in de front end.

Mogelijke issues zijn verkeerde JSON uit de OpenAI API, hierdoor blijft de pagina laden ipv een resultaat geven.
