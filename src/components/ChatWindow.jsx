import axios from "axios";
import { SendHorizonal } from "lucide-react";
import React, { useState } from "react";

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const route = input.toLowerCase();
      const { data } = await axios.get(`http://localhost:3000/chat/${route}`);

      const formatted = formatBotResponse(route, data);
      const botMessage = { sender: "bot", text: formatted };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const botMessage = { sender: "bot", text: "❌ Rota não encontrada ou erro no servidor." };
      setMessages((prev) => [...prev, botMessage]);
    }

    setInput("");
  };

  const formatBotResponse = (route, data) => {
    switch (route) {
      case "jogo":
        return `🎮 Próximo jogo: ${data.adversario} - ${data.data} às ${data.hora}\nCampeonato: ${data.campeonato}\nAssista: ${data.ondeAssistir}`;
      case "ultimos":
        return data.map(jogo => `🆚 ${jogo.adversario}: ${jogo.resultado} (${jogo.placar})`).join("\n");
      case "jogadores":
        return data.map(j => `👤 ${j.nome} - ${j.funcao}\n💬 ${j.curiosidade}`).join("\n\n");
      case "clip":
        return `🎥 ${data.titulo}: ${data.url}`;
      case "frase":
        return `🗣️ "${data.frase}"`;
      case "ranking":
        return `📊 Ranking: ${data.posicao}º lugar\n${data.campeonato} (${data.atualizadoEm})`;
      case "loja":
        return `🛒 ${data.mensagem}\n${data.url}`;
      case "quiz":
        return `❓ ${data.pergunta}\nOpções: ${data.alternativas.join(", ")}`;
      default:
        return "🤖 Não entendi. Tente: jogo, ultimos, jogadores, clip, frase, ranking, loja ou quiz.";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-950">
      <div className="w-full max-w-lg bg-zinc-900 rounded-2xl shadow-xl p-6 flex flex-col gap-4 mx-auto">
        <h1 className="text-2xl font-bold text-furia text-center mb-4">🔥 FURIA Chat</h1>

        <div className="flex flex-col gap-2 overflow-y-auto max-h-96 p-2 bg-zinc-800 rounded-xl">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-xl text-sm whitespace-pre-line ${msg.sender === "user" ? "bg-furia text-white self-end" : "bg-zinc-700 text-white self-start"}`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite: jogo, ultimos, jogadores..."
            className="flex-1 px-4 py-2 rounded-lg bg-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-furia"
          />
          <button
            onClick={handleSend}
            className="bg-furia hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all"
          >
            <SendHorizonal size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
