import "dotenv/config";
import BotWhatsapp from "@bot-whatsapp/bot";
import MockAdapter from "@bot-whatsapp/database/mock";
import ProviderWS from "@bot-whatsapp/provider/baileys";
import database from "./database";
import provider from "./provider";
import flow from "./flow";
import { initServer } from "./services/http";

const welcomeFlow = BotWhatsapp.addKeyword(["hola", "buenas"]).addAnswer(
  "Hola, estoy probando un bot. Ya te contesto."
);

const main = async () => {
  const botInstance = await BotWhatsapp.createBot({
    database,
    flow,
    provider,
  });

  initServer(botInstance);
};

main();
