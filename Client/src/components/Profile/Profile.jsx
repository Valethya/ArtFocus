function DataUser(user) {
  return (
    <div className="cont">
      <div>
        <div>
          <span>
            <p>Nombre: {user.user.fullName}</p>
          </span>
          <span>
            <p>Email: {user.user.email}</p>
          </span>
        </div>
      </div>
    </div>
  );
}
export default DataUser;
