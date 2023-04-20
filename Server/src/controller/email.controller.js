import customRouter from "../custom/router.custom.js";
import transport from "../utils/gmail.util.js";

class Email extends customRouter {
  init() {
    this.get("/", ["PUBLIC"], async (req, res) => {
      try {
        const result = await transport.sendMail({
          from: "mailingartfocus@gmail.com",
          to: "hdgraziano@gmail.com",
          subject: "segunda prueba",
          html: `<html><div>holaaaaaaaaas</div></html>`,
          attachments: [],
        });
        res.json({ message: result });
      } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
      }
    });
  }
}
export default Email;

//nxooqgsqxfhloycy
