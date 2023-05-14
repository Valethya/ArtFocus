const emailResetPassword = (link) => {
  return `<!DOCTYPE PUBLIC “-//W3C//DTD XHTML 1.0 Transitional//EN” “https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd”>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title></title>

</head>

<body style="margin:0;padding:0;">

    <table role="presentation"
        style="width:100%;margin:auto;height:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
        <tbody>



            <tr style="height:200px;background: url(https://images.unsplash.com/photo-1495745713439-7efd16a9555c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80) ;    background-position: 0% 46%;
               ">
                <td align="center" style="padding:0;">
                    <h1>ArtFocus</h1>
                </td>
            </tr>
            <tr>
                <td align="center" style="height:100px;padding:0;">
                    <p>Para continuar y realizar cambio de contraseña, haz click en el siguiente boton</p>

                </td>
            </tr>
            <tr>
                <td align="center" style="height:100px;padding:0;">
                    <a href="${link}" style="text-decoration: none; width: 150px;
                background: #cbedfd;
                border: #cbedfd;
                border-radius: 2px;
        
                transition: 1s;
                padding: 1em;
            ">
            <span>Realizar cambio de contraseña</span>
                    </a>
                </td>
            </tr>
            <tr style="height:200px;background: url(https://images.unsplash.com/photo-1495745713439-7efd16a9555c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80) ;    background-position: 0% 59.2%;
       ">
                <td align="center" style="padding:0;">
                    <p>derechos reservados</p>
                </td>
            </tr>
        </tbody>

    </table>

    </table>
</body>`;
};
export default emailResetPassword;
