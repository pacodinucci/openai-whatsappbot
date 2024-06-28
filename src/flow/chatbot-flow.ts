import BotWhatsapp from "@bot-whatsapp/bot";
import { generatePaymentLink } from "src/services/paypal";

export default BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.ACTION)
  .addAnswer(
    "Introduce tu email para generar el link de pago.",
    {
      capture: true,
    },
    async (ctx, { state, fallBack }) => {
      if (!ctx.body.includes("@")) {
        return fallBack(
          "El email que introduciste no es válido, intenta de nuevo."
        );
      }

      await state.update({ email: ctx.body.toLowerCase() });
    }
  )
  .addAnswer("Generando link de pago para curso de Chatbot...")
  .addAction(async (ctx, { flowDynamic, state }) => {
    const email = state.get("email");
    const paypalLink = await generatePaymentLink("30.00", email);
    await flowDynamic(paypalLink);
  });
