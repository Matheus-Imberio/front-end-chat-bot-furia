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
      const route = input.toLowerCase().replace(/\s+/g, "");
      const { data } = await axios.get(`http://localhost:3000/chat/${route}`);

      const formatted = formatBotResponse(route, data);
      const botMessage = { sender: "bot", text: formatted };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const botMessage = {
        sender: "bot",
        text: "❌ Rota não encontrada ou erro no servidor."
      };
      setMessages((prev) => [...prev, botMessage]);
    }

    setInput("");
  };

  const formatBotResponse = (route, data) => {
    switch (route) {
      case "menu":
        return `📋 Menu de Comandos:\n\n` +
          `jogo - Info do próximo jogo\n` +
          `ultimos - Últimos resultados\n` +
          `jogadores - Conheça os players\n` +
          `clip - Ver um clipe top\n` +
          `frase - Frase motivacional\n` +
          `ranking - Ranking atual\n` +
          `loja - Loja da FURIA\n` +
          `quiz - Responda um quiz\n`;
      case "jogo":
        return `🎮 Próximo jogo: ${data.adversario} - ${data.data} às ${data.hora}\nCampeonato: ${data.campeonato}\nAssista: ${data.ondeAssistir}`;
      case "ultimos":
        return data.map(jogo => `🆚 ${jogo.adversario}: ${jogo.resultado} (${jogo.placar})`).join("\n");
      case "jogadores":
        return data.map(j => `👤 ${j.nome} - ${j.funcao}\n💬 ${j.curiosidade}`).join("\n\n");
      case "clip":
        return `🎥 ${data.titulo}: ${data.url}`;
      case "frase":
        return `🗣️ \"${data.frase}\"`;
      case "ranking":
        return `📊 Ranking: ${data.posicao}º lugar\n${data.campeonato} (${data.atualizadoEm})`;
      case "loja":
        return `🛒 ${data.mensagem}\n${data.url}`;
      case "quiz":
        return `❓ ${data.pergunta}\nOpções: ${data.alternativas.join(", ")}\n\nDigite: /quiz/[resposta]`;
      case "art":
      case "fallen":
      case "kscerato":
      case "yuurih":
        return data.mensagem;
      default:
        return "🤖 Não entendi. Tente digitar: /menu";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center px-4"
      style={{ backgroundImage: "url('https://cdn.furia.gg/furia-bg.jpg')" }}
    >
      <div className="w-full max-w-2xl bg-zinc-900 bg-opacity-90 rounded-2xl shadow-2xl p-6 flex flex-col gap-4 border border-furia">
        <h1 className="text-3xl font-bold text-black text-center mb-4 animate-pulse">
          🔥 FURIA Chat
        </h1>
  
        <div className="flex flex-col gap-2 overflow-y-auto max-h-[400px] p-3 bg-zinc-800 bg-opacity-80 rounded-xl custom-scrollbar">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-xl text-sm whitespace-pre-line shadow-md max-w-[80%] ${
                msg.sender === "user"
                  ? "bg-furia text-white self-end animate-slide-left"
                  : "bg-zinc-700 text-white self-start animate-slide-right"
              }`}
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
            placeholder="Digite menu para começar"
            className="flex-1 px-4 py-2 rounded-lg bg-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-furia"
          />
          <button
            onClick={handleSend}
            className="bg-furia hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all shadow-md"
          >
            <SendHorizonal size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}