function DataUser(user) {
  console.log(user, "se ve algo?");
  return (
    <>
      <h2>
        Hola <span className="nameUser">{user.user.name}</span>, este es tu
        perfil
      </h2>
      <div>
        <span>
          <p>Nombre: {user.user.fullName}</p>
        </span>
        <span>
          <p>Email: {user.user.email}</p>
        </span>
      </div>
    </>
  );
}
export default DataUser;
