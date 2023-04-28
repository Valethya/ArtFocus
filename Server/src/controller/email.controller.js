import customRouter from "../custom/router.custom.js";
import transport from "../utils/gmail.util.js";

class Email extends customRouter {
  init() {
    this.get("/", ["PUBLIC"], async (req, res, next) => {
      try {
        const response = await transport.sendMail({
          from: "mailingartfocus@gmail.com",
          to: "hdgraziano@gmail.com",
          subject: "segunda prueba",
          html: `<html><div>holaaaaaaaaas</div></html>`,
          attachments: [],
        });
        handleResponse(res, response, 200);
      } catch (error) {
        next(error);
      }
    });
  }
}
export default Email;

//nxooqgsqxfhloycy
